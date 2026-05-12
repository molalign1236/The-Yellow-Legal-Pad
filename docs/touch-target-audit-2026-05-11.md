# Touch-target audit — 2026-05-11 (Pass 439)

Measured every interactive element on the rendered site against
WCAG 2.5.8 AA (24×24 CSS px) and 2.5.5 AAA (44×44 CSS px). All
measurements are CSS-pixel calculations from the actual stylesheet
geometry; not browser-measured.

## Targets and computed hit areas

| Target | Where | Height | Width | AA (24×24) | AAA (44×44) |
|---|---|---|---|---|---|
| `.cta` button | Home, About, etc. | ~50px | text + 56px | ✓ | ✓ |
| `.site-header__brand` | Header | ~29px | "The Yellow Legal Pad" | ✓ | ✗ (height) |
| `.site-header__link` | Header nav | ~25px | text-width (30–70px) | ✓¹ | ✗ |
| `.site-footer__link` | Footer nav | ~25px | text-width (30–70px) | ✓¹ | ✗ |
| `.contact-email a` | Contact | ~33px | ~280px | ✓ | ✗ (height) |
| Settings radios + label | `/settings` | ~38px | full-row | ✓ | ✗ (just under) |
| Skip link (when shown) | All pages | ~39px | ~150px | ✓ | ✗ (just under) |

¹ Passes via the WCAG 2.5.8 spacing exception: column gap is
1.5rem (24px) and row gap is 0.75rem (12px), so the 24-pixel
circle centered on each adjacent target doesn't intersect the
next one's circle.

## Findings

### Nothing fails AA

Every interactive element on the site meets WCAG 2.5.8 AA, either
directly through size (CTAs comfortably, inline links via the
~25px text height) or through the spacing exception (nav links
separated by ≥24px gaps).

### AAA (44×44) gap is intentional

Header and footer nav links sit at ~25px tall. Increasing to 44px
AAA would require ~10px additional vertical padding on every nav
link, which would change the calm tight-baseline rhythm the
header was deliberately tuned to. The visual identity of the site
treats navigation as "small marks at the top of a page of writing,"
not "button strip across a chrome bar." That intent is load-bearing.

The CTAs already exceed 44×44, so the primary call-to-action
surfaces (Discovery Call buttons) are fully AAA-compliant.

### Real-device validation pending

These are CSS-pixel calculations. The actual decision on whether
to enlarge nav hit areas should come from real iPhone / Android
usage feedback. Older users on mobile may struggle with 25px
inline links even when WCAG-compliant. If that happens, the fix
is to add `padding: 0.375rem 0.125rem` to `.site-header__link`
and `.site-footer__link` — that brings them to ~37px tall without
changing the visible text-decoration rhythm. Hold this option
for after real-device QA.

## Re-run trigger

Re-run if:
- Real-device feedback reports difficulty tapping nav links
- A new interactive element lands (e.g. Calendly button, contact
  form) — measure that target specifically
- Nav typography or spacing tokens change
