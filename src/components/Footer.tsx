import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";
import { InstagramIcon } from "@/components/icons";

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
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.nav.instagram}
            className="flex items-center gap-2 hover:text-foreground transition-colors normal-case tracking-normal"
          >
            <InstagramIcon className="h-4 w-4" />
            {INSTAGRAM_HANDLE}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hover:text-foreground transition-colors normal-case tracking-normal"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
