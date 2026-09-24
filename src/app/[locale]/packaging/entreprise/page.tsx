import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { CONTACT_PHONE_HREF, SITE_NAME, SITE_URL } from "@/lib/site";
import { pageMetadataBase } from "@/lib/metadata";
import corporateCover from "@/images/portfolio/corporate/esg-logic/01.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const base = pageMetadataBase({
    path: "/packaging/entreprise",
    locale,
    title: dict.offerEntreprise.title,
    description: dict.offerEntreprise.intro,
    image: corporateCover.src,
  });
  return {
    title: `${dict.offerEntreprise.title} — ${dict.packaging.title}`,
    description: dict.offerEntreprise.intro,
    ...base,
  };
}

export default async function EntrepriseOfferPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const offer = dict.offerEntreprise;

  const path = `/${locale}/packaging/entreprise`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: locale === "fr" ? "Photographie d'entreprise" : "Corporate photography",
    name: offer.title,
    description: offer.intro,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      telephone: CONTACT_PHONE_HREF,
    },
    areaServed: "BE",
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Header */}
      <header className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{offer.kicker}</p>
        <h1 className="wordmark font-serif text-4xl font-light mt-2">{offer.title}</h1>
        <p className="mt-6 leading-relaxed text-muted">{offer.intro}</p>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-block border border-foreground bg-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-transparent hover:text-foreground transition-colors"
        >
          {offer.ctaButton}
        </Link>
      </header>

      {/* Hero Image */}
      <div className="relative aspect-[16/10] overflow-hidden mb-20 rounded-sm">
        <Image
          src={corporateCover}
          alt={offer.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>


      {/* CTA Section */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="wordmark font-serif text-2xl font-light">{offer.ctaTitle}</h2>
        <p className="mt-6 leading-relaxed text-muted">{offer.ctaText}</p>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-block border border-foreground bg-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-transparent hover:text-foreground transition-colors"
        >
          {offer.ctaButton}
        </Link>
      </div>
    </div>
  );
}
