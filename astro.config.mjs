import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://qnt.one/",
  integrations: [tailwind(), sitemap(), robotsTxt()],
  output: "static",
  trailingSlash: "never",
  experimental: {
    assets: true,
  },
  image: {
    service: {
      entrypoint: "./src/image-service.ts",
    },
  },
});
