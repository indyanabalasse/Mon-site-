import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import TileSlideshow from "./TileSlideshow";

export type MasonryTile = {
  href: string;
  cover: StaticImageData;
  covers?: StaticImageData[];
  label: string;
  showLabel?: boolean;
};

const TILE_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";
const GRID_SIZES = "(min-width: 640px) 33vw, 50vw";

export default function MasonryNav({
  items,
  variant = "masonry",
}: {
  items: MasonryTile[];
  /** "grid" renders every tile at the same size in a uniform 2/3-column grid. */
  variant?: "masonry" | "grid";
}) {
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative block aspect-square overflow-hidden"
          >
            {item.covers && item.covers.length > 1 ? (
              <TileSlideshow images={item.covers} alt={item.label} sizes={GRID_SIZES} fill />
            ) : (
              <Image
                src={item.cover}
                alt={item.label}
                fill
                sizes={GRID_SIZES}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder="blur"
              />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            {item.showLabel !== false && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="wordmark font-serif text-lg sm:text-2xl text-white text-center px-4">
                  {item.label}
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group relative mb-6 block w-full break-inside-avoid overflow-hidden"
        >
          {item.covers && item.covers.length > 1 ? (
            <div className="transition-transform duration-700 group-hover:scale-105">
              <TileSlideshow images={item.covers} alt={item.label} sizes={TILE_SIZES} />
            </div>
          ) : (
            <Image
              src={item.cover}
              alt={item.label}
              sizes={TILE_SIZES}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              placeholder="blur"
            />
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          {item.showLabel !== false && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="wordmark font-serif text-2xl sm:text-3xl text-white text-center px-4">
                {item.label}
              </span>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
