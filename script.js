/* ==========================================
   ELECTROTECH - JAVASCRIPT COMPLETO
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initNavbar();
    initHamburger();
    initScrollReveal();
    initCounters();
    initParticles();
    initCardInteractions();
    initContactForm();
    initCharacterCounter();
});

/* ==========================================
   TEMA (MODO OSCURO / CLARO)
   ========================================== */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            showToast(
                newTheme === 'dark' ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado',
                'info'
            );
        });
    }
}

/* ==========================================
   NAVBAR SCROLL
   ========================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ==========================================
   HAMBURGER MENU
   ========================================== */
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

/* ==========================================
   SCROLL REVEAL (Animaciones al hacer scroll)
   ========================================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll(
        '.category-card, .product-card, .service-card, .testimonial-card, .faq-item, .info-card'
    );

    reveals.forEach(function(el, index) {
        el.classList.add('reveal');
        el.style.transitionDelay = (index % 6) * 0.1 + 's';
    });

    function checkReveal() {
        reveals.forEach(function(el) {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 120;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Verificar al cargar
}

/* ==========================================
   CONTADORES ANIMADOS
   ========================================== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    function animateCounters() {
        counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing: ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);

                counter.textContent = current.toLocaleString() + (target >= 1000 ? '+' : '+');

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        });
    }

    // Iniciar cuando el hero sea visible
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) observer.observe(statsSection);
}

/* ==========================================
   PARTÍCULAS DECORATIVAS
   ========================================== */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;
        const colors = ['#6C63FF', '#4ECDC4', '#FF6B6B', '#FFE66D'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;

        container.appendChild(particle);
    }

    // Agregar keyframe dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
            25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2); opacity: 0.4; }
            50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8); opacity: 0.1; }
            75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1); opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);
}

/* ==========================================
   INTERACCIÓN DE TARJETAS
   ========================================== */
