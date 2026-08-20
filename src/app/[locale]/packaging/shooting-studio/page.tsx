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
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-center mb-16">
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
          <h1 className="wordmark font-serif text-4xl font-light mt-3">{offer.title}</h1>
          <p className="mt-5 leading-relaxed text-muted">{offer.intro}</p>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-3">
        {offer.styles.map((style) => (
          <div key={style.title} className="border-t border-border pt-6">
            <h2 className="wordmark font-serif text-xl font-light">{style.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{style.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 pt-16 border-t border-border max-w-2xl mx-auto">
        <h2 className="wordmark font-serif text-2xl font-light text-center mb-12">
          {offer.journeyTitle}
        </h2>
        <ol className="space-y-8">
          {offer.journey.map((step, i) => (
            <li key={step.title} className="flex gap-6">
              <span className="wordmark font-serif text-2xl text-muted shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-medium">{step.title}</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <ul className="mt-16 space-y-3 max-w-xl mx-auto">
        {offer.criteria.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-muted leading-relaxed">
            <span className="text-muted">—</span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-16 border-t border-border pt-16 text-center">
        <h2 className="wordmark font-serif text-2xl font-light">{offer.ctaTitle}</h2>
        <p className="mt-4 max-w-xl mx-auto text-muted">{offer.ctaText}</p>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-block border border-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
        >
          {offer.ctaButton}
        </Link>
      </div>
    </div>
  );
}
