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
    title: dict.offerEntreprise.metaTitle,
    description: dict.offerEntreprise.metaDescription,
    image: corporateCover.src,
  });
  return {
    title: dict.offerEntreprise.metaTitle,
    description: dict.offerEntreprise.metaDescription,
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
    description: offer.metaDescription,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      telephone: CONTACT_PHONE_HREF,
    },
    areaServed: "BE",
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: offer.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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

      {/* Services */}
      <section className="mb-20">
        <h2 className="wordmark font-serif text-2xl font-light text-center mb-10">
          {offer.servicesTitle}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {offer.services.map((service) => (
            <div key={service.title}>
              <h3 className="font-medium">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-20 max-w-2xl mx-auto">
        <h2 className="wordmark font-serif text-2xl font-light text-center mb-8">
          {offer.benefitsTitle}
        </h2>
        <ul className="space-y-3">
          {offer.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 text-sm text-muted">
              <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground" />
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="mb-20 max-w-2xl mx-auto">
        <h2 className="wordmark font-serif text-2xl font-light text-center mb-8">
          {offer.processTitle}
        </h2>
        <ol className="space-y-4">
          {offer.process.map((step, index) => (
            <li key={step} className="flex items-start gap-4 text-sm text-muted">
              <span className="shrink-0 font-serif text-lg text-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-1">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mb-20 max-w-2xl mx-auto">
        <h2 className="wordmark font-serif text-2xl font-light text-center mb-8">
          {offer.faqTitle}
        </h2>
        <div className="space-y-6">
          {offer.faq.map((item) => (
            <div key={item.q}>
              <h3 className="font-medium">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

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
