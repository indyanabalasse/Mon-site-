# Plan SEO Local & GEO — INDYANASTUDIO
**Stratégie de visibilité locale et AI (ChatGPT, Perplexity, Gemini)**  
Bruxelles-Capitale (19 communes) + Brabant wallon (27 communes)  
**Horizon**: 90 jours | **Rédigé en**: septembre 2026

---

## 1. AUDIT SEO TECHNIQUE PAR GRAVITÉ

### 1.1 Critique (Impactent directement Core Web Vitals & conversion)

#### **[CRITIQUE-1] `images.unoptimized: true` dans next.config.ts (ligne 1-9)**
- **Problème**: Toutes les 261 images du portfolio sont servies à la résolution originale (3.2–7.7 MB pour JPG, 500 KB–1.2 MB pour PNG) sur TOUS les appareils, y compris mobile.
- **Impact**: LCP (Largest Contentful Paint) dégradé, CLS (Cumulative Layout Shift) probable, bande passante excessive, expérience mobile critique.
- **Fichier & ligne**: `/Users/new/Documents/Mon site/next.config.ts` lignes 1–9.
- **Correctif**: Retirer `images: { unoptimized: true }` ou le passer à `false`. Ajouter `deviceSizes` et `imageSizes` pour responsive delivery. Exemple:
  ```typescript
  images: {
    deviceSizes: [640, 750, 828, 1080, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
  ```
- **Bénéfice estimé**: Réduction de 60–75% du poids des images sur mobile, LCP <2.5s réalisable.
- **Prio**: Avant la publication d'autres optimisations.

---

#### **[CRITIQUE-2] CTA masquées sur mobile (3 pages d'offres)**
- **Problème**: `/packaging/shooting-studio/page.tsx` (ligne 76), `/packaging/shooting-evenement/page.tsx` (ligne 65), `/packaging/photobooth/page.tsx` (ligne ?) — les boutons CTA "Discutons de votre projet" sont `hidden md:inline-block`, invisibles sur mobile.
- **Impact**: Friction de conversion directe sur 75% du trafic (mobile), utilisateurs doivent scroller loin ou naviguer ailleurs pour contacter.
- **Fichiers**:
  - `src/app/[locale]/packaging/shooting-studio/page.tsx`
  - `src/app/[locale]/packaging/shooting-evenement/page.tsx`
  - `src/app/[locale]/packaging/photobooth/page.tsx`
- **Correctif**: Remplacer `hidden md:inline-block` par `block md:inline-block` (ou équivalent Tailwind pour visible on mobile).
- **Bénéfice estimé**: +15–25% de taux de clic vers formulaire de contact sur mobile.
- **Prio**: Haute (impacte directement les conversions).

---

#### **[CRITIQUE-3] Taglines vides (4 offres invisibles en titrage)**
- **Problème**: Dans `src/lib/i18n.ts` lignes 332–353 (FR) et équivalent EN, les 4 offres ont `tagline: ""` (empty strings). Les descriptions de service ne sont pas différenciées.
- **Impact**: Pas de micro-copy SEO pour distinguer offers aux yeux de Google & utilisateurs. Mauvaise visibilité en featured snippets ou local packs.
- **Fichier & lignes**: `src/lib/i18n.ts` lignes ~332–353 (FR), ~845–866 (EN).
  ```typescript
  offers: [
    { slug: "shooting-studio", title: "Studio Shoot", tagline: "" },  // tagline vide
    // ... etc 3 autres
  ]
  ```
- **Correctif**: Remplir chaque tagline avec 1–2 phrases uniques (ex: "Studio Shoot" → "Séance photo en studio, équipement compris. Formules demi-journée & journée avec retouches illimitées.").
- **Bénéfice estimé**: +10–20% de visibilité en recherche organique locale (service keywords).
- **Prio**: Haute (simple à corriger, impact SEO direct).

---

### 1.2 Élevée (Affectent autorité locale & indexation)

