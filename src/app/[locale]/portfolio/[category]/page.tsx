import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale, locales, type Locale } from "@/lib/i18n";
import { categorySlugs, portfolio, type CategorySlug } from "@/data/portfolio";
import Gallery from "@/components/Gallery";

function isCategory(value: string): value is CategorySlug {
  return (categorySlugs as string[]).includes(value);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    categorySlugs.map((category) => ({ locale, category }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, category } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  if (!isCategory(category)) return {};
  return { title: dict.categories[category].title };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: rawLocale, category } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  if (!isCategory(category)) notFound();

  const images = portfolio[category];
  const info = dict.categories[category];

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <header className="max-w-2xl mx-auto text-center mb-14">
        <h1 className="wordmark font-serif text-4xl font-light">{info.title}</h1>
        <p className="mt-4 text-muted">{info.description}</p>
      </header>

      <Gallery images={images} altPrefix={info.title} />
    </div>
  );
}
