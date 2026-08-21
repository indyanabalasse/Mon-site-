"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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

const AUTO_ADVANCE_MS = 4500;
// Each direction of the fade-to-black: the current photo fades out to the
// black backdrop first, then the next one fades in from black — never both
// visible at once, unlike a crossfade.
const FADE_MS = 900;
// Kept well past FADE_MS so the zoom is still gently drifting, never visibly
// finished, right up to the moment a photo fades out for the next one.
const ZOOM_MS = 7000;

function FadeToBlackImage({
  images,
  altPrefix,
  activeIndex,
}: {
  images: StaticImageData[];
  altPrefix: string;
  activeIndex: number;
}) {
  const [displayedIndex, setDisplayedIndex] = useState(activeIndex);
  const [visible, setVisible] = useState(false);
  const prevActiveRef = useRef(activeIndex);

  // Initial mount: fade in from black.
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Later navigations: fade the current photo out to black, then swap the
  // source and fade the new one in, so the two are never blended together.
  useEffect(() => {
    if (activeIndex === prevActiveRef.current) return;
    prevActiveRef.current = activeIndex;
    setVisible(false);
    const id = setTimeout(() => {
      setDisplayedIndex(activeIndex);
      requestAnimationFrame(() => setVisible(true));
    }, FADE_MS);
    return () => clearTimeout(id);
  }, [activeIndex]);

  return (
    <Image
      src={images[displayedIndex]}
      alt={`${altPrefix} ${displayedIndex + 1}`}
      fill
      sizes="90vw"
      className={`object-contain ${visible ? "opacity-100 scale-110" : "opacity-0 scale-100"}`}
      style={{
        transition: `opacity ${FADE_MS}ms ease-in-out, transform ${ZOOM_MS}ms ease-out`,
      }}
      priority
    />
  );
}

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

  // Horizontal swipe to move between photos on touch devices.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const SWIPE_MIN_DISTANCE = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;

      // Ignore mostly-vertical gestures so scrolling never flips the photo.
      if (Math.abs(deltaX) < SWIPE_MIN_DISTANCE || Math.abs(deltaX) <= Math.abs(deltaY)) return;

      if (deltaX < 0) showNext();
      else showPrev();
    },
    [showNext, showPrev]
  );

  // Auto-advance to the next photo while the lightbox is open, pausing on
  // the end card so it doesn't navigate away from the CTA on its own.
  useEffect(() => {
    if (activeIndex === null || isEndCard) return;
    const id = setInterval(showNext, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [activeIndex, isEndCard, showNext]);

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
        <div key={a} className="mb-4 flex flex-col sm:flex-row gap-4 break-inside-avoid">
          <button
            onClick={() => setActiveIndex(a)}
            className="block w-full sm:w-1/2 focus:outline-none"
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
            className="block w-full sm:w-1/2 focus:outline-none"
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
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Fermer"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-3 text-white text-3xl leading-none"
          >
            ×
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Précédent"
            className="absolute left-2 sm:left-6 z-10 text-white text-3xl px-2 py-2"
          >
            ‹
          </button>
          <div
            className="relative h-[85vh] max-w-5xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {isEndCard && endScreen ? (
              <div className="absolute inset-0 flex items-center justify-center overflow-y-auto px-4">
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
              </div>
            ) : (
              <FadeToBlackImage
                images={images}
                altPrefix={altPrefix}
                activeIndex={activeIndex ?? 0}
              />
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Suivant"
            className="absolute right-2 sm:right-6 z-10 text-white text-3xl px-2 py-2"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
