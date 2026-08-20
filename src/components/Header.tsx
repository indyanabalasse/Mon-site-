"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const links = [
    { href: `/${locale}/portfolio`, label: dict.nav.portfolio },
    { href: `/${locale}/studio`, label: dict.nav.studio },
    { href: `/${locale}/packaging`, label: dict.nav.packaging },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href={`/${locale}`}
          className="wordmark font-serif text-lg sm:text-xl font-medium"
        >
          Indyana Balasse
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide uppercase">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative pb-1 transition-colors ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-px origin-center bg-foreground transition-transform duration-300 ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
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
          <FullscreenToggle
            labels={{ enter: dict.nav.fullscreenEnter, exit: dict.nav.fullscreenExit }}
          />
        </nav>

        <MobileNav locale={locale} links={links} />
      </div>
    </header>
  );
}
