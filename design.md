# Design System — qnt.one

A deliberately minimal, **fully monochrome** personal site. Black canvas, off-white
type, no accent hue. This document is the source of truth for the visual language;
keep it in sync with `src/styles/globals.css` and the page components.

## Core principle: true monochrome

Every color is a neutral gray defined in **OKLCH with chroma `0` and hue `0`** —
`oklch(L% 0 0)`. There is no accent color, no warm/cool tint. When adding or editing
a color, the chroma component **must be `0`**. Any non-zero chroma (e.g. a warm
`oklch(78% 0.07 85)`) introduces a visible cast and breaks the system.

> Rule of thumb: if a color value isn't `oklch(L% 0 0)` (or `#000`/`#fff`/pure-gray
> hex in the few non-OKLCH spots), it doesn't belong.

## Color tokens

Defined in `src/styles/globals.css` under `@theme inline`:

| Token | Value | Use |
|---|---|---|
| `--color-surface` | `oklch(7% 0 0)` | Page background (`<body>`) |
| `--color-surface-elevated` | `oklch(10% 0 0)` | Raised surfaces |
| `--color-border-strong` | `oklch(28% 0 0)` | Strong borders / dividers |
| `--color-text-muted` | `oklch(72% 0 0)` | Body / secondary text |
| `--color-text-primary` | `oklch(96% 0 0)` | Headings / primary text |

### Additional neutral values in use

| Value | Where | Use |
|---|---|---|
| `oklch(8% 0 0)` | homepage `<main>` | Content background (a touch above surface) |
| `oklch(58% 0 0)` | homepage eyebrow label | Dim uppercase caption |
| `oklch(62% 0 0)` | `404.astro` | Muted link |
| `oklch(78% 0 0) / 20%` | homepage `selection:` | Text-selection highlight |
| `white / 10%` | `<body>` `selection:` | Default text-selection highlight |
| `#000000` | `theme-color` meta, `bg-black` | Browser chrome / 404 background |
| `#171717` | `@media print` | Print text color on white |

Helper classes: `.tone-primary` → `--color-text-primary`, `.tone-muted` → `--color-text-muted`.

## Typography

Self-hosted woff2, all preloaded in `layout.astro`.

- **Instrument Serif** (`--font-instrument-serif`, 400) — display: `h1`, the email
  link, the 404 numeral. Set tight: `tracking-[-0.02em]`, `leading-[1.05]`.
- **Satoshi** — UI / body:
  - `--font-satoshi-light` (300) — intro paragraph
  - `--font-satoshi-regular` (400) — default `<body>` font
  - `--font-satoshi-medium` (500) — uppercase eyebrow / small caps labels

**Fluid sizing** via `clamp()`, e.g. homepage `h1` is
`text-[clamp(2.75rem,8vw,4.25rem)]`, email link `clamp(1.75rem,5vw,2.75rem)`.
Eyebrow labels: small, uppercase, wide tracking (`0.26em`).

## Surface

The background is a flat neutral (`--color-surface`, `oklch(7% 0 0)`) with no
overlay, vignette, or grain — depth comes from typography and spacing alone.

## Motion

- **Entrance reveal** (homepage): `.reveal` elements rise `0.875rem` and fade in over
  `0.7s` on `cubic-bezier(0.22, 1, 0.36, 1)`, staggered via the `--i` custom property
  (`--i * 130ms + 120ms`). Wrapped in `@media (prefers-reduced-motion: no-preference)`.
- **Email link**: animated underline (`::after` scales in on hover/focus, `0.45s`) and
  the arrow nudges up-right (`0.3s`). Same easing curve throughout.
- Standard easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Respect `prefers-reduced-motion`.

## Accessibility

- Focus: `outline: 2px solid var(--color-text-primary)`, `outline-offset: 3px`,
  `border-radius: .125rem` on all interactive elements.
- Skip-target: `#main-content` on the page `<main>`.
- Selection colors are set explicitly (see table).

## Print

`@media print` (`globals.css`) inverts to white background / `#171717` text in
`Satoshi-Regular` and disables the vignette + grain layers.

## Assets (`public/`)

All brand assets are monochrome: `og.png` (black), `logo.png` &
apple-touch-icons (black on white), `favicon.ico`. `images/pfp.jpg` is a color photo
and is **not currently referenced** — do not introduce it into a monochrome view
without desaturating.

## Stack

Astro + Tailwind CSS **v4** (configured via `@theme` in `globals.css` — there is **no**
`tailwind.config.js`). Colors are applied largely through arbitrary-value utilities,
e.g. `bg-[oklch(8%_0_0)]`. Plugin: `tailwindcss-animated`.
