# Monochrome Editorial Design System

This document is the canonical, project-agnostic source of truth for a narrow, dark, monochrome editorial interface. Implementations may express these rules as CSS variables, utilities, theme objects, or native platform tokens, but must preserve their semantics.

## 1. Design principles

The system is restrained, typographic, sharp, and flat. Hierarchy comes from type, spacing, neutral lightness, and one-pixel rules rather than decorative effects.

- Use only neutral colors with zero chroma.
- Keep layouts narrow and editorial; do not introduce a wide application or dashboard shell.
- Use square geometry, flat surfaces, and deliberate whitespace.
- Make every state understandable without hue or animation.
- Treat the tokens, component recipes, and state rules below as a public visual contract.

## 2. Theme and color system

### Dark-only theme

The screen interface is dark-only. The dark canvas is an invariant, not a default that implies a corresponding light theme. A white print treatment is permitted as an output-specific accessibility rule and is not a second UI theme.

### True monochrome

Every authored UI color must be a neutral gray expressed as `oklch(L% 0 0)`, with optional alpha. Chroma must always be `0`; component states vary lightness, alpha, border strength, or decoration, never hue. Pure black, pure white, and grayscale output formats may be used only where OKLCH is unsupported.

| Token | Value | Purpose |
| --- | --: | --- |
| `--color-surface` | `oklch(7% 0 0)` | Root canvas |
| `--color-surface-content` | `oklch(8% 0 0)` | Primary content plane |
| `--color-surface-elevated` | `oklch(10% 0 0)` | Cards, controls, and raised regions |
| `--color-border-subtle` | `oklch(100% 0 0 / 12%)` | Default one-pixel hairlines |
| `--color-border-strong` | `oklch(28% 0 0)` | Emphasized and hover borders |
| `--color-text-primary` | `oklch(96% 0 0)` | Headings and primary actions |
| `--color-text-muted` | `oklch(72% 0 0)` | Body and secondary text |
| `--color-text-subdued` | `oklch(58% 0 0)` | Eyebrows, metadata, and placeholders |
| `--color-selection` | `oklch(78% 0 0 / 20%)` | Text-selection background |
| `--color-disabled` | `oklch(96% 0 0 / 45%)` | Disabled foregrounds and icons |

## 3. Typography

Use self-hosted WOFF2 files for both families. Preload only the weights required by the initial view and use `font-display: swap`. File locations and loading mechanics are implementation details.

| Role | Family and weight | Use |
| --- | --- | --- |
| Display | Instrument Serif 400 | Display headings and prominent editorial actions |
| Introductory copy | Satoshi 300 | Lead paragraphs and introductions |
| Body | Satoshi 400 | Standard prose and interface copy |
| Interface emphasis | Satoshi 500 | Controls, labels, eyebrows, and metadata |

Display text uses `-0.02em` letter spacing and `1.05` line-height. Use fluid `clamp()` sizing for display roles rather than abrupt breakpoint jumps.

Eyebrows use Satoshi 500 at `0.6875rem`, uppercase, with `0.26em` letter spacing. Body copy uses approximately `1.625` line-height. Keep readable prose and primary content within a `36rem` measure.

## 4. Spacing and narrow editorial layout

Use a 4px-derived spacing scale. Prefer these values over arbitrary margins and gaps:

| Step |     Value | Step |    Value |
| ---: | --------: | ---: | -------: |
|    1 | `0.25rem` |    8 |   `2rem` |
|    2 |  `0.5rem` |   10 | `2.5rem` |
|    3 | `0.75rem` |   12 |   `3rem` |
|    4 |    `1rem` |   16 |   `4rem` |
|    5 | `1.25rem` |   24 |   `6rem` |
|    6 |  `1.5rem` |   32 |   `8rem` |

The standard page frame is:

- Maximum primary content width: `36rem`.
- Page-inline gutter: `clamp(1.5rem, 6vw, 4rem)`.
- Page-top spacing: `clamp(3rem, 12vh, 8rem)`.
- Default page-bottom spacing: `2.5rem`.

Choose intentional vertical gaps from the spacing scale. Preserve the narrow reading measure even on wide screens; do not stretch the primary column to fill available space.

## 5. Shape, borders, and elevation

- Surfaces and controls use square corners: `border-radius: 0`.
- The only incidental radius is `0.125rem` on the focus outline.
- Default dividers and component outlines are one-pixel subtle hairlines using `--color-border-subtle`.
- Do not use box shadows, gradients, glows, vignettes, glass effects, grain, or decorative overlays.
- Communicate elevation only through surface lightness, hairlines, and spacing.

## 6. Motion

Use `cubic-bezier(0.22, 1, 0.36, 1)` as the standard expressive easing curve.

### Entrance reveal

Staggered reveal elements:

- Start at `opacity: 0` and `translateY(0.875rem)`.
- Animate to their resting state over `0.7s`.
- Use the standard expressive easing curve.
- Use `calc(var(--i) * 130ms + 120ms)` as the delay, where `--i` is the zero-based reveal index.

### Duration scale

