// loadingUtils.js - Utility functions for managing loading states

export class LoadingManager {
  constructor() {
    this.isLoading = false;
    this.loadingElement = null;
    this.navLoader = null;
    this.init();
  }

  init() {
    // Initialize loading elements when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupElements();
      });
    } else {
      this.setupElements();
    }
  }

  setupElements() {
    this.loadingElement = document.getElementById('page-loader');
    this.navLoader = document.getElementById('nav-loader');
  }

  showPageLoader() {
    if (this.loadingElement) {
      this.loadingElement.style.display = 'flex';
      this.loadingElement.classList.remove('fade-out');
      this.isLoading = true;
      document.body.classList.add('page-loading');
    }
  }

  hidePageLoader() {
    if (this.loadingElement) {
      this.loadingElement.classList.add('fade-out');
      setTimeout(() => {
        this.loadingElement.style.display = 'none';
        this.isLoading = false;
        document.body.classList.remove('page-loading');
      }, 500);
    }
  }

  showNavLoader() {
    if (this.navLoader) {
      this.navLoader.classList.remove('hidden');
      this.navLoader.classList.add('slide-in');
    }
  }

  hideNavLoader() {
    if (this.navLoader) {
      this.navLoader.classList.add('hidden');
      this.navLoader.classList.remove('slide-in');
    }
  }

  // Preload resources for better user experience
  preloadResources(urls) {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      
      // Determine resource type
      if (url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
        link.as = 'image';
      } else if (url.match(/\.(css)$/i)) {
        link.as = 'style';
      } else if (url.match(/\.(js)$/i)) {
        link.as = 'script';
      } else {
        link.as = 'fetch';
        link.crossOrigin = 'anonymous';
      }
      
      link.href = url;
      document.head.appendChild(link);
    });
  }

  // Set up intersection observer for lazy loading
  setupLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const src = element.dataset.lazy;
            
            if (element.tagName === 'IMG') {
              element.src = src;
            } else if (element.tagName === 'IFRAME') {
              element.src = src;
            }
            
            element.removeAttribute('data-lazy');
            observer.unobserve(element);
          }
        });
      });
      
      lazyElements.forEach(element => observer.observe(element));
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyElements.forEach(element => {
        const src = element.dataset.lazy;
        if (element.tagName === 'IMG') {
          element.src = src;
        } else if (element.tagName === 'IFRAME') {
          element.src = src;
        }
        element.removeAttribute('data-lazy');
      });
    }
  }

  // Handle form submissions with loading states
  handleFormLoading(form, options = {}) {
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    const originalText = submitButton?.textContent || submitButton?.value;
    
    form.addEventListener('submit', (e) => {
      if (submitButton) {
        submitButton.disabled = true;
        if (submitButton.textContent !== undefined) {
          submitButton.textContent = options.loadingText || 'Loading...';
        } else {
          submitButton.value = options.loadingText || 'Loading...';
        }
      }
      
      // Show loading indicator if specified
      if (options.showLoader) {
        this.showNavLoader();
      }
    });
    
    // Reset button state (you might want to call this after form processing)
    return {
      reset: () => {
        if (submitButton) {
          submitButton.disabled = false;
          if (submitButton.textContent !== undefined) {
            submitButton.textContent = originalText;
          } else {
            submitButton.value = originalText;
          }
        }
        if (options.showLoader) {
          this.hideNavLoader();
        }
      }
    };
  }
}

// Create and export a singleton instance
export const loadingManager = new LoadingManager();

// Export utility functions for direct use
export const showPageLoader = () => loadingManager.showPageLoader();
export const hidePageLoader = () => loadingManager.hidePageLoader();
export const showNavLoader = () => loadingManager.showNavLoader();
export const hideNavLoader = () => loadingManager.hideNavLoader();
export const preloadResources = (urls) => loadingManager.preloadResources(urls);
export const setupLazyLoading = () => loadingManager.setupLazyLoading();