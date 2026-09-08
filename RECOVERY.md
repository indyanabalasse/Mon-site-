# RECOVERY.md — Playbook « ça a foiré »

Ce fichier est versionné : même si le dossier local est perdu, il reste
lisible sur GitHub. Il répond à trois questions, dans cet ordre :
**où en est-on ? qu'est-ce qui est perdu ? comment reprendre ?**

---

## 0. Réflexe immédiat — l'état en 30 secondes

```bash
cd "$HOME/Documents/Mon site" && git fetch origin --prune -q && git status -sb && git log --oneline -5
```

Lecture du résultat :

| Ce que vous voyez | Ce que ça veut dire |
|---|---|
| `## main...origin/main` seul | Tout est poussé. **Rien à sauver.** |
| `[ahead N]` | N commits locaux pas encore sur GitHub. |
| `[behind N]` | GitHub a des commits pas encore en local. |
| Des lignes `M` / `??` | Du travail non commité — **c'est ça qui est fragile**. |

---

## 1. Les trois couches où vit le travail

De la plus fragile à la plus sûre. En cas de doute, faites toujours remonter
le travail vers le bas du tableau.

| Couche | Où | Risque |
|---|---|---|
| Fichiers modifiés non commités | disque, dans iCloud | **Élevé** — rien ne le protège |
| Commits locaux non poussés | `.git/`, dans iCloud | Moyen — iCloud peut corrompre `.git` |
| Commits poussés | GitHub `indyanabalasse/Mon-site-` | **Sûr** — référence de vérité |

---

## 2. Rien n'est jamais vraiment perdu — les 5 endroits où chercher

Dans cet ordre :

**1. Les sauvegardes automatiques hors iCloud**
```bash
ls -lt "$HOME/backups/mon-site/" | head
```
Chaque dossier horodaté contient `travail-non-commite.tar.gz`,
`modifications.patch` (relisible tel quel) et `liste-fichiers.txt`.
Restaurer : `tar -xzf .../travail-non-commite.tar.gz -C "$HOME/Documents/Mon site"`

**2. Le reflog — récupère un commit « disparu »** (après un `reset`, un
`rebase` raté, une branche supprimée). Git garde tout 90 jours.
```bash
git reflog --date=iso | head -30
git checkout -b sauvetage <sha-retrouvé>
```

**3. Les objets orphelins — récupère un commit sans référence**
```bash
git fsck --lost-found
git show <sha>   # pour identifier avant de restaurer
```

**4. GitHub** — le dépôt distant a toujours l'historique jusqu'au dernier push :
```bash
git clone https://github.com/indyanabalasse/Mon-site-.git /tmp/verif
```

**5. L'historique de versions iCloud / Time Machine** — dernier recours pour
un fichier jamais commité. Clic droit sur le fichier → « Rétablir la version
précédente », ou entrer dans Time Machine.

---

## 3. Dégâts spécifiques à iCloud

Le projet est dans `~/Documents`, synchronisé par iCloud. Quand iCloud écrit
un fichier au moment où git l'écrit aussi, il crée une **copie de conflit**
suffixée ` 2`, ` 3`… — y compris **à l'intérieur de `.git`**.

### Symptôme : `warning: ignoring ref with broken name`
Une référence dupliquée traîne dans `.git/refs/`.
```bash
find .git -name "* [0-9]" -o -name "* [0-9].*"   # les repérer
git fetch origin --prune                          # nettoie les refs distantes cassées
git fsck --no-progress | grep -v dangling         # doit ne rien renvoyer
```

### Symptôme : fichiers `.git/index 2`, `index 3`…
Copies de conflit de l'index. **Inoffensives mais à ne jamais renommer en
`index`** — elles écraseraient l'index courant. À déplacer, pas à supprimer
à l'aveugle :
```bash
mkdir -p "$HOME/backups/mon-site/residus" && mv ".git/index "[0-9] "$HOME/backups/mon-site/residus/"
```

### Symptôme : « fichier introuvable » ou fichier vide
iCloud a déchargé le fichier ; il ne reste qu'un placeholder.
```bash
find . -name "*.icloud" -not -path "./node_modules/*"   # les repérer
brctl download "$HOME/Documents/Mon site"               # tout re-télécharger
```

### Symptôme : `Mariage 2`, `page 2.tsx`… dans le code
Vérifier le contenu **avant** de supprimer : certains noms sont légitimes
(`src/images/portfolio/fun-photo-booth/Mariage 1` et `Mariage 2` sont deux
vraies séries photo, pas des doublons).

### Cause racine
`.next` (~2 Go) et `node_modules` (~500 Mo) sont synchronisés pour rien et
génèrent des milliers d'écritures qui entrent en collision avec git.
**Correctif durable : sortir le projet d'iCloud.**
```bash
mkdir -p "$HOME/code" && mv "$HOME/Documents/Mon site" "$HOME/code/mon-site"
```

---

## 4. Reprendre après un plantage — procédure

1. **Ne rien supprimer, ne rien réinitialiser.** Pas de `git reset --hard`,
   pas de `git checkout .` tant que l'étape 2 n'est pas faite.
2. **Sauvegarder d'abord** (voir § 5, script de checkpoint).
3. Lancer le diagnostic du § 0, puis du § 3.
4. Comparer avec GitHub : `git diff origin/main --stat`.
5. Vérifier que ça compile avant de commiter : `npx tsc --noEmit && npx next build`.
6. Commiter, pousser, et **relire le § 5**.

---

## 5. Garde-fous — les règles de travail

### Checkpoint avant toute opération risquée
Avant un `rebase`, un `reset`, un `merge`, une grosse refacto, ou dès qu'une
session d'agent commence sur du travail non commité :

```bash
bash scripts/checkpoint.sh
```

Le script dépose une archive horodatée dans `~/backups/mon-site/`, **hors
iCloud**. Il ne modifie jamais le dépôt.

### Ne jamais laisser dormir du travail non commité
Le dossier est dans iCloud : un fichier modifié non commité n'est protégé par
rien. En fin de session, soit on commite, soit on lance un checkpoint.

### ⚠️ Le dépôt GitHub est PUBLIC
Tout ce qui est commité est lisible par n'importe qui.

**Les PDF de contenu de site sont versionnés, et c'est voulu** : conditions
générales, offre de prix vierge, brochures studio. Ils vivent dans `public/`
— un fichier sous `src/` n'est pas servi par Next.js et serait invisible sur
le site. Noms en minuscules, sans accent ni espace : ils deviennent des URL.

Ne **jamais** versionner en revanche :
- `.env*` et toute clé d'API (déjà ignoré)
- un devis **rempli**, avec le nom, l'adresse ou le numéro de TVA d'un client
- des photos livrées sous contrat ou non publiables

Contrôle avant push — repérer un document rempli parti par erreur :
```bash
git diff --name-only origin/main..HEAD | grep -iE '\.env|facture|devis_|signe'
```

### Vérifier avant de commiter
```bash
npx tsc --noEmit && npx next build
```
`npx eslint .` signale une erreur pré-existante dans `src/components/ContactForm.tsx`
(`useRef(Date.now())`, règle `react-hooks/purity`) — connue, sans rapport avec
un changement en cours, et sans effet sur le build.

---

## Annexe — contrôle de santé complet

```bash
bash scripts/healthcheck.sh
```
