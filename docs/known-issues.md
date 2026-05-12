# Known issues

Lightweight tracker. KI-### IDs. Seeded with real items only —
do not pad with theoretical concerns. Pattern borrowed from the
sibling repo's `REF_KNOWN_ISSUES.md`, scaled down for YLP.

Format per entry: ID, short name, status, severity, what it is,
where it lives, what closes it.

---

## Active

### KI-001 — Dark-mode CTA visibility

**Status:** OPEN (Pass 446 will close).
**Severity:** moderate — affects readability of the only
conversion affordance on the site in one of two color modes.

The "hole punched through paper" CTA effect collapses in dark
mode because `--dark-cta-bg` (`#050505`) and `--dark-paper`
(`#161616`) sit too close on the luminance axis and
`--dark-cta-highlight` (`0.06`) is too faint to render the bottom
lift edge that completes the metaphor. Net effect: the CTA reads
as a flat dark blob rather than a recessed hole.

Source: `src/styles/global.css` lines 56 (paper), 62–77 (CTA dark
vars), 418 (CTA rule), 125 + 167 (dark mode application points).

Close: Pass 446 — outline + slightly-lifted highlight approach
recommended. See `docs/builder-handoff-2026-05-12.md` § First-pass
grounding for the three documented options.

### KI-003 — OG image + Apple touch icon meta tags missing

**Status:** PARTIAL — PNG assets present, meta tags not yet wired.
**Severity:** low — affects social-card previews and iOS home-
screen adds, not core rendering.

`public/og.png` (1200×630) and `public/apple-touch-icon.png`
(180×180) were pre-rendered from the existing SVGs during prep
(2026-05-12, ImageMagick from sandbox — verified visually,
production-quality). What remains is wiring the `<meta>` and
`<link>` tags in `src/layouts/BaseLayout.astro`:

```
<meta property="og:image" content="/og.png" />
<meta name="twitter:image" content="/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

Co-update: also confirm `og:url`, `og:title`, `og:type`, and
`twitter:card` exist in BaseLayout head. Add in the same pass if
absent.

Close: combine into a single Pass 447 (drop Pass 448 — there is
no second deliverable since both PNGs already exist).

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

*(empty — Pass 446 will land KI-001 here)*

---

## How to use this file

When you find a real issue, append it under "Active" with the
next free ID. When you fix one, move it to "Resolved" with the
closing pass number and date. Do not invent issues to fill the
list. An empty list is fine.

The Permanent / by-design section is for boundaries Builder will
hit repeatedly. New AIs reading this file should understand: "if
the build fails in the sandbox, that's KI-P01, not a problem."
