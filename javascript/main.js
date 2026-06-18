/* MENU MOBILE */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* BOTÃO VER MAIS */

const btnLerMais = document.getElementById("btn-ler-mais");
const textoCompleto = document.getElementById("texto-completo");

if (btnLerMais && textoCompleto) {
  btnLerMais.addEventListener("click", () => {
    textoCompleto.classList.toggle("ativo");

    btnLerMais.textContent = textoCompleto.classList.contains("ativo")
      ? "Ler menos"
      : "Ler mais";
  });
}
/* SLIDER */

const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let current = 0;

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach((slide) => slide.classList.remove("active"));

  slides[index].classList.add("active");
}

if (next && slides.length) {
  next.addEventListener("click", () => {
    current++;

    if (current >= slides.length) {
      current = 0;
    }

    showSlide(current);
  });
}

if (prev && slides.length) {
  prev.addEventListener("click", () => {
    current--;

    if (current < 0) {
      current = slides.length - 1;
    }

    showSlide(current);
  });
}

const imagensGaleria = document.querySelectorAll(".slide-track img");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const fecharLightbox = document.querySelector(".lightbox-fechar");

const btnPrev = document.querySelector(".lightbox-prev");
const btnNext = document.querySelector(".lightbox-next");

let imagemAtual = 0;

// ABRIR IMAGEM

imagensGaleria.forEach((imagem, index) => {
  imagem.addEventListener("click", () => {
    imagemAtual = index;

    lightbox.classList.add("ativo");
    lightboxImg.src = imagem.src;
  });
});

// FECHAR NO X

fecharLightbox.addEventListener("click", () => {
  lightbox.classList.remove("ativo");
});

// FECHAR CLICANDO FORA

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("ativo");
  }
});

// PRÓXIMA FOTO

btnNext.addEventListener("click", () => {
  imagemAtual++;

  if (imagemAtual >= imagensGaleria.length) {
    imagemAtual = 0;
  }

  lightboxImg.src = imagensGaleria[imagemAtual].src;
});

// FOTO ANTERIOR

btnPrev.addEventListener("click", () => {
  imagemAtual--;

  if (imagemAtual < 0) {
    imagemAtual = imagensGaleria.length - 1;
  }

  lightboxImg.src = imagensGaleria[imagemAtual].src;
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("ativo")) return;

  if (e.key === "ArrowRight") {
    btnNext.click();
  }

  if (e.key === "ArrowLeft") {
    btnPrev.click();
  }

  if (e.key === "Escape") {
    lightbox.classList.remove("ativo");
  }
});
