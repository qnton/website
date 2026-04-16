//  Scroll reveal — intersection-observed stagger + solo reveals.
//  Companion to [data-reveal-stagger] / [data-reveal] markup + CSS in globals.css.

/** @type {IntersectionObserver | null} */
let scrollRevealObserver = null;

/**
 * Slight shrink from the bottom of the viewport so we don't fire while the
 * block is only in the bottom strip; still uses the real viewport (no "early"
 * expansion below the fold).
 */
const REVEAL_IO = {
  root: null,
  rootMargin: "0px 0px -8% 0px",
  threshold: 0,
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * @param {HTMLElement} el
 */
function activateReveal(el) {
  el.setAttribute("data-reveal-active", "");
}

/**
 * Fallback overlap with the visual viewport (microtask / already-visible).
 * Any positive overlap counts; IO handles timing via rootMargin.
 * @param {Element} el
 */
function elementQualifiesForReveal(el) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const vw = window.innerWidth;

  const top = Math.max(r.top, 0);
  const left = Math.max(r.left, 0);
  const bottom = Math.min(r.bottom, vh);
  const right = Math.min(r.right, vw);
  const h = bottom - top;
  const w = right - left;

  return h > 0 && w > 0;
}

/**
 * @param {IntersectionObserverEntry} entry
 */
function entryQualifies(entry) {
  if (!entry.isIntersecting) return false;
  const { width, height } = entry.intersectionRect;
  return width > 0 && height > 0;
}

/** @returns {HTMLElement[]} */
function queryStaggerRoots() {
  return [...document.querySelectorAll("[data-reveal-stagger]")].filter(
    (n) => n instanceof HTMLElement,
  );
}

/** @returns {HTMLElement[]} */
function querySoloRevealRoots() {
  return [
    ...document.querySelectorAll("[data-reveal]:not([data-reveal-item])"),
  ].filter((n) => n instanceof HTMLElement);
}

function activateAllReveals() {
  queryStaggerRoots().forEach(activateReveal);
  querySoloRevealRoots().forEach(activateReveal);
}

function flushPendingRevealEntries(observer) {
  if (!observer) return;
  for (const entry of observer.takeRecords()) {
    if (!entryQualifies(entry)) continue;
    const target = /** @type {HTMLElement} */ (entry.target);
    activateReveal(target);
    observer.unobserve(target);
  }
}

function revealVisibleTargets(observer) {
  for (const el of queryStaggerRoots()) {
    if (el.hasAttribute("data-reveal-active")) continue;
    if (!elementQualifiesForReveal(el)) continue;
    activateReveal(el);
    observer?.unobserve(el);
  }
  for (const el of querySoloRevealRoots()) {
    if (el.hasAttribute("data-reveal-active")) continue;
    if (!elementQualifiesForReveal(el)) continue;
    activateReveal(el);
    observer?.unobserve(el);
  }
}

function initializeScrollReveal() {
  if (scrollRevealObserver) {
    scrollRevealObserver.disconnect();
    scrollRevealObserver = null;
  }

  if (prefersReducedMotion()) {
    activateAllReveals();
    return;
  }

  scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entryQualifies(entry)) return;
      const target = /** @type {HTMLElement} */ (entry.target);
      activateReveal(target);
      scrollRevealObserver?.unobserve(target);
    });
  }, REVEAL_IO);

  for (const el of queryStaggerRoots()) {
    if (!el.hasAttribute("data-reveal-active")) {
      scrollRevealObserver.observe(el);
    }
  }
  for (const el of querySoloRevealRoots()) {
    if (!el.hasAttribute("data-reveal-active")) {
      scrollRevealObserver.observe(el);
    }
  }

  flushPendingRevealEntries(scrollRevealObserver);

  queueMicrotask(() => {
    flushPendingRevealEntries(scrollRevealObserver);
    revealVisibleTargets(scrollRevealObserver);
  });
}

document.addEventListener("astro:before-swap", (event) => {
  const roots = event.newDocument.querySelectorAll(
    "[data-reveal-stagger], [data-reveal]:not([data-reveal-item])",
  );
  roots.forEach((el) => {
    if (el instanceof HTMLElement) {
      el.removeAttribute("data-reveal-active");
    }
  });

  event.newDocument.querySelectorAll("header, footer").forEach((root) => {
    root
      .querySelectorAll(".animate-once, .animate-fade")
      .forEach((el) => el.classList.remove("animate-once", "animate-fade"));
  });
});

const urlElement = document.getElementById("url");
if (urlElement) urlElement.textContent = window.location.pathname;

function scheduleScrollRevealInit() {
  requestAnimationFrame(() => {
    requestAnimationFrame(initializeScrollReveal);
  });
}

document.addEventListener("DOMContentLoaded", scheduleScrollRevealInit);
document.addEventListener("astro:after-swap", scheduleScrollRevealInit);
