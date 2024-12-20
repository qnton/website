import LocomotiveScroll from "locomotive-scroll";

const scroll = () =>
  (function () {
    const container = document.querySelector("[data-scroll-container]");

    if (container instanceof HTMLElement) {
      const options = {
        el: container,
        smooth: true,
        lerp: 0.1,
        multiplier: 1,
        reloadOnContextChange: true,
        touchMultiplier: 2,
        smoothMobile: true,
        smartphone: {
          smooth: true,
          lerp: 2,
          breakpoint: 0,
        },
      };

      setTimeout(() => {
        new LocomotiveScroll(options);
      }, 1);
    }
  })();
scroll();
document.addEventListener("astro:after-swap", scroll);
