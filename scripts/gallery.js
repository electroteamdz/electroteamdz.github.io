document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery initialized');
    
    const galleryModal = document.querySelector('.gallery-modal');
    const galleryBackdrop = document.querySelector('.gallery-backdrop');
    const closeGalleryBtn = document.querySelector('.close-gallery');
    const galleryPrevBtn = document.querySelector('.gallery-prev');
    const galleryNextBtn = document.querySelector('.gallery-next');
    const galleryMainImg = document.querySelector('.gallery-main img');
    const galleryThumbnails = document.querySelector('.gallery-thumbnails');
    const currentImageSpan = document.querySelector('.current-image');
    const totalImagesSpan = document.querySelector('.total-images');
    
    let currentGalleryImages = [];
    let currentGalleryIndex = 0;
    
const projectAlbums = {
    1: {
        images: [
            "assets/projects/comercialBuilding/1.jpeg",
            "assets/projects/comercialBuilding/2.jpeg",
            "assets/projects/comercialBuilding/3.jpeg",
            "assets/projects/comercialBuilding/4.jpeg",
            "assets/projects/comercialBuilding/5.jpeg",
        ]
    },
    2: {
        images: [
            "assets/projects/coldStorageFacility/1.jpeg",
            "assets/projects/coldStorageFacility/2.jpeg",
            "assets/projects/coldStorageFacility/3.jpeg",
            "assets/projects/coldStorageFacility/4.jpeg",
            "assets/projects/coldStorageFacility/5.jpeg",
        ]
    },
    3: {
        images: [
            "assets/projects/ainTayaResidence/1.jpeg",
            "assets/projects/ainTayaResidence/2.jpeg",
            "assets/projects/ainTayaResidence/3.jpeg",
            "assets/projects/ainTayaResidence/4.jpeg",
        ]
    },
    4: {
        images: [
            "assets/projects/allianceAssurancesUpsMaintenance/1.jpeg",
            "assets/projects/allianceAssurancesUpsMaintenance/2.jpeg",
            "assets/projects/allianceAssurancesUpsMaintenance/3.jpeg",
            "assets/projects/allianceAssurancesUpsMaintenance/4.jpeg",
            "assets/projects/allianceAssurancesUpsMaintenance/5.jpeg",
        ]
    },
    5: {
        images: [
            "assets/projects/cemBoudouaou/main.jpeg",
            "assets/projects/cemBoudouaou/1.jpeg",
            "assets/projects/cemBoudouaou/2.jpeg",
            "assets/projects/cemBoudouaou/3.jpeg",
            "assets/projects/cemBoudouaou/4.jpeg",
            "assets/projects/cemBoudouaou/5.jpeg",
            "assets/projects/cemBoudouaou/6.jpeg",
            "assets/projects/cemBoudouaou/7.jpeg",
            "assets/projects/cemBoudouaou/8.jpeg",
        ]
    },
    6: {
        images: [
            "assets/projects/hamadiResidence/main.jpeg",
            "assets/projects/hamadiResidence/1.jpeg",
            "assets/projects/hamadiResidence/2.jpeg",
            "assets/projects/hamadiResidence/3.jpeg",
            "assets/projects/hamadiResidence/4.jpeg",
        ]
    },
    7: {
        images: [
            "assets/projects/rouibaSwimmingPool/main.jpeg",
            "assets/projects/rouibaSwimmingPool/1.jpeg",
            "assets/projects/rouibaSwimmingPool/2.jpeg",
            "assets/projects/rouibaSwimmingPool/3.jpeg",
            "assets/projects/rouibaSwimmingPool/4.jpeg",
            "assets/projects/rouibaSwimmingPool/5.jpeg",
            "assets/projects/rouibaSwimmingPool/6.jpeg",
        ]
    },
    8: {
        images: [
            "assets/projects/undergroundParking/main.jpeg",
            "assets/projects/undergroundParking/1.jpeg",
            "assets/projects/undergroundParking/2.jpeg",
            "assets/projects/undergroundParking/3.jpeg",
            "assets/projects/undergroundParking/4.jpeg",
        ]
    },
    9: {
        images: [
            "assets/projects/drariaApartment/main.jpeg",
            "assets/projects/drariaApartment/1.jpeg",
            "assets/projects/drariaApartment/2.jpeg",
            "assets/projects/drariaApartment/3.jpeg",
            "assets/projects/drariaApartment/4.jpeg",
            "assets/projects/drariaApartment/5.jpeg",
            "assets/projects/drariaApartment/6.jpeg",
            "assets/projects/drariaApartment/7.jpeg",
            "assets/projects/drariaApartment/8.jpeg",
        ]
    }
};
    
    function openGallery(projectId, startIndex) {
        const album = projectAlbums[projectId];
        if (!album) return;
        
        currentGalleryImages = album.images;
        const maxIndex = Math.max(currentGalleryImages.length - 1, 0);
        currentGalleryIndex = Math.min(Math.max(startIndex || 0, 0), maxIndex);
        
        renderThumbnails();
        updateGalleryImage();
        const single = currentGalleryImages.length < 2;
        if (galleryPrevBtn) galleryPrevBtn.hidden = single;
        if (galleryNextBtn) galleryNextBtn.hidden = single;
        
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (closeGalleryBtn) closeGalleryBtn.focus();
        
        console.log(`Gallery opened for project ${projectId}`);
    }
    
    function closeGallery() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
        
        console.log('Gallery closed');
    }
    
    function updateGalleryImage() {
        if (currentGalleryImages.length === 0) return;

        const nextSrc = currentGalleryImages[currentGalleryIndex];
        if (galleryMainImg.getAttribute('src') !== nextSrc) {
            galleryMainImg.classList.add('is-loading');
            galleryMainImg.onload = function() {
                galleryMainImg.classList.remove('is-loading');
            };
            galleryMainImg.onerror = function() {
                galleryMainImg.classList.remove('is-loading');
            };
            galleryMainImg.src = nextSrc;
            if (galleryMainImg.complete) galleryMainImg.classList.remove('is-loading');
        }
        galleryMainImg.alt = 'Project photo ' + (currentGalleryIndex + 1);
        currentImageSpan.textContent = currentGalleryIndex + 1;
        totalImagesSpan.textContent = currentGalleryImages.length;
        
        updateActiveThumbnail();
        
        console.log(`Gallery image updated to index ${currentGalleryIndex}`);
    }
    
    function renderThumbnails() {
        galleryThumbnails.innerHTML = '';
        
        currentGalleryImages.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image;
            thumbnail.alt = 'Photo ' + (index + 1);
            thumbnail.classList.add('gallery-thumbnail');
            thumbnail.setAttribute('role', 'listitem');
            if (index === currentGalleryIndex) {
                thumbnail.classList.add('active');
            }
            
            thumbnail.addEventListener('click', () => {
                currentGalleryIndex = index;
                updateGalleryImage();
            });
            
            galleryThumbnails.appendChild(thumbnail);
        });
    }
    
    function updateActiveThumbnail() {
        const thumbnails = document.querySelectorAll('.gallery-thumbnail');
        let activeThumb = null;
        thumbnails.forEach((thumb, index) => {
            const active = index === currentGalleryIndex;
            thumb.classList.toggle('active', active);
            if (active) activeThumb = thumb;
        });
        if (!activeThumb || !galleryThumbnails) return;
        const left = activeThumb.offsetLeft - (galleryThumbnails.clientWidth - activeThumb.offsetWidth) / 2;
        galleryThumbnails.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
    }
    
    function nextImage() {
        if (currentGalleryImages.length === 0) return;
        
        currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
        updateGalleryImage();
    }
    
    function prevImage() {
        if (currentGalleryImages.length === 0) return;
        
        currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        updateGalleryImage();
    }
    
    document.querySelectorAll('.view-album-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openGallery(projectId);
        });
    });
    
    document.querySelectorAll('.project-preview-img').forEach(img => {
        img.addEventListener('click', function() {
            const projectItem = this.closest('.project-item');
            const projectId = projectItem.getAttribute('data-project');
            const file = (this.getAttribute('src') || '').split('/').pop();
            const album = projectAlbums[projectId];
            let startIndex = 0;
            if (album && file) {
                const found = album.images.findIndex(path => path.split('/').pop() === file);
                if (found >= 0) startIndex = found;
            }
            openGallery(projectId, startIndex);
        });
    });
    
    if (closeGalleryBtn) {
        closeGalleryBtn.addEventListener('click', closeGallery);
    }
    
    if (galleryPrevBtn) {
        galleryPrevBtn.addEventListener('click', prevImage);
    }
    
    if (galleryNextBtn) {
        galleryNextBtn.addEventListener('click', nextImage);
    }
    
    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal || e.target === galleryBackdrop) {
            closeGallery();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (!galleryModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeGallery();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    galleryModal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    galleryModal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleGallerySwipe();
    }, { passive: true });
    
    function handleGallerySwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            nextImage();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            prevImage();
        }
    }
    
    console.log('Gallery functionality loaded');
});
