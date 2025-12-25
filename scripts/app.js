// app.js - Main application logic

document.addEventListener('DOMContentLoaded', function() {
    console.log('Electro Team Website Initialized');
    
    // ===== LOADING OVERLAY =====
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Hide loading overlay when everything is loaded
    window.addEventListener('load', function() {
        // Ensure minimum loading time for better UX
        setTimeout(function() {
            loadingOverlay.classList.add('hidden');
            console.log('Loading overlay hidden');
        }, 1000);
    });
    
    // Fallback: Hide loading overlay after 3 seconds max
    setTimeout(function() {
        if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
            loadingOverlay.classList.add('hidden');
            console.log('Loading overlay hidden by timeout');
        }
    }, 3000);
    
    // ===== MOBILE NAVIGATION =====
    const navToggle = document.querySelector('.nav__toggle');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeSidebar = document.querySelector('.close-sidebar');

    // Open sidebar
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileSidebar.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Mobile menu opened');
        });
    }

    // Close sidebar
    function closeMobileMenu() {
        mobileSidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        console.log('Mobile menu closed');
    }

    // Close on overlay click
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Close on close button click
    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeMobileMenu);
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = 70;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileSidebar && mobileSidebar.classList.contains('active')) {
                    closeMobileMenu();
                }
                
                console.log(`Scrolling to ${targetId}`);
            }
        });
    });

    // ===== SCROLL BUTTONS =====
    const scrollUpBtn = document.querySelector('.scroll-up');
    const scrollDownBtn = document.querySelector('.scroll-down');
    
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log('Scrolling to top');
        });
    }
    
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
            console.log('Scrolling to bottom');
        });
    }
    
    // Show/hide scroll buttons
    function toggleScrollButtons() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        
        if (scrollUpBtn) {
            if (scrollY > 200) {
                scrollUpBtn.style.opacity = '1';
                scrollUpBtn.style.visibility = 'visible';
                scrollUpBtn.style.pointerEvents = 'auto';
            } else {
                scrollUpBtn.style.opacity = '0';
                scrollUpBtn.style.visibility = 'hidden';
                scrollUpBtn.style.pointerEvents = 'none';
            }
        }
        
        if (scrollDownBtn) {
            if (scrollY < documentHeight - windowHeight - 100) {
                scrollDownBtn.style.opacity = '1';
                scrollDownBtn.style.visibility = 'visible';
                scrollDownBtn.style.pointerEvents = 'auto';
            } else {
                scrollDownBtn.style.opacity = '0';
                scrollDownBtn.style.visibility = 'hidden';
                scrollDownBtn.style.pointerEvents = 'none';
            }
        }
    }
    
    toggleScrollButtons();
    window.addEventListener('scroll', toggleScrollButtons);
    window.addEventListener('resize', toggleScrollButtons);

    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous states
            const inputs = this.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.style.borderColor = '#e2e8f0';
            });
            
            // Validate
            let isValid = true;
            const requiredInputs = this.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ef4444';
                    isValid = false;
                }
            });
            
            // Email validation
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    emailInput.style.borderColor = '#ef4444';
                    isValid = false;
                }
            }
            
            // Phone validation (Algerian format)
            const phoneInput = this.querySelector('input[type="tel"]');
            if (phoneInput && phoneInput.value.trim()) {
                const phoneRegex = /^(05|06|07)\d{8}$/;
                if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
                    phoneInput.style.borderColor = '#ef4444';
                    isValid = false;
                }
            }
            
            if (isValid) {
                // Disable button and show loading
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success
                    alert('Thank you for your message! We will contact you within 24 hours.');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    console.log('Form submitted successfully');
                }, 1500);
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }

    // ===== NAVBAR SCROLL EFFECTS - FIXED =====
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    
    function updateNavbar() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // Fix: Make navbar background transparent on scroll
        if (scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide in footer
        if (footer) {
            const footerTop = footer.offsetTop;
            const windowBottom = scrollY + window.innerHeight;
            
            if (windowBottom > footerTop - 100) {
                nav.classList.add('hidden-in-footer');
            } else {
                nav.classList.remove('hidden-in-footer');
            }
        }
    }
    
    // Initial update
    updateNavbar();
    
    // Optimized scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(updateNavbar);
    });

    // ===== CLOSE MOBILE MENU ON RESIZE =====
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mobileSidebar && mobileSidebar.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });

    // ===== TEAM CARD HOVER EFFECTS =====
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // ===== IMAGE LOADING OPTIMIZATION =====
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        // Add error handling
        img.addEventListener('error', function() {
            console.log(`Image failed to load: ${this.src}`);
            // Set a placeholder image
            this.src = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        });
        
        // Add loaded class for fade-in effect
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });

    // ===== VIDEO BACKGROUND HANDLING =====
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Mute video by default for autoplay
        heroVideo.muted = true;
        
        // Handle video loading
        heroVideo.addEventListener('loadeddata', function() {
            console.log('Hero video loaded successfully');
        });
        
        heroVideo.addEventListener('error', function() {
            console.log('Hero video failed to load');
            // Show fallback image
            const videoContainer = document.querySelector('.hero-video-container');
            if (videoContainer) {
                videoContainer.innerHTML = '<img src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Electrical background" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.4)">';
            }
        });
        
        // Pause video when not visible to save resources
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(e => {
                        console.log('Video play prevented:', e);
                    });
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.5 });
        
        videoObserver.observe(heroVideo);
    }

    // ===== FIX VIEWPORT HEIGHT FOR MOBILE =====
    function fixViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    fixViewportHeight();
    window.addEventListener('resize', fixViewportHeight);
    window.addEventListener('orientationchange', fixViewportHeight);

    // ===== ACTIVE NAV LINK UPDATER =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-links a');
    
    function updateActiveNav() {
        const scrollY = window.pageYOffset + 100;
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(current)) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ===== INTERSECTION OBSERVER FOR FADE-IN =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
    });
    
    // Observe sections for lazy loading
    sections.forEach(section => observer.observe(section));

    // ===== EMERGENCY BANNER CLICK =====
    const emergencyBanner = document.querySelector('.emergency-banner a');
    if (emergencyBanner) {
        emergencyBanner.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            
            // Show confirmation
            if (confirm('Call emergency number: ' + phoneNumber + '?')) {
                window.location.href = this.getAttribute('href');
            }
        });
    }

    console.log('All JavaScript functionality initialized');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        if (document.hidden) {
            heroVideo.pause();
        } else {
            heroVideo.play().catch(e => {
                console.log('Video autoplay prevented:', e);
            });
        }
    }
});