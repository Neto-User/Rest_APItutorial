document.addEventListener('DOMContentLoaded', function () {
    const btnUrl = document.getElementById('btn-url');
    const btnHeader = document.getElementById('btn-header');
    const contentUrl = document.getElementById('content-url');
    const contentHeader = document.getElementById('content-header');

    function showUrlContent() {
        contentUrl.classList.remove('hidden');
        contentHeader.classList.add('hidden');
        btnUrl.classList.add('tab-active');
        btnHeader.classList.remove('tab-active');
    }

    function showHeaderContent() {
        contentHeader.classList.remove('hidden');
        contentUrl.classList.add('hidden');
        btnHeader.classList.add('tab-active');
        btnUrl.classList.remove('tab-active');
    }

    btnUrl.addEventListener('click', showUrlContent);
    btnHeader.addEventListener('click', showHeaderContent);

    const ctx = document.getElementById('comparisonChart').getContext('2d');
    const comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Por Path (URL)', 'Header Customizado', 'Accept Header (HTTP)'],
            datasets: [
                {
                    label: 'Clareza / Dev Friendly',
                    data: [5, 3, 2],
                    backgroundColor: 'rgba(79, 70, 229, 0.7)',
                    borderColor: 'rgba(79, 70, 229, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Simplicidade de Implementação',
                    data: [5, 4, 3],
                    backgroundColor: 'rgba(30, 64, 175, 0.7)',
                    borderColor: 'rgba(30, 64, 175, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Conformidade com Padrões HTTP',
                    data: [3, 2, 5],
                    backgroundColor: 'rgba(124, 58, 237, 0.7)',
                    borderColor: 'rgba(124, 58, 237, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 5,
                    title: {
                        display: true,
                        text: 'Pontuação (1=Baixo, 5=Alto)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Pontuação dos Métodos de Versionamento',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.x !== null) {
                                label += context.parsed.x + ' de 5';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
});
