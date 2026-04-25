// Navigation Bar Component
const NavigationBar = {
    // Initialize navigation bar
    init() {
        this.render();
        this.bindEvents();
        
        // Listen for language changes
        window.addEventListener('languageChanged', () => {
            this.render();
        });
        
        // Listen for route changes
        window.addEventListener('routeChanged', () => {
            this.updateActiveState();
        });
    },
    
    // Render navigation bar HTML
    render() {
        const container = Utils.dom.get('navigation-bar');
        if (!container) return;
        
        const isArabic = Localization.isArabic();
        const isMobile = Utils.responsive.isMobile();
        
        container.innerHTML = `
            <div class="navigation-bar">
                <div class="nav-content section-padding">
                    <div class="nav-logo">
                        <img src="assets/images/Al_Saif_Logo.svg" alt="Al Saif Gallery" />
                    </div>
                    
                    ${!isMobile ? `
                        <nav class="nav-menu">
                            <a href="/" class="nav-item" data-route="/">${Localization.t('navHome')}</a>
                            <a href="/about-us" class="nav-item" data-route="/about-us">${Localization.t('navAboutUs')}</a>
                            <a href="/strategy-operations" class="nav-item" data-route="/strategy-operations">${Localization.t('navStrategy')}</a>
                            <div class="nav-item has-dropdown" data-dropdown="investors">
                                ${Localization.t('navInvestors')}
                                <div class="dropdown-content">
                                    <a href="/investors-governance" class="dropdown-item">${Localization.t('navInvestors')}</a>
                                    <a href="/investors-governance#investment-case" class="dropdown-item">Investment Case</a>
                                    <a href="/investors-governance#company-snapshot" class="dropdown-item">Company Snapshot</a>
                                    <a href="/investors-governance#announcements" class="dropdown-item">Announcements</a>
                                    <a href="/investors-governance#fact-sheet" class="dropdown-item">Fact Sheet</a>
                                    <a href="/investors-governance#stock-activity" class="dropdown-item">Stock Activity</a>
                                    <a href="/investors-governance#corporate-actions" class="dropdown-item">Corporate Actions</a>
                                    <a href="/investors-governance#financials" class="dropdown-item">Company Financials</a>
                                    <a href="/investors-governance#share-price" class="dropdown-item">Share Price</a>
                                    <a href="/investors-governance#performance" class="dropdown-item">Performance</a>
                                    <a href="/investors-governance#calculator" class="dropdown-item">Investment Calculator</a>
                                    <a href="/investors-governance#share-series" class="dropdown-item">Share Series</a>
                                    <a href="/investors-governance#share-view" class="dropdown-item">Share View</a>
                                    <a href="/investors-governance#price-lookup" class="dropdown-item">Price Lookup</a>
                                    <a href="/investors-governance#peer-group" class="dropdown-item">Peer Group Analysis</a>
                                    <a href="/investors-governance#subscribe" class="dropdown-item">Subscribe</a>
                                </div>
                            </div>
                            <a href="/news-careers" class="nav-item" data-route="/news-careers">${Localization.t('navNewsroom')}</a>
                        </nav>
                    ` : `
                        <button class="mobile-menu-toggle" data-action="toggle-menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    `}
                </div>
            </div>
            
            ${isMobile ? this.renderMobileMenu() : ''}
        `;
        
        this.updateActiveState();
    },
    
    // Render mobile menu
    renderMobileMenu() {
        return `
            <div class="mobile-menu" id="mobile-menu">
                <div class="mobile-menu-content">
                    <div class="mobile-menu-header">
                        <h3>Menu</h3>
                        <button class="mobile-menu-close" data-action="close-menu">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                            </svg>
                        </button>
                    </div>
                    <nav class="mobile-nav-menu">
                        <a href="/" class="mobile-nav-item" data-route="/">${Localization.t('navHome')}</a>
                        <a href="/about-us" class="mobile-nav-item" data-route="/about-us">${Localization.t('navAboutUs')}</a>
                        <a href="/strategy-operations" class="mobile-nav-item" data-route="/strategy-operations">${Localization.t('navStrategy')}</a>
                        <a href="/investors-governance" class="mobile-nav-item" data-route="/investors-governance">${Localization.t('navInvestors')}</a>
                        <a href="/news-careers" class="mobile-nav-item" data-route="/news-careers">${Localization.t('navNewsroom')}</a>
                    </nav>
                </div>
            </div>
        `;
    },
    
    // Bind event listeners
    bindEvents() {
        // Handle navigation clicks
        Utils.dom.on(document, 'click', (e) => {
            const navItem = e.target.closest('.nav-item, .mobile-nav-item');
            if (navItem && navItem.dataset.route) {
                e.preventDefault();
                Router.navigate(navItem.dataset.route);
                this.closeMobileMenu();
                return;
            }
            
            // Handle dropdown toggles
            const dropdown = e.target.closest('.has-dropdown');
            if (dropdown) {
                e.preventDefault();
                this.toggleDropdown(dropdown);
                return;
            }
            
            // Handle dropdown items
            const dropdownItem = e.target.closest('.dropdown-item');
            if (dropdownItem) {
                e.preventDefault();
                const href = dropdownItem.getAttribute('href');
                if (href.includes('#')) {
                    const [path, fragment] = href.split('#');
                    Router.navigate(path, fragment);
                } else {
                    Router.navigate(href);
                }
                this.closeAllDropdowns();
                return;
            }
            
            // Handle mobile menu toggle
            if (e.target.closest('[data-action="toggle-menu"]')) {
                this.toggleMobileMenu();
                return;
            }
            
            // Handle mobile menu close
            if (e.target.closest('[data-action="close-menu"]') || e.target.closest('.mobile-menu')) {
                this.closeMobileMenu();
                return;
            }
            
            // Close dropdowns when clicking outside
            if (!e.target.closest('.dropdown')) {
                this.closeAllDropdowns();
            }
        });
        
        // Handle logo click
        Utils.dom.on(document, 'click', (e) => {
            if (e.target.closest('.nav-logo')) {
                e.preventDefault();
                Router.navigate('/');
            }
        });
        
        // Close mobile menu on resize
        window.addEventListener('resize', () => {
            if (!Utils.responsive.isMobile()) {
                this.closeMobileMenu();
            }
        });
        
        // Prevent page scroll when scrolling inside dropdown
        document.addEventListener('wheel', (e) => {
            const dropdown = e.target.closest('.dropdown-content');
            if (dropdown) {
                const isScrollable = dropdown.scrollHeight > dropdown.clientHeight;
                if (isScrollable) {
                    const isAtTop = dropdown.scrollTop === 0;
                    const isAtBottom = dropdown.scrollTop + dropdown.clientHeight >= dropdown.scrollHeight;
                    
                    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                        e.preventDefault();
                    }
                }
            }
        }, { passive: false });
    },
    
    // Toggle dropdown
    toggleDropdown(dropdown) {
        const isActive = Utils.dom.hasClass(dropdown, 'active');
        
        // Close all dropdowns first
        this.closeAllDropdowns();
        
        // Toggle current dropdown
        if (!isActive) {
            Utils.dom.addClass(dropdown, 'active');
        }
    },
    
    // Close all dropdowns
    closeAllDropdowns() {
        const dropdowns = Utils.dom.queryAll('.has-dropdown.active');
        dropdowns.forEach(dropdown => {
            Utils.dom.removeClass(dropdown, 'active');
        });
    },
    
    // Toggle mobile menu
    toggleMobileMenu() {
        const menu = Utils.dom.get('mobile-menu');
        if (menu) {
            Utils.dom.toggleClass(menu, 'active');
            
            // Prevent body scroll when menu is open
            if (Utils.dom.hasClass(menu, 'active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    },
    
    // Close mobile menu
    closeMobileMenu() {
        const menu = Utils.dom.get('mobile-menu');
        if (menu) {
            Utils.dom.removeClass(menu, 'active');
            document.body.style.overflow = '';
        }
    },
    
    // Update active navigation state
    updateActiveState() {
        const currentPath = Router.getCurrentPath();
        
        // Remove active class from all nav items
        const navItems = Utils.dom.queryAll('.nav-item, .mobile-nav-item');
        navItems.forEach(item => {
            Utils.dom.removeClass(item, 'active');
        });
        
        // Add active class to current nav item
        const activeItem = Utils.dom.query(`[data-route="${currentPath}"]`);
        if (activeItem) {
            Utils.dom.addClass(activeItem, 'active');
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationBar;
}