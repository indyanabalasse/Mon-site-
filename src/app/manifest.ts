import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Indyana Balasse Photographie`,
    short_name: SITE_NAME,
    description: "Portfolio photographique d'Indyana Balasse : portraits noir et blanc et scène électronique.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
