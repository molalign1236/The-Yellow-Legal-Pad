# The Yellow Legal Pad — AI Agent Brief

> Entry point for AI agents (Claude Code, Cursor, Codex, etc.)
> working in this repo. Read this before making changes.

**Last updated:** 2026-05-18 (post-Pass 472 — Stacey's May 2026 punch list landed)

---

## What this repo is

The marketing/practice site for **The Yellow Legal Pad** — a solo
financial coaching practice in Vero Beach, Florida, run by Stacey,
serving women navigating financial transitions (retirement, divorce,
widowhood, late starts, caregiving, inheritance, new careers).

- **Stack:** Astro 5 + Tailwind v3 + EB Garamond (Fontsource). Fully
  static output. View Transitions API via `<ClientRouter />`.
- **Pages:** Home, About, Philosophy, Services, Resources, Contact,
  Settings, 404. Eight routes total.
- **Hosting:** Vercel (per brief). No backend; no database.
- **JS footprint:** The only JS is Astro's ClientRouter for SPA-style
  navigation + two inline scripts in `BaseLayout.astro` (a pre-paint
  settings script and a scroll-driven background-parallax script).
  Everything else is plain HTML/CSS.

The site is intentionally small. Resist additions that would make
it bigger without making the writing land more clearly.

---

## Posture (load-bearing — don't break)

These shape every change. If a proposed edit conflicts with one of
these, push back or surface the tradeoff.

### 1. Document, not application

The site is a document people read, not an app they use. No
dashboards, widgets, app behavior, conversion funnels, or
"experience" framings. The user-facing reaction we're after is
"I feel calmer and I know what to do next" — never "this is a
beautifully designed website."

### 2. Paper-on-desk visual metaphor

The site presents as a sheet of paper resting on a warm desk.
- Body bg = the desk (warm tan, or near-black in dark mode).
- `.site-paper` = the paper sheet (ivory or matte black).
- Subtle radial gradient on the body simulates an overhead lamp.
- `.cta` buttons are styled as recessed holes punched through the
  paper (background = desk color, inset shadow simulates depth).

The metaphor is structural — the design tokens, depth shadows, and
page transitions all reinforce it. Don't add literal decorative
paper references (torn edges, clipart, notebook spiral, fake tape,
visible hole punches scattered around). The metaphor should be
**felt**, not noticed.

### 3. Light + dark mode, both as paper

- Light mode: ivory paper on tan desk. Navy ink. Restrained gold
  for rule lines + link underlines.
- Dark mode: matte black paper on near-black desk. Warm cream ink.
  Gold slightly brighter.
- Dark mode is **paper under a lamp at night**, not premium OLED
  UI. Don't drift toward dramatic contrast, glowing accents, or
  "premium dark theme" energy.

### 4. Brand identity (owner-confirmed via May 2026 handoff)

- Name: **The Yellow Legal Pad** (with "The"; casual prose may
  drop the article)
- Colors: navy `#1F3864`, gold `#B8860B` (raw tokens in
  `src/styles/global.css`). One restricted accent: a muted brick
  red appears only as the `.pull-quote` left margin rule (Pass
  470 — the yellow legal pad's actual margin line, the only
  place that visual signature is rendered). Don't use brick red
  anywhere else.
- Tagline: "Financial coaching for life's biggest transitions"
- Email: `stacey@theyellowlegalpad.co`
- Domain: `https://theyellowlegalpad.co`
- Location: Vero Beach, Florida (in footer)
- Audience: women navigating transitions

### 5. Legal compliance (non-negotiable)

The footer disclaimer is required on every page:

> The Yellow Legal Pad provides financial coaching and education
> only. This is not financial advice, investment advice, legal
> advice, or tax advice. Consult a licensed professional for advice
> specific to your situation.

**Forbidden terms anywhere on the site:** Financial Advisor,
Financial Planner, Investment Manager, Wealth Manager, or any
phrasing that implies licensure. **Safe terms:** Coach, Coaching,
Financial Education, Financial Wellness, Money Coach, Clarity.

Never promise specific financial outcomes ("save $X", "grow your
wealth", "guaranteed results").

### 6. Booking flow

The Discovery Call is the **only** publicly bookable item, via
Calendly (free tier). All paid sessions are scheduled manually by
Stacey after a separate engagement letter + payment step. Do not
expose paid scheduling on the site. Do not build intake forms; the
intake happens after booking.

### 7. Privacy: no headshot at launch

Stacey is building this while still employed elsewhere. No photos
of her face, no identifying career specifics, no exact retirement
ages. The About page softens all of this deliberately. Do not add
back specifics or use stock photos of women as a substitute.

---

## Architecture (small enough this fits in one place)

```
src/
  layouts/
    BaseLayout.astro      # head meta, ClientRouter, paper wrapper,
                          # header/footer, pre-paint settings script,
                          # global styles for chrome
  pages/
    index.astro           # Home
    about.astro           # About Stacey
    philosophy.astro      # How Stacey thinks about money (Pass 472)
    services.astro        # Packages + pricing
    resources.astro       # Guide list
    contact.astro         # Email + Discovery Call
    settings.astro        # Theme / font size / motion preferences
    404.astro
  styles/
    global.css            # Tailwind base, theme tokens, paper styles,
                          # typography, CTA, page-transition keyframes,
                          # print stylesheet
public/
  favicon.svg
  robots.txt
astro.config.mjs          # site: theyellowlegalpad.co, static output
tailwind.config.mjs       # palette tokens, prose measure, serif stack
```

**Theme tokens** live in `src/styles/global.css` as CSS variables.
Light values are the defaults; dark values are swapped via either
`@media (prefers-color-scheme: dark)` or `:root[data-theme="dark"]`
(set by the pre-paint script when the user picks Always Dark on
`/settings`). Adding a new theme value means: add the raw light +
dark token, alias it to `--c-*`, and reference `var(--c-*)` in CSS.

**Settings system** stores prefs in `localStorage` under
`ylp:settings` and applies them as `data-theme`, `data-font-size`,
`data-motion` attributes on `<html>`. The pre-paint script in
`BaseLayout.astro` runs synchronously before first paint so there's
no flash of wrong theme.

**Page transitions** use the View Transitions API via Astro's
`<ClientRouter />`. The `.site-paper` element has `transition:name="paper"`;
the outgoing sheet rotates around its left edge (iBook flip), the
new sheet reveals underneath. The desk, header, and footer stay
visually persistent.

---

## Protected systems (don't casually refactor)

A few subsystems are deliberately delicate and have taken many
passes to land. Touch them only when you understand what each
moving part is for. If a future change needs to alter one, prefer
adding a sibling system over rewriting the existing one.

### Page-curl transition (Pass 401 → 419)
The `::view-transition-old(paper)` rule in `src/styles/global.css`
runs five concurrent animations on the outgoing sheet:
- `ibook-mask-flow` — diagonal mask-image sweep that reveals the
  desk underneath as the page rolls back.
- `ibook-tilt` — 3D rotateY/rotateX bending, hinged at the left
  edge.
- `ibook-bend-shade` — paper-tinted gradient that simulates the
  curl shadow and the lift highlight.
- `ibook-origin-drift` — a small `transform-origin` migration along
  the spine to fake the curl line walking down the page.
- `ibook-curl-x` — an `@property`-registered custom property
  (`--curl-x`) that drives the `clip-path: shape()` quadratic
  bezier so the cut edge is curved, not straight.

The new page sits fully visible underneath with no mask of its
own — the old page's mask is what reveals it. Adding a mask or
opacity ramp to the new page caused the "pages disappear
mid-transition" bug (fixed in Pass 408); don't reintroduce it.

### Background parallax + library wall
`public/library.svg` is a hand-coded SVG (NOT a photo) painted as
a fixed pseudo-element behind `.site-paper`. The wall's
`background-position-y` is driven by a CSS variable
(`--bg-parallax-y`) that an inline script in `BaseLayout.astro`
updates at ~15% of `scrollY`. Moving the library back to
`background-attachment: fixed` caused the "jiggling" bug fixed in
Pass 400. The script must respect `data-motion="off"` and
`prefers-reduced-motion` (Pass 425); don't strip that check.

### Settings pre-paint script
The inline script in the `<head>` of `BaseLayout.astro` reads
`localStorage.getItem("ylp:settings")` and sets `data-theme`,
`data-font-size`, `data-motion` on `<html>` **before first
paint**. Moving this to a deferred or module script reintroduces
the flash-of-wrong-theme bug. It also re-runs on
`astro:after-swap` so View-Transition navigation keeps the user's
overrides applied.

---

## Working with Mola's multi-AI sessions

Mola often coordinates several AI agents — Claude Code, ChatGPT,
Codex, an "Audit AI" — and pastes their transcripts back and
forth. Treat any pasted block as containing four kinds of voice:

- **Mola's directives** (highest authority)
- **Another AI's claims or proposals** (read, don't blindly execute)
- **Evidence** (screenshots, code, reference images)
- **Stale context** (older drafts no longer load-bearing)

Mola's informal inserts — "also add this", "what ChatGPT wanted to
add", "go full auto", "don't do anything yet", "use BD as reference"
— are real steering signals. Extract them, reconcile against this
brief, then plan or execute.

If Mola says "just planning" or "don't do anything yet": do not edit
files. If Mola says "go full auto" or "do so yourself": proceed
within scope, stop only for real blockers (LAW conflicts, destructive
changes, scope expansion, deploy/secret actions).

The `mola-ai-relay-protocol` skill at `~/.claude/skills/` covers
this in more detail. Invoke it when you receive a pasted multi-AI
transcript.

---

## Reusable skills

These live at `~/.claude/skills/` (per-user, available across
projects). Reference them by name in commit messages so future
agents can find them.

| Skill | When to use |
|---|---|
| `mola-ai-relay-protocol` | Mola pastes multi-AI transcripts, asks one AI to prompt another, or mixes live directives into logs |
| `bd-design-identity` | For visual work in the BidOnDent sibling repo. **Do not apply BD's premium-gold-glass identity to this site** — the Stacey site is paper, not premium product. |

This repo does not need Supabase or Clerk skills (no backend).

---

## Sibling repo: BidOnDent

`/Users/molalignmeagher/BidOnDent GitHub Repository/BidOnDent-Production`
is Mola's other active project — a map-first auto-repair bidding
marketplace with Supabase + Clerk + MapLibre. It has a much heavier
stack and a fundamentally different visual identity.

**Posture for cross-repo work:**

- BidOnDent is **reference only** from the yellow-legal-pad side,
  and only at the methodology layer. It is a **systems-thinking
  reference, not a style reference.**
- Patterns worth borrowing (methodology / discipline): docs
  structure, the `mola-ai-relay-protocol` skill, the CSS-variable
  theme system pattern, BD's two-purpose motion filter (motion
  serves trust or spatial continuity, otherwise rejected),
  mandatory `prefers-reduced-motion` guards in the same commit,
  apex-canon structural-lock thinking, co-update doctrine, anti-
  recursion operational awareness.
