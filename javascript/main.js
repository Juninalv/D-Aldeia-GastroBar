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

/* EVENTOS */
const eventos = [
  {
    titulo: "Dia dos Namorados",
    data: "12 de Junho • Jantar das 17h às 00h",
    descricao:
      "Uma noite especial para celebrar o amor com menu exclusivo, vinhos selecionados e experiências pensadas para casais.",
    imagem: "./img/pagina-inicial/eventos/evento-1.jpg",
    link: "https://wa.me/5512996078960",
  },

  {
    titulo: "Noite do Rock",
    data: "18 de Junho • A partir das 20h",
    descricao:
      "Música ao vivo, cervejas especiais e um cardápio preparado para uma noite inesquecível.",
    imagem: "./img/pagina-inicial/eventos/evento-2.jpg",
    link: "https://wa.me/5512996078960",
  },

  {
    titulo: "Festival de Inverno",
    data: "25 de Junho • A partir das 19h",
    descricao:
      "Pratos exclusivos, vinhos selecionados e atrações especiais para aproveitar o clima da estação.",
    imagem: "./img/pagina-inicial/eventos/evento-3.jpg",
    link: "https://wa.me/5512996078960",
  },

  {
    titulo: "Happy Hour Especial",
    data: "Toda Sexta • 18h às 22h",
    descricao:
      "Drinks selecionados, petiscos e música ambiente para começar o final de semana da melhor forma.",
    imagem: "./img/pagina-inicial/eventos/evento-4.jpg",
    link: "https://wa.me/5512996078960",
  },
];

let eventoAtual = 0;

const img = document.getElementById("evento-img");
const titulo = document.getElementById("evento-titulo");
const data = document.getElementById("evento-data");
const descricao = document.getElementById("evento-descricao");
const link = document.getElementById("evento-link");

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const indicadores = document.getElementById("indicadores");

function renderizarEvento(index) {
  const evento = eventos[index];

  img.src = evento.imagem;
  titulo.textContent = evento.titulo;
  data.textContent = evento.data;
  descricao.textContent = evento.descricao;
  link.href = evento.link;

  document.querySelectorAll(".indicadores span").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

eventos.forEach((_, i) => {
  const dot = document.createElement("span");

  dot.addEventListener("click", () => {
    eventoAtual = i;
    renderizarEvento(eventoAtual);
  });

  indicadores.appendChild(dot);
});

next.addEventListener("click", () => {
  eventoAtual++;

  if (eventoAtual >= eventos.length) {
    eventoAtual = 0;
  }

  renderizarEvento(eventoAtual);
});

prev.addEventListener("click", () => {
  eventoAtual--;

  if (eventoAtual < 0) {
    eventoAtual = eventos.length - 1;
  }

  renderizarEvento(eventoAtual);
});

renderizarEvento(eventoAtual);
