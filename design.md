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
