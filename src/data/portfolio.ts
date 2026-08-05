import type { StaticImageData } from "next/image";

import concert01 from "@/images/concert/concert-01.jpg";
import concert02 from "@/images/concert/concert-02.jpg";
import concert03 from "@/images/concert/concert-03.jpg";
import concert04 from "@/images/concert/concert-04.jpg";
import concert05 from "@/images/concert/concert-05.jpg";
import concert06 from "@/images/concert/concert-06.jpg";
import concert07 from "@/images/concert/concert-07.jpg";
import concert08 from "@/images/concert/concert-08.jpg";
import concert09 from "@/images/concert/concert-09.jpg";
import concert10 from "@/images/concert/concert-10.jpg";
import concert11 from "@/images/concert/concert-11.jpg";
import concert12 from "@/images/concert/concert-12.jpg";
import concert13 from "@/images/concert/concert-13.jpg";
import concert14 from "@/images/concert/concert-14.jpg";
import concert15 from "@/images/concert/concert-15.jpg";
import concert16 from "@/images/concert/concert-16.jpg";
import concert17 from "@/images/concert/concert-17.jpg";
import concert18 from "@/images/concert/concert-18.jpg";
import concert19 from "@/images/concert/concert-19.jpg";
import concert20 from "@/images/concert/concert-20.jpg";
import concert21 from "@/images/concert/concert-21.jpg";
import concert22 from "@/images/concert/concert-22.jpg";
import concert23 from "@/images/concert/concert-23.jpg";
import concert24 from "@/images/concert/concert-24.jpg";
import concert25 from "@/images/concert/concert-25.jpg";
import concert26 from "@/images/concert/concert-26.jpg";
import concert27 from "@/images/concert/concert-27.jpg";
import concert28 from "@/images/concert/concert-28.jpg";
import concert29 from "@/images/concert/concert-29.jpg";
import concert30 from "@/images/concert/concert-30.jpg";
import concert31 from "@/images/concert/concert-31.jpg";
import concert32 from "@/images/concert/concert-32.jpg";

import portrait01 from "@/images/portrait/portrait-01.jpg";
import portrait02 from "@/images/portrait/portrait-02.jpg";
import portrait03 from "@/images/portrait/portrait-03.jpg";
import portrait04 from "@/images/portrait/portrait-04.jpg";
import portrait05 from "@/images/portrait/portrait-05.jpg";
import portrait06 from "@/images/portrait/portrait-06.jpg";
import portrait07 from "@/images/portrait/portrait-07.jpg";
import portrait08 from "@/images/portrait/portrait-08.jpg";
import portrait09 from "@/images/portrait/portrait-09.jpg";
import portrait10 from "@/images/portrait/portrait-10.jpg";
import portrait11 from "@/images/portrait/portrait-11.jpg";
import portrait12 from "@/images/portrait/portrait-12.jpg";
import portrait13 from "@/images/portrait/portrait-13.jpg";
import portrait14 from "@/images/portrait/portrait-14.jpg";
import portrait15 from "@/images/portrait/portrait-15.jpg";
import portrait16 from "@/images/portrait/portrait-16.jpg";
import portrait17 from "@/images/portrait/portrait-17.jpg";
import portrait18 from "@/images/portrait/portrait-18.jpg";
import portrait19 from "@/images/portrait/portrait-19.jpg";
import portrait20 from "@/images/portrait/portrait-20.jpg";
import portrait21 from "@/images/portrait/portrait-21.jpg";

import headshot01 from "@/images/headshot/headshot-01.jpg";
import headshot02 from "@/images/headshot/headshot-02.jpg";
import headshot03 from "@/images/headshot/headshot-03.jpg";
import headshot04 from "@/images/headshot/headshot-04.jpg";
import headshot05 from "@/images/headshot/headshot-05.jpg";
import headshot06 from "@/images/headshot/headshot-06.jpg";
import headshot07 from "@/images/headshot/headshot-07.jpg";
import headshot08 from "@/images/headshot/headshot-08.jpg";
import headshot09 from "@/images/headshot/headshot-09.jpg";
import headshot10 from "@/images/headshot/headshot-10.jpg";
import headshot11 from "@/images/headshot/headshot-11.jpg";
import headshot12 from "@/images/headshot/headshot-12.jpg";
import headshot13 from "@/images/headshot/headshot-13.jpg";
import headshot14 from "@/images/headshot/headshot-14.jpg";
import headshot15 from "@/images/headshot/headshot-15.jpg";
import headshot16 from "@/images/headshot/headshot-16.jpg";

