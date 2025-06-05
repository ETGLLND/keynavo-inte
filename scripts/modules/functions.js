const createOpenAnimation = (
  container,
  basisClass,
  adjustment = 0,
  target = container,
  nav = false
) => {
  const basis = container.querySelector(basisClass);
  container.style.maxHeight = `${basis.scrollHeight + adjustment}px`;
  let opened = false;
  target.addEventListener("click", (e) => {
    if (!opened) {
      container.classList.add("open");
      if (nav) {
        container.style.maxHeight = `${
          container.scrollHeight + adjustment + 100
        }px`;
      } else {
        container.style.maxHeight = `${container.scrollHeight + adjustment}px`;
      }
      opened = true;
    } else {
      container.style.maxHeight = `${basis.scrollHeight + adjustment}px`;
      container.classList.remove("open");
      opened = false;
    }
  });
};

const changeSwiperDots = (swiper, dots) => {
  const currentNumber = swiper.realIndex;
  dots.forEach((el, index) => {
    el.classList.remove("open");
    if (index === currentNumber) el.classList.add("open");
  });
};

const activateSliderDots = (triggers, swiper) => {
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      triggers.forEach((el) => el.classList.remove("open"));
      trigger.classList.add("open");
      const slideIndex = parseInt(trigger.dataset.slide, 10);
      swiper.slideTo(slideIndex);
    });
  });
};
