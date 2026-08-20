import { NextRequest, NextResponse } from "next/server";
import { verifyNewsletterToken } from "@/lib/newsletter/token";
import { removeContact } from "@/lib/newsletter/resend";
import { defaultLocale } from "@/lib/i18n";

// Unsubscribe is deliberately forgiving: whatever goes wrong (bad token,
// expired link, Resend hiccup), the worst case is a no-op landing on the
// "unsubscribed" page. Never show a scary error for this one.
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const payload = verifyNewsletterToken(token);

  if (!payload || payload.purpose !== "unsubscribe") {
    return NextResponse.redirect(new URL(`/${defaultLocale}/newsletter/unsubscribed`, request.url));
  }

  const { email, locale } = payload;

  try {
    await removeContact(email);
  } catch (error) {
    console.error("Newsletter unsubscribe: failed to remove contact", error);
  }

  return NextResponse.redirect(new URL(`/${locale}/newsletter/unsubscribed`, request.url));
}
