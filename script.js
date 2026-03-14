document.addEventListener('DOMContentLoaded', () => {
    // Inicializar os ícones do Lucide
    lucide.createIcons();
    // Lógica para as Animações Scroll (Reveal)
    const reveals = document.querySelectorAll('.reveal');
    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            // Se o topo do elemento estiver na área visível
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    // Ouve o evento de scroll
    window.addEventListener('scroll', reveal);
    
    // Dispara no carregamento inicial para mostrar as primeiras seções
    reveal();
    // Suavizar comportamento em links com a hashtag (Smooth Scroll anchor)
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (const link of smoothLinks) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});
