import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://qnt.one/",
  integrations: [tailwind(), sitemap(), robotsTxt()],
  output: "static",
  compressHTML: true,
  trailingSlash: "never",
  experimental: {
    assets: true,
  },
  redirects: {
    "/github": {
      status: 302,
      destination: "https://github.com/qnton",
    },
    "/linkedin": {
      status: 302,
      destination: "https://www.linkedin.com/in/qnton",
    },
    "/mail": {
      status: 302,
      destination: "mailto:hello@qnt.one",
    },
    "/project/schnelltest": {
      status: 302,
      destination: "https://schnelltest-clp.de",
    },
    "/project/hm-medizintechnik": {
      status: 302,
      destination: "https://hm-medizintechnik.de",
    },
    "/project/hankens": {
      status: 302,
      destination: "https://hankens-testzentrum.de",
    },
  },
});
