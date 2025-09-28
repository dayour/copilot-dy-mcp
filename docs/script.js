// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles');
        this.maxParticles = 50;
        this.init();
    }

    init() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
        this.animate();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const speed = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.5 + 0.3;
        const color = this.getRandomColor();
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.opacity = opacity;
        
        // Animation duration based on speed
        const duration = (window.innerHeight / speed) * 20;
        particle.style.animationDuration = duration + 'ms';
        particle.style.animationDelay = Math.random() * 2000 + 'ms';
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            speed: speed,
            x: startX,
            y: startY
        });

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p.element !== particle);
                this.createParticle(); // Create new particle
            }
        }, duration + 2000);
    }

    getRandomColor() {
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#0099ff', '#00ff88', '#aa00ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        // Additional particle effects can be added here
        requestAnimationFrame(() => this.animate());
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system
    new ParticleSystem();

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.nav-container');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.3)';
        }
        
        lastScrollY = currentScrollY;
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
    const animatedElements = document.querySelectorAll('.feature-card, .tool-card, .option-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Code typing animation
    const codeLines = document.querySelectorAll('.code-line');
    let currentLine = 0;
    
    function typeNextLine() {
        if (currentLine < codeLines.length) {
            codeLines[currentLine].classList.remove('active');
            currentLine = (currentLine + 1) % codeLines.length;
            codeLines[currentLine].classList.add('active');
        }
    }
    
    // Change active line every 3 seconds
    setInterval(typeNextLine, 3000);

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 40px rgba(0, 255, 255, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 20px rgba(0, 255, 255, 0.3)';
        });
    });

    // Tool card hover effects
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const status = this.querySelector('.tool-status');
            if (status) {
                status.style.color = '#00ff88';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const status = this.querySelector('.tool-status');
            if (status) {
                status.style.color = '#00ff88';
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Random cyber glitch effect
    function createGlitchEffect() {
        const glitchElements = document.querySelectorAll('.title-line.accent');
        
        glitchElements.forEach(element => {
            if (Math.random() < 0.1) { // 10% chance
                element.style.textShadow = `
                    ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 #ff00ff,
                    ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 #00ffff
                `;
                
                setTimeout(() => {
                    element.style.textShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
                }, 150);
            }
        });
    }
    
    // Apply glitch effect occasionally
    setInterval(createGlitchEffect, 5000);

    // Dynamic grid animation
    const grid = document.querySelector('.cyber-grid');
    let gridOpacity = 0.3;
    let increasing = false;
    
    function animateGrid() {
        if (increasing) {
            gridOpacity += 0.01;
            if (gridOpacity >= 0.5) increasing = false;
        } else {
            gridOpacity -= 0.01;
            if (gridOpacity <= 0.1) increasing = true;
        }
        
        grid.style.opacity = gridOpacity;
        requestAnimationFrame(animateGrid);
    }
    
    animateGrid();

    // Feature card tilt effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // Console Easter egg
    console.log(`
    ╔═══════════════════════════════════════╗
    ║     Welcome to MCP Laboratory!        ║
    ║                                       ║
    ║  🔧 PowerShell Execution              ║
    ║  🌐 REST API Client                   ║
    ║  ☁️ Azure Resource Management         ║
    ║  📊 System Information                ║
    ║                                       ║
    ║  Built with cyber retro modern        ║
    ║  fluent design principles 🚀          ║
    ╚═══════════════════════════════════════╝
    `);

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
            }, 0);
        });
    }
});

// Resize handler for particles
window.addEventListener('resize', () => {
    // Reinitialize particles on resize
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        particleContainer.innerHTML = '';
        new ParticleSystem();
    }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}