// inicio.js (actualizado)
// Mantiene menú, overlay, scroll, validaciones y animación.
// Añade envío AJAX para asesoriaForm (index) y contactForm (Contactanos).

console.log("Contactanos JS CARGADO");

document.addEventListener('DOMContentLoaded', () => {
    // ---------- MENÚ / OVERLAY / SCROLL ----------
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Crear el overlay dinámicamente (si no existe)
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
    }

    function openMenu() {
        if (navMenu) navMenu.classList.add('open');
        body.classList.add('menu-open');
        overlay.classList.add('active');
    }

    function closeMenuHandler() {
        if (navMenu) navMenu.classList.remove('open');
        body.classList.remove('menu-open');
        overlay.classList.remove('active');
    }

    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (closeMenu) closeMenu.addEventListener('click', closeMenuHandler);
    if (navMenu) {
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenuHandler);
        });
    }
    overlay.addEventListener('click', closeMenuHandler);

    // scroll header guardado
    const headerNav = document.querySelector('.nav');
    if (headerNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) headerNav.classList.add('scrolled');
            else headerNav.classList.remove('scrolled');
        });
    }

    // ---------- FUNCIONES DE VALIDACIÓN (reutilizadas) ----------
    function revisar(elemento) {
        if (!elemento) return;
        if (elemento.value.trim() === "") {
            elemento.classList.add("error");
            elemento.classList.remove("input");
        } else {
            elemento.classList.remove("error");
            elemento.classList.add("input");
        }
    }

    function revisarEmail(elemento) {
        if (!elemento) return;
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
        if (!elemento) return;
        if (elemento.value.trim().length < min) {
            elemento.classList.add("error");
            elemento.classList.remove("input");
        } else {
            elemento.classList.remove("error");
            elemento.classList.add("input");
        }
    }

    function validarContactForm() {
        let datosCorrectos = true;
        let error = "";

        const nombre = document.getElementById("nombre");
        if (!nombre || nombre.value.trim() === "") {
            datosCorrectos = false;
            error += "\n - El nombre está vacío";
            if (nombre) nombre.classList.add("error");
        }

        const email = document.getElementById("email");
        const exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email || !exp.test(email.value.trim())) {
            datosCorrectos = false;
            error += "\n - Email inválido";
            if (email) email.classList.add("error");
        }

        const telefono = document.getElementById("telefono");
        const expTel = /^[0-9\s+\-()]{7,}$/; // acepta números, espacios y símbolos comunes
        if (!telefono || !expTel.test(telefono.value.trim())) {
            datosCorrectos = false;
            error += "\n - Número telefónico inválido";
            if (telefono) telefono.classList.add("error");
        }

        const mensaje = document.getElementById("mensaje");
        if (!mensaje || mensaje.value.trim().length < 30) {
            datosCorrectos = false;
            error += "\n - El mensaje debe tener al menos 30 caracteres";
            if (mensaje) mensaje.classList.add("error");
        }

        if (!datosCorrectos) {
            alert("Hay errores en el formulario:" + error);
        }

        return datosCorrectos;
    }

    // ---------- ASIGNAR LISTENERS (formulario de asesoría en index: asesoriaForm) ----------
    console.log("BLOQUE DEL FORM SE ESTÁ EJECUTANDO (asesoria + contact)");

    // Asesoria form (index) - envío AJAX (no cambia tu UI)
    const asesoriaForm = document.getElementById("asesoriaForm");
    if (asesoriaForm) {
        const btn = document.getElementById("form-btn");
        const msg = document.getElementById("form-msg");

        asesoriaForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("asesoriaForm submit interceptado");

            if (msg) msg.textContent = "";
            if (btn) { btn.disabled = true; btn.textContent = "Enviando..."; }

            const formData = new FormData(asesoriaForm);

            try {
                const response = await fetch("/submit.php", {
                    method: "POST",
                    body: formData,
                    headers: { "Accept": "application/json" }
                });

                const text = await response.text();
                console.log("Respuesta raw (asesoria):", text);

                let data;
                try {
                    data = JSON.parse(text);
                } catch (err) {
                    console.error("JSON parse error (asesoria):", err, "raw:", text);
                    if (msg) { msg.style.color = "red"; msg.textContent = "Respuesta inesperada del servidor."; }
                    if (btn) { btn.disabled = false; btn.textContent = "Enviar"; }
                    return;
                }

                if (data.status === "ok") {
                    if (msg) { msg.style.color = "limegreen"; msg.textContent = "¡Solicitud enviada correctamente!"; }
                    asesoriaForm.reset();
                } else {
                    if (msg) { msg.style.color = "red"; msg.textContent = data.message || "Error al enviar."; }
                }

            } catch (error) {
                console.error("Fetch error (asesoria):", error);
                if (msg) { msg.style.color = "red"; msg.textContent = "Error de conexión con el servidor."; }
            }

            if (btn) { btn.disabled = false; btn.textContent = "Enviar"; }
        });
    }

    // ---------- contactForm (Contactanos) - mantener animación y enviar por AJAX sin recargar ----------
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]') || contactForm.querySelector('.btn-submit');
        // buscar container para animación: preferible #container, sino el wrapper .form-box.contact-form, sino parentElement
        const container = document.getElementById("container") || document.querySelector('.form-box.contact-form') || contactForm.parentElement;
        const mensajeExito = document.getElementById("mensajeExito");

        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Validación previa con tus reglas
            if (!validarContactForm()) return;

            // Disabling submit UI
            if (submitBtn) submitBtn.disabled = true;

            // Activar animación inmediata (igual que ya tenías)
            if (container) container.classList.add("active");
            if (mensajeExito) mensajeExito.style.display = "block";

            // preparar datos para el servidor
            const fd = new FormData(contactForm);
            // si quieres, agregamos origen para diferenciar
            if (!fd.has('origen')) fd.append('origen', 'contactanos');

            try {
                const resp = await fetch("/submit.php", {
                    method: "POST",
                    body: fd,
                    headers: { "Accept": "application/json" }
                });

                const raw = await resp.text();
                console.log("Respuesta raw (contact):", raw);

                let data;
                try {
                    data = JSON.parse(raw);
                } catch (err) {
                    console.error("JSON parse error (contact):", err, "raw:", raw);
                    // Mostrar error visual pero mantener animación por brevedad
                    alert("Respuesta inesperada del servidor.");
                    // limpiar animación luego
                    setTimeout(() => {
                        if (mensajeExito) mensajeExito.style.display = "none";
                        if (container) container.classList.remove("active");
                    }, 3000);
                    if (submitBtn) submitBtn.disabled = false;
                    return;
                }

                if (data.status === "ok") {
                    // Éxito → mantener tu animación y ocultar después
                    setTimeout(() => {
                        if (mensajeExito) mensajeExito.style.display = "none";
                        if (container) container.classList.remove("active");
                    }, 3000);

                    // reset form
                    contactForm.reset();

                } else {
                    // servidor devolvió error
                    if (mensajeExito) mensajeExito.style.display = "none";
                    if (container) container.classList.remove("active");
                    alert(data.message || "Error al enviar el formulario.");
                }

            } catch (fetchErr) {
                console.error("Fetch error (contact):", fetchErr);
                if (mensajeExito) mensajeExito.style.display = "none";
                if (container) container.classList.remove("active");
                alert("Error de conexión con el servidor.");
            }

            if (submitBtn) submitBtn.disabled = false;
        });
    }

    // ---------- FIN DOMContentLoaded ----------
});
