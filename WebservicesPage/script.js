document.addEventListener('DOMContentLoaded', () => {
            
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    const clientIcons = document.querySelectorAll('.client-icon');
    const tooltip = document.getElementById('tooltip');
    const mainIcon = document.querySelector('.bg-amber-500');

    clientIcons.forEach(icon => {
        const line = document.createElement('div');
        line.classList.add('line');
        icon.parentElement.appendChild(line);
        
        const mainRect = mainIcon.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();
        const containerRect = icon.parentElement.getBoundingClientRect();

        const x1 = mainRect.left + mainRect.width / 2 - containerRect.left;
        const y1 = mainRect.top + mainRect.height / 2 - containerRect.top;
        const x2 = iconRect.left + iconRect.width / 2 - containerRect.left;
        const y2 = iconRect.top + iconRect.height / 2 - containerRect.top;

        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

        line.style.width = `${length}px`;
        line.style.height = '2px';
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.backgroundColor = '#CBD5E1';

        icon.addEventListener('mouseenter', (e) => {
            tooltip.textContent = icon.dataset.title;
            tooltip.style.opacity = '1';
            const rect = icon.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        });
        icon.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });

    const runSimulationBtn = document.getElementById('run-simulation');
    const simulationStatus = document.getElementById('simulation-status');
    const requestDot = document.querySelector('.request-path');
    const responseDot = document.querySelector('.response-path');

    runSimulationBtn.addEventListener('click', () => {
        if (runSimulationBtn.disabled) return;
        
        runSimulationBtn.disabled = true;
        simulationStatus.textContent = '1. Enviando CEP para o Web Service...';
        requestDot.style.offsetPath = `path('${document.getElementById('requestPath').getAttribute('d')}')`;
        requestDot.classList.add('flow-animation');
        
        setTimeout(() => {
            simulationStatus.textContent = '2. Web Service processando... Responde: "Sim, frete grátis!"';
            responseDot.style.offsetPath = `path('${document.getElementById('responsePath').getAttribute('d')}')`;
            responseDot.classList.add('flow-animation');
        }, 1500);

        setTimeout(() => {
            simulationStatus.textContent = 'Pronto! A loja reutilizou um serviço que já existia.';
            requestDot.classList.remove('flow-animation');
            responseDot.classList.remove('flow-animation');
            runSimulationBtn.disabled = false;
        }, 3000);
            setTimeout(() => {
            simulationStatus.textContent = '';
        }, 5000);
    });

    const componentCards = document.querySelectorAll('.component-card');
    const appBoxes = document.querySelectorAll('.application-box');

    componentCards.forEach(card => {
        card.addEventListener('click', () => {
            componentCards.forEach(c => c.classList.remove('border-amber-500'));
            card.classList.add('border-amber-500');
            const targets = card.dataset.target.split(',');
            
            appBoxes.forEach(box => {
                const boxId = box.id.split('-')[1];
                if (targets.includes(boxId) || targets.includes('all')) {
                    box.style.backgroundColor = '#FEF3C7';
                    box.style.transform = 'scale(1.05)';
                } else {
                    box.style.backgroundColor = '#F3F4F6';
                    box.style.transform = 'scale(1)';
                }
            });
        });
    });
    
    const btnBefore = document.getElementById('btn-before');
    const btnAfter = document.getElementById('btn-after');
    const diagram = document.getElementById('evolution-diagram');

    const renderDiagram = (isAfter) => {
        if (isAfter) {
            diagram.innerHTML = `
                <div class="flex items-center justify-around w-full">
                    <span class="text-3xl">🛒</span>
                    <span class="text-3xl">📱</span>
                    <div class="text-center">
                        <div class="bg-amber-500 text-white rounded-lg px-4 py-2 font-bold shadow">SOAP / REST</div>
                        <p class="text-sm mt-1">Padrão</p>
                    </div>
                    <span class="text-3xl">🏢</span>
                    <span class="text-3xl">☁️</span>
                </div>
            `;
        } else {
            diagram.innerHTML = `
                <div class="text-3xl absolute top-0 left-10">🛒</div>
                <div class="text-3xl absolute top-10 right-5">📱</div>
                <div class="text-3xl absolute bottom-5 left-20">🏢</div>
                <div class="text-3xl absolute bottom-10 right-20">☁️</div>
                <p class="text-red-500 font-bold text-5xl"> caos </p>
            `;
        }
    };

    btnBefore.addEventListener('click', () => {
        btnAfter.classList.remove('bg-white', 'text-gray-800');
        btnAfter.classList.add('text-gray-600');
        btnBefore.classList.add('bg-white', 'text-gray-800');
        btnBefore.classList.remove('text-gray-600');
        renderDiagram(false);
    });

    btnAfter.addEventListener('click', () => {
        btnBefore.classList.remove('bg-white', 'text-gray-800');
        btnBefore.classList.add('text-gray-600');
        btnAfter.classList.add('bg-white', 'text-gray-800');
        btnAfter.classList.remove('text-gray-600');
        renderDiagram(true);
    });

    renderDiagram(false);
});
