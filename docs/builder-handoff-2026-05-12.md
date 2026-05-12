# Builder handoff — 2026-05-12

Concrete action plan for the next implementation phase. After Pass
445, the audit-only phase closed. This doc opens the next phase:
**bringing the site to life through small grounded additions
within the existing identity**, not feature expansion.

Mola's directive: continue in autopilot, add design + Stacey
ideas, make it feel inhabited. The site is already structurally
correct. The next phase is texture, atmosphere refinement, and
landing Stacey's actual voice in places where AI-drafted prose
still carries.

Read first:
1. `/CLAUDE.md` — the brief (law tier)
2. `docs/stacey-direction.md` — Stacey's own register and stated wants
3. `docs/anti-patterns.md` — what's been deliberately rejected
4. `docs/perceptual-audit-2026-05-12.md` — recent rendered findings
5. `/TODO_STACEY.md` — owner-input punch list

---

## State of the site as of this handoff

**Routes (7):** Home, About, Services, Resources, Contact,
Settings, 404. All shipped. All copy reasonable but several pages
carry AI-drafted prose pending Stacey's final voice.

**Stack:** Astro 5 + Tailwind 3 + EB Garamond. Static. Vercel.
Zero backend. No analytics. No CMS. ClientRouter for SPA-style
navigation + view-transitions for the page-curl.

**Atmospheric system:**
- Warm tan desk (`body` bg)
- Cream paper sheet (`.site-paper`)
- Lamp pool radial gradient (`body::before`)
- Vector library wall behind paper (parallax-driven)
- Paper-stack box-shadow illusion on desktop
- Paper grain (SVG fractalNoise at ~3.5% alpha)
- iBook-style page-curl transition (~380 lines CSS)

**Theme:** light is default; `prefers-color-scheme` swaps to dark;
`/settings` lets the user force light or dark and toggle motion.

**Audit state:** ten frozen audits archived to `docs/archive/`.
Anti-patterns, deployment checklist, Stacey direction, and the
recent perceptual audit live at `docs/` root.

**Dependency state:** 7 moderate vulns from `npm audit`, all in
dev-only chains (volar-service-yaml + astro `define:vars` which is
unused). Production exposure: zero. Astro 6 upgrade deferred until
owner approves the major bump.

---

## Three lanes Builder can autopilot on

These do not require owner input. Each is grounded in audit
findings or stated direction. Each should land as its own focused
pass with a `Pass N — short description` commit subject.

### Lane 1: Real bugs and small wins (P0)

| # | Task | Source | File(s) |
|---|---|---|---|
| 1 | Fix dark-mode CTA visibility — the "hole punched through paper" inset shadow collapses on near-identical near-black surfaces, making `.cta` nearly invisible in dark mode. Add a thin gold outline or a slightly-lighter paper-tinted fill **for dark mode only**. | `docs/perceptual-audit-2026-05-12.md` § Part 3.2 | `src/styles/global.css` |
| 2 | Export `og.svg` → `og.png` (1200×630) and wire `og:image` + `twitter:image` meta. Can use `sharp` or `@resvg/resvg-js` as a build-time step. | `TODO_STACEY.md` § OG PNG export | `public/og.png`, `src/layouts/BaseLayout.astro` |
| 3 | Export `favicon.svg` → `apple-touch-icon.png` (180×180) and add `<link rel="apple-touch-icon">`. iOS Safari "Add to Home Screen" can't read SVG favicons. | `docs/archive/icon-audit-2026-05-11.md` | `public/apple-touch-icon.png`, `src/layouts/BaseLayout.astro` |
| 4 | Run `npm audit` and document current state in `docs/archive/dependency-audit-2026-05-11.md` style (or update). Don't auto-upgrade Astro 6 — that's owner sign-off territory. | `npm audit` | none (audit-only) |

### Lane 2: Stacey's actual phrases into the site

Stacey's brief lists five phrases that "feel right" in her voice.
Currently the site uses some Stacey-aligned phrasing but doesn't
verbatim include her own coined phrases except "Just a
conversation"-adjacent material. Audit-honest: don't force these.
Find the place where each one would land naturally and only swap
if it improves on the current draft.

The five phrases:

