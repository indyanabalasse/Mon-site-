import { NextRequest, NextResponse } from "next/server";
import { verifyContactToken } from "@/lib/contact/token";
import { sendTransactionalEmail } from "@/lib/newsletter/resend";
import { CONTACT_EMAIL } from "@/lib/site";
import { defaultLocale } from "@/lib/i18n";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const payload = verifyContactToken(token);

  // An invalid/expired token carries no recoverable locale, so fall back to
  // the site's default locale for this dead-end redirect.
  if (!payload) {
    return NextResponse.redirect(new URL(`/${defaultLocale}/contact/expired`, request.url));
  }

  const { name, email, message, locale } = payload;

  try {
    await sendTransactionalEmail({
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Nouveau message de ${name} — indyanabalasse.com`,
      text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
    });
  } catch (error) {
    console.error("Contact confirm: failed to send notification", error);
    return NextResponse.redirect(new URL(`/${locale}/contact/expired`, request.url));
  }

  return NextResponse.redirect(new URL(`/${locale}/contact/confirmed`, request.url));
}
