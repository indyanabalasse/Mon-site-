import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale, locales, type Locale } from "@/lib/i18n";
import { categorySlugs, getCategory, isSeriesGroup, type CategorySlug } from "@/data/portfolio";
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
  const info = dict.categories[category];
  const categoryData = getCategory(category);
  const base = pageMetadataBase({
    path: `/portfolio/${category}`,
    locale,
    title: info.title,
    description: info.description,
  });
  const image = categoryData
    ? [
        {
          url: categoryData.cover.src,
          width: categoryData.cover.width,
          height: categoryData.cover.height,
          alt: info.title,
        },
      ]
    : base.openGraph?.images;
  return {
    title: info.title,
    description: info.description,
    ...base,
    openGraph: { ...base.openGraph, images: image },
    twitter: {
      card: "summary_large_image",
      title: info.title,
      description: info.description,
      images: categoryData ? [categoryData.cover.src] : undefined,
    },
  };
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

  const data = getCategory(category);
  if (!data) notFound();

  const info = dict.categories[category];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: dict.nav.portfolio, item: `${SITE_URL}/${locale}/portfolio` },
      { "@type": "ListItem", position: 3, name: info.title, item: `${SITE_URL}/${locale}/portfolio/${category}` },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pt-6 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BackLink href={`/${locale}/portfolio`} label={dict.gallery.back} />
      <h1 className="sr-only">{info.title}</h1>
      {data.series.length > 1 || isSeriesGroup(data.series[0]) ? (
        <MasonryNav
          variant="grid"
          items={data.series.map((series) => ({
            href: `/${locale}/portfolio/${category}/${series.slug}`,
            cover: series.cover,
            covers: series.coverImages,
            label: info.series[series.slug] ?? series.slug,
          }))}
        />
      ) : (
        <Gallery
          images={data.series[0].images}
          altPrefix={info.title}
          pairAfter={data.series[0].pairAfter}
          endScreen={{
            nextKicker: dict.gallery.nextKicker,
            viewSeriesCta: dict.gallery.viewSeriesCta,
            bookHref: `/${locale}/contact`,
            bookLabel: dict.gallery.bookCta,
            closeHref: `/${locale}/portfolio`,
            closeLabel: dict.gallery.backToCategory,
          }}
        />
      )}
    </div>
  );
}
