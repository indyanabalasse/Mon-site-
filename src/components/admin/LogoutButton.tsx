"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="border border-foreground px-5 py-2 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
    >
      {loading ? "…" : "Se déconnecter"}
    </button>
  );
}
