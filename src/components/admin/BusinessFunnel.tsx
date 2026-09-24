import type { DashboardData } from "@/lib/posthog-query";

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

function formatRate(part: number, whole: number): string {
  return whole > 0 ? `${Math.round((part / whole) * 100)} %` : "—";
}

function BarList({
  title,
  intro,
  empty,
  items,
}: {
  title: string;
  intro: string;
  empty: string;
  items: { label: string; value: number }[];
}) {
  const max = items.length > 0 ? Math.max(...items.map((i) => i.value)) : 0;

  return (
    <section>
      <h3 className="font-serif text-lg mb-1">{title}</h3>
      <p className="text-sm text-muted mb-4">{intro}</p>
      {items.length === 0 ? (
        <p className="text-sm text-muted">{empty}</p>
      ) : (
        <ul className="border-t border-border">
          {items.map((item) => (
            <li key={item.label} className="relative border-b border-border overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-foreground/5"
                style={{ width: `${max > 0 ? (item.value / max) * 100 : 0}%` }}
                aria-hidden
              />
              <div className="relative flex items-center justify-between gap-3 py-2.5 px-1">
                <span className="text-sm truncate">{item.label}</span>
                <span className="text-sm font-semibold tabular-nums shrink-0">
                  {formatNumber(item.value)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function BusinessFunnel({
  business,
  requestsByType,
  downloads,
}: {
  business: DashboardData["business"];
  requestsByType: DashboardData["requestsByType"];
  downloads: DashboardData["downloads"];
}) {
  const steps = [
    {
      value: business.sessions,
      caption: "sessions sur la page Entreprises ou le portfolio Corporate",
      rate: null,
    },
    {
      value: business.ctaClicks,
      caption: "clics vers le formulaire de devis depuis ces pages",
      rate: formatRate(business.ctaClicks, business.sessions),
    },
    {
      value: business.requests,
      caption: "demandes envoyées avec le type « Entreprise »",
      rate: formatRate(business.requests, business.ctaClicks),
    },
  ];

  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-serif text-xl mb-1">Parcours entreprises</h2>
        <p className="text-sm text-muted">
          Du prospect qui découvre l&apos;offre corporate jusqu&apos;à la demande de devis.
        </p>
      </div>

      <ol className="grid sm:grid-cols-3 gap-px bg-border border border-border">
        {steps.map((step, i) => (
          <li key={step.caption} className="bg-background p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted mb-3">
              Étape {i + 1}
              {step.rate && <span className="normal-case tracking-normal"> · {step.rate} de l&apos;étape précédente</span>}
            </p>
            <p className="text-3xl font-semibold tabular-nums">{formatNumber(step.value)}</p>
            <p className="text-xs text-muted mt-2 leading-relaxed">{step.caption}</p>
          </li>
        ))}
      </ol>

      <div className="grid gap-12 lg:grid-cols-2">
        <BarList
          title="Demandes par type de projet"
          intro="Ce que les visiteurs choisissent dans le formulaire de contact."
          empty="Pas encore de demande sur la période."
          items={requestsByType.map((r) => ({ label: r.label, value: r.requests }))}
        />
        <BarList
          title="Documents téléchargés"
          intro="Brochures, tarifs et conditions ouverts depuis le site."
          empty="Aucun document téléchargé sur la période."
          items={downloads.map((d) => ({ label: d.label, value: d.downloads }))}
        />
      </div>
    </section>
  );
}
