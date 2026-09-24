# BRIEF PARTAGÉ — INDYANASTUDIO / indyanabalasse.com
> Document de référence unique. Tout agent de l'équipe le lit AVANT de produire quoi que ce soit.
> Rédigé à partir d'une inspection réelle du code source, pas d'hypothèses.

## 0. Langue et ton
**Tous les livrables sont en FRANÇAIS.** Le destinataire final est une personne unique :
Indyana Balasse, photographe indépendante, qui gère seule son site, son marketing et sa production.
Ton : direct, concret, sans jargon gratuit, sans langue de bois. Vouvoiement.
Barre de qualité demandée par la cliente : **10 étoiles**. Rien de générique ne passe.

---

## 1. L'entreprise

- **Marque** : INDYANASTUDIO — **Personne** : Indyana Balasse
- **Site** : https://www.indyanabalasse.com (bilingue FR/EN, FR par défaut)
- **Instagram** : @indyanastudio (canal social principal, sans doute la 1re source de trafic)
- **Contact** : indyana.balasse@gmail.com — +32 484 24 22 23
- **Zone desservie** (déclarée en `areaServed` dans le schema, alignée sur Google Business Profile) :
  Région de Bruxelles-Capitale (19 communes) + Brabant wallon (27 communes). Belgique.
- **Pas d'adresse publique** → la zone de service remplace l'adresse dans le SEO local.

### Les offres (page « Prestations »)
1. **Shooting Studio** — séance en studio. Formules : demi-journée (5 photos livrées) / journée complète (12 photos livrées). Déroulé : briefing & DA → set-up lumière → prise de vue → post-production. Options : stylisme, maquillage.
2. **Shooting Événement** — mariage, anniversaire, festival, entreprise. Demi-journée ou journée complète, photos retouchées livrées rapidement.
3. **Spécial Photobooth (« Fun Photo Booth »)** — animation photo live encadrée par un pro pendant toute la soirée. Décor accordé au thème, déguisements/accessoires. Positionnement explicite CONTRE la cabine automatique et les selfies figés.
4. **Mise à disposition (location studio)** — **INDY Studio**, 150 m², jusqu'à 5 m sous plafond, photo ET vidéo. Équipement : fonds studio 3 m + mur brique, lumière naturelle réglable, kit éclairages, trépieds, Wi-Fi, sono, coin make-up. Commodités : jardin, cuisine équipée + salle à manger, toilette et douche.
5. **Bons cadeaux** (« Offrir un shooting ») — sur mesure, sur demande par email. Zéro automatisation, zéro page de vente.

Aucun prix n'est affiché nulle part. Les taglines des offres sont vides dans le dictionnaire. Tous les CTA disent « Discutons de votre projet ».

### Catégories portfolio (URL `/[locale]/portfolio/[category]/[series]`)
- `portrait` (sous-séries `laura-degreef/shoot-1`, `shoot-2`)
- `famille` (série `femme-enceinte`, sous-séries `studio`, `exterieur`)
- `my-mood` → affiché **INDY LAB** : univers personnel et créatif
- `fun-photo-booth` (séries `mariage-1`, `mariage-2`)
- `press-kit` — visuels promotionnels pour événements et soirées

### Saisonnalité (métier photo en Belgique)
Mariages : mai→septembre (décision 6–12 mois avant → pic de recherche oct→mars).
Portraits corporate / personal branding : janvier et septembre. Famille & grossesse : continu, pic automne.
Photobooth : fêtes (nov→déc) + saison mariage. Location studio : flux B2B continu.

---

## 2. La stack technique RÉELLE (vérifiée dans le code)

| Couche | Ce qui existe |
|---|---|
| Framework | **Next.js 16.2** (App Router), React 19.2, TypeScript 5, Tailwind CSS 4 |
| Hébergement | **Vercel** |
| Base de données | **AUCUNE.** C'est le fait structurant n°1. |
| Analytics | **PostHog** — `posthog-js` côté client, HogQL Query API côté serveur |
| Email | **Resend** — appels REST bruts via `fetch`, pas de SDK |
| Auth admin | mot de passe unique (`ADMIN_PASSWORD`) + cookie signé (`ADMIN_SESSION_SECRET`) |
| i18n | dictionnaire maison `src/lib/i18n.ts`, locales `fr` / `en` |

