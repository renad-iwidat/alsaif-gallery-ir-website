// Shared Components - Header & Footer

function createTopBar(isArabic = false) {
    const texts = isArabic ? {
        documents: 'مكتبة الوثائق',
        contact: 'تواصل معنا',
        search: 'بحث',
        language: 'English'
    } : {
        documents: 'Documents Library',
        contact: 'Contact',
        search: 'Search',
        language: 'العربية'
    };
    
    // تحديد الروابط حسب الصفحة الحالية
    const currentPath = window.location.pathname;
    const isInArFolder = currentPath.includes('/ar/');
    const isAboutPage = currentPath.includes('about-us');
    const isStrategyPage = currentPath.includes('strategy');
    const isNewsCareersPage = currentPath.includes('news-careers');
    const isInvestorsPage = currentPath.includes('investors');
    
    let langHref;
    if (isArabic) {
        // من العربي للإنجليزي
        if (isAboutPage) {
            langHref = '../about-us.html';
        } else if (isStrategyPage) {
            langHref = '../strategy.html';
        } else if (isNewsCareersPage) {
            langHref = '../news-careers.html';
        } else if (isInvestorsPage) {
            langHref = '../investors.html';
        } else {
            langHref = '../index-new.html';
        }
    } else {
        // من الإنجليزي للعربي
        if (isAboutPage) {
            langHref = 'ar/about-us.html';
        } else if (isStrategyPage) {
            langHref = 'ar/strategy.html';
        } else if (isNewsCareersPage) {
            langHref = 'ar/news-careers.html';
        } else if (isInvestorsPage) {
            langHref = 'ar/investors.html';
        } else {
            langHref = 'ar/index-new.html';
        }
    }
    
    return `
        <div class="top-bar">
            <div class="top-bar-wrapper">
                <div class="top-bar-content">
                    <div class="top-bar-items">
                        <a href="#" class="top-bar-item">
                            <svg viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            <span>${texts.documents}</span>
                        </a>
                        <a href="#" class="top-bar-item">
                            <svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            <span>${texts.contact}</span>
                        </a>
                        <a href="#" class="top-bar-item">
                            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                            <span>${texts.search}</span>
                        </a>
                        <a href="${langHref}" class="top-bar-item language-item">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                            <span>${texts.language}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createNavBar(isArabic = false, activePage = 'home') {
    const texts = isArabic ? {
        home: 'الرئيسية',
        about: 'من نحن',
        strategy: 'الاستراتيجية والعمليات',
        investors: 'علاقات المستثمرين',
        newsroom: 'الأخبار والوظائف',
        menu: 'القائمة'
    } : {
        home: 'Home',
        about: 'About Us',
        strategy: 'Strategy & Operations',
        investors: 'Investor Relations',
        newsroom: 'Newsroom & Careers',
        menu: 'Menu'
    };
    
    // تحديد الروابط حسب اللغة
    const basePath = isArabic ? '' : '';
    const homeHref = isArabic ? 'index-new.html' : 'index-new.html';
    const aboutHref = isArabic ? 'about-us.html' : 'about-us.html';
    const strategyHref = isArabic ? 'strategy.html' : 'strategy.html';
    const investorsHref = isArabic ? 'investors.html' : 'investors.html';
    const newsCareersHref = isArabic ? 'news-careers.html' : 'news-careers.html';
    const logoSrc = isArabic ? '../assets/images/Al_Saif_Logo.svg' : 'assets/images/Al_Saif_Logo.svg';
    
    return `
        <div class="nav-bar">
            <div class="nav-content">
                <div class="nav-logo">
                    <a href="${homeHref}">
                        <img src="${logoSrc}" alt="Al Saif Gallery" />
                    </a>
                </div>
                <nav class="nav-menu">
                    <a href="${homeHref}" class="nav-item ${activePage === 'home' ? 'active' : ''}">${texts.home}</a>
                    <a href="${aboutHref}" class="nav-item ${activePage === 'about' ? 'active' : ''}">${texts.about}</a>
                    <a href="${strategyHref}" class="nav-item ${activePage === 'strategy' ? 'active' : ''}">${texts.strategy}</a>
                    <a href="${investorsHref}" class="nav-item ${activePage === 'investors' ? 'active' : ''}">${texts.investors}</a>
                    <a href="${newsCareersHref}" class="nav-item ${activePage === 'news-careers' ? 'active' : ''}">${texts.newsroom}</a>
                </nav>
                <button class="mobile-menu-toggle" onclick="toggleMobileMenu()" style="display: none;">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
        
        <!-- Mobile Menu -->
        <div class="mobile-menu" id="mobile-menu">
            <div class="mobile-menu-overlay" onclick="toggleMobileMenu()"></div>
            <div class="mobile-menu-content">
                <div class="mobile-menu-header">
                    <h3>${texts.menu}</h3>
                    <button class="mobile-menu-close" onclick="toggleMobileMenu()">&times;</button>
                </div>
                <nav class="mobile-nav-menu">
                    <a href="${homeHref}" class="mobile-nav-item ${activePage === 'home' ? 'active' : ''}">${texts.home}</a>
                    <a href="${aboutHref}" class="mobile-nav-item ${activePage === 'about' ? 'active' : ''}">${texts.about}</a>
                    <a href="${strategyHref}" class="mobile-nav-item ${activePage === 'strategy' ? 'active' : ''}">${texts.strategy}</a>
                    <a href="${investorsHref}" class="mobile-nav-item ${activePage === 'investors' ? 'active' : ''}">${texts.investors}</a>
                    <a href="${newsCareersHref}" class="mobile-nav-item ${activePage === 'news-careers' ? 'active' : ''}">${texts.newsroom}</a>
                </nav>
            </div>
        </div>
    `;
}

function createFooter(isArabic = false) {
    const texts = isArabic ? {
        ctaTitle: 'تبحث عن تسوّق من أكثر من ١٥,٠٠٠ منتج؟',
        ctaSubtitle: 'زُر متجر السيف غاليري الإلكتروني للتوصيل السريع في المملكة ودول الخليج.',
        ctaButton: 'تسوق الآن',
        established: 'تأسست عام ١٩٩٣',
        tadawul: 'تداول: 4192',
        company: 'الشركة',
        about: 'من نحن',
        strategy: 'الاستراتيجية',
        newsroom: 'الأخبار والوظائف',
        careers: 'الوظائف',
        investors: 'المستثمرون',
        investorsPage: 'علاقات المستثمرين',
        annual: 'التقارير السنوية',
        governance: 'الحوكمة',
        reports: 'التقارير',
        contact: 'تواصل معنا',
        ir: 'علاقات المستثمرين',
        copyright: '© ٢٠٢٦ معرض السيف للأجهزة المنزلية. جميع الحقوق محفوظة.',
        privacy: 'سياسة الخصوصية',
        terms: 'الشروط والأحكام',
        corpGov: 'حوكمة الشركات'
    } : {
        ctaTitle: 'Looking to shop our full range of 15,000+ products?',
        ctaSubtitle: 'Visit the Al Saif Gallery online store for fast delivery across the Kingdom and the GCC.',
        ctaButton: 'Visit the Online Store',
        established: 'Established in 1993',
        tadawul: 'Tadawul: 4192',
        company: 'Company',
        about: 'About Us',
        strategy: 'Strategy',
        newsroom: 'Newsroom & Careers',
        careers: 'Careers',
        investors: 'Investors',
        investorsPage: 'Investor Relations',
        annual: 'Annual Reports',
        governance: 'Governance',
        reports: 'Reports & Filings',
        contact: 'Contact',
        ir: 'Investor Relations',
        copyright: '© 2026 Al Saif Gallery. All rights reserved.',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        corpGov: 'Corporate Governance'
    };
    
    const aboutHref = isArabic ? 'about-us.html' : 'about-us.html';
    const strategyHref = isArabic ? 'strategy.html' : 'strategy.html';
    const investorsHref = isArabic ? 'investors.html' : 'investors.html';
    const newsCareersHref = isArabic ? 'news-careers.html' : 'news-careers.html';
    
    return `
        <!-- CTA Section (Red) - نفس Flutter بالضبط -->
        <div class="footer-cta">
            <div class="footer-cta-content">
                <div class="footer-cta-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                        <path d="M3.977 9.84A1 1 0 0 1 4.94 9h14.12a1 1 0 0 1 .963.84l1.4 7A1 1 0 0 1 20.46 18H3.54a1 1 0 0 1-.963-1.16l1.4-7zM6 10l-1.2 6h14.4l-1.2-6H6z"/>
                        <path d="M11 6a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v3h-2V6z"/>
                        <path d="M8 9V6a4 4 0 0 1 8 0v3h2V6A6 6 0 0 0 6 6v3h2z"/>
                    </svg>
                </div>
                <h3 class="footer-cta-title">${texts.ctaTitle}</h3>
                <p class="footer-cta-subtitle">${texts.ctaSubtitle}</p>
                <a href="https://alsaifgallery.com/" target="_blank" class="footer-cta-button">${texts.ctaButton}</a>
            </div>
        </div>
        
        <!-- Footer (Black) -->
        <footer class="footer">
            <div class="footer-grid">
                <div class="footer-about">
                    <h4>Al Saif Gallery</h4>
                    <p>${texts.established}</p>
                    <p>${texts.tadawul}</p>
                </div>
                <div class="footer-column">
                    <h4>${texts.company}</h4>
                    <ul class="footer-links">
                        <li><a href="${aboutHref}" class="footer-link">${texts.about}</a></li>
                        <li><a href="${strategyHref}" class="footer-link">${texts.strategy}</a></li>
                        <li><a href="${newsCareersHref}" class="footer-link">${texts.newsroom}</a></li>
                        <li><a href="${newsCareersHref}#careers" class="footer-link">${texts.careers}</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>${texts.investors}</h4>
                    <ul class="footer-links">
                        <li><a href="${investorsHref}" class="footer-link">${texts.investorsPage}</a></li>
                        <li><a href="#" class="footer-link">${texts.annual}</a></li>
                        <li><a href="#" class="footer-link">${texts.governance}</a></li>
                        <li><a href="#" class="footer-link">${texts.reports}</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>${texts.contact}</h4>
                    <ul class="footer-links">
                        <li><a href="#" class="footer-link">${texts.ir}</a></li>
                        <li><a href="mailto:ir@alsaifgallery.com" class="footer-link">ir@alsaifgallery.com</a></li>
                        <li><a href="tel:+966114064444" class="footer-link">+966 11 406 4444</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>${texts.copyright}</p>
                <ul class="footer-bottom-links">
                    <li>${texts.privacy}</li>
                    <li>${texts.terms}</li>
                    <li>${texts.corpGov}</li>
                </ul>
            </div>
        </footer>
    `;
}

// Initialize components on page load
document.addEventListener('DOMContentLoaded', function() {
    const isArabic = document.documentElement.lang === 'ar';
    const activePage = document.body.dataset.page || 'home';
    
    // Add Arabic class to body if needed
    if (isArabic) {
        document.body.classList.add('ar');
    }
    
    // Insert Top Bar
    const topBarContainer = document.getElementById('top-bar-container');
    if (topBarContainer) {
        topBarContainer.innerHTML = createTopBar(isArabic);
    }
    
    // Insert Nav Bar
    const navBarContainer = document.getElementById('nav-bar-container');
    if (navBarContainer) {
        navBarContainer.innerHTML = createNavBar(isArabic, activePage);
    }
    
    // Insert Footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter(isArabic);
    }
});

// Mobile Menu Toggle Function
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
}

// Show/Hide Mobile Menu Toggle based on screen size
function updateMobileMenuVisibility() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (toggle && navMenu) {
        if (window.innerWidth <= 899) {
            toggle.style.display = 'flex';
            navMenu.style.display = 'none';
        } else {
            toggle.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    }
}

// Run on load and resize
window.addEventListener('load', updateMobileMenuVisibility);
window.addEventListener('resize', updateMobileMenuVisibility);