export default initTitleScroll = () => {
  const title = titleRoot.querySelector(".content");

  const titleWidth = title.offsetWidth;

  gsap.fromTo(
    title,
    {
      x: -titleWidth,
    },
    {
      x: titleWidth,
      scrollTrigger: {
        trigger: titleRoot,
        scrub: 1,
        start: 500,
        markers: true,
      },
    }
  );
};
