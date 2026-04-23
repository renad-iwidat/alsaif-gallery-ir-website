// Search Dialog Component
const SearchDialog = {
    // Initialize - Add console log to verify loading
    init() {
        console.log('SearchDialog loaded successfully!');
    },
    
    // Search data
    searchData: [
        // ── Home ──────────────────────────────────────────────────────────────────
        {
            titleEn: 'Home', titleAr: 'الرئيسية',
            descEn: 'Al Saif Gallery main page', descAr: 'الصفحة الرئيسية للسيف غاليري',
            route: '/', categoryEn: 'Pages', categoryAr: 'الصفحات'
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
            route: '/about-us', fragment: 'leadership',
            categoryEn: 'About', categoryAr: 'من نحن'
        },
        {
            titleEn: 'Our Values', titleAr: 'قيمنا',
            descEn: 'The values that guide Al Saif Gallery', descAr: 'القيم التي توجه السيف غاليري',
            route: '/about-us', fragment: 'our-values',
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
            route: '/strategy-operations', categoryEn: 'Pages', categoryAr: 'الصفحات'
        },
        {
            titleEn: 'Strategic Pillars', titleAr: 'الركائز الاستراتيجية',
            descEn: 'Brand ownership, national reach, digital integration', descAr: 'ملكية العلامة التجارية والانتشار الوطني',
            route: '/strategy-operations', fragment: 'strategy-pillars',
            categoryEn: 'Strategy', categoryAr: 'الاستراتيجية'
        },
        {
            titleEn: 'Growth Roadmap', titleAr: 'خارطة طريق النمو',
            descEn: 'Phase 1, 2 and 3 expansion plan', descAr: 'خطة التوسع للمراحل 1 و2 و3',
            route: '/strategy-operations', fragment: 'strategy-roadmap',
            categoryEn: 'Strategy', categoryAr: 'الاستراتيجية'
        },
        {
            titleEn: 'Risk Management', titleAr: 'إدارة المخاطر',
            descEn: 'Key risks and mitigation strategies', descAr: 'المخاطر الرئيسية واستراتيجيات التخفيف',
            route: '/strategy-operations', fragment: 'strategy-risk',
            categoryEn: 'Strategy', categoryAr: 'الاستراتيجية'
        },
        // ── Investor Relations ────────────────────────────────────────────────────
        {
            titleEn: 'Investor Relations', titleAr: 'علاقات المستثمرين',
            descEn: 'Financial results, governance and shareholder services', descAr: 'النتائج المالية والحوكمة وخدمات المساهمين',
            route: '/investors-governance', categoryEn: 'Pages', categoryAr: 'الصفحات'
        },
        {
            titleEn: 'Annual Reports', titleAr: 'التقارير السنوية',
            descEn: 'Audited financial results and annual disclosures', descAr: 'النتائج المالية المدققة والإفصاحات السنوية',
            route: '/investors-governance', fragment: 'annual-reports',
            categoryEn: 'Investors', categoryAr: 'المستثمرون'
        },
        {
            titleEn: 'Corporate Governance', titleAr: 'حوكمة الشركات',
            descEn: 'CMA compliance and governance framework', descAr: 'الامتثال لهيئة السوق المالية وإطار الحوكمة',
            route: '/investors-governance', fragment: 'corporate-actions',
            categoryEn: 'Investors', categoryAr: 'المستثمرون'
        },
        {
            titleEn: 'Stock Activity', titleAr: 'نشاط السهم',
            descEn: 'Tadawul 4192 share price and trading data', descAr: 'سعر سهم تداول 4192 وبيانات التداول',
            route: '/investors-governance', fragment: 'stock-activity',
            categoryEn: 'Investors', categoryAr: 'المستثمرون'
        },
        {
            titleEn: 'Financial Results', titleAr: 'النتائج المالية',
            descEn: 'SAR 758.8M revenue, FY2025 performance', descAr: 'إيرادات 758.8 مليون ريال، أداء 2025',
            route: '/investors-governance', fragment: 'financials',
            categoryEn: 'Investors', categoryAr: 'المستثمرون'
        },
        {
            titleEn: 'Fact Sheet', titleAr: 'نشرة المعلومات',
            descEn: 'Key company facts and financial highlights', descAr: 'الحقائق الرئيسية والأبرز المالية',
            route: '/investors-governance', fragment: 'fact-sheet',
            categoryEn: 'Investors', categoryAr: 'المستثمرون'
        },
        {
            titleEn: 'Investment Calculator', titleAr: 'حاسبة الاستثمار',
            descEn: 'Calculate your investment returns', descAr: 'احسب عوائد استثمارك',
            route: '/investors-governance', fragment: 'investment-calculator',
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

    // Show search dialog
    show() {
        // Detect language from HTML dir attribute or default to English
        const htmlDir = document.documentElement.getAttribute('dir');
        const isArabic = htmlDir === 'rtl';
        const dir = isArabic ? 'rtl' : 'ltr';

        // Create dialog HTML
        const dialogHTML = `
            <div class="search-dialog-overlay" id="search-dialog">
                <div class="search-dialog" dir="${dir}">
                    <div class="search-dialog-header">
                        <svg class="search-dialog-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                        </svg>
                        <span class="search-dialog-title">${isArabic ? 'البحث' : 'Search'}</span>
                        <button class="search-dialog-close" id="search-close">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="search-dialog-input-wrapper">
                        <input 
                            type="text" 
                            class="search-dialog-input" 
                            id="search-input"
                            placeholder="${isArabic ? 'ابحث عن صفحة أو موضوع...' : 'Search pages, topics...'}"
                            dir="${dir}"
                            autocomplete="off"
                        />
                        <div class="search-dialog-loading" id="search-loading" style="display: none;">
                            <div class="search-loading-spinner"></div>
                        </div>
                    </div>
                    <div class="search-dialog-results" id="search-results">
                        ${this.renderEmptyState(isArabic)}
                    </div>
                </div>
            </div>
        `;

        // Add to body
        const container = document.createElement('div');
        container.innerHTML = dialogHTML;
        document.body.appendChild(container);

        // Bind events
        this.bindEvents();

        // Focus input
        setTimeout(() => {
            document.getElementById('search-input')?.focus();
        }, 100);
    },

    // Bind events
    bindEvents() {
        const overlay = document.getElementById('search-dialog');
        const closeBtn = document.getElementById('search-close');
        const input = document.getElementById('search-input');

        console.log('Binding events...');
        console.log('Input element:', input);

        // Close on overlay click
        overlay?.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.close();
            }
        });

        // Close on button click
        closeBtn?.addEventListener('click', () => {
            this.close();
        });

        // Close on escape
        document.addEventListener('keydown', this.handleEscape);

        // Search on input - DIRECT binding
        if (input) {
            console.log('Adding input event listener...');
            input.addEventListener('input', (e) => {
                console.log('Input event fired! Value:', e.target.value);
                this.handleSearch(e.target.value);
            });
            
            // Also try keyup as backup
            input.addEventListener('keyup', (e) => {
                console.log('Keyup event fired! Value:', e.target.value);
                this.handleSearch(e.target.value);
            });
        } else {
            console.error('Input element not found!');
        }
    },

    // Handle escape key
    handleEscape(e) {
        if (e.key === 'Escape') {
            SearchDialog.close();
        }
    },

    // Handle search
    handleSearch(query) {
        console.log('handleSearch called with:', query);
        
        const loading = document.getElementById('search-loading');
        const results = document.getElementById('search-results');
        
        // Detect language
        const htmlDir = document.documentElement.getAttribute('dir');
        const isArabic = htmlDir === 'rtl';

        if (!query.trim()) {
            console.log('Query is empty, showing empty state');
            this.currentResults = [];
            if (results) {
                results.innerHTML = this.renderEmptyState(isArabic);
            }
            if (loading) loading.style.display = 'none';
            return;
        }

        // Show loading
        console.log('Showing loading...');
        if (loading) loading.style.display = 'flex';

        // Clear previous timeout
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        // Debounce search
        this.searchTimeout = setTimeout(() => {
            console.log('Performing search after debounce...');
            this.performSearch(query);
            if (loading) loading.style.display = 'none';
        }, 400);
    },

    // Perform search
    performSearch(query) {
        console.log('Searching for:', query);
        
        // Detect language
        const htmlDir = document.documentElement.getAttribute('dir');
        const isArabic = htmlDir === 'rtl';
        const q = query.toLowerCase().trim();

        // Auto-detect language from query
        const hasArabic = /[\u0600-\u06FF]/.test(query);
        const searchAsArabic = hasArabic || isArabic;

        // Search
        this.currentResults = this.searchData.filter(item => {
            return item.titleEn.toLowerCase().includes(q) ||
                   item.titleAr.includes(q) ||
                   item.descEn.toLowerCase().includes(q) ||
                   item.descAr.includes(q) ||
                   item.categoryEn.toLowerCase().includes(q) ||
                   item.categoryAr.includes(q);
        });

        console.log('Found results:', this.currentResults.length);

        // Render results
        const results = document.getElementById('search-results');
        if (results) {
            if (this.currentResults.length === 0) {
                results.innerHTML = this.renderNoResults(isArabic);
            } else {
                results.innerHTML = this.renderResults(searchAsArabic);
            }
        }
    },

    // Render empty state
    renderEmptyState(isArabic) {
        return `
            <div class="search-empty-state">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                </svg>
                <p>${isArabic ? 'اكتب للبحث في الموقع' : 'Type to search the site'}</p>
            </div>
        `;
    },

    // Render no results
    renderNoResults(isArabic) {
        return `
            <div class="search-empty-state">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.5L20.5,19L15.5,14M9.5,14C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14M6.47,10.82L8,12.35L9.53,10.82L10.59,11.88L9.06,13.41L10.59,14.94L9.53,16L8,14.47L6.47,16L5.41,14.94L6.94,13.41L5.41,11.88L6.47,10.82Z"/>
                </svg>
                <p>${isArabic ? 'لا توجد نتائج' : 'No results found'}</p>
            </div>
        `;
    },

    // Render results
    renderResults(isArabic) {
        const html = this.currentResults.map((item, index) => {
            const title = isArabic ? item.titleAr : item.titleEn;
            const desc = isArabic ? item.descAr : item.descEn;
            const category = isArabic ? item.categoryAr : item.categoryEn;

            return `
                <div class="search-result-item" data-route="${item.route}" data-fragment="${item.fragment || ''}" data-index="${index}" style="animation-delay: ${index * 50}ms">
                    <div class="search-result-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                        </svg>
                    </div>
                    <div class="search-result-content">
                        <div class="search-result-title">${title}</div>
                        <div class="search-result-desc">${desc}</div>
                    </div>
                    <div class="search-result-category">${category}</div>
                </div>
            `;
        }).join('');

        // Add click handlers after rendering
        setTimeout(() => {
            document.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const route = item.dataset.route;
                    const fragment = item.dataset.fragment;
                    this.navigateTo(route, fragment);
                });
            });
        }, 0);

        return html;
    },

    // Navigate to route
    navigateTo(route, fragment) {
        this.close();
        
        // Detect language
        const htmlDir = document.documentElement.getAttribute('dir');
        const isArabic = htmlDir === 'rtl';
        let fullPath = route;
        
        // Add .html extension if not present
        if (!fullPath.includes('.html') && fullPath !== '/') {
            fullPath += '.html';
        }
        
        // Add ar/ prefix for Arabic
        if (isArabic && !fullPath.startsWith('/ar/') && fullPath !== '/') {
            fullPath = 'ar/' + fullPath.replace(/^\//, '');
        }
        
        // Handle home page
        if (fullPath === '/') {
            fullPath = isArabic ? 'ar/index-new.html' : 'index-new.html';
        }
        
        // Navigate
        if (fragment) {
            window.location.href = fullPath + '#' + fragment;
            // Scroll to fragment after page load
            setTimeout(() => {
                const element = document.getElementById(fragment);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 600);
        } else {
            window.location.href = fullPath;
        }
    },

    // Close dialog
    close() {
        const dialog = document.getElementById('search-dialog');
        if (dialog) {
            dialog.parentElement.remove();
        }
        document.removeEventListener('keydown', this.handleEscape);
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SearchDialog;
}
