import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { INSTAGRAM_URL } from "@/lib/site";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import { InstagramIcon } from "@/components/icons";

export default function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const links = [
    { href: `/${locale}/portfolio`, label: dict.nav.portfolio },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href={`/${locale}`}
          className="wordmark font-serif text-lg sm:text-xl font-medium"
        >
          INDYANASTUDIO
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide uppercase">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
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
        </nav>

        <MobileNav locale={locale} links={links} />
      </div>
    </header>
  );
}
