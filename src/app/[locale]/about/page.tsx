import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { portfolio } from "@/data/portfolio";

const portraitImage = portfolio["black-and-white"][7];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const description = dict.about.paragraphs[0];
  const path = `/${locale}/about`;
  return {
    title: dict.about.title,
    description,
    alternates: { canonical: path },
    openGraph: { title: dict.about.title, description, url: path },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden order-1 md:order-none">
          <Image
            src={portraitImage}
            alt="INDYANASTUDIO"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="wordmark font-serif text-4xl font-light mb-8">{dict.about.title}</h1>
          {dict.about.paragraphs.map((p) => (
            <p key={p} className="mt-5 leading-relaxed text-foreground/90 first:mt-0">
              {p}
            </p>
          ))}
          <Link
            href={`/${locale}/contact`}
            className="mt-10 inline-block border border-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
          >
            {dict.about.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
