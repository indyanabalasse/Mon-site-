import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale, locales, type Locale } from "@/lib/i18n";
import { categorySlugs, categories, getCategory, getSubseries, isSeriesGroup, type CategorySlug } from "@/data/portfolio";
import Gallery from "@/components/Gallery";

function isCategory(value: string): value is CategorySlug {
  return (categorySlugs as string[]).includes(value);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    categories.flatMap((category) =>
      category.series.flatMap((series) =>
        isSeriesGroup(series)
          ? series.subseries.map((sub) => ({
              locale,
              category: category.slug,
              series: series.slug,
              subseries: sub.slug,
            }))
          : []
      )
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; series: string; subseries: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, category, series, subseries } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  if (!isCategory(category)) return {};
  const info = dict.categories[category];
  const seriesLabel = info.series[series] ?? series;
  const subseriesLabel = dict.subseries?.[category]?.[series]?.[subseries] ?? subseries;
  const title = `${subseriesLabel} — ${seriesLabel} — ${info.title}`;
  const path = `/${locale}/portfolio/${category}/${series}/${subseries}`;
  return {
    title,
    description: info.description,
    alternates: { canonical: path },
    openGraph: { title, description: info.description, url: path },
  };
}

export default async function SubseriesPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; series: string; subseries: string }>;
}) {
  const { locale: rawLocale, category, series, subseries } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  if (!isCategory(category)) notFound();

  const categoryData = getCategory(category);
  const subseriesData = getSubseries(category, series, subseries);
  if (!categoryData || !subseriesData) notFound();

  const info = dict.categories[category];
  const seriesLabel = info.series[series] ?? series;
  const subseriesLabel = dict.subseries?.[category]?.[series]?.[subseries] ?? subseries;

  const seriesGroup = categoryData.series.find((s) => s.slug === series);
  const subLabels = dict.subseries?.[category]?.[series] ?? {};
  let nextSubseries: { href: string; label: string } | undefined;
  if (seriesGroup && isSeriesGroup(seriesGroup) && seriesGroup.subseries.length > 1) {
    const idx = seriesGroup.subseries.findIndex((s) => s.slug === subseries);
    const nextEntry = seriesGroup.subseries[(idx + 1) % seriesGroup.subseries.length];
    nextSubseries = {
      href: `/${locale}/portfolio/${category}/${series}/${nextEntry.slug}`,
      label: subLabels[nextEntry.slug] ?? nextEntry.slug,
    };
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <header className="max-w-2xl mx-auto text-center mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {info.title} — {seriesLabel}
        </p>
        <h1 className="wordmark font-serif text-4xl font-light mt-2">{subseriesLabel}</h1>
      </header>

      <Gallery
        images={subseriesData.images}
        altPrefix={subseriesLabel}
        endScreen={{
          next: nextSubseries,
          nextKicker: dict.gallery.nextKicker,
          bookHref: `/${locale}/contact`,
          bookLabel: dict.gallery.bookCta,
          closeHref: `/${locale}/portfolio/${category}`,
          closeLabel: dict.gallery.backToCategory,
        }}
      />
    </div>
  );
}
