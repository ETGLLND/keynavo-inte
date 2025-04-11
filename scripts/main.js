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

// REVIEWS BLOC
const reviewsRoot = document.querySelector(".reviews-bloc");

if (reviewsRoot) {
  const prevBtn = reviewsRoot.querySelector(".controls > .left");
  const nextBtn = reviewsRoot.querySelector(".controls > .right");
  const swiper = new Swiper(".swiper", {
    // Navigation arrows
    navigation: {
      prevEl: ".controls > .left",
      nextEl: ".controls > .right",
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
  const text = titleRoot.querySelector(".content");
  const length = text.clientWidth;
  console.log({ length });
  gsap.to(".title-scroll>.content", {
    scrollTrigger: {
      trigger: ".title-scroll",
      scrub: 1,
      markers: true,
      start: "top 50%",
      end: "bottom 50%",
    },
    left: `-${length}px`,
    scrub: true,
  });
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
  const flkty = new Flickity(stepsRoot.querySelector(".slider"), {
    cellAlign: "left",
    contain: true,
    // wrapAround: true,
    pageDots: false,
    groupCells: true,
  });

  const buttons = stepsRoot.querySelectorAll(".title-item");
  buttons.forEach((el, id) => {
    el.addEventListener("click", () => {
      // goToSlide(id);
      flkty.select(id);
    });
  });

  // const slider = stepsRoot.querySelector(".slider");
  // const items = stepsRoot.querySelectorAll(".slider-item");
  // const totalItems = items.length;
  // let currentIndex = 0;

  // function goToSlide(index) {
  //   if (index < 0 || index >= totalItems) return;
  //   currentIndex = index;
  //   const offset = -index * 100; // Déplacement en pourcentage
  //   slider.style.transform = `translateX(${offset}%)`;
  //   slider.style.transition = "transform 0.5s ease-in-out";
  // }

  // // Ajout d'écouteurs d'événements sur les boutons
  // const buttons = stepsRoot.querySelectorAll(".title-item");
  // buttons.forEach((el, id) => {
  //   el.addEventListener("click", () => {
  //     goToSlide(id);
  //   });
  // });
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
  // const firstSub = navRoot.querySelector(".sub-item");
  // console.log(firstSub.scrollWidth);
}
