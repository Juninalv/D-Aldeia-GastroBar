/* ================================
   LISTA DE EVENTOS
   ================================

   Para adicionar um novo evento:
   1. Copie o bloco inteiro de um evento existente.
   2. Cole dentro do array eventos.
   3. Altere título, data, descrição, imagens e link.

================================ */

const eventos = [
  {
    titulo: "Dia dos Namorados",
    data: "12 de Junho • Jantar das 17h às 00h",
    descricao:
      "Uma noite especial para celebrar o amor com menu exclusivo, vinhos selecionados e experiências pensadas para casais.",

    // Quantidade de imagens do evento
    imagens: [
      "./img/pagina-inicial/eventos/evento-1.jpg",
      "./img/pagina-inicial/eventos/evento-2.jpg",
      "./img/pagina-inicial/eventos/evento-3.jpg",
      "./img/pagina-inicial/eventos/evento-4.jpg",
    ],

    link: "https://wa.me/5512996078960",
  },

 

  /*
  =================================
  ADICIONAR NOVOS EVENTOS AQUI
  =================================

  {
    titulo: "Nome do evento",
    data: "Data • Horário",
    descricao:
      "Descrição do evento.",

    imagens: [
      "./img/pagina-inicial/eventos/evento-5.jpg",
      "./img/pagina-inicial/eventos/evento-6.jpg",
    ],

    link: "https://wa.me/5512996078960",
  },

  */
];

let eventoAtual = 0;
let fotoAtual = 0;

// ELEMENTOS DA PÁGINA
const img = document.getElementById("evento-img");
const titulo = document.getElementById("evento-titulo");
const data = document.getElementById("evento-data");
const descricao = document.getElementById("evento-descricao");
const link = document.getElementById("evento-link");

const fotoPrev = document.querySelector(".foto-prev");
const fotoNext = document.querySelector(".foto-next");

const eventoPrev = document.querySelector(".evento-prev");
const eventoNext = document.querySelector(".evento-next");

function renderizarEvento() {
  const evento = eventos[eventoAtual];

  img.src = evento.imagens[fotoAtual];

  titulo.textContent = evento.titulo;
  data.textContent = evento.data;
  descricao.textContent = evento.descricao;
  link.href = evento.link;
}

/* ================================
   TROCA DAS FOTOS DO EVENTO
   Continua funcionando mesmo com
   apenas um evento cadastrado.
================================ */

fotoNext.addEventListener("click", () => {
  const totalFotos = eventos[eventoAtual].imagens.length;

  fotoAtual++;

  if (fotoAtual >= totalFotos) {
    fotoAtual = 0;
  }

  renderizarEvento();
});

fotoPrev.addEventListener("click", () => {
  const totalFotos = eventos[eventoAtual].imagens.length;

  fotoAtual--;

  if (fotoAtual < 0) {
    fotoAtual = totalFotos - 1;
  }

  renderizarEvento();
});

/* ================================
   TROCA ENTRE EVENTOS

   Só ativa quando existir mais
   de um evento cadastrado.

   Com apenas um evento:
   - Não troca
   - Não dá erro
================================ */

if (eventos.length > 1) {
  eventoNext.addEventListener("click", () => {
    eventoAtual++;

    if (eventoAtual >= eventos.length) {
      eventoAtual = 0;
    }

    fotoAtual = 0;

    renderizarEvento();
  });

  eventoPrev.addEventListener("click", () => {
    eventoAtual--;

    if (eventoAtual < 0) {
      eventoAtual = eventos.length - 1;
    }

    fotoAtual = 0;

    renderizarEvento();
  });
} else {
  // Esconde os botões caso exista apenas um evento
  if (eventoNext) eventoNext.style.display = "none";
  if (eventoPrev) eventoPrev.style.display = "none";
}

// CARREGA O PRIMEIRO EVENTO
renderizarEvento();