- Patterns NOT to import (style / spectacle): `bd-*` utility
  classes, the premium-gold-glass palette, the curl/curvature
  topology, atmospheric density layering, animation orchestration,
  "premium polish," visual hero moments, shadcn-style component
  machinery, the Supabase/Clerk/MapLibre stack, framer-motion /
  `motion/react` patterns.

The Stacey site is intentionally lightweight. Resist porting BD's
abstractions just because they exist. The full six-filter
methodology lens lives in
[`docs/builder-handoff-2026-05-12.md`](docs/builder-handoff-2026-05-12.md)
§ Methodology lens — read before any pass that touches motion,
atmosphere, or visual surface.

**Apex canon protection.** [`docs/stacey-direction.md`](docs/stacey-direction.md)
is the apex canon for Stacey's voice and is **structurally locked**
(modeled on BD's `MOLANDJESUS_DESIGN_DECISIONS.md`). Additive
controlled edits only, with new source material from Stacey, using
the `docs(stacey):` commit prefix. No AI-pass restructure, merge,
split, rename, or "improvement" of that doc.

---

## Doc files in this repo

| File | Purpose |
|---|---|
| `CLAUDE.md` | This file — AI agent brief (law tier) |
| `README.md` | Human-facing repo intro |
| `AI_LOCK.md` | Multi-AI session coordination. Claim before any source edit on a shared branch. |
| `TODO_STACEY.md` | Worklist of placeholders + pending owner decisions |
| `docs/builder-handoff-2026-05-12.md` | **Read this if you're starting fresh.** Concrete action plan for the next implementation phase — three lanes Builder can autopilot, owner-pending items, recommended pass sequence, methodology lens borrowed from BD, first-pass grounding with file:line coordinates. |
| `docs/builder-master-prompt-2026-05-12.md` | The exact prompt to paste into a fresh Builder Claude Code session to kick off Pass 446. Persisted here so it survives chat scroll. |
| `docs/stacey-direction.md` | Apex canon — Stacey's voice in her own words. **Structurally locked**: additive controlled edits only via `docs(stacey):` commits citing new Stacey-sourced material. |
| `docs/perceptual-audit-2026-05-12.md` | Browser-based audit findings (bookshelf variants, dark-mode CTA bug, page-curl scope). |
| `docs/known-issues.md` | Lightweight tracker for active bugs / sandbox limitations / deferred items. KI-### IDs. |
| `docs/anti-patterns.md` | Catalogue of changes considered and rejected. Read before proposing analytics, intake forms, blog systems, pricing tables, etc. |
| `docs/deployment-checklist.md` | Practical step-list for the first Vercel deploy. |
| `docs/README.md` | Operating index for `/docs/`. |
| `docs/archive/` | Frozen reference material: the May 11 audit cycle (contrast, keyboard, dependency, icon, cross-browser, touch-target, no-JS, reading-ecology, failure-state, original multi-AI audit) + the May 12 pre-Pass-449 dependency audit. Don't edit; new audits go alongside. |

If you add a new fact that contradicts one of these, update it in
the same pass. Stale docs are worse than no docs.

### Co-update table

Modeled on BD's co-update doctrine, narrowed to YLP's surface area.
When a trigger fires, the corresponding doc(s) must be updated in
the **same** pass — not a follow-up.

| Trigger | Must update |
|---|---|
| New `src/styles/global.css` token added | `CLAUDE.md` § Posture if it changes a load-bearing rule (palette, motion, lamp source) |
| New visible animation or transition | `CLAUDE.md` § Protected systems with the keyframe name + reduce-guard reference |
| Stacey sends new written/spoken material | `docs/stacey-direction.md` (additive only, `docs(stacey):` prefix) |
| New bug discovered | `docs/known-issues.md` with next free KI-### id |
| Bug fixed | `docs/known-issues.md` — mark RESOLVED with date + pass number |
| Owner decision lands (Calendly URL, About copy, headshot policy, etc.) | `TODO_STACEY.md` line struck through; relevant page edited in same pass |
| New page route added (currently 7) | `CLAUDE.md` § Architecture page list, `astro.config.mjs` sitemap if needed |
| New `prefers-reduced-motion` source | `CLAUDE.md` § Protected systems reduce-guard inventory |
| Doc superseded | Move to `docs/archive/` with date suffix; update cross-refs in same pass |
| Dependency upgraded / `npm audit` rerun | `docs/archive/dependency-audit-YYYY-MM-DD.md` snapshot, optional |
| Astro 6 upgrade (when it happens) | `CLAUDE.md` Astro version reference + verify Tailwind integration + verify View Transitions still work |

---

## Commit + pass conventions

Work proceeds as numbered "passes" — each pass is one focused
change with a `Pass N — short description` commit subject and a
body explaining the *why*. The git log is the practice's
historical reasoning trail. Don't bundle unrelated changes into a
single pass.

Recent pass examples worth reading for style:
- Pass 394 — settings system (CSS variables + pre-paint script)
- Pass 395 — iBook-style page flip transition
- Pass 401–419 — curved page-curl transition refinement
- Pass 397–400 — library backdrop + non-jiggling parallax
- Pass 425 — parallax respects motion preferences
- Pass 428 — sitemap.xml via @astrojs/sitemap
- Pass 368 — legal disclaimer site-wide
- Pass 338 — remove reveal-on-scroll entirely
- Pass 328 — fix font-bundling deployment bug

---

## What this brief is NOT

- It's not the source of truth for content. Content lives in the
  page files; this brief documents the rules around content.
- It's not historical. If something is no longer true, edit it.
- It's not a substitute for `TODO_STACEY.md`, which tracks
  pending owner decisions.

If you're an AI and you haven't read this file, do that before
making changes.
