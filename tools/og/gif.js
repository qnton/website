/**
 * Minimal GIF89a writer, enough for a looping greyscale animation.
 *
 * Written by hand rather than pulled in as a dependency: the site ships with none,
 * and the machine has no ffmpeg, ImageMagick or gifski either. Scope is deliberately
 * narrow — one global colour table, no local tables, no transparency, no interlacing.
 *
 * The palette is 256 greys because the card contains antialiased text. A small
 * palette would band the letter edges; with one entry per grey level the mapping is
 * exact, and the flat background still collapses into long LZW runs.
 */

const MIN_CODE_SIZE = 8; // 256-entry table
const MAX_CODE = 4095;

class BitWriter {
  constructor() {
    /** @type {number[]} */
    this.bytes = [];
    this.pending = 0;
    this.pendingBits = 0;
  }

  /**
   * GIF packs codes least-significant-bit first, straddling byte boundaries.
   *
   * @param {number} code
   * @param {number} size
   */
  write(code, size) {
    this.pending |= code << this.pendingBits;
    this.pendingBits += size;
    while (this.pendingBits >= 8) {
      this.bytes.push(this.pending & 0xff);
      this.pending >>>= 8;
      this.pendingBits -= 8;
    }
  }

  flush() {
    if (this.pendingBits > 0) {
      this.bytes.push(this.pending & 0xff);
      this.pending = 0;
      this.pendingBits = 0;
    }
  }
}

/**
 * @param {Uint8Array} indices
 * @returns {number[]}
 */
function lzwCompress(indices) {
  const clearCode = 1 << MIN_CODE_SIZE;
  const endCode = clearCode + 1;
  const writer = new BitWriter();

  let codeSize = MIN_CODE_SIZE + 1;
  let nextCode = endCode + 1;
  /** @type {Map<number, number>} */
  let dictionary = new Map();

  writer.write(clearCode, codeSize);

  if (indices.length === 0) {
    writer.write(endCode, codeSize);
    writer.flush();
    return writer.bytes;
  }

  let prefix = indices[0];
  for (let i = 1; i < indices.length; i++) {
    const next = indices[i];
    // Prefix codes reach 4095 and symbols reach 255, so pack both into one key.
    const key = (prefix << 8) | next;
    const known = dictionary.get(key);
    if (known !== undefined) {
      prefix = known;
      continue;
    }

    writer.write(prefix, codeSize);

    if (nextCode <= MAX_CODE) {
      dictionary.set(key, nextCode);
      nextCode++;
      // The `+ 1` is the whole ballgame. A decoder only adds a table entry from the
      // *second* code it reads onwards, so its table trails this one by exactly one
      // entry. Widening at `1 << codeSize` — the intuitive place — makes the encoder
      // start writing wider codes one step before the decoder starts reading them,
      // and everything after that point decodes to noise. Small images never reach
      // the first widening, which is why this needs a large round-trip test.
      if (nextCode === (1 << codeSize) + 1 && codeSize < 12) codeSize++;
    } else {
      writer.write(clearCode, codeSize);
      dictionary = new Map();
      codeSize = MIN_CODE_SIZE + 1;
      nextCode = endCode + 1;
    }

    prefix = next;
  }

  writer.write(prefix, codeSize);
  writer.write(endCode, codeSize);
  writer.flush();
  return writer.bytes;
}

/**
 * @param {number[]} out
 * @param {number[]} data
 */
function pushSubBlocks(out, data) {
  for (let i = 0; i < data.length; i += 255) {
    const size = Math.min(255, data.length - i);
    out.push(size);
    for (let j = 0; j < size; j++) out.push(data[i + j]);
  }
  out.push(0x00);
}

/**
 * @param {number[]} out
 * @param {number} value
 */
function pushU16(out, value) {
  out.push(value & 0xff, (value >> 8) & 0xff);
}

/**
 * @param {number[]} out
 * @param {string} text
 */
function pushAscii(out, text) {
  for (let i = 0; i < text.length; i++) out.push(text.charCodeAt(i));
}

/**
 * @typedef {object} GifFrame
 * @property {Uint8Array} indices palette indices, `width * height` long
 * @property {number} left
 * @property {number} top
 * @property {number} width
 * @property {number} height
 */

