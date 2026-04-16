# AGENTS.md

## Cursor Cloud specific instructions

This is a static Astro portfolio website (no backend, no database, no external services).

### Key commands

See `package.json` scripts for the full list. The most common:

- `pnpm dev` — starts the Astro dev server on port 3000
- `pnpm build` — builds static output to `dist/`
- `pnpm format:check` — runs Prettier formatting check (this is the only lint-style check configured)
- `pnpm format` — auto-fixes formatting

### Notes

- There are no automated tests configured in this project.
- The `pnpm format:check` command serves as the lint/format check. There is no separate ESLint setup.
- Build scripts for `@tailwindcss/oxide`, `esbuild`, and `sharp` may show as "ignored" after `pnpm install`. The build and dev server still work correctly without approving them.
- The dev server runs on port 3000 by default (configured in `astro.config.mjs`).