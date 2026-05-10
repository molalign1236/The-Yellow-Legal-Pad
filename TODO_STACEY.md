# TODO — Stacey Inputs

This file lists every placeholder in the codebase that needs Stacey's
real input. When she provides each piece, the swap is mechanical —
search for the bracketed token, replace globally, commit.

The point of this file is to keep the worklist visible so nothing
slips through unnoticed.

## Critical (the site reads visibly placeholder until these are filled)

| Token | Where it appears | Stacey input needed |
|---|---|---|
| `hello@yellowlegalpad.example` | `src/pages/contact.astro` (one mailto link) | Stacey's real email address |
| (last name absent) | `src/pages/index.astro` ("a small practice run by Stacey"), `src/layouts/BaseLayout.astro` (footer "Stacey") | When she provides a last name, append it after "Stacey" in those two spots; until then, the site reads naturally as "Stacey" alone |

## Medium (real copy that supersedes the AI tonal drafts)

The following pages contain real-tonal-but-not-final copy that I drafted
in Stacey's voice based on relay #33-#37 phrases. Stacey will likely
edit these heavily — her exact cadence is the long-term authority.

| Page | Sections that need Stacey's edit | Notes |
|---|---|---|
| `src/pages/index.astro` | All four sections (welcome / origin / philosophy / invitation) | Currently in Stacey's tonal range; she should rewrite to her exact cadence |
| `src/pages/about.astro` | Story (Grampy origin), Philosophy, Who Stacey works with | Currently good drafts; she should edit |
| `src/pages/about.astro` | "How she got here" section | **Bracketed placeholder paragraphs** — Stacey writes her own career path; I deliberately did not invent details |
| `src/pages/services.astro` | All three package descriptions (Clarity Session / Quarterly Check-In / Family Conversation) | Currently named based on natural Stacey-shaped tiers; she may rename, restructure, change scope |
| `src/pages/services.astro` | Process clarity ("three specific things") | Currently a good draft; she should edit |
| `src/pages/contact.astro` | All sections | Currently good drafts; she should edit. The contact form was removed in Pass 315 — only an email link is offered. Form returns when there's a backend (Calendly, Formspree, or Vercel serverless function) — owner-decision territory. |

## Resources page (needs real PDFs)

`src/pages/resources.astro` lists 5 placeholder guide entries with
real-feeling titles + descriptions. Each currently links to an in-page
anchor (`#family-money-guide` etc.) instead of a real PDF.

When Stacey provides each PDF:
1. Add the file to `public/guides/` (e.g. `public/guides/family-money.pdf`)
2. Wrap the corresponding `<h3>Title</h3>` in an `<a>` so it becomes `<h3><a href="/guides/family-money.pdf">Title</a></h3>` (Pass 321 removed the dead `#anchor-name` placeholders so titles aren't deceptively styled as links until real destinations exist)
3. Optionally remove the entry if Stacey doesn't actually have that guide

The 5 placeholder titles are:
- A Family Money Guide
- A Couples Money Guide
- Starting at Forty (or Fifty, or Sixty)
- When Your Parents Need Help
- A First-Job Money Letter

If she has different guides, replace the entries.

## Low priority (deferred until v1 is closer to launch)

| Item | Notes |
|---|---|
| `public/favicon.svg` | A temporary placeholder favicon ships with the repo (a single restrained-gold rule on a paper-ivory ground). Stacey can replace it with a proper mark whenever she has one |
| Production domain | Once Stacey picks the domain, set `site: "https://<domain>"` in `astro.config.mjs`. The canonical `<link>` and `og:url` tags only render when `site` is set (until then they're suppressed so we don't ship localhost URLs to production). Setting `site` brings them back automatically on the next build. |
| Real font files (alternative) | Currently using `@fontsource/eb-garamond` + `@fontsource/inter` via npm. If owner wants to use specifically licensed/purchased fonts (e.g. Söhne instead of Inter), drop into `public/fonts/` and update the `@font-face` declarations in `src/styles/global.css` |
| Calendly link | If Stacey already has a Calendly URL, the contact-page email link and the home/about/services "Book a Discovery Call" links can be swapped to her Calendly URL via global search-replace. The current targets are `mailto:hello@yellowlegalpad.example?subject=Discovery%20Call` (in `src/pages/contact.astro`) and `href="/contact"` (in the other pages). |

## How to swap, mechanically

For each placeholder:

```
# In the yellow-legal-pad repo:
grep -rn "[last name TBD]" src/   # find all occurrences
# edit, then:
git add -A && git commit -m "swap: Stacey's last name"
```

Each swap is a separate small commit. Don't bundle.

## Anti-drift reminder

Per Pass 309 §10 + relay #38: when Stacey provides her edits, **trust
her cadence over what I drafted**. The current drafts read in her tonal
range but are mine, not hers. Her exact phrasing carries the long-term
authority of the site.

Resist the temptation to "improve" her edits. If something she writes
feels less polished than the AI draft, the AI draft is wrong, not her
writing.
