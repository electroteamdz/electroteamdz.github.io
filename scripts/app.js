// app.js - Main application logic with enhanced features

document.addEventListener('DOMContentLoaded', function() {
    console.log('Electro Team Website Initialized');
    
    // ===== LOADING OVERLAY =====
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingOverlay.classList.add('hidden');
            console.log('Loading overlay hidden');
            // Announce to screen readers
            announceToScreenReader('Page loaded successfully');
        }, 1000);
    });
    
    // Fallback timeout
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

    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileSidebar.classList.add('active');
            mobileOverlay.classList.add('active');
            navToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            console.log('Mobile menu opened');
        });
    }

    function closeMobileMenu() {
        mobileSidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        console.log('Mobile menu closed');
        
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) {
                closeMobileMenu();
            }
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeMobileMenu);
        closeSidebar.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeMobileMenu();
            }
        });
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
                
                // Update URL hash without jumping
                history.replaceState(null, null, targetId);
                
                // Announce to screen readers
                const sectionName = targetElement.querySelector('h2, h1')?.textContent || targetId.replace('#', '');
                announceToScreenReader(`Navigated to ${sectionName} section`);
                
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
            announceToScreenReader('Scrolled to top of page');
            console.log('Scrolling to top');
        });
        
        scrollUpBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
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
            announceToScreenReader('Scrolled to bottom of page');
            console.log('Scrolling to bottom');
        });
        
        scrollDownBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    function toggleScrollButtons() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        
        if (scrollUpBtn) {
            if (scrollY > 200) {
                scrollUpBtn.style.opacity = '1';
                scrollUpBtn.style.visibility = 'visible';
                scrollUpBtn.style.pointerEvents = 'auto';
                scrollUpBtn.removeAttribute('tabindex');
            } else {
                scrollUpBtn.style.opacity = '0';
                scrollUpBtn.style.visibility = 'hidden';
                scrollUpBtn.style.pointerEvents = 'none';
                scrollUpBtn.setAttribute('tabindex', '-1');
            }
        }
        
        if (scrollDownBtn) {
            if (scrollY < documentHeight - windowHeight - 100) {
                scrollDownBtn.style.opacity = '1';
                scrollDownBtn.style.visibility = 'visible';
                scrollDownBtn.style.pointerEvents = 'auto';
                scrollDownBtn.removeAttribute('tabindex');
            } else {
                scrollDownBtn.style.opacity = '0';
                scrollDownBtn.style.visibility = 'hidden';
                scrollDownBtn.style.pointerEvents = 'none';
                scrollDownBtn.setAttribute('tabindex', '-1');
            }
        }
    }
    
    toggleScrollButtons();
    window.addEventListener('scroll', toggleScrollButtons);
    window.addEventListener('resize', toggleScrollButtons);

    // ===== ENHANCED FORM EMAIL FUNCTION =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
            });
            
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
        
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate all fields
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                announceToScreenReader('Please fix the errors in the form before submitting');
                return;
            }
            
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            
            // Create email content
            const subject = `New Contact Request from ${name} - Electro Team Website`;
            const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}

