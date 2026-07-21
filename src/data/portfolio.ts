import type { StaticImageData } from "next/image";

import bw01 from "@/images/black-and-white/bw-01.jpg";
import bw02 from "@/images/black-and-white/bw-02.jpg";
import bw03 from "@/images/black-and-white/bw-03.jpg";
import bw04 from "@/images/black-and-white/bw-04.jpeg";
import bw05 from "@/images/black-and-white/bw-05.jpg";
import bw06 from "@/images/black-and-white/bw-06.jpeg";
import bw07 from "@/images/black-and-white/bw-07.jpg";
import bw08 from "@/images/black-and-white/bw-08.jpeg";

import es01 from "@/images/electronic-scene/es-01.jpg";
import es02 from "@/images/electronic-scene/es-02.jpg";
import es03 from "@/images/electronic-scene/es-03.jpg";
import es04 from "@/images/electronic-scene/es-04.jpg";
import es05 from "@/images/electronic-scene/es-05.jpg";
import es06 from "@/images/electronic-scene/es-06.jpg";
import es07 from "@/images/electronic-scene/es-07.jpg";

export type CategorySlug = "black-and-white" | "electronic-scene";

export const categorySlugs: CategorySlug[] = ["black-and-white", "electronic-scene"];

export const portfolio: Record<CategorySlug, StaticImageData[]> = {
  "black-and-white": [bw01, bw02, bw03, bw04, bw05, bw06, bw07, bw08],
  "electronic-scene": [es01, es02, es03, es04, es05, es06, es07],
};

export const heroImage = es01;
export const coverImages: Record<CategorySlug, StaticImageData> = {
  "black-and-white": bw08,
  "electronic-scene": es01,
};