function initCardInteractions() {
    const cards = document.querySelectorAll('.interactive-card');

    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            const color = this.getAttribute('data-color');
            if (color) {
                this.style.setProperty('--color', color);
            }
        });

        // Efecto de brillo al mover el mouse
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    ${getComputedStyle(document.documentElement)
                        .getPropertyValue('--bg-tertiary')
                        .trim()} 0%,
                    ${getComputedStyle(document.documentElement)
                        .getPropertyValue('--bg-card')
                        .trim()} 70%
                )
            `;
        });

        card.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
}

/* ==========================================
   FAQ ACCORDION
   ========================================== */
function toggleFaq(button) {
    const item = button.parentElement;
    const wasActive = item.classList.contains('active');

    // Cerrar todos
    document.querySelectorAll('.faq-item').forEach(function(faq) {
        faq.classList.remove('active');
    });

    // Abrir el seleccionado (si no estaba abierto)
    if (!wasActive) {
        item.classList.add('active');
    }
}

/* ==========================================
   FORMULARIO DE CONTACTO - VALIDACIÓN ROBUSTA
   ========================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Validación en tiempo real al escribir
    const fields = ['fullName', 'email', 'phone', 'subject', 'message'];
    fields.forEach(function(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
                validateField(fieldId);
            });

            field.addEventListener('blur', function() {
                validateField(fieldId);
            });
        }
    });

    // Checkbox terms
    const terms = document.getElementById('terms');
    if (terms) {
        terms.addEventListener('change', function() {
            validateField('terms');
        });
    }

    // Submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validar todos los campos
        let allValid = true;
        fields.forEach(function(fieldId) {
            if (!validateField(fieldId)) {
                allValid = false;
            }
        });

        if (!validateField('terms')) {
            allValid = false;
        }

        if (allValid) {
            // Éxito
            showToast('✅ ¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');

            // Alert personalizado con resumen
            const name = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject');
            const subjectText = subject.options[subject.selectedIndex].text;
            const message = document.getElementById('message').value;

            alert(
                ' ¡Gracias por contactarnos, ' + name.split(' ')[0] + '!\n\n' +
                '📧 Email: ' + email + '\n' +
                '📋 Asunto: ' + subjectText + '\n' +
                '💬 Mensaje: "' + message.substring(0, 50) + (message.length > 50 ? '...' : '') + '"\n\n' +
                'Nos pondremos en contacto contigo en las próximas 24 horas.'
            );

            // Limpiar formulario
            form.reset();
            fields.forEach(function(fieldId) {
                const f = document.getElementById(fieldId);
                if (f) {
                    f.classList.remove('valid', 'invalid');
                }
                const err = document.getElementById(fieldId + 'Error');
                if (err) err.textContent = '';
            });
            document.getElementById('charCount').textContent = '0';
        } else {
            showToast('⚠️ Por favor corrige los errores del formulario.', 'error');
        }
    });

    // Botón limpiar
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            setTimeout(function() {
                fields.forEach(function(fieldId) {
                    const f = document.getElementById(fieldId);
                    if (f) f.classList.remove('valid', 'invalid');
                    const err = document.getElementById(fieldId + 'Error');
                    if (err) err.textContent = '';
                });
                document.getElementById('charCount').textContent = '0';
                showToast('️ Formulario limpiado.', 'info');
            }, 100);
        });
    }
}

function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + 'Error');

    if (!field || !errorSpan) return false;

    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (fieldId) {
        case 'fullName':
            if (value === '') {
                isValid = false;
                errorMessage = '❌ El nombre es obligatorio.';
            } else if (value.length < 3) {
                isValid = false;
                errorMessage = '❌ El nombre debe tener al menos 3 caracteres.';
            } else if (value.length > 60) {
                isValid = false;
                errorMessage = '❌ El nombre no puede exceder 60 caracteres.';
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(value)) {
                isValid = false;
                errorMessage = '❌ El nombre solo puede contener letras y espacios.';
            } else if (!value.includes(' ')) {
                isValid = false;
                errorMessage = '❌ Ingresa nombre y apellido (al menos dos palabras).';
            } else {
                const words = value.split(/\s+/).filter(function(w) { return w.length > 0; });
                if (words.some(function(w) { return w.length < 2; })) {
                    isValid = false;
                    errorMessage = '❌ Cada palabra debe tener al menos 2 caracteres.';
                }
            }
            break;

        case 'email':
            if (value === '') {
                isValid = false;
                errorMessage = '❌ El correo electrónico es obligatorio.';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                isValid = false;
                errorMessage = '❌ Formato de correo inválido (ej: usuario@correo.com).';
            } else {
                const parts = value.split('@');
                if (parts[0].length < 2) {
                    isValid = false;
                    errorMessage = '❌ La parte local del email es muy corta.';
                } else if (parts[1].length < 4) {
                    isValid = false;
                    errorMessage = '❌ El dominio del email es muy corto.';
                } else if (/\s/.test(value)) {
                    isValid = false;
                    errorMessage = '❌ El email no puede contener espacios.';
                } else if (!/\.[a-zA-Z]{2,}$/.test(parts[1])) {
                    isValid = false;
                    errorMessage = '❌ El dominio debe tener una extensión válida (ej: .com).';
                }
            }
            break;

        case 'phone':
            if (value === '') {
                isValid = false;
                errorMessage = '❌ El teléfono es obligatorio.';
            } else {
                const cleanPhone = value.replace(/[\s\-\(\)\+]/g, '');
                if (!/^\d{7,15}$/.test(cleanPhone)) {
                    isValid = false;
                    errorMessage = '❌ Teléfono inválido. Debe tener entre 7 y 15 dígitos.';
                } else if (/^(.)\1{6,}$/.test(cleanPhone)) {
                    isValid = false;
                    errorMessage = '❌ No se permiten teléfonos con todos los dígitos iguales.';
                } else if (/^(0123456|1234567|2345678)\d*$/.test(cleanPhone)) {
                    isValid = false;
                    errorMessage = '❌ No se permiten secuencias numéricas consecutivas.';
                }
            }
            break;

        case 'subject':
            if (value === '') {
                isValid = false;
                errorMessage = '❌ Debes seleccionar un asunto.';
            }
            break;

        case 'message':
            if (value === '') {
                isValid = false;
                errorMessage = '❌ El mensaje es obligatorio.';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = '❌ El mensaje debe tener al menos 10 caracteres.';
            } else if (value.length > 500) {
                isValid = false;
                errorMessage = '❌ El mensaje no puede exceder 500 caracteres.';
            } else if (!/[.!?]$/.test(value.trim())) {
                isValid = false;
                errorMessage = '❌ El mensaje debe terminar con un punto de puntuación.';
            } else if (/(.)\1{4,}/.test(value)) {
                isValid = false;
                errorMessage = '❌ No se permiten más de 4 caracteres iguales consecutivos.';
            } else if (!/\S/.test(value)) {
                isValid = false;
                errorMessage = '❌ El mensaje no puede ser solo espacios.';
            }
            break;

        case 'terms':
            const checkbox = document.getElementById('terms');
            if (!checkbox.checked) {
                isValid = false;
                errorMessage = '❌ Debes aceptar los términos y condiciones.';
            }
            break;
    }

    // Actualizar UI
    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        errorSpan.textContent = '';
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        errorSpan.textContent = errorMessage;
    }

    return isValid;
}

/* ==========================================
   CONTADOR DE CARACTERES
   ========================================== */
function initCharacterCounter() {
    const textarea = document.getElementById('message');
    const counter = document.getElementById('charCount');

    if (textarea && counter) {
        textarea.addEventListener('input', function() {
            const len = this.value.length;
            counter.textContent = len;

            const parent = counter.parentElement;
            parent.classList.remove('warning', 'danger');

            if (len > 450) {
                parent.classList.add('danger');
            } else if (len > 350) {
                parent.classList.add('warning');
            }
        });
    }
}

/* ==========================================
   AGREGAR AL CARRITO
   ========================================== */
function addToCart(productName) {
    showToast('🛒 "' + productName + '" agregado al carrito.', 'success');

    // Efecto visual en el botón
    const buttons = document.querySelectorAll('.btn-add-cart');
    buttons.forEach(function(btn) {
        if (btn.textContent.includes(productName)) {
            btn.style.background = '#2ED573';
            btn.innerHTML = '✅ Agregado';
            setTimeout(function() {
                btn.style.background = '';
                btn.innerHTML = '🛒 Agregar al Carrito';
            }, 2000);
        }
    });
}

/* ==========================================
   SISTEMA DE TOAST NOTIFICATIONS
   ========================================== */
function showToast(message, type) {
    type = type || 'info';
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    container.appendChild(toast);

    // Auto-remove
    setTimeout(function() {
        toast.classList.add('toast-exit');
        setTimeout(function() {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 400);
    }, 3000);
}