// animations.js - Carousel animations and mobile menu

document.addEventListener('DOMContentLoaded', function() {
    console.log('Animations initialized');
    
    // ===== ABOUT SPLIT CAROUSEL =====
    initSplitCarousel();
    
    // ===== SERVICES CAROUSEL =====
    initServicesCarousel();
    
    // ===== WHY US FEATURE CAROUSEL =====
    initFeatureCarousel();
    
    // ===== PROJECTS CAROUSEL =====
    initProjectsCarousel();
    
    // ===== MOBILE MENU =====
    initMobileMenu();
    
    // ===== LANGUAGE PICKER =====
    initLanguagePicker();
    
    // ===== SPLIT CAROUSEL FUNCTIONS =====
    function initSplitCarousel() {
        const splitSlides = document.querySelectorAll('.split-slide');
        const splitImages = document.querySelectorAll('.split-image img');
        const dots = document.querySelectorAll('.split-dots .dot');
        const prevBtn = document.querySelector('.split-prev');
        const nextBtn = document.querySelector('.split-next');
        
        if (!splitSlides.length) return;
        
        let currentIndex = 0;
        
        function updateSplitCarousel(index) {
            // Update slides
            splitSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
            
            // Update images
            splitImages.forEach((img, i) => {
                img.classList.remove('active');
                if (i === index) {
                    img.classList.add('active');
                }
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
            
            currentIndex = index;
        }
        
        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = (currentIndex - 1 + splitSlides.length) % splitSlides.length;
                updateSplitCarousel(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = (currentIndex + 1) % splitSlides.length;
                updateSplitCarousel(newIndex);
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => updateSplitCarousel(index));
        });
        
        // Initialize
        updateSplitCarousel(0);
    }
    
    // ===== SERVICES CAROUSEL FUNCTIONS =====
    function initServicesCarousel() {
        const servicesTrack = document.querySelector('.services-track');
        const serviceCards = document.querySelectorAll('.service-card');
        const prevBtn = document.querySelector('.services-prev');
        const nextBtn = document.querySelector('.services-next');
        
        if (!servicesTrack || !serviceCards.length) return;
        
        let currentPosition = 0;
        const cardWidth = serviceCards[0].offsetWidth + 30; // width + gap
        const visibleCards = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
        
        function updateServicesCarousel() {
            servicesTrack.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
        }
        
        function nextSlide() {
            const maxPosition = serviceCards.length - visibleCards;
            if (currentPosition < maxPosition) {
                currentPosition++;
                updateServicesCarousel();
            }
        }
        
        function prevSlide() {
            if (currentPosition > 0) {
                currentPosition--;
                updateServicesCarousel();
            }
        }
        
        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;
        
        servicesTrack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        servicesTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide();
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                prevSlide();
            }
        }
        
        // Update on resize
        window.addEventListener('resize', () => {
            const newVisibleCards = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
            if (currentPosition > serviceCards.length - newVisibleCards) {
                currentPosition = Math.max(0, serviceCards.length - newVisibleCards);
                updateServicesCarousel();
            }
        });
        
        // Initialize
        updateServicesCarousel();
    }
    
    // ===== FEATURE CAROUSEL FUNCTIONS =====
    function initFeatureCarousel() {
        const featureSlides = document.querySelectorAll('.feature-slide');
        const featureDots = document.querySelectorAll('.feature-dot');
        const prevBtn = document.querySelector('.feature-prev');
        const nextBtn = document.querySelector('.feature-next');
        
        if (!featureSlides.length) return;
        
        let currentIndex = 0;
        
        function updateFeatureCarousel(index) {
            // Update slides
            featureSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
            
            // Update dots
            featureDots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
            
            currentIndex = index;
        }
        
        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = (currentIndex - 1 + featureSlides.length) % featureSlides.length;
                updateFeatureCarousel(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = (currentIndex + 1) % featureSlides.length;
                updateFeatureCarousel(newIndex);
            });
        }
        
        featureDots.forEach((dot, index) => {
            dot.addEventListener('click', () => updateFeatureCarousel(index));
        });
        
        // Initialize
        updateFeatureCarousel(0);
    }
    
    // ===== PROJECTS CAROUSEL FUNCTIONS =====
    function initProjectsCarousel() {
        const projectItems = document.querySelectorAll('.project-item');
        const dots = document.querySelectorAll('.projects-dots .dot');
        const prevBtn = document.querySelector('.projects-prev');
        const nextBtn = document.querySelector('.projects-next');
        
        if (!projectItems.length) return;
        
        let currentIndex = 0;
        
        function updateProjectsCarousel(index) {
            // Update items
            projectItems.forEach((item, i) => {
                item.classList.remove('active');
                if (i === index) {
                    item.classList.add('active');
                }
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
            
            currentIndex = index;
        }
        
        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = (currentIndex - 1 + projectItems.length) % projectItems.length;
                updateProjectsCarousel(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = (currentIndex + 1) % projectItems.length;
                updateProjectsCarousel(newIndex);
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => updateProjectsCarousel(index));
        });
        
        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;
        
        const carousel = document.querySelector('.projects-carousel');
        if (carousel) {
            carousel.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            carousel.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleProjectsSwipe();
            }, { passive: true });
            
            function handleProjectsSwipe() {
                const swipeThreshold = 50;
                
                if (touchEndX < touchStartX - swipeThreshold) {
                    const newIndex = (currentIndex + 1) % projectItems.length;
                    updateProjectsCarousel(newIndex);
                }
                
                if (touchEndX > touchStartX + swipeThreshold) {
                    const newIndex = (currentIndex - 1 + projectItems.length) % projectItems.length;
                    updateProjectsCarousel(newIndex);
                }
            }
        }
        
        // Initialize
        updateProjectsCarousel(0);
    }
    
    // ===== MOBILE MENU FUNCTIONS =====
    function initMobileMenu() {
        const navToggle = document.querySelector('.nav__toggle');
        const mobileOverlay = document.querySelector('.mobile-menu-overlay');
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const closeSidebar = document.querySelector('.close-sidebar');
        
        if (!navToggle || !mobileOverlay || !mobileSidebar || !closeSidebar) return;
        
        function openMobileMenu() {
            mobileOverlay.classList.add('active');
            mobileSidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMobileMenu() {
            mobileOverlay.classList.remove('active');
            mobileSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Event listeners
        navToggle.addEventListener('click', openMobileMenu);
        closeSidebar.addEventListener('click', closeMobileMenu);
        mobileOverlay.addEventListener('click', closeMobileMenu);
        
        // Close menu on link click
        const sidebarLinks = document.querySelectorAll('.sidebar-links a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu on resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileSidebar.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    // ===== LANGUAGE PICKER FUNCTIONS =====
    function initLanguagePicker() {
        const languagePickers = document.querySelectorAll('.language-picker');
        
        languagePickers.forEach(picker => {
            const langCurrent = picker.querySelector('.lang-current');
            
            if (langCurrent) {
                langCurrent.addEventListener('click', function(e) {
                    e.stopPropagation();
                    picker.classList.toggle('active');
                });
            }
        });
        
        // Close all language pickers when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.language-picker')) {
                languagePickers.forEach(picker => {
                    picker.classList.remove('active');
                });
            }
        });
        
        // Handle language selection
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                const codeSpan = this.querySelector('.lang-code');
                const currentCodeSpan = this.closest('.language-picker').querySelector('.lang-current .lang-code');
                
                if (currentCodeSpan) {
                    currentCodeSpan.textContent = codeSpan.textContent;
                }
                
                // Close dropdown
                const picker = this.closest('.language-picker');
                if (picker) {
                    picker.classList.remove('active');
                }
                
                console.log(`Language changed to ${lang}`);
                // Note: Translation functionality removed as requested
                // Future implementation: Load translation JSON files here
            });
        });
    }
});