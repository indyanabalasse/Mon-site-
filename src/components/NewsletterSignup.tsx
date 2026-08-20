"use client";

import { useState, type FormEvent } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error";

export default function NewsletterSignup({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const labels = dict.newsletter;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="border border-border p-8 sm:p-12 flex flex-col items-center text-center">
      <h2 className="wordmark font-serif text-2xl sm:text-3xl">{labels.heading}</h2>
      <p className="mt-4 max-w-md text-muted">{labels.intro}</p>

      {status === "success" ? (
        <p className="mt-8 max-w-sm text-sm leading-relaxed">{labels.successMessage}</p>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            {labels.emailPlaceholder}
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder={labels.emailPlaceholder}
            className="w-full flex-1 border border-border bg-transparent px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
            className="border border-foreground bg-foreground text-background px-6 py-3 text-xs uppercase tracking-[0.2em] whitespace-nowrap hover:bg-transparent hover:text-foreground transition-colors disabled:opacity-50"
          >
            {labels.submitCta}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-4 text-sm text-danger">{labels.errorMessage}</p>
      )}

      {status !== "success" && (
        <p className="mt-4 max-w-sm text-xs text-muted">{labels.consent}</p>
      )}
    </div>
  );
}
