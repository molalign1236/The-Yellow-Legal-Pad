# Perceptual audit — 2026-05-12

Browser-based audit done after Pass 445. Two parts: (1) live
rendered observation across viewports and modes, (2) a small
decision lab that injected CSS overrides to compare bookshelf
variants directly. Frozen reference — don't edit; archive next
to a new audit when one happens.

This doc exists because earlier audit passes were speculative
against the codebase narrative. This one is grounded in screenshots
and direct variant comparison via DevTools-style overrides. Both
sections are evidence-anchored, not philosophy.

---

## Part 1 — Perceptual findings

Observed live at `localhost:4321` at 1440×900 desktop, 390×844
mobile, light and dark modes, repeated navigation across all seven
pages.

### What the eye actually does on first load (desktop, light, /)

Eye-track order observed in the rendered screenshot:

1. Bookshelf books, left half (saturation pulls focus first)
2. Bookshelf books, right half (symmetric pull)
3. The paper sheet as a rectangle (registers as frame, not content)
4. The H1 "The welcome mat is out."
5. Body paragraphs
6. Wordmark top-left
7. Nav top-right

The bookshelf wins attention before the content does. The paper
reads as figure-on-ground losing to the bookshelf-as-figure. This
was verified by direct viewing, not inferred.

### What earlier audits got wrong

Three concrete corrections to prior speculation:

- The CTA (`.cta`, inset-shadow "hole punched through paper"):
  prior audit speculated this would dominate attention. Rendered,
  it's one of the **least** loud elements. Soft cream-tan pill, sits
  flat against the paper. Reads as an aged stamp, not a button.
  Correct atmosphere for the register. Do not adjust.
- The lamp pool radial gradient (`body::before` first layer):
  prior audit speculated theatrical lighting risk. Rendered, it's
  imperceptible during reading and only registers in empty space
  between sections. Successful atmospheric design. Protect.
- The paper-stack box-shadow illusion (~14 layered shadows on
  `.site-paper` at desktop): prior audit speculated overdesigned
  depth. Rendered, the offset shadows are subtle enough that I
  almost missed them. Believable "stack of sheets" without
  insisting. Keep.

### Mobile vs desktop — the most important finding

At 390×844 viewport: the bookshelf almost entirely disappears.
Paper sheet expands to nearly fill the viewport width; only thin
tan margins remain. Visible bookshelf side area collapses from
~480px per side (desktop) to ~20px per side (mobile), and most of
that gets covered by paper edge shadows anyway.

Practical consequence: the site is two different products at two
different viewport sizes.

- **Mobile**: a calm cream document on a quiet tan margin. The
  kitchen-table-document register the brief described. Already
  correct.
- **Desktop**: a paper sheet floating in a study scene with visible
  plants and books and a warm overhead lamp. A different product,
  handsome but not kitchen-table.

The bookshelf is, in practice, a desktop-only embellishment on top
of an otherwise-correct site. Mobile users already get the brief's
target experience without any change.

### Dark mode

Switched via `/settings` → Always dark. Verified observations:

- Bookshelf dims to near-invisibility (`var(--bg-overlay)` overlay
  at `rgba(10,10,10,0.82)` pushes library imagery down to roughly
  15–20% of light-mode visibility). The bookshelf becomes
  atmospheric in dark mode in a way it never is in light mode.
- Paper at `#161616` (matte black), ink at `#dccfb0` (warm cream).
  Cream-on-matte-black reads as warm reading-lamp light, not as
  cold UI. Successful.
- Lamp pool radial gradient becomes the dominant atmospheric
  element — visible as warm cream pool centered above paper.
- **Real bug**: `.cta` "hole punched through paper" effect depends
  on shadow-vs-paper contrast. On near-identical near-black
  surfaces, the inset shadows produce almost no visible depth.
  The CTA becomes nearly invisible. Needs a thin gold outline in
  dark, or a slightly lighter paper-tinted fill, or a different
  treatment that doesn't rely on contrast that doesn't exist.

Dark mode is otherwise the most coherent of all current modes.
The bookshelf naturally recedes; the page-as-lit-paper claim
finally lands.

### Page-curl reality test

Navigated with curl on (default), then with `data-motion="off"`
via `/settings`. Compared click-cadence navigation rapidly.

Honest finding: **no consciously perceptible difference at click
cadence**. With the curl on, I did not register a curl during
normal click navigation. With motion off, the page just changed.
These felt identical to me.

The 380 lines of CSS driving the curl (`global.css:529–905`) are
producing an effect that operates below conscious detection at
normal browsing speed. Not necessarily a problem, but the
investment ratio is asymmetric to perceptual payoff.

---

## Part 2 — Decision lab: bookshelf variants compared

