import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale, locales, type Locale } from "@/lib/i18n";
import { categorySlugs, categories, getCategory, getSeries, isSeriesGroup, type CategorySlug } from "@/data/portfolio";
import { SITE_URL } from "@/lib/site";
import { pageMetadataBase } from "@/lib/metadata";
import Gallery from "@/components/Gallery";
import MasonryNav from "@/components/MasonryNav";
import BackLink from "@/components/BackLink";

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
  const description = `${seriesLabel}. ${info.description}`;
  const seriesData = getSeries(category, series);
  const base = pageMetadataBase({
    path: `/portfolio/${category}/${series}`,
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
      images: seriesData
        ? [{ url: seriesData.cover.src, width: seriesData.cover.width, height: seriesData.cover.height, alt: title }]
        : base.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: seriesData
        ? [seriesData.cover.src]
        : [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
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

  const seriesIndex = categoryData.series.findIndex((s) => s.slug === series);
  const nextSeries =
    categoryData.series.length > 1
      ? categoryData.series[(seriesIndex + 1) % categoryData.series.length]
      : undefined;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: dict.nav.portfolio, item: `${SITE_URL}/${locale}/portfolio` },
      { "@type": "ListItem", position: 3, name: info.title, item: `${SITE_URL}/${locale}/portfolio/${category}` },
      { "@type": "ListItem", position: 4, name: seriesLabel, item: `${SITE_URL}/${locale}/portfolio/${category}/${series}` },
    ],
  };

  if (isSeriesGroup(seriesData)) {
    const subLabels = dict.subseries?.[category]?.[series] ?? {};
    return (
      <div className="mx-auto max-w-7xl px-6 pt-6 pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <BackLink href={`/${locale}/portfolio/${category}`} label={dict.gallery.back} />
        <h1 className="sr-only">{seriesLabel} · {info.title}</h1>
        <MasonryNav
          variant="grid"
          items={seriesData.subseries.map((sub) => ({
            href: `/${locale}/portfolio/${category}/${series}/${sub.slug}`,
            cover: sub.cover,
            covers: sub.coverImages,
            label: subLabels[sub.slug] ?? sub.slug,
          }))}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pt-6 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BackLink href={`/${locale}/portfolio/${category}`} label={dict.gallery.back} />
      <h1 className="sr-only">{seriesLabel} · {info.title}</h1>
      <Gallery
        images={seriesData.images}
        altPrefix={seriesLabel}
        pairAfter={seriesData.pairAfter}
        endScreen={{
          next: nextSeries
            ? {
                href: `/${locale}/portfolio/${category}/${nextSeries.slug}`,
                label: info.series[nextSeries.slug] ?? nextSeries.slug,
              }
            : undefined,
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
