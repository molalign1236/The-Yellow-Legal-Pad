# TODO — Stacey Inputs

Worklist of placeholders and pending decisions. When Stacey or the
owner provides each piece, the swap is usually mechanical — find the
token, replace, commit.

---

## Done (resolved by the May 2026 handoff + subsequent passes)

| Item | Where it landed |
|---|---|
| Business name "The Yellow Legal Pad" | Title, header brand, footer, meta description (Pass 368) |
| Contact email `stacey@theyellowlegalpad.co` | `src/pages/contact.astro` (Pass 369) |
| Domain `theyellowlegalpad.co` | `astro.config.mjs` `site` set; canonical + og:url now ship (Pass 374) |
| Real packages — Clarity Session / Fresh Start / Complete Blueprint / Full Year | `src/pages/services.astro` (Pass 370) |
| Audience focus (women navigating transitions) | Home + About (Pass 371) |
| Tagline "Financial coaching for life's biggest transitions" | About page subhead (Pass 372) |
| Vero Beach, Florida + Zoom-medium mention | Footer brand line + contact-page copy |
| Brand palette navy `#1F3864` + gold `#B8860B` | `tailwind.config.mjs` + global.css variables (Pass 373) |
| Site-wide legal disclaimer | Footer on every page (Pass 368) |
| Light + dark mode | Auto via `prefers-color-scheme` + user override on `/settings` (Pass 394) |
| iBook-style page flip transition | View Transitions on `.site-paper` (Pass 395) |
| Curved page-curl transition (clip-path: shape + bezier) | global.css view-transition pseudos (Pass 401–419) |
| Library backdrop (hand-coded SVG, glass shelves, money objects) | `public/library.svg` (Pass 397–400) |
| Parallax respects motion preferences | BaseLayout.astro inline script (Pass 425) |
| Skip link no longer leaks on desktop | BaseLayout.astro `.skip-link` (Pass 425) |
| Forbidden advisor terms removed from Services | `src/pages/services.astro` (Pass 426) |
| Real guide titles on Resources | `src/pages/resources.astro` (Pass 427) |
| sitemap-index.xml + robots Sitemap directive | @astrojs/sitemap in astro.config (Pass 428) |
| OG image design source | `public/og.svg` (Pass 430) — PNG export still pending |
| Focus outlines pass WCAG 1.4.11 | `:focus-visible` switched to `--c-ink` (Pass 431) |
| Post-navigation focus for screen readers | `astro:after-swap` handler in BaseLayout (Pass 432) |
| `og:site_name` + `og:locale` for cleaner unfurls | BaseLayout head (Pass 433) |
| Print stylesheet keeps the legal disclaimer | global.css `@media print` (Pass 435) |
| Audit suite under `docs/` | contrast, keyboard, dependency, icon, deployment, cross-browser, touch-target, no-JS (Pass 429–440) |
| `<noscript>` notice on `/settings` | `src/pages/settings.astro` (Pass 440) |

---

## Open — waiting on Stacey or owner decision

### Calendly URL (high value)
The brief specifies the booking flow as: Discovery Call booked via
Calendly free tier (the only publicly bookable item). The current
path is `mailto:stacey@theyellowlegalpad.co` only.

When the URL lands, choose one of:
- **Direct link**: replace the home / about / services
  `href="/contact"` CTAs with the Calendly URL. Contact page keeps
  the email as a "if you'd rather not book yet" fallback.
- **Calendly on contact page**: keep `/contact` as the hub and add
  a Calendly link/button there alongside the email.

Brief Q11 (embed vs button) is still open. Recommend a plain button
opening Calendly in a new tab unless owner asks for embed.

### Full About page copy
The brief references `YellowLegalPad_AboutPage.docx` (approved). The
site currently carries a tonal draft, not the final approved copy.
When the docx contents arrive:
- Replace the Grampy story, "What she believes", "Who Stacey works
  with" with the approved text.
- Apply pull-quote styling to the four pull quotes the brief
  mentions.
- Render the "Careful savers / Late starters" two-column callout as
  side-by-side blocks (not a table).

### Privacy Policy
Brief Q13 recommends one. Needs real text from Stacey or a legal
source — a placeholder is worse than nothing here. Hold until
content lands.

### Pricing visibility
Brief Q2 is open. Current default: prices hidden; "talk about it on
the Discovery Call." If Stacey wants prices public, add price tags
to each `<article>` on `src/pages/services.astro`.

### Real Resources PDFs
`src/pages/resources.astro` lists Stacey's four real guide titles
as plain text (no links yet):
- Five Moves That Change Everything
- Where Did It All Go?
- Money as a Family
- Money and Your Partner

When Stacey provides each PDF:
1. Drop the file into `public/guides/` (e.g. `five-moves.pdf`)
2. Wrap the matching `<h3>Title</h3>` in `<a href="/guides/five-moves.pdf">`
3. The page-count caption ("about 6 pages") is a rough estimate —
   update when the real PDF is in hand.

### Brand imagery (Q4)
No headshot until after April 2027 (employer doesn't know about the
practice). Stacey will provide warm abstract imagery — legal pad and
pen, desk scene, natural textures. No stock photos of women.

Candidate placements:
- About page hero (above or beside the h1)
- Home welcome section
- Resources page header

### Last name (low priority)
Site reads "Stacey" everywhere. When a last name arrives, append in:
- Footer brand line in `src/layouts/BaseLayout.astro`
- Casual body mentions ("a small practice run by Stacey")

### Favicon refinement (low priority)
`public/favicon.svg` is a temporary placeholder. Stacey can replace
whenever she has a proper mark.

### Apple touch icon — iOS home-screen fallback
Per `docs/icon-audit-2026-05-11.md`: iOS Safari's "Add to Home
Screen" doesn't read SVG favicons. Export `favicon.svg` to a
180×180 PNG and drop at `public/apple-touch-icon.png`, then add
`<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`
inside `BaseLayout.astro`'s `<head>`. Until then, iOS home-screen
saves get a generic icon.

### Real fonts (optional)
Currently `@fontsource/eb-garamond` via npm. If the owner wants
licensed fonts (Söhne, etc.), drop into `public/fonts/` and update
the `@font-face` declarations.

### Open-Graph image — PNG export pending
`public/og.svg` is the canonical design source (Pass 430) — a
quiet ivory-paper-on-tan-desk 1200×630 composition with the
wordmark, tagline, and Vero Beach byline. It is intentionally not
yet referenced as `og:image` because the major social platforms
(Twitter, LinkedIn, Facebook) don't render SVG share previews.

To finish: export `og.svg` to `public/og.png` (1200×630), then add
to `BaseLayout.astro`:

```astro
<meta property="og:image" content="https://theyellowlegalpad.co/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://theyellowlegalpad.co/og.png" />
```

Stacey can do the conversion via any SVG-to-PNG tool (rsvg-convert,
Inkscape, Figma export, online converter) — no code change needed
until the PNG lands.

---

## How to swap, mechanically

```
# In yellow-legal-pad/:
grep -rn "stacey@theyellowlegalpad.co" src/
# edit, then:
git add -A && git commit -m "swap: Calendly URL replaces mailto"
```

Each swap is its own commit. Don't bundle unrelated changes.

---

## Anti-drift reminder

When Stacey provides her edits, **trust her cadence over what's
currently drafted**. Several pages still carry tonal drafts that
read in her voice range but were written by AI. Her exact phrasing
is the long-term authority of the site. Resist the temptation to
"improve" her edits — if something she writes feels less polished
than the AI draft, the AI draft is wrong, not her writing.
