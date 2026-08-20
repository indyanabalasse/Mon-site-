"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { HeroImage } from "@/data/portfolio";

const INTERVAL_MS = 6000;

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

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
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
          className={`object-cover ${POSITION_CLASS[img.position ?? "center"]} transition-opacity duration-[1500ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
