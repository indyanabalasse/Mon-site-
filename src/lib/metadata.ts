import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/site";

// Next.js metadata merging is shallow (a page's alternates/openGraph fully replace the layout's, field-by-field), so every page re-supplies hreflang + the full openGraph shape via this helper.
export function pageMetadataBase({
  path,
  locale,
  title,
  description,
}: {
  /** Locale-agnostic path starting with "/", e.g. "/portfolio/portrait". */
  path: string;
  locale: Locale;
  title: string;
  description: string;
}): Pick<Metadata, "alternates" | "openGraph"> {
  const canonical = `/${locale}${path}`;
  return {
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
        "x-default": `/fr${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
  };
}
