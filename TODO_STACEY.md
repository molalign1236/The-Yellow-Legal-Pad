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
| Audit suite under `docs/` | contrast, keyboard, dependency, icon, deployment, cross-browser, touch-target, no-JS, reading-ecology, failure-state (Pass 429–443) |
| `<noscript>` notice on `/settings` | `src/pages/settings.astro` (Pass 440) |
| Anti-patterns reference for future contributors | `docs/anti-patterns.md` (Pass 444) |
| Father vs grandfather (Stacey's May 2026 punch list #1) | All `src/pages/*.astro` (Pass 464–465) |
| Mobile atmosphere visible (punch list #2) | `.site-paper` mobile margin in `src/styles/global.css` (Pass 466) |
| Final About copy — "desk in the hallway and a yellow legal pad" | `src/pages/about.astro` (Pass 467); fabricated cousins/neighbors and "no brokerage" removed; silver Cross pen added |
| Kitchen-table fabrication removed site-wide | `src/pages/index.astro`, `src/pages/services.astro` (Pass 468) |
| Pricing visibility on Services (punch list #3) | $197 / $397 / $697 / $1,697 + durations on each pathway; `.pathway__price` style (Pass 469) |
| Yellow legal pad visual reference (punch list #4) | `.pull-quote` element: faint yellow tint + brick-red left margin rule, in `src/styles/global.css` (Pass 470) |
| Philosophy quotes elevated (punch list #5) | Pull-quote placements on `/index` ("financially underserved") and `/about` ("Permission matters / ziplock bag"); full essay on new `/philosophy` page (Pass 470, 472) |
| Paragraph spacing tightened on /about (punch list #6) | Per-route nudge to `.section` + `.section-rule` in `src/styles/global.css` (Pass 471, then extended to /philosophy + /home in Pass 474, then tightened further on owner verdict in Pass 477) |
| Philosophy essay page | `src/pages/philosophy.astro` with five sections + corrected origin redux; nav + footer entries (Pass 472) |
| /philosophy intro emphasis on "whether the life you're building matches the one you actually want" | Inline `<em>` in `src/pages/philosophy.astro` intro paragraph (Pass 475, owner-led) |
| /about lunch-making vignette + "$28 salad" line removed (owner correction) | `src/pages/about.astro` — section now ends on "The practice she runs today is carrying that forward" (Pass 476, owner-led) |
| Section/text alignment unified across essay pages | `/about`, `/services`, `/resources` no longer switch between `.column` and `.column-wide` mid-page. Essay pages (`/about`, `/philosophy`, `/services`, `/resources`) now all use `.column-wide`; sparse pages (`/`, `/contact`, `/settings`, `/404`) all use `.column`. Owner observation: left-edge of section headings + paragraphs was jumping between sections (Pass 478, owner-led) |
| Home audience aperture opened | `src/pages/index.astro` — "She works mostly with women navigating a transition" → "with people navigating a transition." Transition list preserved; /about and /philosophy still name women navigating transitions as the center of gravity (Pass 479, owner-led) |
| About h1 + credentials paragraph + "The Inspiration" split | `src/pages/about.astro` — h1 → "About Stacey"; new credentials paragraph above the father story (HNW client work, three small businesses, retiring at 56); new "The Inspiration" h2 introduces the desk story. Privacy posture unchanged — no headshot, employer not named, father's exact age soft (Pass 480, owner-led) |
| Services comparison table | `src/pages/services.astro` — five-row × four-column table above pathway articles: Price, Total time, Sessions, Written follow-up, Email support across Clarity / Fresh Start / Complete Blueprint / Full Year. Thin gold rules, no card chrome, horizontal scroll on narrow widths (Pass 481, owner-led) |
| Resources guide-library framing | `src/pages/resources.astro` — one-line intro: "Clients receive guides relevant to their situation as part of their sessions. A few are available here to browse." Sets the right expectation; PDF anchors still pending (Pass 482, owner-led) |
| Design on paper — namesake brought to the surface | Owner direction superseded the Pass 479 mobile-ink attempt (read as bleed-through). Landed instead as: paper-grain alpha bump 0.035 → 0.055 + new `.site-paper::after` ruled lines at ~1.75rem (Pass 483); ruled lines pause behind text-bearing blocks and chrome regions so text reads cleanly (Pass 484); faint letterpress "YLP" monogram in the lower-right of the sheet, light-mode desktop only (Pass 485) |

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

### ~~Full About page copy~~ — opening rewrite landed Pass 467
~~The brief references `YellowLegalPad_AboutPage.docx` (approved).~~
Pass 467 replaced the opening story section verbatim with Stacey's
May 2026 "desk in the hallway and a yellow legal pad" copy
(provided in the punch list as the canonical replacement). Two
remaining sub-items are not yet covered by Stacey-sourced text and
remain open:
- "What she believes" — current body text is the Pass-394-era
  philosophy paragraphs. May want a fresh Stacey-written version
  once the /philosophy essay (Pass 472) has been sitting on the
  site for a while and she sees what's worth re-stating on /about.
- "Careful savers / Late starters" two-column callout — never
  built; no source text from Stacey for it. Hold.

### Privacy Policy
Brief Q13 recommends one. Needs real text from Stacey or a legal
source — a placeholder is worse than nothing here. Hold until
content lands.

### ~~Pricing visibility~~ — landed Pass 469
~~Brief Q2 is open.~~ Confirmed in Stacey's May 2026 punch list:
prices are PUBLIC ("transparent pricing is part of the 'no agenda,
no surprises' philosophy"). Pass 469 added `.pathway__price` lines
under each `<h3>` on `src/pages/services.astro`: Clarity $197,
Fresh Start $397, Complete Blueprint $697, Full Year $1,697.
Discovery Call confirmed free, 20–30 minutes.

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

### ~~Apple touch icon — iOS home-screen fallback~~ — landed Pass 447
~~Per `docs/icon-audit-2026-05-11.md`: iOS Safari's "Add to Home
Screen" doesn't read SVG favicons. Export `favicon.svg` to a
180×180 PNG and drop at `public/apple-touch-icon.png`, then add
`<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`
inside `BaseLayout.astro`'s `<head>`.~~

### Real fonts (optional)
Currently `@fontsource/eb-garamond` via npm. If the owner wants
licensed fonts (Söhne, etc.), drop into `public/fonts/` and update
the `@font-face` declarations.

### ~~Open-Graph image — PNG export pending~~ — landed Pass 447
~~`public/og.svg` is the canonical design source (Pass 430). PNG
export landed during prep (`public/og.png`, 1200×630); meta tags
wired in Pass 447 (`og:image`, `og:image:width`,
`og:image:height`, `og:image:alt`, `twitter:image`); `twitter:card`
upgraded to `summary_large_image`.~~

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
