// Router System
const Router = {
    // Current route state
    currentRoute: '/',
    currentFragment: null,
    
    // Route definitions
    routes: {
        '/': 'home',
        '/about-us': 'about',
        '/strategy-operations': 'strategy',
        '/investors-governance': 'investors',
        '/news-careers': 'news',
        '/documents-library': 'documents',
        '/whistleblowing': 'whistleblowing',
        '/contact': 'contact',
        '/brands': 'brands'
    },
    
    // Initialize router
    init() {
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            this.handleRoute(window.location.pathname, e.state?.fragment);
        });
        
        // Handle initial route
        const initialPath = window.location.pathname;
        const initialFragment = window.location.hash.replace('#', '');
        this.handleRoute(initialPath, initialFragment || null);
    },
    
    // Navigate to a route
    navigate(path, fragment = null) {
        // Update browser history
        const url = fragment ? `${path}#${fragment}` : path;
        window.history.pushState({ fragment }, '', url);
        
        // Handle the route
        this.handleRoute(path, fragment);
    },
    
    // Handle route change
    handleRoute(path, fragment = null) {
        // Normalize path
        path = path === '' ? '/' : path;
        
        // Update current route
        this.currentRoute = path;
        this.currentFragment = fragment;
        
        // Get route handler
        const routeKey = this.routes[path];
        if (!routeKey) {
            this.handle404();
            return;
        }
        
        // Load the page
        this.loadPage(routeKey, fragment);
        
        // Dispatch route change event
        window.dispatchEvent(new CustomEvent('routeChanged', {
            detail: { path, fragment, routeKey }
        }));
        
        // Update page title and meta
        this.updatePageMeta(routeKey);
    },
    
    // Load page content
    async loadPage(routeKey, fragment = null) {
        const mainContent = Utils.dom.get('main-content');
        if (!mainContent) return;
        
        // Show loading state
        mainContent.innerHTML = '<div class="loading-container" style="display: flex; justify-content: center; align-items: center; min-height: 400px;"><div class="spinner"></div></div>';
        
        try {
            // Load page content based on route
            let pageContent = '';
            
            switch (routeKey) {
                case 'home':
                    pageContent = await this.loadHomePage();
                    break;
                case 'about':
                    pageContent = await this.loadAboutPage();
                    break;
                case 'strategy':
                    pageContent = await this.loadStrategyPage();
                    break;
                case 'investors':
                    pageContent = await this.loadInvestorsPage();
                    break;
                case 'news':
                    pageContent = await this.loadNewsPage();
                    break;
                case 'brands':
                    // Redirect to brands.html page
                    window.location.href = '/brands.html';
                    return;
                default:
                    pageContent = this.loadPlaceholderPage(routeKey);
            }
            
            // Update content with fade effect
            mainContent.style.opacity = '0';
            setTimeout(() => {
                mainContent.innerHTML = pageContent;
                mainContent.style.opacity = '1';
                
                // Initialize page-specific functionality
                this.initializePage(routeKey, fragment);
            }, 150);
            
        } catch (error) {
            console.error('Error loading page:', error);
            mainContent.innerHTML = '<div class="error-container">Error loading page</div>';
        }
    },
    
    // Load home page
    async loadHomePage() {
        return `
            <div class="home-page">
                <!-- Hero Section -->
                <section class="hero-section">
                    <div class="hero-overlay"></div>
                    <div class="hero-content section-padding">
                        <h1 class="hero-title">${Localization.t('heroTitle').replace('\\n', '<br>')}</h1>
                        <p class="hero-subtitle">${Localization.t('heroSubtitle')}</p>
                        <p class="hero-description">${Localization.t('heroDesc1')}</p>
                        <p class="hero-description">${Localization.t('heroDesc2')}</p>
                        <div class="hero-buttons">
                            <a href="/about-us" class="hero-btn primary">${Localization.t('heroExploreStory')}</a>
                            <a href="/investors-governance" class="hero-btn secondary">${Localization.t('heroInvestorRelations')}</a>
                        </div>
                    </div>
                </section>
                
                <!-- Stats Section -->
                <section class="stats-section" id="stats-section">
                    <div class="section-padding">
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-number" data-target="73" data-suffix="">${CONFIG.COMPANY.STORES_COUNT}</div>
                                <div class="stat-title">${Localization.t('statsShowrooms')}</div>
                                <div class="stat-subtitle">${Localization.t('statsShowroomsSubtitle')}</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-number" data-target="758.8" data-prefix="${Localization.isArabic() ? '' : 'SAR '}" data-suffix="${Localization.isArabic() ? ' مليون ريال' : 'M'}" data-decimal="true">${CONFIG.COMPANY.REVENUE}${Localization.isArabic() ? ' مليون ريال' : 'M'}</div>
                                <div class="stat-title">${Localization.t('statsRevenue')}</div>
                                <div class="stat-subtitle">${Localization.t('statsRevenueSubtitle')}</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-number" data-target="88" data-prefix="~" data-suffix="%">${CONFIG.COMPANY.PROPRIETARY_REVENUE}%</div>
                                <div class="stat-title">${Localization.t('statsPropRevenue')}</div>
                                <div class="stat-subtitle">${Localization.t('statsPropRevenueSubtitle')}</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-number" data-target="37" data-suffix="%">${CONFIG.COMPANY.ECOMMERCE_GROWTH}%</div>
                                <div class="stat-title">${Localization.t('statsEcommerce')}</div>
                                <div class="stat-subtitle">${Localization.t('statsEcommerceSubtitle')}</div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Brands Section -->
                <section class="brands-section">
                    <div class="brands-bg">
                        <svg width="700" height="700" viewBox="0 0 24 24" fill="currentColor" style="color: var(--primary-color);">
                            <path d="M18.5,2H5.5A1.5,1.5 0 0,0 4,3.5V20.5A1.5,1.5 0 0,0 5.5,22H18.5A1.5,1.5 0 0,0 20,20.5V3.5A1.5,1.5 0 0,0 18.5,2M18,20H6V4H18V20Z"/>
                        </svg>
                    </div>
                    <div class="brands-content section-padding">
                        <h2 class="brands-title">${Localization.t('brandsTitle')}</h2>
                        <p class="brands-description">${Localization.t('brandsDesc1')}</p>
                        <p class="brands-description">${Localization.t('brandsDesc2')}</p>
                        
                        <div class="service-cards">
                            <div class="service-card">
                                <div class="service-card-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                                    </svg>
                                </div>
                                <h3 class="service-card-title">${Localization.t('cardStrategyTitle')}</h3>
                                <p class="service-card-description">${Localization.t('cardStrategyDesc')}</p>
                                <div class="service-card-link" data-route="/strategy-operations">
                                    <span>${Localization.t('cardStrategyLink')}</span>
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                                    </svg>
                                </div>
                            </div>
                            
                            <div class="service-card">
                                <div class="service-card-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                                    </svg>
                                </div>
                                <h3 class="service-card-title">${Localization.t('cardInvestorsTitle')}</h3>
                                <p class="service-card-description">${Localization.t('cardInvestorsDesc')}</p>
                                <div class="service-card-link" data-route="/investors-governance">
                                    <span>${Localization.t('cardInvestorsLink')}</span>
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                                    </svg>
                                </div>
                            </div>
                            
                            <div class="service-card">
                                <div class="service-card-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                                    </svg>
                                </div>
                                <h3 class="service-card-title">${Localization.t('cardBrandsTitle')}</h3>
                                <p class="service-card-description">${Localization.t('cardBrandsDesc')}</p>
                                <div class="service-card-link" data-action="show-brands">
                                    <span>${Localization.t('cardBrandsLink')}</span>
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                                    </svg>
                                </div>
                            </div>
                            
                            <div class="service-card">
                                <div class="service-card-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                                    </svg>
                                </div>
                                <h3 class="service-card-title">${Localization.t('cardCareersTitle')}</h3>
                                <p class="service-card-description">${Localization.t('cardCareersDesc')}</p>
                                <div class="service-card-link" data-route="/news-careers" data-fragment="careers">
                                    <span>${Localization.t('cardCareersLink')}</span>
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },
    
    // Load placeholder page for unimplemented routes
    loadPlaceholderPage(routeKey) {
        const titles = {
            'about': 'About Us',
            'strategy': 'Strategy & Operations',
            'investors': 'Investors & Governance',
            'news': 'Newsroom & Careers',
            'documents': 'Documents Library',
            'whistleblowing': 'Whistleblowing',
            'contact': 'Contact'
        };
        
        const title = titles[routeKey] || 'Page';
        
        return `
            <div class="placeholder-page" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; padding: 40px 20px;">
                <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 16px; color: var(--text-primary);">${title}</h1>
                <p style="margin-bottom: 24px; color: var(--text-secondary);">This page is under construction</p>
                <a href="/" class="btn btn-primary">Back to Home</a>
            </div>
        `;
    },
    
    // Initialize page-specific functionality
    initializePage(routeKey, fragment) {
        switch (routeKey) {
            case 'home':
                this.initializeHomePage(fragment);
                break;
            // Add other page initializations here
        }
    },
    
    // Initialize home page functionality
    initializeHomePage(fragment) {
        // Animate stats when they come into view
        this.setupStatsAnimation();
        
        // Handle service card clicks
        this.setupServiceCardClicks();
        
        // Handle hero button clicks
        this.setupHeroButtonClicks();
    },
    
    // Setup stats animation
    setupStatsAnimation() {
        const statsSection = Utils.dom.get('stats-section');
        if (!statsSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    },
    
    // Animate stats numbers
    animateStats() {
        const statNumbers = Utils.dom.queryAll('.stat-number');
        statNumbers.forEach(element => {
            const target = parseFloat(element.dataset.target);
            const prefix = element.dataset.prefix || '';
            const suffix = element.dataset.suffix || '';
            const isDecimal = element.dataset.decimal === 'true';
            
            Utils.animation.animateNumber(element, target, CONFIG.ANIMATIONS.STATS, isDecimal, prefix, suffix);
        });
    },
    
    // Setup service card clicks
    setupServiceCardClicks() {
        Utils.dom.on(document, 'click', (e) => {
            const serviceLink = e.target.closest('.service-card-link');
            if (!serviceLink) return;
            
            e.preventDefault();
            
            if (serviceLink.dataset.action === 'show-brands') {
                // Navigate to brands page
                window.location.href = '/brands.html';
            } else if (serviceLink.dataset.route) {
                const route = serviceLink.dataset.route;
                const fragment = serviceLink.dataset.fragment;
                this.navigate(route, fragment);
            }
        });
    },
    
    // Setup hero button clicks
    setupHeroButtonClicks() {
        Utils.dom.on(document, 'click', (e) => {
            const heroBtn = e.target.closest('.hero-btn');
            if (!heroBtn) return;
            
            e.preventDefault();
            const href = heroBtn.getAttribute('href');
            if (href) {
                this.navigate(href);
            }
        });
    },
    
    // Handle 404 errors
    handle404() {
        const mainContent = Utils.dom.get('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-404" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; padding: 40px 20px;">
                    <h1 style="font-size: 48px; font-weight: bold; margin-bottom: 16px; color: var(--primary-color);">404</h1>
                    <p style="margin-bottom: 24px; color: var(--text-secondary);">Page not found</p>
                    <a href="/" class="btn btn-primary">Back to Home</a>
                </div>
            `;
        }
    },
    
    // Update page meta information
    updatePageMeta(routeKey) {
        const titles = {
            'home': "Al Saif Gallery | Saudi Arabia's Home & Kitchen Retail Leader | Tadawul 4192",
            'about': 'About Us - Al Saif Gallery',
            'strategy': 'Strategy & Operations - Al Saif Gallery',
            'investors': 'Investors & Governance - Al Saif Gallery',
            'news': 'Newsroom & Careers - Al Saif Gallery',
            'documents': 'Documents Library - Al Saif Gallery',
            'whistleblowing': 'Whistleblowing - Al Saif Gallery',
            'contact': 'Contact - Al Saif Gallery',
            'brands': 'Brand Portfolio - Al Saif Gallery'
        };
        
        document.title = titles[routeKey] || 'Al Saif Gallery';
    },
    
    // Get current path
    getCurrentPath() {
        return this.currentRoute;
    },
    
    // Get current fragment
    getCurrentFragment() {
        return this.currentFragment;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Router;
}