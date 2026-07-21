import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { categorySlugs, coverImages } from "@/data/portfolio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const path = `/${locale}/portfolio`;
  return {
    title: dict.portfolio.title,
    description: dict.portfolio.intro,
    alternates: { canonical: path },
    openGraph: { title: dict.portfolio.title, description: dict.portfolio.intro, url: path },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <header className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="wordmark font-serif text-4xl font-light">{dict.portfolio.title}</h1>
        <p className="mt-4 text-muted">{dict.portfolio.intro}</p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2">
        {categorySlugs.map((slug) => (
          <Link key={slug} href={`/${locale}/portfolio/${slug}`} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={coverImages[slug]}
                alt={dict.categories[slug].title}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h2 className="wordmark font-serif text-2xl mt-5">{dict.categories[slug].title}</h2>
            <p className="mt-2 text-sm text-muted">{dict.categories[slug].description}</p>
            <span className="mt-3 inline-block text-xs uppercase tracking-[0.2em] border-b border-foreground/40 group-hover:border-foreground transition-colors">
              {dict.portfolio.viewSeries}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
