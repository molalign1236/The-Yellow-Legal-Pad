# No-JS audit — 2026-05-11 (Pass 440)

What happens when a visitor lands on the site with JavaScript
disabled (corporate firewall, content-blocker, NoScript add-on,
old assistive tech). The static-first promise of the project says
the site should still read.

## What JS the site uses

Three inline scripts in `BaseLayout.astro`:

1. **Pre-paint settings script** — reads `localStorage` for
   `data-theme` / `data-font-size` / `data-motion` overrides and
   applies them to `<html>` before first paint.
2. **Parallax script** — translates `--bg-parallax-y` based on
   scroll position so the library wall drifts at ~15% scroll
   speed.
3. **One inline script in `settings.astro`** — wires up the form
   to persist radio changes to `localStorage`.

Plus Astro's `<ClientRouter />` (~5KB gzipped) which handles
SPA-style page swaps and the curl transition.

## Behavior without JS

| Surface | With JS | Without JS |
|---|---|---|
| All page content | renders | **renders** ✓ |
| Header / footer / nav | works | **works** ✓ — links navigate normally |
| Page-curl transition | runs | **no transition** — full page reload |
| `prefers-color-scheme` dark mode | works | **works** ✓ — media query, no JS needed |
| Manual theme override (`/settings`) | persists | **doesn't persist** ✗ |
| Manual text-size override | persists | **doesn't persist** ✗ |
| Manual motion override | persists | **doesn't persist** ✗ |
| `prefers-reduced-motion` | respected | **respected** ✓ — media query |
| Library backdrop parallax | drifts | **stationary** — actually identical to motion-off state |
| Skip link → focus on `<main>` after navigation | works | **moot** — no SPA navigation |
| Mailto link on `/contact` | works | **works** ✓ — native `<a href="mailto:">` |

## Findings + fix

The only page that visibly fails without JS is `/settings` — the
form renders but clicking a radio has no effect and choices don't
save. Added a `<noscript>` paragraph at the top of the form
(Pass 440) explaining that the controls need JavaScript and that
the site itself reads fine without it, with dark mode falling back
to system preference.

All other pages are fully functional without JS. The static-first
posture is intact.

## Out of scope

- Browsers older than `<noscript>` support (~Netscape 4). Not a
  realistic audience.
- Bots / scrapers that execute JS partially. The static HTML is
  the source of truth — anything a partial-JS bot misses isn't
  load-bearing.

## Re-run trigger

Re-run if:
- A new page adds JS-only behavior
- The site starts depending on client-side hydration for content
  rendering (it currently doesn't — every page's text is in the
  static HTML)
