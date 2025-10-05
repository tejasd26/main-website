// Creative Tutorials Hub - Interactive JavaScript
// Main functionality for the website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initAnimations();
    initMobileMenu();
    initTutorialCards();
    initResourceLinks();
    initTipCards();
    initFloatingCards();
    initScrollEffects();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
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
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });

        // Form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Field validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'subject':
            if (value.length < 3) {
                isValid = false;
                errorMessage = 'Subject must be at least 3 characters long';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        field.classList.add('success');
    }
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error', 'success');
    const errorElement = field.parentNode.querySelector('.error-text');
    if (errorElement) {
        errorElement.remove();
    }
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-text');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-text';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

// Tutorial cards functionality
function initTutorialCards() {
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    
    tutorialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click functionality for tutorial links
        const tutorialLinks = card.querySelectorAll('.tutorial-link');
        tutorialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showTutorialModal(this.textContent);
            });
        });
        
        // Add play button functionality
        const playOverlay = card.querySelector('.play-overlay');
        if (playOverlay) {
            playOverlay.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const tutorialTitle = card.querySelector('h3').textContent;
                showTutorialVideo(tutorialTitle);
            });
        }
    });
}

// Resource links functionality
function initResourceLinks() {
    const resourceLinks = document.querySelectorAll('.resource-link');
    
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Track external link clicks
            if (this.href && this.href.startsWith('http')) {
                console.log('External link clicked:', this.href);
            }
        });
    });
}

// Tip cards functionality
function initTipCards() {
    const tipCards = document.querySelectorAll('.tip-card');
    
    tipCards.forEach(card => {
        const tipLink = card.querySelector('.tip-link');
        
        if (tipLink) {
            tipLink.addEventListener('click', function(e) {
                e.preventDefault();
                showTipModal(card.querySelector('h3').textContent);
            });
        }
    });
}

// Floating cards animation
function initFloatingCards() {
    const cards = document.querySelectorAll('.floating-cards .card');
    
    cards.forEach((card, index) => {
        // Add random floating animation
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        
        card.style.animationDelay = `${randomDelay}s`;
        card.style.animationDuration = `${randomDuration}s`;
        
        // Add click interaction
        card.addEventListener('click', function() {
            const cardText = this.querySelector('.card-content span').textContent;
            showSectionModal(cardText);
        });
        
        // Add hover effect for images
        const cardImage = card.querySelector('.card-image');
        if (cardImage) {
            card.addEventListener('mouseenter', function() {
                cardImage.style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                cardImage.style.transform = 'scale(1)';
            });
        }
    });
}

