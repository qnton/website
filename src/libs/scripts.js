function initializeScrollObserver() {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const className = target.getAttribute("data-in-view-class");
          if (className) {
            target.classList.add(className);
            observer.unobserve(target);
          }
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  document.querySelectorAll("[data-in-view-class]").forEach((el) => {
    observer.observe(el);
  });
}

function initializeParallaxScroll() {
  const parallaxSections = document.querySelectorAll("[data-scroll]");

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
  initializeScrollObserver();
  initializeParallaxScroll();
});

document.addEventListener("astro:after-swap", () => {
  initializeScrollObserver();
  initializeParallaxScroll();
});
