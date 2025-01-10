import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import mailObfuscation from "astro-mail-obfuscation";
import compressor from "astro-compressor";

export default defineConfig({
  site: "https://qnt.one/",
  prefetch: {
    defaultStrategy: 'load',
    prefetchAll: true
  },
  integrations: [
    tailwind(),
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
    compressor(),
  ],
  output: "static",
  compressHTML: true,
  trailingSlash: "never",
  server: { port: 3000 },
});