// Scroll animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.tutorial-card, .tip-card, .resource-category, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Animation initialization
function initAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .tutorial-card, .tip-card, .resource-category, .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .tutorial-card.animate-in, .tip-card.animate-in, .resource-category.animate-in, .contact-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error-text {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .form-group.error input,
        .form-group.error textarea {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        .form-group.success input,
        .form-group.success textarea {
            border-color: #10b981;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Modal functionality
function showTutorialModal(tutorialTitle) {
    const modal = createModal(`
        <h2>${tutorialTitle}</h2>
        <p>This tutorial is coming soon! We're working hard to bring you comprehensive, step-by-step guides for all your creative needs.</p>
        <div class="modal-features">
            <h3>What you'll learn:</h3>
            <ul>
                <li>Step-by-step instructions</li>
                <li>Video demonstrations</li>
                <li>Downloadable resources</li>
                <li>Practice exercises</li>
            </ul>
        </div>
        <div class="modal-actions">
            <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            <button class="btn btn-secondary" onclick="requestTutorial('${tutorialTitle}')">Request Tutorial</button>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function showTutorialVideo(tutorialTitle) {
    const modal = createModal(`
        <h2>${tutorialTitle} - Video Preview</h2>
        <div class="video-container">
            <div class="video-placeholder">
                <i class="fas fa-play-circle"></i>
                <p>Video preview coming soon!</p>
                <p class="video-description">This will be a comprehensive video tutorial covering all the essential techniques and workflows.</p>
            </div>
        </div>
        <div class="modal-features">
            <h3>Video includes:</h3>
            <ul>
                <li>High-quality video demonstrations</li>
                <li>Step-by-step instructions</li>
                <li>Downloadable project files</li>
                <li>Practice exercises</li>
                <li>Expert tips and tricks</li>
            </ul>
        </div>
        <div class="modal-actions">
            <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            <button class="btn btn-secondary" onclick="requestTutorial('${tutorialTitle}')">Request Full Tutorial</button>
        </div>
    `);
    
    // Add video container styles
    const style = document.createElement('style');
    style.textContent = `
        .video-container {
            margin: 20px 0;
            border-radius: 12px;
            overflow: hidden;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
        }
        
        .video-placeholder {
            padding: 60px 20px;
            text-align: center;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .video-placeholder i {
            font-size: 4rem;
            color: var(--primary-color);
            margin-bottom: 20px;
        }
        
        .video-placeholder p {
            font-size: 1.2rem;
            color: var(--text-primary);
            margin-bottom: 10px;
        }
        
        .video-description {
            color: var(--text-secondary);
            font-size: 1rem;
        }
        
        .video-container .modal-close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.2s;
            z-index: 10;
        }
        
        .video-container .modal-close:hover {
            background: rgba(239, 68, 68, 0.8);
            transform: scale(1.1);
        }
    `;
    
    if (!document.querySelector('#video-modal-styles')) {
        style.id = 'video-modal-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
}

// New function for embedding actual videos
function showVideoModal(title, videoUrl) {
    const modal = createModal(`
        <h2>${title}</h2>
        <div class="video-container">
            <div class="video-wrapper">
                <iframe 
                    src="${videoUrl}" 
                    title="${title}"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
        <div class="modal-features">
            <h3>What you'll learn:</h3>
            <ul>
                <li>Step-by-step video instructions</li>
                <li>Professional techniques</li>
                <li>Real-world examples</li>
                <li>Downloadable resources</li>
            </ul>
        </div>
        <div class="modal-actions">
            <button class="btn btn-primary" onclick="closeModal()">Close Video</button>
            <button class="btn btn-secondary" onclick="requestTutorial('${title}')">Request More Tutorials</button>
        </div>
    `);
    
    // Add video wrapper styles
    const style = document.createElement('style');
    style.textContent = `
        .video-wrapper {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            overflow: hidden;
            border-radius: 12px;
        }
        
        .video-wrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        
        .video-container {
            margin: 20px 0;
            border-radius: 12px;
            overflow: hidden;
            background: #000;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
    `;
    
    if (!document.querySelector('#video-embed-styles')) {
        style.id = 'video-embed-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
}

function showTipModal(tipTitle) {
    const modal = createModal(`
        <h2>${tipTitle}</h2>
        <p>This tip and trick guide is coming soon! We're compiling the best practices and shortcuts from industry professionals.</p>
        <div class="modal-features">
            <h3>What you'll discover:</h3>
            <ul>
                <li>Professional shortcuts</li>
                <li>Workflow optimizations</li>
                <li>Time-saving techniques</li>
                <li>Pro tips and tricks</li>
            </ul>
        </div>
        <div class="modal-actions">
            <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            <button class="btn btn-secondary" onclick="requestTip('${tipTitle}')">Request Tip</button>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function showSectionModal(sectionName) {
    const modal = createModal(`
        <h2>Explore ${sectionName}</h2>
        <p>Discover comprehensive tutorials and resources for ${sectionName.toLowerCase()}.</p>
        <div class="modal-features">
            <h3>What's included:</h3>
            <ul>
                <li>Beginner to advanced tutorials</li>
                <li>Video demonstrations</li>
                <li>Downloadable project files</li>
                <li>Community support</li>
            </ul>
        </div>
        <div class="modal-actions">
            <button class="btn btn-primary" onclick="closeModal()">Start Learning</button>
            <button class="btn btn-secondary" onclick="closeModal()">Browse Resources</button>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            ${content}
        </div>
    `;
    
    // Add click outside to close functionality
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
            animation: modalFadeIn 0.3s ease-out;
        }
        
        @keyframes modalFadeIn {
            from {
                opacity: 0;
                backdrop-filter: blur(0px);
            }
            to {
                opacity: 1;
                backdrop-filter: blur(5px);
            }
        }
        
        .modal-content {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            position: relative;
            animation: modalSlideIn 0.3s ease-out;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            color: #6b7280;
            transition: all 0.2s;
            z-index: 1;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .modal-close:hover {
            color: #ef4444;
            background: rgba(239, 68, 68, 0.1);
            border-color: rgba(239, 68, 68, 0.3);
            transform: scale(1.1);
        }
        
        .modal-features {
            margin: 20px 0;
        }
        
        .modal-features ul {
            list-style: none;
            padding: 0;
        }
        
        .modal-features li {
            padding: 5px 0;
            position: relative;
            padding-left: 20px;
        }
        
        .modal-features li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
            flex-wrap: wrap;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes modalSlideOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-50px);
            }
        }
        
        @keyframes modalFadeOut {
            from {
                opacity: 1;
                backdrop-filter: blur(5px);
            }
            to {
                opacity: 0;
                backdrop-filter: blur(0px);
            }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                padding: 30px 20px;
                margin: 10px;
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    if (!document.querySelector('#modal-styles')) {
        style.id = 'modal-styles';
        document.head.appendChild(style);
    }
    
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.animation = 'modalFadeOut 0.3s ease-out';
        modal.querySelector('.modal-content').style.animation = 'modalSlideOut 0.3s ease-out';
        
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Request functions
function requestTutorial(tutorialTitle) {
    showNotification(`Tutorial request for "${tutorialTitle}" has been submitted!`, 'success');
    closeModal();
}

function requestTip(tipTitle) {
    showNotification(`Tip request for "${tipTitle}" has been submitted!`, 'success');
    closeModal();
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">&times;</button>
        </div>
    `;
    
    // Add notification styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10001;
                max-width: 400px;
                animation: notificationSlideIn 0.3s ease-out;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            
            .notification-success {
                background: #f0fdf4;
                border: 1px solid #bbf7d0;
                color: #166534;
            }
            
            .notification-error {
                background: #fef2f2;
                border: 1px solid #fecaca;
                color: #dc2626;
            }
            
            .notification-info {
                background: #eff6ff;
                border: 1px solid #bfdbfe;
                color: #1e40af;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                margin-left: 10px;
                opacity: 0.7;
                transition: opacity 0.2s;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes notificationSlideIn {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification) {
        notification.remove();
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events efficiently
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be registered here for PWA functionality
        console.log('Service Worker support detected');
    });
}

// Analytics and tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    // Analytics tracking would be implemented here
}

// Local video function
function showLocalVideo(title, videoPath) {
    const modal = createModal(`
        <h2>${title}</h2>
        <div class="video-container">
            <div class="video-wrapper">
                <video controls width="100%" height="auto" preload="metadata">
                    <source src="${videoPath}" type="video/mp4">
                    <source src="${videoPath.replace('.mp4', '.webm')}" type="video/webm">
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
        <div class="modal-features">
            <h3>Video Features:</h3>
            <ul>
                <li>Full video controls</li>
                <li>HD quality playback</li>
                <li>Downloadable content</li>
                <li>Mobile optimized</li>
            </ul>
        </div>
        <div class="modal-actions">
            <button class="btn btn-primary" onclick="closeModal()">Close Video</button>
            <a href="${videoPath}" download class="btn btn-secondary">Download Video</a>
        </div>
    `);
    
    // Add local video styles
    const style = document.createElement('style');
    style.textContent = `
        .video-wrapper video {
            width: 100%;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        .video-container {
            margin: 20px 0;
            border-radius: 12px;
            overflow: hidden;
            background: #000;
        }
    `;
    
    if (!document.querySelector('#local-video-styles')) {
        style.id = 'local-video-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
}

// Export functions for global access
window.closeModal = closeModal;
window.requestTutorial = requestTutorial;
window.requestTip = requestTip;
window.closeNotification = closeNotification;
window.showVideoModal = showVideoModal;
window.showLocalVideo = showLocalVideo;
