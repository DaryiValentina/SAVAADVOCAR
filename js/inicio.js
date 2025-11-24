console.log("INICIO JS CARGADO");
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
    console.log("BLOQUE DEL FORM SE ESTÁ EJECUTANDO");
    const form = document.getElementById("asesoriaForm");
    const btn = document.getElementById("form-btn");
    const msg = document.getElementById("form-msg");

    
// -------------------------
// ENVÍO DEL FORMULARIO POR AJAX
// -------------------------
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            console.log("Form submit interceptado");
            msg.textContent = "";
            btn.disabled = true;
            btn.textContent = "Enviando...";

            const formData = new FormData(form);

            try {
                const response = await fetch("/submit.php", { // <- uso absoluta con /
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                });

                const text = await response.text(); // leer raw
                console.log("Respuesta raw:", text);

                let data;
                try {
                    data = JSON.parse(text);
                } catch (err) {
                    console.error("JSON parse error:", err, "raw:", text);
                    msg.style.color = "red";
                    msg.textContent = "Respuesta inesperada del servidor.";
                    btn.disabled = false;
                    btn.textContent = "Enviar";
                    return;
                }

                if (data.status === "ok") {
                    msg.style.color = "limegreen";
                    msg.textContent = "¡Solicitud enviada correctamente!";
                    form.reset();
                } else {
                    msg.style.color = "red";
                    msg.textContent = data.message || "Error al enviar.";
                }

            } catch (error) {
                console.error("Fetch error:", error);
                msg.style.color = "red";
                msg.textContent = "Error de conexión con el servidor.";
            }

            btn.disabled = false;
            btn.textContent = "Enviar";
        });
    }
});
