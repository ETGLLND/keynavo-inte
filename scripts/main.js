import gsap from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// REVIEWS BLOC
const reviewsRoot = document.querySelector(".reviews-bloc");

if (reviewsRoot) {
  const prevBtn = reviewsRoot.querySelector(".controls > .left");
  const nextBtn = reviewsRoot.querySelector(".controls > .right");
  // const flkty = new Flickity(reviewsRoot.querySelector(".reviews-container"), {
  //   prevNextButtons: false,
  //   pageDots: false,
  //   gap: 45,
  // });
  // console.log(flkty);
  // prevBtn.addEventListener("click", () => {
  //   flkty.previous();
  // });
  // nextBtn.addEventListener("click", () => {
  //   flkty.next();
  // });
  // var splide = new Splide("#reviews-splide", {
  //   gap: "7rem",
  // });
  // splide.mount();
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
    const question = el.querySelector(".question");
    el.style.maxHeight = `${question.scrollHeight + 20}px`;
    let opened = false;
    el.addEventListener("click", (e) => {
      if (!opened) {
        el.classList.add("open");
        el.style.maxHeight = `${el.scrollHeight}px`;
        opened = true;
      } else {
        el.style.maxHeight = `${question.scrollHeight + 20}px`;
        el.classList.remove("open");
        opened = false;
      }
    });
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
