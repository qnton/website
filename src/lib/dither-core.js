/**
 * Shared core of the procedural dither field (see design.md §8 "Procedural dither
 * field"). Two consumers depend on these numbers agreeing exactly:
 *
 * - `src/components/dither-field.astro` — the live, interactive field
 * - `tools/og/index.html` — the social-card generator
 *
 * Only the pure field maths and the mark drawing live here. Everything stateful or
 * interactive stays in the component: cursor trail, halo wobble, selection mask,
 * entrance sweep, and the frame-rate and visibility guards.
 *
 * Plain JS rather than TypeScript on purpose. The generator loads this file directly
 * as an ES module over HTTP, with no build step in front of it.
 */

/** Grid pitch in CSS px. */
export const CELL = 6;

/** Dot density at the anchored corner, before the waves swing it. */
export const FIELD_BIAS = 0.86;
/** How hard the waves swing density around that bias. */
export const CONTRAST = 0.78;
/**
 * Exponent on the corner falloff. A higher value pulls the texture tighter into the
 * anchored corner and lets the rest of the surface fall to nothing.
 */
export const FOCUS = 3;
/** Multiplier on the wave frequencies. Higher means smaller, finer blobs. */
export const BLOB_SCALE = 2.1;
/** Falloff reach, as a fraction of the (stretched) diagonal. */
export const REACH_RADIUS = 1;
/** Divides the horizontal distance. Above 1 stretches the field sideways. */
export const CORNER_STRETCH = 1.3;
/**
 * Below this field value a cell draws nothing at all. The falloff only reaches
 * exactly zero in the opposite corner, so without a floor the whole far side keeps
 * passing the threshold in about one cell per hundred — a thin dusting of lone
 * darkest specks with no visible blob to belong to.
 */
export const VALUE_FLOOR = 0.09;

/**
 * Drift rates of the four wave terms, in radians per second. The live field uses
 * these; the generator overrides them with values that close a loop (see
 * `tools/og/index.html`), which is why `waveAt` takes them as an argument.
 */
export const WAVE_RATES = [0.45, 0.32, 0.6, 0.5];

/**
 * Dither threshold weights: interleaved gradient noise. This replaces a Bayer 4x4
 * matrix, whose 16 fixed sub-positions each carried a wildly different threshold
 * (measured hit rates from 0.004 to 1.000) and stamped a visible crosshatch grid
 * repeating every four cells. These weights spread the thresholds evenly with no
 * repeat period at all, so the dithering reads as texture rather than as a lattice.
 *
 * Note this is not void-and-cluster blue noise; it is a cheap high-frequency hash
 * that needs no lookup table. Good enough at this dot pitch.
 */
export const NOISE_COL = 0.06711056;
export const NOISE_ROW = 0.00583715;
export const NOISE_GAIN = 52.9829189;

/**
 * Four brightness steps, all zero chroma, ascending. These read far darker than they
 * look in isolation: at this pitch a mark covers under a fifth of its cell, so the
 * field's perceived lightness stays well below its brightest tone.
 */
export const TONES_OKLCH = [
  "oklch(20% 0 0)",
  "oklch(28% 0 0)",
  "oklch(36% 0 0)",
  "oklch(44% 0 0)",
];
/** sRGB greys matching the tones above, for engines without oklch() on canvas. */
export const TONES_SRGB = ["#161616", "#292929", "#3d3d3d", "#525252"];

export const LEVELS = TONES_OKLCH.length;

/**
 * One mark per brightness step, sparsest first: speck, dot, cross, block. Varying the
 * mark's *shape* and not only its size is what gives the field its crosshatch
 * character instead of reading as four sizes of the same square.
 *
 * Every size keeps `(CELL - size) / 2` a whole or half pixel so the marks land on
 * device pixels at both 1x and 2x. A 1.5px mark would sit at offset 2.25 and get
 * antialiased into a second, muddier tone.
 */
export const SQUARE_SIZES = [1, 2, 0, 3]; // index CROSS_LEVEL is unused
export const CROSS_LEVEL = 2;
export const CROSS_ARM = 4;
export const CROSS_THICKNESS = 1;

/**
 * Falloff reach in CSS px for a surface of this size: the distance from the anchored
 * corner at which density hits zero.
 *
 * @param {number} width
 * @param {number} height
 * @returns {number}
 */
export function reachRadiusFor(width, height) {
  return REACH_RADIUS * Math.hypot(width / CORNER_STRETCH, height);
}

