# Cross-browser CSS audit — 2026-05-11 (Pass 438)

Static analysis of the stylesheet against the support matrices for
the cutting-edge features the curl system uses. No browser
launched — this is a code-level check. Real-device verification
remains gated on a live deploy.

## Feature support, present-day

| Feature | Chrome | Safari | Firefox | Used for |
|---|---|---|---|---|
| `mask-image` | ✓ (+ -webkit-) | ✓ (-webkit- required pre-17.4) | ✓ | Curl diagonal sweep |
| `-webkit-mask-image` paired | ✓ | ✓ | ✓ (legacy) | Safari fallback path |
| `clip-path: shape()` | 130+ | 18.4+ | not yet | Curved curl cut edge |
| `@property` | 85+ | 16.4+ | 128+ | Animating `--curl-x` |
| `::view-transition-*` | 111+ | 18+ | flag-gated | The entire curl pseudo |
| `inset: 0` shorthand | 87+ | 14.1+ | 66+ | Body backdrop pseudo |
| `prefers-reduced-motion` | ✓ | ✓ | ✓ | Three media queries cover it |
| `prefers-color-scheme` | ✓ | ✓ | ✓ | Dark mode auto-switch |

## Degradation paths (intentional)

- **Firefox** (no View Transitions in stable): navigation swaps
  the page instantly. The curl pseudos never engage, so the lack
  of `shape()` support doesn't matter. The site reads the same,
  just without the curl animation. ✓ acceptable.
- **Older Chrome / Safari pre-shape()**: View Transitions fires
  and the `-webkit-mask-image` linear gradient creates the
  diagonal sweep. The `clip-path: shape()` line is ignored, so
  the cut edge is the soft mask gradient instead of the bezier
  curve. Still reads as a page curl, just less geometrically
  refined. ✓ acceptable.
- **Older Firefox without `@property`**: would only matter if
  Firefox supported View Transitions and `shape()` but not
  `@property`, which is a non-existent intersection. Moot.

## Findings

### Nothing requires changing

- `mask-image` is paired with `-webkit-mask-image` everywhere
  (16 declarations, 8 pairs) so Safari renders the curl mask
  correctly.
- `-webkit-font-smoothing: antialiased` + `-moz-osx-font-smoothing: grayscale`
  cover the macOS / Firefox-on-Mac rendering pair on body.
- `appearance: none` + `-webkit-appearance: none` covers Safari
  on the Settings radios.
- Reduced-motion is handled three times: at `html` for scroll-
  behavior (line 210), at `.cta` for hover/active transitions
  (line 453), at the view-transition pseudos (line 907). The
  parallax JS in `BaseLayout.astro` also checks it. Complete
  coverage.
- `data-motion="off"` parallels `prefers-reduced-motion` for the
  user-override case (line 914).

### Soft observation, no fix recommended

- The body backdrop's radial gradients are sized in `vh` units
  (lines 248-264). On iOS Safari with the URL bar visible, the
  visible viewport is shorter than `100vh`, so the ellipses
  extend slightly past where they would on a desktop. Since this
  is a behind-paper backdrop (`z-index: 0`, `position: fixed`,
  `inset: 0`) and the paper sheet itself sits in front, the
  visual effect is unchanged for the reader. Migrating to `svh`
  would be theoretically tidier (Safari 16.4+, Chrome 108+,
  Firefox 101+) but adds no perceptible improvement. Hold.

### Out of scope until real-device QA

- Mobile Safari rubber-band scroll behavior with the parallax
  pseudo. Needs an iPhone.
- Android Chrome on small viewports — touch-target sizing audited
  separately in Pass 439.
- Live OpenType feature rendering of EB Garamond on Firefox vs.
  Safari — needs comparison screenshots, not a CSS check.
- Print preview rendering across browsers — print stylesheet
  audited in Pass 435 but not visually verified.

## Re-run trigger

Re-run if:
- A new vendor-prefixed property is introduced
- The curl system is reauthored
- Astro 6 lands and ClientRouter behavior changes
- A reported browser-specific rendering bug surfaces
