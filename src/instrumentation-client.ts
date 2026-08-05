import posthog from "posthog-js";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (key && host) {
  posthog.init(key, {
    api_host: host,
    capture_pageview: "history_change",
    disable_session_recording: true,
    respect_dnt: true,
  });

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest?.("a[href*='instagram.com']");
    if (link) {
      posthog.capture(ANALYTICS_EVENTS.INSTAGRAM_CLICK, { path: window.location.pathname });
    }
  });
}
