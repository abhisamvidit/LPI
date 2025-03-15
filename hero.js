// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the scroll reveal animations
    initScrollReveal();
    
    // Initialize counter animations
    initCounters();
    
    // Initialize hero content animation
    initHeroContent();
    
    // Initialize progress bars animation
    initProgressBars();
    
    // Add mobile support
    initMobileSupport();
});

// Scroll reveal initialization
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .section-header, #views-heading, .lpi-views-list, #leadership-heading, .membership-content, .membership-image');
    const policyCards = document.querySelectorAll('.policy-card');
    const leadershipItems = document.querySelectorAll('.lpi-leadership li');
    const viewPosts = document.querySelectorAll('.view-post');
    
    // Observer options
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Create the observer
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe all reveal elements
    revealElements.forEach(el => {
        observer.observe(el);
    });
    
    // Observe policy cards with delay
    policyCards.forEach((card, index) => {
        setTimeout(() => {
            observer.observe(card);
        }, index * 200); // Staggered delay
    });
    
    // Observe leadership items with delay
    leadershipItems.forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 150); // Staggered delay
    });
    
    // Observe view posts with delay
    viewPosts.forEach((post, index) => {
        setTimeout(() => {
            observer.observe(post);
        }, index * 100); // Staggered delay
    });
}

// Initialize hero content animation
function initHeroContent() {
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        setTimeout(() => {
            contentWrapper.classList.add('active');
        }, 500);
    }
}

// Initialize counter animations
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = parseInt(counter.getAttribute('data-duration') || '2000');
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        
        let startValue = 0;
        const increment = target / (duration / 6); // Increase the divisor for a faster/slower animation
        
        const updateCounter = () => {
            startValue += increment;
            
            if (startValue < target) {
                counter.textContent = prefix + Math.floor(startValue) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = prefix + target + suffix;
            }
        };
        
        // Create an observer for each counter
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize progress bars animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress') || '0%';
        
        // Create an observer for each progress bar
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = progress;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

// Additional function for smooth scrolling to anchors
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for fixed headers
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Video background handling for hero section
function initVideoBackground() {
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // Autoplay video on desktop, replace with image on mobile
        if (window.innerWidth < 768) {
            const videoSrc = heroVideo.getAttribute('data-poster');
            if (videoSrc) {
                const img = document.createElement('img');
                img.src = videoSrc;
                img.classList.add('hero-video');
                heroVideo.parentNode.replaceChild(img, heroVideo);
            }
        } else {
            heroVideo.play();
        }
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// Adjust animations for mobile
function adjustAnimationsForMobile() {
    // Check if on mobile
    const isMobile = window.innerWidth < 768;
    
    // Adjustments for policy cards on mobile
    if (isMobile) {
        // Make animations faster on mobile
        document.documentElement.style.setProperty('--transition-medium', '0.3s');
        document.documentElement.style.setProperty('--transition-fast', '0.2s');
        
        // Reduce animation delays
        const policyCards = document.querySelectorAll('.policy-card');
        policyCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
        });
        
        // Handle video autoplay issues on mobile
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo && heroVideo.tagName === 'VIDEO') {
            // Replace video with poster image on mobile
            const posterUrl = heroVideo.getAttribute('poster');
            if (posterUrl) {
                const img = document.createElement('img');
                img.src = posterUrl;
                img.classList.add('hero-video');
                heroVideo.parentNode.replaceChild(img, heroVideo);
            }
        }
    }
}

// Handle viewport height issues on mobile
function fixMobileViewportHeight() {
    // Fix for mobile browsers' viewport height issues
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    
    // Apply the custom vh to elements
    const heroSection = document.querySelector('.lpi-hero');
    if (heroSection) {
        heroSection.style.height = 'calc(100vh - 70px)'; // Adjust if you have a fixed header
        heroSection.style.height = 'calc(var(--vh, 1vh) * 100 - 70px)';
    }
}

// Handle orientation changes
function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
        // Small timeout to allow the browser to complete the orientation change
        setTimeout(() => {
            fixMobileViewportHeight();
            adjustAnimationsForMobile();
        }, 200);
    });
}

// Add touch support detection
function addTouchSupport() {
    // Check if device supports touch
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouch) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback to buttons
        const allButtons = document.querySelectorAll('.action-button, .enroll-button, .primary-button, .secondary-button');
        allButtons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            button.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
    }
}

// Initialize all mobile-specific functions
function initMobileSupport() {
    initMobileMenu();
    adjustAnimationsForMobile();
    fixMobileViewportHeight();
    handleOrientationChange();
    addTouchSupport();
}

// Initialize all interactions
window.addEventListener('load', function() {
    initSmoothScroll();
    initVideoBackground();
    initMobileMenu();
});

// Listen for resize events to adjust responsive elements
window.addEventListener('resize', function() {
    const wasMobile = window.innerWidth < 768;
    const isMobile = window.innerWidth < 768;
    
    // Only run if there was a change between mobile/desktop
    if (wasMobile !== isMobile) {
        adjustAnimationsForMobile();
    }
});
