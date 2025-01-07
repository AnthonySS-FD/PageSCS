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
