# Deployment checklist

Practical steps for getting the site live on Vercel and confirmed
working. Aimed at whoever runs the first deploy (Mola or Stacey),
not at a future AI agent.

## Before pushing

- [ ] `npm run build` exits with 0 errors. Output lands in `dist/`.
- [ ] `git status` is clean — no stray `.env`, `node_modules`,
      or `dist/` accidentally staged.
- [ ] `TODO_STACEY.md` items that are blocking owner sign-off
      have been reviewed. Anything marked "high value" should
      ideally be resolved before the public domain points at
      this site.

## Vercel setup

- [ ] Connect the GitHub repo in Vercel dashboard.
- [ ] Framework preset: **Astro**. Vercel autodetects this.
- [ ] Build command: `npm run build` (default).
- [ ] Output directory: `dist` (default for Astro static).
- [ ] Node version: **20.x** or later (Astro 5 requires 18.17+;
      20 is the long-term default).
- [ ] No environment variables required. The site is fully
      static; nothing reads `process.env`.

## DNS

- [ ] Add `theyellowlegalpad.co` (apex) and `www.theyellowlegalpad.co`
      in Vercel's Domains panel.
- [ ] Update DNS at the registrar — A record to Vercel's IP
      `76.76.21.21` (apex) and CNAME `cname.vercel-dns.com` for
      `www`. Vercel's UI prints the exact records to use.
- [ ] Wait for SSL provisioning (Let's Encrypt via Vercel,
      automatic, usually under five minutes).
- [ ] Confirm `https://theyellowlegalpad.co` resolves and the
      certificate is valid.

## Post-deploy smoke test

Visit the production URL and confirm:

- [ ] Page loads with paper-on-desk theme, library backdrop
      visible behind the paper.
- [ ] Click between Home / About / Services / Resources / Contact.
      The page-curl transition runs smoothly.
- [ ] Open `/settings`. Toggle Always Dark, navigate to a
      different page, return. The theme persists.
- [ ] Toggle Page transitions → Off, navigate. The curl
      shouldn't fire; pages swap instantly.
- [ ] Open `/contact`. Click the email link — should open a
      mail composer pre-filled with subject "Discovery Call".
- [ ] View page source on the homepage. Confirm:
  - `<link rel="canonical" href="https://theyellowlegalpad.co/">`
  - `<meta property="og:url" content="https://theyellowlegalpad.co/">`
  - `<meta property="og:site_name" content="The Yellow Legal Pad">`
- [ ] Visit `https://theyellowlegalpad.co/sitemap-index.xml` —
      should list `sitemap-0.xml` with six routes (Home, About,
      Contact, Resources, Services, Settings; 404 excluded).
- [ ] Visit `https://theyellowlegalpad.co/robots.txt` — should
      end with a `Sitemap:` line pointing at the sitemap index.
- [ ] Visit a deliberately-bogus URL like `/nope`. The custom
      404 page should render with the paper layout.

## Accessibility re-verification on the live site

- [ ] Tab from a fresh page load. The skip link should appear
      at the top-left in an ink-colored outline.
- [ ] Tab through every link on the homepage. Each gets a clean
      ink ring (no flashes of gold).
- [ ] `prefers-reduced-motion` test: in macOS System Settings →
      Accessibility → Display → Reduce Motion, toggle on,
      reload. Page-curl transitions should not fire; library
      backdrop should not parallax-shift on scroll.

## Social preview check

- [ ] Paste the production URL into a Slack DM, an iMessage, and
      a Discord channel. Unfurls should show the title and
      description. No image renders yet (deliberate — see
      `TODO_STACEY.md` "Open-Graph image").
- [ ] When the PNG export of `og.svg` lands at
      `public/og.png`, re-paste the URL in each platform to
      confirm the image renders.

## Search engine onboarding

- [ ] Submit `https://theyellowlegalpad.co/sitemap-index.xml` to
      Google Search Console.
- [ ] Verify property ownership via the DNS TXT record method
      (no HTML file needed).
- [ ] Skip Bing / DuckDuckGo / Yandex unless owner asks — the
      audience is unlikely to find this practice through them.

## Things this checklist does NOT cover

- Analytics — none installed, by design.
- Cookie banners — nothing on the site sets cookies; localStorage
  only, which doesn't require disclosure under GDPR / CCPA when
  storing user preferences.
- CDN cache purge — Vercel handles this automatically on each
  deploy.
- Database migrations — there is no database.

If any of those become relevant later, that's a real architecture
change, not a deployment task.
