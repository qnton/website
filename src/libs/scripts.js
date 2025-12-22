//  https://www.youtube.com/watch?v=uU9Fe-WXew4
const ON_SIGHT_PREFIX = "on-sight:";

function initializeOnSightObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;

        [...target.classList].forEach((cls) => {
          if (cls.startsWith(ON_SIGHT_PREFIX)) {
            target.classList.add(cls.slice(ON_SIGHT_PREFIX.length));
            target.classList.remove(cls);
          }
        });
        observer.unobserve(target);
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(`[class*='${ON_SIGHT_PREFIX}']`)
    .forEach(observer.observe.bind(observer));
}

function initializeParallaxScroll() {
  const parallaxSections = document.querySelectorAll(".parallax");
  let ticking = false;

  const updateParallax = () => {
    const windowHeight = window.innerHeight;
    parallaxSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < windowHeight) {
        const shift = (1 - rect.top / windowHeight - 0.5) * 50;
        section.style.transform = `translateY(${shift}px)`;
      }
    });
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  };

  ["scroll", "resize"].forEach((evt) => window.addEventListener(evt, onScroll));
  updateParallax();
}

document.addEventListener("astro:before-swap", (event) => {
  event.newDocument.querySelectorAll("header, footer").forEach((root) => {
    root
      .querySelectorAll(".animate-once, .animate-fade")
      .forEach((el) => el.classList.remove("animate-once", "animate-fade"));
  });
});

const urlElement = document.getElementById("url");
if (urlElement) urlElement.textContent = window.location.pathname;

const init = () => {
  initializeOnSightObserver();
  initializeParallaxScroll();
};

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("astro:after-swap", init);

const placeholders = document.querySelectorAll('[data-src]');

const observer = new IntersectionObserver(async (entries, observer) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const placeholder = entry.target;
      const url = placeholder.getAttribute('data-src');
      const res = await fetch(url);
      const svgText = await res.text();
      placeholder.innerHTML = svgText;
      observer.unobserve(placeholder);
    }
  }
});

placeholders.forEach(el => observer.observe(el));