Four variants tested live via injected CSS overrides on /. No
permanent code changes made. Screenshots captured at each.

### Variants

- **A (current)** — bookshelf at full saturation, no overlay.
  Baseline.
- **B (no bookshelf)** — `--bg-overlay` set to opaque desk color
  `rgba(232, 226, 212, 1)`. Library svg layer hidden beneath. Lamp
  pool + halo + vignette + paper grain + paper-stack shadows
  remain.
- **C20 (~80% overlay)** — bookshelf reduced to ghost-pale
  architectural pattern. Books recognizable as shapes but
  desaturated.
- **C35 (~65% overlay)** — bookshelf as pastel-tinted presence.
- **C50 (~50% overlay)** — bookshelf still visibly saturated,
  slightly tamer.
- **D (cinematic push)** — `filter: saturate(1.35) contrast(1.10)
  brightness(0.96)` on `body::before`. Books shouted; paper felt
  secondary; site read as a stylized backdrop.

### Ranked judgments — same ordering across every criterion

| Criterion | Strongest → weakest |
|---|---|
| Emotional honesty | B > C20 > C35 > A > C50 > D |
| Trust under emotional stress | B > C20 > C35 > A > C50 > D |
| Shame reduction | B > C20 > C35 > A > C50 > D |
| Coaching-mission alignment | B > C20 > C35 > A > C50 > D |
| Long-session reading comfort | B = C20 > C35 > A > C50 > D |
| Warmth without manipulation | B > C20 > C35 > A > C50 > D |
| Future-contributor survivability | B > C20 > C50 > A > C35 > D |

Variant B wins consistently. Variant D consistently worst. Variant
A (current) sits in the lower half.

### Central observation behind those rankings

The **lamp pool radial gradient is doing the warmth work, not the
bookshelf**. In variants B and C20, the lamp becomes visible and
the paper reads as lit from above — the actual atmospheric warmth
the brief describes. In variant A, the lamp is washed out by
competing saturation from the books.

Removing the books does not remove warmth. It reveals warmth that
the bookshelf was hiding.

The brief said "warmth, dimensionality, comfort, depth,
room-feeling." The system already delivers those via lamp +
paper-stack + grain + vignette. The bookshelf adds literal
study imagery on top of an already-working atmospheric stack.

### Recommended treatment

Removal is strongest. If full removal is too aggressive for owner
taste, the only acceptable fallback is C20 (books as ghost-pale
architectural pattern). Do not split the difference at 50% — that
retains credentialed-authority reading without the visual interest
of full bookshelf. Worst of both directions.

Ranked: **remove > C20 > everything else**.

---

## Part 3 — Punch list (small)

Items below are evidence-anchored. Each maps to either a real bug
or a verified perceptual finding. No speculative items.

1. **Bookshelf decision (owner call)** — remove entirely OR reduce
   to C20-equivalent. Mechanical change: override `--bg-overlay` in
   light mode to either fully opaque desk color or ~0.8 alpha.
   Today's `global.css:111` keeps `--bg-overlay` undefined in light;
   adding a value would dim the library beneath without touching
   the lamp/halo/vignette layers above. Parallax script becomes
   dead code if the bookshelf goes; remove with it.
2. **Dark-mode CTA visibility** — `.cta` becomes near-invisible at
   `data-theme="dark"` because the inset-shadow metaphor collapses
   on near-identical near-black surfaces. Real bug. Suggest: thin
   gold outline in dark, OR a slightly lighter paper-tinted fill,
   OR a different treatment for dark mode only. Small CSS.
3. **Page-curl scope** — verifiably imperceptible at click cadence.
   Either keep as-is (no harm, just dead-weight maintenance) or
   replace with a simple cross-fade and remove ~380 lines of CSS.
   Do not iterate further. The curl is currently the one signature
   animation; it should remain an exception, never a precedent.

That's it for the perceptual surface. Everything else the site
does, it does well — typography ladder, prose measure, mobile
rhythm, dark-mode warmth, lamp pool, paper-stack illusion, focus
rings, paper grain, footer compliance, settings page, the
mailto-only contact flow.

---

## Why this doc exists and what it isn't

This doc is **not** another architectural philosophy pass. The
existing audit set in this folder is already at the healthy
maximum, and Pass 445 explicitly held position against producing
more docs in the existing shape. The findings here are recorded
because they came from live browser observation that the prior
audits hadn't done, and because the bookshelf decision and the
dark-mode CTA bug are real items that needed to land somewhere
the next contributor would find.

No new "principles," no new categories, no new design language
declarations. The site has all the philosophy it needs. What it
still needs is one owner decision (bookshelf) and one small fix
(dark CTA).

After those, the next truth source is real visitor feedback, not
more audit prose.
