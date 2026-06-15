// ==========================================================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================================================
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optionnel: On peut ne déclencher l'animation qu'une seule fois
            // observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ==========================================================================
// NAVBAR & SCROLL BEHAVIOR
// ==========================================================================
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

// Changement de style au défilement
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Gestion du lien actif
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================================================
// MOBILE MENU TOGGLE
// ==========================================================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const menuIcon = document.querySelector('.menu-toggle i');

menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    
    // Toggle l'icône entre hamburger et croix
    if (navLinksContainer.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Fermer le menu si on clique sur un lien en mobile
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
});

// ==========================================================================
// FORMULAIRE DE CONTACT (Simulation)
// ==========================================================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        
        // Simuler un envoi
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        btn.style.opacity = '0.8';
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Envoyé !';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            btn.style.opacity = '1';
            contactForm.reset();
            
            // Revenir à l'état initial après 3s
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        }, 1500);
    });
}
