 //ANIMACION DE SCROLL QUE SE PODRÍA VER SI QUITAR O NO 
    document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    const scrollThreshold = 50; // Cantidad de píxeles para aplicar el cambio

    function updateNavStyle() {
        if (window.scrollY > scrollThreshold) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    // 1. Ejecutar al inicio por si la página ya está desplazada al cargar
    updateNavStyle();

    // 2. Ejecutar cada vez que el usuario haga scroll
    window.addEventListener('scroll', updateNavStyle);
});