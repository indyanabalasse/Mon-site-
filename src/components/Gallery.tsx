"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";

export default function Gallery({
  images,
  altPrefix,
  pairAfter = [],
}: {
  images: StaticImageData[];
  altPrefix: string;
  pairAfter?: number[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, showPrev, showNext]);

  const pairSet = new Set(pairAfter);
  const items: ReactNode[] = [];
  for (let i = 0; i < images.length; i++) {
    if (pairSet.has(i) && i + 1 < images.length) {
      const a = i;
      const b = i + 1;
      items.push(
        <div key={a} className="mb-4 flex gap-4 break-inside-avoid">
          <button
            onClick={() => setActiveIndex(a)}
            className="block w-1/2 focus:outline-none"
          >
            <Image
              src={images[a]}
              alt={`${altPrefix} ${a + 1}`}
              sizes="(min-width: 1024px) 17vw, (min-width: 640px) 25vw, 50vw"
              className="w-full h-auto object-cover transition-opacity hover:opacity-90"
              placeholder="blur"
            />
          </button>
          <button
            onClick={() => setActiveIndex(b)}
            className="block w-1/2 focus:outline-none"
          >
            <Image
              src={images[b]}
              alt={`${altPrefix} ${b + 1}`}
              sizes="(min-width: 1024px) 17vw, (min-width: 640px) 25vw, 50vw"
              className="w-full h-auto object-cover transition-opacity hover:opacity-90"
              placeholder="blur"
            />
          </button>
        </div>
      );
      i++;
    } else {
      items.push(
        <button
          key={i}
          onClick={() => setActiveIndex(i)}
          className="mb-4 block w-full break-inside-avoid focus:outline-none"
        >
          <Image
            src={images[i]}
            alt={`${altPrefix} ${i + 1}`}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="w-full h-auto object-cover transition-opacity hover:opacity-90"
            placeholder="blur"
          />
        </button>
      );
    }
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {items}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4"
          onClick={close}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Fermer"
            className="absolute top-6 right-6 text-white text-3xl leading-none"
          >
            ×
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Précédent"
            className="absolute left-2 sm:left-6 text-white text-3xl px-2"
          >
            ‹
          </button>
          <div className="relative max-h-[85vh] max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[activeIndex]}
              alt={`${altPrefix} ${activeIndex + 1}`}
              sizes="90vw"
              className="mx-auto max-h-[85vh] w-auto h-auto object-contain"
              priority
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Suivant"
            className="absolute right-2 sm:right-6 text-white text-3xl px-2"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
