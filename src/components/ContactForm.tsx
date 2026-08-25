"use client";

import { useRef, useState, type FormEvent } from "react";
import posthog from "posthog-js";
import type { Locale } from "@/lib/i18n";
import { INSTAGRAM_URL } from "@/lib/site";
import { InstagramIcon } from "@/components/icons";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({
  locale,
  labels,
}: {
  locale: Locale;
  labels: {
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    pendingConfirmation: string;
    error: string;
    followInstagram: string;
    followInstagramCta: string;
    newsletterOptIn: string;
  };
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [pending, setPending] = useState(false);
  const hasStartedRef = useRef(false);

  function onFormFocus() {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    posthog.capture(ANALYTICS_EVENTS.CONTACT_FORM_STARTED, { locale });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subscribeToNewsletter = (form.elements.namedItem("newsletter") as HTMLInputElement).checked;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      const result = await res.json().catch(() => ({ pending: false }));
      setPending(Boolean(result.pending));
      setStatus("success");
      posthog.capture(ANALYTICS_EVENTS.CONTACT_FORM_SUBMITTED, { locale });
      form.reset();

      // Newsletter opt-in still goes through the double opt-in confirmation
      // flow, so a failure here shouldn't affect the contact form's own
      // success state.
      if (subscribeToNewsletter) {
        fetch("/api/newsletter/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, locale }),
        }).catch(() => {});
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div>
        <p className="text-sm leading-relaxed">
          {pending ? labels.pendingConfirmation : labels.success}
        </p>
        <div className="mt-8 border border-border p-6 flex flex-col items-center text-center gap-4">
          <InstagramIcon className="h-6 w-6" />
          <p className="text-sm text-muted">{labels.followInstagram}</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-foreground px-6 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
          >
            {labels.followInstagramCta}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={onFormFocus} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-xs uppercase tracking-[0.2em] text-muted mb-2">
          {labels.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] text-muted mb-2">
          {labels.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-[0.2em] text-muted mb-2">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors resize-none"
        />
      </div>

      <label className="flex items-center gap-3 text-sm text-muted">
        <input
          id="newsletter"
          name="newsletter"
          type="checkbox"
          className="h-4 w-4 shrink-0 accent-foreground"
        />
        {labels.newsletterOptIn}
      </label>

      {status === "error" && <p className="text-sm text-danger">{labels.error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="border border-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
      >
        {status === "sending" ? labels.sending : labels.send}
      </button>
    </form>
  );
}
