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

/* CARRINHO */

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function toggleCarrinho() {
  const sidebar = document.getElementById("cartSidebar");

  if (sidebar) {
    sidebar.classList.toggle("active");
  }
}

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarAoCarrinho(nome, preco) {
  const item = carrinho.find((produto) => produto.nome === nome);

  if (item) {
    item.qtd++;
  } else {
    carrinho.push({
      nome,
      preco,
      qtd: 1,
    });
  }

  atualizarCarrinho();
}

function alterarQtd(nome, valor) {
  const item = carrinho.find((produto) => produto.nome === nome);

  if (!item) return;

  item.qtd += valor;

  if (item.qtd <= 0) {
    carrinho = carrinho.filter((produto) => produto.nome !== nome);
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("cart-items");
  const contador = document.getElementById("cart-count");
  const totalElemento = document.getElementById("cart-total");

  if (!lista || !contador || !totalElemento) return;

  lista.innerHTML = "";

  let total = 0;
  let quantidade = 0;

  carrinho.forEach((item) => {
    total += item.preco * item.qtd;
    quantidade += item.qtd;

    lista.innerHTML += `
      <div class="cart-item">

        <div>
          <strong>${item.nome}</strong>
          <br>
          R$ ${(item.preco * item.qtd).toFixed(2).replace(".", ",")}
        </div>

        <div class="cart-controls">

          <button onclick="alterarQtd('${item.nome}', -1)">
            -
          </button>

          <span>${item.qtd}</span>

          <button onclick="alterarQtd('${item.nome}', 1)">
            +
          </button>

        </div>

      </div>
    `;
  });

  contador.innerText = quantidade;

  totalElemento.innerText = `R$ ${total.toFixed(2).replace(".", ",")}`;

  salvarCarrinho();
}

/* PRODUTOS */

document.querySelectorAll(".btn-add").forEach((botao) => {
  botao.addEventListener("click", () => {
    const card = botao.closest(".produto-card");

    const nome = card.querySelector("h3").innerText;

    const precoTexto = card.querySelector(".preco").innerText;

    const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));

    adicionarAoCarrinho(nome, preco);
  });
});

/* DOSES */

document.querySelectorAll(".btn-add-mini").forEach((botao) => {
  botao.addEventListener("click", () => {
    const item = botao.closest(".item-cardapio");

    const nome = item.querySelector("span").innerText;

    const precoTexto = item.querySelector(".preco-dose").innerText;

    const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));

    adicionarAoCarrinho(nome, preco);
  });
});

/* WHATSAPP */

function enviarPedido() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio.");
    return;
  }

  const cliente = document.getElementById("cliente")?.value.trim() || "";

  const mesa = document.getElementById("mesa")?.value.trim() || "";

  const observacao = document.getElementById("observacao")?.value.trim() || "";

  let total = 0;

  let msg = "*PEDIDO D'ALDEIA GASTRO BAR*\n\n";

  msg += ` Cliente: ${cliente || "Não informado"}\n`;

  if (mesa) {
    msg += ` Mesa: ${mesa}\n`;
  }

  msg += "\n";

  carrinho.forEach((item) => {
    total += item.preco * item.qtd;

    msg += `${item.qtd}x ${item.nome}\n`;
  });

  msg += `\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`;

  if (observacao) {
    msg += `\n\nObservações: ${observacao}`;
  }

  window.open(
    `https://wa.me/5512997314471?text=${encodeURIComponent(msg)}`,
    "_blank",
  );
}

atualizarCarrinho();
