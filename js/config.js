// Configuration and Constants
const CONFIG = {
    // App Settings
    APP_NAME: 'Al Saif Gallery',
    VERSION: '2.0.0',
    
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
        THEME: 'theme'
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
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}