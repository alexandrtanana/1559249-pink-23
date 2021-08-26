const carousels = document.querySelectorAll(".carousel");

carousels.forEach(initCarousel);

function initCarousel(carousel) {
  const wrapper = carousel.querySelector(".carousel__wrapper");

  const tableMode = !Boolean(wrapper.querySelector(".carousel__slide"));

  const slides = tableMode
    ? wrapper.querySelectorAll(".carousel__table-col")
    : wrapper.querySelectorAll(".carousel__slide");

  const dots = carousel.querySelectorAll(".carousel__dot");

  let current = 0;

  /* Подсвечивает нужную точку при скролле */
  const observerOptions = {
    root: wrapper,
    rootMargin: "0px",
    threshold: 0.5
  };

  function highlightDotOnScroll(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        dots.forEach((dot, index) => {
          const isActive = removeHashFromLink(dot) === entry.target.id;
          dot.classList.toggle("carousel__dot--active", isActive);
          if (isActive) {
            current = index;
            // console.log(`Current of ${carousel.classList[1]}: ${current}`);
          }
        });
      }
    });
  }

  const observer = new IntersectionObserver(
    highlightDotOnScroll,
    observerOptions
  );
  slides.forEach((slide) => {
    observer.observe(slide);
  });

  /* Пролистывает таблицу на вторую позицию */
  const startSlider = carousel.dataset.start;

  if (Boolean(startSlider)) {
    // console.log(startSlider)
    scrollToSlide(slides[Number(startSlider)]);
  }

  /* Меняет поведение точек */
  dots.forEach((dot) => {
    dot.addEventListener("click", (evt) => {
      evt.preventDefault();
      const targetSlide = wrapper.querySelector(dot.getAttribute("href"));
      scrollToSlide(targetSlide);
    });
  });



  function scrollToSlide(slide) {
    wrapper.scrollTo({
      left: slide.offsetLeft,
      behavior: "smooth"
    });
  }
}

function removeHashFromLink(link) {
  const href = link.getAttribute("href");
  return href.substring(1);
}
