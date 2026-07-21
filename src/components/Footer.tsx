import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = 2026;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-wide uppercase text-muted">
        <span>
          © {year} INDYANASTUDIO — {dict.footer.rights}
        </span>
        <div className="flex items-center gap-6">
          <Link href={`/${locale}/contact`} className="hover:text-foreground transition-colors">
            {dict.nav.contact}
          </Link>
          <a
            href="mailto:indyana.balasse@gmail.com"
            className="hover:text-foreground transition-colors normal-case tracking-normal"
          >
            indyana.balasse@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
