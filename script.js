document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efeito Navbar ao rolar a página
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Menu Mobile (Hamburguer)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // 3. Integração com Google Apps Script
    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status');
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjpd9kZgGBhXBzDhETQUadNFXBELydEFnVSgdqwjYFrCvehjmF13Dezvr5tFX5flgdzg/exec'; 

    if(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            const btn = document.getElementById('submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Processando... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            let formData = new FormData(form);
            
            fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData
            })
            .then(() => {
                statusMsg.textContent = "Solicitação enviada com sucesso! Logo entraremos em contato.";
                statusMsg.style.color = "#00f2fe";
                form.reset();
            })
            .catch(error => {
                statusMsg.textContent = "Erro ao enviar. Por favor, contate-nos via WhatsApp.";
                statusMsg.style.color = "#ef4444";
                console.error('Erro:', error);
            })
            .finally(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                // Limpa a mensagem após 5 segundos
                setTimeout(() => {
                    statusMsg.textContent = '';
                }, 5000);
            });
        });
    }
});
