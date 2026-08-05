/**
 * Shared PostHog event names. Emitted by client instrumentation
 * (src/components/AnalyticsProvider.tsx, src/components/ContactForm.tsx)
 * and read back by the admin dashboard (src/lib/posthog-query.ts).
 * Keep both sides in sync by importing from here rather than
 * hardcoding string literals.
 */
export const ANALYTICS_EVENTS = {
  CONTACT_FORM_STARTED: "contact_form_started",
  CONTACT_FORM_SUBMITTED: "contact_form_submitted",
  INSTAGRAM_CLICK: "instagram_click",
} as const;
