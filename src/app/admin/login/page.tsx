"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError(true);
        setIsSubmitting(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError(true);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="w-full max-w-sm">
        <p className="text-center font-serif text-2xl tracking-wide mb-10">INDYANASTUDIO</p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-xs uppercase tracking-[0.2em] text-muted mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          {error && <p className="text-sm text-danger">Mot de passe incorrect.</p>}

          <button
            type="submit"
            disabled={isSubmitting || password.length === 0}
            className="w-full border border-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
