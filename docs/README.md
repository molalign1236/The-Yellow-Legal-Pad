# docs/

Reference material that informs how the site is written and built
but isn't itself part of the site or the agent brief. Nothing in
this folder ships to production.

| File | Purpose |
|---|---|
| `audit-2026-05-11.md` | Multi-AI audit dropped during the Pass 425–429 cycle. Lists P0/P1/P2 findings. P0 items were resolved in Passes 425–428; P1/P2 items are tracked in `TODO_STACEY.md`. Frozen — don't edit; archive next to a new audit when one happens. |
| `contrast-audit-2026-05-11.md` | WCAG contrast check on light + dark mode brand tokens (Pass 431). Flagged light-mode gold focus outlines as below 3:1; fixed by switching focus to `--c-ink`. Re-run when brand tokens change. |
| `keyboard-audit-2026-05-11.md` | Tab-only walkthrough of all seven pages (Pass 432). Removed a stray gold focus override on radios and added post-navigation focus so screen readers announce the new page after a View-Transition swap. Re-run when new controls land. |
| `dependency-audit-2026-05-11.md` | `npm audit` triage (Pass 434). All seven moderate vulns trace to either a dev-only chain (yaml in volar) or `define:vars` (unused). Production exposure is zero; deliberate Astro 6 upgrade pass deferred for owner sign-off. |
| `icon-audit-2026-05-11.md` | Favicon + device-icon survey (Pass 436). Modern desktop browsers read `favicon.svg` correctly; only real gap is iOS Home Screen which needs a `apple-touch-icon.png` export. Owner action noted in `TODO_STACEY.md`. |

When new context arrives that's longer than a passing note but
isn't a load-bearing rule (CLAUDE.md) or an owner-input checklist
(TODO_STACEY.md), drop it here so the root stays tidy.

Naming convention: `<kind>-<YYYY-MM-DD>.md` — audits, handoffs,
emotional-direction briefs all use the same datestamp pattern so
the folder lists chronologically.
