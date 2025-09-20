// Revolutionary Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initializeNavigation();
    
    // Smooth scrolling for CTA button
    initializeSmoothScrolling();
    
    // Form handling
    initializeFormHandling();
    
    // Animation on scroll
    initializeScrollAnimations();
    
    // Mobile menu functionality
    initializeMobileMenu();
});

// Navigation initialization
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navigation').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.navigation');
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(47, 82, 51, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.backgroundColor = '';
            nav.style.backdropFilter = '';
        }
    });
}

// Smooth scrolling for CTA button
function initializeSmoothScrolling() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const chroniclesSection = document.getElementById('chronicles');
            if (chroniclesSection) {
                const navHeight = document.querySelector('.navigation').offsetHeight;
                const targetPosition = chroniclesSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Form handling
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Your commission request has been received! We\'ll respond within 24 hours.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-item, .portfolio-item, .testimonial-item');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            const isActive = navLinks.classList.contains('mobile-active');
            
            if (isActive) {
                navLinks.classList.remove('mobile-active');
                this.classList.remove('active');
            } else {
                navLinks.classList.add('mobile-active');
                this.classList.add('active');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = navLinks.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-active');
                mobileToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('mobile-active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-family: var(--font-serif);
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #2F5233, #4a6b4d)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #8B0000, #a00000)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #666, #888)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Portfolio item hover effects
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});


// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage && scrolled < window.innerHeight) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Revolutionary Easter Eggs
document.addEventListener('keydown', function(e) {
    // Konami Code for Revolutionary War facts
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    this.konamiSequence = this.konamiSequence || [];
    this.konamiSequence.push(e.keyCode);
    
    if (this.konamiSequence.length > konamiCode.length) {
        this.konamiSequence.shift();
    }
    
    if (this.konamiSequence.join(',') === konamiCode.join(',')) {
        showRevolutionaryFact();
        this.konamiSequence = [];
    }
});

function showRevolutionaryFact() {
    const facts = [
        "The American Revolution began on April 19, 1775, at Lexington and Concord.",
        "The Declaration of Independence was signed on July 4, 1776.",
        "George Washington crossed the Delaware River on December 25, 1776.",
        "The Boston Tea Party occurred on December 16, 1773.",
        "The Revolutionary War officially ended with the Treaty of Paris in 1783.",
        "Paul Revere's midnight ride took place on April 18, 1775.",
        "The Continental Congress first met in Philadelphia in 1774."
    ];
    
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    showNotification(`Revolutionary Fact: ${randomFact}`, 'info');
}

// Add subtle animation to the logo
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.style.position = 'relative';
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// Enhanced Revolutionary Features
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll progress indicator
    createScrollProgress();
    
    // Initialize cursor trail
    initializeCursorTrail();
    
    // Revolutionary quotes system
    initializeRevolutionaryQuotes();
    
    // Enhanced scroll effects
    initializeEnhancedScrollEffects();
    
    // Particle effects
    initializeParticleEffects();
});

// Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Revolutionary Cursor Trail
function initializeCursorTrail() {
    const trails = [];
    let mouseX = 0;
    let mouseY = 0;
    
    // Create trail elements
    for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (5 - i) / 5;
        trail.style.transform = `scale(${(5 - i) / 5})`;
        document.body.appendChild(trail);
        trails.push(trail);
    }
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrails() {
        let x = mouseX;
        let y = mouseY;
        
        trails.forEach((trail, index) => {
            trail.style.left = x - 3 + 'px';
            trail.style.top = y - 3 + 'px';
            
            if (index < trails.length - 1) {
                const nextTrail = trails[index + 1];
                x += (parseFloat(nextTrail.style.left) - x) * 0.3;
                y += (parseFloat(nextTrail.style.top) - y) * 0.3;
            }
        });
        
        requestAnimationFrame(updateTrails);
    }
    
    updateTrails();
}

// Revolutionary Quotes System
function initializeRevolutionaryQuotes() {
    const quotes = [
        "Give me liberty, or give me death!",
        "These are the times that try men's souls.",
        "We hold these truths to be self-evident...",
        "The tree of liberty must be refreshed...",
        "Don't fire until you see the whites of their eyes!",
        "I only regret that I have but one life...",
        "Join, or Die.",
        "No taxation without representation!",
        "The shot heard 'round the world.",
        "Life, Liberty, and the pursuit of Happiness."
    ];
    
    let quoteIndex = 0;
    
    document.addEventListener('click', function(e) {
        // Only trigger on certain elements to avoid spam
        if (e.target.matches('.cta-button, .submit-btn, .nav-links a, .logo')) {
            showFloatingQuote(quotes[quoteIndex % quotes.length], e.clientX, e.clientY);
            quoteIndex++;
        }
    });
    
    // Auto-show quotes periodically
    setInterval(function() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        showFloatingQuote(quotes[quoteIndex % quotes.length], x, y);
        quoteIndex++;
    }, 15000); // Every 15 seconds
}

