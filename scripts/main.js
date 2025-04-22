import gsap from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// FUNCTIONS
// function measureFullHeight(el) {
//   const hiddenElements = [];

//   // Trouver tous les descendants cachés
//   el.querySelectorAll("*").forEach((child) => {
//     const style = window.getComputedStyle(child);
//     if (style.display === "none") {
//       hiddenElements.push({
//         element: child,
//         originalDisplay: child.style.display,
//       });
//       child.style.display = "block";
//     }
//   });

//   // Forcer reflow et mesurer
//   const height = el.scrollHeight;

//   // Restaurer les états initiaux
//   hiddenElements.forEach(({ element, originalDisplay }) => {
//     element.style.display = originalDisplay || "";
//   });

//   return height;
// }

// const createOpenAnimation = (
//   container,
//   basisClass,
//   adjustment = 0,
//   target = container
// ) => {
//   const basis = container.querySelector(basisClass);
//   let opened = false;

//   container.style.overflow = "hidden";
//   container.style.transition = "max-height 0.3s ease";
//   container.style.maxHeight = `${basis.scrollHeight + adjustment}px`;

//   target.addEventListener("click", (e) => {
//     if (!opened) {
//       // Mesurer la hauteur maximale potentielle même avec des enfants cachés
//       const fullHeight = measureFullHeight(container) + adjustment;

//       // Forcer reflow si nécessaire
//       void container.offsetHeight;

//       container.classList.add("open");
//       container.style.maxHeight = `${fullHeight}px`;
//       opened = true;
//     } else {
//       container.style.maxHeight = `${basis.scrollHeight + adjustment}px`;
//       container.classList.remove("open");
//       opened = false;
//     }
//   });
// };

