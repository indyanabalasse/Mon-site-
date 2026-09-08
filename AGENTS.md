<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Before you touch anything

This project lives in `~/Documents`, which iCloud syncs. iCloud has already
corrupted files inside `.git` here by writing conflict copies (`index 2`,
`refs/remotes/origin/main 2`) while git was writing. Uncommitted work in this
folder is protected by nothing.

**If `git status` is not clean when you start, checkpoint before your first
edit** — it writes outside iCloud and never touches the repository:

```bash
bash scripts/checkpoint.sh
```

Do the same before any `reset`, `rebase`, `merge`, or large refactor.
`bash scripts/healthcheck.sh` reports sync state and iCloud damage.
`RECOVERY.md` is the full playbook: how to tell what is lost, where to find it,
and how to resume.

# This repository is public

`indyanabalasse/Mon-site-` is a public GitHub repository. PDFs of site content
belong in `public/` and are committed on purpose. Never commit `.env*`, API
keys, a filled-in client quote, or photos delivered under contract.

Static files must be under `public/` to be served — anything under `src/` is
invisible to the site. Name them lowercase, no accents, no spaces: they become URLs.

# Verify before committing

```bash
npx tsc --noEmit && npx next build
```

`npx eslint .` reports one pre-existing error in `src/components/ContactForm.tsx`
(`useRef(Date.now())`, `react-hooks/purity`). It predates current work and does
not break the build — do not treat it as something you caused.
