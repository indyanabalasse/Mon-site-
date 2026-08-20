"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function StickyBookCta({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  if (pathname !== `/${locale}/packaging`) return null;

  const dict = getDictionary(locale);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur px-6 py-3 md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href={`/${locale}/contact`}
        className="block w-full border border-foreground bg-foreground px-8 py-3 text-center text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-transparent hover:text-foreground"
      >
        {dict.about.cta}
      </Link>
    </div>
  );
}
