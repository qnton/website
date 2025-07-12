import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import mailObfuscation from "astro-mail-obfuscation";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: "https://qnt.one/",
  prefetch: {
    defaultStrategy: 'load',
    prefetchAll: true
  },
  integrations: [
    sitemap(),
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/resume", "/resume.pdf"],
        },
      ],
    }),
    mailObfuscation({
      fallbackText: "Please enable JavaScript!",
      allowedTags: ["address"]
    }),
  ],
  output: "static",
  compressHTML: true,
  trailingSlash: "never",
  server: { port: 3000 },
  vite: {
    plugins: [tailwindcss()]
  }
});
