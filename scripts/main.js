import gsap from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// FUNCTIONS

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

  // const titleWidth = title.offsetWidth - 100;
  // const titleWidth = 900;
  const start = -1500;
  const end = 900;

  gsap.fromTo(
    title,
    {
      // x: -titleWidth,
      x: start,
    },
    {
      // x: titleWidth,
      x: end,
      scrollTrigger: {
        trigger: titleRoot,
        scrub: 1,
        start: 400,
      },
    }
  );
}

// FAQ BLOC
const faqRoot = document.querySelector(".faq-bloc");

if (faqRoot) {
  const faqBlocs = document.querySelectorAll(".question-bloc");
  faqBlocs.forEach((el) => {
    createOpenAnimation(el, ".question", 30);
  });
}

// STEPS
const stepsRoot = document.querySelector(".steps-bloc");

if (stepsRoot) {
  const sliderContainer = stepsRoot.querySelector(".slider");
  const dots = stepsRoot.querySelectorAll(".title-item");
  const swiper = new Swiper(sliderContainer, {
    slidesPerView: "auto",
    centeredSlides: true,
  });
  activateSliderDots(dots, swiper);
}

// ADVANTAGES BLOG
const advantagesRoot = document.querySelector(".advantages");

if (advantagesRoot) {
  const items = advantagesRoot.querySelectorAll(".item");
  const image = advantagesRoot.querySelector(".illustration");

  gsap.utils.toArray(items).forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 0.1,
      // delay: i * 0.2, // Décalage progressif
      scrollTrigger: {
        trigger: el,
        start: "top 80%", // quand l'élément entre dans le viewport,
        toggleActions: "play none none none",
      },
    });
  });

  // image animation
  if (window.innerWidth >= 768) {
    gsap.to(image, {
      width: 650,
      scrollTrigger: {
        trigger: advantagesRoot,
        scrub: 1,
        top: "top 40%",
        end: "bottom bottom",
      },
    });
  }
}

// NAV
const navRoot = document.querySelector("nav.navigation");

if (navRoot) {
  if (window.innerWidth < 992) {
    // Animation of the subelements of menu
    const selects = navRoot.querySelectorAll(".menu-item-container");
    selects.forEach((el) => createOpenAnimation(el, ".menu-item", 2, el, true));
    // Open animation of the menu with burger
    const burger = navRoot.querySelector(".burger");
    createOpenAnimation(navRoot, ".top", 0, burger, true);
  }

  const logo = navRoot.querySelector(".logo-container > img");

  document.addEventListener("scroll", (e) => {
    if (window.scrollY > 0) {
      Object.assign(logo.style, {
        transform: "scale(1.55) translateX(-13px)",
      });
    } else {
      Object.assign(logo.style, {
        transform: "unset",
      });
    }
  });
}

// TWO COLUMNS
const twoRoots = document.querySelectorAll(".two-columns");

if (twoRoots) {
  twoRoots.forEach((twoRoot) => {
    console.log("bonjour");
    const prevBtn = twoRoot.querySelector(".controls > .left");
    const nextBtn = twoRoot.querySelector(".controls > .right");
    const swiperContainer = twoRoot.querySelector(".slider");
    const swiper = new Swiper(swiperContainer, {
      slidesPerView: "auto", // Ajuste la largeur des slides
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },
      // loop: true,
    });
  });
}

// PARTNERS
const partnersRoot = document.querySelector(".partners");

