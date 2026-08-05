"use client";

import { useState } from "react";
import type { StaticImageData } from "next/image";
import Gallery from "@/components/Gallery";

export default function TabbedGallery<Slug extends string>({
  slugs,
  subcategories,
  labels,
  altPrefix,
}: {
  slugs: Slug[];
  subcategories: Record<Slug, StaticImageData[]>;
  labels: Record<Slug, string>;
  altPrefix: string;
}) {
  const [active, setActive] = useState<Slug>(slugs[0]);
  const images = subcategories[active];

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {slugs.map((slug) => (
          <button
            key={slug}
            onClick={() => setActive(slug)}
            className={`px-5 py-2 text-xs uppercase tracking-[0.2em] border transition-colors ${
              active === slug
                ? "border-foreground bg-foreground text-background"
                : "border-foreground/30 text-muted hover:border-foreground/60"
            }`}
          >
            {labels[slug]}
          </button>
        ))}
      </div>

      {images.length > 0 ? (
        <Gallery images={images} altPrefix={`${altPrefix} — ${labels[active]}`} />
      ) : (
        <p className="text-center text-muted py-20">
          {labels[active]} — bientôt disponible.
        </p>
      )}
    </>
  );
}
