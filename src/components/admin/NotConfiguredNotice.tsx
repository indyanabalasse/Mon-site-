const ENV_VARS = [
  "NEXT_PUBLIC_POSTHOG_KEY",
  "NEXT_PUBLIC_POSTHOG_HOST",
  "POSTHOG_PERSONAL_API_KEY",
  "POSTHOG_PROJECT_ID",
];

export default function NotConfiguredNotice() {
  return (
    <div className="mx-auto max-w-xl border border-border p-8 sm:p-10 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
        Tableau de bord
      </p>
      <h1 className="font-serif text-2xl sm:text-3xl mb-4">Presque prêt</h1>
      <p className="text-sm leading-relaxed text-muted mb-3">
        Le tableau de bord est terminé et prêt à afficher vos statistiques — il ne
        manque plus que la connexion à votre compte PostHog (gratuit) pour qu&apos;il
        s&apos;anime avec de vraies données sur vos visiteurs.
      </p>
      <p className="text-sm leading-relaxed text-muted mb-8">
        Renseignez ces quatre informations dans le fichier{" "}
        <code className="font-sans not-italic text-foreground">.env.local</code>{" "}
        et cette page prendra vie automatiquement.
      </p>
      <ul className="space-y-2 text-left border-t border-border pt-6">
        {ENV_VARS.map((name) => (
          <li
            key={name}
            className="font-mono text-xs sm:text-sm border border-border px-3 py-2"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
