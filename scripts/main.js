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
  const prevBtn = timelineRoot.querySelector(".controls > .left");
  const nextBtn = timelineRoot.querySelector(".controls > .right");
  const swiperContainer = timelineRoot.querySelector(".slider");
  const triggers = timelineRoot.querySelectorAll(".step");
  const swiper = new Swiper(swiperContainer, {
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
