import { NextResponse } from "next/server";
import { signContactToken } from "@/lib/contact/token";
import { sendTransactionalEmail } from "@/lib/newsletter/resend";
import { renderNewsletterEmail } from "@/lib/newsletter/template";
import { defaultLocale, getDictionary, isLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const message = body.message.trim();
  const locale = isLocale(body.locale) ? body.locale : defaultLocale;
  const dict = getDictionary(locale);

  // The message travels inside the signed token itself, so nothing is sent
  // to the site owner until the sender proves the address is real by
  // clicking the confirmation link — this is what stops fake addresses from
  // reaching her inbox.
  try {
    const token = signContactToken({ name, email, message, locale });
    const confirmUrl = `${SITE_URL}/api/contact/confirm?token=${token}`;

    const html = renderNewsletterEmail({
      locale,
      heading: dict.contact.confirmEmailHeading,
      bodyHtml: `<p style="margin:0;">${dict.contact.confirmEmailBody}</p>`,
      ctaLabel: dict.contact.confirmEmailCta,
      ctaHref: confirmUrl,
    });

    await sendTransactionalEmail({
      to: email,
      subject: dict.contact.confirmEmailSubject,
      html,
    });
  } catch (error) {
    console.error("Contact: failed to send confirmation email", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
