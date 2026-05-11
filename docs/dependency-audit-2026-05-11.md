# Dependency audit — 2026-05-11 (Pass 434)

`npm audit` reports 7 moderate vulnerabilities. Walked the
dependency graph to assess actual production exposure.

## Production runtime exposure

### `astro` < 6.1.6 — XSS in `define:vars`
- **Advisory:** GHSA-j687-52p2-xcff (CVSS 6.1)
- **Trigger:** incomplete `</script>` sanitization when authors
  pass user-controlled values into `define:vars`.
- **Exposure here:** **zero.** `grep -r "define:vars" src public`
  returns no matches. The site has two inline `<script is:inline>`
  blocks in `BaseLayout.astro` and one in `settings.astro`, none
  of which use `define:vars` or render Astro-controlled values
  into script text.
- **Fix-available path:** Astro 5 → 6 (semver major). Holding
  for a deliberate upgrade pass with owner sign-off — Astro 6
  has known breaking changes around View Transitions and
  ClientRouter, which the site's curl transition depends on.

### `@astrojs/tailwind` flagged transitively
- Inherits the astro CVE through its peer dep range. Same
  zero-exposure analysis applies. Fixed by the same Astro 6
  bump.

## Dev-tooling exposure (not shipped)

### `yaml` < 2.8.3 — Stack overflow on deeply nested YAML
- **Advisory:** GHSA-48c2-rrv3-qjmp (CVSS 4.3)
- **Path:** `@astrojs/check` → `@astrojs/language-server` →
  `volar-service-yaml` → `yaml-language-server` → `yaml`
- **Exposure here:** **zero in production.** This chain only
  executes during `astro check`, the type-checker that runs as
  part of `npm run build`. The vulnerable code never reaches the
  static output in `dist/`. CI / build hosts (Vercel) running
  trusted source aren't a realistic exploit surface.

## Decision

Hold both fix paths until a deliberate upgrade pass:
- **Astro 6 upgrade**: defer until owner-approved. Requires
  re-verifying the curl transition (Pass 401–419), pre-paint
  settings script, and parallax script against Astro 6's
  ClientRouter behavior. Not safe for autopilot.
- **`npm audit fix --force`**: would drag @astrojs/tailwind to
  2.1.3 (a downgrade) or force the Astro 6 jump. Don't run.

`npm audit fix` (non-force) leaves the tree unchanged, which is
the correct state given the analysis above.

## Re-run trigger

Re-run on any of:
- A new advisory at high/critical severity
- Astro 6 upgrade lands (will close most of these)
- A new direct dependency is added
- `npm audit` reports a vulnerability with `isDirect: true` that
  isn't already in this doc
