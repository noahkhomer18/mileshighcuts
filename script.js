// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
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
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .gallery-item, .contact-item, .feature, .hours-day');
    animateElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
});

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-nav">
            <button class="lightbox-prev">&larr;</button>
            <button class="lightbox-next">&rarr;</button>
        </div>
    </div>
`;

// Add lightbox styles
const lightboxStyles = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    }
    
    .lightbox.active {
        display: flex;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-image {
        max-width: 100%;
        max-height: 100%;
        border-radius: 10px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: var(--primary-gold);
        font-size: 2rem;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.5);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
        pointer-events: none;
    }
    
    .lightbox-prev,
    .lightbox-next {
        background: rgba(212, 175, 55, 0.8);
        border: none;
        color: var(--primary-black);
        font-size: 1.5rem;
        padding: 1rem;
        border-radius: 50%;
        cursor: pointer;
        pointer-events: all;
        transition: background 0.3s ease;
    }
    
    .lightbox-prev:hover,
    .lightbox-next:hover {
        background: var(--primary-gold);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);

document.body.appendChild(lightbox);

let currentImageIndex = 0;
const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        showLightbox();
    });
});

function showLightbox() {
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    lightboxImage.src = images[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    lightboxImage.src = images[currentImageIndex];
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    lightboxImage.src = images[currentImageIndex];
}

// Lightbox event listeners
lightbox.querySelector('.lightbox-close').addEventListener('click', hideLightbox);
lightbox.querySelector('.lightbox-next').addEventListener('click', showNextImage);
lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrevImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        hideLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                hideLightbox();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
        }
    }
});

// Booking button functionality - Booksy integration
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    if (btn.textContent.includes('Book') || btn.textContent.includes('Appointment')) {
        btn.addEventListener('click', (e) => {
            // Let the Booksy link work normally - no preventDefault needed
            // The link will open in a new tab as specified in HTML
            console.log('Redirecting to Booksy for appointment booking...');
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact form validation (if you add a form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    // Add error handling for failed image loads
    img.addEventListener('error', () => {
        console.warn('Failed to load image:', img.src);
        img.style.opacity = '1'; // Show the image even if it failed to load
        img.style.backgroundColor = 'var(--accent-black)'; // Add background color for missing images
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    // If image is already loaded (cached), show it immediately
    if (img.complete && img.naturalHeight !== 0) {
        img.style.opacity = '1';
    }
});

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--gradient-gold);
    border: none;
    border-radius: 50%;
    color: var(--primary-black);
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--shadow-gold);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Mile High Cuts website loaded successfully!');
    
    // Fix hero background on mobile devices
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth <= 768) {
        // Force background to load properly on mobile
        hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('IMG_6648.jpeg')`;
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center center';
        hero.style.backgroundRepeat = 'no-repeat';
        hero.style.backgroundAttachment = 'scroll';
    }
    
    // Add loading animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});
