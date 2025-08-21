document.addEventListener('DOMContentLoaded', () => {
            
    const noCacheBtn = document.getElementById('no-cache-btn');
    const withCacheBtn = document.getElementById('with-cache-btn');
    const resetBtn = document.getElementById('reset-btn');

    const userEl = document.getElementById('user');
    const cacheEl = document.getElementById('cache');
    const serverEl = document.getElementById('server');
    const packetEl = document.getElementById('packet');
    const cacheStatusEl = document.getElementById('cache-status');
    const serverStatusEl = document.getElementById('server-status');
    const simulationLogEl = document.getElementById('simulation-log');

    let isCached = false;
    let isAnimating = false;

    const getPosition = (el) => {
        const rect = el.getBoundingClientRect();
        const containerRect = el.parentElement.getBoundingClientRect();
        return {
            x: rect.left - containerRect.left + rect.width / 2 - packetEl.offsetWidth / 2,
            y: rect.top - containerRect.top + rect.height / 2 - packetEl.offsetHeight / 2,
        };
    };
    
    const animatePacket = (startEl, endEl, duration) => {
        return new Promise(resolve => {
            const startPos = getPosition(startEl);
            const endPos = getPosition(endEl);
            packetEl.style.transition = `all ${duration}s ease-in-out`;
            packetEl.style.left = `${startPos.x}px`;
            packetEl.style.top = `${startPos.y}px`;
            packetEl.style.opacity = '1';

            setTimeout(() => {
                packetEl.style.left = `${endPos.x}px`;
                packetEl.style.top = `${endPos.y}px`;
            }, 100);

            setTimeout(resolve, duration * 1000 + 100);
        });
    };

    const resetState = () => {
        isCached = false;
        isAnimating = false;
        cacheStatusEl.textContent = '(Vazio)';
        cacheStatusEl.style.color = '';
        serverStatusEl.textContent = '(Ocioso)';
        cacheEl.classList.remove('processing');
        serverEl.classList.remove('processing');
        packetEl.style.opacity = '0';
        simulationLogEl.textContent = '';
    };

    noCacheBtn.addEventListener('click', async () => {
        if (isAnimating) return;
        isAnimating = true;
        simulationLogEl.textContent = 'Iniciando requisição sem cache...';

        serverStatusEl.textContent = '(Processando...)';
        serverEl.classList.add('processing');
        
        await animatePacket(userEl, serverEl, 1.5);
        simulationLogEl.textContent = 'Servidor processando a requisição...';
        
        await new Promise(r => setTimeout(r, 1500));
        
        serverStatusEl.textContent = '(Ocioso)';
        serverEl.classList.remove('processing');

        await animatePacket(serverEl, userEl, 1.5);
        simulationLogEl.textContent = 'Requisição sem cache concluída. (Lento)';
        
        packetEl.style.opacity = '0';
        isAnimating = false;
    });

    withCacheBtn.addEventListener('click', async () => {
        if (isAnimating) return;
        isAnimating = true;

        if (!isCached) {
            simulationLogEl.textContent = 'Primeira requisição: buscando no servidor...';
            serverStatusEl.textContent = '(Processando...)';
            serverEl.classList.add('processing');

            await animatePacket(userEl, serverEl, 1.5);
            simulationLogEl.textContent = 'Servidor processando e salvando no cache...';
            
            await new Promise(r => setTimeout(r, 1500));
            
            isCached = true;
            cacheStatusEl.textContent = '(Preenchido)';
            cacheStatusEl.style.color = '#10b981';
            serverStatusEl.textContent = '(Ocioso)';
            serverEl.classList.remove('processing');

            await animatePacket(serverEl, userEl, 1.5);
            simulationLogEl.textContent = 'Dados entregues e cacheados.';
        } else {
            simulationLogEl.textContent = 'Requisição subsequente: buscando no cache...';
            cacheEl.classList.add('processing');
            
            await animatePacket(userEl, cacheEl, 0.7);
            simulationLogEl.textContent = 'Cache encontrado! Entregando dados...';
            
            await new Promise(r => setTimeout(r, 500));
            cacheEl.classList.remove('processing');

            await animatePacket(cacheEl, userEl, 0.7);
            simulationLogEl.textContent = 'Requisição com cache concluída. (Rápido!)';
        }

        packetEl.style.opacity = '0';
        isAnimating = false;
    });
    
    resetBtn.addEventListener('click', resetState);

    const cacheTypeCards = document.querySelectorAll('.cache-type-card');
    const typeDetailsEl = document.getElementById('type-details');
    const typeDetailsContent = {
        browser: `
            <h4 class="text-lg font-bold mb-2">Detalhes do Cache no Navegador</h4>
            <p>O navegador armazena arquivos estáticos como imagens, CSS e JavaScript no disco local do seu computador. Quando você visita o mesmo site novamente, o navegador carrega esses arquivos diretamente do seu disco em vez de baixá-los da internet, resultando em um carregamento de página quase instantâneo.</p>
        `,
        proxy: `
            <h4 class="text-lg font-bold mb-2">Detalhes do Cache de Proxy / CDN</h4>
            <p>Uma Content Delivery Network (CDN) é uma rede de servidores proxy distribuídos globalmente. Eles armazenam cópias do conteúdo de um site. Quando um usuário faz uma solicitação, a CDN a entrega a partir do servidor mais próximo geograficamente, reduzindo a latência e a carga no servidor original.</p>
        `,
        server: `
            <h4 class="text-lg font-bold mb-2">Detalhes do Cache no Servidor</h4>
            <p>Esta técnica envolve o armazenamento de dados frequentemente acessados na memória RAM do próprio servidor. Por exemplo, os resultados de uma consulta de banco de dados pesada podem ser cacheados. A próxima vez que esses dados forem necessários, eles são lidos da memória ultrarrápida em vez de executar a consulta novamente, acelerando a geração da página.</p>
        `
    };

    cacheTypeCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.type;
            typeDetailsEl.innerHTML = typeDetailsContent[type];
            
            cacheTypeCards.forEach(c => c.classList.remove('border-teal-500', 'bg-teal-50'));
            card.classList.add('border-teal-500', 'bg-teal-50');
        });
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 80) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-nav');
            }
        });
    });
});
