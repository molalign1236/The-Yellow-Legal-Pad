# Keyboard + focus audit — 2026-05-11 (Pass 432)

Walked the seven pages on tab-only navigation with the developer
tools' a11y panel open. Findings + fixes applied this pass.

## Findings

### Pass — already correct
- **Skip link** anchors to `#main-content`, hidden off-canvas via
  `position: fixed; top: -3rem`, becomes visible on first Tab.
  Confirmed working in light + dark.
- **Header nav** sets `aria-current="page"` on the active route.
- **Footer nav** is a separate landmark with `aria-label="Footer"`.
- **Settings form** uses `<fieldset>` + `<legend>` for radio
  groups — screen readers announce "Color mode, group, Always
  light, radio button" correctly.
- **No focus traps** — every interactive can be exited with Tab.
- **No `tabindex` > 0** anywhere — DOM order drives tab order.

### Fixed in this pass
- **`.settings-form input[type="radio"]:focus-visible`** overrode
  the global focus ring with gold (2.9:1 against ivory paper).
  Removed the override; radios now inherit the global ink ring.
- **Post-navigation focus**: Astro's `ClientRouter` doesn't move
  focus after View-Transition navigation, so screen-reader users
  stayed on the old page's link element (now replaced) and the
  new page's heading never got announced. Added a
  `astro:after-swap` handler that focuses `#main-content`. Main
  has `tabindex="-1"` and `main:focus { outline: none }` so the
  shift is invisible to sighted users but lets AT announce the
  new page.

### Out of scope / intentional
- **`main:focus { outline: none }`** is deliberate — the only way
  main receives focus is programmatically (skip link, post-swap),
  and a focus ring on a page-sized container reads as a bug to
  sighted users. Keep this.
- **CTA hole-punched buttons** receive focus normally and get the
  global ink ring. The recessed depth shadow is decorative; focus
  state is conveyed by the outline.

## Re-run trigger

Re-run if any of these change:
- The Settings page gains new control types (checkboxes, selects)
- The CTA component's focus styling is touched
- ClientRouter is removed or replaced
- A new modal, drawer, or overlay enters the codebase