1. *"Just a conversation"* — already present in spirit on /services
   ("Every working relationship starts with a Discovery Call —
   free, about twenty minutes"). Consider: tighten the discovery-
   call description on /contact to use the exact phrase.
2. *"No pressure. No pitch."* — already used as "No pressure to
   continue" and "No products, no pressure." The exact phrase
   could land cleanly as a small standalone line.
3. *"Let's look at the real numbers"* — not yet on the site.
   Natural home: /services "How Stacey works" or /about
   philosophy section.
4. *"That feeling is exactly why you need this conversation"* —
   not yet on the site. Natural home: /contact "Before you write"
   section, reframing reluctance.
5. *"Take your time. Read it with a cup of tea, not between
   meetings."* — natural home: /resources opening, framing the
   pace at which to read the guides.

**Constraint:** these are Stacey's lines. Don't surround them with
AI prose. Find the one place each one fits, swap minimally, and
commit individually with the phrase in the commit message.

### Lane 3: Visual warmth additions (within identity)

Stacey approved "warm abstract imagery — legal pad and pen, desk
scene, natural textures. No stock photos of women." She has not
provided imagery yet. Builder should not invent visual style but
*can* add small SVG decorative elements that match the
paper-on-desk identity and that will swap cleanly when Stacey's
real imagery arrives.

Candidate additions, ranked by lowest risk first:

1. **Small section-divider rule.** A thin gold horizontal rule
   currently lives only in the favicon. Adding it as an optional
   `<hr class="paper-rule">` element styled as a subtle gold
   stroke (e.g., `border-top: 1px solid var(--c-gold-soft); opacity: 0.35`)
   could break up dense reading sections on /about without
   feeling decorative.
2. **A single restrained letterpress watermark in the corner of
   `.site-paper`.** Idea: a faint `YLP` monogram in EB Garamond
   small caps at ~6% opacity in the bottom-right of the paper
   sheet, similar to how an actual practitioner might pre-print
   their own pad. Make it conditional — only above 60rem viewport,
   only in light mode initially. Pressure-test: does it read as
   "this is a piece of stationery" or as "we have a brand mark"?
   The former is fine; the latter is the trap.
3. **Image slot scaffolding for hero / about / resources.** When
   Stacey's imagery arrives, it'll need defined slots. Create
   placeholder `<figure>` elements wrapped in `<!-- TODO: image -->`
   comments at the three positions identified in TODO_STACEY.md.
   Don't ship visible placeholders; just scaffold for the swap.
4. **Subtle paper-edge variation across pages.** Currently every
   page renders the same paper-stack illusion. Consider making
   the stack depth subtly different per page (3 sheets on /about
   for "more material," 2 on /resources for "lighter reading"). 
   Small per-page CSS override only.

**Do not** add:
- Decorative illustrations of people, objects, or scenes
- Animated SVG icons
- Photographic textures
- Anything resembling a "lifestyle aesthetic"
- A new font (single-face system is identity)

---

## Owner-pending items (do not autopilot)

These are blocked on Stacey or owner decision. Document them in
TODO_STACEY.md if they change state, but don't fabricate
substitutes.

| Item | What's blocking | Where it lands when unblocked |
|---|---|---|
| Final About copy | Stacey's `YellowLegalPad_AboutPage.docx` | `src/pages/about.astro` |
| Calendly URL | Stacey hasn't set up Calendly | Home, About, Services CTAs + Contact page |
| Real PDFs (4 guides) | Stacey writing them | `public/guides/` + `src/pages/resources.astro` link wraps |
| Privacy Policy | Needs real text from owner or legal source | New `src/pages/privacy.astro` |
| Bookshelf in/out | Owner decision after perceptual audit | `src/styles/global.css` body::before background-image stack |
| Pricing visibility | Brief Q2 open | `src/pages/services.astro` package articles |
| Last name | Privacy decision pending | Footer + casual mentions |
| Headshot policy | Hold until April 2027 (employer) | About page hero region |

---

## Constraints that override everything

These are non-negotiable per `CLAUDE.md`:

1. **Legal terminology.** Never use "financial advisor," "financial
   planner," "investment manager," "wealth manager" anywhere. Safe
   terms: coach, coaching, financial education, financial wellness,
   money coach, clarity. Footer disclaimer is required on every
   page.

2. **No headshot policy.** Stacey is building this while still
   employed elsewhere. No photos of her face. No identifying
   career specifics. No exact retirement ages.

3. **Document, not application.** No dashboards, widgets, app
   behavior, conversion funnels, "experience" framings. The
   target reaction is "I feel calmer." Not "this is a beautifully
   designed website."

4. **Paper-on-desk metaphor.** All visual decisions reinforce this.
   Don't add literal paper imagery (torn edges, clipart, notebook
   spirals, fake tape, visible hole punches). The metaphor is
   felt, not noticed.

