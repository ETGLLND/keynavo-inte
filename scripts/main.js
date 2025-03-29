import gsap from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reviewsRoot = document.querySelector(
  ".reviews-bloc > .reviews-container"
);
const prevBtn = document.querySelector(".controls > .left");
const nextBtn = document.querySelector(".controls > .right");

if (reviewsRoot) {
  const flkty = new Flickity(reviewsRoot, {
    prevNextButtons: false,
    pageDots: false,
    gap,
  });
  prevBtn.addEventListener("click", () => {
    console.log("previous");
    flkty.previous();
  });
  nextBtn.addEventListener("click", () => {
    console.log("next");
    flkty.next();
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
