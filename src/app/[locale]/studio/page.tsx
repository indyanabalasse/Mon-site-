import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { CONTACT_ADDRESS, CONTACT_MAPS_URL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "@/lib/site";
import { MapPinIcon, PhoneIcon } from "@/components/icons";
import heroImage from "@/images/Studio/PHOTO-2026-08-14-13-01-50.jpg";
import lightingImage from "@/images/Studio/PHOTO-2026-08-13-11-25-37.jpg";
import backdropImage from "@/images/Studio/PHOTO-2026-08-13-11-26-57.jpg";
import makeupImage from "@/images/Studio/PHOTO-2026-08-13-11-24-52.jpg";
import naturalLightImage from "@/images/Studio/PHOTO-2026-08-13-11-17-39.jpg";
import gardenImage from "@/images/Studio/PHOTO-2026-08-13-11-26-12.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const path = `/${locale}/studio`;
  return {
    title: dict.studio.title,
    description: dict.studio.highlight,
    alternates: { canonical: path },
    openGraph: { title: dict.studio.title, description: dict.studio.highlight, url: path },
  };
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const studio = dict.studio;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <header className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{studio.subtitle}</p>
        <h1 className="wordmark font-serif text-4xl font-light mt-3">{studio.title}</h1>
        <div className="mt-4 flex flex-col items-center gap-2 text-muted">
          <a
            href={CONTACT_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <MapPinIcon className="h-4 w-4" />
            {CONTACT_ADDRESS}
          </a>
          <a
            href={`tel:${CONTACT_PHONE_HREF}`}
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <PhoneIcon className="h-4 w-4" />
            {CONTACT_PHONE_DISPLAY}
          </a>
        </div>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-block border border-foreground bg-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-transparent hover:text-foreground transition-colors"
        >
          {studio.closing.cta}
        </Link>
      </header>

      <div className="relative aspect-[16/9] overflow-hidden mb-16">
        <Image
          src={heroImage}
          alt={studio.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-3xl mx-auto text-center mb-20">
        <p className="leading-relaxed text-muted">{studio.highlight}</p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="wordmark font-serif text-2xl font-light">{studio.equipment.title}</h2>
          <ul className="mt-6 space-y-3">
            {studio.equipment.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted leading-relaxed">
                <span className="text-muted">—</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={`/${locale}/contact`}
            className="mt-8 inline-block border border-foreground bg-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-transparent hover:text-foreground transition-colors"
          >
            {studio.equipment.cta}
          </Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={lightingImage}
            alt={studio.equipment.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="relative aspect-square overflow-hidden">
          <Image src={backdropImage} alt={studio.title} fill sizes="33vw" className="object-cover" />
        </div>
        <div className="relative aspect-square overflow-hidden">
          <Image src={makeupImage} alt={studio.title} fill sizes="33vw" className="object-cover" />
        </div>
        <div className="relative aspect-square overflow-hidden">
          <Image src={naturalLightImage} alt={studio.title} fill sizes="33vw" className="object-cover" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto text-center mt-20 pt-16 border-t border-border">
        <h2 className="wordmark font-serif text-2xl font-light">{studio.kitchen.title}</h2>
        <p className="mt-5 leading-relaxed text-muted">{studio.kitchen.text}</p>
      </div>

      <div className="max-w-2xl mx-auto text-center mt-16">
        <p className="text-sm text-muted leading-relaxed">{studio.sanitary.text}</p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:items-center mt-16 pt-16 border-t border-border">
        <div>
          <h2 className="wordmark font-serif text-2xl font-light">{studio.garden.title}</h2>
          <p className="mt-5 leading-relaxed text-muted">{studio.garden.text}</p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={gardenImage}
            alt={studio.garden.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