if (partnersRoot) {
  const firstTrack = partnersRoot.querySelector(".logos-line.first");
  const secondTrack = partnersRoot.querySelector(".logos-line.second");
  const firstLogos = firstTrack.querySelectorAll(".logo-item");
  const secondLogos = secondTrack.querySelectorAll(".logo-item");
  const title = partnersRoot.querySelector(".text");

  const duplicateElements = (elems, container) => {
    elems.forEach((elem, id) => {
      const clone = elem.cloneNode(true);
      const refChild = container.children[id];
      container.insertBefore(clone, refChild);
    });

    elems.forEach((elem, id) => {
      const clone = elem.cloneNode(true);
      container.appendChild(clone);
    });
  };

  if (window.innerWidth > 1120) {
    duplicateElements(firstLogos, firstTrack);
    duplicateElements(secondLogos, secondTrack);
    // Title
    gsap.fromTo(
      title,
      {
        x: -title.offsetWidth - 100,
      },
      {
        // x: title.offsetWidth + window.innerWidth,
        x: window.innerWidth,
        scrollTrigger: {
          trigger: partnersRoot,
          scrub: 1,
          start: "top 30%",
        },
      }
    );
    // First track
    if (window.innerWidth <= 768) {
      gsap.fromTo(
        firstTrack,
        {
          x: -1500,
        },
        {
          x: 0,
          scrollTrigger: {
            trigger: partnersRoot,
            scrub: 1,
            start: "top 70%",
          },
        }
      );
    } else {
      gsap.fromTo(
        firstTrack,
        {
          x: -1500,
        },
        {
          x: 0,
          scrollTrigger: {
            trigger: partnersRoot,
            scrub: 1,
            start: "top 70%",
          },
        }
      );
    }
    // Second Track
    gsap.fromTo(
      secondTrack,
      {
        x: 0,
      },
      {
        x: -1500,
        scrollTrigger: {
          trigger: partnersRoot,
          scrub: 1,
          start: "top 70%",
          end: "bottom",
        },
      }
    );
  } else {
    gsap.fromTo(
      title,
      {
        x: -title.offsetWidth,
      },
      {
        x: title.offsetWidth + window.innerWidth,
        scrollTrigger: {
          trigger: partnersRoot,
          scrub: 1,
          start: "top 40%",
        },
      }
    );
    gsap.fromTo(
      firstTrack,
      {
        // x: -300,
        // x: -(firstTrack.offsetWidth + window.innerWidth),
        x: firstTrack.scrollWidth,
      },
      {
        // x: firstTrack.offsetWidth + window.innerWidth,
        x: -(firstTrack.scrollWidth + window.innerWidth),

        scrollTrigger: {
          trigger: partnersRoot,
          scrub: 1,
          // start: "top 0%",
          // end: "bottom 80%",
        },
      }
    );
    gsap.fromTo(
      secondTrack,
      {
        x: 0,
      },
      {
        x: -secondTrack.offsetWidth,
        scrollTrigger: {
          trigger: partnersRoot,
          scrub: 1,
          start: "top 30%",
        },
      }
    );
    duplicateElements(firstLogos, firstTrack);
    duplicateElements(secondLogos, secondTrack);
  }
}

// TIMELINE V1 ALT
const timelineRoot = document.querySelector(".timeline-v1-alt");

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

const timelineV1 = document.querySelector(".timeline-v1");

if (timelineV1) {
  const prevBtn = timelineV1.querySelector(".controls > .left");
  const nextBtn = timelineV1.querySelector(".controls > .right");
  const triggers = timelineV1.querySelectorAll(".step");
  const sliderContainer = timelineV1.querySelector(".slider");

  const swiper = new Swiper(sliderContainer, {
    slidesPerView: "auto",
    centeredSlides: true,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
  });

  activateSliderDots(triggers, swiper);
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
    // slider
    const leftButton = heroRoot.querySelector(".controls > .left");
    const rightButton = heroRoot.querySelector(".controls > .right");
    const swiper = new Swiper(sliderContainer, {
      initialSlide: 1,
      slidesPerView: "auto", // Ajuste la largeur des slides
      centeredSlides: true, // Centre le groupe de slides
      spaceBetween: 20,
      navigation: {
        prevEl: leftButton,
        nextEl: rightButton,
      },
    });

    // Opening of block
    // const container = heroRoot.querySelector(".content");
    // const computedWidth =
    //   window.innerWidth > 769
    //     ? window.innerWidth - 330
    //     : window.innerWidth - 80;
    // const heading = heroRoot.querySelector(".heading");
    // const solutionsContainer = heroRoot.querySelector(".solutions-container");
    // const solutionsSlider = heroRoot.querySelector(".solutions-slider");
    // heading.style.width = computedWidth + "px";
    // solutionsContainer.style.maxWidth = computedWidth + "px";
    // solutionsSlider.style.maxWidth = computedWidth + "px";

    // if (window.innerWidth > 769) {
    //   gsap.fromTo(
    //     container,
    //     {
    //       marginRight: 0,
    //       marginLeft: 0,
    //     },
    //     {
    //       marginRight: "100px",
    //       marginLeft: "100px",
    //       scrollTrigger: {
    //         trigger: container,
    //         scrub: 1,
    //         start: "top",
    //       },
    //     }
    //   );
    // } else {
    //   gsap.fromTo(
    //     container,
    //     {
    //       marginRight: 0,
    //       marginLeft: 0,
    //     },
    //     {
    //       marginRight: "20px",
    //       marginLeft: "20px",
    //       scrollTrigger: {
    //         trigger: container,
    //         scrub: 1,
    //         start: "top",
    //         end: "bottom 700px",
    //       },
    //     }
    //   );
    // }
  }
}

// ALL HERO SECTIONS
const heros = document.querySelectorAll(".hero-section");

