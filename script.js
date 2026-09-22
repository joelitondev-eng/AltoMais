// ===============================
// SISTEMA DE CARRINHO
// ===============================

let carrinho = [];


// ===============================
// ADICIONAR PRODUTO
// ===============================

function adicionarCarrinho(nome, preco) {

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({
            nome: nome,
            preco: Number(preco),
            quantidade: 1
        });
    }

    atualizarCarrinho();
}


// ===============================
// ATUALIZAR CARRINHO
// ===============================

function atualizarCarrinho() {

    const listaCarrinho =
        document.getElementById("listaCarrinho");

    const quantidade =
        document.getElementById("quantidade");

    const totalCarrinho =
        document.getElementById("totalCarrinho");


    // Verifica se os elementos existem
    if (!listaCarrinho || !quantidade || !totalCarrinho) {
        return;
    }


    listaCarrinho.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;


    // Carrinho vazio
    if (carrinho.length === 0) {

        listaCarrinho.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

    } else {

        carrinho.forEach(function(produto, indice) {

            const subtotal =
                produto.preco * produto.quantidade;

            total += subtotal;

            quantidadeTotal += produto.quantidade;


            const item =
                document.createElement("div");

            item.className = "item-carrinho";


            item.innerHTML = `
                <div>
                    <h3>${produto.nome}</h3>

                    <p>
                        R$ ${produto.preco.toFixed(2)}
                        cada
                    </p>

                    <div class="controles">

                        <button
                            onclick="diminuirQuantidade(${indice})">
                            -
                        </button>

                        <span>
                            ${produto.quantidade}
                        </span>

                        <button
                            onclick="aumentarQuantidade(${indice})">
                            +
                        </button>

                    </div>
                </div>

                <div>

                    <strong>
                        R$ ${subtotal.toFixed(2)}
                    </strong>

                    <button
                        class="remover"
                        onclick="removerProduto(${indice})">
                        🗑️ Remover
                    </button>

                </div>
            `;


            listaCarrinho.appendChild(item);
        });
    }


    quantidade.textContent = quantidadeTotal;

    totalCarrinho.textContent =
        "R$ " + total.toFixed(2).replace(".", ",");
}


// ===============================
// AUMENTAR QUANTIDADE
// ===============================

function aumentarQuantidade(indice) {

    if (carrinho[indice]) {

        carrinho[indice].quantidade += 1;

        atualizarCarrinho();
    }
}


// ===============================
// DIMINUIR QUANTIDADE
// ===============================

function diminuirQuantidade(indice) {

    if (!carrinho[indice]) {
        return;
    }

    if (carrinho[indice].quantidade > 1) {

        carrinho[indice].quantidade -= 1;

    } else {

        carrinho.splice(indice, 1);
    }

    atualizarCarrinho();
}


// ===============================
// REMOVER PRODUTO
// ===============================

function removerProduto(indice) {

    if (!carrinho[indice]) {
        return;
    }

    carrinho.splice(indice, 1);

    atualizarCarrinho();
}


// ===============================
// LIMPAR CARRINHO
// ===============================

function limparCarrinho() {

    carrinho = [];

    atualizarCarrinho();
}


// ===============================
// FINALIZAR COMPRA
// ===============================

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }

    let total = 0;

    carrinho.forEach(function(produto) {

        total +=
            produto.preco * produto.quantidade;
    });


    alert(
        "Compra iniciada!\n\n" +
        "Total: R$ " +
        total.toFixed(2).replace(".", ",") +
        "\n\nObrigado por comprar na AutoMax!"
    );
}


// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarCarrinho();

    }
);