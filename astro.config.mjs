import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://theyellowlegalpad.co",
  output: "static",
  integrations: [tailwind({ applyBaseStyles: false })],
});
