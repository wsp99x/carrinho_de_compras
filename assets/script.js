const produtos = [
    { nome: "Headset Gamer Corsair Virtuoso RGB Wireless Preto 7.1 Drivers 50mm, CA-9011185-NA",
         preco: 899.90 , 
         quantidade: 5,
        imagem: "assets/img/headset.png" 
    },
    { nome: "Placa de Video Galax GeForce RTX 3060 1-Click OC, LHR, 12GB, GDDR6, 192-bit, 36NOL7MD1VOC", 
        preco: 639.99 , 
        quantidade: 3, 
        imagem: "assets/img/Placa_de_Video.png" 
    },
    { nome: "PC Gamer Completo Mancer Krampus II, AMD Ryzen 5 5500, GeForce RTX 3060 12GB, 16GB DDR4, SSD 480GB + Monitor + Kit Periféricos",
         preco: 995.99 , 
         quantidade: 8, 
         imagem: "assets/img/pc_gamer.png" },
    { nome: "Cadeira Gamer Pichau Donek S, Espuma Moldada, Preta, PG-DNKS-BK01",
         preco: 869.99 , 
         quantidade: 10, 
         imagem: "assets/img/cadeira_gamer.png" 
        },
    { nome: "Monitor Gamer Pichau Centauri Pulse 27, 27 Pol, IPS, 2K, 165Hz, 1ms, FreeSync, HDMI/DP, PG-CRPLS27-BL01", 
        preco: 959.98 , 
        quantidade: 2, 
        imagem: "assets/img/monitor.png" 
    },
];

// Carrinho de compras
let carrinho = [];

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produto) {
    const itemNoCarrinho = carrinho.find(item => item.nome === produto.nome);
    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    atualizarCarrinhoInfo();
    exibirCarrinho();
    alert(`${produto.nome} adicionado ao carrinho!`);
}

// Função para remover produto do carrinho
function removerDoCarrinho(produto) {
    const itemIndex = carrinho.findIndex(item => item.nome === produto.nome);
    if (itemIndex > -1) {
        if (carrinho[itemIndex].quantidade > 1) {
            carrinho[itemIndex].quantidade -= 1;
        } else {
            carrinho.splice(itemIndex, 1);
        }
        atualizarCarrinhoInfo();
        exibirCarrinho();
        alert(`${produto.nome} removido do carrinho!`);
    }
}

// Função para atualizar as informações do carrinho
function atualizarCarrinhoInfo() {
    const carrinhoCount = document.getElementById("carrinhoCount");
    const valorTotalCarrinho = document.getElementById("valorTotalCarrinho");
    const totalItems = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    const totalValue = calcularTotal();
    carrinhoCount.textContent = `Carrinho: ${totalItems} itens`;
    valorTotalCarrinho.textContent = `Total: R$${totalValue.toFixed(2)}`;
}

// Função para calcular o total da compra
function calcularTotal() {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

// Função para buscar produtos por nome
function buscarProduto(nome) {
    return produtos.filter(produto => produto.nome.toLowerCase().includes(nome.toLowerCase()));
}

// Função para exibir os produtos no carrinho
function exibirCarrinho() {
    const carrinhoContainer = document.getElementById("carrinhoContainer");
    carrinhoContainer.innerHTML = ""; 
    carrinho.forEach(produto => {
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto", "carrinho-produto");

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        produtoDiv.appendChild(imagem);

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;
        produtoDiv.appendChild(nome);

        const preco = document.createElement("p");
        preco.textContent = `R$${produto.preco.toFixed(2)}`;
        produtoDiv.appendChild(preco);

        const quantidade = document.createElement("p");
        quantidade.textContent = `Quantidade: ${produto.quantidade}`;
        produtoDiv.appendChild(quantidade);

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover do Carrinho";
        botaoRemover.onclick = () => removerDoCarrinho(produto);
        produtoDiv.appendChild(botaoRemover);

        carrinhoContainer.appendChild(produtoDiv);
    });
}

// Função para exibir os produtos disponíveis na loja
function exibirProdutos() {
    const produtosContainer = document.getElementById("produtosContainer");
    produtos.forEach(produto => {
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto");

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        produtoDiv.appendChild(imagem);

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;
        produtoDiv.appendChild(nome);

        const preco = document.createElement("p");
        preco.textContent = `R$${produto.preco.toFixed(2)}`;
        produtoDiv.appendChild(preco);

        const botaoAdicionar = document.createElement("button");
        botaoAdicionar.textContent = "Adicionar ao Carrinho";
        botaoAdicionar.onclick = () => adicionarAoCarrinho(produto);
        produtoDiv.appendChild(botaoAdicionar);

        produtosContainer.appendChild(produtoDiv);
    });
}

// Função para buscar e exibir produtos conforme o nome digitado
function buscarEExibirProdutos() {
    const buscaInput = document.getElementById("buscaInput").value;
    const produtosEncontrados = buscarProduto(buscaInput);
    const produtosContainer = document.getElementById("produtosContainer");
    produtosContainer.innerHTML = ""; 

    produtosEncontrados.forEach(produto => {
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto", "busca-produto");

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        produtoDiv.appendChild(imagem);

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;
        produtoDiv.appendChild(nome);

        const preco = document.createElement("p");
        preco.textContent = `R$${produto.preco.toFixed(2)}`;
        produtoDiv.appendChild(preco);

        const botaoAdicionar = document.createElement("button");
        botaoAdicionar.textContent = "Adicionar ao Carrinho";
        botaoAdicionar.onclick = () => adicionarAoCarrinho(produto);
        produtoDiv.appendChild(botaoAdicionar);

        produtosContainer.appendChild(produtoDiv);
    });
}

exibirProdutos();
