import LocomotiveScroll from "locomotive-scroll";

(function () {
  const container = document.querySelector("[data-scroll-container]");

  if (container instanceof HTMLElement) {
    const options = {
      el: container,
      smooth: true,
    };

    setTimeout(() => {
      new LocomotiveScroll(options);
    }, 1);
  }
})();
