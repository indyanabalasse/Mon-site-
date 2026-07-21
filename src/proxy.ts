import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

const METADATA_ROUTES = ["/icon", "/apple-icon", "/opengraph-image", "/twitter-image"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (METADATA_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}.`))) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = locales.find((locale) => acceptLanguage.toLowerCase().includes(locale));
  const locale = preferred ?? defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
