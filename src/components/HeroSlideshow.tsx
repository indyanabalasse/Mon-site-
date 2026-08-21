"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { HeroImage } from "@/data/portfolio";

const INTERVAL_MS = 6000;
// The active photo fades out to black first, then the next one fades in —
// never both visible at once, unlike a crossfade.
const FADE_MS = 1200;

const POSITION_CLASS: Record<NonNullable<HeroImage["position"]>, string> = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
};

export default function HeroSlideshow({
  images,
  alt,
}: {
  images: HeroImage[];
  alt: string;
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

  return (
    <div className="absolute inset-0">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img.src}
          alt={alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover ${POSITION_CLASS[img.position ?? "center"]} transition-opacity ease-in-out ${
            i === active && visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDuration: `${FADE_MS}ms` }}
        />
      ))}
    </div>
  );
}
