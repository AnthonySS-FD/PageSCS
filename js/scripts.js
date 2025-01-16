/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    // Función para verificar si todos los campos están llenos
    function checkFormValidity() {
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
            }
            if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
            }
        });
        submitButton.disabled = !isValid;
    }

    // Validar email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Escuchar cambios en todos los inputs
    inputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
        input.addEventListener('blur', checkFormValidity);
    });

    // Manejar el envío del formulario
    form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            return;
        }

        // Deshabilitar el botón durante el envío
        submitButton.disabled = true;
        submitButton.innerHTML = 'Enviando...';

        // El formulario se enviará a Formspree
        // Después del envío, Formspree redirigirá o mostrará su mensaje de éxito
    });
});
// Animación al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS con configuración mejorada
    AOS.init({
        duration: 1000,        // duración de las animaciones
        once: true,           // las animaciones solo ocurren una vez
        offset: 150,          // offset (en px) desde el borde inferior de la ventana
        delay: 100,           // delay por defecto para los elementos
        easing: 'ease-out-cubic', // función de easing
        mirror: false,        // si los elementos deben animarse al salir de la vista
        anchorPlacement: 'top-bottom' // define el punto de activación
    });


    // Efecto Parallax suave
    window.addEventListener('scroll', () => {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const scrollPosition = window.innerHeight;
            
            if (cardTop < scrollPosition) {
                const img = card.querySelector('img');
                const speed = 0.05;
                const yPos = (cardTop - scrollPosition) * speed;
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    // Efecto de brillo
    cards.forEach(card => {
        const shine = document.createElement('div');
        shine.classList.add('shine');
        card.querySelector('.card-inner').appendChild(shine);

        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            shine.style.opacity = '0.2';
            shine.style.transform = `translate(${x * 100}%, ${y * 100}%)`;
        });

        card.addEventListener('mouseleave', () => {
            shine.style.opacity = '0';
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    const cards = document.querySelectorAll('.location-card');

    // Efecto Parallax mejorado
    window.addEventListener('scroll', () => {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const scrollPosition = window.innerHeight;
            
            if (cardTop < scrollPosition) {
                const img = card.querySelector('img');
                const speed = 0.15; // Aumentado para más efecto
                const yPos = (cardTop - scrollPosition) * speed;
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    cards.forEach(card => {
        // Efecto de movimiento suave
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            // Movimiento más suave de la tarjeta
            card.style.transform = `
                perspective(1000px)
                rotateY(${x * 10}deg)
                rotateX(${-y * 10}deg)
                translateZ(10px)
            `;

            // Efecto parallax en la imagen
            const img = card.querySelector('.location-image img');
            img.style.transform = `
                translateX(${x * 17}px)
                translateY(${y * 17}px)
            `;

            // Efecto de brillo mejorado
            const shine = card.querySelector('.shine');
            if (shine) {
                shine.style.opacity = '0.4'; // Aumentado para más visibilidad
                shine.style.transform = `translate(${x * 100}%, ${y * 100}%)`;
            }
        });

        // Resetear efectos al salir
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
            const img = card.querySelector('.location-image img');
            img.style.transform = 'translateX(0) translateY(0)';
            const shine = card.querySelector('.shine');
            if (shine) {
                shine.style.opacity = '0';
            }
        });

        // Agregar efecto de brillo si no existe
        if (!card.querySelector('.shine')) {
            const shine = document.createElement('div');
            shine.classList.add('shine');
            card.appendChild(shine);
        }
    });
});

// Función para animar números
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Observer para elementos que aparecen al hacer scroll
const createScrollObserver = () => {
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    // Añadir clase visible con retardo
                    element.classList.add('visible');
                    
                    // Animar números si es un elemento de estadística
                    if (element.classList.contains('stat-item')) {
                        const numberElement = element.querySelector('.stat-number');
                        const target = parseInt(numberElement.dataset.target);
                        animateNumber(numberElement, target);
                    }
                }, delay);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });
};
// Inicializar observador
const scrollObserver = createScrollObserver();
// Observar todos los elementos con animación de scroll
document.querySelectorAll('.scroll-animate').forEach((el, index) => {
    el.dataset.delay = index * 200; // Añadir retardo progresivo
    scrollObserver.observe(el);
});

// Observar elementos
document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
document.querySelectorAll('.stat-item').forEach(el => observer.observe(el));
document.querySelector('.team-quote-container').forEach(el => observer.observe(el));

// Efecto parallax en el título
window.addEventListener('scroll', () => {
    const title = document.querySelector('.parallax-title');
    const scrolled = window.pageYOffset;
    title.style.transform = `translateY(${scrolled * 0.1}px)`;
});


// Testimonials Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonialBoxes = document.querySelectorAll('.testimonial-box');

    // Función para animar la entrada de los testimonios
    function animateTestimonials() {
        testimonialBoxes.forEach((box, index) => {
            const boxTop = box.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;

            if (boxTop < triggerBottom) {
                box.style.opacity = '1';
                box.style.transform = 'translateY(0)';
                box.style.transitionDelay = `${index * 0.2}s`;
            }
        });
    }

    // Efecto 3D al mover el mouse
    testimonialBoxes.forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (x - centerX) / 20;

            box.style.transform = `perspective(1000px) 
                                 rotateX(${-rotateX}deg) 
                                 rotateY(${rotateY}deg) 
                                 translateZ(10px)`;
        });

        box.addEventListener('mouseleave', () => {
            box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Animación de las estrellas
    const stars = document.querySelectorAll('.stars i');
    stars.forEach((star, index) => {
        star.style.animationDelay = `${index * 0.1}s`;
    });

    // Listener para el scroll
    window.addEventListener('scroll', animateTestimonials);
    
    // Iniciar animaciones
    animateTestimonials();
});
document.addEventListener('DOMContentLoaded', function() {
    const testimonialBoxes = document.querySelectorAll('.testimonial-box');

    // Efecto 3D suave al mover el mouse
    testimonialBoxes.forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 30;
            const rotateY = (x - centerX) / 30;

            box.style.transform = `perspective(1000px) 
                                 rotateX(${-rotateX}deg) 
                                 rotateY(${rotateY}deg) 
                                 translateZ(10px)`;
        });

        box.addEventListener('mouseleave', () => {
            box.style.transform = 'none';
        });
    });

    // Animación de estrellas
    const stars = document.querySelectorAll('.stars i');
    stars.forEach(star => {
        setInterval(() => {
            star.style.transform = 'scale(1.2)';
            setTimeout(() => {
                star.style.transform = 'scale(1)';
            }, 200);
        }, 2000);
    });
});
// Funciones para el modal
function openContactModal() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) {
        closeContactModal();
    }
}

