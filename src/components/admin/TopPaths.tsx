import type { DashboardData } from "@/lib/posthog-query";

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

export default function TopPaths({
  paths,
}: {
  paths: DashboardData["topPaths"];
}) {
  const maxSessions =
    paths.length > 0 ? Math.max(...paths.map((p) => p.sessions)) : 0;

  return (
    <section>
      <h2 className="font-serif text-xl sm:text-2xl mb-1">
        Parcours des visiteurs
      </h2>
      <p className="text-sm text-muted mb-6">
        Les chemins les plus empruntés, page après page.
      </p>

      {paths.length === 0 ? (
        <p className="text-sm text-muted">
          Pas encore assez de données pour dégager des parcours récurrents.
        </p>
      ) : (
        <ul className="border-t border-border">
          {paths.map((path) => {
            const width =
              maxSessions > 0 ? (path.sessions / maxSessions) * 100 : 0;
            return (
              <li
                key={path.label}
                className="relative border-b border-border overflow-hidden"
              >
                <div
                  className="absolute inset-y-0 left-0 bg-foreground/5"
                  style={{ width: `${width}%` }}
                  aria-hidden
                />
                <div className="relative flex items-center justify-between gap-4 py-3 px-1">
                  <span className="text-sm leading-relaxed">
                    {path.label}
                  </span>
                  <span className="text-sm font-semibold tabular-nums shrink-0">
                    {formatNumber(path.sessions)}
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
