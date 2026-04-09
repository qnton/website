//  https://www.youtube.com/watch?v=uU9Fe-WXew4

/** @type {string} */
let lastRevealInitSource = "";

// #region agent log
function dbgReveal(hypothesisId, location, message, data) {
  fetch("http://127.0.0.1:7725/ingest/0090e826-12b9-4e87-9465-ead68f8c78e2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "0bdb52",
    },
    body: JSON.stringify({
      sessionId: "0bdb52",
      runId: "post-fix",
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
// #endregion

/** @type {IntersectionObserver | null} */
let scrollRevealObserver = null;

/**
 * Slight shrink from the bottom of the viewport so we don’t fire while the
 * block is only in the bottom strip; still uses the real viewport (no “early”
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
  // #region agent log
  dbgReveal("H3", "scripts.js:activateReveal", "activateReveal", {
    tag: el.tagName,
    stagger: el.hasAttribute("data-reveal-stagger"),
    solo: el.hasAttribute("data-reveal"),
  });
  // #endregion
  el.setAttribute("data-reveal-active", "");
}

/**
 * Minimum overlap with the viewport (fallback when we don’t have an IO entry).
 * Kept small so it never deadlocks reveals; IO rootMargin handles “not too early”.
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

  /* >0 only: 20px min rejected valid IO rects (log: never reached activateReveal). */
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
  return [...document.querySelectorAll("[data-reveal]:not([data-reveal-item])")].filter(
    (n) => n instanceof HTMLElement,
  );
}

function activateAllReveals() {
  queryStaggerRoots().forEach(activateReveal);
  querySoloRevealRoots().forEach(activateReveal);
}

function flushPendingRevealEntries(observer) {
  if (!observer) return;
  const pending = observer.takeRecords();
  // #region agent log
  dbgReveal("H4", "scripts.js:flushPendingRevealEntries", "takeRecords", {
    count: pending.length,
  });
  // #endregion
  for (const entry of pending) {
    const qualifies = entryQualifies(entry);
    // #region agent log
    if (entry.isIntersecting && !qualifies) {
      dbgReveal("H1", "scripts.js:flushPendingRevealEntries", "intersecting_but_rejected", {
        iw: entry.intersectionRect.width,
        ih: entry.intersectionRect.height,
        tag: entry.target instanceof HTMLElement ? entry.target.tagName : "?",
      });
    }
    // #endregion
    if (!qualifies) continue;
    const target = /** @type {HTMLElement} */ (entry.target);
    activateReveal(target);
    observer.unobserve(target);
  }
}

function revealVisibleTargets(observer) {
  for (const el of queryStaggerRoots()) {
    if (el.hasAttribute("data-reveal-active")) continue;
    const ok = elementQualifiesForReveal(el);
    // #region agent log
    const r = el.getBoundingClientRect();
    dbgReveal("H3", "scripts.js:revealVisibleTargets", "stagger_fallback", {
      qualify: ok,
      vw: Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0),
      vhBand: Math.min(r.right, window.innerWidth) - Math.max(r.left, 0),
    });
    // #endregion
    if (!ok) continue;
    activateReveal(el);
    observer?.unobserve(el);
  }
  for (const el of querySoloRevealRoots()) {
    if (el.hasAttribute("data-reveal-active")) continue;
    const ok = elementQualifiesForReveal(el);
    // #region agent log
    const r = el.getBoundingClientRect();
    dbgReveal("H3", "scripts.js:revealVisibleTargets", "solo_fallback", {
      qualify: ok,
      vw: Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0),
      vhBand: Math.min(r.right, window.innerWidth) - Math.max(r.left, 0),
      tag: el.tagName,
    });
    // #endregion
    if (!ok) continue;
    activateReveal(el);
    observer?.unobserve(el);
  }
}

function initializeScrollReveal() {
  if (scrollRevealObserver) {
    scrollRevealObserver.disconnect();
    scrollRevealObserver = null;
  }

  const prm = prefersReducedMotion();
  const staggers = queryStaggerRoots();
  const solos = querySoloRevealRoots();
  // #region agent log
  dbgReveal("H2", "scripts.js:initializeScrollReveal", "init", {
    source: lastRevealInitSource,
    prm,
    staggerCount: staggers.length,
    soloCount: solos.length,
    path: typeof window !== "undefined" ? window.location.pathname : "",
  });
  // #endregion

  if (prm) {
    activateAllReveals();
    return;
  }

  scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const qualifies = entryQualifies(entry);
      // #region agent log
      dbgReveal("H1", "scripts.js:IntersectionObserver", "entry", {
        isIntersecting: entry.isIntersecting,
        qualifies,
        iw: entry.intersectionRect.width,
        ih: entry.intersectionRect.height,
        tag: entry.target instanceof HTMLElement ? entry.target.tagName : "?",
      });
      if (entry.isIntersecting && !qualifies) {
        dbgReveal("H1", "scripts.js:IntersectionObserver", "intersecting_rejected", {
          iw: entry.intersectionRect.width,
          ih: entry.intersectionRect.height,
        });
      }
      // #endregion
      if (!qualifies) return;
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

function scheduleScrollRevealInit(source) {
  lastRevealInitSource = source;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => initializeScrollReveal());
  });
}

document.addEventListener("DOMContentLoaded", () =>
  scheduleScrollRevealInit("DOMContentLoaded"),
);
document.addEventListener("astro:after-swap", () =>
  scheduleScrollRevealInit("astro:after-swap"),
);