5. **The five Decided NOs:** client portals, dashboards, messaging,
   automation, CRM, gated resources. Also no analytics.

6. **Stacey's voice wins.** When she provides edits or copy, her
   cadence overrides anything AI-drafted. Resist "improving" her
   writing.

---

## What "bring it to life" actually means here

Not: add features, expand pages, add motion, add density, add
interactivity.

Yes: small grounded textures that make the site feel
*maintained-by-a-real-person* rather than *generated*. Each
addition should pass the test in `anti-patterns.md`:

> Would this still exist if a thoughtful human quietly maintained
> this site for ten years without a designer present?

If the answer is "yes, eventually a real person would land on
this," keep it. If the answer is "this looks like a designer made
a deliberate choice," push back.

---

## Recommended pass sequence

Pass 446 — dark-mode CTA fix (smallest, highest-leverage)
Pass 447 — OG PNG export + meta wiring
Pass 448 — apple-touch-icon PNG export + link
Pass 449 — current npm audit state captured
Pass 450 — Stacey phrase landing #1 (pick whichever fits cleanest)
Pass 451 — Stacey phrase landing #2
Pass 452 — Stacey phrase landing #3
Pass 453 — Section-divider rule introduced where useful
Pass 454 — Letterpress watermark experiment (commit; remove if it
reads as branding)
Pass 455 — Image slot scaffolding
Pass 456 — Per-page paper-stack variation
Pass 457+ — wait for owner input on Calendly / About docx / PDFs

After each pass, stop. The temptation to chain into the next pass
is the recursive trap. Each pass commits, audits its own rendered
output via dev-server screenshot, and stands down.

---

## How to stop

If at any point you find yourself:
- Adding doctrine to CLAUDE.md, TODO_STACEY.md, or this folder
- Writing audit prose that doesn't change rendered code
- Inventing Stacey context not present in `docs/stacey-direction.md`
- Reaching for a feature that's in `docs/anti-patterns.md`

Stop. The work is done for that session. Next pass is owner-input
dependent.

The site does not need to be perfect before launch. It needs to be
honest enough to support the first client conversation. That
threshold is already close.

---

## Methodology lens — borrowed from BidOnDent, translated to paper

**Load-bearing distinction:** BidOnDent
(`~/BidOnDent GitHub Repository/BidOnDent-Production`) is a
**systems-thinking reference, not a style reference.** Its strongest
achievement is not its visual language — it is its understanding of
experiential coherence as infrastructure. That layer transfers
cleanly. Its aesthetic does not.

**Import from BD (good cross-contamination):** audit-before-
escalation discipline, motion restraint, perceptual QA methodology,
anti-recursion operational awareness, additive-complexity
skepticism, drift prevention, subsystem coherence preservation,
co-update doctrine, structural-lock thinking for apex canon, long-
session fatigue awareness.

**Do NOT import from BD (bad cross-contamination):** cinematic depth
escalation, curl/curvature topology sophistication, atmospheric
density layering, animation orchestration, "premium" polish,
expressive transitions, visual hero moments, dynamic tension,
experiential spectacle, the `bd-*` utility classes, the premium-
gold-glass palette, framer-motion / `motion/react` patterns, the
shadcn-style component machinery, the Supabase/Clerk/MapLibre stack.
YLP succeeds through quiet humanity. BD succeeds through controlled
experiential sophistication. Different products. Different registers.

What transfers — six filters Builder can run any proposed pass
through before touching code:

**1. Two-purpose motion filter.** BD's animation law admits motion
only when it serves trust or spatial continuity; decoration is
rejected on sight. YLP analog: motion serves either reading-
continuity (the page-curl says "you turned a page") or place-depth
(the parallax says "the room continues behind the paper"). Any
proposed motion outside those two purposes does not ship.

**2. Compose from inventory before inventing.** BD enumerates 30
canonical keyframes and requires new motion to compose from them
first. YLP's inventory is smaller and is already in `CLAUDE.md` §
Protected systems: five named animations on `::view-transition-old(paper)`
and one parallax variable. New motion must justify why the existing
six cannot express it. Default answer: they can.