Variables d'env présentes : `RESEND_API_KEY`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `POSTHOG_PERSONAL_API_KEY`, `POSTHOG_PROJECT_ID`, `VERCEL_OIDC_TOKEN`. `NEWSLETTER_FROM` est lu par le code mais **absent**.

Projet : `/Users/new/Documents/Mon site/` (le chemin contient une espace).
```
src/app/[locale]/   about contact newsletter packaging portfolio studio
src/app/admin/      page.tsx login/ newsletter/
src/app/api/admin/  login logout stats newsletter/{send,subscribers}
src/app/api/        contact (+confirm)  newsletter/{subscribe,confirm,unsubscribe}
src/components/     Header MobileNav Footer Gallery MasonryNav HeroSlideshow TileSlideshow
                    ContactForm NewsletterSignup StickyBookCta LanguageSwitcher admin/*
src/lib/            admin-auth analytics-events posthog-query i18n metadata site
                    contact/token newsletter/{resend,template,token}
src/data/portfolio.ts
```

---

## 3. La « mine » : ce qui est mesuré aujourd'hui

Événements maison (`src/lib/analytics-events.ts`) : `contact_form_started`, `contact_form_submitted`, `instagram_click`. Plus `$pageview` natif (`$pathname`, `$session_id`, `person_id`, `$referring_domain`). **C'est tout.**

`getDashboardData(periodDays)` dans `src/lib/posthog-query.ts` (périodes 7/30/90 j) calcule : visitors, pageviews, sessions, leads, contactStarts, instagramClicks, activationRate (% sessions ayant exploré une catégorie portfolio), returningVisitorRate (% visiteurs actifs 2+ jours), topContent, topPaths (séquences de navigation), acquisition (par `$referring_domain`), trend (par jour), sampled.

**Limites connues :**
1. `RAW_EVENT_LIMIT = 20_000` → au-delà, données tronquées, chiffres dérivés faux.
2. Agrégation en JavaScript et non en SQL.
3. **Aucune persistance** → impossible de comparer semaine N vs N-1, de suivre une tendance, de savoir si un conseil a produit un effet. Blocage n°1 du rapport hebdo.
4. Le tunnel s'arrête au formulaire : ni devis, ni réservation, ni chiffre d'affaires.
5. Rien de mesuré sur les pages d'offres, `StickyBookCta`, `NewsletterSignup`, changement de langue, scroll de galerie, temps par série, bon cadeau.
6. Pas d'UTM : Instagram in-app apparaît souvent en `Direct` / `l.instagram.com` → social sous-estimé.
7. Pas de segmentation FR/EN.

---

## 4. L'email aujourd'hui (`src/lib/newsletter/resend.ts`)

- L'audience Resend `"INDYANASTUDIO Newsletter"` **est** la base d'abonnés, retrouvée par son nom à chaque appel.
- Double opt-in newsletter et formulaire de contact (tokens HMAC signés).
- Broadcast manuel depuis `/admin/newsletter`.

**Problèmes critiques :**
1. **BLOQUANT** — expéditeur `onboarding@resend.dev` par défaut (`NEWSLETTER_FROM` absent) : ne livre qu'au propriétaire du compte, tout vrai abonné reçoit un 403. Le programme email est à l'arrêt sans le signaler.
2. Le désabonnement **supprime** le contact → perte de la preuve de consentement, réinscription possible d'un désabonné.
3. Zéro segmentation, zéro automatisation, zéro retour de performance (pas de webhooks).
4. SPF / DKIM / DMARC non vérifiés.

---

## 5. Les 2 livrables demandés par la cliente

### LIVRABLE A — Rapport hebdomadaire automatisé
Email HTML auto-envoyé chaque semaine à Indyana (destinataire unique), + page web partageable + PDF archivable.
> « qui montre ce qui fonctionne, ce qui ne fonctionne pas, et qui **ne s'arrête pas seulement à montrer des statistiques**, mais qui donne des conseils constructifs et pratiques, **pratico-pratiques**. »

