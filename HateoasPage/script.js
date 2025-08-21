document.addEventListener('DOMContentLoaded', () => {
    const fetchProductBtn = document.getElementById('fetchProductBtn');
    const apiResponseEl = document.getElementById('apiResponse');

    const apiData = {
        product: {
            id: "123",
            nome: "Smartphone X",
            preco: 999.99,
            disponivel: true,
            _links: [
                { href: "/produtos/123", rel: "self", method: "GET" },
                { href: "/produtos/123/comprar", rel: "comprar", method: "POST" },
                { href: "/produtos/123/avaliacoes", rel: "avaliacoes", method: "GET" }
            ]
        },
        purchase: {
            status: "sucesso",
            mensagem: "Produto 'Smartphone X' adicionado ao carrinho.",
            _links: [
                { href: "/carrinho", rel: "ver_carrinho", method: "GET" },
                { href: "/produtos", rel: "continuar_comprando", method: "GET" }
            ]
        },
        reviews: {
            produtoId: "123",
            media: 4.5,
            total: 87,
            avaliacoes: ["Ótimo produto!", "A bateria dura muito.", "Câmera excelente."],
            _links: [
                { href: "/produtos/123", rel: "ver_produto", method: "GET" }
            ]
        }
    };

    const renderResponse = (data, title) => {
        let jsonData = JSON.parse(JSON.stringify(data));
        const links = jsonData._links;
        delete jsonData._links;

        let html = `{\n`;
        Object.entries(jsonData).forEach(([key, value]) => {
            html += `  "<span class="text-pink-400">${key}</span>": <span class="text-green-400">${JSON.stringify(value, null, 2)}</span>,\n`;
        });

        html += `  "<span class="text-cyan-400">_links</span>": [\n`;
        links.forEach((link, index) => {
            html += `    {\n`;
            html += `      "href": "<span class="text-yellow-400">${link.href}</span>",\n`;
            html += `      "rel": "<span data-action="${link.rel}" class="highlight-link text-yellow-400">${link.rel}</span>",\n`;
            html += `      "method": "<span class="text-yellow-400">${link.method}</span>"\n`;
            html += `    }${index === links.length - 1 ? '' : ','}\n`;
        });
        html += `  ]\n}`;
        
        apiResponseEl.innerHTML = html;
        addLinkListeners();
    };

    const handleAction = (action) => {
        switch (action) {
            case 'comprar':
                renderResponse(apiData.purchase, 'Resultado da Compra');
                break;
            case 'avaliacoes':
                renderResponse(apiData.reviews, 'Avaliações do Produto');
                break;
            case 'self':
            case 'ver_produto':
            case 'continuar_comprando':
                renderResponse(apiData.product, 'Detalhes do Produto');
                break;
            case 'ver_carrinho':
                 apiResponseEl.innerHTML = '<span class="text-gray-500">// Navegando para o carrinho... (Fim da simulação)</span>';
                break;
            default:
                break;
        }
    };

    const addLinkListeners = () => {
        document.querySelectorAll('[data-action]').forEach(link => {
            link.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                handleAction(action);
            });
        });
    };

    fetchProductBtn.addEventListener('click', () => {
        renderResponse(apiData.product, 'Detalhes do Produto');
    });
});
