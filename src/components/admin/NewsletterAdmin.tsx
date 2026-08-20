"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { categorySlugs } from "@/data/portfolio";
import { getDictionary } from "@/lib/i18n";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

type Subscriber = { id: string; email: string; createdAt: string };

type SubscribersState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; contacts: Subscriber[] };

type SendState = { status: "idle" | "sending" | "success" | "error"; message?: string };

const dict = getDictionary("fr");

const CATEGORY_OPTIONS = categorySlugs.map((slug) => ({
  slug,
  title: dict.categories[slug]?.title ?? slug,
}));

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** One <p> per non-empty line, matching the plain textarea the admin composes in. */
function buildBodyHtml(text: string): string {
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line) => `<p style="margin:0 0 16px 0;">${escapeHtml(line)}</p>`)
    .join("");
}

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<SubscribersState>({ status: "loading" });

  const [categorySlug, setCategorySlug] = useState("");
  const [subject, setSubject] = useState("");
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaHref, setCtaHref] = useState("");
  const [sendState, setSendState] = useState<SendState>({ status: "idle" });

  useEffect(() => {
    let cancelled = false;

    fetch("/api/admin/newsletter/subscribers")
      .then((res) => res.json().then((json) => ({ ok: res.ok, json })))
      .then(({ ok, json }) => {
        if (cancelled) return;
        if (ok && Array.isArray(json.contacts)) {
          setSubscribers({ status: "ready", contacts: json.contacts });
        } else {
          setSubscribers({ status: "error" });
        }
      })
      .catch(() => {
        if (!cancelled) setSubscribers({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    const slug = e.target.value;
    setCategorySlug(slug);
    if (!slug) return;

    const option = CATEGORY_OPTIONS.find((o) => o.slug === slug);
    if (!option) return;

    setSubject(`Nouvelle série : ${option.title}`);
    setHeading(`Nouvelle série : ${option.title}`);
    setCtaLabel("Découvrir la série");
    setCtaHref(`${SITE_URL}/fr/portfolio/${slug}`);
  }

  const bodyPreviewLines = useMemo(
    () => body.split(/\r?\n/).filter((line) => line.trim().length > 0),
    [body]
  );

  const subscriberCount = subscribers.status === "ready" ? subscribers.contacts.length : null;

  async function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!subject.trim() || !heading.trim() || !body.trim()) {
      setSendState({ status: "error", message: "Objet, titre et message sont obligatoires." });
      return;
    }

    const countLabel =
      subscriberCount === null
        ? "vos abonnés"
        : `${subscriberCount} abonné${subscriberCount === 1 ? "" : "s"}`;

    const confirmed = window.confirm(
      `Envoyer cette campagne à ${countLabel} maintenant ? Cette action est irréversible.`
    );
    if (!confirmed) return;

    setSendState({ status: "sending" });

    try {
      const res = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          heading,
          bodyHtml: buildBodyHtml(body),
          ctaLabel: ctaLabel.trim() || undefined,
          ctaHref: ctaHref.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error("send failed");
      setSendState({ status: "success", message: "Campagne envoyée." });
    } catch {
      setSendState({
        status: "error",
        message: "L'envoi a échoué. Réessayez dans quelques minutes.",
      });
    }
  }

  return (
    <div className="space-y-16">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl">Newsletter</h1>
        <p className="text-sm text-muted mt-1">
          Gérez vos abonnés et envoyez une campagne à toute la liste.
        </p>
      </div>

      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
          <h2 className="font-serif text-xl sm:text-2xl">Abonnés</h2>
          {subscribers.status === "ready" && (
            <p className="text-sm text-muted">
              {subscribers.contacts.length} abonné{subscribers.contacts.length === 1 ? "" : "s"}
            </p>
          )}
        </div>

        {subscribers.status === "loading" && (
          <p className="text-sm text-muted">Chargement…</p>
        )}
        {subscribers.status === "error" && (
          <p className="text-sm text-danger">Impossible de charger la liste des abonnés.</p>
        )}
        {subscribers.status === "ready" && subscribers.contacts.length === 0 && (
          <p className="text-sm text-muted">Aucun abonné pour le moment.</p>
        )}
        {subscribers.status === "ready" && subscribers.contacts.length > 0 && (
          <div className="border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-muted font-normal">
                    Email
                  </th>
                  <th className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-muted font-normal">
                    Inscrit le
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscribers.contacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3">{contact.email}</td>
                    <td className="px-4 py-3 text-muted">{formatDate(contact.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2 className="font-serif text-xl sm:text-2xl mb-6">Composer une campagne</h2>

        <div className="grid gap-10 lg:grid-cols-2">
          <form onSubmit={handleSend} className="space-y-6">
            <div>
              <label
                htmlFor="category"
                className="block text-xs uppercase tracking-[0.2em] text-muted mb-2"
              >
                Pré-remplir depuis une catégorie
              </label>
              <select
                id="category"
                value={categorySlug}
                onChange={handleCategoryChange}
                className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors"
              >
                <option value="">Choisir une catégorie</option>
                {CATEGORY_OPTIONS.map((o) => (
                  <option key={o.slug} value={o.slug}>
                    {o.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs uppercase tracking-[0.2em] text-muted mb-2"
              >
                Objet de l&apos;email
              </label>
              <input
                id="subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="heading"
                className="block text-xs uppercase tracking-[0.2em] text-muted mb-2"
              >
                Titre affiché
              </label>
              <input
                id="heading"
                type="text"
                required
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="body"
                className="block text-xs uppercase tracking-[0.2em] text-muted mb-2"
              >
                Message
              </label>
              <textarea
                id="body"
                required
                rows={8}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="ctaLabel"
                  className="block text-xs uppercase tracking-[0.2em] text-muted mb-2"
                >
                  Texte du bouton (optionnel)
                </label>
                <input
                  id="ctaLabel"
                  type="text"
                  value={ctaLabel}
                  onChange={(e) => setCtaLabel(e.target.value)}
                  className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="ctaHref"
                  className="block text-xs uppercase tracking-[0.2em] text-muted mb-2"
                >
                  Lien du bouton (optionnel)
                </label>
                <input
                  id="ctaHref"
                  type="url"
                  value={ctaHref}
                  onChange={(e) => setCtaHref(e.target.value)}
                  className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
            </div>

            {sendState.status === "error" && (
              <p className="text-sm text-danger">{sendState.message}</p>
            )}
            {sendState.status === "success" && (
              <p className="text-sm text-foreground">{sendState.message}</p>
            )}

            <button
              type="submit"
              disabled={sendState.status === "sending"}
              className="border border-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
            >
              {sendState.status === "sending" ? "Envoi en cours…" : "Envoyer à tous les abonnés"}
            </button>
          </form>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">Aperçu</p>
            <div className="border border-border p-8 sm:p-10">
              <div className="text-center pb-8 border-b border-border">
                <span className="font-serif text-lg tracking-[0.2em] uppercase">
                  INDYANASTUDIO
                </span>
              </div>
              <div className="pt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-muted mb-3">
                  Objet : {subject || "Objet de l'email"}
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl mb-6">
                  {heading || "Titre affiché"}
                </h3>
                <div className="space-y-4 text-sm leading-relaxed">
                  {bodyPreviewLines.length > 0 ? (
                    bodyPreviewLines.map((line, i) => <p key={i}>{line}</p>)
                  ) : (
                    <p className="text-muted">Votre message apparaîtra ici.</p>
                  )}
                </div>
                {ctaLabel && ctaHref && (
                  <div className="pt-8">
                    <span className="inline-block border border-foreground px-6 py-3 text-xs uppercase tracking-[0.2em]">
                      {ctaLabel}
                    </span>
                  </div>
                )}
              </div>
              <div className="pt-8 mt-8 border-t border-border">
                <p className="font-serif text-base leading-snug">
                  Indyana Balasse
                  <br />
                  INDYANASTUDIO
                </p>
                <p className="text-xs text-muted mt-3">
                  {CONTACT_EMAIL} &middot; Instagram
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
