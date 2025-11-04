// ==================== PARTICLES BACKGROUND ====================
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00f2fe'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00f2fe',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'window',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// ==================== SMOOTH CURSOR EFFECT ====================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;
let dotX = 0;
let dotY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth animation for cursor
function animateCursor() {
    // Smooth follow for dot (faster)
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;

    // Smooth follow for outline (slower for trailing effect)
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add hover effect for interactive elements
const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, input, textarea');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    element.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ==================== NAVIGATION ====================
const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== TYPING EFFECT ====================
const typingText = document.querySelector('.typing-text');
const texts = [
    'Frontend Developer',
    'UI/UX Designer',
    'Database Engineer',
    'React Developer',
    'Full Stack Enthusiast'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
}

if (typingText) {
    type();
}

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Trigger skill bars animation
            if (entry.target.classList.contains('skills-section')) {
                animateSkillBars();
            }

            // Trigger stats counter
            if (entry.target.classList.contains('about-section')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// ==================== SKILL BARS ANIMATION ====================
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 200);
    });
}

// ==================== STATS COUNTER ANIMATION ====================
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };

        updateCounter();
    });
}

// ==================== FLOATING CARDS PARALLAX ====================
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    cards.forEach((card, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ==================== PROJECT CARDS TILT EFFECT ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== SKILL CARDS HOVER EFFECT ====================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== FORM VALIDATION ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('from_mail').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name) {
            showNotification('Please enter your name', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (phone && !validatePhone(phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }

        if (!message) {
            showNotification('Please enter your message', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // EmailJS integration
            await emailjs.sendForm('service_apoq02t', 'template_ywkfeot', contactForm);
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Error:', error);
            showNotification('Failed to send message. Please try again later.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\+?[0-9\s\-()]+$/.test(phone);
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== ACTIVE NAV LINK HIGHLIGHTING ====================
const sections = document.querySelectorAll('section[id]');
const currentSectionElement = document.querySelector('.current-section');
const sectionIcon = document.querySelector('.section-icon');
const sectionName = document.querySelector('.section-name');

function updateCurrentSection() {
    const scrollY = window.pageYOffset;
    let currentSection = 'Home';
    let currentIcon = 'fa-home';

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (navLink) {
                currentSection = navLink.getAttribute('data-section');
                currentIcon = navLink.getAttribute('data-icon');
            }
            navLink?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });

    // Animate section change
    if (sectionName.textContent !== currentSection) {
        currentSectionElement.style.transform = 'translateX(-20px)';
        currentSectionElement.style.opacity = '0';

        setTimeout(() => {
            sectionName.textContent = currentSection;
            sectionIcon.className = `section-icon fas ${currentIcon}`;
            currentSectionElement.style.transform = 'translateX(0)';
            currentSectionElement.style.opacity = '1';
        }, 200);
    }
}

window.addEventListener('scroll', updateCurrentSection);

// Initialize on load
updateCurrentSection();

// Add active link styles
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::before {
        width: 80%;
    }
`;
document.head.appendChild(navStyle);

// ==================== IMAGE ERROR HANDLING ====================
// Add glassmorphic placeholders for broken images
document.querySelectorAll('.skill-icon img, .project-image img').forEach(img => {
    img.addEventListener('error', function () {
        this.style.opacity = '0';
        const parent = this.parentElement;
        parent.classList.add('image-error');

        // Create glassmorphic placeholder
        if (!parent.querySelector('.img-placeholder')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'img-placeholder';
            placeholder.innerHTML = '<i class="fas fa-image"></i>';
            parent.appendChild(placeholder);
        }
    });

    // Check if image is already broken
    if (!img.complete || img.naturalHeight === 0) {
        img.dispatchEvent(new Event('error'));
    }
});

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== PREVENT FLASH OF UNSTYLED CONTENT ====================
document.documentElement.style.visibility = 'visible';

console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; color: #00f2fe; font-weight: bold;');
console.log('%cLooking for something? Feel free to reach out!', 'font-size: 14px; color: #4facfe;');
