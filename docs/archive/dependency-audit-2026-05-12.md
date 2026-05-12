# Dependency audit — 2026-05-12

Pre-Pass-449 capture of `npm audit` state. Same format as the
sibling May 11 audit (`dependency-audit-2026-05-11.md`) so the
delta is comparable.

## Summary

```
info:     0
low:      0
moderate: 7
high:     0
critical: 0
total:    7
```

No high or critical vulnerabilities. Owner-decision territory: the
Astro 5 → 6 upgrade for the `define:vars` XSS fix. Builder must NOT
auto-run `npm audit fix --force` — that installs Astro 6.3.1 as a
breaking change per the audit output. Per `CLAUDE.md` and
`builder-handoff-2026-05-12.md` Pass 449, this is owner sign-off.

## Findings

### 1. astro <6.1.6 — XSS in define:vars (moderate)

Advisory: [GHSA-j687-52p2-xcff](https://github.com/advisories/GHSA-j687-52p2-xcff)

Astro's `define:vars` directive has incomplete `</script>` tag
sanitization. The fix lands in Astro 6.1.6+, distributed as
`astro@6.3.1` per the audit recommendation.

**Material exposure for this site:** low in practice. The YLP
codebase does not use `define:vars` to inject user-supplied input
into a `<script>` block. There is no user input at all — the site
is fully static, no forms posting to anything, no server-rendered
user content. The advisory applies to projects that pass un-
sanitized user data into `define:vars`. YLP does not.

**Recommended action:** plan the Astro 6 upgrade as a deliberate,
owner-approved pass after launch + first deploy stabilization.
Treat as a maintenance task, not a security blocker.

Carries `@astrojs/tailwind` as a transitive — the Tailwind v3
integration will need verification post-upgrade. YLP uses
Tailwind v3 + the integration; if Astro 6 ships with v4 expected
defaults, this is a real upgrade pass, not a single command.

### 2. yaml 2.0.0 - 2.8.2 — stack overflow via deeply nested
collections (moderate)

Advisory: [GHSA-48c2-rrv3-qjmp](https://github.com/advisories/GHSA-48c2-rrv3-qjmp)

Transitive through `yaml-language-server → volar-service-yaml →
@astrojs/language-server`. Editor-tooling only — does not ship to
production. Fixable via `npm audit fix` (non-breaking). Safe to
run when convenient.

**Material exposure for this site:** none in production. The
vulnerable code path is a dev-time language server.

### 3–7. Five additional transitive moderates

All transitive through the Astro language-server toolchain.
Same posture: dev-time only, no production exposure. Resolved by
the `npm audit fix` for #2 above or by the eventual Astro 6
upgrade.

## Action

Pass 449's deliverable was "current npm audit state captured." Done
here. Builder can skip Pass 449 — fold the work back as a
pre-handoff item, advance Pass 450+ as next.

The `npm audit fix` (non-breaking) for the yaml chain is safe to
run before the Astro 6 upgrade. Owner can do this in one line at
any time:

```
cd ~/yellow-legal-pad
npm audit fix
git add package-lock.json && git commit -m "chore: npm audit fix (non-breaking transitives)"
```

The Astro 6 upgrade is a separate planned pass post-launch.

## Co-update notes

- `builder-handoff-2026-05-12.md` Pass 449 line should be marked
  as "pre-folded into prep" or struck through; next pass after
  Pass 448 is Pass 450 (Stacey phrase #1).
- No other docs require updating from this audit alone.
