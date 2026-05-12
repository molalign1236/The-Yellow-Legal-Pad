# Contrast audit — 2026-05-11 (Pass 431)

WCAG 2.1 contrast check on the brand tokens against their paper
backgrounds. Method: standard sRGB relative-luminance formula.
Thresholds: 4.5:1 (AA body text), 7:1 (AAA body text), 3:1 (AA
non-text / large text / UI components).

## Light mode (ivory paper #f6f1e6)

| Token | Hex | Contrast | Verdict |
|---|---|---|---|
| `--c-ink` (body) | `#1F3864` | 10.3:1 | AAA |
| `--c-ink-soft` | `#39487a` | 7.4:1 | AAA |
| `--c-ink-muted` | `#4a577b` | 6.0:1 | AA, near-AAA |
| `--c-gold` | `#B8860B` | **2.9:1** | **fails 3:1 for UI** |
| `--c-gold-soft` | `#d6a635` | 2.3:1 | decorative only — fine |

Gold is reserved for rule lines, link underlines, and accent dots —
all of which are decorative and exempt from contrast requirements
(link text itself reads in ink). The one place gold was actually
acting as a UI affordance was `:focus-visible` outlines and the
`.skip-link:focus` outline. Both were switched to `--c-ink` in
Pass 431; focus rings now read at 10.3:1 against ivory.

## Dark mode (matte black paper #161616)

| Token | Hex | Contrast | Verdict |
|---|---|---|---|
| `--c-ink` (body) | `#dccfb0` | 11.7:1 | AAA |
| `--c-ink-soft` | `#c4bda9` | 9.7:1 | AAA |
| `--c-ink-muted` | `#918d7d` | 5.4:1 | AA |
| `--c-gold` | `#c9941f` | 6.7:1 | AA, near-AAA |
| `--c-gold-soft` | `#e6b545` | 9.2:1 | AAA |

Dark mode is comfortably above WCAG AA across the board and gold
passes 3:1 with room to spare, so no dark-mode-specific changes
were needed.

## Out of scope for this audit

- Page-curl transition pseudos: animation frames, not steady-state
  reading surfaces.
- Background library wall: decorative, sits below the paper sheet.
- CTA "hole-punched" buttons: the button text reads in ink and the
  recessed-hole shadow is purely decorative depth.

## Re-run trigger

Re-run if any of `--light-ink*`, `--light-paper`, `--dark-ink*`,
`--dark-paper`, or the brand gold tokens change. Brand colors are
owner-locked (CLAUDE.md §4), so this should be rare.
