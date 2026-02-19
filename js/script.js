console.log('Portfolio Loaded');

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Reveal Animation ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections and specific elements
    const elementsToObserve = document.querySelectorAll('.section, .card, .project-card, .timeline-item, .skill-card');
    elementsToObserve.forEach(el => {
        el.classList.add('hidden'); // Add hidden class initially
        observer.observe(el);
    });


    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('toggle');

        // Animate Links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('toggle');
            links.forEach(l => l.style.animation = '');
        });
    });

});
