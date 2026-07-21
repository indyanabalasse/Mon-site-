import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const path = `/${locale}/contact`;
  return {
    title: dict.contact.title,
    description: dict.contact.intro,
    alternates: { canonical: path },
    openGraph: { title: dict.contact.title, description: dict.contact.intro, url: path },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <header className="text-center mb-14">
        <h1 className="wordmark font-serif text-4xl font-light">{dict.contact.title}</h1>
        <p className="mt-4 text-muted">{dict.contact.intro}</p>
      </header>

      <ContactForm locale={locale} labels={dict.contact} />

      <p className="mt-12 text-center text-sm text-muted">
        {dict.contact.directly}{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-4">
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="mt-2 text-center text-sm text-muted">
        {dict.contact.phone}{" "}
        <a href={`tel:${CONTACT_PHONE_HREF}`} className="text-foreground underline underline-offset-4">
          {CONTACT_PHONE_DISPLAY}
        </a>
      </p>
    </div>
  );
}
