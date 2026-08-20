"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { INSTAGRAM_URL } from "@/lib/site";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import FullscreenToggle from "@/components/FullscreenToggle";
import { InstagramIcon } from "@/components/icons";

export default function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const links = [
    { href: `/${locale}/portfolio`, label: dict.nav.portfolio },
    { href: `/${locale}/studio`, label: dict.nav.studio },
    { href: `/${locale}/packaging`, label: dict.nav.packaging },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const activeHref = links.find(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`)
  )?.href;

  useLayoutEffect(() => {
    const measure = () => {
      const activeEl = activeHref ? linkRefs.current[activeHref] : null;
      if (activeEl && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = activeEl.getBoundingClientRect();
        setIndicator({ left: linkRect.left - navRect.left, width: linkRect.width });
      } else {
        setIndicator(null);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeHref]);

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href={`/${locale}`}
          className="wordmark font-serif text-lg sm:text-xl font-medium"
        >
          Indyana Balasse
        </Link>

        <nav
          ref={navRef}
          className="relative hidden md:flex items-center gap-4 lg:gap-8 text-sm tracking-wide uppercase"
        >
          {links.map((link) => {
            const isActive = link.href === activeHref;
            return (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  linkRefs.current[link.href] = el;
                }}
                className={`pb-1 transition-colors ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {indicator && (
            <span
              className="absolute bottom-0 h-px bg-foreground transition-all duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width }}
            />
          )}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.nav.instagram}
            className="text-muted hover:text-foreground transition-colors"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <ThemeToggle locale={locale} />
          <LanguageSwitcher locale={locale} />
          <div className="hidden lg:block">
            <FullscreenToggle
              labels={{ enter: dict.nav.fullscreenEnter, exit: dict.nav.fullscreenExit }}
            />
          </div>
        </nav>

        <MobileNav locale={locale} links={links} />
      </div>
    </header>
  );
}
