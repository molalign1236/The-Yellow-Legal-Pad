import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // Set `site` once Stacey's domain is known — that re-enables the
  // canonical <link> and og:url tags in BaseLayout.
  output: "static",
  integrations: [tailwind({ applyBaseStyles: false })],
});
