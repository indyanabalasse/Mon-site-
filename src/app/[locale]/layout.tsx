import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_HREF,
  INSTAGRAM_URL,
  SERVICE_AREA_CITIES,
  SERVICE_AREA_REGIONS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBookCta from "@/components/StickyBookCta";

const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.add(t);document.documentElement.style.colorScheme=t;}catch(e){}})();`;

const OG_LOCALE_CODE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
  nl: "nl_BE",
};

const SITE_TITLE: Record<Locale, string> = {
  fr: "INDYANASTUDIO, photographe corporate à Bruxelles",
  en: "INDYANASTUDIO, corporate photographer in Brussels",
  nl: "INDYANASTUDIO, corporate fotograaf in Brussel",
};

const SITE_DESCRIPTION: Record<Locale, string> = {
  fr: "Photographe corporate à Bruxelles et en Brabant wallon : portraits d'équipe, portraits professionnels, événements d'entreprise et portrait artistique. Devis sous 24h.",
  en: "Corporate photographer in Brussels and Walloon Brabant: team portraits, professional headshots, company events and artistic portraits. Quote within 24h.",
  nl: "Corporate fotograaf in Brussel en Waals-Brabant: teamportretten, professionele profielfoto's, bedrijfsevenementen en artistieke portretten. Offerte binnen 24u.",
};

const PORTFOLIO_DESCRIPTION: Record<Locale, string> = {
  fr: "Portfolio photographique d'Indyana Balasse.",
  en: "Photography portfolio of Indyana Balasse.",
  nl: "Fotografieportfolio van Indyana Balasse.",
};

const JOB_TITLE: Record<Locale, string> = {
  fr: "Photographe",
  en: "Photographer",
  nl: "Fotograaf",
};

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
  // Le titre porte le métier et la ville : « INDYANASTUDIO » seul ne répond à
  // aucune recherche de quelqu'un qui cherche un photographe sans la connaître.
  const title = SITE_TITLE[locale];
  const description = SITE_DESCRIPTION[locale];

  return {
    title: {
      default: title,
      template: "%s — INDYANASTUDIO",
    },
    description,
    authors: [{ name: "Indyana Balasse" }],
    creator: "Indyana Balasse",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": "/fr",
      },
    },
    openGraph: {
      title,
      description: PORTFOLIO_DESCRIPTION[locale],
      url: `/${locale}`,
      siteName: SITE_NAME,
      locale: OG_LOCALE_CODE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE_CODE[l]),
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    verification: {
      google: "R-YOBvqzTjQzcHYtTIsTnGaLy6ENZxXLh9HFKQbmZDI",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  if (!isLocale(rawLocale)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Indyana Balasse",
        alternateName: SITE_NAME,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        jobTitle: JOB_TITLE[locale],
        telephone: CONTACT_PHONE_HREF,
        email: CONTACT_EMAIL,
        sameAs: [INSTAGRAM_URL],
        worksFor: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        image: `${SITE_URL}/opengraph-image`,
        url: SITE_URL,
        telephone: CONTACT_PHONE_HREF,
        email: CONTACT_EMAIL,
        priceRange: "€€",
        // Établissement « zone desservie » : pas d'adresse publiée, donc areaServed
        // porte seul le signal local. « Country: Belgium » couvrait 11 millions
        // d'habitants et ne pesait sur aucune requête géolocalisée.
        areaServed: [
          ...SERVICE_AREA_REGIONS.map((name) => ({
            "@type": "AdministrativeArea",
            name,
          })),
          ...SERVICE_AREA_CITIES.map((name) => ({ "@type": "City", name })),
        ],
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 50.8503,
            longitude: 4.3517,
          },
          geoRadius: 40000,
        },
        founder: { "@id": `${SITE_URL}/#person` },
        sameAs: [INSTAGRAM_URL],
      },
    ],
  };

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Header locale={locale} />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer locale={locale} />
        <StickyBookCta locale={locale} />
      </body>
    </html>
  );
}