heros.forEach((hero) => {
  const container = hero.querySelector(".shrink-container");
  const computedWidth =
    window.innerWidth > 769 ? window.innerWidth - 330 : window.innerWidth - 80;
  const shrinked = hero.querySelectorAll(".shrink");
  shrinked.forEach((el) => (el.style.width = computedWidth + "px"));

  if (window.innerWidth > 769) {
    gsap.fromTo(
      container,
      {
        marginRight: 0,
        marginLeft: 0,
      },
      {
        marginRight: "100px",
        marginLeft: "100px",
        scrollTrigger: {
          trigger: container,
          scrub: 1,
          start: "top",
        },
      }
    );
  } else {
    gsap.fromTo(
      container,
      {
        marginRight: 0,
        marginLeft: 0,
      },
      {
        marginRight: "20px",
        marginLeft: "20px",
        scrollTrigger: {
          trigger: container,
          scrub: 1,
          start: "top",
          end: "bottom 700px",
        },
      }
    );
  }
});

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
    const smartTradValue = parseFloat((price * 0.085 * 12).toFixed(1));
    smartTrad.innerHTML = `${smartTradValue}€`;
    const smartDigitValue = parseFloat((price * 0.045 * 12).toFixed(1));
    smartDigit.innerHTML = `${smartDigitValue}€`;
    const smartKeynavoValue = parseFloat((24.9 * 12).toFixed(1));
    smartKeynavo.innerHTML = `${smartKeynavoValue}€`;
    smartResult.innerHTML = `${parseFloat(
      smartDigitValue - smartKeynavoValue
    ).toFixed(1)}€ à ${parseFloat(
      (smartTradValue - smartKeynavoValue).toFixed(1)
    )}€ / an`;

    // Zen
    zenTrad.innerHTML = `${smartTradValue}€`;
    zenDigit.innerHTML = `${smartDigitValue}€`;
    const zenKeynavoValue = `${(19.9 * 12).toFixed(1)}`;
    zenKeynavo.innerHTML = `${zenKeynavoValue}€`;
    zenResult.innerHTML = `${parseFloat(
      (smartDigitValue - zenKeynavoValue).toFixed(1)
    )}€ à ${parseFloat((smartTradValue - zenKeynavoValue).toFixed(1))}€ / an`;
  };
  input.addEventListener("change", (e) => {
    changeValues(parseInt(e.target.value, 10));
  });
}

// FOOTER
const footer = document.querySelector("footer.footer");

if (footer) {
  // const before = document.querySelector(".before-footer");
  gsap.fromTo(
    footer,
    {
      maxHeight: 0,
    },
    {
      // maxHeight: footer.offsetHeight,
      maxHeight: footer.scrollHeight,
      scrollTrigger: {
        trigger: footer,
        scrub: 1,
        // start: "start",
        end: "bottom bottom",
      },
    }
  );
}

// TABS SWITCH
const tabsSwitchRoot = document.querySelector(".tabs-switch");

if (tabsSwitchRoot) {
  const sliderContainers = tabsSwitchRoot.querySelectorAll(".swiper");
  sliderContainers.forEach((sliderContainer) => {
    const dots = tabsSwitchRoot.querySelectorAll(".dots-container>.step");
    const swiper = new Swiper(sliderContainer, {
      slidesPerView: "auto",
      centeredSlides: true,
    });
    activateSliderDots(dots, swiper);
  });

  const tabs = tabsSwitchRoot.querySelectorAll(".tab");
  const containers = tabsSwitchRoot.querySelectorAll(".content-container");

  tabs.forEach((tab, id) => {
    tab.addEventListener("click", (e) => {
      tabs.forEach((tab) => {
        tab.classList.remove("open");
      });
      tab.classList.add("open");
      containers.forEach((container, idContainer) => {
        id === idContainer
          ? container.classList.add("open")
          : container.classList.remove("open");
      });
    });
  });
}

// IDENTITY
const identityRoot = document.querySelector(".identity");

if (identityRoot) {
  if (window.innerWidth <= 576) {
    const cards = identityRoot.querySelectorAll(".card-container");
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        cards.forEach((el) => el.classList.remove("up"));
        card.classList.add("up");
      });
    });
  }
}

// CHOICE
const choiceRoot = document.querySelector(".choice-form");

if (choiceRoot) {
  const sliderContainer = choiceRoot.querySelector(".choice-container");
  const swiper = new Swiper(sliderContainer, {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
  });
}

// PACKS
const packRoot = document.querySelector(".packs");

if (packRoot) {
  const moreBtn = packRoot.querySelector(".more");
  const moreTxt = packRoot.querySelector(".more-text");

  moreBtn.addEventListener("click", (e) => {
    moreTxt.style.marginTop = "15px";
    moreTxt.style.maxHeight = moreTxt.scrollHeight + "px";
  });
}
