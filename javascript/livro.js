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
