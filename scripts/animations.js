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
// ===== SERVICES CAROUSEL FUNCTIONS - FIXED =====
// ===== SERVICES CAROUSEL FUNCTIONS - FIXED =====
function initServicesCarousel() {
    const servicesTrack = document.querySelector('.services-track');
    const serviceCards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.services-prev');
    const nextBtn = document.querySelector('.services-next');
    const servicesCarousel = document.querySelector('.services-carousel');
    
    if (!servicesTrack || !serviceCards.length) return;
    
    let currentSlide = 0;
    
    function getVisibleCards() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    function updateServicesCarousel() {
        const visibleCards = getVisibleCards();
        const totalSlides = Math.ceil(serviceCards.length / visibleCards);
        
        // Calculate the width of one slide
        const card = serviceCards[0];
        if (!card) return;
        
        const cardStyle = window.getComputedStyle(card);
        const cardWidth = card.offsetWidth;
        const marginLeft = parseFloat(cardStyle.marginLeft) || 0;
        const marginRight = parseFloat(cardStyle.marginRight) || 0;
        const gap = 18;
        
        const slideWidth = (cardWidth + marginLeft + marginRight + gap) * visibleCards;
        const translateX = -currentSlide * slideWidth;
        
        servicesTrack.style.transform = `translateX(${translateX}px)`;
        
        // Update arrow visibility
        if (prevBtn) {
            prevBtn.classList.toggle('hidden', currentSlide === 0);
        }
        
        if (nextBtn) {
            const isLastSlide = currentSlide >= totalSlides - 1 || serviceCards.length <= visibleCards;
            nextBtn.classList.toggle('hidden', isLastSlide);
        }
    }
    
    function nextSlide(e) {
        if (e) {
            e.stopPropagation(); // Prevent event bubbling
            e.preventDefault();
        }
        const visibleCards = getVisibleCards();
        const totalSlides = Math.ceil(serviceCards.length / visibleCards);
        
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateServicesCarousel();
        }
    }
    
    function prevSlide(e) {
        if (e) {
            e.stopPropagation(); // Prevent event bubbling
            e.preventDefault();
        }
        if (currentSlide > 0) {
            currentSlide--;
            updateServicesCarousel();
        }
    }
    
    // Event listeners with better handling
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
        prevBtn.addEventListener('touchstart', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        nextBtn.addEventListener('touchstart', nextSlide);
    }
    
    // Prevent card clicks from interfering with arrows
    if (servicesCarousel) {
        servicesCarousel.addEventListener('click', (e) => {
            if (e.target.closest('.services-prev') || e.target.closest('.services-next')) {
                e.stopPropagation();
            }
        });
    }
    
    // Resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newVisibleCards = getVisibleCards();
            const newTotalSlides = Math.ceil(serviceCards.length / newVisibleCards);
            
            // Adjust current slide if out of bounds
            if (currentSlide >= newTotalSlides) {
                currentSlide = Math.max(0, newTotalSlides - 1);
            }
            
            updateServicesCarousel();
        }, 150);
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
// ===== PROJECTS CAROUSEL FUNCTIONS =====
function initProjectsCarousel() {
    const projectItems = document.querySelectorAll('.project-item');
    const dots = document.querySelectorAll('.projects-dots .dot');
    const prevBtn = document.querySelector('.projects-prev');
    const nextBtn = document.querySelector('.projects-next');
    const projectsList = document.querySelector('.projects-list');
    
    if (!projectItems.length) return;
    
    let currentIndex = 0;
    const isMobile = window.innerWidth <= 768;
    
    function updateProjectsCarousel(index) {
        // Remove active class from all items
        projectItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current item
        projectItems[index].classList.add('active');
        
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
    
    // Touch support for mobile
    if (projectsList) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        projectsList.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        projectsList.addEventListener('touchend', e => {
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
    
    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const nowMobile = window.innerWidth <= 768;
            if (isMobile !== nowMobile) {
                // Re-initialize if mobile status changed
                location.reload(); // Or update logic accordingly
            }
        }, 250);
    });
    
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
