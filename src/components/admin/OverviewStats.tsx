import type { DashboardData } from "@/lib/posthog-query";

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

function formatPercent(rate: number): string {
  return `${Math.round(rate * 100)} %`;
}

export default function OverviewStats({
  overview,
}: {
  overview: DashboardData["overview"];
}) {
  const tiles = [
    {
      stage: "Acquisition",
      value: formatNumber(overview.visitors),
      caption: "visiteurs uniques sur la période",
    },
    {
      stage: "Activation",
      value: formatPercent(overview.activationRate),
      caption: "ont exploré au moins une série du portfolio",
    },
    {
      stage: "Rétention",
      value: formatPercent(overview.returningVisitorRate),
      caption: "sont revenus un autre jour",
    },
    {
      stage: "Referral",
      value: formatNumber(overview.instagramClicks),
      caption: "clics vers Instagram",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="border border-foreground bg-foreground text-background p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] opacity-70 mb-2">
            Revenue — le résultat qui compte
          </p>
          <p className="text-5xl sm:text-6xl font-semibold leading-none tabular-nums">
            {formatNumber(overview.leads)}
          </p>
          <p className="text-sm opacity-80 mt-3 max-w-sm leading-relaxed">
            personnes ont écrit pour réserver une séance — le signal le plus
            proche d&apos;un résultat concret sur ce site.
          </p>
        </div>
        <p className="text-sm opacity-80 whitespace-nowrap">
          dont {formatNumber(overview.contactStarts)} ont commencé le
          formulaire
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border">
        {tiles.map((tile) => (
          <div key={tile.stage} className="bg-background p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted mb-3">
              {tile.stage}
            </p>
            <p className="text-3xl font-semibold tabular-nums">{tile.value}</p>
            <p className="text-xs text-muted mt-2 leading-relaxed">
              {tile.caption}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted">
        {formatNumber(overview.pageviews)} pages vues ·{" "}
        {formatNumber(overview.sessions)} sessions sur la période
      </p>
    </section>
  );
}
