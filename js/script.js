/* ==========================================================================
   INTERACTIVIDAD & ANIMACIONES - SÍ A TODO
   Author: Antigravity AI
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. HEADER SCROLL EFFECT
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            // No quitar en la página de anuncios, ya que está fija en scrolled
            if (!window.location.pathname.includes("anuncios.html")) {
                navbar.classList.remove("scrolled");
            }
        }
    });

    // 2. MOBILE MENU TOGGLE
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("open");
            navMenu.classList.toggle("open");
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("open");
                navMenu.classList.remove("open");
            });
        });
    }

    // 3. SCROLL REVEAL (INTRUSIÓN SUAVE AL DESLIZAR)
    const revealElements = [
        document.getElementById("history-images"),
        document.getElementById("history-text"),
        ...document.querySelectorAll(".event-row"),
        ...document.querySelectorAll(".board-card"),
        document.getElementById("fourvenues"),
        document.getElementById("contact-info-panel"),
        document.getElementById("contact-form-panel"),
        ...document.querySelectorAll(".sponsor-card")
    ].filter(el => el !== null); // Filtrar nulos si estamos en páginas distintas

    // Inicializar estilos de revelado
    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. CARRUSEL INFINITO DE FOTOS (DUPLICACIÓN DINÁMICA DE ELEMENTOS)
    const marqueeWrapper = document.getElementById("marquee-wrapper");
    if (marqueeWrapper) {
        const items = Array.from(marqueeWrapper.children);
        // Duplicar elementos para asegurar que el marquee sea infinito e ininterrumpido
        items.forEach(item => {
            const clone = item.cloneNode(true);
            marqueeWrapper.appendChild(clone);
        });
    }

    // 5. CONTACT FORM SUBMISSION WITH PRETTY POPUP
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Recoger datos
            const name = document.getElementById("name").value;
            const phone = document.getElementById("phone").value;
            const email = document.getElementById("email").value;
            const eventType = document.getElementById("event-type") ? document.getElementById("event-type").value : "consulta";
            const message = document.getElementById("message").value;
            
            const btnSubmit = document.getElementById("btn-submit-form");
            const originalText = btnSubmit.innerHTML;
            
            // Simular carga
            btnSubmit.innerHTML = "PROCESANDO SOLICITUD VIP...";
            btnSubmit.disabled = true;
            
            setTimeout(() => {
                // Crear popup de éxito
                const successPopup = document.createElement("div");
                successPopup.style.position = "fixed";
                successPopup.style.top = "50%";
                successPopup.style.left = "50%";
                successPopup.style.transform = "translate(-50%, -50%)";
                successPopup.style.background = "#121214";
                successPopup.style.border = "2px solid #D4AF37";
                successPopup.style.padding = "3rem";
                successPopup.style.borderRadius = "16px";
                successPopup.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.2)";
                successPopup.style.zIndex = "10000";
                successPopup.style.textAlign = "center";
                successPopup.style.maxWidth = "450px";
                successPopup.style.width = "90%";
                successPopup.style.color = "#ffffff";
                successPopup.style.fontFamily = "'Outfit', sans-serif";
                
                successPopup.innerHTML = `
                    <div style="font-size: 3.5rem; color: #D4AF37; margin-bottom: 1.5rem;">✓</div>
                    <h3 style="font-size: 1.8rem; margin-bottom: 1rem; text-transform: uppercase;">¡SOLICITUD ENVIADA!</h3>
                    <p style="color: #a0a0ab; margin-bottom: 2rem; font-family: 'Inter', sans-serif;">Dile sí al desmadre, ${name}. Nuestro equipo VIP se pondrá en contacto contigo al móvil ${phone} en menos de 24 horas.</p>
                    <button id="close-popup" class="btn btn-primary" style="width: 100%;">CERRAR</button>
                `;
                
                // Overlay de fondo oscuro
                const overlay = document.createElement("div");
                overlay.style.position = "fixed";
                overlay.style.top = "0";
                overlay.style.left = "0";
                overlay.style.width = "100vw";
                overlay.style.height = "100vh";
                overlay.style.background = "rgba(7, 7, 8, 0.85)";
                overlay.style.backdropFilter = "blur(8px)";
                overlay.style.zIndex = "9999";
                
                document.body.appendChild(overlay);
                document.body.appendChild(successPopup);
                
                // Acción de cerrar
                document.getElementById("close-popup").addEventListener("click", () => {
                    document.body.removeChild(successPopup);
                    document.body.removeChild(overlay);
                });
                
                // Resetear formulario
                contactForm.reset();
                btnSubmit.innerHTML = originalText;
                btnSubmit.disabled = false;
                
            }, 1500);
        });
    }

    // 6. DETECT EVENT TYPE ANCHOR FROM INDEX
    // Si venimos de la página de inicio con enlace a reservados, seleccionar opción mesa VIP
    if (window.location.hash === "#contacto" && document.getElementById("event_type")) {
        document.getElementById("event_type").value = "mesa_vip";
    }
});
