#!/usr/bin/env bash
# Sauvegarde le travail non commité HORS iCloud, avant toute opération risquée.
# Ne modifie jamais le dépôt : uniquement de la lecture et une copie.
#
#   bash scripts/checkpoint.sh [libellé]
#
set -uo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "✗ Pas un dépôt git : $REPO" >&2
  exit 1
fi

LABEL="${1:-}"
STAMP="$(date +%Y-%m-%d_%H%M%S)${LABEL:+_$LABEL}"
DEST="$HOME/backups/mon-site/$STAMP"

# ~/backups n'est pas synchronisé par iCloud : c'est tout l'intérêt.
mkdir -p "$DEST"

{ git diff --name-only; git diff --cached --name-only; git ls-files --others --exclude-standard; } \
  | sort -u > "$DEST/liste-fichiers.txt"

COUNT=$(wc -l < "$DEST/liste-fichiers.txt" | tr -d ' ')

if [ "$COUNT" -eq 0 ]; then
  echo "✓ Rien à sauvegarder : aucun fichier modifié ni non suivi."
  rm -rf "$DEST"
else
  tar -czf "$DEST/travail-non-commite.tar.gz" -T "$DEST/liste-fichiers.txt" 2>/dev/null
  git diff HEAD > "$DEST/modifications.patch"
  echo "✓ $COUNT fichier(s) sauvegardé(s)"
fi

# Contexte : permet de savoir, plus tard, à quel point de l'histoire ça correspond.
{
  echo "date      : $(date '+%Y-%m-%d %H:%M:%S')"
  echo "dépôt     : $REPO"
  echo "branche   : $(git branch --show-current)"
  echo "HEAD      : $(git rev-parse HEAD)"
  echo "origin    : $(git rev-parse origin/main 2>/dev/null || echo 'inconnu')"
  echo "non poussé: $(git log --oneline origin/main..HEAD 2>/dev/null | wc -l | tr -d ' ') commit(s)"
  echo
  git status -sb
} > "$DEST/etat.txt" 2>&1

[ -d "$DEST" ] && { mkdir -p "$HOME/backups/mon-site"; echo "$DEST" > "$HOME/backups/mon-site/DERNIER.txt"; echo "  → $DEST"; }

# Un travail non poussé n'est protégé que par cette sauvegarde : le dire.
AHEAD=$(git log --oneline origin/main..HEAD 2>/dev/null | wc -l | tr -d ' ')
[ "${AHEAD:-0}" -gt 0 ] && echo "⚠  $AHEAD commit(s) local(aux) pas encore sur GitHub — pensez à pousser."
exit 0
