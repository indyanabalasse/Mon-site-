import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { categories, heroImages } from "@/data/portfolio";
import { INSTAGRAM_URL } from "@/lib/site";
import { InstagramIcon } from "@/components/icons";
import HeroSlideshow from "@/components/HeroSlideshow";
import MasonryNav from "@/components/MasonryNav";
import Link from "next/link";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  const tiles = categories.map((category) => ({
    href: `/${locale}/portfolio/${category.slug}`,
    cover: category.cover,
    covers: category.coverImages,
    label: dict.categories[category.slug].title,
  }));

  return (
    <div>
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <HeroSlideshow images={heroImages} alt="Indyana Balasse — INDYANASTUDIO" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-20 text-center text-white">
          <h1 className="wordmark font-serif italic text-4xl sm:text-6xl font-light fade-in">
            Color Your Life !
          </h1>
          <Link
            href={`/${locale}/portfolio`}
            className="mt-10 border border-white/70 px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
          >
            {dict.home.cta}
          </Link>
        </div>
      </section>

      <section className="w-full pt-16 pb-24">
        <MasonryNav items={tiles} />
      </section>

      <section className="border-t border-border bg-foreground text-background">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center flex flex-col items-center">
          <InstagramIcon className="h-10 w-10" />
          <h2 className="wordmark font-serif text-2xl sm:text-3xl mt-6">
            {dict.instagramBanner.title}
          </h2>
          <p className="mt-4 max-w-lg text-background/80">
            {dict.instagramBanner.text}
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block border border-background px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-background hover:text-foreground transition-colors"
          >
            {dict.instagramBanner.cta}
          </a>
        </div>
      </section>
    </div>
  );
}
