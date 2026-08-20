import { ImageResponse } from "next/og";

export function generateImageMetadata() {
  return [
    { id: "64", size: { width: 64, height: 64 }, contentType: "image/png" },
    { id: "192", size: { width: 192, height: 192 }, contentType: "image/png" },
    { id: "512", size: { width: 512, height: 512 }, contentType: "image/png" },
  ];
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const iconId = await id;
  const size = iconId === "512" ? 512 : iconId === "192" ? 192 : 64;
  const fontSize = iconId === "512" ? 280 : iconId === "192" ? 108 : 36;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#161513",
          color: "#faf9f6",
          fontSize,
          fontFamily: "serif",
        }}
      >
        I
      </div>
    ),
    { width: size, height: size }
  );
}