- Simple color and border transitions: `150ms`.
- Icon movement: `300ms`.
- Decorative underline reveals: `450ms`.

Under `prefers-reduced-motion: reduce`, disable all nonessential animation and smooth scrolling. Reveal content immediately, preserve every interaction, and do not make functionality depend on motion.

## 7. Interaction states

All interactive components follow the same state contract:

| State | Treatment |
| --- | --- |
| Default | Use the component's canonical tokens and persistent affordances. |
| Hover | Strengthen its border, underline, or foreground contrast. |
| Focus-visible | Draw a `2px solid var(--color-text-primary)` outline with a `3px` offset and `0.125rem` radius. |
| Active | Reduce the foreground or filled-surface opacity to `80%`; do not bounce or scale the component. |
| Disabled | Use `45%` overall opacity, suppress hover and active transitions, remove the pointer affordance, and retain the semantic disabled attribute. |

Validation and status must combine visible text with an icon, border, or other decoration. Never communicate state through color alone.

## 8. Component recipes

### Inline links

- Inherit the surrounding typography.
- Use primary or muted text according to emphasis.
- Keep a persistent one-pixel underline or equivalent non-color affordance.
- Render the default underline in the current color at `28%` opacity.
- Make the underline fully opaque on hover and focus-visible.
- Apply the shared focus-visible, active, and disabled treatments.

### Prominent editorial link

- Use Instrument Serif 400 with a fluid size from `1.75rem` to `2.75rem`.
- Draw a one-pixel underline that reveals over `450ms` with the standard easing.
- An optional directional arrow moves `0.12em` right and `0.04em` upward over `300ms` on hover and focus-visible.
- Apply the shared active and disabled treatments.

### Buttons

Provide three variants:

- **Primary:** `--color-text-primary` fill with `--color-surface` label text.
- **Secondary:** transparent fill, subtle one-pixel border, and primary label text.
- **Ghost:** transparent fill, no default border, and primary or muted label text.

All buttons have a minimum height of `2.75rem`, `1rem` inline padding, `0.5rem` internal gap, square corners, and no shadow. Labels use Satoshi 500 at `0.75rem`, uppercase, with `0.12em` letter spacing.

On hover, strengthen the relevant contrast or border. Apply the shared focus-visible treatment, `80%` active opacity, and disabled behavior to every variant.

### Inputs and textareas

- Use an elevated surface with a one-pixel subtle border.
- Use primary entered text and subdued placeholder text.
- Set a minimum height of `2.75rem` and padding of `0.75rem 1rem`.
- Use Satoshi 400 body typography, square corners, and no shadow.
- Strengthen the border on hover.
- Use the shared focus-visible outline; a border-color change alone is insufficient.
- Apply the shared active and disabled treatments where the control supports them.
- Indicate invalid input with a primary border, visible error text, and semantic error attributes.
- Allow textareas to resize vertically.

### Chips and pills

- Render them as compact rectangular chips, not rounded capsules.
- Use a `1.75rem` height, `0.75rem` inline padding, and a one-pixel subtle border.
- Use Satoshi 500 small-label typography, square corners, and no shadow.
- Interactive chips use the shared hover, focus-visible, active, and disabled treatments.

### Cards

- Use the elevated surface, a one-pixel subtle border, and `1.5rem` internal padding.
- Use square corners and no shadow.
- Strengthen the border on hover only when the entire card is interactive.
- Interactive cards use the shared focus-visible, active, and disabled treatments.
- Nested links and controls retain independent focus indicators and must not be hidden by the card's interaction treatment.

### Procedural dither field

A single ambient texture, generated at runtime rather than shipped as an image or video. Permitted under the documented exception in §5, subject to every limit below.

