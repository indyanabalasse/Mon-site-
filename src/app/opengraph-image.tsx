import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#161513",
          color: "#faf9f6",
        }}
      >
        <div style={{ fontSize: 96, fontFamily: "serif", letterSpacing: 4 }}>
          INDYANASTUDIO
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            fontFamily: "sans-serif",
            letterSpacing: 2,
            opacity: 0.75,
          }}
        >
          Indyana Balasse — Photographie
        </div>
      </div>
    ),
    { ...size }
  );
}
