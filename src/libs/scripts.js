import LocomotiveScroll from "locomotive-scroll";

const scroll = () =>
  (function () {
    const container = document.querySelector("[data-scroll-container]");

    if (container instanceof HTMLElement) {
      const options = {
        el: container,
        smooth: true,
        touchMultiplier: 2.22,
        reloadOnContextChange: true,
        smartphone: {
          smooth: true,
        },
      };

      setTimeout(() => {
        new LocomotiveScroll(options);
      }, 1);
    }
  })();
scroll();
document.addEventListener("astro:after-swap", scroll);

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
