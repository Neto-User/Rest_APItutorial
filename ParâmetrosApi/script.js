document.addEventListener('DOMContentLoaded', () => {
    const navigation = document.getElementById('navigation');
    const contentContainer = document.getElementById('content-container');
    const navLinks = navigation.querySelectorAll('.nav-link');
    const sections = contentContainer.querySelectorAll('.content-section');

    function showSection(targetId) {
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.target === targetId) {
                link.classList.add('active');
            }
        });
    }

    navigation.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const targetId = event.target.dataset.target;
            showSection(targetId);
        }
    });

    const initialTarget = window.location.hash ? window.location.hash.substring(1) : 'inicio';
    showSection(initialTarget);

    const pathInput = document.getElementById('path-param-input');
    const pathOutput = document.getElementById('path-param-output');
    pathInput.addEventListener('input', () => {
        pathOutput.textContent = `https://loja.com/api/produtos/${pathInput.value}`;
    });

    const queryInputsContainer = document.getElementById('query-param-inputs');
    const queryOutput = document.getElementById('query-param-output');
    const baseUrlQuery = 'https://voos.com.br/api/buscar';
    function updateQueryUrl() {
        const params = [];
        const checkboxes = queryInputsContainer.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(cb => {
            params.push(`${cb.dataset.param}=${encodeURIComponent(cb.value)}`);
        });
        queryOutput.textContent = params.length > 0 ? `${baseUrlQuery}?${params.join('&')}` : baseUrlQuery;
    }
    queryInputsContainer.addEventListener('change', updateQueryUrl);
    updateQueryUrl();

    const headerInput = document.getElementById('header-param-input');
    const headerOutput = document.getElementById('header-param-output');
    function updateHeader() {
        const token = headerInput.value;
        const headers = {
            "Content-Type": "application/json"
        };
        if (token !== 'nenhum') {
            headers["Authorization"] = `Bearer ${token}`;
        }
        headerOutput.textContent = JSON.stringify(headers, null, 2);
    }
    headerInput.addEventListener('change', updateHeader);
    updateHeader();
    
    const bodyNameInput = document.getElementById('body-name');
    const bodyEmailInput = document.getElementById('body-email');
    const bodyOutput = document.getElementById('body-param-output');
    function updateBody() {
        const bodyData = {
            nome: bodyNameInput.value,
            email: bodyEmailInput.value
        };
        bodyOutput.textContent = JSON.stringify(bodyData, null, 2);
    }
    [bodyNameInput, bodyEmailInput].forEach(input => input.addEventListener('input', updateBody));
    updateBody();
});
