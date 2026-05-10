/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  // No darkMode — site is light-only by intent. Light mode is the
  // calm one; the writing wants ivory pages, not screens.
  theme: {
    // Generous, restrained palette. Stacey's site is navy + warm
    // ivory + restrained gold — a printed-page feel, not BD's
    // premium-gold-lamp identity. Values are deliberately
    // un-saturated; the palette should never shout.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ink: {
        // primary text + heading color — deep navy, slightly warm
        // (avoids cold-blue feeling that corporate finance carries).
        DEFAULT: "#0e1a36",
        soft: "#243152", // softer ink for sub-headings, captions
        muted: "#5a6483", // muted for subordinate text
      },
      paper: {
        // base background — warm ivory, like a yellow legal pad
        // softened by age and good lamp light. Never pure white.
        DEFAULT: "#f6f1e6",
        warm: "#f0e8d4", // a touch warmer for inset surfaces
        cool: "#fbf8f1", // a touch cooler for highest-contrast areas
      },
      gold: {
        // restrained gold — used for rule lines, link underlines,
        // small emphasis. NEVER fills, NEVER glows, NEVER buttons.
        DEFAULT: "#a87f2b",
        soft: "#c49648",
      },
    },
    fontFamily: {
      // Single serif (EB Garamond) for headings + long-form body.
      // Single sans (Inter) for caption-class text + occasional
      // structural labels. NO third face.
      serif: [
        "EB Garamond",
        "Garamond",
        "Hoefler Text",
        "Iowan Old Style",
        "Times New Roman",
        "serif",
      ],
      sans: [
        "Inter",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "sans-serif",
      ],
    },
    extend: {
      maxWidth: {
        // Reading measure — keep prose between 60-72 characters.
        // These two utilities cover the two main reading widths.
        prose: "38rem", // ~62ch at default body size — primary measure
        wide: "44rem", // wider measure for less-dense passages
      },
      spacing: {
        // Section padding — generous breathing room. Sections should
        // feel like printed-page chapters, not boxes pressed against
        // each other.
        section: "8rem",
        "section-lg": "12rem",
      },
      letterSpacing: {
        // Quietly literate, not fashion-editorial. No oversized
        // tracking; subtle settings only.
        body: "0.005em",
        heading: "-0.01em",
      },
    },
  },
  plugins: [],
};
