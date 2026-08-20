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

// Capping columns to the item count keeps a short gallery from leaving empty
// trailing columns (which reads as left-justified instead of centered).
const MASONRY_COLS: Record<number, string> = {
  1: "columns-1",
  2: "columns-1 sm:columns-2",
  3: "columns-1 sm:columns-2 lg:columns-3",
};
const MASONRY_COLS_DEFAULT = "columns-1 sm:columns-2 lg:columns-3 xl:columns-4";

const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};
const GRID_COLS_DEFAULT = "grid-cols-2 sm:grid-cols-3";

export default function MasonryNav({
  items,
  variant = "masonry",
}: {
  items: MasonryTile[];
  /** "grid" renders every tile at the same size in a uniform 2/3-column grid. */
  variant?: "masonry" | "grid";
}) {
  if (variant === "grid") {
    const colsClass = GRID_COLS[items.length] ?? GRID_COLS_DEFAULT;
    return (
      <div className={`grid ${colsClass} gap-4 sm:gap-6`}>
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
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
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

  const colsClass = MASONRY_COLS[items.length] ?? MASONRY_COLS_DEFAULT;

  return (
    <div className={`${colsClass} gap-6 [column-fill:_balance]`}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group relative mb-6 block w-full break-inside-avoid overflow-hidden"
        >
          {item.covers && item.covers.length > 1 ? (
            <div className="transition-transform duration-1000 ease-out group-hover:scale-110">
              <TileSlideshow images={item.covers} alt={item.label} sizes={TILE_SIZES} />
            </div>
          ) : (
            <Image
              src={item.cover}
              alt={item.label}
              sizes={TILE_SIZES}
              className="w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
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
