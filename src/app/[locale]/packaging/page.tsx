import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const path = `/${locale}/packaging`;
  return {
    title: dict.packaging.title,
    description: dict.packaging.intro,
    alternates: { canonical: path },
    openGraph: { title: dict.packaging.title, description: dict.packaging.intro, url: path },
  };
}

export default async function PackagingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <header className="max-w-2xl mx-auto text-center mb-20">
        <h1 className="wordmark font-serif text-4xl font-light">{dict.packaging.title}</h1>
        <p className="mt-4 text-muted">{dict.packaging.intro}</p>
      </header>

      <div className="space-y-16">
        {dict.packaging.formulas.map((formula, i) => (
          <div
            key={formula.title}
            className={`grid gap-8 sm:grid-cols-2 sm:items-start ${
              i > 0 ? "pt-16 border-t border-border" : ""
            }`}
          >
            <div>
              <span className="text-xs tracking-[0.2em] text-muted">{formula.number}</span>
              <p className="text-xs uppercase tracking-[0.2em] text-muted mt-1">
                {formula.category}
              </p>
              <p className="wordmark font-serif italic text-sm mt-3">{formula.subcategory}</p>
              <h2 className="wordmark font-serif text-2xl font-light mt-4">{formula.title}</h2>
              <ul className="mt-6 space-y-2">
                {formula.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-muted">
                    <span className="text-muted">—</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:pt-16">
              <p className="wordmark font-serif text-5xl font-light">{formula.price}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                {formula.unit}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 border-t border-border pt-16 text-center">
        <h2 className="wordmark font-serif text-2xl font-light">{dict.packaging.ctaTitle}</h2>
        <p className="mt-4 max-w-xl mx-auto text-muted">{dict.packaging.ctaText}</p>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-block border border-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
        >
          {dict.packaging.ctaButton}
        </Link>
      </div>
    </div>
  );
}
