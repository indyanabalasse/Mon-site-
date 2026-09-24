import posthog from "posthog-js";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

// "/fr/contact" or "/en/contact". Kept as a pattern rather than importing
// the locale list, which would pull the whole i18n dictionary into this bundle.
const CONTACT_PAGE = /^\/[a-z]{2}\/contact\/?$/;

if (key && host) {
  posthog.init(key, {
    api_host: host,
    capture_pageview: "history_change",
    disable_session_recording: true,
    respect_dnt: true,
  });

  // One delegated listener covers every link on the site, so a new
  // "Demander un devis" button is tracked without touching its page.
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;

    const path = window.location.pathname;
    const url = new URL(link.href, window.location.href);

    if (url.hostname.endsWith("instagram.com")) {
      posthog.capture(ANALYTICS_EVENTS.INSTAGRAM_CLICK, { path });
      return;
    }
    if (url.origin !== window.location.origin) return;

    if (url.pathname.toLowerCase().endsWith(".pdf")) {
      posthog.capture(ANALYTICS_EVENTS.DOCUMENT_DOWNLOAD, {
        path,
        file: url.pathname.split("/").pop(),
      });
      return;
    }

    if (CONTACT_PAGE.test(url.pathname) && !CONTACT_PAGE.test(path)) {
      posthog.capture(ANALYTICS_EVENTS.CONTACT_CTA_CLICK, {
        path,
        placement: link.closest("header, footer, nav") ? "navigation" : "page",
        label: link.textContent?.trim().slice(0, 80),
      });
    }
  });
}
