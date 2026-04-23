// Search Dialog Component - SIMPLE DROPDOWN VERSION
const SearchDialog = {
    // Initialize
    init() {
        console.log('SearchDialog loaded successfully!');
        this.createDropdown();
    },
    
    // Search data
    searchData: [
        // ── Home ──────────────────────────────────────────────────────────────────
        {
            titleEn: 'Home', titleAr: 'الرئيسية',
            descEn: 'Al Saif Gallery main page', descAr: 'الصفحة الرئيسية للسيف غاليري',
            route: '/index-new', categoryEn: 'Pages', categoryAr: 'الصفحات'
        },
        // ── About Us ──────────────────────────────────────────────────────────────
        {
            titleEn: 'About Us', titleAr: 'من نحن',
            descEn: 'Our story, purpose and values since 1993', descAr: 'قصتنا وقيمنا منذ 1993',
            route: '/about-us', categoryEn: 'Pages', categoryAr: 'الصفحات'
        },
        {
            titleEn: 'Leadership', titleAr: 'القيادة',
            descEn: 'Board of Directors and Executive Management', descAr: 'مجلس الإدارة والإدارة التنفيذية',
            route: '/about-us', fragment: 'leadership',
            categoryEn: 'About', categoryAr: 'من نحن'
        },
        {
            titleEn: 'Board of Directors', titleAr: 'مجلس الإدارة',
            descEn: 'Strategic oversight and shareholder interests', descAr: 'الإشراف الاستراتيجي وحماية حقوق المساهمين',
            route: '/board-of-directors', categoryEn: 'About', categoryAr: 'من نحن'
        },
        {
            titleEn: 'Executive Management', titleAr: 'الإدارة التنفيذية',
            descEn: 'Day-to-day operations and strategic execution', descAr: 'العمليات اليومية والتنفيذ الاستراتيجي',
            route: '/executive-management', categoryEn: 'About', categoryAr: 'من نحن'
        },
        {
            titleEn: 'Our Values', titleAr: 'قيمنا',
            descEn: 'The values that guide Al Saif Gallery', descAr: 'القيم التي توجه السيف غاليري',
            route: '/about-us', fragment: 'values',
            categoryEn: 'About', categoryAr: 'من نحن'
        },
        {
            titleEn: 'Heritage & Milestones', titleAr: 'الإرث والإنجازات',
            descEn: 'Our journey from 1993 to today', descAr: 'رحلتنا من 1993 حتى اليوم',
            route: '/about-us', fragment: 'heritage',
            categoryEn: 'About', categoryAr: 'من نحن'
        },
        // ── Strategy ──────────────────────────────────────────────────────────────
        {
            titleEn: 'Strategy & Operations', titleAr: 'الاستراتيجية والعمليات',
            descEn: 'Three-phase growth strategy and operating model', descAr: 'استراتيجية النمو ثلاثية المراحل',
            route: '/strategy', categoryEn: 'Pages', categoryAr: 'الصفحات'
        },
        {
            titleEn: 'Strategic Pillars', titleAr: 'الركائز الاستراتيجية',
            descEn: 'Brand ownership, national reach, digital integration', descAr: 'ملكية العلامة التجارية والانتشار الوطني',
            route: '/strategy', fragment: 'pillars',
            categoryEn: 'Strategy', categoryAr: 'الاستراتيجية'
        },
        {
            titleEn: 'Growth Roadmap', titleAr: 'خارطة طريق النمو',
            descEn: 'Phase 1, 2 and 3 expansion plan', descAr: 'خطة التوسع للمراحل 1 و2 و3',
            route: '/strategy', fragment: 'roadmap',
            categoryEn: 'Strategy', categoryAr: 'الاستراتيجية'
        },
        {
            titleEn: 'Risk Management', titleAr: 'إدارة المخاطر',
            descEn: 'Key risks and mitigation strategies', descAr: 'المخاطر الرئيسية واستراتيجيات التخفيف',
            route: '/strategy', fragment: 'risk',
            categoryEn: 'Strategy', categoryAr: 'الاستراتيجية'
        },
        // ── Investor Relations ────────────────────────────────────────────────────
        {
            titleEn: 'Investor Relations', titleAr: 'علاقات المستثمرين',
            descEn: 'Financial results, governance and shareholder services', descAr: 'النتائج المالية والحوكمة وخدمات المساهمين',
            route: '/investors', categoryEn: 'Pages', categoryAr: 'الصفحات'
        },
        {
            titleEn: 'Annual Reports', titleAr: 'التقارير السنوية',
            descEn: 'Audited financial results and annual disclosures', descAr: 'النتائج المالية المدققة والإفصاحات السنوية',
            route: '/investors', fragment: 'annual-reports',
            categoryEn: 'Investors', categoryAr: 'المستثمرون'
        },
        {
            titleEn: 'Corporate Governance', titleAr: 'حوكمة الشركات',
            descEn: 'CMA compliance and governance framework', descAr: 'الامتثال لهيئة السوق المالية وإطار الحوكمة',
            route: '/investors', fragment: 'corporate-actions',
            categoryEn: 'Investors', categoryAr: 'المستثمرون'
        },
        {
            titleEn: 'Stock Activity', titleAr: 'نشاط السهم',
            descEn: 'Tadawul 4192 share price and trading data', descAr: 'سعر سهم تداول 4192 وبيانات التداول',
            route: '/investors', fragment: 'stock-activity',
            categoryEn: 'Investors', categoryAr: 'المستثمرون'
        },
        {
            titleEn: 'Financial Results', titleAr: 'النتائج المالية',
            descEn: 'SAR 758.8M revenue, FY2025 performance', descAr: 'إيرادات 758.8 مليون ريال، أداء 2025',
            route: '/investors', fragment: 'financials',
            categoryEn: 'Investors', categoryAr: 'المستثمرون'
        },
        {
            titleEn: 'Fact Sheet', titleAr: 'نشرة المعلومات',
            descEn: 'Key company facts and financial highlights', descAr: 'الحقائق الرئيسية والأبرز المالية',
            route: '/investors', fragment: 'fact-sheet',
            categoryEn: 'Investors', categoryAr: 'المستثمرون'
        },
        {
            titleEn: 'Investment Calculator', titleAr: 'حاسبة الاستثمار',
            descEn: 'Calculate your investment returns', descAr: 'احسب عوائد استثمارك',
            route: '/investors', fragment: 'calculator',
            categoryEn: 'Investors', categoryAr: 'المستثمرون'
        },
        // ── Newsroom & Careers ────────────────────────────────────────────────────
        {
            titleEn: 'Newsroom & Careers', titleAr: 'الأخبار والوظائف',
            descEn: 'Latest news, press releases and job opportunities', descAr: 'آخر الأخبار والبيانات الصحفية وفرص العمل',
            route: '/news-careers', categoryEn: 'Pages', categoryAr: 'الصفحات'
        },
        {
            titleEn: 'Corporate News', titleAr: 'أخبار الشركة',
            descEn: 'Press releases and regulatory announcements', descAr: 'البيانات الصحفية والإعلانات التنظيمية',
            route: '/news-careers', fragment: 'news',
            categoryEn: 'News', categoryAr: 'الأخبار'
        },
        {
            titleEn: 'Careers', titleAr: 'الوظائف',
            descEn: 'Join the Al Saif Gallery team', descAr: 'انضم لفريق السيف غاليري',
            route: '/news-careers', fragment: 'careers',
            categoryEn: 'News', categoryAr: 'الأخبار'
        },
        // ── Contact ───────────────────────────────────────────────────────────────
        {
            titleEn: 'Contact IR', titleAr: 'تواصل مع علاقات المستثمرين',
            descEn: 'ir@alsaifgallery.com | +966 11 406 4444', descAr: 'ir@alsaifgallery.com | +966 11 406 4444',
            route: '/news-careers', fragment: 'contact',
            categoryEn: 'Contact', categoryAr: 'تواصل معنا'
        }
    ],

    // Search timeout
    searchTimeout: null,

    // Current results
    currentResults: [],

    // Create dropdown container
    createDropdown() {
        const htmlDir = document.documentElement.getAttribute('dir');
        const isArabic = htmlDir === 'rtl';
        
        const dropdownHTML = `
            <div id="search-dropdown" class="search-dropdown" style="display: none;" dir="${htmlDir || 'ltr'}">
                <div class="search-header">
                    <button class="search-close-btn" onclick="SearchDialog.close()">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                        </svg>
                    </button>
                </div>
                <input 
                    type="text" 
                    id="search-input" 
                    class="search-input"
                    placeholder="${isArabic ? 'ابحث...' : 'Search...'}"
                    autocomplete="off"
                    dir="${htmlDir || 'ltr'}"
                />
                <div id="search-results" class="search-results" dir="${htmlDir || 'ltr'}"></div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dropdownHTML);
        
        // Bind input event using oninput
        const input = document.getElementById('search-input');
        if (input) {
            input.oninput = (e) => this.handleSearch(e.target.value);
        }
        
        // Close on click outside
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('search-dropdown');
            if (dropdown && !dropdown.contains(e.target) && !e.target.closest('.top-bar-item')) {
                this.close();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    },

    // Show dropdown
    show() {
        const dropdown = document.getElementById('search-dropdown');
        const input = document.getElementById('search-input');
        
        if (dropdown) {
            // Position dropdown in center of screen (both horizontally and vertically)
            dropdown.style.top = '50%';
            dropdown.style.left = '50%';
            dropdown.style.transform = 'translate(-50%, -50%)';
            dropdown.style.right = 'auto';
            
            dropdown.style.display = 'block';
            if (input) {
                input.value = '';
                input.focus();
                this.showEmptyState();
            }
        }
    },

    // Handle search
    handleSearch(query) {
        const results = document.getElementById('search-results');
        const htmlDir = document.documentElement.getAttribute('dir');
        const isArabic = htmlDir === 'rtl';

        if (!query.trim()) {
            this.showEmptyState();
            return;
        }

        // Clear previous timeout
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        // Show loading
        if (results) {
            results.innerHTML = '<div class="search-loading">جاري البحث...</div>';
        }

        // Debounce search
        this.searchTimeout = setTimeout(() => {
            this.performSearch(query, isArabic);
        }, 300);
    },

    // Show empty state
    showEmptyState() {
        const results = document.getElementById('search-results');
        const htmlDir = document.documentElement.getAttribute('dir');
        const isArabic = htmlDir === 'rtl';
        
        if (results) {
            results.innerHTML = `<div class="search-empty">${isArabic ? 'اكتب للبحث...' : 'Type to search...'}</div>`;
        }
    },

    // Perform search
    performSearch(query, isArabic) {
        const q = query.toLowerCase().trim();

        // Search
        this.currentResults = this.searchData.filter(item => {
            return item.titleEn.toLowerCase().includes(q) ||
                   item.titleAr.includes(q) ||
                   item.descEn.toLowerCase().includes(q) ||
                   item.descAr.includes(q);
        });

        // Render results
        const results = document.getElementById('search-results');
        if (results) {
            if (this.currentResults.length === 0) {
                results.innerHTML = `<div class="search-empty">${isArabic ? 'لا توجد نتائج' : 'No results'}</div>`;
            } else {
                const html = this.currentResults.slice(0, 8).map(item => {
                    const title = isArabic ? item.titleAr : item.titleEn;
                    const desc = isArabic ? item.descAr : item.descEn;
                    
                    return `
                        <div class="search-result" onclick="SearchDialog.navigateTo('${item.route}', '${item.fragment || ''}')">
                            <div class="search-result-title">${title}</div>
                            <div class="search-result-desc">${desc}</div>
                        </div>
                    `;
                }).join('');
                
                results.innerHTML = html;
            }
        }
    },

    // Navigate to route
    navigateTo(route, fragment) {
        this.close();
        
        // Detect language
        const htmlDir = document.documentElement.getAttribute('dir');
        const isArabic = htmlDir === 'rtl';
        
        // Check if we're already in ar/ folder
        const currentPath = window.location.pathname;
        const isInArFolder = currentPath.includes('/ar/');
        
        // Build the path
        let fullPath = route;
        
        // Remove leading slash
        if (fullPath.startsWith('/')) {
            fullPath = fullPath.substring(1);
        }
        
        // Add .html extension if not present
        if (!fullPath.includes('.html')) {
            fullPath += '.html';
        }
        
        // Add ar/ prefix for Arabic only if not already in ar folder
        if (isArabic && !isInArFolder) {
            fullPath = 'ar/' + fullPath;
        } else if (isArabic && isInArFolder) {
            // Already in ar folder, keep the path as is
            fullPath = fullPath;
        } else if (!isArabic && isInArFolder) {
            // In ar folder but switching to English, go back
            fullPath = '../' + fullPath;
        }
        
        // Navigate
        if (fragment) {
            window.location.href = fullPath + '#' + fragment;
        } else {
            window.location.href = fullPath;
        }
    },

    // Close dropdown
    close() {
        const dropdown = document.getElementById('search-dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SearchDialog;
}
