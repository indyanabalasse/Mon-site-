import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale, locales, type Locale } from "@/lib/i18n";
import { categorySlugs, categories, getCategory, getSubseries, isSeriesGroup, type CategorySlug } from "@/data/portfolio";
import { SITE_URL } from "@/lib/site";
import { pageMetadataBase } from "@/lib/metadata";
import Gallery from "@/components/Gallery";
import BackLink from "@/components/BackLink";

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
  const description = `${subseriesLabel}. ${info.description}`;
  const subseriesData = getSubseries(category, series, subseries);
  const base = pageMetadataBase({
    path: `/portfolio/${category}/${series}/${subseries}`,
    locale,
    title,
    description,
  });
  return {
    title,
    description,
    ...base,
    openGraph: {
      ...base.openGraph,
      images: subseriesData
        ? [{ url: subseriesData.cover.src, width: subseriesData.cover.width, height: subseriesData.cover.height, alt: title }]
        : base.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: subseriesData
        ? [subseriesData.cover.src]
        : [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: dict.nav.portfolio, item: `${SITE_URL}/${locale}/portfolio` },
      { "@type": "ListItem", position: 3, name: info.title, item: `${SITE_URL}/${locale}/portfolio/${category}` },
      { "@type": "ListItem", position: 4, name: seriesLabel, item: `${SITE_URL}/${locale}/portfolio/${category}/${series}` },
      { "@type": "ListItem", position: 5, name: subseriesLabel, item: `${SITE_URL}/${locale}/portfolio/${category}/${series}/${subseries}` },
    ],
  };

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
    <div className="mx-auto max-w-7xl px-6 pt-6 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BackLink href={`/${locale}/portfolio/${category}/${series}`} label={dict.gallery.back} />
      <h1 className="sr-only">{subseriesLabel} · {seriesLabel} · {info.title}</h1>
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
