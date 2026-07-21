import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  return {
    title: {
      default: "INDYANASTUDIO — Indyana Balasse Photographie",
      template: "%s — INDYANASTUDIO",
    },
    description: isFr
      ? "Portfolio photographique d'Indyana Balasse : portraits noir et blanc et scène électronique. Studio basé en Belgique."
      : "Photography portfolio of Indyana Balasse: black and white portraits and the electronic music scene. Studio based in Belgium.",
    metadataBase: new URL("https://indyanabalasse.com"),
    alternates: {
      languages: { fr: "/fr", en: "/en" },
    },
    openGraph: {
      title: "INDYANASTUDIO — Indyana Balasse Photographie",
      description: isFr
        ? "Portfolio photographique d'Indyana Balasse."
        : "Photography portfolio of Indyana Balasse.",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
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

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
