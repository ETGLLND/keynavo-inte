const root = document.querySelector(".reviews-bloc > .reviews-container");
const prevBtn = document.querySelector(".controls > .left");
const nextBtn = document.querySelector(".controls > .right");

const flkty = new Flickity(root, {
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
