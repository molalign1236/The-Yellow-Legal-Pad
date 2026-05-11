# Icon audit — 2026-05-11 (Pass 436)

What ships in `public/`:

| File | Used by |
|---|---|
| `favicon.svg` | Modern browsers via `<link rel="icon" type="image/svg+xml">` |
| `og.svg` | Design source for the not-yet-wired-up OG image |
| `library.svg` | Body backdrop |

What modern browsers + iOS resolve from this:

- **Chrome / Firefox / Safari desktop / Edge** — read `favicon.svg`
  and render it crisply at any zoom. ✓
- **Safari iOS Home Screen "Add to Home Screen"** — does NOT
  read SVG favicons. Falls back to a screenshot of the page or
  a generic browser icon. No `apple-touch-icon.png` exists.
- **Android Chrome Home Screen** — same story. Also looks for a
  `manifest.webmanifest` with `icons[]` entries.
- **Old IE / very old crawlers** — look for `favicon.ico` at the
  site root. Not present.

## Decision

For a small marketing site, the only realistic gap is
`apple-touch-icon.png`. iOS users who save the site to their home
screen would get the page-screenshot fallback, which looks
unprofessional for a financial-coaching practice.

No PWA / manifest / install-prompt is appropriate — this is a
document people read, not an app. Don't add `manifest.webmanifest`.

## To close (owner / Stacey action)

Export `public/favicon.svg` to a 180×180 PNG and drop at
`public/apple-touch-icon.png`. Then add to `BaseLayout.astro`
inside the existing `<head>`:

```astro
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

The favicon.svg composition (ivory rect + short gold rule) is the
canonical icon mark — any PNG export should preserve that
geometry. Recommend rendering at 1024×1024, then exporting at
180×180 for crisp downscaling.

`favicon.ico` for ancient browsers can be deferred indefinitely —
modern crawlers and analytics tools all read the SVG.

## Out of scope

- Splash screens (`apple-touch-startup-image`)
- Microsoft Tile config (`browserconfig.xml`)
- Pinned-tab `mask-icon` (Safari, mostly deprecated)

None of these matter for a small practice site.
