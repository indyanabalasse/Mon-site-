import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import studioImage from "@/images/Studio/PHOTO-2026-08-20-13-30-50.jpg";
import shootingStudioImage from "@/images/booking/shooting-studio-cover.jpg";
import evenementielImage from "@/images/portfolio/evenementiel/cover.jpg";
import photoboothImage from "@/images/portfolio/fun-photo-booth/Mariage 1/cover.jpg";

const OFFER_IMAGES: Record<string, typeof studioImage> = {
  "shooting-studio": shootingStudioImage,
  "shooting-evenement": evenementielImage,
  photobooth: photoboothImage,
  "location-studio": studioImage,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const path = `/${locale}/packaging`;
  return {
    title: dict.packaging.title,
    description: dict.packaging.intro,
    alternates: { canonical: path },
    openGraph: { title: dict.packaging.title, description: dict.packaging.intro, url: path },
  };
}

export default async function PackagingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-12 sm:pb-16 md:pb-20">
      <div className="grid gap-6 sm:grid-cols-2">
        {dict.packaging.offers.map((offer) => {
          const href =
            offer.slug === "location-studio"
              ? `/${locale}/studio`
              : `/${locale}/packaging/${offer.slug}`;
          return (
            <Link
              key={offer.slug}
              href={href}
              className="group relative block aspect-[4/5] overflow-hidden"
            >
              <Image
                src={OFFER_IMAGES[offer.slug]}
                alt={offer.title}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <span className="wordmark font-serif text-2xl sm:text-3xl text-white">
                  {offer.title}
                </span>
                {offer.tagline && (
                  <p className="text-sm text-white/80 max-w-xs">{offer.tagline}</p>
                )}
                <span className="mt-2 inline-block border border-white px-6 py-2 text-xs uppercase tracking-[0.2em] text-white group-hover:bg-white group-hover:text-black transition-colors">
                  {offer.cta}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-16 border border-border px-6 py-10 sm:py-12 md:py-16 text-center">
        <h2 className="wordmark font-serif text-2xl font-light">{dict.packaging.gift.title}</h2>
        <p className="mt-4 max-w-xl mx-auto text-muted">{dict.packaging.gift.text}</p>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-block border border-foreground bg-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-transparent hover:text-foreground transition-colors"
        >
          {dict.packaging.gift.cta}
        </Link>
      </div>
    </div>
  );
}
