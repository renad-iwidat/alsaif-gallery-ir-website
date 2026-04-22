// Main Application Entry Point
class AlSaifGalleryApp {
    constructor() {
        this.initialized = false;
    }
    
    // Initialize the application
    async init() {
        if (this.initialized) return;
        
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            console.log('🚀 Initializing Al Saif Gallery App...');
            
            // Initialize core systems
            await this.initializeCore();
            
            // Initialize components
            await this.initializeComponents();
            
            // Initialize router
            await this.initializeRouter();
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            // Mark as initialized
            this.initialized = true;
            
            console.log('✅ Al Saif Gallery App initialized successfully');
            
            // Dispatch app ready event
            window.dispatchEvent(new CustomEvent('appReady'));
            
        } catch (error) {
            console.error('❌ Failed to initialize app:', error);
            this.handleInitializationError(error);
        }
    }
    
    // Initialize core systems
    async initializeCore() {
        console.log('📋 Initializing core systems...');
        
        // Initialize localization
        Localization.init();
        
        // Set initial page meta
        this.setInitialPageMeta();
        
        // Initialize responsive utilities
        this.initializeResponsive();
        
        console.log('✅ Core systems initialized');
    }
    
    // Initialize components
    async initializeComponents() {
        console.log('🧩 Initializing components...');
        
        // Initialize components in order
        TopBar.init();
        NavigationBar.init();
        Footer.init();
        
        console.log('✅ Components initialized');
    }
    
    // Initialize router
    async initializeRouter() {
        console.log('🛣️ Initializing router...');
        
        Router.init();
        
        console.log('✅ Router initialized');
    }
    
    // Setup global event listeners
    setupGlobalEvents() {
        console.log('🎧 Setting up global events...');
        
        // Handle window resize
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Handle language changes
        window.addEventListener('languageChanged', (e) => {
            this.handleLanguageChange(e.detail.language);
        });
        
        // Handle route changes
        window.addEventListener('routeChanged', (e) => {
            this.handleRouteChange(e.detail);
        });
        
        // Handle scroll events
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
        }, 100));
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
        
        // Handle online/offline status
        window.addEventListener('online', () => this.handleOnlineStatus(true));
        window.addEventListener('offline', () => this.handleOnlineStatus(false));
        
        // Handle unhandled errors
        window.addEventListener('error', (e) => {
            this.handleGlobalError(e);
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            this.handleUnhandledRejection(e);
        });
        
        console.log('✅ Global events setup complete');
    }
    
    // Set initial page meta
    setInitialPageMeta() {
        // Set default meta tags
        const metaTags = [
            { name: 'description', content: "Al Saif Gallery -- Saudi Arabia's dominant specialty retailer in household and kitchen appliances. 73 stores, SAR 758.8M revenue, approximately 88% proprietary brands. Tadawul-listed since 2022." },
            { name: 'keywords', content: 'Al Saif Gallery, Saudi Arabia, kitchen appliances, household essentials, Edison, Tornado, Robust, Rocky, Tadawul, 4192' },
            { name: 'author', content: 'Al Saif Gallery' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
            { property: 'og:title', content: "Al Saif Gallery | Saudi Arabia's Home & Kitchen Retail Leader" },
            { property: 'og:description', content: "Saudi Arabia's specialist in household essentials and kitchen appliances. 73 locations, proprietary brands, Tadawul-listed since 2022." },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: window.location.href },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: "Al Saif Gallery | Saudi Arabia's Home & Kitchen Retail Leader" },
            { name: 'twitter:description', content: "Saudi Arabia's specialist in household essentials and kitchen appliances." }
        ];
        
        metaTags.forEach(tag => {
            let element = document.querySelector(`meta[${tag.name ? 'name' : 'property'}="${tag.name || tag.property}"]`);
            if (!element) {
                element = document.createElement('meta');
                if (tag.name) element.name = tag.name;
                if (tag.property) element.property = tag.property;
                document.head.appendChild(element);
            }
            element.content = tag.content;
        });
    }
    
    // Initialize responsive utilities
    initializeResponsive() {
        // Set initial responsive classes
        this.updateResponsiveClasses();
        
        // Update CSS custom properties for responsive padding
        this.updateResponsiveProperties();
    }
    
    // Update responsive classes on body
    updateResponsiveClasses() {
        const breakpoint = Utils.responsive.getCurrentBreakpoint();
        
        // Remove existing breakpoint classes
        document.body.classList.remove('mobile', 'tablet', 'desktop', 'large-desktop');
        
        // Add current breakpoint class
        document.body.classList.add(breakpoint);
    }
    
    // Update CSS custom properties for responsive values
    updateResponsiveProperties() {
        const horizontalPadding = Utils.responsive.getHorizontalPadding();
        document.documentElement.style.setProperty('--current-horizontal-padding', `${horizontalPadding}px`);
    }
    
    // Handle window resize
    handleResize() {
        this.updateResponsiveClasses();
        this.updateResponsiveProperties();
        
        // Dispatch resize event for components
        window.dispatchEvent(new CustomEvent('appResize', {
            detail: {
                width: window.innerWidth,
                height: window.innerHeight,
                breakpoint: Utils.responsive.getCurrentBreakpoint()
            }
        }));
    }
    
    // Handle language change
    handleLanguageChange(language) {
        console.log(`🌐 Language changed to: ${language}`);
        
        // Update document direction and lang
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        
        // Update body classes
        document.body.classList.remove('ar', 'ltr');
        document.body.classList.add(language === 'ar' ? 'ar' : 'ltr');
        
        // Update page title if needed
        const currentPath = Router.getCurrentPath();
        const routeKey = Router.routes[currentPath];
        if (routeKey) {
            Router.updatePageMeta(routeKey);
        }
    }
    
    // Handle route change
    handleRouteChange(detail) {
        console.log(`🛣️ Route changed to: ${detail.path}${detail.fragment ? '#' + detail.fragment : ''}`);
        
        // Scroll to top on route change (unless there's a fragment)
        if (!detail.fragment) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Scroll to fragment after a delay
            setTimeout(() => {
                this.scrollToFragment(detail.fragment);
            }, 300);
        }
        
        // Update analytics (if implemented)
        this.trackPageView(detail.path, detail.fragment);
    }
    
    // Handle scroll events
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Add/remove scrolled class to body
        if (scrollY > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        
        // Dispatch scroll event for components
        window.dispatchEvent(new CustomEvent('appScroll', {
            detail: { scrollY }
        }));
    }
    
    // Handle visibility change
    handleVisibilityChange() {
        if (document.hidden) {
            console.log('📱 App hidden');
        } else {
            console.log('📱 App visible');
        }
    }
    
    // Handle online/offline status
    handleOnlineStatus(isOnline) {
        console.log(`🌐 App is ${isOnline ? 'online' : 'offline'}`);
        
        document.body.classList.toggle('offline', !isOnline);
        
        // Show notification (if implemented)
        if (!isOnline) {
            this.showOfflineNotification();
        }
    }
    
    // Handle global errors
    handleGlobalError(error) {
        console.error('🚨 Global error:', error);
        
        // Log error details
        const errorInfo = {
            message: error.message,
            filename: error.filename,
            lineno: error.lineno,
            colno: error.colno,
            stack: error.error?.stack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // Send to error tracking service (if implemented)
        this.trackError(errorInfo);
    }
    
    // Handle unhandled promise rejections
    handleUnhandledRejection(event) {
        console.error('🚨 Unhandled promise rejection:', event.reason);
        
        // Log rejection details
        const rejectionInfo = {
            reason: event.reason,
            promise: event.promise,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // Send to error tracking service (if implemented)
        this.trackError(rejectionInfo);
        
        // Prevent the default handling
        event.preventDefault();
    }
    
    // Handle initialization errors
    handleInitializationError(error) {
        console.error('💥 App initialization failed:', error);
        
        // Show fallback UI
        document.body.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; text-align: center; padding: 20px; font-family: Arial, sans-serif;">
                <h1 style="color: #C62030; margin-bottom: 16px;">Application Error</h1>
                <p style="color: #666; margin-bottom: 24px;">Sorry, the application failed to load properly.</p>
                <button onclick="window.location.reload()" style="background: #C62030; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer;">
                    Reload Page
                </button>
            </div>
        `;
    }
    
    // Scroll to fragment
    scrollToFragment(fragment) {
        const element = document.getElementById(fragment);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Show offline notification
    showOfflineNotification() {
        // Simple offline notification (can be enhanced)
        const notification = Utils.dom.create('div', 'offline-notification', 
            'You are currently offline. Some features may not be available.');
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f59e0b;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 10000;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
    
    // Track page view (placeholder for analytics)
    trackPageView(path, fragment) {
        // Implement analytics tracking here
        console.log(`📊 Page view: ${path}${fragment ? '#' + fragment : ''}`);
    }
    
    // Track error (placeholder for error tracking)
    trackError(errorInfo) {
        // Implement error tracking here
        console.log('📊 Error tracked:', errorInfo);
    }
    
    // Get app info
    getAppInfo() {
        return {
            name: CONFIG.APP_NAME,
            version: CONFIG.VERSION,
            initialized: this.initialized,
            language: Localization.currentLanguage,
            route: Router.getCurrentPath(),
            fragment: Router.getCurrentFragment(),
            breakpoint: Utils.responsive.getCurrentBreakpoint(),
            online: navigator.onLine
        };
    }
}

// Create global app instance
const app = new AlSaifGalleryApp();

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

// Export app instance for debugging
window.AlSaifGalleryApp = app;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = app;
}