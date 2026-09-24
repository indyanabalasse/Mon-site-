import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isLocale, defaultLocale, locales, type Locale } from "@/lib/i18n";
import { pageMetadataBase } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import corporateCover from "@/images/portfolio/corporate/esg-logic/01.jpg";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const base = pageMetadataBase({
    path: "/entreprises",
    locale,
    title: dict.business.heading,
    description: dict.business.metaDescription,
    image: corporateCover.src,
  });
  return {
    title: dict.business.heading,
    description: dict.business.metaDescription,
    ...base,
  };
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const page = dict.business;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/${locale}/entreprises#faq`,
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header>
        <h1 className="wordmark font-serif text-3xl sm:text-4xl font-light">{page.heading}</h1>
        {page.intro.map((paragraph) => (
          <p key={paragraph} className="mt-5 leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-block border border-foreground bg-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-transparent hover:text-foreground transition-colors"
        >
          {page.ctaLabel}
        </Link>
      </header>

      <section className="mt-20">
        <h2 className="text-xs uppercase tracking-[0.2em] text-muted">{page.servicesTitle}</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {page.services.map((service) => (
            <div key={service.title}>
              <h3 className="wordmark font-serif text-xl font-light">{service.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-xs uppercase tracking-[0.2em] text-muted">{page.processTitle}</h2>
        <ol className="mt-8 space-y-5">
          {page.process.map((step, index) => (
            <li key={step} className="flex gap-5">
              <span className="shrink-0 text-sm text-muted tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="leading-relaxed text-muted">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <h2 className="text-xs uppercase tracking-[0.2em] text-muted">{page.faqTitle}</h2>
        <dl className="mt-8 space-y-7">
          {page.faq.map((item) => (
            <div key={item.q}>
              <dt className="wordmark font-serif text-xl font-light">{item.q}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-20 border border-border px-6 py-10 sm:py-12 text-center">
        <h2 className="wordmark font-serif text-2xl font-light">{page.ctaTitle}</h2>
        <p className="mt-4 max-w-xl mx-auto text-muted">{page.ctaText}</p>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-block border border-foreground bg-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-transparent hover:text-foreground transition-colors"
        >
          {page.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
