import { defineConfig } from "astro/config";
import mailObfuscation from "astro-mail-obfuscation";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://qnt.one/",
  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: false,
  },
  integrations: [
    sitemap(),
    mailObfuscation({
      fallbackText: "Please enable JavaScript!",
      allowedTags: ["address", "span"],
    }),
  ],
  output: "static",
  build: {
    // External `/_astro/*.css` only — `style-src 'self'` in public/_headers disallows inline `<style>`
    inlineStylesheets: "never",
  },
  compressHTML: true,
  trailingSlash: "never",
  server: { port: 3000 },
  vite: {
    plugins: [tailwindcss()]
  }
});
