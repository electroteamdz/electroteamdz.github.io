// animations.js - Carousel animations WITHOUT any touch/swipe support

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
        
        if (!splitSlides.length) {
            console.log('No split slides found');
            return;
        }
        
        console.log('Split carousel initialized:', {
            slides: splitSlides.length,
            images: splitImages.length,
            dots: dots.length
        });
        
        let currentIndex = 0;
        
        function updateSplitCarousel(index) {
            // Validate index
            if (index < 0) index = 0;
            if (index >= splitSlides.length) index = splitSlides.length - 1;
            
            // Remove active from all slides
            splitSlides.forEach(slide => {
                slide.classList.remove('active');
                slide.hidden = true;
                slide.setAttribute('aria-hidden', 'true');
            });
            
            // Remove active from all images
            splitImages.forEach(img => {
                img.classList.remove('active');
                img.style.opacity = '0';
                img.style.transform = 'scale(1.1)';
            });
            
            // Add active to current slide
            splitSlides[index].classList.add('active');
            splitSlides[index].hidden = false;
            splitSlides[index].setAttribute('aria-hidden', 'false');
            
            // Add active to current image
            setTimeout(() => {
                splitImages[index].classList.add('active');
                splitImages[index].style.opacity = '1';
                splitImages[index].style.transform = 'scale(1)';
            }, 50);
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
                dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
            });
            
            currentIndex = index;
            console.log('Carousel updated to index:', index);
        }
        
        // Event listeners - ONLY BUTTON CLICKS
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const newIndex = (currentIndex - 1 + splitSlides.length) % splitSlides.length;
                console.log('Previous clicked, moving to index:', newIndex);
                updateSplitCarousel(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const newIndex = (currentIndex + 1) % splitSlides.length;
                console.log('Next clicked, moving to index:', newIndex);
                updateSplitCarousel(newIndex);
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Dot clicked, moving to index:', index);
                updateSplitCarousel(index);
            });
            
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    updateSplitCarousel(index);
                }
            });
        });
        
        // Initialize with first slide active
        updateSplitCarousel(0);
    }
    
    // ===== SERVICES CAROUSEL FUNCTIONS - NO TOUCH/SWIPE =====
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
            
            const cardWidth = card.offsetWidth;
            const gap = 20;
            const slideWidth = (cardWidth + gap) * visibleCards;
            
            // Use CSS transform for smooth animation
            const translateX = -currentSlide * slideWidth;
            servicesTrack.style.transform = `translateX(${translateX}px)`;
            
            // Update button states and aria labels
            if (prevBtn) {
                prevBtn.disabled = currentSlide === 0;
                prevBtn.classList.toggle('hidden', currentSlide === 0);
                prevBtn.setAttribute('aria-label', currentSlide === 0 ? 
                    'No previous services available' : 
                    `Previous services, currently viewing set ${currentSlide + 1} of ${totalSlides}`);
            }
            
            if (nextBtn) {
                const isLastSlide = currentSlide >= totalSlides - 1 || serviceCards.length <= visibleCards;
                nextBtn.disabled = isLastSlide;
                nextBtn.classList.toggle('hidden', isLastSlide);
                nextBtn.setAttribute('aria-label', isLastSlide ?
                    'No more services available' :
                    `Next services, currently viewing set ${currentSlide + 1} of ${totalSlides}`);
            }
        }
        
        function nextSlide(e) {
            if (e) {
                e.stopPropagation();
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
                e.stopPropagation();
                e.preventDefault();
            }
            if (currentSlide > 0) {
                currentSlide--;
                updateServicesCarousel();
            }
        }
        
        // Event listeners - ONLY BUTTON CLICKS, NO TOUCH/SWIPE
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
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
        
        if (!featureSlides.length) return;
        
        let currentIndex = 0;
        
        function updateFeatureCarousel(index) {
            // Update slides
            featureSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.hidden = i !== index;
                if (i === index) {
                    slide.classList.add('active');
                    slide.removeAttribute('hidden');
                }
            });
            
            // Update dots
            featureDots.forEach((dot, i) => {
                dot.classList.remove('active');
                dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
                dot.setAttribute('tabindex', i === index ? '0' : '-1');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
            
            currentIndex = index;
        }
        
        function nextFeature() {
            const newIndex = (currentIndex + 1) % featureSlides.length;
            updateFeatureCarousel(newIndex);
        }
        
        function prevFeature() {
            const newIndex = (currentIndex - 1 + featureSlides.length) % featureSlides.length;
            updateFeatureCarousel(newIndex);
        }
        
        // Event listeners - ONLY CLICKS
        featureDots.forEach((dot, index) => {
            dot.addEventListener('click', () => updateFeatureCarousel(index));
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    updateFeatureCarousel(index);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const newIndex = (index + 1) % featureDots.length;
                    updateFeatureCarousel(newIndex);
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const newIndex = (index - 1 + featureDots.length) % featureDots.length;
                    updateFeatureCarousel(newIndex);
                }
            });
        });
        
        // Initialize
        updateFeatureCarousel(0);
    }
    
    // ===== PROJECTS CAROUSEL FUNCTIONS - NO TOUCH/SWIPE =====
    function initProjectsCarousel() {
        const projectItems = document.querySelectorAll('.project-item');
        const dots = document.querySelectorAll('.projects-dots .dot');
        const prevBtn = document.querySelector('.projects-prev');
        const nextBtn = document.querySelector('.projects-next');
        const projectsCarousel = document.querySelector('.projects-carousel');
        
        if (!projectItems.length) return;
        
        let currentIndex = 0;
        
        function updateProjectsCarousel(index) {
            // Remove active class from all items
            projectItems.forEach(item => {
                item.classList.remove('active');
                item.hidden = true;
            });
            
            // Add active class to current item
            projectItems[index].classList.add('active');
            projectItems[index].hidden = false;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.remove('active');
                dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
            
            currentIndex = index;
            
            // Update button aria labels
            if (prevBtn) {
                prevBtn.setAttribute('aria-label', `Previous project, currently viewing project ${index + 1} of ${projectItems.length}`);
            }
            if (nextBtn) {
                nextBtn.setAttribute('aria-label', `Next project, currently viewing project ${index + 1} of ${projectItems.length}`);
            }
        }
        
        function nextProject() {
            const newIndex = (currentIndex + 1) % projectItems.length;
            updateProjectsCarousel(newIndex);
        }
        
        function prevProject() {
            const newIndex = (currentIndex - 1 + projectItems.length) % projectItems.length;
            updateProjectsCarousel(newIndex);
        }
        
        // Event listeners - ONLY BUTTON CLICKS, NO TOUCH/SWIPE
        if (prevBtn) {
            prevBtn.addEventListener('click', prevProject);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextProject);
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => updateProjectsCarousel(index));
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    updateProjectsCarousel(index);
                }
            });
        });
        
        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateProjectsCarousel(currentIndex);
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
            navToggle.setAttribute('aria-expanded', 'true');
            
        }
        
        function closeMobileMenu() {
            mobileOverlay.classList.remove('active');
            mobileSidebar.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
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
        
        // Keyboard navigation for mobile menu
        mobileSidebar.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
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
                    this.setAttribute('aria-expanded', picker.classList.contains('active'));
                });
                
                // Keyboard support
                langCurrent.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        picker.classList.toggle('active');
                        this.setAttribute('aria-expanded', picker.classList.contains('active'));
                    } else if (e.key === 'Escape' && picker.classList.contains('active')) {
                        picker.classList.remove('active');
                        this.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        });
        
        // Close all language pickers when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.language-picker')) {
                languagePickers.forEach(picker => {
                    picker.classList.remove('active');
                    const langCurrent = picker.querySelector('.lang-current');
                    if (langCurrent) langCurrent.setAttribute('aria-expanded', 'false');
                });
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                languagePickers.forEach(picker => {
                    picker.classList.remove('active');
                    const langCurrent = picker.querySelector('.lang-current');
                    if (langCurrent) langCurrent.setAttribute('aria-expanded', 'false');
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
                    const langCurrent = picker.querySelector('.lang-current');
                    if (langCurrent) langCurrent.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Keyboard support for language options
            option.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    console.log('All animations initialized WITHOUT touch/swipe support');
});
