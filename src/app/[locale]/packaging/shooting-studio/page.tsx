import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import heroImage from "@/images/Studio/PHOTO-2026-08-13-11-24-52.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const path = `/${locale}/packaging/shooting-studio`;
  return {
    title: `${dict.offerStudio.title} — ${dict.packaging.title}`,
    description: dict.offerStudio.intro,
    alternates: { canonical: path },
    openGraph: { title: dict.offerStudio.title, description: dict.offerStudio.intro, url: path },
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

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
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
              className="inline-block border border-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
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
        <p className="mt-2 text-sm text-muted">{offer.ctaText}</p>
        <Link
          href={`/${locale}/contact`}
          className="mt-5 inline-block border border-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
        >
          {offer.ctaButton}
        </Link>
      </div>
    </div>
  );
}
