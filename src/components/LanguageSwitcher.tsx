"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex items-center gap-1 text-xs tracking-widest uppercase">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-border">/</span>}
          <Link
            href={`/${l}${rest ? `/${rest}` : ""}`}
            className={
              l === locale
                ? "text-foreground"
                : "text-muted hover:text-foreground transition-colors"
            }
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
