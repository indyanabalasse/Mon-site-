import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { CONTACT_PHONE_HREF, SITE_NAME, SITE_URL } from "@/lib/site";
import { pageMetadataBase } from "@/lib/metadata";
import heroImage from "@/images/Studio/PHOTO-2026-08-13-11-24-52.jpg";
import packagesImage from "@/images/Studio/PHOTO-2026-08-13-11-24-16.jpg";
import addonsImage from "@/images/Studio/PHOTO-2026-08-13-11-28-08.jpg";

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
    <div className="mx-auto max-w-6xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <header className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{offer.kicker}</p>
        <h1 className="wordmark font-serif text-4xl font-light mt-2">{offer.title}</h1>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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

      <div className="max-w-3xl mx-auto text-center mb-20">
        <p className="leading-relaxed text-muted">{offer.intro}</p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="wordmark font-serif text-2xl font-light">{offer.packagesTitle}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {offer.packages.map((pkg) => (
              <div key={pkg.title} className="border border-border px-6 py-5 text-center">
                <h3 className="wordmark font-serif text-lg font-light">{pkg.title}</h3>
                <p className="mt-1 text-xs text-muted">{pkg.photos}</p>
                <p className="wordmark font-serif text-2xl font-light mt-2">{pkg.price}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted leading-relaxed">
            <span className="uppercase tracking-[0.15em]">{offer.processLabel} : </span>
            {offer.process.join(" · ")}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-8 hidden md:inline-block border border-foreground bg-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-transparent hover:text-foreground transition-colors"
          >
            {offer.bookNowCta}
          </Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={packagesImage}
            alt={offer.packagesTitle}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:items-center mt-20 pt-16 border-t border-border">
        <div className="relative aspect-[4/5] overflow-hidden order-1 md:order-none">
          <Image
            src={addonsImage}
            alt={offer.addonsLabel}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="wordmark font-serif text-2xl font-light">{offer.addonsLabel}</h2>
          <ul className="mt-6 space-y-5">
            {offer.addons.map((addon) => (
              <li key={addon.title}>
                <h3 className="font-medium">{addon.title}</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">{addon.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20 pt-16 border-t border-border text-center">
        <h2 className="wordmark font-serif text-2xl font-light">{offer.ctaTitle}</h2>
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
