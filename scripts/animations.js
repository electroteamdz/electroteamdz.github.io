// animations.js - Carousel animations with proper mobile swipe support

document.addEventListener('DOMContentLoaded', function() {
    console.log('Animations initialized');
    
    // ===== SERVICES CAROUSEL =====
    initServicesCarousel();
    
    // ===== PROJECTS CAROUSEL =====
    initProjectsCarousel();
    
    // ===== MOBILE MENU =====
    initMobileMenu();
    
    // ===== LANGUAGE PICKER =====
    initLanguagePicker();
    
    // ===== SERVICES CAROUSEL FUNCTIONS =====
    function initServicesCarousel() {
        const servicesTrack = document.querySelector('.services-track');
        const serviceCards = document.querySelectorAll('.service-card');
        const prevBtn = document.querySelector('.services-prev');
        const nextBtn = document.querySelector('.services-next');
        const servicesCarousel = document.querySelector('.services-carousel');
        
        if (!servicesTrack || !serviceCards.length) {
            console.log('Services carousel elements not found');
            return;
        }
        
        let currentSlide = 0;
        let isTransitioning = false;
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartTime = 0;
        let isDragging = false;
        let currentTranslate = 0;
        let initialTranslate = 0;
        let animationId = 0;
        
        // Calculate slide width based on card width
        function getDesktopSlideWidth() {
            const card = serviceCards[0];
            if (!card) return 0;
            
            const cardWidth = card.offsetWidth;
            const gap = window.innerWidth <= 768 ? 20 : 24;
            return cardWidth*2+gap*2;
        }
        
        function getMobileSlideWidth() {
            const card = serviceCards[0];
            if (!card) return 0;
            
            const cardWidth = card.offsetWidth;
            const gap = window.innerWidth <= 768 ? 20 : 24;
            return cardWidth+gap;
        }

        function getSlideWidth() {
            const isMobile = window.innerWidth <= 768;
            return isMobile ? getMobileSlideWidth() : getDesktopSlideWidth();
        }

        function getTotalSlides() {
            const isMobile = window.innerWidth <= 768;
            return isMobile ? 4 : 2;
        }
        
        function updateServicesCarousel(direction) {
            if (isTransitioning) return;
            
            // Calculate new slide position
            const newSlide = currentSlide + direction;
            
            // Check bounds
            if (newSlide < 0 || newSlide >= getTotalSlides()) return;
            
            isTransitioning = true;
            
            // Get slide width
            const slideWidth = getSlideWidth();
            if (slideWidth === 0) return;
            
            console.log(`Moving from slide ${currentSlide} to ${newSlide}, width: ${slideWidth}`);
            
            // Update current slide
            currentSlide = newSlide;
            
            // Apply transform
            const translateX = -currentSlide * slideWidth;
            currentTranslate = translateX;
            servicesTrack.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            servicesTrack.style.transform = `translateX(${translateX}px)`;
            
            // Update button states
            updateButtonStates();
            
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
        
        function updateButtonStates() {
            if (prevBtn) {
                prevBtn.disabled = currentSlide === 0;
                prevBtn.classList.toggle('hidden', currentSlide === 0);
            }
            
            if (nextBtn) {
                const isLastSlide = currentSlide >= getTotalSlides() - 1;
                nextBtn.disabled = isLastSlide;
                nextBtn.classList.toggle('hidden', isLastSlide);
            }
        }
        
        function nextSlide(e) {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            updateServicesCarousel(1);
        }
        
        function prevSlide(e) {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            updateServicesCarousel(-1);
        }
        
        // Event listeners for buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Initialize button states
        updateButtonStates();
        
        // Mobile swipe support
        if (servicesCarousel) {
            const isMobile = () => window.innerWidth <= 768;
            
            // Touch start
            servicesCarousel.addEventListener('touchstart', (e) => {
                if (!isMobile()) return;
                
                touchStartX = e.touches[0].clientX;
                touchStartTime = Date.now();
                isDragging = true;
                initialTranslate = currentTranslate;
                
                // Disable transition during drag
                servicesTrack.style.transition = 'none';
                
                // Cancel any ongoing animation
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
            }, { passive: true });
            
            // Touch move
            servicesCarousel.addEventListener('touchmove', (e) => {
                if (!isMobile() || !isDragging) return;
                
                const currentX = e.touches[0].clientX;
                const diff = currentX - touchStartX;
                
                // Calculate new translate position
                let newTranslate = initialTranslate + diff;
                
                // Calculate boundaries
                const slideWidth = getSlideWidth();
                const maxTranslate = 0;
                const minTranslate = -(getTotalSlides() - 1) * slideWidth;
                
                // Apply resistance at boundaries
                if (newTranslate > maxTranslate) {
                    newTranslate = maxTranslate + (diff * 0.3);
                } else if (newTranslate < minTranslate) {
                    newTranslate = minTranslate + ((newTranslate - minTranslate) * 0.3);
                }
                
                currentTranslate = newTranslate;
                servicesTrack.style.transform = `translateX(${currentTranslate}px)`;
            }, { passive: true });
            
            // Touch end
            servicesCarousel.addEventListener('touchend', (e) => {
                if (!isMobile() || !isDragging) return;
                
                touchEndX = e.changedTouches[0].clientX;
                const touchEndTime = Date.now();
                const timeDiff = touchEndTime - touchStartTime;
                const swipeThreshold = 50;
                const speedThreshold = 300;
                const diff = touchStartX - touchEndX;
                
                isDragging = false;
                
                // Restore transition
                servicesTrack.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Determine if swipe was significant
                const isFastSwipe = timeDiff < speedThreshold && Math.abs(diff) > 30;
                const isLongSwipe = Math.abs(diff) > swipeThreshold;
                
                if (isFastSwipe || isLongSwipe) {
                    if (diff > 0) {
                        // Swipe left - next
                        nextSlide();
                    } else {
                        // Swipe right - previous
                        prevSlide();
                    }
                } else {
                    // Snap back to current position
                    const slideWidth = getSlideWidth();
                    const translateX = -currentSlide * slideWidth;
                    currentTranslate = translateX;
                    servicesTrack.style.transform = `translateX(${translateX}px)`;
                }
            }, { passive: true });
            
            // Touch cancel
            servicesCarousel.addEventListener('touchcancel', () => {
                if (!isMobile()) return;
                isDragging = false;
                servicesTrack.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                const slideWidth = getSlideWidth();
                const translateX = -currentSlide * slideWidth;
                servicesTrack.style.transform = `translateX(${translateX}px)`;
            }, { passive: true });
        }
        
        // Resize handling
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Recalculate position based on new dimensions
                const slideWidth = getSlideWidth();
                const translateX = -currentSlide * slideWidth;
                
                // Temporarily disable transition during resize
                servicesTrack.style.transition = 'none';
                servicesTrack.style.transform = `translateX(${translateX}px)`;
                currentTranslate = translateX;
                
                // Force reflow
                servicesTrack.offsetHeight;
                
                // Restore transition
                servicesTrack.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 150);
        });
    }
    
    // ===== PROJECTS CAROUSEL FUNCTIONS =====
    function initProjectsCarousel() {
        const projectsList = document.querySelector('.projects-list');
        const projectItems = document.querySelectorAll('.project-item');
        const dots = document.querySelectorAll('.projects-dots .dot');
        const prevBtn = document.querySelector('.projects-prev');
        const nextBtn = document.querySelector('.projects-next');
        const projectsCarousel = document.querySelector('.projects-carousel');
        
        if (!projectsList || !projectItems.length) {
            console.log('Projects carousel elements not found');
            return;
        }
        
        let currentIndex = 0;
        let isTransitioning = false;
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartTime = 0;
        let isDragging = false;
        let currentTranslate = 0;
        let initialTranslate = 0;
        
        function getItemWidth() {
            if (projectItems.length > 1) {
                const stride = projectItems[1].offsetLeft - projectItems[0].offsetLeft;
                if (stride > 0) return stride;
            }
            return projectItems[0] ? projectItems[0].offsetWidth : 0;
        }

        function moreLabel(expanded) {
            const pack = (typeof translations !== 'undefined' && translations[currentLang]) || {};
            if (expanded) return pack['projects.showLess'] || 'Show less';
            return pack['projects.showMore'] || 'Show more';
        }

        function syncCarouselHeight() {
            projectItems.forEach(item => { item.style.height = ''; });
            if (projectsCarousel) projectsCarousel.style.height = '';
        }

        function isMobileProjects() {
            return window.innerWidth <= 768;
        }

        function collapseDescription(desc) {
            if (!desc.classList.contains('is-expanded')) return;
            desc.classList.remove('is-expanded');
            desc.classList.add('is-clamped');
            const button = desc.nextElementSibling;
            if (button && button.classList.contains('project-more')) {
                button.textContent = moreLabel(false);
                button.setAttribute('aria-expanded', 'false');
            }
        }

        function updateMoreButtonLocks() {
            const open = isMobileProjects()
                ? document.querySelector('.project-description.is-expanded')
                : null;
            document.querySelectorAll('.project-more').forEach(btn => {
                const desc = btn.previousElementSibling;
                const locked = !!(open && desc && !desc.classList.contains('is-expanded'));
                btn.classList.toggle('is-locked', locked);
                btn.setAttribute('aria-disabled', locked ? 'true' : 'false');
            });
        }

        function collapseExpandedDescriptions() {
            if (!isMobileProjects()) return;
            document.querySelectorAll('.project-description.is-expanded').forEach(collapseDescription);
            updateMoreButtonLocks();
            syncCarouselHeight();
        }

        function expandedProjectLeftScreen() {
            if (!isMobileProjects()) return;
            const desc = document.querySelector('.project-description.is-expanded');
            if (!desc) return;
            const item = desc.closest('.project-item');
            if (!item) return;
            const rect = item.getBoundingClientRect();
            const gone = rect.bottom < 40 || rect.top > window.innerHeight - 40 || rect.right < 40 || rect.left > window.innerWidth - 40;
            if (gone) collapseExpandedDescriptions();
        }

        function setupProjectDescriptions() {
            document.querySelectorAll('.project-description').forEach(desc => {
                let button = desc.nextElementSibling;
                if (!button || !button.classList.contains('project-more')) {
                    button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'project-more';
                    button.setAttribute('aria-expanded', 'false');
                    desc.insertAdjacentElement('afterend', button);
                    button.addEventListener('click', (event) => {
                        event.stopPropagation();
                        if (isMobileProjects() && button.classList.contains('is-locked')) {
                            collapseExpandedDescriptions();
                            return;
                        }
                        const expanded = desc.classList.toggle('is-expanded');
                        desc.classList.toggle('is-clamped', !expanded);
                        button.textContent = moreLabel(expanded);
                        button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
                        updateMoreButtonLocks();
                        syncCarouselHeight();
                    });
                }

                const wasExpanded = desc.classList.contains('is-expanded');
                desc.classList.add('is-clamped');
                desc.classList.remove('is-expanded');
                const needsToggle = desc.scrollHeight > desc.clientHeight + 2;
                button.hidden = !needsToggle;
                if (!needsToggle) {
                    desc.classList.remove('is-clamped', 'is-expanded');
                } else if (wasExpanded) {
                    desc.classList.remove('is-clamped');
                    desc.classList.add('is-expanded');
                }
                button.textContent = moreLabel(desc.classList.contains('is-expanded'));
                button.setAttribute('aria-expanded', desc.classList.contains('is-expanded') ? 'true' : 'false');
            });
            updateMoreButtonLocks();
            syncCarouselHeight();
        }
        
        function updateProjectsCarousel(index) {
            if (isTransitioning) return;
            
            // Ensure index is within bounds
            if (index < 0) index = 0;
            if (index >= projectItems.length) index = projectItems.length - 1;
            
            // Don't update if index hasn't changed
            if (index === currentIndex) return;

            collapseExpandedDescriptions();
            
            isTransitioning = true;
            currentIndex = index;
            
            // Calculate transform
            const itemWidth = getItemWidth();
            if (itemWidth === 0) {
                isTransitioning = false;
                return;
            }
            
            const translateX = -itemWidth * index;
            currentTranslate = translateX;
            
            projectsList.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            projectsList.style.transform = `translateX(${translateX}px)`;
            
            // Update dots
            updateDots();
            
            // Update button states
            updateButtonStates();
            
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
        
        function updateDots() {
            dots.forEach((dot, i) => {
                dot.classList.remove('active');
                dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
                if (i === currentIndex) {
                    dot.classList.add('active');
                }
            });
        }
        
        function updateButtonStates() {
            if (prevBtn) {
                prevBtn.disabled = currentIndex === 0;
                prevBtn.classList.toggle('hidden', currentIndex === 0);
            }
            if (nextBtn) {
                nextBtn.disabled = currentIndex >= projectItems.length - 1;
                nextBtn.classList.toggle('hidden', currentIndex >= projectItems.length - 1);
            }
        }
        
        function nextProject() {
            updateProjectsCarousel(currentIndex + 1);
        }
        
        function prevProject() {
            updateProjectsCarousel(currentIndex - 1);
        }
        
        // Button event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prevProject();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextProject();
            });
        }
        
        // Dot event listeners
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => updateProjectsCarousel(index));
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    updateProjectsCarousel(index);
                }
            });
        });
        
        // Initialize
        updateDots();
        updateButtonStates();
        setupProjectDescriptions();
        projectItems.forEach(item => {
            item.querySelectorAll('img').forEach(img => {
                if (!img.complete) {
                    img.addEventListener('load', syncCarouselHeight, { once: true });
                }
            });
        });
        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', () => {
                requestAnimationFrame(setupProjectDescriptions);
            });
        });

        window.addEventListener('scroll', () => {
            expandedProjectLeftScreen();
        }, { passive: true });

        document.addEventListener('click', (event) => {
            if (!isMobileProjects()) return;
            const control = event.target.closest('button, a');
            if (!control || control.classList.contains('project-more')) return;
            collapseExpandedDescriptions();
        });
        
        // Mobile swipe support
        if (projectsCarousel) {
            const isMobile = () => window.innerWidth <= 768;
            
            projectsCarousel.addEventListener('touchstart', (e) => {
                if (!isMobile()) return;
                
                touchStartX = e.touches[0].clientX;
                touchStartTime = Date.now();
                isDragging = true;
                initialTranslate = currentTranslate;
                
                projectsList.style.transition = 'none';
            }, { passive: true });
            
            projectsCarousel.addEventListener('touchmove', (e) => {
                if (!isMobile() || !isDragging) return;
                
                const currentX = e.touches[0].clientX;
                const diff = currentX - touchStartX;
                
                let newTranslate = initialTranslate + diff;
                
                const itemWidth = getItemWidth();
                const maxTranslate = 0;
                const minTranslate = -(projectItems.length - 1) * itemWidth;
                
                if (newTranslate > maxTranslate) {
                    newTranslate = maxTranslate + (diff * 0.3);
                } else if (newTranslate < minTranslate) {
                    newTranslate = minTranslate + ((newTranslate - minTranslate) * 0.3);
                }
                
                currentTranslate = newTranslate;
                projectsList.style.transform = `translateX(${currentTranslate}px)`;
            }, { passive: true });
            
            projectsCarousel.addEventListener('touchend', (e) => {
                if (!isMobile() || !isDragging) return;
                
                touchEndX = e.changedTouches[0].clientX;
                const touchEndTime = Date.now();
                const timeDiff = touchEndTime - touchStartTime;
                const swipeThreshold = 50;
                const speedThreshold = 300;
                const diff = touchStartX - touchEndX;
                
                isDragging = false;
                
                projectsList.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                
                const isFastSwipe = timeDiff < speedThreshold && Math.abs(diff) > 30;
                const isLongSwipe = Math.abs(diff) > swipeThreshold;
                
                if (isFastSwipe || isLongSwipe) {
                    if (diff > 0) {
                        nextProject();
                    } else {
                        prevProject();
                    }
                } else {
                    const itemWidth = getItemWidth();
                    const translateX = -currentIndex * itemWidth;
                    projectsList.style.transform = `translateX(${translateX}px)`;
                }
            }, { passive: true });
            
            projectsCarousel.addEventListener('touchcancel', () => {
                if (!isMobile()) return;
                isDragging = false;
                projectsList.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                const itemWidth = getItemWidth();
                const translateX = -currentIndex * itemWidth;
                projectsList.style.transform = `translateX(${translateX}px)`;
            }, { passive: true });
        }
        
        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const itemWidth = getItemWidth();
                const translateX = -currentIndex * itemWidth;
                
                projectsList.style.transition = 'none';
                projectsList.style.transform = `translateX(${translateX}px)`;
                currentTranslate = translateX;
                
                projectsList.offsetHeight;
                projectsList.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                setupProjectDescriptions();
            }, 250);
        });
    }
    
    // ===== MOBILE MENU FUNCTIONS =====
    function initMobileMenu() {
        const navToggle = document.querySelector('.nav__toggle');
        const mobileOverlay = document.querySelector('.mobile-menu-overlay');
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const closeSidebar = document.querySelector('.close-sidebar');
        
        if (!navToggle || !mobileOverlay || !mobileSidebar || !closeSidebar) {
            console.log('Mobile menu elements not found');
            return;
        }
        
        function openMobileMenu() {
            mobileOverlay.classList.add('active');
            mobileSidebar.classList.add('active');
            navToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
        
        function closeMobileMenu() {
            mobileOverlay.classList.remove('active');
            mobileSidebar.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Restore scrolling
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
        
        // Keyboard navigation
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
        
        if (!languagePickers.length) {
            console.log('Language picker elements not found');
            return;
        }
        
        // Close all pickers function
        function closeAllPickers(except = null) {
            languagePickers.forEach(picker => {
                if (picker !== except) {
                    picker.classList.remove('active');
                    const langCurrent = picker.querySelector('.lang-current');
                    if (langCurrent) langCurrent.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        languagePickers.forEach(picker => {
            const langCurrent = picker.querySelector('.lang-current');
            const langOptions = picker.querySelectorAll('.lang-option');
            
            if (langCurrent) {
                langCurrent.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const isActive = picker.classList.contains('active');
                    closeAllPickers(isActive ? null : picker);
                    picker.classList.toggle('active', !isActive);
                    this.setAttribute('aria-expanded', !isActive);
                });
                
                // Keyboard support for current language
                langCurrent.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const isActive = picker.classList.contains('active');
                        closeAllPickers(isActive ? null : picker);
                        picker.classList.toggle('active', !isActive);
                        this.setAttribute('aria-expanded', !isActive);
                    } else if (e.key === 'Escape' && picker.classList.contains('active')) {
                        picker.classList.remove('active');
                        this.setAttribute('aria-expanded', 'false');
                        closeAllPickers();
                    }
                });
            }
            
            // Handle language selection
            langOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const codeSpan = this.querySelector('.lang-code');
                    const currentCodeSpan = this.closest('.language-picker').querySelector('.lang-current .lang-code');
                    
                    if (currentCodeSpan && codeSpan) {
                        currentCodeSpan.textContent = codeSpan.textContent;
                    }
                    
                    // Close dropdown
                    const picker = this.closest('.language-picker');
                    if (picker) {
                        picker.classList.remove('active');
                        const langCurrent = picker.querySelector('.lang-current');
                        if (langCurrent) langCurrent.setAttribute('aria-expanded', 'false');
                    }
                    
                    closeAllPickers();
                });
                
                // Keyboard support for options
                option.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.language-picker')) {
                closeAllPickers();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllPickers();
            }
        });
    }
    
    console.log('All animations initialized with proper mobile swipe support');
});
