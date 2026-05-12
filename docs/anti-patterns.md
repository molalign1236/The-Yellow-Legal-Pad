# Anti-patterns — what not to add here

A reference for future contributors (human or AI). Everything
listed below has been considered and deliberately rejected. The
restraint is engineering, not unfinished work. If you find
yourself reaching for one of these, re-read this list first.

## Don't add

### Analytics
- **Tempting because**: every marketing site has it; "we should
  know who's visiting"; vague optimization gravity.
- **Cost**: privacy story collapses ("nothing leaves this device"
  on the Settings page becomes a lie); cookie banner machinery;
  consent flow; a dashboard nobody reads; the practice serves
  5–10 active clients, none of whom were acquired via a
  dashboard metric.
- **If you really need to know**: ask Stacey how the first
  call went. That's the metric.

### A blog / longform article system
- **Tempting because**: the Resources page sort of implies one;
  the typography would render beautifully; "thought leadership."
- **Cost**: content treadmill the practice can't sustain;
  introduces collections, listing pages, pagination, RSS,
  archive pages — none of which the brief asked for.
- **If you really need to publish writing**: each guide on
  `/resources` is already a long-form artifact. Add new ones
  there.

### An intake form
- **Tempting because**: every coaching site has one; "qualify
  the lead"; faster than email back-and-forth.
- **Cost**: form state, validation, server endpoint, anti-spam,
  storage, GDPR; competes with the email link on `/contact`
  for the same job; the brief explicitly states intake happens
  AFTER the Discovery Call, not before.
- **If you really need structured intake**: handle it in the
  email reply or via Calendly's built-in question fields.

### Embedded scheduling beyond the Discovery Call
- **Tempting because**: Calendly supports paid bookings;
  "self-serve all the way through."
- **Cost**: violates the explicit posture in CLAUDE.md §6 —
  paid sessions are scheduled manually after an engagement
  letter and payment step. Self-serve paid booking removes
  Stacey's chance to say no to bad fits.

### Live chat / chatbot
- **Tempting because**: SaaS template default; "always
  available"; AI-era expectation.
- **Cost**: completely incompatible with the practice's tone.
  The site is meant to feel like an unhurried conversation,
  not an interruption.

### A pricing table on Services
- **Tempting because**: visitors want to know; "transparency."
- **Cost**: TODO_STACEY.md marks pricing-visibility as an open
  owner decision (Q2). The current default — "we talk about
  it on the Discovery Call" — is deliberate, not an oversight.
  Don't pre-resolve owner decisions on tone-load-bearing
  questions.

### Stock photos (especially of women)
- **Tempting because**: every page would feel "more complete"
  with a hero image; engagement metrics on imagery.
- **Cost**: CLAUDE.md §7 forbids it. The audience is women
  navigating transitions; stock photos of women as a stand-in
  for Stacey is dishonest and tonal poison. Stacey will provide
  warm abstract imagery (legal pad and pen, desk scenes); use
  that or use nothing.

### A "premium" or "starter" / pricing-tier hierarchy on Services
- **Tempting because**: SaaS pattern; "best value" badges; tier
  comparison tables.
- **Cost**: the four packages on `/services` are intentionally
  rendered as equal `<article>` elements with no "most popular"
  styling. They're modes of working, not pricing tiers. The
  pathway visual rhythm depends on this equality.

### A toast / snackbar / "saved!" confirmation on Settings
- **Tempting because**: standard form-UX pattern; "give feedback
  on every action."
- **Cost**: every radio click triggers immediate `applyToDOM` —
  the theme changes, the font resizes, the motion mode flips.
  That IS the feedback. A toast on top of an instant visible
  change is noise.

### A "Back to top" floating button
- **Tempting because**: long pages benefit from it; every
  long-scroll site has one.
- **Cost**: floating chrome breaks the paper illusion. The
  site's longest page (Services) fits in roughly three
  scrolls; the Home link in the header is always one tap away.

### A cookie banner
- **Tempting because**: GDPR / CCPA defaults; lawyerly caution.
- **Cost**: the site sets zero cookies and uses localStorage
  only for user preferences, which neither regulation requires
  disclosure for. A cookie banner here would be ceremony, not
  compliance.

### View Transitions for individual content elements
- **Tempting because**: smooth element-to-element morphs are
  visually impressive; Astro 5 supports them.
- **Cost**: the curl transition (`.site-paper` with
  `transition:name="paper"`) is the deliberate experiential
  primitive. Adding per-element transitions on h1s, articles,
  or images would compete with the curl and destabilize the
  "the paper is the artifact" metaphor.

### Tailwind utility-class proliferation in `.astro` files
- **Tempting because**: Tailwind is configured; class-list
  composition feels natural.
- **Cost**: the existing pages use a small set of named classes
  (`.section`, `.column`, `.column-wide`, `.cta`, `.caption`,
  `.pathway`, `.faq`) defined in `global.css`. Inline utility
  cascades create local style decisions that drift from the
  centralized typography tokens. The Tailwind plugin is mostly
  there for the theme tokens (`theme('fontFamily.serif')`),
  not for utility-first authoring.

### Component splitting (React-style) for visual elements
- **Tempting because**: "this could be a `<Card>` / `<Pathway>`
  / `<CTAButton>` component."
- **Cost**: each page is mostly bespoke prose with a handful of
  repeating semantic patterns (articles, paragraphs, captions).
  Components abstract away the prose-first authoring posture and
  make small copy edits feel like code changes. The pages are
  hand-authored on purpose.

### A site-search input
- **Tempting because**: every site over 5 pages has one;
  Pagefind / Algolia / DuckDuckGo dropdown.
- **Cost**: there are seven pages. The nav header lists five of
  them. Search is solving a problem that doesn't exist at this
  scale.

### Anything with the word "platform," "ecosystem,"
### "engagement," or "growth" in its justification
- **Tempting because**: AI-agent vocabulary defaults.
- **Cost**: every one of those words is incompatible with a
  small human-scale practice site. If a proposed change requires
  one of them in its rationale, the proposed change is wrong
  for this project.

## How to use this list

When a proposed change is anywhere near one of these patterns,
push back. The right response to "should we add X?" is almost
always "what problem are we solving, and is X the minimum that
solves it?"

The right size of this site has been settled. Future passes are
about deepening what's already here, not adding to the surface
area.
