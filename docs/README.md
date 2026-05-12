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
| `deployment-checklist.md` | Practical step-list for the first Vercel deploy (Pass 437). Pre-push validation, DNS, post-deploy smoke test, accessibility re-verification, search-console onboarding. Updated when the deploy workflow changes — not when the site does. |
| `cross-browser-audit-2026-05-11.md` | Static analysis of the stylesheet against Chrome / Safari / Firefox support matrices (Pass 438). Curl system's degradation paths verified intentional; no code changes needed. Re-run on new vendor-prefixed properties or Astro 6 upgrade. |
| `touch-target-audit-2026-05-11.md` | WCAG 2.5.8 (AA) + 2.5.5 (AAA) check on every interactive surface (Pass 439). All pass AA; AAA gap on inline nav links is intentional visual identity. Documented padding fix held as an option pending real-device feedback. |
| `no-js-audit-2026-05-11.md` | Walkthrough of every page with JS disabled (Pass 440). Static-first posture holds except on `/settings`; added a `<noscript>` paragraph there explaining the JS dependency. Re-run on new client-side hydration. |

When new context arrives that's longer than a passing note but
isn't a load-bearing rule (CLAUDE.md) or an owner-input checklist
(TODO_STACEY.md), drop it here so the root stays tidy.

Naming convention: `<kind>-<YYYY-MM-DD>.md` — audits, handoffs,
emotional-direction briefs all use the same datestamp pattern so
the folder lists chronologically.