/**
 * @param {object} options
 * @param {number} options.width logical screen width
 * @param {number} options.height logical screen height
 * @param {GifFrame[]} options.frames the first should cover the whole screen
 * @param {number} options.delayMs per frame; GIF stores hundredths, so use multiples of 10
 * @returns {Uint8Array}
 */
export function encodeGif({ width, height, frames, delayMs }) {
  /** @type {number[]} */
  const out = [];

  pushAscii(out, "GIF89a");

  // Logical screen descriptor. Packed byte: global colour table present, 8-bit
  // colour resolution, unsorted, table size 2^(7+1) = 256.
  pushU16(out, width);
  pushU16(out, height);
  out.push(0b11110111, 0x00, 0x00);

  // Greyscale global colour table: index === grey level.
  for (let i = 0; i < 256; i++) out.push(i, i, i);

  // Netscape application extension: loop forever.
  out.push(0x21, 0xff, 0x0b);
  pushAscii(out, "NETSCAPE2.0");
  out.push(0x03, 0x01);
  pushU16(out, 0);
  out.push(0x00);

  const delayHundredths = Math.max(1, Math.round(delayMs / 10));

  for (const frame of frames) {
    // Graphic control extension. Disposal 1 ("leave in place") is what lets later
    // frames repaint only the region that actually changes.
    out.push(0x21, 0xf9, 0x04, 0b00000100);
    pushU16(out, delayHundredths);
    out.push(0x00, 0x00);

    out.push(0x2c);
    pushU16(out, frame.left);
    pushU16(out, frame.top);
    pushU16(out, frame.width);
    pushU16(out, frame.height);
    out.push(0x00); // no local colour table, not interlaced

    out.push(MIN_CODE_SIZE);
    pushSubBlocks(out, lzwCompress(frame.indices));
  }

  out.push(0x3b);
  return new Uint8Array(out);
}

/**
 * Reads the structural facts back out of an encoded GIF, so a caller can assert them
 * instead of trusting the writer above.
 *
 * @param {Uint8Array} bytes
 */
export function inspectGif(bytes) {
  const header = String.fromCharCode(...bytes.slice(0, 6));
  const width = bytes[6] | (bytes[7] << 8);
  const height = bytes[8] | (bytes[9] << 8);
  const gctSize = 2 << (bytes[10] & 0b111);

  let at = 13 + gctSize * 3;
  let frames = 0;
  let loopCount = null;
  const delays = [];
  const rects = [];

  const skipSubBlocks = () => {
    while (bytes[at] !== 0x00) at += bytes[at] + 1;
    at += 1;
  };

  while (at < bytes.length && bytes[at] !== 0x3b) {
    if (bytes[at] === 0x21) {
      const label = bytes[at + 1];
      const blockSize = bytes[at + 2];
      if (label === 0xff) {
        const name = String.fromCharCode(...bytes.slice(at + 3, at + 14));
        at += 3 + blockSize;
        if (name === "NETSCAPE2.0") {
          loopCount = bytes[at + 2] | (bytes[at + 3] << 8);
        }
        skipSubBlocks();
      } else if (label === 0xf9) {
        delays.push(bytes[at + 4] | (bytes[at + 5] << 8));
        at += 3 + blockSize;
        skipSubBlocks();
      } else {
        at += 2;
        skipSubBlocks();
      }
      continue;
    }
    if (bytes[at] === 0x2c) {
      rects.push({
        left: bytes[at + 1] | (bytes[at + 2] << 8),
        top: bytes[at + 3] | (bytes[at + 4] << 8),
        width: bytes[at + 5] | (bytes[at + 6] << 8),
        height: bytes[at + 7] | (bytes[at + 8] << 8),
      });
      frames++;
      const packed = bytes[at + 9];
      at += 10;
      if (packed & 0x80) at += 3 * (2 << (packed & 0b111));
      at += 1; // min code size
      skipSubBlocks();
      continue;
    }
    throw new Error(`unexpected block 0x${bytes[at].toString(16)} at ${at}`);
  }

  return { header, width, height, gctSize, frames, loopCount, delays, rects };
}
