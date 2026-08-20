"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";

export type GalleryEndScreen = {
  next?: { href: string; label: string };
  nextKicker: string;
  bookHref: string;
  bookLabel: string;
  closeHref: string;
  closeLabel: string;
};

export default function Gallery({
  images,
  altPrefix,
  pairAfter = [],
  endScreen,
}: {
  images: StaticImageData[];
  altPrefix: string;
  pairAfter?: number[];
  /** When set, browsing past the last photo shows an end card instead of looping. */
  endScreen?: GalleryEndScreen;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const slideCount = images.length + (endScreen ? 1 : 0);
  const isEndCard = activeIndex === images.length;

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + slideCount) % slideCount)),
    [slideCount]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % slideCount)),
    [slideCount]
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
          <div
            className="relative max-h-[85vh] max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {isEndCard && endScreen ? (
              <div className="mx-auto flex max-w-sm flex-col items-center gap-8 py-16 text-center">
                {endScreen.next && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                      {endScreen.nextKicker}
                    </p>
                    <Link
                      href={endScreen.next.href}
                      className="wordmark font-serif text-2xl text-white mt-2 inline-block hover:opacity-80 transition-opacity"
                    >
                      {endScreen.next.label}
                    </Link>
                  </div>
                )}
                <Link
                  href={endScreen.bookHref}
                  className="inline-block border border-white px-8 py-3 text-xs uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-colors"
                >
                  {endScreen.bookLabel}
                </Link>
                <Link
                  href={endScreen.closeHref}
                  className="text-sm text-white/70 underline underline-offset-4 hover:text-white transition-colors"
                >
                  {endScreen.closeLabel}
                </Link>
              </div>
            ) : (
              <Image
                src={images[activeIndex ?? 0]}
                alt={`${altPrefix} ${(activeIndex ?? 0) + 1}`}
                sizes="90vw"
                className="mx-auto max-h-[85vh] w-auto h-auto object-contain"
                priority
              />
            )}
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
