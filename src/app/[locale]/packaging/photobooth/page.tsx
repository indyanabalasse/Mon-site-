import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import TileSlideshow from "@/components/TileSlideshow";
import heroImage1 from "@/images/portfolio/fun-photo-booth/Mariage 2/DSC_7474.jpg";
import heroImage2 from "@/images/portfolio/fun-photo-booth/Mariage 2/DSC_7503.jpg";
import heroImage3 from "@/images/portfolio/fun-photo-booth/Mariage 1/cover.jpg";

const heroImages = [heroImage1, heroImage2, heroImage3];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const path = `/${locale}/packaging/photobooth`;
  return {
    title: `${dict.offerPhotobooth.title} — ${dict.packaging.title}`,
    description: dict.offerPhotobooth.intro,
    alternates: { canonical: path },
    openGraph: {
      title: dict.offerPhotobooth.title,
      description: dict.offerPhotobooth.intro,
      url: path,
    },
  };
}

export default async function PhotoboothPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const offer = dict.offerPhotobooth;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16 md:py-20">
      <header className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{offer.kicker}</p>
        <h1 className="wordmark font-serif text-4xl font-light mt-3">{offer.title}</h1>
      </header>

      <div className="relative aspect-[16/9] overflow-hidden mb-16">
        <TileSlideshow images={heroImages} alt={offer.title} sizes="100vw" fill />
      </div>

      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="leading-relaxed text-muted">{offer.intro}</p>
        <Link
          href={`/${locale}/portfolio/fun-photo-booth`}
          className="mt-6 inline-block border border-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
        >
          {offer.viewSeriesCta}
        </Link>
      </div>

      <div className="grid gap-12 sm:grid-cols-2 max-w-2xl mx-auto">
        <div>
          <h2 className="wordmark font-serif text-xl font-light">{offer.includesTitle}</h2>
          <ul className="mt-5 space-y-3">
            {offer.includes.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted leading-relaxed">
                <span className="text-muted">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="wordmark font-serif text-xl font-light">{offer.criteriaTitle}</h2>
          <ul className="mt-5 space-y-3">
            {offer.criteria.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted leading-relaxed">
                <span className="text-muted">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 border-t border-border pt-16 text-center">
        <h2 className="wordmark font-serif text-2xl font-light">{offer.ctaTitle}</h2>
        <p className="mt-4 max-w-xl mx-auto text-muted">{offer.ctaText}</p>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 hidden md:inline-block border border-foreground bg-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-transparent hover:text-foreground transition-colors"
        >
          {offer.ctaButton}
        </Link>
      </div>
    </div>
  );
}