const createOpenAnimation = (
  container,
  basisClass,
  adjustment = 0,
  target = container
) => {
  const basis = container.querySelector(basisClass);
  container.style.maxHeight = `${basis.scrollHeight + adjustment}px`;
  let opened = false;
  target.addEventListener("click", (e) => {
    if (!opened) {
      container.classList.add("open");
      container.style.maxHeight = `${
        container.scrollHeight + adjustment + 100
      }px`;
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

// REVIEWS BLOC
const reviewsRoot = document.querySelector(".reviews-bloc");

if (reviewsRoot) {
  const prevBtn = reviewsRoot.querySelector(".controls > .left");
  const nextBtn = reviewsRoot.querySelector(".controls > .right");
  const swiperContainer = reviewsRoot.querySelector(".swiper");

  const swiper = new Swiper(swiperContainer, {
    // Navigation arrows
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    slidesPerView: "auto", // Ajuste la largeur des slides
    centeredSlides: true, // Centre le groupe de slides
    loop: true,
    spaceBetween: 70,
  });
}

// TITLE SCROLL

const titleRoot = document.querySelector(".title-scroll");

if (titleRoot) {
  const title = titleRoot.querySelector(".content");

  window.addEventListener("scroll", () => {
    console.log(window.scrollY);
  });
  console.log(title.scrollWidth);
  // const logoWidth = logos[0].offsetWidth + 100;
  // const totalOriginalLogos = logos.length / 2; // car on a dupliqué
  // const loopWidth = logoWidth * totalOriginalLogos;
  // let scrollOffset = 0;
  // window.addEventListener("scroll", () => {
  //   const speed = 0.5;
  //   scrollOffset = window.scrollY * speed;
  //   // Boucle infinie : reset dès qu'on dépasse la moitié
  //   const translateX = scrollOffset % loopWidth;
  //   // track.style.transform = `translateX(-${translateX}px)`;
  //   // track.style.transform = `translateX(${translateX}px)`;
  //   track.style.transform = direction
  //     ? `translateX(-${translateX}px)`
  //     : `translateX(${translateX}px)`;
  // });
}

// FAQ BLOC
const faqRoot = document.querySelector(".faq-bloc");

if (faqRoot) {
  const faqBlocs = document.querySelectorAll(".question-bloc");
  faqBlocs.forEach((el) => {
    createOpenAnimation(el, ".question", 20);
  });
}

// STEPS
const stepsRoot = document.querySelector(".steps-bloc");

if (stepsRoot) {
}

// ADVANTAGES BLOG
const advantagesRoot = document.querySelector(".advantages");

if (advantagesRoot) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const items = advantagesRoot.querySelectorAll(".item");
  items.forEach((el) => {
    observer.observe(el);
  });
}

// NAV
const navRoot = document.querySelector("nav.navigation");

if (navRoot) {
  if (window.innerWidth < 992) {
    // Animation of the subelements of menu
    const selects = navRoot.querySelectorAll(".menu-item-container");
    selects.forEach((el) => createOpenAnimation(el, ".menu-item", 2));
    // Open animation of the menu with burger
    const burger = navRoot.querySelector(".burger");
    createOpenAnimation(navRoot, ".top", 0, burger);
  }
}

// TWO COLUMNS
const twoRoot = document.querySelector(".two-columns");

if (twoRoot) {
  const prevBtn = twoRoot.querySelector(".controls > .left");
  const nextBtn = twoRoot.querySelector(".controls > .right");
  const swiperContainer = twoRoot.querySelector(".slider");
  const swiper = new Swiper(swiperContainer, {
    slidesPerView: "auto", // Ajuste la largeur des slides
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    loop: true,
  });
}

// PARTNERS
const partnersRoot = document.querySelector(".partners");

if (partnersRoot) {
  // First line
  const createTrackSlide = (track, logos, direction = true) => {
    logos.forEach((el) => {
      const clone = el.cloneNode(true);
      direction ? track.appendChild(clone) : track.prepend(clone);
    });
    const logoWidth = logos[0].offsetWidth + 100;

    const totalOriginalLogos = logos.length / 2; // car on a dupliqué
    const loopWidth = logoWidth * totalOriginalLogos;

    let scrollOffset = 0;

    window.addEventListener("scroll", () => {
      const speed = 0.5;
      scrollOffset = window.scrollY * speed;

      // Boucle infinie : reset dès qu'on dépasse la moitié
      const translateX = scrollOffset % loopWidth;
      // track.style.transform = `translateX(-${translateX}px)`;
      // track.style.transform = `translateX(${translateX}px)`;
      track.style.transform = direction
        ? `translateX(-${translateX}px)`
        : `translateX(${translateX}px)`;
    });
  };

  const firstTrack = partnersRoot.querySelector(".logos-line.first");
  const secondTrack = partnersRoot.querySelector(".logos-line.second");
  const firstLogos = firstTrack.querySelectorAll(".logo-item");
  const secondLogos = secondTrack.querySelectorAll(".logo-item");

  createTrackSlide(firstTrack, firstLogos, true);
  createTrackSlide(secondTrack, secondLogos, false);
}

// TIMELINE
const timelineRoot = document.querySelector(".timeline");

if (timelineRoot) {
  const zenBtn = timelineRoot.querySelector("#zen-btn");
  const smartBtn = timelineRoot.querySelector("#smart-btn");
  const zenSlider = timelineRoot.querySelector(".zenSlider");
  const smartSlider = timelineRoot.querySelector(".smartSlider");
  const overall = timelineRoot.querySelectorAll(".overall");
  overall.forEach((swiperContainer) => {
    const prevBtn = swiperContainer.querySelector(".controls > .left");
    const nextBtn = swiperContainer.querySelector(".controls > .right");
    const triggers = swiperContainer.querySelectorAll(".step");
    const sliderContainer = swiperContainer.querySelector(".slider");

    const swiper = new Swiper(sliderContainer, {
      slidesPerView: "auto", // Ajuste la largeur des slides
      centeredSlides: true, // Centre le groupe de slides
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },
    });

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        triggers.forEach((el) => el.classList.remove("open"));
        trigger.classList.add("open");
        const slideIndex = parseInt(trigger.dataset.slide, 10);
        swiper.slideTo(slideIndex);
      });
    });
    prevBtn.addEventListener("click", (e) => {
      changeSwiperDots(swiper, triggers);
    });
    nextBtn.addEventListener("click", (e) => {
      changeSwiperDots(swiper, triggers);
    });
  });

  zenBtn.addEventListener("click", (e) => {
    zenBtn.classList.add("open");
    smartBtn.classList.remove("open");
    zenSlider.classList.remove("none");
    smartSlider.classList.add("none");
  });
  smartBtn.addEventListener("click", (e) => {
    smartBtn.classList.add("open");
    zenBtn.classList.remove("open");
    smartSlider.classList.remove("none");
    zenSlider.classList.add("none");
  });
}

