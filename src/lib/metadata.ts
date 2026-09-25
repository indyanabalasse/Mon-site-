import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/site";

const OG_SIZE = { width: 1200, height: 630 };

const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
  nl: "nl_BE",
};

function ogLocale(locale: Locale) {
  return OG_LOCALE[locale];
}

/**
 * Builds the 1200x630 Open Graph image URL for a page.
 *
 * Pass the page's own photo and it is composited into a correctly proportioned
 * frame by /api/og; pages without a photo fall back to the branded card. Linking
 * a source photo directly is what let portrait images lose most of the frame to
 * the 1.91:1 crop every social platform applies.
 */
function ogImageUrl(title: string, image?: string) {
  if (!image) return "/opengraph-image";
  return `/api/og?src=${encodeURIComponent(image)}&title=${encodeURIComponent(title)}`;
}

// Next.js metadata merging is shallow (a page's alternates/openGraph fully replace the layout's, field-by-field), so every page re-supplies hreflang + the full openGraph shape via this helper.
export function pageMetadataBase({
  path,
  locale,
  title,
  description,
  image,
}: {
  /** Locale-agnostic path starting with "/", e.g. "/portfolio/portrait". */
  path: string;
  locale: Locale;
  title: string;
  description: string;
  /** Optional page photo, composited into the 1200x630 OG frame. */
  image?: string;
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const canonical = `/${locale}${path}`;
  const imageUrl = ogImageUrl(title, image);

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
      locale: ogLocale(locale),
      alternateLocale: locales.filter((l) => l !== locale).map(ogLocale),
      type: "website",
      images: [{ url: imageUrl, ...OG_SIZE, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: imageUrl, ...OG_SIZE, alt: title }],
    },
  };
}

/**
 * Texte alternatif d'une vignette de catégorie.
 *
 * Les descriptions de catégorie vont d'une ligne à un paragraphe entier : on ne
 * garde que la première phrase, un alt trop long étant tronqué par les moteurs
 * et illisible pour les lecteurs d'écran.
 */
export function tileAlt(title: string, description: string) {
  const [firstSentence] = description.split(/(?<=[.!?])\s+/);
  const sentence = firstSentence ?? description;
  const trimmed =
    sentence.length > 110 ? `${sentence.slice(0, 107).trimEnd()}…` : sentence;
  return `${title} — ${trimmed}`;
}
