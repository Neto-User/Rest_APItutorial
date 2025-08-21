document.addEventListener('DOMContentLoaded', () => {
    const runAnimationBtn = document.getElementById('run-animation-btn');
    const requestPacket = document.getElementById('request-packet');
    const responsePacket = document.getElementById('response-packet');
    const animationContainer = document.getElementById('animation-container');

    runAnimationBtn.addEventListener('click', () => {
        runAnimationBtn.disabled = true;
        runAnimationBtn.textContent = 'Simulando...';

        requestPacket.style.transform = 'translateX(0)';
        requestPacket.style.opacity = '1';
        responsePacket.style.transform = 'translateX(0)';
        responsePacket.style.opacity = '0';

        setTimeout(() => {
            const containerWidth = animationContainer.offsetWidth;
            const packetWidth = requestPacket.offsetWidth;
            const travelDistance = containerWidth / 2;
            requestPacket.style.transform = `translateX(${travelDistance}px)`;
        }, 100);

        setTimeout(() => {
            requestPacket.style.opacity = '0';
            responsePacket.style.opacity = '1';
        }, 1600);

        setTimeout(() => {
            const containerWidth = animationContainer.offsetWidth;
            const packetWidth = responsePacket.offsetWidth;
            const travelDistance = containerWidth / 2;
            responsePacket.style.transform = `translateX(-${travelDistance}px)`;
        }, 1800);
        
        setTimeout(() => {
            runAnimationBtn.disabled = false;
            runAnimationBtn.textContent = 'Reiniciar Simulação';
        }, 3400);
    });

    const ctx = document.getElementById('comparisonChart').getContext('2d');
    const comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Segurança', 'Autenticação', 'Porta Padrão', 'SEO'],
            datasets: [{
                label: 'HTTP',
                data: [1, 1, 80, 2],
                backgroundColor: 'rgba(239, 68, 68, 0.6)',
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 1
            }, {
                label: 'HTTPS',
                data: [10, 10, 443, 10],
                backgroundColor: 'rgba(13, 148, 136, 0.6)',
                borderColor: 'rgba(13, 148, 136, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'HTTP vs. HTTPS: Pontuação Relativa',
                    font: { size: 16 },
                    padding: { top: 10, bottom: 20 }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.label === 'Porta Padrão') {
                                label += context.raw;
                            } else {
                                if(context.raw > 5) label += 'Alto';
                                else if(context.raw > 1) label += 'Médio';
                                else label += 'Baixo/Nenhum';
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value, index, values) {
                            if (this.getLabelForValue(value) > 10) return value;
                            switch (value) {
                                case 0: return 'Nenhum';
                                case 5: return 'Médio';
                                case 10: return 'Alto';
                            }
                        }
                    }
                }
            }
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
