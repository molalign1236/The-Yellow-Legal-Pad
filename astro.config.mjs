import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// Astro configured as a static-document composer (NOT an application
// framework). No client islands at v1. Output is plain HTML + CSS +
// minimal progressive enhancement. The quieter the runtime, the
// louder the emotional clarity.
export default defineConfig({
  output: "static",
  integrations: [
    tailwind({
      // Tailwind ships only what we use. We use it for spacing +
      // typography utilities — NOT component variants, NOT animation
      // utilities, NOT state-based styling. Most styling lives in
      // src/styles/global.css as honest CSS.
      applyBaseStyles: false,
    }),
  ],
});
