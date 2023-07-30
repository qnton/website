import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://qnt.one/",
  integrations: [react(), tailwind(), sitemap(), robotsTxt()],
  output: "hybrid",
  adapter: cloudflare({
    mode: "directory",
  }),
  experimental: {
    assets: true,
  },
  image: {
    service: {
      entrypoint: "./src/image-service.ts",
    },
  },
});
