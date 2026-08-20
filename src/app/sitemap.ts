import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { locales } from "@/lib/i18n";
import { categories, isSeriesGroup } from "@/data/portfolio";

const routes = [
  "",
  "/portfolio",
  "/studio",
  "/packaging",
  "/packaging/shooting-studio",
  "/packaging/shooting-evenement",
  "/packaging/photobooth",
  "/about",
  "/contact",
  ...categories.flatMap((category) => [
    `/portfolio/${category.slug}`,
    ...category.series.flatMap((series) =>
      isSeriesGroup(series)
        ? [
            `/portfolio/${category.slug}/${series.slug}`,
            ...series.subseries.map(
              (sub) => `/portfolio/${category.slug}/${series.slug}/${sub.slug}`
            ),
          ]
        : [`/portfolio/${category.slug}/${series.slug}`]
    ),
  ]),
];

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
