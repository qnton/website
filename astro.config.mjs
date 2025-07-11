import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import mailObfuscation from "astro-mail-obfuscation";

export default defineConfig({
  site: "https://qnt.one/",
  experimental: {
     csp: {
      algorithm: 'SHA-512',
      directives: [
        "default-src * 'self' 'unsafe-eval' 'unsafe-inline'"
      ],
      scriptDirective: {
        strictDynamic: true,
        hashes: [
          "sha256-XAQ/haDK+8IdENaTMjTqyfA4cRRA6b4FYTYt5nkSH0I="
        ],
      }
    }
  },
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
  ],
  output: "static",
  compressHTML: true,
  trailingSlash: "never",
  server: { port: 3000 },
});
