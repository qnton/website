import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = join(root, "dist", "index.html");
if (!existsSync(indexPath)) {
  console.error("Run `npm run build` first (dist/index.html missing).");
  process.exit(1);
}
const html = readFileSync(indexPath, "utf8");
const m = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
if (!m) {
  console.error("No application/ld+json script in dist/index.html.");
  process.exit(1);
}
const b64 = createHash("sha256").update(m[1], "utf8").digest("base64");
console.log("sha256-" + b64);
