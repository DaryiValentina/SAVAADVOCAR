//ANIMACION DE SCROLL QUE SE PODRÍA VER SI QUITAR O NO 
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


    // --- VALIDACIONES --- //
    function revisar(elemento) {
        if (elemento.value.trim() === "") {
            elemento.classList.add("error");
            elemento.classList.remove("input");
        } else {
            elemento.classList.remove("error");
            elemento.classList.add("input");
        }
    }

    function revisarEmail(elemento) {
        if (elemento.value.trim() !== "") {
            const exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!exp.test(elemento.value)) {
                elemento.classList.add("error");
                elemento.classList.remove("input");
            } else {
                elemento.classList.remove("error");
                elemento.classList.add("input");
            }
        }
    }

    function revisaLongitud(elemento, min) {
        if (elemento.value.trim().length < min) {
            elemento.classList.add("error");
            elemento.classList.remove("input");
        } else {
            elemento.classList.remove("error");
            elemento.classList.add("input");
        }
    }

    function validar() {
        let datosCorrectos = true;
        let error = "";

        const nombre = document.getElementById("nombre");
        if (nombre.value.trim() === "") {
            datosCorrectos = false;
            error += "\n - El nombre está vacío";
            nombre.classList.add("error");
        }

        const email = document.getElementById("email");
        const exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!exp.test(email.value.trim())) {
            datosCorrectos = false;
            error += "\n - Email inválido";
            email.classList.add("error");
        }

        const telefono = document.getElementById("telefono");
        const expTel = /^[0-9\s+\-()]{7,}$/; // acepta números, espacios y símbolos comunes

        if (!expTel.test(telefono.value.trim())) {
            datosCorrectos = false;
            error += "\n - Número telefónico inválido";
            telefono.classList.add("error");
        }

        const mensaje = document.getElementById("mensaje");
        if (mensaje.value.trim().length < 30) {
            datosCorrectos = false;
            error += "\n - El mensaje debe tener al menos 30 caracteres";
            mensaje.classList.add("error");
        }

        if (!datosCorrectos) {
            alert("Hay errores en el formulario:" + error);
        }

        return datosCorrectos;
    }

    // --- ANIMACIÓN + VALIDACIÓN --- //

    const form = document.getElementById("contactForm");
    const container = document.getElementById("container");
    const mensajeExito = document.getElementById("mensajeExito");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validar()) return;

        // Activar animación del contenedor
        container.classList.add("active");

        // Mensaje de éxito
        mensajeExito.style.display = "block";

        setTimeout(() => {
            mensajeExito.style.display = "none";
        }, 3000);
    });

});