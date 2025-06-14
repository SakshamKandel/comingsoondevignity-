// Set current year
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
    // Initialize countdown
    initCountdown();
    
    // Initialize matrix effect
    initMatrixEffect();
    
    // Initialize terminal animation
    initTerminalAnimation();
    
    // Initialize particle system
    initParticles();
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

// Matrix Rain Effect (Reduced intensity)
function initMatrixEffect() {
    const matrixContainer = document.querySelector('.matrix-bg');
    const characters = '01';
    
    function createMatrixRain() {
        if (Math.random() < 0.3) { // Reduced frequency
            const column = document.createElement('div');
            column.style.position = 'absolute';
            column.style.top = '-100px';
            column.style.left = Math.random() * window.innerWidth + 'px';
            column.style.color = `rgba(56, 178, 172, ${Math.random() * 0.3 + 0.1})`;
            column.style.fontSize = Math.random() * 14 + 8 + 'px';
            column.style.fontFamily = 'Inter, sans-serif';
            column.style.animation = `matrixFall ${Math.random() * 5 + 8}s linear`;
            column.style.pointerEvents = 'none';
            column.style.zIndex = '-1';
            
            const char = characters[Math.floor(Math.random() * characters.length)];
            column.textContent = char;
            
            matrixContainer.appendChild(column);
            
            // Remove element after animation
            setTimeout(() => {
                if (column.parentNode) {
                    column.parentNode.removeChild(column);
                }
            }, 13000);
        }
    }
    
    // Add CSS for matrix fall animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrixFall {
            to {
                transform: translateY(calc(100vh + 100px));
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create matrix rain every 800ms (reduced frequency)
    setInterval(createMatrixRain, 800);
}

// Terminal Animation (Reduced effects)
function initTerminalAnimation() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    // Add cursor effect to typing elements
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        setTimeout(() => {
            element.style.borderRight = 'none';
        }, 4000);
    });
    
    // Reduced terminal flicker effect
    setInterval(() => {
        const terminal = document.querySelector('.terminal');
        if (Math.random() < 0.01) { // Reduced from 5% to 1%
            terminal.style.opacity = '0.95';
            setTimeout(() => {
                terminal.style.opacity = '1';
            }, 30);
        }
    }, 3000);
}

// Enhanced Particle System (Reduced intensity)
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 2 + 0.5; // Smaller particles
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 15 + 20; // Slower movement
        const delay = Math.random() * 8;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = startX + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        // Softer colors
        const colors = ['#38b2ac', '#8b45ff', '#a0a0a0'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 ${size}px ${particle.style.backgroundColor}`;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }
    
    // Create initial particles (reduced amount)
    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 1000);
    }
    
    // Continue creating particles (less frequently)
    setInterval(createParticle, 4000);
}

// Glitch Effect for Logo
function initGlitchEffect() {
    const logo = document.querySelector('.logo');
    
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance
            logo.style.animation = 'none';
            logo.classList.add('glitch-active');
            
            setTimeout(() => {
                logo.classList.remove('glitch-active');
                logo.style.animation = 'logoGlow 3s ease-in-out infinite alternate';
            }, 200);
        }
    }, 3000);
}

// Progress Bar Animation
function animateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 2;
        if (progress >= 100) {
            progress = 100;
            progressText.textContent = 'System Ready!';
            clearInterval(interval);
            
            setTimeout(() => {
                progress = 0;
                progressFill.style.width = '0%';
                progressText.textContent = 'Initializing...';
                animateProgressBar();
            }, 3000);
        } else {
            progressText.textContent = `Loading... ${Math.floor(progress)}%`;
        }
        progressFill.style.width = progress + '%';
    }, 100);
}

// Initialize progress bar animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateProgressBar, 5000);
});

// Keyboard event listeners for easter eggs
document.addEventListener('keydown', function(event) {
    // Konami Code: ↑↑↓↓←→←→BA
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                       'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    if (!window.konamiSequence) {
        window.konamiSequence = [];
    }
    
    window.konamiSequence.push(event.code);
    
    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence.shift();
    }
    
    if (window.konamiSequence.length === konamiCode.length && 
        window.konamiSequence.every((key, index) => key === konamiCode[index])) {
        
        // Easter egg: Matrix mode
        document.body.classList.add('matrix-mode');
        
        const style = document.createElement('style');
        style.textContent = `
            .matrix-mode {
                animation: matrixTransform 2s ease-in-out;
            }
            @keyframes matrixTransform {
                0% { filter: hue-rotate(0deg); }
                50% { filter: hue-rotate(180deg) contrast(2); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.classList.remove('matrix-mode');
        }, 2000);
        
        window.konamiSequence = [];
    }
});

// Mouse tracking effect
document.addEventListener('mousemove', function(event) {
    const cursor = document.querySelector('.cursor-trail') || createCursorTrail();
    cursor.style.left = event.clientX + 'px';
    cursor.style.top = event.clientY + 'px';
});

function createCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0,255,0,0.5) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
    `;
    document.body.appendChild(cursor);
    return cursor;
}

// Audio feedback (optional - can be uncommented if audio files are added)
/*
function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.volume = 0.1;
    audio.play().catch(e => console.log('Audio play failed:', e));
}
*/

// Social link interactions
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
});

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    initGlitchEffect();
    
    // Add some random visual effects
    setInterval(() => {
        if (Math.random() < 0.3) {
            const particles = document.querySelectorAll('.particle');
            if (particles.length > 0) {
                const randomParticle = particles[Math.floor(Math.random() * particles.length)];
                randomParticle.style.filter = 'brightness(2)';
                setTimeout(() => {
                    randomParticle.style.filter = 'brightness(1)';
                }, 200);
            }
        }
    }, 1000);
});

// Performance optimization
let ticking = false;

function updateAnimations() {
    // Batch DOM updates here if needed
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}
