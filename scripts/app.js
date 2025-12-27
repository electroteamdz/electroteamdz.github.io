// app.js - Main application logic

document.addEventListener('DOMContentLoaded', function() {
    console.log('Electro Team Website Initialized');
    
    // ===== LOADING OVERLAY =====
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingOverlay.classList.add('hidden');
            console.log('Loading overlay hidden');
        }, 1000);
    });
    
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
            document.body.style.overflow = 'hidden';
            console.log('Mobile menu opened');
        });
    }

    function closeMobileMenu() {
        mobileSidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
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

    // ===== FORM EMAIL FUNCTION =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            
            // Reset styles
            const inputs = this.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.style.borderColor = '#e2e8f0';
            });
            
            // Validation
            let isValid = true;
            
            if (!name) {
                document.getElementById('contactName').style.borderColor = '#ef4444';
                isValid = false;
            }
            
            if (!email) {
                document.getElementById('contactEmail').style.borderColor = '#ef4444';
                isValid = false;
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    document.getElementById('contactEmail').style.borderColor = '#ef4444';
                    isValid = false;
                }
            }
            
            if (!phone) {
                document.getElementById('contactPhone').style.borderColor = '#ef4444';
                isValid = false;
            } else {
                const phoneRegex = /^(05|06|07)\d{8}$/;
                if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                    document.getElementById('contactPhone').style.borderColor = '#ef4444';
                    isValid = false;
                }
            }
            
            if (!message) {
                document.getElementById('contactMessage').style.borderColor = '#ef4444';
                isValid = false;
            }
            
            if (!isValid) {
                alert('Please fill in all required fields correctly.');
                return;
            }
            
            // Create email content
            const subject = `New Contact Request from ${name}`;
            const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}

---
Sent from Electro Team Website
            `.trim();
            
            // Ask for confirmation
            const confirmation = confirm(
                'Do you want to open your email client to send this message?\n\n' +
                'Note: You need to have an email client configured on your device.'
            );
            
            if (!confirmation) return;
            
            // Encode for mailto URL
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(body);
            const mailtoUrl = `mailto:electroteamdz@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
            
            // Open email client in new tab
            window.open(mailtoUrl, '_blank');
            
            // Show success feedback
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Email Client Opened!';
            submitBtn.disabled = true;
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Clear the form
                this.reset();
            }, 3000);
            
            console.log('Email form submitted:', { name, email, phone, message });
        });
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
        img.addEventListener('error', function() {
            console.log(`Image failed to load: ${this.src}`);
            this.src = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        });
        
        img.addEventListener('load', function() {
            this.classList.add('loaded');
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
    
    sections.forEach(section => observer.observe(section));

    // ===== EMERGENCY BANNER CLICK =====
    const emergencyBanner = document.querySelector('.emergency-banner a');
    if (emergencyBanner) {
        emergencyBanner.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            
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
