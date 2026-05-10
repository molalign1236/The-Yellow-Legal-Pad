/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ink: {
        DEFAULT: "#0e1a36",
        soft: "#243152",
        muted: "#5a6483",
      },
      paper: {
        DEFAULT: "#f6f1e6",
        warm: "#f0e8d4",
        cool: "#fbf8f1",
      },
      gold: {
        DEFAULT: "#a87f2b",
        soft: "#c49648",
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
