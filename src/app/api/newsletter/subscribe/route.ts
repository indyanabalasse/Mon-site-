import { NextResponse } from "next/server";
import { signNewsletterToken } from "@/lib/newsletter/token";
import { sendTransactionalEmail } from "@/lib/newsletter/resend";
import { renderNewsletterEmail } from "@/lib/newsletter/template";
import { defaultLocale, getDictionary, isLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.email !== "string" || !EMAIL_PATTERN.test(body.email.trim())) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase();
  const locale = isLocale(body.locale) ? body.locale : defaultLocale;
  const dict = getDictionary(locale);

  try {
    const token = signNewsletterToken(email, "confirm", locale);
    const confirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${token}`;

    const html = renderNewsletterEmail({
      locale,
      heading: dict.newsletter.confirmEmailHeading,
      bodyHtml: `<p style="margin:0;">${dict.newsletter.confirmEmailBody}</p>`,
      ctaLabel: dict.newsletter.confirmEmailCta,
      ctaHref: confirmUrl,
    });

    await sendTransactionalEmail({
      to: email,
      subject: dict.newsletter.confirmEmailSubject,
      html,
    });
  } catch (error) {
    // Never leak whether the address was already subscribed, and never leak
    // internal error details to the client: log server-side only, and still
    // respond with the same generic shape the client would get on success.
    console.error("Newsletter subscribe: failed to send confirmation email", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
