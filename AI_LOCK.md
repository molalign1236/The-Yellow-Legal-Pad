# AI_LOCK — multi-AI session coordination

Modeled on the sibling repo's `AI_LOCK.md`. Lightweight version,
because YLP is a much smaller codebase and concurrent AI work is
rarer here than in BD. Still useful: when Builder and a second AI
(Audit, Codex, ChatGPT) both touch `src/` on the same branch, this
file is how they avoid clobbering each other.

---

## How to use

Before any source edit on a shared branch:

1. Run `git status`. If you see changes you did not make and there
   is no claim entry below, **stop** — those belong to Mola or
   another AI. Ask before proceeding.
2. Append a claim entry to "Active claims" below with your AI
   name, pass number, file scope, and start time.
3. Work. Commit your pass.
4. Move the claim to "Standdown log" with a one-line result.

Each work batch needs its **own** claim/standdown pair. A previous
standdown does NOT carry permission forward. This rule comes from
BD's REF_AI_COLLABORATION_PROTOCOL § Methodology Lessons.

If two AIs need to touch overlapping files at the same time, the
later claimant waits. There is no merge-conflict resolution
protocol here because there should not be one — coordination is
sequential, not parallel.

---

## Active claims

*(empty)*

---

## Standdown log

### 2026-05-12 — Pass 451 (Builder — verification only)

Dev server smoke after Passes 446 + 447. Hit all 6 real routes
(/, /about, /services, /resources, /contact, /settings) — each
200. /nonexistent returns 404 as designed (Astro renders the 404
page). Dev server log: zero warnings, zero errors, zero hydration
messages since startup. No code change.

### 2026-05-12 — Pass 450 (Builder — verification only)

A11y verification on Pass 446 CTA changes. Confirmed: CTA remains
a native `<a>` (keyboard-reachable, 8 anchors precede it on home);
:focus-visible outline (2px var(--c-ink), 3px offset) renders
outside the new 1px gold border with clear separation;
`--dark-gold-soft` (#e6b545) on `--dark-paper` (#161616) ≈ 9.4:1
luminance ratio (WCAG 1.4.11 non-text UI passes 3:1 by 3×); print
stylesheet `border: 0 !important` neutralizes the addition; the
existing prefers-reduced-motion guard on `.cta` is unaffected
because `border` is a static property. No code change.

### 2026-05-12 — Pass 447 (Builder)

OG + apple-touch meta tag wiring. Removed stale "deliberately
omitted" comment; added og:image (+ width/height/alt),
twitter:image, apple-touch-icon link; upgraded twitter:card from
"summary" to "summary_large_image"; consolidated share-unfurl meta
tags into one contiguous block. Verified each unique tag appears
once in served HTML; /og.png and /apple-touch-icon.png return 200
OK. KI-003 closed; two TODO_STACEY entries struck through.

### 2026-05-12 — Pass 446 (Builder)

Dark-mode CTA fix landed. Added `--c-cta-border-color` alias
(transparent light, `var(--dark-gold-soft)` both dark paths),
raised `--dark-cta-highlight` 0.06 → 0.14 and
`--dark-cta-highlight-hover` 0.08 → 0.18, added
`border: 1px solid var(--c-cta-border-color)` on `.cta`.
KI-001 closed. Six insertions, two value changes; light mode
visually identical. Dev server verified — served CSS contains
all six tokens at expected values.

### 2026-05-12 — Audit role: prep handoff complete

Three sub-batches across the day, consolidated into one standdown
since no concurrent AI was active and there is no source-edit
overlap concern.

**Sub-batch 1 (earlier — docs restructure):**

- Renamed 10 May 11 audits into `docs/archive/`.
- Wrote `docs/builder-handoff-2026-05-12.md` (initial structure).
- Wrote `docs/stacey-direction.md` (initial consolidation).
- Wrote `docs/perceptual-audit-2026-05-12.md`.
- Rewrote `docs/README.md` for the new structure.
- Updated `CLAUDE.md` doc table.

**Sub-batch 2 (BD methodology extraction):**

- Appended § Methodology lens (six pre-commit filters borrowed from
  BD, translated to paper idiom) to `builder-handoff`.
- Appended § Caretaker reframe (operational mental model) to
  `builder-handoff`.
- Added Structural-lock clause to `stacey-direction.md`, modeled
  on BD's `MOLANDJESUS_DESIGN_DECISIONS.md` lock.
- Rewrote § Sibling repo in `CLAUDE.md` with explicit good vs bad
  cross-contamination lists.

**Sub-batch 4 (asset pre-rendering):**

- Generated `public/og.png` (1200×630, 407KB) from `public/og.svg`
  via ImageMagick. Verified visually — paper-on-desk identity
  preserved.
- Generated `public/apple-touch-icon.png` (180×180, 2.4KB) from
  `public/favicon.svg`. Verified visually.
- Updated `docs/known-issues.md` with KI-003 documenting the
  remaining meta-tag wiring work.
- Updated `docs/builder-handoff-2026-05-12.md` § First-pass
  grounding: Pass 447 now describes meta-wiring only; Pass 448
  marked RECLAIMED.
- Updated `docs/builder-master-prompt-2026-05-12.md` similarly.
- Ran `tsc --noEmit` from sandbox — clean (no .ts files outside
  .astro frontmatter, expected). KI-P01 (rollup native-module
  mismatch) confirmed as the hard verification ceiling: `npm run
  build`, `astro check`, and dev-server work are all host-only.

This sub-batch did touch `public/` (asset generation), which my
own out-of-scope list under-specified. Recording the touch here
to keep the audit trail honest. No `src/` edits.

**Sub-batch 3 (Builder operational grounding):**

- Created `AI_LOCK.md` (this file).
- Created `docs/known-issues.md` seeded with KI-001 (dark-mode CTA),
  KI-002 (bookshelf owner-pending), KI-P01 (sandbox build limit),
  KI-P02 (host-owned git lock).
- Pre-captured `npm audit` into `docs/archive/dependency-audit-2026-05-12.md`
  (7 moderate / 0 high / 0 critical; Pass 449 pre-folded).
- Persisted the Builder master prompt as
  `docs/builder-master-prompt-2026-05-12.md` so it survives chat
  scroll.
- Appended § First-pass grounding to `builder-handoff` with exact
  file:line coordinates for Pass 446 (CTA bug locations, three
  approach options), Pass 447 (OG export), Pass 448 (apple-touch
  export), and a verification-ceiling note for the sandbox.
- Added co-update table to `CLAUDE.md` with 11 trigger → must-update
  rows.
- Updated `docs/README.md` to index all new files.

**Source files touched:** 0. Audit role only.

**Build verification:** sandbox cannot run `npm run build` per
KI-P01 (rollup native-module mismatch, expected). Verification
ceiling held at file inspection + structured grep. Real build is
host-side.

**Next:** host-side `git add -A && git commit -m "docs: prep
repo for Builder — methodology lens, apex lock, KI tracker, master
prompt, co-update table"` lands everything; then a fresh Builder
chat begins with Pass 446 (dark-mode CTA visibility) using the
prompt at `docs/builder-master-prompt-2026-05-12.md`.

---

## Out-of-scope claims (do not need a lock)

These edits do not require an AI_LOCK claim:

- Markdown-only edits to `/docs/` that do not change code (audit
  reports, READMEs, planning docs)
- Reading and quoting from source files
- Running `npm audit` or `tsc --noEmit` without committing
- Stacey's own commits via her terminal (she is not an AI)

Source code edits — `src/**`, `astro.config.mjs`, `tailwind.config.mjs`,
`package.json` — always require a claim.