/**
 * How far into the field a point sits: 1 at the bottom-right corner, 0 at the edge of
 * the reach, negative beyond it. Measured in pixels rather than in normalised
 * coordinates, which keeps the field's shape roughly circular on any aspect ratio —
 * on a tall phone viewport it spreads across the full width instead of collapsing
 * into a squashed vertical sliver.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} radius from `reachRadiusFor`
 * @returns {number}
 */
export function reachAt(x, y, width, height, radius) {
  const distX = (width - x) / CORNER_STRETCH;
  const distY = height - y;
  // Deliberately `sqrt` of the squares rather than `Math.hypot`. The two are not
  // bit-identical, and this runs tens of thousands of times per frame, where hypot's
  // overflow guarding is both unnecessary and measurably slower.
  return 1 - Math.sqrt(distX * distX + distY * distY) / radius;
}

/**
 * Sum of four drifting sines, centred on 0.5. Also used as a cheap jitter source
 * elsewhere, which is why it is separate from the density calculation.
 *
 * @param {number} nx normalised 0..1
 * @param {number} ny normalised 0..1
 * @param {number} seconds
 * @param {readonly number[]} [rates] four drift rates; defaults to `WAVE_RATES`
 * @returns {number}
 */
export function waveAt(nx, ny, seconds, rates = WAVE_RATES) {
  const [a, b, c, d] = rates;
  return (
    0.5 +
    0.26 * Math.sin(nx * 7.4 * BLOB_SCALE + seconds * a) +
    0.22 * Math.sin(ny * 5.1 * BLOB_SCALE - seconds * b) +
    0.2 * Math.sin((nx + ny) * 4.3 * BLOB_SCALE + seconds * c) +
    0.14 * Math.sin((nx * 2.1 - ny * 1.7) * 9.5 * BLOB_SCALE - seconds * d)
  );
}

/**
 * Density at a cell, given a wave sample and an already-shaped falloff. The bias sets
 * how solid the field gets; the wave swings density around it so the field breaks into
 * distinct dense and sparse regions instead of reading as one smooth ramp.
 *
 * @param {number} wave from `waveAt`
 * @param {number} falloff usually `Math.pow(reach, FOCUS)`
 * @returns {number}
 */
export function densityAt(wave, falloff) {
  return (FIELD_BIAS + (wave - 0.5) * CONTRAST) * falloff;
}

/**
 * Dither threshold for a cell. Decides *whether* a mark exists.
 *
 * @param {number} col
 * @param {number} row
 * @returns {number} 0..1
 */
export function thresholdAt(col, row) {
  const seed = (NOISE_COL * col + NOISE_ROW * row) % 1;
  return (NOISE_GAIN * seed) % 1;
}

/**
 * Which brightness step a density value lands on. Decides *how bright and what shape*
 * the mark is.
 *
 * @param {number} value
 * @returns {number} 0..LEVELS-1
 */
export function levelFor(value) {
  return Math.min(LEVELS - 1, Math.floor(value * LEVELS));
}

/**
 * Draws one mark at a cell's origin. The caller sets `fillStyle` once per level rather
 * than once per mark, so this deliberately does not touch it.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x cell origin
 * @param {number} y cell origin
 * @param {number} level
 */
export function drawMark(ctx, x, y, level) {
  if (level === CROSS_LEVEL) {
    const inset = (CELL - CROSS_ARM) / 2;
    const mid = (CELL - CROSS_THICKNESS) / 2;
    ctx.fillRect(x + inset, y + mid, CROSS_ARM, CROSS_THICKNESS);
    ctx.fillRect(x + mid, y + inset, CROSS_THICKNESS, CROSS_ARM);
    return;
  }
  const size = SQUARE_SIZES[level];
  const offset = (CELL - size) / 2;
  ctx.fillRect(x + offset, y + offset, size, size);
}

/**
 * True when this engine accepts `oklch()` as a canvas fill. Where it does not, the
 * caller should fall back to `TONES_SRGB`.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @returns {boolean}
 */
export function supportsOklch(ctx) {
  const sentinel = "#123456";
  const previous = ctx.fillStyle;
  ctx.fillStyle = sentinel;
  ctx.fillStyle = TONES_OKLCH[0];
  const supported = ctx.fillStyle !== sentinel;
  ctx.fillStyle = previous;
  return supported;
}
