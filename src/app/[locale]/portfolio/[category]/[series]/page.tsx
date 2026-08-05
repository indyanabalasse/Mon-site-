import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale, locales, type Locale } from "@/lib/i18n";
import { categorySlugs, categories, getCategory, getSeries, type CategorySlug } from "@/data/portfolio";
import Gallery from "@/components/Gallery";

function isCategory(value: string): value is CategorySlug {
  return (categorySlugs as string[]).includes(value);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    categories.flatMap((category) =>
      category.series.map((series) => ({
        locale,
        category: category.slug,
        series: series.slug,
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; series: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, category, series } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  if (!isCategory(category)) return {};
  const info = dict.categories[category];
  const seriesLabel = info.series[series] ?? series;
  const title = `${seriesLabel} — ${info.title}`;
  const path = `/${locale}/portfolio/${category}/${series}`;
  return {
    title,
    description: info.description,
    alternates: { canonical: path },
    openGraph: { title, description: info.description, url: path },
  };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; series: string }>;
}) {
  const { locale: rawLocale, category, series } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  if (!isCategory(category)) notFound();

  const categoryData = getCategory(category);
  const seriesData = getSeries(category, series);
  if (!categoryData || !seriesData) notFound();

  const info = dict.categories[category];
  const seriesLabel = info.series[series] ?? series;

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <header className="max-w-2xl mx-auto text-center mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{info.title}</p>
        <h1 className="wordmark font-serif text-4xl font-light mt-2">{seriesLabel}</h1>
      </header>

      <Gallery images={seriesData.images} altPrefix={seriesLabel} />
    </div>
  );
}
