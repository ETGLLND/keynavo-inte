// export default reviews = (reviewsRoot) => {
const reviewsRoot = document.querySelector(".reviews-bloc");

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
// };
