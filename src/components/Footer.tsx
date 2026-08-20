import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from "@/lib/site";
import { InstagramIcon } from "@/components/icons";

export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = 2026;

  return (
    <footer className="border-t border-border pb-20 md:pb-0">
      <div className="flex flex-col items-center gap-2 px-6 py-5 text-xs uppercase tracking-wide text-muted md:hidden">
        <a
          href={`tel:${CONTACT_PHONE_HREF}`}
          className="hover:text-foreground transition-colors normal-case tracking-normal"
        >
          {CONTACT_PHONE_DISPLAY}
        </a>
        <span className="text-[10px] text-center">
          © {year} INDYANASTUDIO — {dict.footer.rights}
        </span>
      </div>

      <div className="hidden px-10 py-5 text-xs uppercase tracking-wide text-muted md:flex md:items-center md:justify-between">
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
          <a
            href={`tel:${CONTACT_PHONE_HREF}`}
            className="hover:text-foreground transition-colors normal-case tracking-normal"
          >
            {CONTACT_PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </footer>
  );
}