**3. Reduced-motion guard ships in the same commit.** BD rejects
"we'll add the guard in a follow-up." Pass 425 already established
this for parallax. Any pass that adds visible motion — including CSS
transitions on hover/focus that produce transform or opacity-overlap
— ships with its `@media (prefers-reduced-motion: reduce)` block in
the same commit. Verify in DevTools → Rendering before commit.

**4. Single lamp, not stacked light sources.** BD's light hierarchy
is: one premium gold lamp from above, layered cool surfaces below,
one warm hero panel per screen. The perceptual audit's load-bearing
insight (`perceptual-audit-2026-05-12.md`) is the YLP parallel —
*"the lamp pool radial gradient is doing the warmth work, not the
bookshelf."* That means: the body's radial gradient is the lamp.
The paper is the surface. The desk is the room. Builder must not
add a second warmth source. If a pass introduces glow, halo, or
ambient color, ask which existing light source it replaces — never
which it adds to.

**5. Apex canon is structurally locked.** BD's `MOLANDJESUS_DESIGN_DECISIONS.md`
is structurally locked: no merges, splits, archives, renames; only
additive controlled edits when a fired phase requires them. YLP's
parallel apex canon is `docs/stacey-direction.md`. Treat it the
same way: do not "improve" Stacey's wording, do not consolidate her
phrases, do not infer new direction from old phrases. Additions to
that doc come from Stacey, not from a Builder pass.

**6. Co-update in the same pass.** BD's co-update rule: when a
load-bearing fact changes, the docs that contradict it get fixed in
the same commit. YLP analog: if Pass 446 changes how the dark-mode
CTA renders, the description of the CTA in `CLAUDE.md` § Posture
must be reconciled in the same pass — not in a follow-up.

These six filters are the methodology contribution from BD. They do
not change a single line of YLP's identity. They give Builder a
shared vocabulary for *why* a proposed change is rejected, which is
historically where YLP's drift has come from — drift always
arrived dressed as a reasonable next step.

---

## Caretaker reframe (operational mental model)

ChatGPT's framing, captured here because it changes how passes get
sized: "Bring the site to life" does not mean more visible design.
It means more believable humanity. Those are different directions.

The correct mental model is no longer *designer*. It is closer to
*caretaker slowly making a real place feel lived-in.* The strongest
future changes will probably be the ones nobody consciously
notices. That is not failure — that is the emotional register this
practice depends on.

Concrete consequence for pass sizing:

Healthy additions feel like quiet traces of stewardship — a better
real sentence, a gentler rhythm, subtle paper variation, authentic
microcopy, a carefully placed divider, real PDFs in Stacey's
language.

Unhealthy additions feel like creative-direction flexing —
decorative systems, atmosphere additions, engagement mechanics,
"premium polish," personality theater, cinematic escalation.

Pre-commit test for any pass: would a thoughtful human quietly
maintaining this site for ten years, with no designer present,
plausibly arrive at this change? If yes, keep it. If it reads as
"a designer made a deliberate choice here," push back.

This frame compounds with anti-patterns.md. Use both.

---

## First-pass grounding — exact coordinates

The audit role pre-located the source positions Builder needs for
the first three passes so the session does not begin with a hunt.
Pass 449 was pre-folded into prep (see
`docs/archive/dependency-audit-2026-05-12.md`); pass count shifts
accordingly.

### Pass 446 — dark-mode CTA visibility

The "hole punched through paper" CTA effect collapses in dark mode
because the CTA fill and the paper sheet are both near-black with
~5% L difference, and the bottom highlight that simulates the lift
edge is set very faint.

Relevant variables (all in `src/styles/global.css`):

| Variable                  | Line | Current value |
|---------------------------|------|---------------|
| `--dark-paper`            | 56   | `#161616`     |
| `--dark-cta-bg`           | 62   | `#050505`     |
| `--dark-cta-hover`        | 63   | `#000000`     |
| `--dark-cta-active`       | 64   | `#000000`     |
| `--dark-cta-highlight`    | 76   | `0.06`        |
| `--dark-cta-highlight-hover` | 77 | `0.08`        |

