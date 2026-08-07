(function() {
    // ==================== DOM Elements ====================
    const navbar = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');
    const backToTopBtn = document.getElementById('back-to-top');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const galleryGrid = document.getElementById('gallery-grid');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const selectedPackageIndicator = document.getElementById('selected-package-indicator');
    const selectedPackageName = document.getElementById('selected-package-name');
    const currentYearSpan = document.getElementById('current-year');

    // ==================== State ====================
    let isMobileMenuOpen = false;
    let currentLightboxIndex = -1;
    let currentGalleryItems = [];

    // ==================== Set Current Year ====================
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // ==================== Update Gallery Items ====================
    function updateVisibleGalleryItems() {
        const allItems = galleryGrid.querySelectorAll('.gallery-item');
        currentGalleryItems = Array.from(allItems).filter(item => item.style.display !== 'none');
    }

    // ==================== Mobile Menu ====================
    function openMobileMenu() {
        isMobileMenuOpen = true;
        mobileMenu.classList.add('open');
        mobileBackdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        bar1.style.transform = 'rotate(45deg) translate(5px, 5px)';
        bar2.style.opacity = '0';
        bar3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
    }

    function closeMobileMenu() {
        isMobileMenuOpen = false;
        mobileMenu.classList.remove('open');
        mobileBackdrop.classList.add('hidden');
        document.body.style.overflow = '';
        bar1.style.transform = 'rotate(0) translate(0, 0)';
        bar2.style.opacity = '1';
        bar3.style.transform = 'rotate(0) translate(0, 0)';
    }

    hamburgerBtn.addEventListener('click', () => {
        isMobileMenuOpen ? closeMobileMenu() : openMobileMenu();
    });
    mobileBackdrop.addEventListener('click', closeMobileMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    // Escape key to close menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMobileMenuOpen) closeMobileMenu();
    });

    // ==================== Navbar Scroll ====================
    window.addEventListener('scroll', () => {
        // Navbar shadow
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Back to top button
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    // ==================== Back to Top ====================
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== Gallery Filtering ====================
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filterValue = tab.getAttribute('data-filter');
            const allItems = galleryGrid.querySelectorAll('.gallery-item');
            
            allItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = '';
                    item.style.opacity = '0';
                    requestAnimationFrame(() => {
                        item.style.transition = 'opacity 0.4s ease';
                        item.style.opacity = '1';
                    });
                } else {
                    item.style.display = 'none';
                }
            });
            
            setTimeout(updateVisibleGalleryItems, 400);
        });
    });

    // ==================== Lightbox ====================
    function openLightbox(index) {
        updateVisibleGalleryItems();
        if (currentGalleryItems.length === 0) return;
        currentLightboxIndex = Math.max(0, Math.min(index, currentGalleryItems.length - 1));
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        currentLightboxIndex = -1;
    }

    function updateLightboxContent() {
        if (currentLightboxIndex < 0 || currentGalleryItems.length === 0) return;
        const item = currentGalleryItems[currentLightboxIndex];
        lightboxImg.src = item.getAttribute('data-full-src');
        lightboxCaption.textContent = item.getAttribute('data-caption') || '';
        
        if (currentGalleryItems.length <= 1) {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        } else {
            lightboxPrev.style.display = 'flex';
            lightboxNext.style.display = 'flex';
        }
    }

    function navigateLightbox(direction) {
        if (currentGalleryItems.length === 0) return;
        currentLightboxIndex = (currentLightboxIndex + direction + currentGalleryItems.length) % currentGalleryItems.length;
        updateLightboxContent();
    }

    galleryGrid.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (!galleryItem) return;
        updateVisibleGalleryItems();
        const index = currentGalleryItems.indexOf(galleryItem);
        if (index !== -1) openLightbox(index);
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // ==================== Package Selection ====================
    window.selectPackage = function(packageName) {
        selectedPackageName.textContent = packageName;
        selectedPackageIndicator.classList.remove('hidden');
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    };

    // ==================== Scroll Reveal ====================
    // Scroll reveal
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // أضف تأخير بسيط عشان الحركة تبقى سلسة
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 100);
            observer.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px' // تأخير التفعيل شوية
});
revealElements.forEach(el => observer.observe(el));

    // ==================== Init ====================
    updateVisibleGalleryItems();
    
    console.log('✅ Main script loaded successfully!');
})();