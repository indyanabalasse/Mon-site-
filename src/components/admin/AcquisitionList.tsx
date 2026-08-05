import type { DashboardData } from "@/lib/posthog-query";

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

export default function AcquisitionList({
  acquisition,
}: {
  acquisition: DashboardData["acquisition"];
}) {
  const maxSessions =
    acquisition.length > 0
      ? Math.max(...acquisition.map((a) => a.sessions))
      : 0;

  return (
    <section>
      <h2 className="font-serif text-xl mb-1">Provenance</h2>
      <p className="text-sm text-muted mb-6">
        D&apos;où viennent les sessions.
      </p>

      {acquisition.length === 0 ? (
        <p className="text-sm text-muted">
          Pas encore de données de provenance.
        </p>
      ) : (
        <ul className="border-t border-border">
          {acquisition.map((source) => {
            const width =
              maxSessions > 0 ? (source.sessions / maxSessions) * 100 : 0;
            return (
              <li
                key={source.label}
                className="relative border-b border-border overflow-hidden"
              >
                <div
                  className="absolute inset-y-0 left-0 bg-foreground/5"
                  style={{ width: `${width}%` }}
                  aria-hidden
                />
                <div className="relative flex items-center justify-between gap-3 py-2.5 px-1">
                  <span className="text-sm truncate">{source.label}</span>
                  <span className="text-sm font-semibold tabular-nums shrink-0">
                    {formatNumber(source.sessions)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
