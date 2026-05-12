# Known issues

Lightweight tracker. KI-### IDs. Seeded with real items only —
do not pad with theoretical concerns. Pattern borrowed from the
sibling repo's `REF_KNOWN_ISSUES.md`, scaled down for YLP.

Format per entry: ID, short name, status, severity, what it is,
where it lives, what closes it.

---

## Active

### KI-002 — Bookshelf treatment owner-pending

**Status:** OWNER-DECISION.
**Severity:** low — does not affect function; affects atmosphere.

The hand-painted SVG bookshelf behind `.site-paper` was tested in
multiple variants during the May 12 perceptual audit. The audit's
load-bearing finding — *"the lamp pool radial gradient is doing
the warmth work, not the bookshelf"* — suggests removal or
heavy reduction is viable. Owner decision pending.

Source: `public/library.svg`. Variants documented in
`docs/perceptual-audit-2026-05-12.md`.

Close: owner picks one of {keep current, remove, C20 reduction
variant}. Whichever they pick, the change is one pass.

---

## Permanent / by-design (not bugs)

### KI-P01 — Sandbox cannot run `npm run build`

**Status:** PERMANENT, by-design.

Linux-arm64 sandbox cannot run Rollup's native module because
`node_modules` was installed against `darwin-arm64` on the host.
Build, dev-server, and Playwright runs are host-only. Sandbox
verification ceiling is `tsc --noEmit` and/or `astro check`.

This is not a bug. It is the expected boundary between Mola's
host environment and an AI's sandbox.

### KI-P02 — Git index lock owned by host uid

**Status:** PERMANENT, by-design.

`/Users/molalignmeagher/yellow-legal-pad/.git/index.lock` is
created and owned by the host user. The sandbox user cannot
remove it. Commits originate from Mola's terminal, not from
inside the sandbox. AI passes prepare staged changes; Mola
commits.

This is not a bug. It is how the sandbox isolation is designed.

---

## Resolved

### KI-003 — OG image + Apple touch icon meta tags missing

**Closed:** Pass 447 — 2026-05-12.

PNG assets were pre-rendered during prep. Pass 447 wired:
`og:image`, `og:image:width`, `og:image:height`, `og:image:alt`,
`twitter:image`, `<link rel="apple-touch-icon" sizes="180x180">`;
upgraded `twitter:card` from `summary` to `summary_large_image`;
consolidated the share-unfurl meta tags into a single contiguous
block and removed the stale "deliberately omitted" comment.
Verified each tag appears exactly once in served HTML; `/og.png`
and `/apple-touch-icon.png` both return 200 OK.

### KI-001 — Dark-mode CTA visibility

**Closed:** Pass 446 — 2026-05-12.

The "hole punched through paper" CTA effect collapsed in dark mode
because `--dark-cta-bg` (`#050505`) and `--dark-paper` (`#161616`)
sat too close on the luminance axis and `--dark-cta-highlight`
(`0.06`) was too faint to render the recessed-edge lift.

Fix: introduced `--c-cta-border-color` (transparent in light,
`var(--dark-gold-soft)` in both auto-dark and forced-dark);
raised `--dark-cta-highlight` to `0.14` and
`--dark-cta-highlight-hover` to `0.18`; added a single
`border: 1px solid var(--c-cta-border-color)` declaration on
`.cta`. Light mode unchanged (transparent border).

---

## How to use this file

When you find a real issue, append it under "Active" with the
next free ID. When you fix one, move it to "Resolved" with the
closing pass number and date. Do not invent issues to fill the
list. An empty list is fine.

The Permanent / by-design section is for boundaries Builder will
hit repeatedly. New AIs reading this file should understand: "if
the build fails in the sandbox, that's KI-P01, not a problem."
