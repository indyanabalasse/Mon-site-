import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export type MasonryTile = {
  href: string;
  cover: StaticImageData;
  label: string;
};

// Hand-tuned patchwork rhythm — one anchor tile, a couple of tall accents,
// the rest square — so tiles interlock instead of stacking into columns.
function spanClass(i: number): string {
  switch (i % 6) {
    case 0:
      return "col-span-2 row-span-2"; // big anchor
    case 2:
      return "row-span-2"; // tall accent
    case 4:
      return "row-span-2"; // tall accent
    default:
      return ""; // square
  }
}

export default function MasonryNav({ items }: { items: MasonryTile[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 [grid-auto-flow:dense] auto-rows-[150px] sm:auto-rows-[190px] lg:auto-rows-[210px] gap-3 sm:gap-5">
      {items.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className={`group relative block overflow-hidden ${spanClass(i)}`}
        >
          <Image
            src={item.cover}
            alt={item.label}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="wordmark font-serif text-xl sm:text-2xl lg:text-3xl text-white text-center px-4">
              {item.label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
