# Reading ecology audit — 2026-05-11 (Pass 442)

Static analysis of the site's reading conditions: prose width,
heading density, CTA cadence, paragraph rhythm. Aimed at verifying
the site still supports calm, multi-minute reading the way its
copy promises.

## Prose width

| Token | Value | Purpose |
|---|---|---|
| `--measure-prose` (`.column`) | `38rem` ≈ 608px | Body prose — Home, About, Contact, Services intro, Resources copy |
| `.column-wide` | `44rem` ≈ 704px | Multi-block layouts — Services packages, Resources guide list |
| `.site-paper` content | `min(60rem, …)` | Outer paper sheet (the cards) |

At the body font-size of 1.125rem (~18px), `.column`'s 608px
yields **~65–75 characters per line**, sitting comfortably in the
classical "ideal reading measure" range (45–75 chars per line).
The `.column-wide` 704px yields ~78–88 chars; slightly looser but
still inside the "comfortable" band, and only used for grid-like
content where the eye is scanning between blocks rather than
reading prose line-after-line.

On narrow viewports the columns collapse to viewport width minus
padding — text reflows naturally to 35–50 chars per line, which
remains in healthy reading range.

## Heading density (per page)

| Page | h1 | h2 | h3 | Sense |
|---|---|---|---|---|
| Home | 1 | 0 | 0 | calm — single arrival |
| About | 1 | 2 | 0 | calm — story, beliefs, audience |
| Services | 1 | 3 | 4 | densest — necessary to label 4 packages + 3 framing sections |
| Resources | 1 | 1¹ | 4 | calm — one guide per `<h3>` |
| Contact | 1 | 0 | 0 | calm — book + after-you-write |
| Settings | 1 | 0 | 0² | calm — fieldset legends carry semantics |
| 404 | 1 | 0 | 0 | calm |

¹ Visually-hidden h2 ("Guides") for screen-reader sectioning.
² Three `<legend>` elements act as headings inside fieldsets.

Services is the heaviest page; that's intentional and necessary
for the four-package structure. Every other page sits at 1–3
headings total — the site genuinely is mostly prose, not
section-fragmented chrome.

## CTA cadence

Counted `.cta` button elements across all pages:

| Page | CTAs | Where |
|---|---|---|
| Home | 1 | Welcome → Discovery Call |
| About | 1 | End of About narrative |
| Services | 0 | "talk about it on the Discovery Call" is an inline link |
| Resources | 0 | "Book a Discovery Call" is an inline link in the closing prose |
| Contact | 0 | The email address IS the action |
| Settings | 0 | n/a |
| 404 | 0 | Three inline recovery links |

**Two CTAs across the entire site.** That's an unusually low
density for a marketing site, and it's correct here — the
practice is conversation-led, not conversion-funnel-led. The
absence of CTAs on Services, Resources, and Contact is
deliberately doing tonal work: there's no "BOOK NOW" pressure
breaking the reading rhythm.

## Paragraph rhythm

- `p { margin-bottom: 1rem; }` desktop, `1.125rem` on narrow
  viewports (line 396–402). Mobile gets slightly more
  inter-paragraph breath, which compensates for compressed line
  lengths.
- `p + p.caption { margin-top: -0.5rem; }` pulls captions
  closer to the paragraph they belong to — preserves the
  paragraph-caption pairing as one visual unit.
- Body line-height is `--line-height-body: 1.65` (line 117).
  Generous; sits between newspaper (1.3) and editorial-magazine
  (1.7). Right for serif prose at 18px.

## Footer emotional weight

The footer carries:
- Five nav links in a horizontal row at 0.9375rem
- Legal disclaimer in `.caption` (smaller, ink-soft color)
- Brand line: "The Yellow Legal Pad · Stacey · Vero Beach, Florida"

The disclaimer is necessarily heavier in word-count than the
brand line, but the muted color + smaller font keep its visual
weight lower than the nav. Compliance-required text doesn't
visually dominate the closing of the page. Correct.

## Out of scope (needs real device + real eyes)

- Long-scroll fatigue across actual reading durations
- Mobile thumb-zone considerations during scrolling
- Caption legibility under low ambient light
- Whether the rhythm holds up under genuinely tired reading

## Re-run trigger

Re-run if:
- New page types are added (FAQ list, blog index, longform
  article) — these have different rhythm needs
- Body font-size changes
- `.column` or `.column-wide` widths are retuned
- CTA count crosses ~5 across the site (sign of conversion-funnel
  drift)
