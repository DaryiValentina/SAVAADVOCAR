const dataServicios = {
      cartera: {
        titulo: "Recupera la liquidez de tu Comunidad sin desgastes legales",
        descripcion: "Recupera la liquidez de tu Comunidad con procesos claros, ágiles y respetuosos. En SAVA España reducimos la morosidad y te damos tranquilidad en cada gestión.",
        img: "img/sev-cartera.jpg",  // Ruta de imagen
        items: [
            "Cobro administrativo y prejudírico.",
            "Preparación documental para vía judicial.",
            "Asesorías permanentes puntuales"
        ],
        icons: [
            "fa-solid fa-hand-holding-dollar",
            "fa-solid fa-file-contract",
            "fa-solid fa-user-tie"
        ]   
      },
      visado: {
        titulo: "Acompañamos tu trámite de extranjería en España y desde Colombia",
        descripcion: "Te guiamos en cada paso de tu proceso de extranjería, desde Colombia o España. Con asesoría experta y cercana, tus trámites de visado y residencia serán más seguros y ordenados.",
        img: "img/sev-visado.jpg",
        items: [
            "Arraigo sociolaboral",
            "Arraigo socioformativo",
            "Estancia por estudios",
            "Visados por estudios desde Colombia"
        ],
        icons: [
            "fa-solid fa-people-group",
            "fa-solid fa-graduation-cap",
            "fa-solid fa-passport",
            "fa-solid fa-plane-departure"
        ]  
      },
      otros: {
        titulo: "Más soluciones legales para ti",
        descripcion: "Además de extranjería y cartera, en SAVA España te asesoramos en reclamaciones bancarias, gestión inmobiliaria y compra directa de inmuebles. Soluciones legales adaptadas a ti.",
        img: "img/sev-otros.jpg",
        items: [
            "Reclamaciones por tarjetas revolving",
            "Gestión inmobiliaria",
            "Compra directa de inmuebles"
        ],
        icons: [
            "fa-solid fa-credit-card",
            "fa-solid fa-building",
            "fa-solid fa-house"
        ]  
      }
    };

    document.querySelectorAll('.btn button').forEach(btn => {
      btn.addEventListener('click', () => {
        const servicio = btn.getAttribute('data-servicio');
        const data = dataServicios[servicio];

        document.getElementById("contenido-titulo").innerText = data.titulo;
        document.getElementById("contenido-descripcion").innerText = data.descripcion;
        document.querySelector(".contenido-img").src = data.img;

        for (let i = 0; i < 4; i++) {
        const itemElement = document.getElementById(`item${i + 1}`);
        const liElement = itemElement?.parentElement;
        const iconElement = liElement?.querySelector('i');

        if (data.items[i]) {
            itemElement.innerText = data.items[i];
            liElement.style.display = "flex";

            if (iconElement && data.icons && data.icons[i]) {
            iconElement.className = data.icons[i]; // Actualiza el ícono
            }
        } else {
            itemElement.innerText = "";
            liElement.style.display = "none";
        }
        }


        document.getElementById("contenido-dinamico").style.display = "block";

        // Scroll automático
        window.scrollTo({
          top: document.getElementById("contenido-dinamico").offsetTop - 50,
          behavior: 'smooth'
        });
      });
    });
    
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

