import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { getDashboardData, isPostHogConfigured } from "@/lib/posthog-query";
import type { DashboardData } from "@/lib/posthog-query";
import AdminDashboard from "@/components/admin/AdminDashboard";
import NotConfiguredNotice from "@/components/admin/NotConfiguredNotice";
import LogoutButton from "@/components/admin/LogoutButton";

const DEFAULT_DAYS = 30;

function DataErrorPanel() {
  return (
    <div className="mx-auto max-w-xl border border-border p-8 sm:p-10 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
        Tableau de bord
      </p>
      <h1 className="font-serif text-2xl sm:text-3xl mb-4">
        Statistiques indisponibles
      </h1>
      <p className="text-sm leading-relaxed text-muted">
        Impossible de récupérer vos statistiques pour le moment. Réessayez
        dans quelques minutes — si le problème persiste, vérifiez la
        connexion à votre compte PostHog dans le fichier .env.local.
      </p>
    </div>
  );
}

export default async function AdminPage() {
  const store = await cookies();
  if (!isAdminSessionValid(store)) redirect("/admin/login");

  const configured = isPostHogConfigured();
  let data: DashboardData | null = null;
  let loadFailed = false;

  if (configured) {
    try {
      data = await getDashboardData(DEFAULT_DAYS);
    } catch (error) {
      console.error("Admin dashboard: failed to load PostHog data", error);
      loadFailed = true;
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-serif text-lg sm:text-xl font-medium">
            INDYANASTUDIO
          </span>
          <LogoutButton />
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-10">
        {!configured ? (
          <NotConfiguredNotice />
        ) : loadFailed || !data ? (
          <DataErrorPanel />
        ) : (
          <AdminDashboard initialData={data} initialDays={DEFAULT_DAYS} />
        )}
      </main>
    </div>
  );
}