CTA rule itself: `.cta` block starts at `src/styles/global.css:418`.
The reduced-motion guard for it is at `:454`. The print stylesheet
override is at `:976`. Both should remain intact after the fix.

Three approaches the audit identified — Builder picks one or
combines, after looking at it on screen:

1. **Outline path.** Add `border: 1px solid var(--c-gold-soft);`
   to `.cta` inside the dark-mode blocks only (the
   `@media (prefers-color-scheme: dark)` and
   `:root[data-theme="dark"]` selectors at lines 125 and 167).
   Lightest perceptual change — the CTA reads as a defined affordance
   even when the inset-hole effect can't carry the contrast.
2. **Lifted highlight path.** Raise `--dark-cta-highlight` from
   `0.06` toward `0.14–0.18` and `--dark-cta-highlight-hover`
   correspondingly. The bottom rim becomes visible as a faint warm
   line, which is what the "hole punched in paper" effect needs to
   read.
3. **Tinted fill path.** Push `--dark-cta-bg` slightly away from
   `--dark-paper` along a warm axis (e.g. `#0d0a06`) so the fill
   carries a subtle warm tint that distinguishes it from the matte
   black sheet.

Recommended: 1 + 2 combined (outline + slightly-lifted highlight).
Approach 3 changes the metaphor — the "hole" should not be tinted,
it should be dark-with-edge.

Whichever path: keep the existing `prefers-reduced-motion` guard
intact. Verify in DevTools → Rendering → Emulate dark mode AND
reduced motion before commit.

### Pass 447 — OG + Apple touch meta-tag wiring (assets pre-rendered)

**Update 2026-05-12 — prep work:** Both PNGs were pre-rendered
from their SVG sources during the prep phase using ImageMagick
from the audit sandbox. They are on disk and verified visually
(see KI-003 in `docs/known-issues.md`):

- `public/og.png` — 1200×630, 407KB, paper-on-desk identity
  preserved through the render (cream paper, navy title, gold
  rule, italic tagline, attribution + domain)
- `public/apple-touch-icon.png` — 180×180, 2.4KB, RGB without
  alpha (iOS prefers this), favicon's gold rule on cream

That collapses Pass 447 and the original Pass 448 into one
pass: meta-tag wiring only. No image generation needed.

The single remaining edit in `src/layouts/BaseLayout.astro`
`<head>`:

```
<meta property="og:image" content="/og.png" />
<meta name="twitter:image" content="/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

Co-update: confirm `og:url`, `og:title`, `og:type`, and
`twitter:card` exist in the same head. Add in the same pass if
absent. Then close KI-003 in `docs/known-issues.md`.

If the og.png render looks wrong on your host (e.g. the gradients
render differently in Chrome's social-preview vs sandbox
ImageMagick), regenerate via your preferred tool — sharp +
resvg-js both work fine when not in this Linux-arm64 sandbox.

### Pass 448 — RECLAIMED

Original deliverable (apple-touch-icon export) was rolled into
Pass 447 since the PNG was pre-rendered alongside og.png. Pass
448 is now free — reuse the number for whichever Stacey phrase
landing fits best, or skip and advance the count.

### Project-build verification ceiling

Per the project root `CLAUDE.md` and Mola's working style: `npm run
build` from a Linux sandbox fails on rollup native-module mismatch
(arm64-linux vs darwin-arm64 from the host `npm install`). Don't
chase that. Verification ceiling inside the sandbox is `tsc
--noEmit` (or `astro check` if it works without the rollup binary).
Real build, real dev-server screenshot, real `prefers-color-scheme`
toggle all happen host-side. That is expected, not a problem.

### Dependency state (pre-Pass-449)

Captured at `docs/archive/dependency-audit-2026-05-12.md`. Summary:
7 moderate, 0 high, 0 critical. The Astro 5 → 6 upgrade is owner-
decision territory and a separate post-launch pass. The yaml
transitive chain is dev-tooling-only and resolvable via non-
breaking `npm audit fix` whenever convenient.

### Pass-numbering note

Because Pass 449 is pre-folded, the rest of the sequence in
"Recommended pass sequence" shifts up by one (Pass 450 → 449,
Pass 451 → 450, and so on) — OR Pass 449 simply gets used for
something else (an extra Stacey phrase landing, or a small
warmth pass). Builder's call. Either way, the count is just a
naming convention; the substance of the lanes does not change.
