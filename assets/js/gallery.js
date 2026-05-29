/* ========================================
   Gallery — GLightbox Initialization
   ======================================== */

const Gallery = (() => {
    const init = () => {
        // Check if GLightbox is available
        if (typeof GLightbox === 'undefined') {
            console.warn('GLightbox not loaded');
            return;
        }

        // Initialize GLightbox
        const lightbox = GLightbox({
            selector: '[data-gallery]',
            touchNavigation: true,
            loop: true,
            closeButton: true,
            skin: 'clean',
            autoplayVideos: false,
            descPosition: 'bottom',
            zoomable: false,
        });

        // Log initialization for debugging
        console.log('Gallery initialized with GLightbox');
    };

    // Public API
    return {
        init: init,
    };
})();

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    Gallery.init();
});
