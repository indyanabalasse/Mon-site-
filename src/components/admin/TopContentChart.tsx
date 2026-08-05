import type { DashboardData } from "@/lib/posthog-query";

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

export default function TopContentChart({
  items,
}: {
  items: DashboardData["topContent"];
}) {
  const maxViews = items.length > 0 ? Math.max(...items.map((i) => i.views)) : 0;

  return (
    <section>
      <h2 className="font-serif text-xl sm:text-2xl mb-1">
        Ce qui attire le plus
      </h2>
      <p className="text-sm text-muted mb-6">
        Les créations et catégories du portfolio les plus consultées sur la
        période.
      </p>

      {items.length === 0 ? (
        <p className="text-sm text-muted">
          Pas encore assez de visites sur le portfolio pour établir un
          classement.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const width =
              maxViews > 0 ? Math.max((item.views / maxViews) * 100, 3) : 0;
            return (
              <div
                key={`${item.category}-${item.series ?? ""}`}
                className="group"
                title={`${item.label} — ${formatNumber(item.views)} vues`}
              >
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <span className="text-sm truncate">{item.label}</span>
                  <span className="text-sm font-semibold tabular-nums shrink-0">
                    {formatNumber(item.views)}
                  </span>
                </div>
                <div className="h-3 bg-border/40">
                  <div
                    className="h-full bg-foreground transition-opacity group-hover:opacity-70"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
