const verbData = {
    GET: {
        title: 'GET /livros/123',
        color: 'blue',
        description: 'Recuperar dados. É um verbo "somente leitura", seguro e que pode ser cacheado.',
        bodySupport: 'Não',
        successCodes: '200 (OK)',
        visualText: 'Buscando o livro com ID 123...'
    },
    POST: {
        title: 'POST /livros',
        color: 'green',
        description: 'Criar um novo recurso. Os dados do novo livro são enviados no corpo da requisição.',
        bodySupport: 'Sim',
        successCodes: '201 (Created)',
        visualText: 'Criando um novo livro na estante...'
    },
    PUT: {
        title: 'PUT /livros/123',
        color: 'yellow',
        description: 'Atualizar um recurso existente por completo. Se o recurso não existir, pode criá-lo.',
        bodySupport: 'Sim',
        successCodes: '200 (OK) ou 204 (No Content)',
        visualText: 'Atualizando o livro com ID 123...'
    },
    DELETE: {
        title: 'DELETE /livros/123',
        color: 'red',
        description: 'Remover um recurso específico. Esta ação é permanente.',
        bodySupport: 'Sim, mas não é recomendado.',
        successCodes: '200 (OK) ou 204 (No Content)',
        visualText: 'Removendo o livro com ID 123...'
    }
};

const detailsPanel = document.getElementById('details-panel');
const bookDemo = document.getElementById('book-demo');
const visualText = document.getElementById('visual-text');
const buttons = document.querySelectorAll('.verb-btn');
let currentVerb = null;

function selectVerb(verb) {
    if (currentVerb === verb) return;
    currentVerb = verb;

    const data = verbData[verb];
    
    buttons.forEach(btn => {
        btn.classList.remove('active-btn', 'ring-2', 'ring-offset-2', 'ring-blue-500', 'ring-green-500', 'ring-yellow-500', 'ring-red-500');
        if (btn.textContent.includes(verbData[verb].title.split(' ')[0])) {
            btn.classList.add('active-btn', `ring-2`, `ring-offset-2`, `ring-${data.color}-500`);
        }
    });

    const content = `
        <div class="fade-in">
            <h3 class="text-2xl font-bold text-${data.color}-600 mb-4">${data.title}</h3>
            <div class="space-y-4 text-gray-700">
                <div>
                    <p class="font-semibold">Para que serve?</p>
                    <p>${data.description}</p>
                </div>
                <div>
                    <p class="font-semibold">Suporta Body?</p>
                    <p>${data.bodySupport}</p>
                </div>
                <div>
                    <p class="font-semibold">Status Code de Sucesso (Comum)</p>
                    <p>${data.successCodes}</p>
                </div>
            </div>
        </div>
    `;
    detailsPanel.innerHTML = content;
    
    runAnimation(verb);
}

function runAnimation(verb) {
    visualText.textContent = verbData[verb].visualText;
    bookDemo.style.transition = 'none';
    bookDemo.style.opacity = '0';
    
    setTimeout(() => {
        bookDemo.style.transition = 'all 0.5s ease-in-out';
        switch(verb) {
            case 'POST':
                bookDemo.style.transform = 'translateX(-150px) scale(0.8)';
                bookDemo.style.backgroundColor = '#48BB78'; // green
                setTimeout(() => {
                    bookDemo.style.opacity = '1';
                    bookDemo.style.transform = 'translateX(0px) scale(1)';
                }, 100);
                break;
            case 'GET':
                bookDemo.style.transform = 'translateX(0px) scale(1)';
                bookDemo.style.backgroundColor = '#4299E1'; // blue
                setTimeout(() => {
                    bookDemo.style.opacity = '1';
                    bookDemo.style.transform = 'translateX(0px) scale(1.1)';
                }, 100);
                setTimeout(() => {
                     bookDemo.style.transform = 'translateX(0px) scale(1)';
                }, 600);
                break;
            case 'PUT':
                bookDemo.style.transform = 'translateX(0px)';
                bookDemo.style.backgroundColor = '#ECC94B'; // yellow
                bookDemo.innerHTML = '📝';
                setTimeout(() => {
                    bookDemo.style.opacity = '1';
                    bookDemo.style.transform = 'translateY(-20px) rotate(10deg)';
                }, 100);
                 setTimeout(() => {
                    bookDemo.style.transform = 'translateY(0px) rotate(0deg)';
                    bookDemo.innerHTML = '📖';
                }, 600);
                break;
            case 'DELETE':
                bookDemo.style.transform = 'translateX(0px)';
                bookDemo.style.backgroundColor = '#F56565'; // red
                setTimeout(() => {
                     bookDemo.style.opacity = '1';
                     bookDemo.style.transform = 'translateX(150px) scale(0.8)';
                     bookDemo.style.opacity = '0';
                }, 100);
                break;
        }
    }, 50);
}

selectVerb('POST');
