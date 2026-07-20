// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Sticky Navbar & Active Link
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.count');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current);
                }
            }, 20);
        });
    }

    // Trigger counters when in view
    const counterSection = document.querySelector('.counters');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    if (counterSection) observer.observe(counterSection);

    // Services Data
    const services = [
        { icon: "fas fa-ring", title: "Wedding Rituals", desc: "Complete Vedic wedding ceremonies with traditional mantras." },
        { icon: "fas fa-hands-helping", title: "Engagement Ceremony", desc: "Sacred engagement rituals according to Vedic traditions." },
        { icon: "fas fa-home", title: "Grah Pravesh", desc: "House warming ceremony for new beginnings." },
        { icon: "fas fa-baby", title: "Namkaran Sanskar", desc: "Naming ceremony for newborns." },
        { icon: "fas fa-fire", title: "Havan", desc: "Purification fire rituals and Yagyas." },
        { icon: "fas fa-pray", title: "Rudrabhishek", desc: "Lord Shiva special abhishek puja." },
        { icon: "fas fa-book", title: "Satyanarayan Katha", desc: "Devotional story recitation." },
        { icon: "fas fa-scroll", title: "Bhagavad Gita Pravachan", desc: "Profound discourses on Shrimad Bhagavad Gita." },
        { icon: "fas fa-book-open", title: "Sundarkand Path", desc: "Complete Sundarkand recitation." },
        { icon: "fas fa-users", title: "Vedic Consultation", desc: "Personal spiritual and life guidance." }
    ];

    // Render Services
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.setAttribute('data-aos', 'fade-up');
            card.innerHTML = `
                <i class="${service.icon}"></i>
                <h3>${service.title}</h3>
                <p>${service.desc}</p>
            `;
            servicesGrid.appendChild(card);
        });
    }

    // Lightbox
    window.openLightbox = function(img) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    };

    window.closeLightbox = function() {
        document.getElementById('lightbox').style.display = 'none';
    };

    // Close lightbox on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });

    // Back to Top
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact Form (demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! Your message has been received. (Demo)');
            this.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});