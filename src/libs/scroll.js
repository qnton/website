import LocomotiveScroll from "locomotive-scroll";

const scroll = () =>
  (function () {
    const container = document.querySelector("[data-scroll-container]");

    if (container instanceof HTMLElement) {
      const options = {
        el: container,
        smooth: true,
        multiplier: 1,
        mobile: {
          smooth: true,
          multiplier: 1,
          breakpoint: 0,
        },
        tablet: {
          smooth: true,
          multiplier: 1,
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
