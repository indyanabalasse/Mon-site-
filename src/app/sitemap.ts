import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { locales } from "@/lib/i18n";
import { categorySlugs } from "@/data/portfolio";

const routes = ["", "/portfolio", "/about", "/contact", ...categorySlugs.map((slug) => `/portfolio/${slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${route}`])),
      },
    }))
  );
}
