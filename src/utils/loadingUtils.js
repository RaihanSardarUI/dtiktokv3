/**
 * Loading utilities for DTikTok website
 * Handles page loading states and transitions
 */

// Show page loader
export function showLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.display = 'flex';
        loader.classList.remove('fade-out');
    }
}

// Hide page loader with fade effect
export function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// Initialize loading functionality (enhanced version)
export function initializeLoader() {
    // Show loader immediately
    showLoader();

    // Note: The PageLoader component now handles its own hiding logic
    // with ad loading detection, minimum time, and progress tracking
    // This function only ensures the loader is visible initially
}

// Handle navigation loading
export function handleNavigationLoading() {
    // Show loader on navigation
    window.addEventListener('beforeunload', showLoader);

    // Handle back/forward navigation
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            hideLoader();
        }
    });
}

// Preload critical resources
export function preloadResources() {
    const criticalImages = [
        '/optimized/DTikTok-96.webp',
        '/optimized/DTikTok-192.webp',
        '/optimized/bg/DTikTok-BG-md.webp'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize all loading functionality
export function initializeLoadingSystem() {
    initializeLoader();
    handleNavigationLoading();
    preloadResources();
}