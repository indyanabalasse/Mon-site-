import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { CONTACT_PHONE_HREF, SITE_NAME, SITE_URL } from "@/lib/site";
import { pageMetadataBase } from "@/lib/metadata";
import heroImage from "@/images/portfolio/evenementiel/cover.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const base = pageMetadataBase({
    path: "/packaging/shooting-evenement",
    locale,
    title: dict.offerEvenement.title,
    description: dict.offerEvenement.intro,
  });
  return {
    title: `${dict.offerEvenement.title} — ${dict.packaging.title}`,
    description: dict.offerEvenement.intro,
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [
        {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: dict.offerEvenement.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.offerEvenement.title,
      description: dict.offerEvenement.intro,
      images: [heroImage.src],
    },
  };
}

export default async function ShootingEvenementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const offer = dict.offerEvenement;

  const path = `/${locale}/packaging/shooting-evenement`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: locale === "fr" ? "Reportage photo événementiel" : "Event photography",
    name: offer.title,
    description: offer.intro,
    url: `${SITE_URL}${path}`,
    provider: { "@type": "LocalBusiness", name: SITE_NAME, telephone: CONTACT_PHONE_HREF },
    areaServed: "BE",
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <header className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{offer.kicker}</p>
        <h1 className="wordmark font-serif text-4xl font-light mt-3">{offer.title}</h1>
      </header>

      <div className="relative aspect-[16/9] overflow-hidden mb-16">
        <Image
          src={heroImage}
          alt={offer.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="leading-relaxed text-muted">{offer.intro}</p>
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
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/portfolio/evenementiel`}
            className="inline-block border border-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
          >
            {offer.viewSeriesCta}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="hidden md:inline-block border border-foreground bg-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-transparent hover:text-foreground transition-colors"
          >
            {offer.ctaButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
