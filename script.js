document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DO MENU MOBILE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // 1. Ao clicar no ícone do hamburguer
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Alterna o ícone entre 'barras' e 'X'
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // 2. Ao clicar em qualquer link do menu, fecha o menu (UX melhor)
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            // Reseta o ícone para barras
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- LÓGICA DE ENVIO DE E-MAIL (APPS SCRIPT) ---
    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status');
    
    // IMPORTANTE: Cole sua URL do Apps Script aqui novamente se tiver apagado
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjpd9kZgGBhXBzDhETQUadNFXBELydEFnVSgdqwjYFrCvehjmF13Dezvr5tFX5flgdzg/exec'; 

    if(form) { // Verifica se o formulário existe na página
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            const btn = document.getElementById('submit-btn');
            const originalText = btn.textContent;
            btn.textContent = "Enviando...";
            btn.disabled = true;

            let formData = new FormData(form);
            
            fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                statusMsg.textContent = "Mensagem enviada com sucesso! Entrarei em contato.";
                statusMsg.style.color = "#00d2ff";
                form.reset();
            })
            .catch(error => {
                statusMsg.textContent = "Erro ao enviar. Tente pelo WhatsApp.";
                statusMsg.style.color = "red";
                console.error('Erro!', error.message);
            })
            .finally(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            });
        });
    }

    // --- EFEITO SCROLL NAVBAR ---
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.background = '#050a14';
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            nav.style.background = 'rgba(5, 10, 20, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
});