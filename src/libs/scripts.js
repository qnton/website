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
};

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("astro:after-swap", init);
