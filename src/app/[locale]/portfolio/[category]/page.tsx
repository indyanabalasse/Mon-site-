import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale, locales, type Locale } from "@/lib/i18n";
import { categorySlugs, getCategory, isSeriesGroup, type CategorySlug } from "@/data/portfolio";
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
  const path = `/${locale}/portfolio/${category}`;
  return {
    title: info.title,
    description: info.description,
    alternates: { canonical: path },
    openGraph: { title: info.title, description: info.description, url: path },
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

  return (
    <div className="mx-auto max-w-7xl px-6 pt-6 pb-20">
      <BackLink href={`/${locale}/portfolio`} label={dict.gallery.back} />
      {data.series.length > 1 || isSeriesGroup(data.series[0]) ? (
        <MasonryNav
          items={data.series.map((series) => ({
            href: `/${locale}/portfolio/${category}/${series.slug}`,
            cover: series.cover,
            covers: isSeriesGroup(series) ? undefined : series.coverImages,
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
