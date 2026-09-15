import type { Metadata } from "next";
import Link from "next/link";
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
  // Une catégorie qui porte un argumentaire commercial se présente aux moteurs
  // par ses mots-clés de recherche, pas par son seul nom de rubrique.
  const title = info.pitch?.heading ?? info.title;
  const description = info.pitch?.metaDescription ?? info.description;
  const base = pageMetadataBase({
    path: `/portfolio/${category}`,
    locale,
    title,
    description,
    image: categoryData?.cover.src,
  });
  return {
    title,
    description,
    ...base,
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
  const pitch = info.pitch;

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
      {pitch ? (
        <header className="mx-auto max-w-3xl pt-8 pb-12 sm:pt-12 sm:pb-16 text-center">
          <h1 className="wordmark font-serif text-3xl sm:text-4xl font-light">{pitch.heading}</h1>
          {pitch.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-left sm:text-center leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </header>
      ) : (
        <h1 className="sr-only">{info.title}</h1>
      )}
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

      {pitch && (
        <div className="mx-auto max-w-3xl">
          <section className="mt-16">
            <h2 className="text-xs uppercase tracking-[0.2em] text-muted">{pitch.referencesTitle}</h2>
            <dl className="mt-6 space-y-5">
              {pitch.references.map((reference) => (
                <div key={reference.name}>
                  <dt className="wordmark font-serif text-xl font-light">{reference.name}</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{reference.text}</dd>
                </div>
              ))}
            </dl>
          </section>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {pitch.trust.map((item) => (
              <li key={item} className="border-l border-border pl-4 text-sm leading-relaxed text-muted">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-16 border border-border px-6 py-10 sm:py-12 text-center">
            <h2 className="wordmark font-serif text-2xl font-light">{pitch.ctaTitle}</h2>
            <p className="mt-4 max-w-xl mx-auto text-muted">{pitch.ctaText}</p>
            <Link
              href={`/${locale}/contact`}
              className="mt-8 inline-block border border-foreground bg-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-transparent hover:text-foreground transition-colors"
            >
              {pitch.ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
