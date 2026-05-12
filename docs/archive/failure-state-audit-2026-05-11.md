# Failure-state audit — 2026-05-11 (Pass 443)

Walked the cascade for every realistic load failure or
unsupported feature. The static-first architecture already does
the heavy lifting here; this audit verifies the graceful
degradation rather than adding new fallbacks.

## Resource-load failures

### Fonts (`@fontsource/eb-garamond`)
- Fontsource ships `font-display: swap` on every `@font-face`
  declaration.
- Tailwind serif stack: **EB Garamond → Garamond → Hoefler Text
  → Iowan Old Style → Times New Roman → serif**. Every modern OS
  has a usable serif fallback (Hoefler on macOS, Iowan on iOS,
  Garamond/Times on Windows, generic serif on Linux).
- Behavior on slow / failed font: ~100ms FOIT period, then text
  swaps to the fallback serif. When EB Garamond finishes
  loading, it swaps in. No layout jump, no invisible text past
  the swap window.

### `/library.svg` (body backdrop tile)
- Loaded as a `background-image` layer inside the body::before
  pseudo, stacked **underneath** four CSS-only gradient layers
  (lamp wash, shadow halo, corner vignette, dark-mode overlay).
- If the SVG fails: the gradients alone render. Light mode shows
  a warm-tan radial lamp wash on the body's `#e8e2d4` background.
  Dark mode shows the same gradients dimmed by the
  `--bg-overlay` near-opaque dark layer. In both cases the paper
  sheet (`.site-paper`) sits in front at `z-index: 1` and is
  fully readable.
- No "broken image" icon: SVG background-images degrade silently
  to the background-color underneath.

### `/favicon.svg`
- Browser shows no favicon. Bookmark bar / tab title still
  works. Cosmetic only.

### `/og.svg`
- Not currently referenced as `og:image` (held until PNG export
  per Pass 430). Social previews fall back to title + description,
  which is the current state regardless of the SVG's reachability.

## Feature-support failures

### `clip-path: shape()` (Firefox, older Chrome / Safari)
- The curl uses both `clip-path: shape(…)` and `-webkit-mask-image`.
  Browsers without `shape()` ignore that property and the linear
  mask-image alone defines the cut edge — the diagonal sweep
  remains, just without the bezier curl curve. Documented in
  CSS comments at line 538–540.

### `::view-transition-*` (Firefox)
- Firefox skips View Transitions entirely. Page swaps are
  ordinary full-page reloads. The curl pseudos never engage. Read
  the same content, just no transition animation.

### `@property` (very old Firefox / Safari)
- Without `@property`, `--curl-x` becomes a non-animatable custom
  property. The curl animation jumps between keyframes instead
  of interpolating. In practice this only matters if a browser
  supports both View Transitions and `shape()` but not
  `@property` — an empty intersection.

### `localStorage` blocked
- The pre-paint settings script wraps `JSON.parse(localStorage.getItem)`
  in `try/catch` (BaseLayout.astro line 56–60). If localStorage
  is blocked (Safari private mode, content blocker), the catch
  swallows the error and the site falls back to media-query-driven
  defaults (`prefers-color-scheme`, `prefers-reduced-motion`).

### JavaScript disabled
- Already audited in Pass 440. Static-first posture holds for
  every page except `/settings` (which carries a `<noscript>`
  notice).

## URL-level failures

### Malformed paths (`/whatever`)
- Astro static build emits `dist/404.html`. Vercel's default
  static-site serving routes unknown paths to `/404.html`
  automatically — no `vercel.json` needed.
- The 404 page renders inside `BaseLayout`, so it gets the same
  paper-on-desk treatment, library backdrop, header, and footer
  (including legal disclaimer) as every other page.

### Missing trailing slash (`/about` vs `/about/`)
- Astro emits `dist/about/index.html`. Vercel serves
  `/about/index.html` for both `/about` and `/about/`. No
  redirect needed; the `aria-current` matcher in BaseLayout
  normalizes trailing slashes (line 25-29 in BaseLayout.astro).

### `mailto:` link without configured mail client
- Contact page renders `stacey@theyellowlegalpad.co` as the link
  text itself, not "Email Stacey." If the user's `mailto:`
  handler isn't configured, the click does nothing visible but
  the address is on screen for manual copy. This is a
  deliberately accessible fallback.

## Findings

**Nothing requires code changes.** Every realistic failure mode
has a sensible degradation path already wired in. The body
background-color and gradient layers ensure the page is never
"blank"; the fallback font stack ensures text is never
"invisible"; the static 404 ensures bad URLs never error.

The one theoretical edge case — body bg-color is hardcoded
`#e8e2d4` (light-mode tan) and isn't theme-switched, so a
catastrophic CSS failure that wipes the body::before pseudo would
show tan briefly even in dark mode — is academic. body::before
renders from the same stylesheet as body itself; you can't lose
one without the other.

## Re-run trigger

Re-run if:
- A new external resource is added (third-party script, web
  component, embedded video)
- Vercel is replaced with a host that needs explicit 404 routing
- Theme tokens move out of CSS variables (currently they're all
  in `:root` / media queries / `data-theme` blocks)
