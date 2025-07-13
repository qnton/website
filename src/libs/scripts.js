//  https://www.youtube.com/watch?v=uU9Fe-WXew4
const ON_SIGHT_PREFIX = "on-sight:";

function initializeOnSightObserver() {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;

          const classList = Array.from(el.classList);
          classList.forEach((cls) => {
            if (cls.startsWith(ON_SIGHT_PREFIX)) {
              const actualClass = cls.replace(ON_SIGHT_PREFIX, "");
              el.classList.add(actualClass);
              el.classList.remove(cls);
            }
          });

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(`[class*='${ON_SIGHT_PREFIX}']`).forEach((el) => {
    observer.observe(el);
  });
}

function initializeParallaxScroll() {
  const parallaxSections = document.querySelectorAll("[data-parallax]");

  const updateParallax = () => {
    const windowHeight = window.innerHeight;

    parallaxSections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      if (rect.top < windowHeight && rect.bottom > 0) {
        const visibleAmount = 1 - rect.top / windowHeight;
        const shift = (visibleAmount - 0.5) * 50;
        section.style.transform = `translateY(${shift}px)`;
      }
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", onScroll);
  updateParallax();
}

document.addEventListener("astro:before-swap", (event) => {
  const rootElements = event.newDocument.querySelectorAll("header, footer");
  rootElements.forEach((root) => {
    const animatedElements = root.querySelectorAll(
      ".animate-once, .animate-fade",
    );
    animatedElements.forEach((el) => {
      el.classList.remove("animate-once", "animate-fade");
    });
  });
});

const urlElement = document.getElementById("url");
if (urlElement) {
  urlElement.innerHTML = window.location.pathname;
}

document.addEventListener("DOMContentLoaded", () => {
  initializeOnSightObserver();
  initializeParallaxScroll();
});

document.addEventListener("astro:after-swap", () => {
  initializeOnSightObserver();
  initializeParallaxScroll();
});
