import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale, locales, type Locale } from "@/lib/i18n";
import {
  categorySlugs,
  portfolio,
  eventSubcategorySlugs,
  eventSubcategories,
  familySubcategorySlugs,
  familySubcategories,
  type CategorySlug,
} from "@/data/portfolio";
import Gallery from "@/components/Gallery";
import TabbedGallery from "@/components/TabbedGallery";

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

  const info = dict.categories[category];

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <header className="max-w-2xl mx-auto text-center mb-14">
        <h1 className="wordmark font-serif text-4xl font-light">{info.title}</h1>
        <p className="mt-4 text-muted">{info.description}</p>
      </header>

      {category === "evenementiel" ? (
        <TabbedGallery
          slugs={eventSubcategorySlugs}
          subcategories={eventSubcategories}
          labels={dict.eventSubcategories}
          altPrefix={info.title}
        />
      ) : category === "famille" ? (
        <TabbedGallery
          slugs={familySubcategorySlugs}
          subcategories={familySubcategories}
          labels={dict.familySubcategories}
          altPrefix={info.title}
        />
      ) : (
        <Gallery images={portfolio[category]} altPrefix={info.title} />
      )}
    </div>
  );
}
