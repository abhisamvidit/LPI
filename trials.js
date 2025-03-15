document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.querySelector('.navbar');
    const mobileMenuTrigger = document.querySelector('.mobile-menu-trigger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const overlay = document.querySelector('.overlay');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    const mobileSidedropToggles = document.querySelectorAll('.mobile-sidedrop-toggle');
    const languageOptions = document.querySelectorAll('[data-lang]');
    const languagesBtn = document.querySelector('.languages-btn');
    const mobileLanguageOptions = document.querySelectorAll('.mobile-language-option');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuTrigger.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    overlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Mobile dropdown toggles
    mobileDropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            const dropdownMenu = this.nextElementSibling;
            if (dropdownMenu.classList.contains('active')) {
                dropdownMenu.classList.remove('active');
            } else {
                // Close other open menus
                document.querySelectorAll('.mobile-dropdown-menu.active').forEach(function(menu) {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('active');
                        menu.previousElementSibling.classList.remove('active');
                    }
                });
                dropdownMenu.classList.add('active');
            }
        });
    });
    
    // Mobile side dropdown toggles
    mobileSidedropToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            const sidedropMenu = this.nextElementSibling;
            if (sidedropMenu.classList.contains('active')) {
                sidedropMenu.classList.remove('active');
            } else {
                // Close other open side menus
                document.querySelectorAll('.mobile-sidedrop-menu.active').forEach(function(menu) {
                    if (menu !== sidedropMenu) {
                        menu.classList.remove('active');
                        menu.previousElementSibling.classList.remove('active');
                    }
                });
                sidedropMenu.classList.add('active');
            }
        });
    });
    
    // Language switcher
    languageOptions.forEach(function(option) {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            languagesBtn.textContent = lang + ' ▼';
            
            // Close the dropdown
            document.querySelector('.languages-content').classList.remove('active');
        });
    });
    
    // Mobile language switcher
    mobileLanguageOptions.forEach(function(option) {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            mobileLanguageOptions.forEach(function(opt) {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            const lang = this.getAttribute('data-lang');
            languagesBtn.textContent = lang + ' ▼';
        });
    });
    
    // Create and animate particles
    function createParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        if (particlesContainer) {
            const particleCount = 20;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random size between 5px and 15px
                const size = Math.random() * 10 + 5;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                // Random position
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                particle.style.left = posX + '%';
                particle.style.top = posY + '%';
                
                // Random animation delay
                const delay = Math.random() * 5;
                particle.style.animationDelay = delay + 's';
                
                // Add particle animation
                particle.style.animation = 'particle-float 15s infinite ease-in-out';
                
                // Append to container
                particlesContainer.appendChild(particle);
            }
        }
    }
    
    // Add particle animation keyframes dynamically
    function addParticleAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particle-float {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0;
                }
                25% {
                    opacity: 0.5;
                }
                50% {
                    transform: translate(-20px, -20px) rotate(180deg);
                    opacity: 0.3;
                }
                75% {
                    opacity: 0.5;
                }
                100% {
                    transform: translate(0, 0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add hover effects for desktop dropdown menus
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => {
        const items = menu.querySelectorAll('.dropdown-item');
        items.forEach((item, index) => {
            item.style.animationDelay = (index * 0.05) + 's';
            item.classList.add('animate-fadeIn');
        });
    });
    
    // Initialize particle animations
    addParticleAnimations();
    createParticles();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Close mobile menu if open
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile donate button dropdown - using specific selectors from your HTML
    const mobileDonateBtn = document.querySelector('.mobile-donate-dropdown .mobile-donate-btn.dropdown-toggle');
    const mobileDonateDropdownMenu = document.querySelector('.mobile-donate-dropdown .mobile-donate-dropdown-menu');
    
    if (mobileDonateBtn && mobileDonateDropdownMenu) {
        // Add click event to the donate button
        mobileDonateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active classes
            this.classList.toggle('active');
            mobileDonateDropdownMenu.classList.toggle('active');
        });
        
        // Add click events to dropdown items to close the dropdown when clicked
        const donateDropdownItems = document.querySelectorAll('.mobile-donate-dropdown-menu .mobile-dropdown-item');
        donateDropdownItems.forEach(function(item) {
            item.addEventListener('click', function() {
                mobileDonateBtn.classList.remove('active');
                mobileDonateDropdownMenu.classList.remove('active');
            });
        });
        
        // Close the dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileDonateBtn.contains(e.target) && !mobileDonateDropdownMenu.contains(e.target)) {
                mobileDonateBtn.classList.remove('active');
                mobileDonateDropdownMenu.classList.remove('active');
            }
        });
    } else {
        console.error('Mobile donate button or dropdown menu not found');
    }
});
