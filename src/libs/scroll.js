import LocomotiveScroll from "locomotive-scroll";

(function () {
  let options = {
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  };

  setTimeout(() => {
    new LocomotiveScroll(options);
  }, 1);
})();
