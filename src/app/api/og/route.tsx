import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph image generator.
 *
 * Facebook, LinkedIn and WhatsApp all crop shared images to 1.91:1. Several pages
 * use portrait source photos, so linking them directly cost up to 61% of the frame.
 * This route composites the page's own photo into a correct 1200x630 frame instead
 * of falling back to a generic branded card.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawSrc = searchParams.get("src");
  const title = searchParams.get("title")?.slice(0, 120) ?? "";

  // Only ever composite images this site itself built: the param reaches fetch(), so
  // an unchecked value would turn this route into an open proxy.
  const src =
    rawSrc && rawSrc.startsWith("/_next/static/media/") ? `${SITE_URL}${rawSrc}` : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#161513",
          color: "#faf9f6",
        }}
      >
        {src ? (
          // Satori rasterise ce JSX en PNG : next/image n'y fonctionne pas, et
          // l'alt n'a pas de sens dans une image déjà aplatie (le vrai texte
          // alternatif est porté par og:image:alt).
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt=""
            src={src}
            width={size.width}
            height={size.height}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.15) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 64,
            right: 64,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {title ? (
            <div style={{ fontSize: 60, fontFamily: "serif", lineHeight: 1.1 }}>{title}</div>
          ) : null}
          <div
            style={{
              marginTop: title ? 20 : 0,
              fontSize: 26,
              fontFamily: "sans-serif",
              letterSpacing: 3,
              opacity: 0.82,
            }}
          >
            {SITE_NAME.toUpperCase()}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
