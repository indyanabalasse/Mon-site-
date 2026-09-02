import { NextResponse } from "next/server";
import { signContactToken } from "@/lib/contact/token";
import { signNewsletterToken } from "@/lib/newsletter/token";
import { sendTransactionalEmail } from "@/lib/newsletter/resend";
import { renderNewsletterEmail } from "@/lib/newsletter/template";
import { defaultLocale, getDictionary, isLocale } from "@/lib/i18n";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

// Real visitors take at least a few seconds to fill the form; bots submit
// near-instantly, so this catches the ones that skip the honeypot below.
const MIN_SUBMIT_MS = 3000;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string" ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.message.trim()
  ) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  // Honeypot field: invisible to real visitors, so only bots fill it in.
  // A request missing these fields entirely didn't come from the real form
  // (e.g. a bot posting straight to this endpoint), so treat that as
  // suspect too rather than letting it through by default.
  // Pretend success so bots don't learn what tripped the check.
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";
  const elapsedMs = typeof body.startedAt === "number" ? Date.now() - body.startedAt : null;
  if (honeypot || elapsedMs === null || elapsedMs < MIN_SUBMIT_MS) {
    return NextResponse.json({ ok: true, pending: false });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const message = body.message.trim();
  const locale = isLocale(body.locale) ? body.locale : defaultLocale;
  const subscribeNewsletter = body.subscribeNewsletter === true;
  const dict = getDictionary(locale);

  // Resend's shared onboarding@resend.dev sender can only deliver to the
  // account owner's own address (see NEWSLETTER_FROM in
  // src/lib/newsletter/resend.ts), so a confirmation email to an arbitrary
  // visitor would just fail until a domain is verified. Until then, fall
  // back to sending the message straight through — same behavior as before
  // this feature existed — instead of breaking the form for every visitor.
  if (!process.env.NEWSLETTER_FROM) {
    try {
      await sendTransactionalEmail({
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: `Nouveau message de ${name} — indyanabalasse.com`,
        text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
      });
    } catch (error) {
      console.error("Contact: failed to send message", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    // There's no confirmation step to piggyback the newsletter opt-in on in
    // this fallback path, so send its own confirmation email same as before.
    if (subscribeNewsletter) {
      try {
        const newsletterToken = signNewsletterToken(email, "confirm", locale);
        const newsletterConfirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${newsletterToken}`;
        const newsletterHtml = renderNewsletterEmail({
          locale,
          heading: dict.newsletter.confirmEmailHeading,
          bodyHtml: `<p style="margin:0;">${dict.newsletter.confirmEmailBody}</p>`,
          ctaLabel: dict.newsletter.confirmEmailCta,
          ctaHref: newsletterConfirmUrl,
        });
        await sendTransactionalEmail({
          to: email,
          subject: dict.newsletter.confirmEmailSubject,
          html: newsletterHtml,
        });
      } catch (error) {
        console.error("Contact: failed to send newsletter confirmation email", error);
      }
    }

    return NextResponse.json({ ok: true, pending: false });
  }

  // The message travels inside the signed token itself, so nothing is sent
  // to the site owner until the sender proves the address is real by
  // clicking the confirmation link — this is what stops fake addresses from
  // reaching her inbox. The newsletter opt-in, if checked, rides along in
  // the same token so one click confirms both instead of sending two
  // separate emails with two separate links.
  try {
    const token = signContactToken({ name, email, message, locale, subscribeNewsletter });
    const confirmUrl = `${SITE_URL}/api/contact/confirm?token=${token}`;

    const html = renderNewsletterEmail({
      locale,
      heading: subscribeNewsletter
        ? dict.contact.confirmEmailHeadingWithNewsletter
        : dict.contact.confirmEmailHeading,
      bodyHtml: `<p style="margin:0;">${
        subscribeNewsletter ? dict.contact.confirmEmailBodyWithNewsletter : dict.contact.confirmEmailBody
      }</p>`,
      ctaLabel: subscribeNewsletter ? dict.contact.confirmEmailCtaWithNewsletter : dict.contact.confirmEmailCta,
      ctaHref: confirmUrl,
    });

    await sendTransactionalEmail({
      to: email,
      subject: subscribeNewsletter
        ? dict.contact.confirmEmailSubjectWithNewsletter
        : dict.contact.confirmEmailSubject,
      html,
    });
  } catch (error) {
    console.error("Contact: failed to send confirmation email", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, pending: true });
}
