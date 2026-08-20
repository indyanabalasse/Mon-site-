import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { categories, heroImages } from "@/data/portfolio";
import { pageMetadataBase } from "@/lib/metadata";
import MasonryNav from "@/components/MasonryNav";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const base = pageMetadataBase({
    path: "/portfolio",
    locale,
    title: dict.portfolio.title,
    description: dict.portfolio.intro,
  });
  const cover = heroImages[0].src;
  return {
    title: dict.portfolio.title,
    description: dict.portfolio.intro,
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [{ url: cover.src, width: cover.width, height: cover.height, alt: dict.portfolio.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.portfolio.title,
      description: dict.portfolio.intro,
      images: [cover.src],
    },
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

  const tiles = categories.map((category) => ({
    href: `/${locale}/portfolio/${category.slug}`,
    cover: category.cover,
    covers: category.coverImages,
    label: dict.categories[category.slug].title,
  }));

  return (
    <div className="pb-20">
      <h1 className="sr-only">{dict.portfolio.title}</h1>
      <div className="w-full">
        <MasonryNav items={tiles} />
      </div>
    </div>
  );
}
