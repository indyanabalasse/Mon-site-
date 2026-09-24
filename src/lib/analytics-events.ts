/**
 * Shared PostHog event names. Emitted by client instrumentation
 * (src/instrumentation-client.ts, src/components/ContactForm.tsx,
 * src/components/NewsletterSignup.tsx) and read back by the admin
 * dashboard (src/lib/posthog-query.ts). Keep both sides in sync by
 * importing from here rather than hardcoding string literals.
 */
export const ANALYTICS_EVENTS = {
  CONTACT_CTA_CLICK: "contact_cta_click",
  CONTACT_FORM_STARTED: "contact_form_started",
  CONTACT_FORM_SUBMITTED: "contact_form_submitted",
  DOCUMENT_DOWNLOAD: "document_download",
  INSTAGRAM_CLICK: "instagram_click",
  NEWSLETTER_SIGNUP_SUBMITTED: "newsletter_signup_submitted",
} as const;

/**
 * Stable keys for the contact form's "type de projet" field. The visible
 * labels are translated in src/lib/i18n.ts; these keys are what the form
 * submits and what PostHog stores, so FR and EN requests count together.
 */
export const PROJECT_TYPES = [
  "business",
  "portrait",
  "family",
  "event",
  "photobooth",
  "sport_health",
  "other",
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];
