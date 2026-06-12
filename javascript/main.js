/* MENU MOBILE */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
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

/* =========================
   LIVRO PDF COM PAGEFLIP
========================= */

const pdfUrl = "./pdf/material-aldeia.pdf";

const flipBook = document.getElementById("flipbook");

async function carregarPDF() {
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const viewport = page.getViewport({
      scale: 2,
    });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    const pageElement = document.createElement("div");
    pageElement.classList.add("page");

    pageElement.appendChild(canvas);
    flipBook.appendChild(pageElement);
  }

  const pageFlip = new St.PageFlip(flipBook, {
    width: 500,
    height: 700,
    size: "stretch",
    showCover: true,
    mobileScrollSupport: true,
  });

  pageFlip.loadFromHTML(document.querySelectorAll(".page"));
}

/* ABRIR LIVRO */
document.querySelectorAll(".abrir-livro").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    document.getElementById("livroModal").classList.add("active");

    document.body.style.overflow = "hidden";

    if (!flipBook.hasChildNodes()) {
      await carregarPDF();
    }
  });
});

/* FECHAR LIVRO */
document.getElementById("fecharLivro").addEventListener("click", fecharLivro);

/* FECHAR AO CLICAR FORA */
document.getElementById("livroModal").addEventListener("click", (e) => {
  if (e.target.id === "livroModal") {
    fecharLivro();
  }
});

/* FECHAR COM ESC */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    fecharLivro();
  }
});

function fecharLivro() {
  document.getElementById("livroModal").classList.remove("active");
  document.body.style.overflow = "";
}
