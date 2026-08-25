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
    path: "/contact/confirmed",
    locale,
    title: dict.contact.confirmedTitle,
    description: dict.contact.confirmedBody,
  });
  return {
    title: dict.contact.confirmedTitle,
    description: dict.contact.confirmedBody,
    ...base,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ContactConfirmedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="wordmark font-serif text-4xl font-light">{dict.contact.confirmedTitle}</h1>
      <p className="mt-4 text-muted">{dict.contact.confirmedBody}</p>
      <p className="mt-4 wordmark font-serif italic text-xl">{dict.contact.confirmedSignoff}</p>
      <Link
        href={`/${locale}`}
        className="mt-10 inline-block border border-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
      >
        {dict.nav.home}
      </Link>
    </div>
  );
}
