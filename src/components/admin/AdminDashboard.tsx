"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DashboardData } from "@/lib/posthog-query";
import OverviewStats from "./OverviewStats";
import TopContentChart from "./TopContentChart";
import TopPaths from "./TopPaths";
import TrendChart from "./TrendChart";
import AcquisitionList from "./AcquisitionList";

const PERIODS = [
  { value: 7, label: "7 jours" },
  { value: 30, label: "30 jours" },
  { value: 90, label: "90 jours" },
] as const;

const REFRESH_ERROR_MESSAGE =
  "Impossible de rafraîchir les statistiques. Les chiffres affichés datent de la dernière mise à jour réussie.";

export default function AdminDashboard({
  initialData,
  initialDays,
}: {
  initialData: DashboardData;
  initialDays: number;
}) {
  const router = useRouter();
  const [days, setDays] = useState(initialDays);
  const [data, setData] = useState(initialData);
  const [isRefetching, setIsRefetching] = useState(false);
  const [refetchError, setRefetchError] = useState<string | null>(null);

  async function handlePeriodChange(next: number) {
    if (next === days || isRefetching) return;
    setDays(next);
    setIsRefetching(true);
    setRefetchError(null);

    try {
      const res = await fetch(`/api/admin/stats?days=${next}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const json = await res.json();
      if (json.configured && json.data) {
        setData(json.data);
      } else {
        setRefetchError(REFRESH_ERROR_MESSAGE);
      }
    } catch {
      setRefetchError(REFRESH_ERROR_MESSAGE);
    } finally {
      setIsRefetching(false);
    }
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl">Tableau de bord</h1>
          <p className="text-sm text-muted mt-1">
            Vue d&apos;ensemble de votre site sur les {days} derniers jours.
          </p>
        </div>
        <div
          className="flex border border-border"
          role="group"
          aria-label="Période"
        >
          {PERIODS.map((p, i) => (
            <button
              key={p.value}
              type="button"
              onClick={() => handlePeriodChange(p.value)}
              aria-pressed={days === p.value}
              disabled={isRefetching}
              className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors disabled:cursor-wait ${
                i > 0 ? "border-l border-border" : ""
              } ${
                days === p.value
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {refetchError && (
        <p className="text-sm text-danger border border-danger/40 px-4 py-3">
          {refetchError}
        </p>
      )}

      <div
        className={`space-y-12 transition-opacity ${
          isRefetching ? "opacity-50" : "opacity-100"
        }`}
        aria-busy={isRefetching}
      >
        <OverviewStats overview={data.overview} />
        <TopContentChart items={data.topContent} />
        <TopPaths paths={data.topPaths} />

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TrendChart trend={data.trend} />
          </div>
          <AcquisitionList acquisition={data.acquisition} />
        </div>

        {data.sampled && (
          <p className="text-xs text-muted">
            * Ces chiffres reposent sur un large échantillon de données et
            peuvent être légèrement sous-estimés lors des journées de forte
            affluence.
          </p>
        )}
      </div>
    </div>
  );
}