Le chiffre n'est jamais le livrable, il est la preuve. Chaque observation produit une action nommée, faisable dans la semaine, par une personne seule, sans budget, avec effort estimé et signal de réussite.

### LIVRABLE B — Master plan « mode cathédrale » : CRM + marketing automation
Choix **arrêté** : **open-source auto-hébergé**. Ne pas re-litiger ; le servir au mieux, en chiffrant honnêtement le coût d'exploitation.
« Mode cathédrale » = plan pluriannuel, fondations qu'on ne refait pas, chaque phase livre de la valeur seule, vision complète dès le premier jour. **La phase 1 = le rapport hebdomadaire** (il force la base de données et la mémoire historique).

---

## 6. Règles communes

1. **Zéro chiffre de trafic inventé.** Placeholders `{{visitors}}` ou exemples étiquetés « illustratif ».
2. **Ancrer dans le code réel** : chemins, événements, fonctions.
3. **Une personne seule, sans budget, sans équipe.** Annoncer tout coût en temps.
4. **RGPD / Belgique** traité sérieusement, sans en faire une note juridique.
5. **Prioriser** impact × effort. Dire ce qu'on NE fait PAS.
6. **Un fichier Markdown** à l'emplacement demandé. Dense, sans remplissage.
7. Écrire le fichier **par sections successives** (Write puis Edit) pour résister à une interruption.

---

## 7. ADDENDUM — Corrections et décisions issues de la vague 1 (à respecter par la vague 2)

Les livrables de la vague 1 sont dans `master-plan/out/` :
`01-mesure.md` (modèle de mesure, taggage, HogQL, règles), `02-cro-conseils.md` (diagnostic + 41 conseils),
`05-delivrabilite.md` (email, DNS, désabonnement), `06-concurrence.md` (marché, prix, positionnement).
`03-stack-cathedrale.md` et `04-crm-modele.md` sont en cours d'écriture.

**Corrections du brief :**
- Le code contient **8 catégories portfolio (20 galeries)**, pas 5. Source de vérité : `src/data/portfolio.ts`.
- `next.config.ts` a `images.unoptimized: true` : toutes les photos partent en pleine résolution, mobile compris.
- **Aucun bouton de contact visible sur mobile** sur les 3 pages d'offres détaillées ni sur `/studio` (`hidden md:inline-block`) ; `StickyBookCta.tsx` ne s'affiche que sur `/[locale]/packaging`.
- `contact_form_submitted` compte aussi les spams écartés en silence par `api/contact/route.ts:35-37`.
- Le dashboard compte les visites d'Indyana (y compris `/admin`, libellé « Accueil »).
- **Le domaine est déjà configuré à ~70 % chez Resend** (DKIM, SPF sur `send.`, région EU). Manque : DMARC, `v=spf1 -all` racine. `NEWSLETTER_FROM` est peut-être défini en production (non vérifiable localement) → test : s'envoyer un message via le formulaire.
- **Piège** : définir `NEWSLETTER_FROM` active automatiquement le double opt-in du formulaire de contact (`api/contact/route.ts:58`). Les deux changements partent ensemble.
- Désabonnement : lien qui expire à 7 jours, pas de handler POST (One-Click Gmail impossible), page qui confirme même sans action, aucune protection anti-bot sur l'inscription.

**Décisions d'équipe :**
- **Identifiants** : les règles de déclenchement de `01-mesure.md` sont `R-xx` ; les textes de conseil sont les `CONSEIL-01` à `CONSEIL-41` de `02-cro-conseils.md` ; l'ancienne numérotation de conseils de la mesure est renommée `M-01…M-36`. La table de correspondance est à la fin de `02-cro-conseils.md` (section 3).
- **Le rapport mène avec 4 métriques de résultat** (cf. `01-mesure.md`) : prises de contact, visiteurs ayant ouvert une offre, taux offre → contact, nouveaux abonnés confirmés.
- **Mémoire** : Neon (Postgres serverless), tables `weekly_snapshot` et `advice_log`, cron Vercel hebdomadaire.
- **Prix** (`06-concurrence.md`) : afficher. Grille complète location studio ; prix fermes portrait / famille / bons cadeaux ; « à partir de » mariage / événement / photobooth.
- **Positionnement** : message n°1 = le studio (150 m², 5 m, jardin, cuisine — combinaison unique à Bruxelles) ; n°2 = photobooth animé par une photographe vs bornes automatiques. Public sous-exploité = **familles expatriées, en anglais** (les institutions UE sont déjà occupées). Échéance : mariages 2027 choisissent leur photographe d'ici mars.
- **Écarts les plus graves vs concurrence** : zéro avis Google et zéro témoignage (concurrents : 100 à 466), pas de page tarifs.
- **Rapport hebdo (délivrabilité)** : expéditeur `rapport@`, sujet différent chaque semaine, pas d'en-tête `References`, HTML < 80 Ko, graphiques en tableaux HTML/CSS (pas d'images externes), version texte brut, filtre Gmail « Principale ».