// HERO SECTION V1
const heroRoot = document.querySelector(".hero-section-v1");

if (heroRoot) {
  const sliderContainer = heroRoot.querySelector(".solutions-slider");
  if (sliderContainer) {
    const leftButton = heroRoot.querySelector(".controls > .left");
    const rightButton = heroRoot.querySelector(".controls > .right");
    const swiper = new Swiper(sliderContainer, {
      slidesPerView: "auto", // Ajuste la largeur des slides
      centeredSlides: true, // Centre le groupe de slides
      spaceBetween: 20,
      navigation: {
        prevEl: leftButton,
        nextEl: rightButton,
      },
    });
  }
}

// NESTED BLOCKS
const nestedBlocks = document.querySelectorAll(".nested-blocks");

if (nestedBlocks) {
  nestedBlocks?.forEach((block) => {
    const sliderContainer = block.querySelector(".slider");
    const swiper = new Swiper(sliderContainer, {
      slidesPerView: "auto",
      centeredSlides: true,
    });
    const triggers = block.querySelectorAll(".step");
    activateSliderDots(triggers, swiper);
  });
}

// CALCULATOR
const calculatorRoot = document.querySelector(".calculator-v1");

if (calculatorRoot) {
  const input = calculatorRoot.querySelector("#price");
  const smartTrad = calculatorRoot.querySelector("#smart-trad");
  const smartDigit = calculatorRoot.querySelector("#smart-digit");
  const smartKeynavo = calculatorRoot.querySelector("#smart-keynavo");
  const smartResult = calculatorRoot.querySelector("#smart-result");
  const zenTrad = calculatorRoot.querySelector("#zen-trad");
  const zenDigit = calculatorRoot.querySelector("#zen-digit");
  const zenKeynavo = calculatorRoot.querySelector("#zen-keynavo");
  const zenResult = calculatorRoot.querySelector("#zen-result");

  const changeValues = (price) => {
    // Smart
    const smartTradValue = (price * 0.1 * 12).toFixed(1);
    smartTrad.innerHTML = `${smartTradValue}€`;
    const smartDigitValue = (price * 0.05 * 12).toFixed(1);
    smartDigit.innerHTML = `${smartDigitValue}€`;
    const smartKeynavoValue = (19.9 * 12).toFixed(1);
    smartKeynavo.innerHTML = `${smartKeynavoValue}€`;
    smartResult.innerHTML = `${(smartDigitValue - smartKeynavoValue).toFixed(
      1
    )}€ à ${(smartTradValue - smartKeynavoValue).toFixed(1)}€ / an`;

    // Zen
    zenTrad.innerHTML = `${smartTradValue}€`;
    zenDigit.innerHTML = `${smartDigitValue}€`;
    const zenKeynavoValue = `${19.9 * 12 + price * 0.025 * 12}`;
    zenKeynavo.innerHTML = `${zenKeynavoValue}€`;
    zenResult.innerHTML = `${(smartDigitValue - zenKeynavoValue).toFixed(
      1
    )}€ à ${(smartTradValue - zenKeynavoValue).toFixed(1)}€ / an`;
  };
  input.addEventListener("change", (e) => {
    changeValues(parseInt(e.target.value, 10));
  });
}
