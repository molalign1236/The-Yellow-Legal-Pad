# docs/

Reference material that informs how the site is written and built
but isn't itself part of the site or the agent brief. Nothing in
this folder ships to production.

## Active reference (read these first)

| File | Purpose |
|---|---|
| `builder-handoff-2026-05-12.md` | **Read first if you're a Builder AI.** Three autopilot lanes, owner-pending table, recommended pass sequence, methodology lens borrowed from BD (six pre-commit filters + caretaker reframe), and § First-pass grounding with file:line coordinates for Pass 446–448. |
| `builder-master-prompt-2026-05-12.md` | The exact prompt to paste into a fresh Builder Claude Code session. Persisted so it survives chat scroll. Carries the methodology lens and caretaker frame inline. |
| `stacey-direction.md` | **Apex canon — structurally locked.** Stacey's voice in her own words, consolidated from her uploaded brief. Read before any content, copy, or atmospheric decision. Additive controlled edits only via `docs(stacey):` commits citing new Stacey-sourced material. |
| `known-issues.md` | Lightweight bug + sandbox-limitation tracker. KI-### IDs. KI-001 (dark-mode CTA) is what Pass 446 closes. KI-P01 + KI-P02 are permanent sandbox boundaries. |
| `perceptual-audit-2026-05-12.md` | Browser-based audit after Pass 445. Variant lab comparing bookshelf treatments via injected CSS overrides. Surfaces three real items: bookshelf treatment (owner call), dark-mode CTA visibility bug, page-curl scope. Load-bearing finding: "the lamp pool radial gradient is doing the warmth work, not the bookshelf." |
| `anti-patterns.md` | **Read before proposing additions.** Catalogue of changes considered and deliberately rejected: analytics, blog system, intake forms, embedded paid scheduling, stock photos, cookie banner, search input, etc. Each entry includes the reason it's tempting and the actual cost. |
| `deployment-checklist.md` | Practical step-list for the first Vercel deploy. |

## Archived audits (`archive/`)

Frozen reference material from the May 2026 audit cycle (Passes
429–443). Each was its own focused pass; collectively they verified
the site's structural correctness across accessibility, contrast,
keyboard navigation, dependency state, icon support, cross-browser
behavior, touch targets, no-JS posture, reading-ecology rhythm,
and failure-state degradation.

| File | Pass | Purpose |
|---|---|---|
| `archive/audit-2026-05-11.md` | 429 | Multi-AI audit dropped during the Pass 425–429 cycle. Lists P0/P1/P2 findings. P0 items were resolved in Passes 425–428; P1/P2 items are tracked in `TODO_STACEY.md`. |
| `archive/contrast-audit-2026-05-11.md` | 431 | WCAG contrast check on light + dark mode brand tokens. Flagged light-mode gold focus outlines as below 3:1; fixed by switching focus to `--c-ink`. Re-run when brand tokens change. |
| `archive/keyboard-audit-2026-05-11.md` | 432 | Tab-only walkthrough of all seven pages. Removed a stray gold focus override on radios and added post-navigation focus so screen readers announce the new page after a View-Transition swap. |
| `archive/dependency-audit-2026-05-11.md` | 434 | `npm audit` triage. All seven moderate vulns trace to either a dev-only chain (yaml in volar) or `define:vars` (unused). Production exposure is zero; deliberate Astro 6 upgrade pass deferred for owner sign-off. |
| `archive/icon-audit-2026-05-11.md` | 436 | Favicon + device-icon survey. Modern desktop browsers read `favicon.svg` correctly; only real gap is iOS Home Screen which needs a `apple-touch-icon.png` export. |
| `archive/cross-browser-audit-2026-05-11.md` | 438 | Static analysis of the stylesheet against Chrome / Safari / Firefox support matrices. Curl system's degradation paths verified intentional; no code changes needed. |
| `archive/touch-target-audit-2026-05-11.md` | 439 | WCAG 2.5.8 (AA) + 2.5.5 (AAA) check on every interactive surface. All pass AA; AAA gap on inline nav links is intentional visual identity. |
| `archive/no-js-audit-2026-05-11.md` | 440 | Walkthrough of every page with JS disabled. Static-first posture holds except on `/settings`; added a `<noscript>` paragraph there explaining the JS dependency. |
| `archive/reading-ecology-audit-2026-05-11.md` | 442 | Prose width, heading density, CTA cadence, paragraph rhythm. Site sits in classical reading-measure range; only two CTAs across seven pages, correctly. |
| `archive/failure-state-audit-2026-05-11.md` | 443 | Cascade walk for font / SVG / View-Transitions / localStorage / JS / URL / mailto failures. All degrade gracefully through existing fallback chains. No code changes needed. |
| `archive/dependency-audit-2026-05-12.md` | pre-446 | Pre-Pass-449 capture of `npm audit` state, folded into prep so Pass 449 can be reused. 7 moderate / 0 high / 0 critical; Astro 5 → 6 deferred as owner-decision post-launch pass. |

## When to add a new doc here

New context drops here only when it's:
- Longer than a passing note
- Not a load-bearing rule (those go in `/CLAUDE.md`)
- Not an owner-input checklist (that's `/TODO_STACEY.md`)
- Not implementation code (that's `src/`)

Reference docs that turn out to be evergreen stay at this folder's
root. Dated audits and handoffs that capture a moment in time get
archived to `archive/` once their P0 items are resolved.

## Naming convention

`<kind>-<YYYY-MM-DD>.md` — audits, handoffs, emotional-direction
briefs all use the same datestamp pattern so the folder lists
chronologically. Active reference docs (anti-patterns,
deployment-checklist, stacey-direction) don't get datestamps
because they're maintained rather than frozen.
