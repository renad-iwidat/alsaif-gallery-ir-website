// Configuration and Constants
const CONFIG = {
    // App Settings
    APP_NAME: 'Al Saif Gallery',
    VERSION: '2.1.5',
    CACHE_VERSION: Date.now(), // Auto-updates on each deployment
    
    // API Endpoints (if needed in future)
    API_BASE_URL: '',
    
    // Responsive Breakpoints
    BREAKPOINTS: {
        MOBILE: 600,
        TABLET: 900,
        DESKTOP: 1200,
        LARGE_DESKTOP: 1920
    },
    
    // Animation Durations
    ANIMATIONS: {
        FAST: 200,
        NORMAL: 300,
        SLOW: 600,
        STATS: 3500
    },
    
    // Local Storage Keys
    STORAGE_KEYS: {
        LANGUAGE: 'lang',
        THEME: 'theme',
        CACHE_VERSION: 'cache_version'
    },
    
    // Default Settings
    DEFAULTS: {
        LANGUAGE: 'ar',
        DIRECTION: 'rtl'
    },
    
    // External URLs
    URLS: {
        MAIN_WEBSITE: 'https://alsaifgallery.com/',
        EMAIL: 'ir@alsaifgallery.com',
        PHONE: '+966114064444'
    },
    
    // Company Info
    COMPANY: {
        NAME: 'Al Saif Gallery',
        TADAWUL_CODE: '4192',
        ESTABLISHED: '1993',
        STORES_COUNT: 73,
        REVENUE: 758.8,
        PROPRIETARY_REVENUE: 88,
        ECOMMERCE_GROWTH: 37
    },
    
    // Cache Busting Helper
    getCacheBustedUrl(url) {
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}v=${this.CACHE_VERSION}`;
    }
};

// Auto-clear cache if version changed
(function() {
    const storedVersion = localStorage.getItem(CONFIG.STORAGE_KEYS.CACHE_VERSION);
    const currentVersion = CONFIG.VERSION;
    
    if (storedVersion !== currentVersion) {
        // Clear all caches
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => caches.delete(name));
            });
        }
        
        // Update stored version
        localStorage.setItem(CONFIG.STORAGE_KEYS.CACHE_VERSION, currentVersion);
        
        // Force reload if not first visit
        if (storedVersion !== null) {
            console.log('New version detected, clearing cache...');
            window.location.reload(true);
        }
    }
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}