- Span the full content plane with one unframed, borderless surface, and weight the dot density toward a single page corner.
- Let the density reach zero well before the opposite corner, so the rest of the page stays bare surface instead of carrying a faint wash. Shape that falloff inside the field function itself. Do not fade it with a CSS gradient or mask.
- Cut the field off below a minimum value. A power falloff only reaches exactly zero at the far corner, so without a floor roughly one cell per hundred still clears the threshold right across the page — a dusting of lone darkest marks with no blob to belong to, which reads as dirt rather than texture. Apply the floor after any cursor and selection contribution so those still work out in the bare region.
- Measure that falloff in pixels, not in normalised coordinates. Normalised distance makes the field's shape follow the viewport's aspect ratio, which collapses it into a squashed vertical sliver on a tall phone screen; pixel distance keeps it spreading across the full width there. Bias it slightly wider than tall.
- Draw square dots on a fixed grid with a `6px` pitch and a maximum dot edge of `2.5px`.
- Restrict every dot to zero chroma within `oklch(20% 0 0)` to `oklch(44% 0 0)`. At this pitch a dot covers under a fifth of its cell, so the field's perceived lightness stays far below its brightest tone and never approaches the contrast of text laid over it. Where `oklch()` is unsupported, substitute the matching sRGB greys.
- Quantise brightness to at most four steps and give each step its own mark shape, not merely its own size: a speck, a dot, a cross, a block. The shape change is what makes the field read as halftone crosshatch rather than as four sizes of one square. Size each mark so its offset within the cell lands on a whole device pixel at both 1x and 2x, or it antialiases into a muddier extra tone.
- Drive the dither from a high-frequency threshold field, not from a small ordered matrix. A Bayer 4x4 gives each of its 16 sub-positions a fixed and very different threshold — measured hit rates from `0.004` to `1.000` — which stamps a visible lattice repeating every four cells. Interleaved gradient noise, a blue-noise tile, or any similarly high-passed field avoids that. This is the one admitted use of noise: as a threshold, never as a grain or texture overlay.
- Do not use blur or alpha gradients anywhere in the field.
- Cap the animation at `30fps`. Suspend it whenever the field is off-screen or the document is hidden.
- Reveal it on load by growing the dot density outward from the anchored corner over roughly `1.3s`, never by fading opacity. Let the dither threshold fray the advancing front, and keep the front's travel within the range that actually carries dots so the sweep reads at an even pace. Suppress pointer response until it lands.
- Under `prefers-reduced-motion: reduce`, render one static frame with no entrance sweep and no pointer response. The texture stays; the motion does not.
- Mark it `aria-hidden="true"` with `pointer-events: none`. It is never focusable, never conveys state, and no content may depend on it.
- Optional pointer response may raise local dot density and brightness only. Enable it solely for `(hover: hover) and (pointer: fine)`.
- Track the cursor instantly: put the head of the highlight on the raw pointer position, never on an eased one. Carry the softness in a decaying tail of recent positions instead, sampled per pointer event rather than per rendered frame so a fast sweep leaves a continuous streak rather than a chain of separate blobs. Take the strongest contribution per cell, never the sum, or a slow cursor stacks its samples into a solid blob.
- Do not stamp the highlight as a circle. Bend its radius with a couple of slowly drifting harmonics so it reads as a living smudge, and keep the deformation well below the base radius so it never pinches shut.
- The field may render the text selection. `::selection` only honours `background-color` in browsers, so a patterned highlight is unreachable from CSS; drive it from the field instead, and set the native highlight transparent only once the field is live so selection still works without scripting. Lift the local density rather than forcing a fixed value, or the selection reads as a flat slab of one mark instead of the field's own blobs. Keep the lift low enough that all four marks still appear; if the brightest mark dominates, the region reads as a solid bar again. Blur the union of line boxes before using it, then re-threshold that coverage with the wave field as jitter — a feathered rectangle is still a rectangle, whereas blurring rounds the corners, merges adjacent lines into one mass, and the wave-driven re-threshold turns the contour irregular. The selection must override both the corner falloff and the entrance sweep: it is feedback, not decoration.
- Ease the pointer highlight back out after roughly `1.4s` of cursor stillness. A resting cursor is not attention, and a highlight parked under an idle pointer reads as a rendering artefact.

### Social card

The link-preview image. It carries the same vocabulary as the page: flat zero-chroma surface, the display face for the name, an eyebrow in interface emphasis, and the procedural dither field weighted into one corner.

- Render at `1200x630`, and keep the declared `og:image:width` and `og:image:height` in step with the file. A mismatch is silently wrong rather than visibly broken.
- Use the page's gutter for the left margin so the card and the page share an edge.
- Derive it from the same field code as the live page rather than reproducing the look by hand, or the two drift apart at the next tweak.
- **The first frame has to carry the card on its own.** Facebook, X and LinkedIn render only the first frame of an animated `og:image`; Discord animates it. So an animated card must open fully formed — never on an entrance sweep, which would unfurl as an empty rectangle almost everywhere.
- When an animated card is used for `og:image`, ship the still as a separate file too and declare `og:image:type` as `image/gif`. Point `twitter:image` at the still: X strips animation regardless, so serving it the animation is pure weight for an identical result.
- A seamless loop needs every wave term to complete a whole number of cycles per loop, so quantise the drift rates to integer multiples of `2*PI / duration`. The live rates share no common period and will not close.
- The card is greyscale, so an animated export can use one palette entry per grey level. Anything smaller bands the antialiased type.

## 9. Accessibility

- Provide visible keyboard focus for every interactive element.
- Provide a skip link that targets the primary content region.
- Apply `--color-selection` explicitly to selected text.
- Preserve semantic disabled, validation, and error attributes.
- Give primary controls a minimum `2.75rem` touch target.
- Respect reduced-motion preferences as specified above.
- Ensure state and meaning remain understandable without color or motion.

## 10. Print behavior

Print output uses a white background and `#171717` text. Preserve readable type, remove nonessential motion, and ensure links remain identifiable. This inversion is specific to print output and does not define a light screen theme.

## 11. Implementation requirements

- Map the canonical token names without changing their values or semantics.
- Keep all authored UI colors at zero chroma.
- Implement the complete interaction-state contract for each interactive component.
- Preserve the typography roles, spacing scale, narrow measure, sharp geometry, and flat elevation model.
- Test keyboard focus, disabled and invalid controls, reduced motion, selection, responsive gutters, and print output.
- Document any platform limitation that prevents an exact mapping and choose the closest neutral, accessible equivalent.
