import { NextRequest, NextResponse } from "next/server";
import { verifyNewsletterToken } from "@/lib/newsletter/token";
import { addConfirmedContact } from "@/lib/newsletter/resend";
import { defaultLocale } from "@/lib/i18n";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const payload = verifyNewsletterToken(token);

  // An invalid/expired token carries no recoverable locale, so fall back to
  // the site's default locale for this dead-end redirect.
  if (!payload || payload.purpose !== "confirm") {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}/newsletter/unsubscribed?error=1`, request.url)
    );
  }

  const { email, locale } = payload;

  try {
    await addConfirmedContact(email);
  } catch (error) {
    console.error("Newsletter confirm: failed to add contact", error);
    return NextResponse.redirect(new URL(`/${locale}/newsletter/unsubscribed?error=1`, request.url));
  }

  return NextResponse.redirect(new URL(`/${locale}/newsletter/confirmed`, request.url));
}
