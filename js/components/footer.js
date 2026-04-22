// Footer Component
const Footer = {
    // Initialize footer
    init() {
        this.render();
        this.bindEvents();
        
        // Listen for language changes
        window.addEventListener('languageChanged', () => {
            this.render();
        });
    },
    
    // Render footer HTML
    render() {
        const container = Utils.dom.get('footer');
        if (!container) return;
        
        const isArabic = Localization.isArabic();
        const isMobile = Utils.responsive.isMobile();
        
        container.innerHTML = `
            <footer class="footer">
                <!-- CTA Section -->
                <div class="footer-cta">
                    <div class="footer-cta-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19,7H18V6A2,2 0 0,0 16,4H8A2,2 0 0,0 6,6V7H5A1,1 0 0,0 4,8V19A3,3 0 0,0 7,22H17A3,3 0 0,0 20,19V8A1,1 0 0,0 19,7M8,6H16V7H8V6M18,19A1,1 0 0,1 17,20H7A1,1 0 0,1 6,19V9H18V19Z"/>
                        </svg>
                    </div>
                    <div class="footer-cta-title">${Localization.t('footerCtaTitle')}</div>
                    <div class="footer-cta-subtitle">${Localization.t('footerCtaSubtitle')}</div>
                    <button class="footer-cta-button" data-action="visit-store">
                        ${Localization.t('footerCtaButton')}
                    </button>
                </div>
                
                <!-- Main Footer -->
                <div class="footer-main">
                    <div class="section-padding">
                        <div class="footer-content">
                            <!-- About Column -->
                            <div class="footer-column">
                                <h4>Al Saif Gallery</h4>
                                <p style="color: #9CA3AF; font-size: 11px; margin-bottom: 2px;">${Localization.t('footerEstablished')}</p>
                                <p style="color: #9CA3AF; font-size: 11px;">Tadawul: 4192</p>
                            </div>
                            
                            <!-- Company Column -->
                            <div class="footer-column">
                                <h4>${Localization.t('footerCompany')}</h4>
                                <ul>
                                    <li><a href="/about-us">${Localization.t('footerAboutUs')}</a></li>
                                    <li><a href="/strategy-operations">${Localization.t('footerStrategy')}</a></li>
                                    <li><a href="/news-careers#careers">${Localization.t('footerCareers')}</a></li>
                                </ul>
                            </div>
                            
                            <!-- Investors Column -->
                            <div class="footer-column">
                                <h4>${Localization.t('footerInvestors')}</h4>
                                <ul>
                                    <li><a href="/investors-governance#financials">${Localization.t('footerAnnualReports')}</a></li>
                                    <li><a href="/investors-governance#governance">${Localization.t('footerGovernance')}</a></li>
                                    <li><a href="/investors-governance#reports">${Localization.t('footerReports')}</a></li>
                                </ul>
                            </div>
                            
                            <!-- Contact Column -->
                            <div class="footer-column">
                                <h4>${Localization.t('footerContact')}</h4>
                                <ul>
                                    <li><a href="/investors-governance">${Localization.t('footerIR')}</a></li>
                                    <li><a href="mailto:${CONFIG.URLS.EMAIL}">${CONFIG.URLS.EMAIL}</a></li>
                                    <li><a href="tel:${CONFIG.URLS.PHONE}">${CONFIG.URLS.PHONE}</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <!-- Footer Bottom -->
                        <div class="footer-bottom">
                            <div class="footer-copyright">
                                ${Localization.t('footerCopyright')}
                            </div>
                            <div class="footer-links">
                                <a href="/privacy">${Localization.t('footerPrivacy')}</a>
                                <a href="/terms">${Localization.t('footerTerms')}</a>
                                <a href="/governance">${Localization.t('footerCorporateGov')}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    },
    
    // Bind event listeners
    bindEvents() {
        // Handle footer link clicks
        Utils.dom.on(document, 'click', (e) => {
            const link = e.target.closest('.footer-column a, .footer-links a');
            if (link) {
                const href = link.getAttribute('href');
                
                // Handle external links
                if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
                    return; // Let browser handle these
                }
                
                // Handle internal links
                e.preventDefault();
                if (href.includes('#')) {
                    const [path, fragment] = href.split('#');
                    Router.navigate(path, fragment);
                } else {
                    Router.navigate(href);
                }
            }
            
            // Handle CTA button
            if (e.target.closest('[data-action="visit-store"]')) {
                Utils.url.openInNewTab(CONFIG.URLS.MAIN_WEBSITE);
            }
        });
        
        // Handle email links with Gmail
        Utils.dom.on(document, 'click', (e) => {
            const emailLink = e.target.closest('a[href^="mailto:"]');
            if (emailLink) {
                e.preventDefault();
                const email = emailLink.getAttribute('href').replace('mailto:', '');
                Utils.url.openInNewTab(`https://mail.google.com/mail/?view=cm&to=${email}`);
            }
        });
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Footer;
}