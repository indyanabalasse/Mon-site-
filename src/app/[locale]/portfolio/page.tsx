import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { categories } from "@/data/portfolio";
import MasonryNav from "@/components/MasonryNav";

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

  const tiles = categories.map((category) => ({
    href: `/${locale}/portfolio/${category.slug}`,
    cover: category.cover,
    covers: category.coverImages,
    label: dict.categories[category.slug].title,
  }));

  return (
    <div className="py-20">
      <div className="w-full">
        <MasonryNav items={tiles} />
      </div>
    </div>
  );
}
