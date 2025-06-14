// Modern JavaScript for the new design
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
    // Initialize countdown
    initCountdown();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize form handling
    initFormHandling();
});

// Countdown Timer
function initCountdown() {
    // Set target date (30 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Scroll Effects
function initScrollEffects() {
    // Navigation background on scroll
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .time-unit, .newsletter-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Form Handling
function initFormHandling() {
    const form = document.querySelector('.newsletter-form');
    const input = document.querySelector('.newsletter-input');
    const button = document.querySelector('.newsletter-button');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = input.value.trim();
        
        if (email && isValidEmail(email)) {
            // Show success state
            button.textContent = 'Thank You!';
            button.style.background = '#10b981';
            button.style.color = '#ffffff';
            
            // Reset after 3 seconds
            setTimeout(() => {
                button.textContent = 'Notify Me';
                button.style.background = '#ffffff';
                button.style.color = '#000000';
                input.value = '';
            }, 3000);
        } else {
            // Show error state
            input.style.borderColor = '#ef4444';
            input.style.background = 'rgba(239, 68, 68, 0.1)';
            
            setTimeout(() => {
                input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                input.style.background = 'rgba(255, 255, 255, 0.05)';
            }, 2000);
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scrolling for navigation links
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
        e.preventDefault();
        
        const targetId = e.target.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
});

// Mouse tracking for subtle parallax effect
document.addEventListener('mousemove', (e) => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        heroBackground.style.background = `
            radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at ${100-x}% ${100-y}%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)
        `;
    }
});

// Performance optimization
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
}