import corporate01 from "@/images/corporate/corporate-01.jpg";
import corporate02 from "@/images/corporate/corporate-02.jpg";
import corporate03 from "@/images/corporate/corporate-03.jpg";
import corporate04 from "@/images/corporate/corporate-04.jpg";
import corporate05 from "@/images/corporate/corporate-05.jpg";
import corporate06 from "@/images/corporate/corporate-06.jpg";
import corporate07 from "@/images/corporate/corporate-07.jpg";
import corporate08 from "@/images/corporate/corporate-08.jpg";
import corporate09 from "@/images/corporate/corporate-09.jpg";
import corporate10 from "@/images/corporate/corporate-10.jpg";
import corporate11 from "@/images/corporate/corporate-11.jpg";
import corporate12 from "@/images/corporate/corporate-12.jpg";
import corporate13 from "@/images/corporate/corporate-13.jpg";
import corporate14 from "@/images/corporate/corporate-14.jpg";
import corporate15 from "@/images/corporate/corporate-15.jpg";

import sport01 from "@/images/sport/sport-01.jpg";
import sport02 from "@/images/sport/sport-02.jpg";
import sport03 from "@/images/sport/sport-03.jpg";
import sport04 from "@/images/sport/sport-04.jpg";
import sport05 from "@/images/sport/sport-05.jpg";
import sport06 from "@/images/sport/sport-06.jpg";

export type CategorySlug = "evenementiel" | "portrait" | "headshot" | "corporate" | "sport";

export const categorySlugs: CategorySlug[] = ["evenementiel", "portrait", "headshot", "corporate", "sport"];

export const portfolio: Record<CategorySlug, StaticImageData[]> = {
  evenementiel: [
    concert01, concert02, concert03, concert04, concert05, concert06, concert07, concert08,
    concert09, concert10, concert11, concert12, concert13, concert14, concert15, concert16,
    concert17, concert18, concert19, concert20, concert21, concert22, concert23, concert24,
    concert25, concert26, concert27, concert28, concert29, concert30, concert31, concert32,
  ],
  portrait: [
    portrait01, portrait02, portrait03, portrait04, portrait05, portrait06, portrait07, portrait08,
    portrait09, portrait10, portrait11, portrait12, portrait13, portrait14, portrait15, portrait16,
    portrait17, portrait18, portrait19, portrait20, portrait21,
  ],
  headshot: [
    headshot01, headshot02, headshot03, headshot04, headshot05, headshot06, headshot07, headshot08,
    headshot09, headshot10, headshot11, headshot12, headshot13, headshot14, headshot15, headshot16,
  ],
  corporate: [
    corporate01, corporate02, corporate03, corporate04, corporate05, corporate06, corporate07,
    corporate08, corporate09, corporate10, corporate11, corporate12, corporate13, corporate14,
    corporate15,
  ],
  sport: [
    sport01, sport02, sport03, sport04, sport05, sport06,
  ],
};

export type EventSubcategorySlug = "concert" | "festival" | "evenement-prive";

export const eventSubcategorySlugs: EventSubcategorySlug[] = ["concert", "festival", "evenement-prive"];

export const eventSubcategories: Record<EventSubcategorySlug, StaticImageData[]> = {
  concert: portfolio.evenementiel,
  festival: [],
  "evenement-prive": [],
};

export const heroImage = concert04;
export const coverImages: Record<CategorySlug, StaticImageData> = {
  evenementiel: concert01,
  portrait: portrait07,
  headshot: headshot05,
  corporate: corporate02,
  sport: sport06,
};
