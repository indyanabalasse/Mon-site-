"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";

const INTERVAL_MS = 6000;

export default function TileSlideshow({
  images,
  alt,
  sizes,
}: {
  images: StaticImageData[];
  alt: string;
  sizes: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  const first = images[0];

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${first.width} / ${first.height}` }}
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
          className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
