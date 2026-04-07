/**
 * EL FOGÓN DE LA LLAVE - JavaScript Principal
 * Funcionalidades: menú móvil, animaciones scroll, lazy loading, etc.
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. MENÚ MÓVIL (toggle)
    // ============================================
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('#mobileMenu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // ============================================
    // 2. INTERSECTION OBSERVER (animaciones al hacer scroll)
    // ============================================
    const fadeElements = document.querySelectorAll('.section-fade');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            observer.observe(el);
        });
    }
    
    // ============================================
    // 3. EFECTO HOVER PARA CARDS
    // ============================================
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.classList.add('transition-all', 'duration-300');
    });
    
    // ============================================
    // 4. CIERRE DE MENÚ MÓVIL AL REDIMENSIONAR
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth >= 768 && mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }, 250);
    });
    
    // ============================================
    // 5. NAVBAR SCROLL EFFECT (cambia opacidad)
    // ============================================
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-black/60', 'backdrop-blur-xl');
                navbar.classList.remove('bg-black/40');
            } else {
                navbar.classList.add('bg-black/40');
                navbar.classList.remove('bg-black/60');
            }
        });
    }
    
    // ============================================
    // 6. LAZY LOADING DE IMÁGENES (fallback)
    // ============================================
    if ('loading' in HTMLImageElement.prototype) {
        // Navegador soporta lazy loading nativo
        const images = document.querySelectorAll('img[loading="lazy"]');
        console.log(`✅ Lazy loading nativo activado para ${images.length} imágenes`);
    } else {
        // Fallback para navegadores antiguos
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/lazyload@2.0.0-rc.2/lazyload.min.js';
        document.body.appendChild(script);
    }
    
    // ============================================
    // 7. PROTECCIÓN DE ENLACES EXTERNOS
    // ============================================
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    externalLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
    });
    
    // ============================================
    // 8. CONSOLA AMIGABLE (para desarrolladores)
    // ============================================
    console.log('%c✨ El Fogón de la Llave - Sitio Web Oficial ✨', 'color: #eab308; font-size: 14px; font-weight: bold;');
    console.log('%cDesarrollado por ingeniumbright - "por que lo hacemos fácil"', 'color: #6b7280; font-size: 12px;');
    
});