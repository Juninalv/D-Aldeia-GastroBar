const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const slides = document.querySelectorAll(".slide");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let current = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));

  slides[index].classList.add("active");
}

next.addEventListener("click", () => {
  current++;

  if (current >= slides.length) {
    current = 0;
  }

  showSlide(current);
});

prev.addEventListener("click", () => {
  current--;

  if (current < 0) {
    current = slides.length - 1;
  }

  showSlide(current);
});
