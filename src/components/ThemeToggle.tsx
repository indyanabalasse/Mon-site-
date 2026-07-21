"use client";

import { useSyncExternalStore } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { MoonIcon, SunIcon } from "@/components/icons";
import { getThemeServerSnapshot, getThemeSnapshot, setTheme, subscribeTheme } from "@/lib/theme-store";

export default function ThemeToggle({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const dark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? dict.nav.themeToLight : dict.nav.themeToDark}
      className="text-muted hover:text-foreground transition-colors p-1"
    >
      {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
  );
}
