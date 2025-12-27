document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery initialized');
    
    const galleryModal = document.querySelector('.gallery-modal');
    const closeGalleryBtn = document.querySelector('.close-gallery');
    const galleryPrevBtn = document.querySelector('.gallery-prev');
    const galleryNextBtn = document.querySelector('.gallery-next');
    const galleryMainImg = document.querySelector('.gallery-main img');
    const galleryThumbnails = document.querySelector('.gallery-thumbnails');
    const galleryTitle = document.querySelector('.gallery-title');
    const currentImageSpan = document.querySelector('.current-image');
    const totalImagesSpan = document.querySelector('.total-images');
    
    let currentGalleryImages = [];
    let currentGalleryIndex = 0;
    let currentProjectTitle = '';
    
const projectAlbums = {
    1: {
        title: "Commercial Office Building",
        images: [
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1487956382158-bb926046304a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ]
    },
    2: {
        title: "Industrial Plant Upgrade",
        images: [
            "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1581094792935-5d4d8d6f8b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1581094791225-6c8f2a5b5e9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1581092580497-e0d4cb184827?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1581092580497-e0d4cb184827?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1581092581897-7d241eae3c3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1581091226033-d5c48150d1ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ]
    },
    3: {
        title: "Residential Complex",
        images: [
            "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1613665813259-c4f7d4c5b6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1613545325320-d89292e76b6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1613665813259-c4f7d4c5b6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ]
    }
};
    
    function openGallery(projectId) {
        const album = projectAlbums[projectId];
        if (!album) return;
        
        currentGalleryImages = album.images;
        currentGalleryIndex = 0;
        currentProjectTitle = album.title;
        
        galleryTitle.textContent = currentProjectTitle;
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
        galleryMainImg.alt = `${currentProjectTitle} - Image ${currentGalleryIndex + 1}`;
        
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
            thumbnail.alt = `${currentProjectTitle} - Thumbnail ${index + 1}`;
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
