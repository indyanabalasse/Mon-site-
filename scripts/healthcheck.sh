#!/usr/bin/env bash
# Contrôle de santé : synchro GitHub + dégâts iCloud. Lecture seule.
#
#   bash scripts/healthcheck.sh
#
set -uo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO"
PROBLEMES=0
signale() { echo "⚠  $1"; PROBLEMES=$((PROBLEMES + 1)); }

echo "── 1. Synchronisation avec GitHub ─────────────────────"
git fetch origin --prune -q 2>/dev/null || signale "fetch impossible (hors ligne ?)"
AHEAD=$(git log --oneline origin/main..HEAD 2>/dev/null | wc -l | tr -d ' ')
BEHIND=$(git log --oneline HEAD..origin/main 2>/dev/null | wc -l | tr -d ' ')
DIRTY=$(git status --porcelain | wc -l | tr -d ' ')

[ "$AHEAD"  -gt 0 ] && signale "$AHEAD commit(s) local(aux) non poussé(s)"  || echo "✓ aucun commit en attente de push"
[ "$BEHIND" -gt 0 ] && signale "$BEHIND commit(s) sur GitHub non récupéré(s)" || echo "✓ rien à récupérer depuis GitHub"
[ "$DIRTY"  -gt 0 ] && signale "$DIRTY fichier(s) non commité(s) — non protégés (dossier iCloud)" \
                    || echo "✓ arbre de travail propre"

echo
echo "── 2. Intégrité du dépôt ──────────────────────────────"
ERREURS=$(git fsck --no-progress 2>&1 | grep -v '^dangling' | head -5)
[ -n "$ERREURS" ] && { signale "dépôt git abîmé :"; echo "$ERREURS" | sed 's/^/    /'; } \
                  || echo "✓ intégrité git OK"

echo
echo "── 3. Dégâts iCloud ───────────────────────────────────"
DOUBLONS=$(find .git -name "* [0-9]" -o -name "* [0-9].*" 2>/dev/null)
[ -n "$DOUBLONS" ] && { signale "copies de conflit iCloud dans .git :"; echo "$DOUBLONS" | sed 's/^/    /'; } \
                   || echo "✓ aucune copie de conflit dans .git"

PLACEHOLDERS=$(find . -name "*.icloud" -not -path "./node_modules/*" 2>/dev/null | wc -l | tr -d ' ')
[ "$PLACEHOLDERS" -gt 0 ] && signale "$PLACEHOLDERS fichier(s) non téléchargé(s) — lancer : brctl download \"$REPO\"" \
                          || echo "✓ tous les fichiers sont téléchargés localement"

case "$REPO" in
  "$HOME/Documents"/*|"$HOME/Desktop"/*)
    signale "le projet est dans un dossier synchronisé par iCloud (cause racine — voir RECOVERY.md § 3)" ;;
  *) echo "✓ projet hors des dossiers synchronisés iCloud" ;;
esac

echo
echo "── 4. Dernière sauvegarde ─────────────────────────────"
if [ -f "$HOME/backups/mon-site/DERNIER.txt" ]; then
  D=$(cat "$HOME/backups/mon-site/DERNIER.txt")
  echo "  $D"
  [ "$DIRTY" -gt 0 ] && [ -n "$(find "$D" -maxdepth 0 -mtime +1 2>/dev/null)" ] \
    && signale "sauvegarde vieille de plus d'un jour alors qu'il y a du travail non commité"
else
  [ "$DIRTY" -gt 0 ] && signale "aucune sauvegarde — lancer : bash scripts/checkpoint.sh"
fi

echo
if [ "$PROBLEMES" -eq 0 ]; then
  echo "═══ Tout est sain. ═══"
else
  echo "═══ $PROBLEMES point(s) à traiter — voir RECOVERY.md ═══"
fi
exit 0