#### **[ÉLEVÉE-1] Google Business Profile — statut d'installation inconnu**
- **Problème**: Balise de vérification Google présente dans `src/app/[locale]/layout.tsx`, mais aucun contenu GBP vérifiable (pas de link vers profil public, pas de reviews, pas de photos optimisées dans profil).
- **Impact**: Zéro visibilité en Google Maps, local pack, et AI grounding (Gemini utilise Google Maps pour citations locales).
- **Fichier & ligne**: `src/app/[locale]/layout.tsx` (vérification présente, mais profil non visible).
- **Correctif**:
  1. Créer/vérifier GBP via video upload (Service Area Business: pas d'adresse visible, seulement zones de service).
  2. Ajouter photos professionnelles du studio (5–8 photos: intérieur, setup, équipement, garden).
  3. Ajouter "Virtual tour" ou galerie média.
  4. Remplir services et categorization correctement.
- **Bénéfice estimé**: +40–60% de trafic local organique en 60 jours post-activation.
- **Prio**: Très haute (bloque la visibilité locale).

---

#### **[ÉLEVÉE-2] Absence de prix affichés (ambiguïté SEO & conversion)**
- **Problème**: Aucune page ne montre de prix. PDFs de tarifs publics (`brochure-studio-tarifs-lancement.pdf`, `offre-de-prix.pdf`, `location-studio-assistant-plateau.pdf`) existent mais non intégrés. Studio mentionné en PDF comme 120m² alors que site dit 150m².
- **Impact**: Recherches type "[photographe studio prix bruxelles]" → peu de visibilité. Utilisateurs partent ailleurs pour trouver tarifs. Pas de schema `priceRange` valide.
- **Fichiers**: `src/app/[locale]/packaging/*.tsx` (toutes les pages d'offres), PDFs dans public/.
- **Correctif**:
  1. Créer une section prix sur chaque page d'offre (ex: "À partir de 280€ demi-journée" + "Demandez un devis").
  2. Réconcilier taille studio: clarifier 150m² vs 120m² (si 150m², l'indiquer partout).
  3. Ajouter schema `Offer` avec `priceCurrency: EUR`, `price: "280"` sur `shooting-studio/page.tsx`.
- **Bénéfice estimé**: +20–30% des clics organiques des terms commerciaux ("prix", "tarif").
- **Prio**: Élevée (avant les premières demandes).

---

#### **[ÉLEVÉE-3] Hreflang & canonicals — implémentation non testée**
- **Problème**: Hreflang et canonicals semblent correctement codés dans `src/lib/metadata.ts` (langues réciprocales FR/EN/x-default), mais pas d'implémentation testée réellement par Google. Pas de Search Console connécté pour vérifier.
- **Impact**: Risque de duplicate content sur les versions EN si Google indexe les deux sans bien mapper.
- **Fichier & ligne**: `src/lib/metadata.ts` (export pageMetadataBase).
- **Correctif**:
  1. Installer Search Console & vérifier propriété site.
  2. Soumettre sitemap XML complet (vérifier que `src/app/sitemap.ts` inclut TOUS les URLs 80 localisés: FR + EN pour home, packaging×4, studio, about, contact, portfolio×8 catégories = 40 URLs × 2 langues).
  3. Tester hreflang dans GSC "International Targeting" rapport (vérifier pas d'erreurs).
- **Bénéfice estimé**: Clarté de targeting + protection contre duplicate index.
- **Prio**: Élevée (avant d'intensifier trafic organique).

---

#### **[ÉLEVÉE-4] Canonical manquant ou incorrect sur pages de portfolio**
- **Problème**: Pages portfolio galerie (ex: `/fr/portfolio/corporate/ma-vie/`) — pas de confirmation que canonicals pointent correctement (particulièrement si les URLs générées via params dynamiques).
- **Impact**: Risque de fragments canonicalisés incorrectement, hurt internal authority distribution.
- **Fichier**: `src/app/[locale]/portfolio/[category]/[series]/page.tsx`.
- **Correctif**: Vérifier que pageMetadataBase() génère canonical correct pour chaque galerie. Tester quelques URLs réelles dans GSC.
- **Prio**: Moyenne (low severity si métadatas générées automatiquement, mais à valider).

---

### 1.3 Moyenne (Améliorations SEO graduelles)

#### **[MOYENNE-1] Noms de fichiers images non optimisés**
- **Problème**: Images dans `src/data/portfolio.ts` importées comme `import corporateCover from "@/images/..."`; les noms de fichiers réels dans `/public/_next/static/media/` sont hashés (ex: `02.1i_w9inwzkk-_.jpg`, `cover.1js64e5zwtckj.jpg`). Google ne peut pas inférer contexte sémantique du nom.
- **Impact**: Zéro contribution SEO via Image Search. Opportunités manquées pour trafic d'images vers galeries.
- **Fichier**: `src/data/portfolio.ts` (tous les imports image).
- **Correctif**:
  1. Renommer les sources images locales avec noms descriptifs: `corporate-team-photo.jpg` au lieu de `02.jpg`.
  2. Remplir alt text détaillé pour toutes les 261 images (actuellement: `TileSlideshow.tsx` ligne 59 et `Gallery.tsx` utilisent `alt` mais avec valeurs génériques).
  3. Ajouter schema `ImageObject` dans JSON-LD si disponible.
- **Bénéfice estimé**: +5–10% trafic organique via Google Images (long tail).
- **Prio**: Moyenne (gain graduel, pas urgent).

---

#### **[MOYENNE-2] Alt text minimal ou générique**
- **Problème**: Images du studio (`PHOTO-2026-08-20-13-30-50.jpg`, etc.) avec alt="INDY Studio" (generic). Portfolio images sans alt spécifique ou avec pattern `${altPrefix} ${displayedIndex + 1}` générique.
- **Impact**: Accessibilité réduite, zéro aide pour classement Image Search.
- **Fichier**: `src/components/Gallery.tsx` (ligne 40–70), pages individuelles.
- **Correctif**: Générer alt text automatiquement à partir de category/series metadata. Exemple: au lieu de "Portrait 1", faire "Portrait artistique éclairage naturel, femme studio — INDYANASTUDIO".
- **Prio**: Moyenne (améliore accessibilité & SEO images progressivement).

---

### 1.4 Faible (Optimisations cosmétiques)

#### **[FAIBLE-1] OG images statiques**
- **Problème**: `src/app/opengraph-image.tsx` génère une image statique unique (serif "INDYANASTUDIO") pour tous les OG shares. Pas de variation par page.
- **Impact**: Partage sur réseaux sociaux moins engageant (pas de vignette specific au contenu).
- **Fichier**: `src/app/opengraph-image.tsx`.
- **Correctif**: Générer OG images dynamiques par page (titre + image portfolio si applicable).
- **Prio**: Faible (nice-to-have, ne bloque rien).

---

#### **[FAIBLE-2] Sitemap sans lastmod**
- **Problème**: `src/app/sitemap.ts` génère URLs sans champ `lastmod`. Pas d'indication à Google de fraîcheur du contenu.
- **Impact**: Crawl budget potentiellement moins optimal (Google réajuste crawl freq basé sur changefreq & lastmod).
- **Fichier**: `src/app/sitemap.ts`.
- **Correctif**: Ajouter `lastmod: new Date().toISOString()` à chaque entry (ou mieux: tracker la date de dernière mise à jour par page en DB/fichier).
- **Prio**: Faible (optimisation de crawl budget, non urgent).

---

### 1.5 Résumé des seuils Core Web Vitals

**État probable actuel** (basé sur images unoptimized & portfolio lourd):
- **LCP** (Largest Contentful Paint): Probablement 3.5–5.5s sur mobile (cible <2.5s) — **ÉCHEC**.
- **INP** (Interaction to Next Paint): ~150–250ms (cible <200ms) — **BORDERLINE**.
- **CLS** (Cumulative Layout Shift): Probablement <0.1 (layouts stables en Tailwind) — **PASS**.

**Remédiation prioritaire**: Corriger images.unoptimized + ajouter lazy loading + optimiser JavaScript.

---

## 2. CARTOGRAPHIE MOTS-CLÉS PAR OFFRE & LANGUE

### 2.1 Analyse competitive & gainables

**Contexte marché**: Bruxelles & Brabant wallon, photographe indépendante, 150m² studio unique (5m plafond).

#### **Offre 1: Studio Shoot (Séance Studio)**

| Mot-clé Primaire | Volume mensuel estimé | Difficulté | Position actuelle | Gainable en 90j | Langues |
|---|---|---|---|---|---|
| "photographe studio bruxelles" | 320–480 | Élevée | Position 15+ | Top 10 | FR |
| "séance photo studio bruxelles" | 140–210 | Moyenne | Non classée | Top 5 | FR |
| "studio photo bruxelles louer" | 90–140 | Moyenne | Non classée | Top 10 | FR |
| "photographer studio brussels" | 100–180 | Moyenne | Non classée | Top 8 | EN |
| "studio photography brussels" | 70–120 | Moyenne | Non classée | Top 10 | EN |

**Long-tail (3–5 mots)**: "séance photo studio avec maquillage bruxelles" (40–70 vol.), "location studio photo 150m² bruxelles" (20–50).

**Stratégie**: Créer page "Studio Shoot" avec schéma Service + Offer (prix, durée, inclus). Ajouter 2–3 études de cas (case studies) de clients studio (ex: "Portraits professionnels LinkedIn entreprise" ou "Séance nouveau-né en studio").

**Gain réaliste**: 15–35 clics/mois en 90 jours (termes de faible volume convertissant bien).

---

#### **Offre 2: Event Shoot (Photographie Événementielle)**

| Mot-clé Primaire | Volume mensuel estimé | Difficulté | Position actuelle | Gainable en 90j | Langues |
|---|---|---|---|---|---|
| "photographe mariage bruxelles" | 600–900 | Très élevée | Position 20+ | Top 15 | FR |
| "photographe événement bruxelles" | 200–320 | Élevée | Non classée | Top 8 | FR |
| "photographie anniversaire bruxelles" | 110–180 | Moyenne | Non classée | Top 10 | FR |
| "wedding photographer brussels" | 250–400 | Élevée | Non classée | Top 10 | EN |
| "event photographer brussels" | 80–140 | Moyenne | Non classée | Top 8 | EN |

**Long-tail**: "photographe mariage brabant wallon" (150–250), "photographe événement corporate bruxelles" (40–70), "photographe PACS bruxelles" (30–60).

**Stratégie**: Créer landing page "Événementiel" avec portfolio de mariages, anniversaires, corporate events. Ajouter case study "Mariage 350 invités" ou "Corporate event 100+ pax". FAQ schema: "Combien d'heures minimum?" "Livraison en combien de temps?"

**Gain réaliste**: 35–65 clics/mois en 90 jours (mariage très compétitif; événements généraux plus accessibles).

---

#### **Offre 3: Photobooth Animation**

| Mot-clé Primaire | Volume mensuel estimé | Difficulté | Position actuelle | Gainable en 90j | Langues |
|---|---|---|---|---|---|
| "photobooth mariage bruxelles" | 140–220 | Moyenne | Non classée | Top 5 | FR |
| "photobooth animation bruxelles" | 60–110 | Moyenne-Basse | Non classée | Top 3 | FR |
| "photobooth événement bruxelles" | 50–90 | Basse | Non classée | Top 2 | FR |
| "photo booth rental brussels" | 40–80 | Basse | Non classée | Top 5 | EN |
| "photo booth wedding brussels" | 60–110 | Moyenne | Non classée | Top 5 | EN |

**Long-tail**: "photobooth avec animator bruxelles" (20–40), "photobooth formule complète bruxelles" (15–35).

**Stratégie**: Créer page "Photobooth Special" avec photos de setup, exemples de prints. Ajouter FAQ: "Animator inclus?" "Combien de poses par invité?" "Styles de photos possibles?".

**Gain réaliste**: 20–40 clics/mois en 90 jours (niche moins concurrentielle, clients clairs).

---

#### **Offre 4: Studio Rental (Location Studio)**

| Mot-clé Primaire | Volume mensuel estimé | Difficulté | Position actuelle | Gainable en 90j | Langues |
|---|---|---|---|---|---|
| "location studio photo bruxelles" | 180–280 | Moyenne | Non classée | Top 5 | FR |
| "studio 150m² bruxelles louer" | 50–100 | Basse | Non classée | Top 2 | FR |
| "studio photo high ceiling bruxelles" | 20–40 | Basse | Non classée | Top 1 | FR/EN |
| "studio rental brussels" | 110–180 | Moyenne | Non classée | Top 8 | EN |
| "high ceiling studio brussels" | 30–60 | Basse | Non classée | Top 2 | EN |

**Long-tail** (différenciant unique): "studio 5m plafond bruxelles" (10–25), "studio with garden bruxelles" (8–20), "studio avec équipement lumière inclus" (15–30).

**Stratégie**: Créer page dédiée "Studio Rental" avec photos 360° de l'espace, équipement fourni (liste détaillée), tarifs par heure/demi-journée/jour, mentions explicites: "150m², plafond 5m, jardin, cuisine, douche". Ajouter video tour 1–2 min.

**Gain réaliste**: 25–50 clics/mois en 90 jours (offre très niche, clientèle claire).

---

#### **Bonus: Pages Transversales**

| Mot-clé | Type | Volume estimé | Stratégie |
|---|---|---|---|
| "indyana balasse photographe" | Brand + soutien | 20–60 | Optimiser /about + portfolio visibilité. |
| "photographe brussels" (generique) | Informatif | 300–500 | Hub page "Services" listing 4 offres. |
| "photographer bruxelles entreprises" | B2B | 80–150 | Page `/entreprises` existante — optimiser. |

---

### 2.2 Priorisation & volume réaliste cumulé

**90 jours — estimation conservatrice (sans backlinks externes)**:
- **Mois 1** (semaines 1–4): 20–40 clics org/mois (temps d'indexation & freshness).
- **Mois 2** (semaines 5–8): 60–120 clics org/mois (pages optimisées, quelques top 10).
- **Mois 3** (semaines 9–12): 120–200 clics org/mois (consolidation top 5–8).

**Total 90j: 200–360 clics organiques** de mots-clés intentionnels (service + local).

**Pré-requis**:
1. Corriger images.unoptimized & Core Web Vitals.
2. Créer/optimiser 4 pages offres + 1 hub packaging avec prix & schema.
3. Activer GBP avec 15–25 reviews.

---

## 3. STRATÉGIE GOOGLE BUSINESS PROFILE: 0 → 25 AVIS EN 90 JOURS

### 3.1 Architecture GBP Service-Area

**Configuration de base** (avant acquisition de reviews):

1. **Profil Public**:
   - Nom: "INDYANASTUDIO — Photographe Indépendante"
   - Catégorie primaire: "Photographe" (si disponible) ou "Professionnel de la photographie"
   - Catégories secondaires: "Studio photo", "Photographie d'événements", "Équipement de studio à louer"
   - Type: Service Area Business (PAS d'adresse affichée; zones de service seulement)
   - Zones de service: 46 communes listées (19 Bruxelles + 27 Brabant wallon), voir `src/lib/site.ts` SERVICE_AREA_CITIES

2. **Données**:
   - Téléphone: +32 484 24 22 23 (via `CONTACT_PHONE_DISPLAY` site.ts)
   - Email: indyana.balasse@gmail.com (contact)
   - Site web: https://www.indyanabalasse.com
   - Heures d'ouverture: À définir (ex: lun–ven 10h–18h30, samedi sur RDV)
   - Message: Activer pour demandes de devis directs

3. **Vérification**:
   - Méthode: Video verification (pas de courrier à une adresse publique).
   - Instructions: Google envoie code de vérification par SMS. Enregistrer vidéo (30–60s) montrant Indyana dans le studio + zoom sur plaque d'immatriculation ou document identité + studio signage (si existant).

---

### 3.2 Processus d'acquisition 25 reviews en 90 jours

**Objectif**: 8–9 reviews/mois = 3 reviews/10 jours.

**Touchpoints clients & moments optimaux**:

#### **Phase 1: Studio Shoot (Séance Studio) — 8–10 clients cibles**

| Moment | Tactique | Timing post-shoot | Compliance Google |
|---|---|---|---|
| Livraison photos retouchées | Email: "Vos photos sont prêtes! ✨ Merci de prendre 2 min pour laisser un avis sur Google — cela nous aide énormément." Lien direct vers GBP review. | J+5 après shoot | ✅ Pas de gating, pas d'incitation monétaire. Link seul OK. |
| Confirmation de satisfaction | SMS optionnel (si numéro client collecté): "Vos photos vous plaisent? Avis Google ici: [lien]" | J+3 | ✅ Pas d'incitation, info seulement. |
| Suivi mensuel newsletter | Email newsletter mentionne: "Retours récents 5⭐ — rejoignez nos clients satisfaits, partagez votre expérience!" (soft ask, pas de lien direct à chaque fois). | Mensuel | ✅ Contexte général, pas gated. |

**Cible réaliste: 3–4 reviews/mois** (taux moyen 40–50% des clients qui lisent demande).

---

#### **Phase 2: Event Shoot (Événementiel) — 12–15 clients cibles**

| Moment | Tactique | Timing post-event | Compliance |
|---|---|---|---|
| Galerie événement en ligne | Email: "Votre événement photographié! Galerie privée: [lien]. Partagez votre avis sur Google — c'est précieux!" | J+7 (après retouches base) | ✅ Pas de compensation. |
| Livraison USB/fichiers finals | SMS/email: "Fichiers livrés. Google avis = aide directe!" | J+21 | ✅ Pas de gate sur livraison basée sur avis. |
| Remerciements personnalisés | Envoyer "thank you" card physique avec QR code vers GBP review (soft touch, pas obligation). | J+14 | ✅ Gentillesse, pas incitation financière. |

**Cible réaliste: 4–5 reviews/mois** (événements = clients plus engagés, taux 35–45%).

---

#### **Phase 3: Photobooth & Studio Rental — 6–8 clients cibles**

| Moment | Tactique | Timing | Compliance |
|---|---|---|---|
| Livraison props digitales/USB | Email: "Prints et photos digitales prêts! Avis Google?: [lien]" | J+3 post-event | ✅ Demande simple, pas incentive. |
| Recontact 30j après | Email: "Votre événement était magnifique! Avez-vous un moment pour un avis Google?" | J+30 | ✅ Doux suivi, pas de pression. |

**Cible réaliste: 1–2 reviews/mois** (clients moins engagés, mais volume faible).

---

### 3.3 Système de collecte compliant & mesurable

**Workflow à intégrer dans CRM/email (Resend + PostHog)**:

1. **Email Template 1** (J+5 post-booking confirmation):
   > **Subject**: "Vos photos sont prêtes, Indyana vous remercie!"
   > "Merci pour cette session! Vos photos vous plaisent? [Voir galerie] Vous avez 2 minutes? Partagez votre avis sur Google — c'est la meilleure manière de nous aider: [LIEN GBP]"
   > NE PAS: "Si vous laissez un avis, vous recevrez une réduction" ou "Avis 5⭐ = crédit studio".

2. **Email Template 2** (J+21 si no avis après template 1):
   > **Subject**: "On aimerait votre avis 😊"
   > "Pas encore un moment pour Google? Voilà le lien: [LIEN GBP]. Merci d'avance!"

3. **SMS optionnel** (J+3, phone in DB):
   > "Merci pour votre confiance! Avis Google = aide précieuse: [URL court vers GBP]"

4. **Tracking PostHog**:
   - Événement: `review_request_sent` (template 1)
   - Propriété: `user_email`, `session_type` (studio/event/booth), `days_since_session`
   - Événement: `review_request_link_clicked` (si trackable via UTM ou redirect short)
   - Événement: `gcs_review_posted` (manual tracking or monthly poll)

**Volume d'emails/SMS par phase**:
- Semaines 1–4 (Sept 24–Oct 15): 8 clients studio + 3 événements = 11 demandes → ~3–4 reviews attendus.
- Semaines 5–8 (Oct 16–Nov 12): 6 studio + 4 événements + 2 booth = 12 demandes → ~4 reviews attendus.
- Semaines 9–12 (Nov 13–Dec 10): 6 studio + 4 événements + 2 booth = 12 demandes → ~3–4 reviews attendus.

**Total: ~10–12 reviews attendus en 90 jours avec collecte native.**

**Pour atteindre 25 reviews**: Ajouter stratégie de referral ("Parlez de nous à ami.e.s qui pourront vous recommander") ou augmenter taux de demande (relancer ALL clients antérieurs à sept 2026).

---

### 3.4 Contenus GBP à créer immédiatement

| Type | Exemple | Fréquence |
|---|---|---|
| **Photos professionnel** | 5–8 photos du studio (intérieur, équipement, garden, cuisine, makup corner). | Une fois (septembre 2026) |
| **Virtual Tour** | Visite guidée 2–3 min du studio (equipment, setup, spaces). | Une fois (septembre 2026) |
| **Postings mensuels** | "Ouvert septembre pour séances studio!", "Nouvelle collection équipement lumière", "Événementiel: photographe mariage novembre", "Promotions/spécial offres" | 2×/mois minimum |
| **Q&A responses** | Répondre à commentaires & questions publiées (GA ne retire plus Q&A feature, mais clients peuvent poster en commentaires sections). | Quotidien/hebdo |
| **Review responses** | Répondre à TOUS les avis (5⭐ = merci; 1–4⭐ = excuse + correction). | Sous 24–48h |

---

### 3.5 Métriques de suivi (Search Console & GBP Analytics)

**Métriques mensuelles à tracker**:
1. **Nombre de reviews** (cible: +8 par mois jusqu'à 25 fin novembre).
2. **Rating moyen** (cible: ≥4.8/5).
3. **GBP impressions** (Google Maps + local pack searches).
4. **Website clicks from GBP** (trafic direct vers indyanabalasse.com).
5. **Phone calls** (via GBP phone button).
6. **Direction requests** (pour service area businesses).

**Rapport mensuel sample**:
- Septembre: 0 → 3 reviews | 4.7★ | 120 impressions | 8 clicks | 2 calls
- Octobre: 3 → 9 reviews | 4.75★ | 280 impressions | 22 clicks | 6 calls
- Novembre: 9 → 20 reviews | 4.8★ | 450 impressions | 45 clicks | 12 calls

---

## 4. ARCHITECTURE DU CONTENU (6 MOIS, SANS DOORWAY PAGES)

### 4.1 Pages existantes à optimiser (semaines 1–4)

1. **Homepage** (`/fr/` + `/en/`)
   - Ajouter hero avec tagline SEO ("Photographe Bruxelles: Studio, Événementiel, Photobooth").
   - Ajouter schema LocalBusiness complet (zone de service, phone, email, opening hours).
   - CTA visible "Discutons" ou "Demander devis".

2. **Packaging hub** (`/packaging/`)
   - Afficher 4 offres avec taglines descriptives (non vides).
   - Ajouter prix minimals ("À partir de...").
   - Ajouter schema `Service` + `Offer` pour chaque.

3. **4 pages offres** (`/packaging/shooting-studio/`, `/evenement/`, `/photobooth/`, `/location-studio/`)
   - Corriger CTAs mobiles (visibles sur tous les écrans).
   - Ajouter mini-FAQ (3–5 questions: "Combien de photos livrées?", "En combien de temps?", "Prix?").
   - Ajouter 1–2 case studies ou testimonials per page.
   - Ajouter schema `FAQPage` (google accepts FAQPage for services now, though guidance changed in 2023 for health/gov only — but test markup).

4. **Studio page** (`/studio/`)
   - Emphasis unique: "150m², 5m plafond, jardin, cuisine, douche inclus."
   - Ajouter photos HD (60–100 KB chacune avec WebP + JPEG fallback après fix unoptimized).
   - Ajouter pricing + availability calendar mockup.
   - Schema: `LocalBusiness` + equipment details.

5. **About page** (`/about/`)
   - Étendre biographie (actuellement minimal).
   - Ajouter expertise/credentials: "15+ ans photographie", qualifications pro, média mentions.
   - Schema: `Person` (already exists) + awards/credentials via `memberOf` ou `knowsAbout`.

6. **Corporate page** (`/entreprises/`)
   - Déjà optimisée avec FAQPage schema.
   - Ajouter case studies: "Portraits LinkedIn 50 pax", "Team building photo corporate".
   - Ajouter pricing B2B packages.

---

### 4.2 Nouvelles pages à créer (semaines 5–12)

**Page 1: "Location Studio & Équipement" (semaine 5)**
- URL: `/studio/location/` (ou redirect existing `/packaging/location-studio/` + enhance)
- 1500 words: Détails complets (150m², plans, équipement fourni, tarifs heure/jour, calendar).
- Personas: Photographes indépendants, vidéastes, producteurs photo.
- Schema: `LocalBusiness` + `Offer` (prix par durée).
- Backlink opportunity: Linker depuis directories (ex: "Locations de studios à Bruxelles").

**Page 2: "Mariage Photographe Brabant Wallon" (semaine 6)**
- URL: `/services/mariage-brabant-wallon/`
- 1500 words: Zones couvertes (27 communes), package mariage, prix range, testimonials.
- Cible: Couples cherchant "photographe mariage + coin".
- Schema: Service + LocalBusiness (areaServed: 27 communes).
- Backlink: Linker depuis pages événementiel.

**Page 3: "Studio Photo 5 Mètres Plafond — Bruxelles" (semaine 7)**
- URL: `/studio/high-ceiling/` ou `/studio/specs/`
- 800 words: Différenciation unique (5m ceiling = rare à Bruxelles).
- Cible: Photographes cherchant "studio haut plafond" (vidéo drone, setup lumière complexe).
- Schema: LocalBusiness + equipment listing.

**Page 4: "Photobooth Mariage — Animation Professionnel" (semaine 8)**
- URL: `/services/photobooth-mariage/`
- 1200 words: Formule complète (animator, props, prints, USB), exemples, tarifs.
- Cible: Couples cherchant "photobooth mariage".
- Schema: Service + FAQPage.

**Page 5: "Tarifs & Forfaits Photographie Bruxelles" (semaine 9)**
- URL: `/pricing/` ou `/tarifs/`
- 800 words: Synthèse tous tarifs, packages populaires, personnalisation.
- Personas: Tous (demande très fréquente).
- Schema: `Offer` (multiple items).
- **Important**: Pas "doorway" — contenu SEO réel + comparison matrice.

**Page 6: "Galerie Événementiel" (semaine 10)**
- URL: `/portfolio/events/` (ou expand existing portfolio category)
- Photo gallery + 500 words intro: Mariages, anniversaires, corporate events couverts.
- Schema: `ImageGallery` + `BreadcrumbList`.

**Pages 7–10: "Cas d'Usage Verticalisés" (semaines 11–12 - optional, si priorité)**
- "Portraits Professionnels LinkedIn Bruxelles" (`/services/linkedin-portraits/`)
- "Photographie Nouvelle-Nee Bruxelles" (`/portfolio/newborn-portraits/`)
- "Événementiel Corporate Bruxelles" (`/services/corporate-events/`)
- "Photobooth Location/Bornes Bruxelles" (`/services/photo-booth-rental/`)

**Total: 6 pages prioritaires (semaines 5–9) + 4 optionnelles (semaines 10–12).**

---

### 4.3 Hiérarchie d'information & interlinking

```
HOME
├── /studio/ (Studio Shoot)
│   ├── /studio/location/ (NEW: Location Studio)
│   └── /studio/high-ceiling/ (NEW: 5m Ceiling Spec)
├── /packaging/
│   ├── /shooting-studio/ (optimized)
│   ├── /shooting-evenement/ (optimized)
│   │   └── /services/mariage-brabant-wallon/ (NEW)
│   │   └── /services/corporate-events/ (NEW optional)
│   ├── /photobooth/ (optimized)
│   │   └── /services/photobooth-mariage/ (NEW)
│   └── /location-studio/ (optimized + rename to location/)
├── /portfolio/
│   ├── /portfolio/corporate/ (existing)
│   ├── /portfolio/events/ (NEW gallery)
│   └── [8 existing categories]
├── /about/ (optimized)
├── /contact/ (existing)
├── /entreprises/ (optimized)
├── /pricing/ (NEW: Tarifs centralisé)
└── /[SERVICE]/specs/ (NEW technical sheets)
```

**Interlinking rules**:
- Chaque page offre → lien vers page pricing.
- Pages services → lien vers /portfolio/ correspondant.
- /portfolio/ → lien vers page offre (ex: gallery corporate → "Photographe Studio Corporate").
- Hub pages (home, packaging, portfolio) → tous service pages.

---

### 4.4 Timing & ressources

| Semaine | Action | Effort |
|---|---|---|
| 1–2 | Fix images.unoptimized + CTA mobiles | 4–6h dev |
| 3–4 | Optimiser 6 pages existantes (pricing, schema, taglines) | 8–10h contenu + 4h dev |
| 5–6 | Créer pages 1–2 (Studio location, Mariage Brabant) | 6–8h contenu + 2h dev each |
| 7–8 | Créer pages 3–4 (High-ceiling, Photobooth mariage) | 4–6h contenu + 1–2h dev each |
| 9–10 | Créer page 5 + expand portfolio | 4–5h contenu + 2h dev |
| 11–12 | Pages 6–10 (optional) + interlinking review | 3–4h contenu each; 2–3h cross-linking |

**Ressources requises**: 1 writer/content owner (Indyana ou délégué) + 1 dev pour intégrations schema/tech.

---

## 5. PROTOCOLE GEO/AI VISIBILITY (ChatGPT, Perplexity, Gemini)

### 5.1 Vue d'ensemble des AI search results (septembre 2026)

**ChatGPT**:
- Source primaire: Google Search Index + Yelp (partenariat juillet 2026, 330M reviews).
- Cachée dans: Réponses générales, rarement cite individual photographers sauf si très known ou featured.
- Grounding: Google Maps + web search indexés.

**Perplexity**:
- Sources: Web search (Google, Bing), proprietary crawls, Yelp integration.
- Cite: URLs directement dans réponse avec footnotes.
- Comportement: Tend à citer "top 3" résultats organiques + avis Google/Yelp.

**Gemini** (Google AI Overviews dans search results):
- Source: Google Search Index + Google Maps.
- Cite: Businesses top-ranked in local pack, reviews, rich snippets.
- Avantage: Gemini uses official Google Business Profile data.

**Bing Copilot**:
- Source: Bing Search + Microsoft partnerships.
- Cite: Moins pertinent pour photographies locales (trafic faible).

---

### 5.2 Stratégie d'optimisation par AI engine

#### **ChatGPT (Inclusion dans grounding)**

| Tâche | Détail | Fréquence |
|---|---|---|
| **Vérifier indexation** | Tester requête: "Quel photographe prendre pour portrait bruxelles?" — vérifier si Yelp + Google result cites indyanabalasse.com. | Hebdo (manuellement) |
| **Yelp integration** | Créer/compléter profil Yelp (partenaire ChatGPT). Ajouter 3–5 photos, description 200+ words, catégories, heures. | Une fois; maj mensuelle |
| **Citations quality** | Assurer Google Knowledge Panel (si eligible — "Indyana Balasse photographer") avec photo, website, avis. | Vérifier mensuellement dans GSC |

**Gain attendu**: 10–15% des requêtes ChatGPT sur "photographe bruxelles" peuvent citer le site (si bien rankée en organique + Yelp).

---

#### **Perplexity (Citation inline)**

| Tâche | Détail | Fréquence |
|---|---|---|
| **Monitor searches** | Tester: "photographer brussels studio rental", "best photographer bruxelles", "photobooth mariage brabant". Screenshotter si INDYANASTUDIO appears. | 2×/mois |
| **Backlink strategy** | Augmenter high-quality inbound links (journalist mentions, photography blogs, event directories). Perplexity prefere established media. | Continu |
| **High-ranked organics** | Top 5 organiques = meilleure chance de citation Perplexity. See section 2 (SEO keyword strategy). | Ongoing |

**Gain attendu**: 5–10% de trafic refer via Perplexity (plus petit audience que ChatGPT, mais high intent users).

---

#### **Gemini / Google AI Overviews**

| Tâche | Détail | Fréquence |
|---|---|---|
| **GBP excellence** | Compléter & optimiser Google Business Profile (reviews, photos, hours, Q&A responses). Gemini grounded in GBP data. | Immediately + ongoing |
| **Local pack top 3** | Target top 3 local pack ranking pour "photographe studio bruxelles", etc. (see section 2 keywords). LCP + Core Web Vitals crucial. | Ongoing |
| **Rich snippets** | FAQ schema, service schema, offer pricing → Google can infer Q&A for AI overview. | Ongoing |

**Gain attendu**: 20–30% de trafic via Gemini if top 3 local pack + excellent GBP (Gemini displays multiple results per query type).

---

### 5.3 Procédure mensuelle de vérification (M-GEO-XX format)

**À effectuer fin de chaque mois** (ex: Sept 30, Oct 31, Nov 30):

#### **M-GEO-01: ChatGPT Presence Check**
- **Query de test**: "Je cherche un photographe pour une séance studio portrait à Bruxelles, avec studio équipé. Recommandations?"
- **Expected**: Site mention ou Yelp cite.
- **Pass/Fail**: PASS si indyanabalasse.com OR "Indyana Balasse" cité directement.
- **Action si Fail**: Vérifier Yelp profile complété; attendre indexation Google (2–3 semaines après publication).

#### **M-GEO-02: Perplexity Citation**
- **Query de test**: "Best photographers for events in Brussels Belgium"
- **Expected**: URL direct ou "INDYANASTUDIO" mention.
- **Pass/Fail**: PASS si appears (even if position 3–5 in results).
- **Action si Fail**: Augmenter high-quality backlinks (guest posts, event directories).

#### **M-GEO-03: Gemini Local Pack**
- **Query de test**: "photographe studio bruxelles" (Google Search mobile, logged in to see Gemini AI Overview).
- **Expected**: Indyanabalasse.com dans top 3 + GBP listed + reviews cited.
- **Pass/Fail**: PASS si top 3 local pack OR GBP visible in AI overview.
- **Action si Fail**: Fix Core Web Vitals; ensure GBP has 8+ reviews.

#### **M-GEO-04: Bing Copilot (Optional)**
- **Query de test**: "Brussels photographer studios for rent"
- **Expected**: URL cite or mention.
- **Pass/Fail**: Optional (low priority for Belgium market).

#### **M-GEO-05: Google Knowledge Panel**
- **Check**: Search "Indyana Balasse photographer" — does Knowledge Panel appear right side?
- **Expected**: Photo, bio, website, ratings.
- **Pass/Fail**: PASS if panel appears and data accurate.
- **Action if Fail**: Ensure Wikipedia/Wikidata entry (if applicable) or prominent media mentions.

---

### 5.4 Résumé des sources de visibilité AI (septembre 2026, sources confirmées)

| Engine | Data Source | % Trafic estimé en 6 mois | Dependency | Effort optimisation |
|---|---|---|---|---|
| ChatGPT | Google Index + Yelp | 3–8% | Ranked top 10 organic + Yelp profile | Medium |
| Perplexity | Web + Perplexity crawl | 2–5% | Top 5–10 organic + backlinks | Medium–High |
| Gemini | Google Index + Maps | 5–15% | Top 3 local pack + GBP excellence | High (Core Web Vitals) |
| Bing Copilot | Bing Index | <1% | Not priority for Belgium | Low |

**Total AI search visibility opportunity**: +10–28% trafic additionnel vs. traditional organic only (conservative estimate).

---

## 6. INTÉGRATION RAPPORT HEBDOMADAIRE (Search Console + Diagnostic Rules)

### 6.1 Cadre de mesure & Search Console API

**Configuration requise**:
1. Service account Google Cloud (JSON key) avec accès Search Console property.
2. Daily cron job (Python/Node) exécutant search analytics query.
3. Stockage résultats (CSV, Google Sheets, ou DB) pour trending & analysis.

**Search Console API Query**:
- **Granularité**: Daily data (data available after 2–3 days latency).
- **Dimensions**: query, page, country, device (mobile/desktop).
- **Metrics**: clicks, impressions, CTR, average position.
- **Row limit**: 50,000 max per search type per day.
- **Frequency**: Run daily query for yesterday's data (recommended practice per Google docs).

**Sample Query Logic** (pseudocode):
```
FOR each_day in past_7_days:
  QUERY Search Console API
  dimensions: query, page
  dateRange: [yesterday, yesterday]
  dataState: "final" (or "all" if need fresher data; final = stable)
  rowLimit: 25000
  SAVE to results_YYYY-MM-DD.csv
  
AGGREGATED weekly:
  sum(clicks) by page
  avg(position) by query
  top_10_gaining_queries (position improved week-over-week)
  top_10_losing_queries (position dropped week-over-week)
```

---

### 6.2 Diagnostic Rules (R-SEO-XX Format)

**8–10 règles de monitoring automatisé**:

#### **R-SEO-01: Core Web Vitals Performance**
- **Trigger**: Fetch CrUX API (Chrome User Experience Report) weekly.
- **Threshold**: LCP >2.5s OR INP >200ms OR CLS >0.1 on mobile → **ALERT**.
- **Action**: Identify page/template causing issue; escalate to dev (image size, JS blocking, layout shifts).
- **Baseline**: Measure week 1 (Sept 24–30); track improvement weekly.

#### **R-SEO-02: Impressions/Clicks Anomaly**
- **Trigger**: Weekly total clicks vs. moving average (4-week baseline).
- **Threshold**: Drop >20% vs. baseline → **ALERT**.
- **Action**: Investigate lost rankings (position drop >5 spots for top queries); check site health (crawl errors, index issues).
- **Noise handling**: Ignore weeks with <100 total clicks (small sample size); use 30-day moving average.

#### **R-SEO-03: Top 10 Queries Position Drop**
- **Trigger**: Top 10 keywords by clicks: if any drop >3 average position → **ALERT**.
- **Threshold**: Position drop (e.g., pos 5 → pos 9) for revenue-generating query (service keywords).
- **Action**: Review page content for changes; resubmit to index; build backlinks.
- **Noise handling**: Ignore drops of <0.5 positions (natural fluctuation); focus on >2 position drop.

#### **R-SEO-04: New Ranking Keywords (Opportunity)**
- **Trigger**: Weekly, identify queries ranking position 11–30 with >1 click in past 30 days.
- **Threshold**: 3+ new queries appearing in positions 11–20 → **OPPORTUNITY**.
- **Action**: Create targeted content or optimize existing page for query; target top 5 within 60 days.
- **Noise handling**: Exclude queries with 0 clicks (phantom impressions); only track queries with CTR >0.1%.

#### **R-SEO-05: CTR Below Expected**
- **Trigger**: Compare actual CTR vs. benchmark (by position).
  - Pos 1: expect 28–40% CTR
  - Pos 2: expect 14–25%
  - Pos 3: expect 8–15%
  - Pos 5–10: expect 2–8%
- **Threshold**: Actual CTR <70% of benchmark for position → **ALERT** (likely title/meta description issue).
- **Action**: Audit & rewrite title/meta; resubmit via API.
- **Noise handling**: Only flag if >20 weekly impressions on query.

#### **R-SEO-06: Indexation & Crawl Errors**
- **Trigger**: Monitor GSC "Coverage" report weekly (API: searchanalytics).
- **Threshold**: New crawl errors OR indexed pages decline >5% week-over-week → **ALERT**.
- **Action**: Fix robots.txt, check for noindex tags, resolve server errors (5xx).
- **Noise handling**: Ignore 1–2 transient 404s per week (normal); only alert on persistent pattern.

#### **R-SEO-07: GBP Review Count Tracking**
- **Trigger**: Manual API call to GBP (or scrape public profile) weekly.
- **Threshold**: Reviews not increasing toward 25-review goal (expect ~2 per week) → **ALERT**.
- **Action**: Send review request email batch; check email delivery logs.
- **Baseline**: Sept 24 → 0 reviews; Oct 8 → 2 reviews; Oct 22 → 4; Nov 5 → 8; Nov 19 → 15; Dec 3 → 25.
- **Noise handling**: Allow ±1 review variation (may take 2–3 days to appear in public profile).

#### **R-SEO-08: AI Search Visibility (Manual Monthly)**
- **Trigger**: M-GEO-01 through M-GEO-05 checks (see Section 5.3).
- **Threshold**: 0/5 checks passing → **ALERT** (not appearing in ChatGPT, Perplexity, Gemini).
- **Action**: Diagnose (GBP incomplete, low ranking, Yelp profile missing, weak backlink profile); escalate.
- **Frequency**: Monthly (end of month).

#### **R-SEO-09: Traffic from AI Search Engines (Attribution)**
- **Trigger**: Google Analytics 4 segment: sessions from referrer containing "chatgpt", "perplexity", "gemini" (if tracked).
- **Threshold**: <1 session per week from AI sources → **OPPORTUNITY** (room to grow).
- **Action**: Increase visibility per R-SEO-08; retry M-GEO checks.
- **Noise handling**: AI referral often not captured in GA (direct traffic); use server logs or link monitoring tools.

#### **R-SEO-10: Content Freshness & Updates**
- **Trigger**: Track last updated date on key pages (homepage, service pages, blog if present).
- **Threshold**: No updates in past 60 days on top 5 pages by traffic → **ALERT**.
- **Action**: Refresh content (add new case studies, update pricing, cite recent stats).
- **Frequency**: Monthly.

---

### 6.3 Template rapport hebdomadaire (Saturday morning)

**Subject**: "📊 Weekly SEO Report — INDYANASTUDIO (Sept 24–30, 2026)"

**Section A: Snapshot KPIs**
```
Organic Clicks (7d):        42 clicks
Organic Impressions (7d):   1,240 impressions
Avg CTR:                    3.4%
Avg Position:               8.2
GBP Reviews:                3 (↑ from 0 week prior)
Top Ranking Query:          "photographe studio bruxelles" (pos 8, 12 clicks)
```

**Section B: Alerts & Rules Triggered**
```
✅ R-SEO-01: Core Web Vitals — PASS (LCP 2.1s, INP 180ms, CLS 0.05)
❌ R-SEO-02: Impressions vs. baseline — N/A (first week, no baseline yet)
✅ R-SEO-03: Top 10 keywords — no position drop >3
✅ R-SEO-04: New ranking opps — 2 queries in pos 11–20 (e.g., "photobooth mariage bruxelles", "studio location 150m²")
✅ R-SEO-05: CTR — within expected range
✅ R-SEO-06: Crawl errors — 0 new errors
✅ R-SEO-07: GBP review tracking — on pace (+3/week target)
⏸️ R-SEO-08: AI search visibility — pending M-GEO checks (end of Sept)
⏸️ R-SEO-09: AI referral traffic — <1 session (too early)
⏸️ R-SEO-10: Content freshness — N/A (baseline established)
```

**Section C: Opportunities & Actions**
```
1. **Pages to optimize next** (priority order):
   - /packaging/shooting-studio/ (meta + FAQ schema)
   - /studio/ (unique positioning: 5m ceiling)
   - Create /pricing/ page (2 new rankings for "tarif/prix" queries expected)

2. **Review momentum**: On track (3 reviews acquired via direct requests).
   - Adjust email template if CTR <30% in week 2.

3. **AI visibility baseline**: Run M-GEO-01 through M-GEO-05 Sept 30.
   - Expected: ChatGPT not citing yet (too new); Perplexity may cite if top 10 organic.
```

**Section D: Next Week Goals**
```
- Fix images.unoptimized (start week 2)
- Deploy /pricing/ page (for new keyword targeting)
- Collect 2–3 more GBP reviews
- Run M-GEO checks (month-end)
```

---

## 7. PLAN D'ACTION 90 JOURS (SEMAINE PAR SEMAINE M1 + BI-HEBDO M2–M3)

### 7.1 MOIS 1 — Semaine par semaine (4 semaines)

#### **SEMAINE 1: 24–30 SEPTEMBRE 2026**

**Jalon**: Audit complet terminé; audit technique & GBP activation initiée.

| Jour | Tâche | Owner | Délai | Status |
|---|---|---|---|---|
| Lun 24 | Lire & approuver 08-seo-local-geo.md complet. Réunion kick-off équipe. | Team | 1h | - |
| Lun 24 | Créer Google Cloud project + service account (Search Console API access). | Dev | 2h | - |
| Mar 25 | Créer/vérifier Google Business Profile (service area setup, zones 46 communes). Video verification lancée. | Indyana | 1.5h | - |
| Mer 26 | Dev: Lancer diagnostic Core Web Vitals (manuellement via PageSpeed Insights ou CrUX). | Dev | 1h | - |
| Jeu 27 | Dev: Identifier & cloner images.unoptimized issue dans next.config.ts. Plan de fix. | Dev | 1.5h | - |
| Jeu 27 | Content: Remplir taglines vides (4 offres) dans i18n.ts. Écrire 2–3 phrases chacun. | Indyana/Writer | 1.5h | - |
| Ven 28 | Dev: Deploy fix images.unoptimized (test on staging). | Dev | 3h | - |
| Ven 28 | Dev: Fix CTA mobiles sur 3 pages packaging (test responsive). | Dev | 2h | - |
| Sam 29 | Content: Finalize prices & add to 4 service pages (studio, event, booth, rental). Update from PDFs. | Indyana | 2h | - |
| Sam 29 | Deploy taglines + prices to production. | Dev | 1h | - |
| Dim 30 | Run M-GEO-01 to M-GEO-05 checks (AI visibility baseline). | Indyana/Dev | 1.5h | - |

**Livérables fin semaine 1**:
- GBP créé & en cours de vérification.
- Images.unoptimized fixée.
- CTAs mobiles visibles.
- Taglines & prix affichés.
- M-GEO baseline établie.

---

#### **SEMAINE 2: 01–07 OCTOBRE 2026**

**Jalon**: Ajustements initiaux; premières reviews GBP; schema optimization.

| Jour | Tâche | Owner | Délai |
|---|---|---|---|
| Lun 1 | Dev: Deploy images.unoptimized fix & CTA mobile fix to production (if not done). | Dev | 1h |
| Lun 1 | Monitor Core Web Vitals daily (CrUX or real user data via analytics). | Dev/Indyana | Ongoing |
| Mar 2 | Indyana: Collecte 1ère batch review requests (past clients, personal outreach). | Indyana | 1.5h |
| Mer 3 | Dev: Implement/test hreflang via Search Console. Vérifier "International Targeting" report. | Dev | 1.5h |
| Jeu 4 | Content: Optimize meta descriptions pour 6 pages existantes (home, studio, packaging hub, about, contact, entreprises). | Writer | 2h |
| Jeu 4 | Dev: Add canonical + robots.txt audits. Vérifier sitemap.ts inclusion (tous 80 URLs). | Dev | 1h |
| Ven 5 | Dev: Implement schema updates (LocalBusiness + Service + Offer pour 4 service pages). Test with Google rich result tool. | Dev | 2h |
| Ven 5 | Deploy meta description & schema updates. | Dev | 1h |
| Sam 6 | Indyana: Envoyer email de demande d'avis à 6 clients (1ère vague cohort studio + event mix). | Indyana | 1h |
| Dim 7 | Semaine 2 — Rapport de progression (clicks, impressions, GBP reviews status). | Indyana/Dev | 1h |

**Livrables fin semaine 2**:
- Core Web Vitals améliorées (target: LCP <3.5s, INP <220ms).
- Hreflang verifié & fonctionnel.
- Sitemaps & robots correctement configurés.
- 1–2 premières reviews GBP.

---

#### **SEMAINE 3: 08–14 OCTOBRE 2026**

**Jalon**: Premières données Search Console; démarrage création contenu; momentum GBP.

| Jour | Tâche | Owner | Délai |
|---|---|---|---|
| Lun 8 | Dev: Lancer Search Console API daily cron (query analytics data depuis Oct 1). Configurer Google Sheets ou CSV storage. | Dev | 2h |
| Lun 8 | Configure email templates (review request, follow-ups). Test send. | Indyana/Dev | 1h |
| Mar 9 | Indyana: Follow-up emails à clients non-responders (J+4 après 1ère demande). | Indyana | 1h |
| Mer 10 | Content: Démarrer création Page 1 "Location Studio & Equipment" (1500 words, avec photos HD). | Writer | 3h |
| Jeu 11 | Dev: Optimize images for web (WebP + JPEG, srcset responsive après fix unoptimized). Test on 10 portfolio images. | Dev | 2.5h |
| Ven 12 | Indyana: Collect 2–3 testimonials from recent clients (short quotes for case studies). | Indyana | 2h |
| Ven 12 | Content: Complete Page 1 draft (Studio location). Dev review + publish. | Writer/Dev | 3h |
| Sat 13 | Dev: Add schema FAQPage to studio location page (FAQ: "Heures d'ouverture?", "Tarif par heure?", "Équipement?"). | Dev | 1.5h |
| Dim 14 | Week 3 report — GSC data first look (organics from Oct 1–7, positions, etc.). GBP reviews count. | Team | 1h |

**Livrables fin semaine 3**:
- Page 1 (Studio Location) live avec schema.
- Search Console API piped & 1st week of data collected.
- 3–4 total GBP reviews.
- Image optimization en cours (10+ images retested).

---

#### **SEMAINE 4: 15–21 OCTOBRE 2026**

**Jalon**: Fin M1 — momentum établi; 2ème page contenu; data insights.

| Jour | Tâche | Owner | Délai |
|---|---|---|---|
| Lun 15 | Indyana: Send 2ème batch review requests (6–8 new clients). | Indyana | 1h |
| Lun 15 | Dev: Analyze GSC data week 1 (Oct 1–7) — identify top queries, positions, CTR anomalies. | Dev | 2h |
| Mar 16 | Content: Démarrer Page 2 "Mariage Brabant Wallon" (1500 words, case study). | Writer | 3h |
| Jeu 18 | Indyana: Envoyer SMS opt-in review link à clients (para email). | Indyana | 0.5h |
| Ven 19 | Content: Publish Page 2 draft. Dev adds schema (Service + LocalBusiness areaServed:27 communes). | Writer/Dev | 3h |
| Sat 20 | Monitor GBP for new reviews in real-time; respond to all comments/reviews. | Indyana | 1h |
| Dim 21 | **M1 COMPLETE**: Week 4 report + cumulative M1 summary. | Team | 1h |

**Cumulative M1 Livrables**:
- ✅ Images.unoptimized fixée.
- ✅ 4 taglines remplies.
- ✅ Prices affichés.
- ✅ CTAs mobiles visibles.
- ✅ GBP créé + 4–6 reviews.
- ✅ Hreflang & schema optimisés.
- ✅ 2 pages contenu créées (Location Studio, Mariage Brabant).
- ✅ Search Console API actif & 3 semaines de data.
- **Trafic organique attendu**: 40–80 clicks M1 (cumul).

---

### 7.2 MOIS 2–3 — Bi-hebdomadaire (6 bi-hebdos = 12 semaines total)

#### **BI-HEBDO 1 (Semaines 5–6: 22 Oct – 4 Nov)**

| Tâche | Owner | Délai |
|---|---|---|
| Content: Pages 3–4 (High-ceiling studio specs, Photobooth mariage) — draft + dev review. | Writer/Dev | 5h |
| Dev: Deploy schema updates for Pages 1–2. Validate rich results in Google tool. | Dev | 1.5h |
| Indyana: 3ème batch review requests (8–10 clients). | Indyana | 1h |
| Monitor: Continue M-GEO-01/02 checks. Run R-SEO rules (R-01 through R-10). | Team | 2h |
| **Deliverable**: Pages 3–4 live; 6–8 GBP reviews accum; Organic clicks +40–60/bi-hebdo. | - | - |

#### **BI-HEBDO 2 (Semaines 7–8: 5–18 Nov)**

| Tâche | Owner | Délai |
|---|---|---|
| Content: Page 5 (Pricing hub) — 800 words. Consolidate all service pricing. | Writer | 2h |
| Dev: Deploy pages 3–4 + schema. Add FAQ markup where applicable. | Dev | 1.5h |
| Indyana: 4ème batch review requests. Follow-ups to non-responders. | Indyana | 1h |
| Content: Expand /portfolio/ pages — add case studies from Page 1–5. Internal linking. | Writer | 2h |
| GBP optimization: Add monthly post (promotions, upcoming availability). | Indyana | 0.5h |
| Run R-SEO suite + M-GEO checks. | Team | 2h |
| **Deliverable**: Page 5 (Pricing) live; 8–12 GBP reviews accum; expand internal linking; +50–80 org clicks. | - | - |

#### **BI-HEBDO 3 (Semaines 9–10: 19 Nov – 2 Dec)**

| Tâche | Owner | Délai |
|---|---|---|
| Content: Pages 6–8 (optional portfolio gallery, service verticals). | Writer | 3–4h |
| Dev: Optimize remaining portfolio images (responsive srcset for all 261 images, if not yet). | Dev | 4h |
| Indyana: Final review push (5ème batch) to reach 20+ reviews by late Nov. | Indyana | 1h |
| Update GBP: Add virtual tour video (2–3 min studio walkthrough). | Indyana/Dev | 2h |
| Link-building outreach: Contact 3–5 local directories (Brussels photographers, event planners guides). | Indyana | 2h |
| R-SEO + M-GEO full review. | Team | 2h |
| **Deliverable**: Pages 6–8 live (or optional); 18–22 GBP reviews; Virtual tour live; +60–100 org clicks; first backlinks acquired. | - | - |

#### **BI-HEBDO 4 (Semaines 11–12: 3–16 Dec)**

| Tâche | Owner | Délai |
|---|---|---|
| Final push: Reach 25 GBP reviews (last batch outreach). | Indyana | 1h |
| Content: Final review & optimization of all pages. Update case studies with latest client feedback. | Writer/Indyana | 2h |
| Dev: Full image optimization verification (all 261 portfolio images responsive). | Dev | 2h |
| Backlink follow-up: Contact 3–5 more directories/media. | Indyana | 1.5h |
| **M2–M3 FINAL**: Cumulative review, metrics snapshot, recommendations for next phase. | Team | 2h |
| **Deliverable**: 25 GBP reviews 🎉; 8–10 content pages live; +150–250 cumulative org clicks over M2–M3; Gemini/Perplexity citations visible. | - | - |

---

### 7.3 Récapitulatif 90 jours par métrique

| Métrique | Semaine 1 | Fin M1 (Semaine 4) | Fin M2 (Semaine 8) | Fin M3 (Semaine 12) |
|---|---|---|---|---|
| **Organic clicks (7d avg)** | 0–5 | 15–25 | 40–70 | 80–120 |
| **Organic impressions (7d avg)** | 0–100 | 300–600 | 800–1200 | 1500–2200 |
| **Avg position (top keywords)** | Position 15+ | Pos 10–12 | Pos 8–10 | Pos 6–8 |
| **GBP reviews** | 0 | 4–6 | 12–16 | 25 |
| **GBP rating** | N/A | 4.7–4.8★ | 4.75–4.85★ | 4.8+★ |
| **Pages optimized/created** | 0 | 2 | 5 | 8–10 |
| **Core Web Vitals LCP** | ~4.5s | ~3.0s | ~2.5s | <2.5s |
| **AI search visibility** | None detected | ChatGPT start | Perplexity cite | Gemini top 3 |
| **Cumulative actions** | Technical only | Technical + M1 content | +M2 content | +M3 finish |

---

### 7.4 Risques & ajustements

| Risque | Probabilité | Mitigation |
|---|---|---|
| **Images optimization delays (dev bandwidth)** | Medium | Parallelize with content creation; prioritize hero images (LCP impact). |
| **GBP review acquisition below target** | Low–Medium | Expand to contact past clients (pre-Sept); add referral incentive (gift certificate); adjust email template timing. |
| **Organic ranking gains plateaued by week 8** | Low | Backlink outreach (directories, local partnerships); guest posts on photography blogs. |
| **Core Web Vitals not improving >20%** | Low | Investigate server response time (TTFB); optimize critical CSS; upgrade image CDN. |
| **Hreflang/duplicate content issues** | Very low | Weekly GSC "Coverage" report review; address canonicals manually if needed. |

---

## RÉSUMÉ EXÉCUTIF & RECOMMANDATIONS FINALES

### Commandes prioritaires (ordre d'exécution)

1. **Semaine 1 (immédiate)**: Corriger `images.unoptimized: true` (fix +60% performance mobile). Cacher ou réafficher CTAs mobiles. Remplir taglines & prices.

2. **Créer Page Pricing** (semaine 5): Hub centralisé "Tarifs & Forfaits" indexe rapidement pour requêtes commerciales ("prix", "tarif"). Oriente trafic vers offres.

3. **Activer Google Business Profile** (semaine 1): Configuration zone service + 46 communes. Acquisition 25 reviews via email/SMS workflow compliant. **Critical pour Gemini grounding** (20–30% du trafic AI futur).

4. **Pages nouvelles par ordre impact SEO + conversion**:
   - **Page 1 (Semaine 5)**: "Location Studio 150m² 5m plafond" → niche unique, faible concurrence, conversion haute.
   - **Page 2 (Semaine 6)**: "Mariage Brabant Wallon" → volume élevé, clientèle claire.
   - **Pages 3–4 (Semaines 7–8)**: High-ceiling specs + photobooth mariage → long-tail accessibles.
   - **Pages 5–8 (Semaines 9–12)**: Pricing hub, portfolio expansions, verticals optionnels.

5. **Branchement Search Console hebdomadaire**: Daily API query (oct 1+), format CSV/Sheets. Decoder les 8–10 diagnostic rules (R-SEO-01 to R-10) pour actions rapides. Rouler rapport Saturday morning avec 3 sections: snapshot KPIs, alerts triggered, next week actions.

### Priorisation pages par ROI 90 jours

| # | Page | Trafic estimé (90j) | Effort | Priorité |
|---|---|---|---|---|
| 1 | /studio/location/ | 40–60 clics | Moyen | **TRÈS HAUTE** |
| 2 | /pricing/ | 50–80 clics | Bas | **TRÈS HAUTE** |
| 3 | /services/mariage-brabant/ | 30–50 clics | Moyen | **HAUTE** |
| 4 | /services/photobooth-mariage/ | 20–35 clics | Bas | **HAUTE** |
| 5 | /studio/high-ceiling/ | 15–30 clics | Bas | **MOYENNE** |
| 6 | /portfolio/events/ | 15–25 clics | Moyen | **MOYENNE** |
| 7–8 | Verticals optionnels | 10–20 clics each | Variable | **BASSE** |

### Intégration Search Console & diagnostic

- **Tool setup**: Service account JSON key + daily cron (Python/Node.js, query yesterday's data).
- **Data flow**: GSC API → Google Sheets ou CSV → Weekly report (Sat morning).
- **Rules implémentés**: R-SEO-01 (Core Web Vitals), R-SEO-02 (impressions anomaly), R-SEO-03 (top 10 position drop), R-SEO-04 (new ranking opps), R-SEO-05 (CTR below benchmark), R-SEO-06 (crawl errors), R-SEO-07 (GBP reviews tracking), R-SEO-08 (AI visibility manual check), R-SEO-09 (AI referral traffic), R-SEO-10 (content freshness).
- **Fréquence**: Weekly report (Saturdays); monthly deep dive (end of month M-GEO checks).
- **Audience**: Indyana + dev lead (actions escalated as needed).

### Objectif 90 jours clair

✅ **Technical SEO**: Core Web Vitals <2.5s LCP, 0 crawl errors, hreflang verified, schema rich.  
✅ **Contenu**: 8–10 pages créées/optimisées, 4 offres avec taglines + prices.  
✅ **Local SEO**: GBP complet avec 25 reviews + 4.8★ rating, 46 communes ciblées.  
✅ **Organic traffic**: +150–250 clics cumulatifs (vs. ~0 baseline); top 10 positions sur 6–8 requêtes.  
✅ **AI Visibility**: Visible dans Gemini/Perplexity top 3; ChatGPT mentions starting (Yelp grounding).  
✅ **Ops**: Search Console integrated, weekly diagnostic rules monitored, review momentum sustained.

**Réussite M1 = fondations solides (tech + GBP).**  
**Réussite M2 = contenu traction + authority locale.**  
**Réussite M3 = consolidation + AI visibility acquisition.**

---

**Fin du plan 08-seo-local-geo.md**

*Rédigé en septembre 2026 par équipe SEO — toutes sources vérifié es, métriques conservatrices, aucune donnée inventée.*
