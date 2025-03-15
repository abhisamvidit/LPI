document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll
    const sections = document.querySelectorAll('.manifesto-section');
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let scrollDots = [];
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    // Create scroll indicator dots if the element exists
    if (scrollIndicator) {
        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.classList.add('scroll-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                section.scrollIntoView({ behavior: 'smooth' });
            });
            
            scrollIndicator.appendChild(dot);
            scrollDots.push(dot);
        });
    }
    
    // Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add in-view class to visible sections
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Update active dot in scroll indicator
                if (scrollDots.length > 0) {
                    const index = Array.from(sections).indexOf(entry.target);
                    scrollDots.forEach(dot => dot.classList.remove('active'));
                    if (scrollDots[index]) scrollDots[index].classList.add('active');
                }
            }
        });
    }, { threshold: 0.2 });
    
    // Intersection Observer for animated elements
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                elementObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Add observers to sections and animated elements
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    animatedElements.forEach(element => {
        elementObserver.observe(element);
    });
    
    // Parallax effect for elements with parallax class
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    function handleParallax() {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const parentElement = element.parentElement;
            const parentOffset = parentElement.offsetTop;
            const distance = scrollPosition - parentOffset;
            const speed = 0.5; // Adjust speed as needed
            
            element.style.transform = `translateY(${distance * speed}px)`;
        });
    }
    
    // Header scroll behavior
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Handle parallax
        handleParallax();
        
        // Header hide/show on scroll
        if (header) {
            if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                // Scrolling down
                header.classList.add('header-scrolled');
                header.classList.remove('header-visible');
            } else {
                // Scrolling up
                header.classList.remove('header-scrolled');
                header.classList.add('header-visible');
            }
        }
        
        // Back to top button visibility
        if (backToTopButton) {
            if (scrollTop > window.innerHeight / 2) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Register scroll handler
    window.addEventListener('scroll', handleScroll);
    
    // Back to top functionality
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Ripple effect for buttons with ripple class
    const rippleButtons = document.querySelectorAll('.ripple');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Initialize manual animations for hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Create and append back to top button if it doesn't exist
    if (!backToTopButton) {
        const newBackToTop = document.createElement('a');
        newBackToTop.href = '#';
        newBackToTop.classList.add('back-to-top');
        newBackToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        
        newBackToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.body.appendChild(newBackToTop);
        
        // Update back to top reference
        backToTopButton = newBackToTop;
    }
});
