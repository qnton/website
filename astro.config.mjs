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
  compressHTML: true,
  trailingSlash: "never",
  server: { port: 3000 },
  vite: {
    plugins: [tailwindcss()]
  }
});