function showFloatingQuote(text, x, y) {
    const quote = document.createElement('div');
    quote.className = 'revolutionary-quote';
    quote.textContent = `"${text}"`;
    quote.style.left = x + 'px';
    quote.style.top = y + 'px';
    document.body.appendChild(quote);
    
    // Remove after animation
    setTimeout(() => {
        if (quote.parentNode) {
            quote.parentNode.removeChild(quote);
        }
    }, 4000);
}

// Enhanced Scroll Effects
function initializeEnhancedScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // Parallax background effects
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = rate + 'px';
        }
        
        // Reveal animations for elements
        const revealElements = document.querySelectorAll('.service-item, .credential-item, .contact-item');
        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = `all 0.6s ease ${index * 0.1}s`;
            }
        });
    });
    
    // Initialize elements as hidden
    const animateElements = document.querySelectorAll('.service-item, .credential-item, .contact-item');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
}

// Particle Effects
function initializeParticleEffects() {
    // Add revolutionary sparkles on hover
    const sparkleElements = document.querySelectorAll('.cta-button, .submit-btn, .logo h3');
    
    sparkleElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✦';
        sparkle.style.position = 'fixed';
        sparkle.style.color = '#8B0000';
        sparkle.style.fontSize = '12px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        sparkle.animate([
            { opacity: 0, transform: 'translateY(0) scale(0)' },
            { opacity: 1, transform: 'translateY(-20px) scale(1)' },
            { opacity: 0, transform: 'translateY(-40px) scale(0)' }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        // Remove after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Enhanced notification system with Revolutionary War theme
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Add revolutionary flair to success messages
    if (type === 'success') {
        message = '🎖️ ' + message + ' Liberty endures!';
    }
    
    notification.textContent = message;
    
    // Enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        color: white;
        font-family: var(--font-display);
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.4s ease;
        max-width: 400px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.1);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #2F5233, #4a6b4d)';
        notification.style.borderColor = '#DAA520';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #8B0000, #a00000)';
        notification.style.borderColor = '#FF6B6B';
    } else {
        notification.style.background = 'linear-gradient(135deg, #666, #888)';
        notification.style.borderColor = '#AAA';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Create sparkles around notification
    if (type === 'success') {
        createSparkles(notification);
    }
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 5000);
}

// Enhanced Revolutionary Easter Eggs
document.addEventListener('keydown', function(e) {
    // Konami Code for Revolutionary War facts
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    this.konamiSequence = this.konamiSequence || [];
    this.konamiSequence.push(e.keyCode);
    
    if (this.konamiSequence.length > konamiCode.length) {
        this.konamiSequence.shift();
    }
    
    if (this.konamiSequence.join(',') === konamiCode.join(',')) {
        showRevolutionaryFact();
        this.konamiSequence = [];
        
        // Extra celebration effect
        document.body.style.background = 'linear-gradient(45deg, #8B0000, #2F5233, #8B0000)';
        document.body.style.animation = 'revolutionarySparkle 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.background = '';
            document.body.style.animation = '';
        }, 1000);
    }
    
    // Secret: Press 1776 for special effect
    const secretCode = [49, 55, 55, 54]; // 1776
    this.secretSequence = this.secretSequence || [];
    this.secretSequence.push(e.keyCode);
    
    if (this.secretSequence.length > secretCode.length) {
        this.secretSequence.shift();
    }
    
    if (this.secretSequence.join(',') === secretCode.join(',')) {
        libertyBellEffect();
        this.secretSequence = [];
    }
});

function libertyBellEffect() {
    showNotification('🔔 Liberty Bell activated! The revolution continues!', 'success');
    
    // Create multiple floating quotes
    const libertyQuotes = [
        "Proclaim LIBERTY throughout all the land!",
        "1776 - The birth of freedom!",
        "By the rude bridge that arched the flood...",
        "The unanimous Declaration of the thirteen united States!"
    ];
    
    libertyQuotes.forEach((quote, index) => {
        setTimeout(() => {
            showFloatingQuote(quote, Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }, index * 500);
    });
}

// Enhanced Revolutionary Facts
function showRevolutionaryFact() {
    const facts = [
        "The American Revolution began on April 19, 1775, at Lexington and Concord - 'The shot heard 'round the world.'",
        "The Declaration of Independence was signed on July 4, 1776, declaring that 'all men are created equal.'",
        "George Washington crossed the Delaware River on December 25, 1776, in a daring Christmas night attack.",
        "The Boston Tea Party occurred on December 16, 1773, dumping 342 chests of tea into Boston Harbor.",
        "The Revolutionary War officially ended with the Treaty of Paris in 1783, securing American independence.",
        "Paul Revere's midnight ride took place on April 18, 1775, warning 'The British are coming!'",
        "The Continental Congress first met in Philadelphia in 1774, uniting the colonies in resistance.",
        "Benedict Arnold was America's most famous traitor, attempting to surrender West Point to the British.",
        "The winter at Valley Forge (1777-1778) tested the Continental Army's resolve and forged their unity.",
        "The Stamp Act of 1765 sparked the rallying cry 'No taxation without representation!'"
    ];
    
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    showNotification(`Revolutionary Fact: ${randomFact}`, 'info');
}

// Add gold variable to CSS
document.documentElement.style.setProperty('--gold', '#DAA520');
