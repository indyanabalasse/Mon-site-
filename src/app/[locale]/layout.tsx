import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";
import { INSTAGRAM_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.add(t);document.documentElement.style.colorScheme=t;}catch(e){}})();`;

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
  const { locale } = await params;
  const isFr = locale === "fr";
  const title = "INDYANASTUDIO — Indyana Balasse Photographie";
  const description = isFr
    ? "Portfolio photographique d'Indyana Balasse : portraits noir et blanc et scène électronique. Studio basé en Belgique."
    : "Photography portfolio of Indyana Balasse: black and white portraits and the electronic music scene. Studio based in Belgium.";

  return {
    title: {
      default: title,
      template: "%s — INDYANASTUDIO",
    },
    description,
    keywords: isFr
      ? [
          "photographe Belgique",
          "photographe portrait",
          "photographie noir et blanc",
          "photographe scène électronique",
          "INDYANASTUDIO",
          "Indyana Balasse",
        ]
      : [
          "Belgium photographer",
          "portrait photographer",
          "black and white photography",
          "electronic scene photographer",
          "INDYANASTUDIO",
          "Indyana Balasse",
        ],
    authors: [{ name: "Indyana Balasse" }],
    creator: "Indyana Balasse",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en", "x-default": "/fr" },
    },
    openGraph: {
      title,
      description: isFr
        ? "Portfolio photographique d'Indyana Balasse."
        : "Photography portfolio of Indyana Balasse.",
      url: `/${locale}`,
      siteName: SITE_NAME,
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
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
    "@type": "Person",
    name: "Indyana Balasse",
    alternateName: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    jobTitle: locale === "fr" ? "Photographe" : "Photographer",
    address: { "@type": "PostalAddress", addressCountry: "BE" },
    sameAs: [INSTAGRAM_URL],
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
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
