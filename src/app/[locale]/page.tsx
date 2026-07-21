import Image from "next/image";
import Link from "next/link";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { categorySlugs, coverImages, heroImage } from "@/data/portfolio";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div>
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt="Indyana Balasse — INDYANASTUDIO"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-20 text-center text-white">
          <h1 className="wordmark font-serif text-4xl sm:text-6xl font-light fade-in">
            INDYANASTUDIO
          </h1>
          <p className="mt-6 max-w-xl text-sm sm:text-base font-light italic text-white/90 fade-in">
            {dict.home.tagline}
          </p>
          <Link
            href={`/${locale}/portfolio`}
            className="mt-10 border border-white/70 px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
          >
            {dict.home.cta}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        {dict.home.intro.map((p) => (
          <p key={p} className="mt-6 text-lg leading-relaxed text-foreground/90 first:mt-0">
            {p}
          </p>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="wordmark font-serif text-xl text-center mb-10 text-muted">
          {dict.home.categoriesTitle}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {categorySlugs.map((slug) => (
            <Link
              key={slug}
              href={`/${locale}/portfolio/${slug}`}
              className="group relative block aspect-[4/5] overflow-hidden"
            >
              <Image
                src={coverImages[slug]}
                alt={dict.categories[slug].title}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="wordmark font-serif text-2xl text-white">
                  {dict.categories[slug].title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