---
Sent from Electro Team Website
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
            `.trim();
            
            // Show confirmation with better accessibility
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            const originalDisabled = submitBtn.disabled;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span data-i18n="contact.sending">Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate processing delay for better UX
            setTimeout(() => {
                // Encode for mailto URL
                const encodedSubject = encodeURIComponent(subject);
                const encodedBody = encodeURIComponent(body);
                const mailtoUrl = `mailto:electroteamdz@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
                
                // Open email client in new tab
                const mailWindow = window.open(mailtoUrl, '_blank');
                
                // Show success feedback
                submitBtn.innerHTML = '<i class="fas fa-check"></i> <span data-i18n="contact.sent">Email Client Opened!</span>';
                
                // Announce to screen reader
                announceToScreenReader('Email client opened. Please complete sending your message.');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = originalDisabled;
                    
                    // Clear the form
                    this.reset();
                    
                    // Clear validation states
                    formInputs.forEach(input => {
                        input.classList.remove('error');
                        const errorMsg = input.nextElementSibling;
                        if (errorMsg && errorMsg.classList.contains('error-message')) {
                            errorMsg.style.display = 'none';
                        }
                    });
                    
                    
                }, 3000);
                
                // Log the submission
                console.log('Email form submitted:', { name, email, phone, message });
                
            }, 1000); // 1 second delay for better UX
        });
    }
    
    // Validation function
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        field.classList.remove('error');
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.style.display = 'none';
        }
        
        if (field.required && !value) {
            isValid = false;
            errorMessage = field.getAttribute('data-i18n-placeholder') ? 
                `${field.getAttribute('placeholder')} is required` : 
                'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (field.type === 'tel' && value) {
            const phoneRegex = /^(05|06|07)\d{8}$/;
            const cleanedPhone = value.replace(/\s/g, '');
            if (!phoneRegex.test(cleanedPhone)) {
                isValid = false;
                errorMessage = 'Please enter a valid Algerian phone number (05/06/07 followed by 8 digits)';
            }
        }
        
        if (!isValid) {
            field.classList.add('error');
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.style.display = 'block';
                errorElement.textContent = errorMessage;
                
                // Announce error to screen reader
                setTimeout(() => {
                    announceToScreenReader(errorMessage);
                }, 100);
            }
        }
        
        return isValid;
    }

    // ===== NAVBAR SCROLL EFFECTS =====
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    
    function updateNavbar() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
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
    
    updateNavbar();
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(updateNavbar);
    });

    // ===== CLICKABLE CONTACT INFO =====
    const clickableItems = document.querySelectorAll('.info-item.clickable');
    clickableItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only trigger if click is directly on the item, not on a link inside
            if (e.target.tagName !== 'A') {
                this.click();
            }
        });
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
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
        
        card.addEventListener('blur', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            card.style.outline = 'none';
        });
    });

    // ===== IMAGE LOADING OPTIMIZATION =====
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log(`Image failed to load: ${this.src}`);
            this.src = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
            this.alt = 'Fallback image - Electrical work';
        });
        
        img.addEventListener('load', function() {
            this.classList.add('loaded');
            const parent = this.parentElement;
            if (parent && parent.classList.contains('skeleton-image')) {
                parent.setAttribute('data-loaded', 'true');
            }
        });
    });

    // ===== VIDEO BACKGROUND HANDLING =====
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.muted = true;
        
        heroVideo.addEventListener('loadeddata', function() {
            console.log('Hero video loaded successfully');
        });
        
        heroVideo.addEventListener('error', function() {
            console.log('Hero video failed to load');
            const videoContainer = document.querySelector('.hero-video-container');
            if (videoContainer) {
                videoContainer.innerHTML = '<img src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Electrical background" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.4)">';
            }
        });
        
        // Play video when in viewport
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
        
        // Add video controls for accessibility
        heroVideo.setAttribute('title', 'Background video showing electrical installations');
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
            link.setAttribute('aria-current', 'false');
            const href = link.getAttribute('href');
            if (href && href.includes(current)) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
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
    
    sections.forEach(section => observer.observe(section));

    // ===== SCREEN READER ANNOUNCEMENT FUNCTION =====
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // ===== ENHANCED TIKTOK BUTTON HANDLING =====
    const tiktokBtn = document.querySelector('.tiktok-btn');
    if (tiktokBtn) {
        tiktokBtn.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening TikTok...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1000);
            
            announceToScreenReader('Opening TikTok in new window');
        });
    }

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        // Skip to content with 'S' key
        if (e.key === 'S' && e.ctrlKey) {
            e.preventDefault();
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.tabIndex = -1;
                announceToScreenReader('Skipped to main content');
            }
        }
        
        // Escape key closes modals
        if (e.key === 'Escape') {
            // Close gallery if open
            const galleryModal = document.querySelector('.gallery-modal');
            if (galleryModal && galleryModal.classList.contains('active')) {
                galleryModal.classList.remove('active');
                announceToScreenReader('Gallery closed');
            }
            
            // Close mobile menu if open
            if (mobileSidebar && mobileSidebar.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });

    // ===== ENHANCED ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('Global error caught:', e.error);
        // You could send this to an error tracking service here
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
    });

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

// Pause animations when page is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.body.classList.add('page-hidden');
    } else {
        document.body.classList.remove('page-hidden');
    }
});
