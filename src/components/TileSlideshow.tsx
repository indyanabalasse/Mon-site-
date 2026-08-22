"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";

const INTERVAL_MS = 6000;
// The active photo fades out to black first, then the next one fades in —
// never both visible at once, unlike a crossfade.
const FADE_MS = 1200;

export default function TileSlideshow({
  images,
  alt,
  sizes,
  fill = false,
}: {
  images: StaticImageData[];
  alt: string;
  sizes: string;
  /** When true, fills the parent's box instead of computing its own aspect ratio. */
  fill?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActive((i) => (i + 1) % images.length);
        setVisible(true);
      }, FADE_MS);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  const first = images[0];

  return (
    <div
      className={fill ? "relative w-full h-full bg-black" : "relative w-full bg-black"}
      style={fill ? undefined : { aspectRatio: `${first.width} / ${first.height}` }}
    >
      {images.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt={alt}
          fill
          priority={i === 0}
          sizes={sizes}
          placeholder="blur"
          className={`object-cover transition-opacity ease-in-out ${
            i === active && visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDuration: `${FADE_MS}ms` }}
        />
      ))}
    </div>
  );
}
