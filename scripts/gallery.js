document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery initialized');
    
    const galleryModal = document.querySelector('.gallery-modal');
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
    }
};
    
    function openGallery(projectId) {
        const album = projectAlbums[projectId];
        if (!album) return;
        
        currentGalleryImages = album.images;
        currentGalleryIndex = 0;
        
        updateGalleryImage();
        renderThumbnails();
        
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log(`Gallery opened for project ${projectId}`);
    }
    
    function closeGallery() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
        
        console.log('Gallery closed');
    }
    
    function updateGalleryImage() {
        if (currentGalleryImages.length === 0) return;
        
        galleryMainImg.src = currentGalleryImages[currentGalleryIndex];        
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
            thumbnail.classList.add('gallery-thumbnail');
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
        thumbnails.forEach((thumb, index) => {
            thumb.classList.remove('active');
            if (index === currentGalleryIndex) {
                thumb.classList.add('active');
            }
        });
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
            openGallery(projectId);
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
        if (e.target === galleryModal) {
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