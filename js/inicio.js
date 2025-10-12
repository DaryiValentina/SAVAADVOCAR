document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Crear el overlay dinámicamente
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Función para abrir el menú
    function openMenu() {
        navMenu.classList.add('open');
        body.classList.add('menu-open'); // Clase para evitar el scroll del body
        overlay.classList.add('active'); // Muestra el overlay
    }

    // Función para cerrar el menú
    function closeMenuHandler() {
        navMenu.classList.remove('open');
        body.classList.remove('menu-open');
        overlay.classList.remove('active');
    }

    // Eventos de clic
    if (menuToggle) {
        menuToggle.addEventListener('click', openMenu);
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', closeMenuHandler);
    }
    
    // Cerrar menú al hacer clic en un enlace o en el overlay
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenuHandler);
    });

    overlay.addEventListener('click', closeMenuHandler);
    
    // Mantener tu funcionalidad de scroll para la barra de navegación (si existe)
    // Ejemplo:
    const headerNav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            headerNav.classList.add('scrolled');
        } else {
            headerNav.classList.remove('scrolled');
        }
    });
});