import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { pageMetadataBase } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const base = pageMetadataBase({
    path: "/newsletter/confirmed",
    locale,
    title: dict.newsletter.confirmedTitle,
    description: dict.newsletter.confirmedBody,
  });
  return {
    title: dict.newsletter.confirmedTitle,
    description: dict.newsletter.confirmedBody,
    ...base,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function NewsletterConfirmedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="wordmark font-serif text-4xl font-light">{dict.newsletter.confirmedTitle}</h1>
      <p className="mt-4 text-muted">{dict.newsletter.confirmedBody}</p>
      <Link
        href={`/${locale}`}
        className="mt-10 inline-block border border-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
      >
        {dict.nav.home}
      </Link>
    </div>
  );
}