### 7bis. Vérifié le 24/09/2026 (vercel env ls production) — PRIME sur tout ce qui précède
- **`NEWSLETTER_FROM` EST DÉFINI en production** (Preview + Production, créé il y a 35 jours, soit ~20 août, en même temps que le double opt-in, commit `c8050c2`). Il manque seulement dans le `.env.local` local. **Le « bloquant onboarding@resend.dev » ne s'applique PAS à la production.** Les envois réels fonctionnent vraisemblablement ; le double opt-in du formulaire de contact est donc ACTIF en production.
- Variables de production : NEWSLETTER_FROM, POSTHOG_PERSONAL_API_KEY, POSTHOG_PROJECT_ID, NEXT_PUBLIC_POSTHOG_HOST, NEXT_PUBLIC_POSTHOG_KEY, ADMIN_SESSION_SECRET, ADMIN_PASSWORD, RESEND_API_KEY. Projet Vercel : `indyanabalasse/mon-site`.
- `04-crm-modele.md` + `04-crm-schema.sql` sont terminés (schéma validé sur PostgreSQL 18 via PGlite). Points clés : journal de consentement immuable ; pipeline 5 étapes ; 9 signaux + « Les 7 du lundi » (liste de 7 personnes, ~45 min le lundi) ; n8n est le seul à écrire en base (jamais le site) ; le formulaire promet « Réponse sous 24h » (`i18n.ts:596`) ; les options « Type de projet » du formulaire ne correspondent pas aux segments (« Sport et santé » existe, « Mariage » manque ; valeur collée dans le texte du message, `ContactForm.tsx:59`).

### 7ter. Stack arrêtée (`03-stack-cathedrale.md`, terminé) — à respecter
- **Un serveur Hetzner CX33** (Nuremberg, 8 Go RAM), Docker Compose, **Caddy** (HTTPS), **Tailscale** (aucune interface d'admin publique).
- **PostgreSQL 18** = fondation. Schéma `crm` de `04-crm-schema.sql` tel quel + schémas `mesure` (agrégats anonymes) et `rapport` (rapports hebdo + suivi des conseils, table `rapport.conseil` avec bouton « C'est fait »). **Neon est écarté** (remplace la recommandation Neon de `01-mesure.md`).
- **Twenty** = interface CRM au quotidien (pipeline, fiches, notes). **n8n** = orchestration, et **seul à écrire en base** (jamais le site). **Listmonk v6.2** = listes et campagnes. **Gotenberg** = PDF.
- Externes par choix : **PostHog Cloud EU** (rapatrié chaque nuit dans `mesure.*` / `crm.events`), relais d'envoi **Resend** puis **Scaleway TEM** en phase 3, le site sur **Vercel**.
- Rapport : e-mail le lundi 7 h ; page `rapport.indyanabalasse.com/r/<jeton>/2026-Wxx.html` + PDF.
- **5 phases sur 18 mois** : P1 « La dalle » (mémoire + rapport hebdo, oct–nov 2026) ; P2 « Le chœur » (référentiel client + consentement opposable) ; P3 « Les voix » (e-mail maîtrisé + automatisations) ; P4 « Le trésor » (boucle du revenu) ; P5 « La clé de voûte » (un système qui tient sans elle).
- Coût : ~15–21 €/mois + 2 h 30–3 h 20 d'exploitation/mois.
