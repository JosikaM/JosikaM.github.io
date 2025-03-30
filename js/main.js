// Mobile Navigation
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

// Toggle navigation when hamburger is clicked
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('toggle');
    
    // Animate links
    navItems.forEach(item => {
        item.classList.toggle('fade');
    });
});

// Close menu when a navigation link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('toggle');
        navItems.forEach(item => {
            item.classList.remove('fade');
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 350) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Reveal sections on scroll
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Simple form submission with EmailJS
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Initialize EmailJS
    emailjs.init('YOUR_USER_ID'); // Replace 'YOUR_USER_ID' with your EmailJS user ID

    const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
    const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID

    const formData = {
        user_name: document.getElementById('name').value,
        user_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    emailjs.send(serviceID, templateID, formData)
        .then(() => {
            alert('Thank you for your message! I will get back to you soon.');
            document.getElementById('contact-form').reset();
        })
        .catch((error) => {
            console.error('Failed to send email:', error);
            alert('Oops! Something went wrong. Please try again later.');
        });
});