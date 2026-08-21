import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { CONTACT_PHONE_HREF, SITE_NAME, SITE_URL } from "@/lib/site";
import { pageMetadataBase } from "@/lib/metadata";
import heroImage from "@/images/Studio/PHOTO-2026-08-13-11-24-52.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const base = pageMetadataBase({
    path: "/packaging/shooting-studio",
    locale,
    title: dict.offerStudio.title,
    description: dict.offerStudio.intro,
  });
  return {
    title: `${dict.offerStudio.title} — ${dict.packaging.title}`,
    description: dict.offerStudio.intro,
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [
        {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: dict.offerStudio.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.offerStudio.title,
      description: dict.offerStudio.intro,
      images: [heroImage.src],
    },
  };
}

export default async function ShootingStudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const offer = dict.offerStudio;

  const path = `/${locale}/packaging/shooting-studio`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: locale === "fr" ? "Séance photo en studio" : "Studio photo session",
    name: offer.title,
    description: offer.intro,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      telephone: CONTACT_PHONE_HREF,
    },
    areaServed: "BE",
    offers: offer.packages.map((pkg) => ({
      "@type": "Offer",
      name: pkg.title,
      price: pkg.price.replace(/[^0-9]/g, ""),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${path}`,
      description: pkg.photos,
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <div className="grid gap-10 md:grid-cols-2 md:items-center mb-14">
        <div className="relative aspect-[4/5] overflow-hidden order-1 md:order-none">
          <Image
            src={heroImage}
            alt={offer.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{offer.kicker}</p>
          <h1 className="wordmark font-serif text-4xl font-light mt-2">{offer.title}</h1>
          <p className="mt-4 leading-relaxed text-muted">{offer.intro}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={`/${locale}/portfolio/portrait`}
              className="inline-block border border-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
            >
              {offer.viewShootsCta}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="hidden md:inline-block border border-foreground bg-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-transparent hover:text-foreground transition-colors"
            >
              {offer.bookNowCta}
            </Link>
          </div>
        </div>
      </div>

      <p className="text-center text-xs uppercase tracking-[0.2em] text-muted mb-4">
        {offer.packagesTitle}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 max-w-xl mx-auto">
        {offer.packages.map((pkg) => (
          <div key={pkg.title} className="border border-border px-6 py-5 text-center">
            <h2 className="wordmark font-serif text-lg font-light">{pkg.title}</h2>
            <p className="mt-1 text-xs text-muted">{pkg.photos}</p>
            <p className="wordmark font-serif text-2xl font-light mt-2">{pkg.price}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted max-w-xl mx-auto">
        <span className="uppercase tracking-[0.15em]">{offer.processLabel} : </span>
        {offer.process.join(" · ")}
      </p>

      <div className="mt-8 pt-8 border-t border-border max-w-xl mx-auto">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted mb-4">
          {offer.addonsLabel}
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {offer.addons.map((addon) => (
            <div key={addon.title} className="text-center">
              <h3 className="text-sm font-medium">{addon.title}</h3>
              <p className="mt-1 text-xs text-muted leading-relaxed">{addon.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-border text-center">
        <h2 className="wordmark font-serif text-xl font-light">{offer.ctaTitle}</h2>
        <Link
          href={`/${locale}/contact`}
          className="mt-5 hidden md:inline-block border border-foreground bg-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-transparent hover:text-foreground transition-colors"
        >
          {offer.ctaButton}
        </Link>
      </div>
    </div>
  );
}
