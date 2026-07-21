"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function noopSubscribe() {
  return () => {};
}

function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export default function MobileNav({
  locale,
  links,
}: {
  locale: Locale;
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();

  const panel = (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <span className="wordmark font-serif text-lg font-medium">
          INDYANASTUDIO
        </span>
        <button
          onClick={() => setOpen(false)}
          aria-label="Fermer"
          className="p-2 text-2xl leading-none"
        >
          ×
        </button>
      </div>
      <nav className="flex flex-1 flex-col items-start justify-center gap-8 px-8 text-2xl font-serif">
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="px-8 pb-8">
        <LanguageSwitcher locale={locale} />
      </div>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Menu"
        className="flex flex-col gap-1.5 p-2"
      >
        <span className="block h-px w-6 bg-foreground" />
        <span className="block h-px w-6 bg-foreground" />
      </button>

      {open && mounted && createPortal(panel, document.body)}
    </div>
  );
}
