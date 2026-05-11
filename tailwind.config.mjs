/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ink: {
        /* Brand navy from Stacey's business documents. */
        DEFAULT: "#1F3864",
        soft: "#39487a",
        muted: "#4a577b",
      },
      paper: {
        DEFAULT: "#f6f1e6",
        warm: "#f0e8d4",
        cool: "#fbf8f1",
      },
      gold: {
        /* Brand gold from Stacey's business documents. */
        DEFAULT: "#B8860B",
        soft: "#d6a635",
      },
    },
    fontFamily: {
      serif: [
        "EB Garamond",
        "Garamond",
        "Hoefler Text",
        "Iowan Old Style",
        "Times New Roman",
        "serif",
      ],
    },
    extend: {
      maxWidth: {
        prose: "38rem", /* ~62ch */
        wide: "44rem",
      },
      spacing: {
        section: "8rem",
      },
      letterSpacing: {
        body: "0.005em",
        heading: "-0.01em",
      },
    },
  },
  plugins: [],
};
