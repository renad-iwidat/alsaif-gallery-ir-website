// Localization System
const Localization = {
    // Current language state
    currentLanguage: 'ar',
    
    // Initialize localization
    init() {
        // Load language from localStorage
        const savedLang = Utils.storage.get(CONFIG.STORAGE_KEYS.LANGUAGE, CONFIG.DEFAULTS.LANGUAGE);
        this.setLanguage(savedLang);
    },
    
    // Set language and update UI
    setLanguage(lang) {
        this.currentLanguage = lang;
        Utils.storage.set(CONFIG.STORAGE_KEYS.LANGUAGE, lang);
        
        // Update document attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update body classes
        document.body.className = document.body.className.replace(/\b(ar|ltr)\b/g, '');
        document.body.classList.add(lang === 'ar' ? 'ar' : 'ltr');
        
        // Trigger language change event
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    },
    
    // Toggle language
    toggleLanguage() {
        const newLang = this.currentLanguage === 'ar' ? 'en' : 'ar';
        this.setLanguage(newLang);
    },
    
    // Check if current language is Arabic
    isArabic() {
        return this.currentLanguage === 'ar';
    },
    
    // Get text direction
    getDirection() {
        return this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    },
    
    // Get localized text
    t(key) {
        return this.texts[key] ? this.texts[key][this.currentLanguage] || this.texts[key]['en'] : key;
    },
    
    // All localized texts
    texts: {
        // Top Bar
        topBarDocuments: { ar: 'مكتبة الوثائق', en: 'Documents Library' },
        topBarContact: { ar: 'تواصل معنا', en: 'Contact' },
        topBarSearch: { ar: 'بحث', en: 'Search' },
        topBarLangToggle: { ar: 'English', en: 'العربية' },
        
        // Navigation
        navHome: { ar: 'الرئيسية', en: 'Home' },
        navAboutUs: { ar: 'من نحن', en: 'About Us' },
        navStrategy: { ar: 'الاستراتيجية والعمليات', en: 'Strategy & Operations' },
        navInvestors: { ar: 'علاقات المستثمرين', en: 'Investor Relations' },
        navNewsroom: { ar: 'الأخبار والوظائف', en: 'Newsroom & Careers' },
        
        // Hero Section
        heroTitle: { 
            ar: 'بيت الأسرة السعودية\nمنذ ‎1993‏.', 
            en: "Saudi Arabia's Home\nSince 1993." 
        },
        heroSubtitle: { 
            ar: 'ثلاثة عقود في خدمة الأسرة السعودية. هدفنا واحد: جودة تُبنى عليها الثقة، كل يوم', 
            en: 'Thirty years of serving Saudi households. One purpose: trusted quality, every day.' 
        },
        heroDesc1: { 
            ar: 'السيف غاليري وجهة متخصصة في المملكة العربية السعودية لمستلزمات المنزل وأجهزة المطبخ، انطلقت من معرض واحد في الرياض لتصبح اليوم منصة تجزئة وطنية تضم ‎73‏ صالة عرض عبر المملكة ودول مجلس التعاون الخليجي. ومنذ إدراجها في السوق المالية السعودية (تداول) عام ‎2022‏، تجمع السيف غاليري بين مزايا الشركة المدرجة وانضباط التشغيل الذي بنى ثقة الأسر السعودية على مدى ثلاثة عقود.', 
            en: "Al Saif Gallery is Saudi Arabia's specialist in household essentials and kitchen appliances, built from a single Riyadh showroom into a national retail platform of 73 locations across the Kingdom and the GCC. Listed on Tadawul since 2022, we combine the scale of a public company with the discipline of an operator that has earned household trust for three decades." 
        },
        heroDesc2: { 
            ar: 'يقوم نموذج أعمالنا على علامات تجارية مملوكة وحصرية، في مقدمتها إيدسون وتورنادو وروبست وروكي، صُمّمت ووُضّعت مواصفاتها للبيت السعودي ومطبخه وضيافته. وكل منتج نقدمه هو اختيار مدروس: جودة تكسب الولاء، وقيمة تحترم العميل.', 
            en: 'Our model is powered by proprietary and exclusive brands, including Edison, Tornado, Robust, and Rocky, designed and specified for Saudi homes, Saudi kitchens, and Saudi hospitality traditions. Every product we carry reflects a deliberate choice: quality that earns loyalty, value that respects the customer.' 
        },
        heroExploreStory: { ar: 'اكتشف قصتنا', en: 'Explore Our Story' },
        heroInvestorRelations: { ar: 'علاقات المستثمرين', en: 'Investor Relations' },
        
        // Stats Section
        statsShowrooms: { ar: 'صالة عرض', en: 'Showrooms' },
        statsShowroomsSubtitle: { ar: 'في المملكة و‎4‏ دول خليجية', en: 'Saudi Arabia & 4 GCC countries' },
        statsRevenue: { ar: 'الإيرادات', en: 'Revenue' },
        statsRevenueSubtitle: { ar: 'الأداء المالي لعام ‎2025‏', en: 'FY 2025 Performance' },
        statsPropRevenue: { ar: 'إيرادات العلامات الخاصة', en: 'Proprietary Revenue' },
        statsPropRevenueSubtitle: { ar: 'علامات مملوكة وحصرية', en: 'Owned & exclusive brands' },
        statsEcommerce: { ar: 'نمو التجارة الإلكترونية', en: 'E-Commerce Growth' },
        statsEcommerceSubtitle: { ar: '‎94‏ مليون ريال مبيعات رقمية', en: 'SAR 94M digital sales' },
        
        // Brands Section
        brandsTitle: { 
            ar: 'علامات تجارية يثق بها العملاء ويعودون إليها', 
            en: 'Built on Brands Customers Return To' 
        },
        brandsDesc1: { 
            ar: 'نقوم بتصميم وتوريد وتقديم مستلزمات المنزل عبر فئات يعتمد عليها العملاء في حياتهم اليومية ويعودون لشرائها باستمرار. ويقوم نموذج أعمالنا على ثلاث ركائز رئيسية متكاملة: محفظة من العلامات التجارية المملوكة المصممة خصيصًا لتلبية احتياجات الأسر السعودية، وشبكة وطنية من صالات العرض مدعومة بمستودع مركزي ومركز توزيع في جدة، ومنظومة متكاملة لخدمات ما بعد البيع تشمل الضمان والصيانة وتوفير قطع الغيار؛ بما يحوّل عملية الشراء إلى علاقة طويلة الأمد مع العميل.', 
            en: 'We source, design, and deliver household essentials across categories customers buy repeatedly and rely on daily. Our platform is structured around three reinforcing strengths: a proprietary brand portfolio with specifications tailored to Saudi households; a national showroom network supported by centralized warehousing and a Jeddah fulfillment center; and integrated service infrastructure covering warranty, repair, and spare parts that transforms a purchase into a lasting relationship.' 
        },
        brandsDesc2: { 
            ar: 'هذا ليس نموذج تجارة تجزئة تقليدي، إذ تعمل السيف غاليري في قطاع متخصص محدد المعالم، في فئات الأدوات المنزلية وأجهزة المطبخ حيث نتمتع بموقع ريادي في المملكة العربية السعودية، ونقدم فيها جودة موثوقة بقيمة تنافسية. وتطورت علامة إديسون -من أكثر العلامات شهرة في الأجهزة المنزلية الصغيرة في المملكة- إلى منظومة متكاملة للأجهزة المنزلية، تشمل الثلاجات والغسالات وأنظمة التكييف وحلول المطابخ المدمجة.', 
            en: 'This is not generic retail. Al Saif Gallery operates in a carefully defined niche: the household goods and kitchen appliances categories where we hold a leading position in Saudi Arabia, delivering dependable quality at competitive value. Our Edison brand has grown from the country\'s most recognized small appliance label into a full home ecosystem, including refrigerators, washing machines, air conditioning, and built-in kitchen solutions.' 
        },
        
        // Service Cards
        cardStrategyTitle: { ar: 'الاستراتيجية والعمليات', en: 'Strategy & Operations' },
        cardStrategyDesc: { 
            ar: 'كيف ننمو بانضباط: شبكة الفروع، محفظة العلامات التجارية، القنوات الرقمية، وخدمات ما بعد البيع.', 
            en: 'How we grow with discipline: store network, brand portfolio, digital channels, and after-sales capabilities.' 
        },
        cardStrategyLink: { ar: 'اكتشف الاستراتيجية', en: 'Explore Strategy' },
        
        cardInvestorsTitle: { ar: 'علاقات المستثمرين', en: 'Investor Relations' },
        cardInvestorsDesc: { 
            ar: 'النتائج المالية، والإفصاحات التنظيمية، وهيكل مجلس الإدارة، وخدمات المساهمين لمستثمري تداول.', 
            en: 'Financial results, regulatory disclosures, board structure, and shareholder services for Tadawul investors.' 
        },
        cardInvestorsLink: { ar: 'مركز المستثمرين', en: 'Investor Center' },
        
        cardBrandsTitle: { ar: 'علاماتنا التجارية', en: 'Our Brands' },
        cardBrandsDesc: { 
            ar: 'إيدسون، تورنادو، روبست، روكي وغيرها. علامات خاصة وحصرية صُمّمت للبيت السعودي والضيافة الخليجية.', 
            en: 'Edison, Tornado, Robust, Rocky, and more. Proprietary and exclusive brands engineered for Saudi homes and hospitality.' 
        },
        cardBrandsLink: { ar: 'محفظة العلامات التجارية', en: 'Brand Portfolio' },
        
        cardCareersTitle: { ar: 'الوظائف والثقافة المؤسسية', en: 'Careers & Culture' },
        cardCareersDesc: { 
            ar: 'انضم إلى فريق يخدم الأسرة السعودية عبر ‎73‏ صالة عرض. فرص في التجزئة واللوجستيات والرقمي والوظائف المؤسسية.', 
            en: 'Join a team serving Saudi households across 73 locations. Explore opportunities in retail, logistics, digital, and corporate functions.' 
        },
        cardCareersLink: { ar: 'استكشف الوظائف', en: 'Explore Roles' },
        
        // Footer
        footerCtaTitle: { 
            ar: 'تبحث عن تسوّق من أكثر من 15,000 منتج؟', 
            en: 'Looking to shop our full range of 15,000+ products?' 
        },
        footerCtaSubtitle: { 
            ar: 'زُر متجر السيف غاليري الإلكتروني للتوصيل السريع في المملكة ودول الخليج.', 
            en: 'Visit the Al Saif Gallery online store for fast delivery across the Kingdom and the GCC.' 
        },
        footerCtaButton: { ar: 'تسوق الآن', en: 'Visit the Online Store' },
        
        footerEstablished: { ar: 'تأسست عام 1993', en: 'Established in 1993' },
        footerCompany: { ar: 'الشركة', en: 'Company' },
        footerAboutUs: { ar: 'من نحن', en: 'About Us' },
        footerStrategy: { ar: 'الاستراتيجية', en: 'Strategy' },
        footerCareers: { ar: 'الوظائف', en: 'Careers' },
        footerInvestors: { ar: 'المستثمرون', en: 'Investors' },
        footerAnnualReports: { ar: 'التقارير السنوية', en: 'Annual Reports' },
        footerGovernance: { ar: 'الحوكمة', en: 'Governance' },
        footerReports: { ar: 'التقارير', en: 'Reports & Filings' },
        footerContact: { ar: 'تواصل معنا', en: 'Contact' },
        footerIR: { ar: 'علاقات المستثمرين', en: 'Investor Relations' },
        footerCopyright: { 
            ar: '© 2025 معرض السيف للأجهزة المنزلية. جميع الحقوق محفوظة.', 
            en: '© 2025 Al Saif Gallery. All rights reserved.' 
        },
        footerPrivacy: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
        footerTerms: { ar: 'الشروط والأحكام', en: 'Terms of Service' },
        footerCorporateGov: { ar: 'حوكمة الشركات', en: 'Corporate Governance' },
        
        // Common
        loading: { ar: 'جاري التحميل...', en: 'Loading...' },
        error: { ar: 'حدث خطأ', en: 'An error occurred' },
        close: { ar: 'إغلاق', en: 'Close' },
        cancel: { ar: 'إلغاء', en: 'Cancel' },
        confirm: { ar: 'تأكيد', en: 'Confirm' },
        save: { ar: 'حفظ', en: 'Save' },
        edit: { ar: 'تعديل', en: 'Edit' },
        delete: { ar: 'حذف', en: 'Delete' },
        search: { ar: 'بحث', en: 'Search' },
        noResults: { ar: 'لا توجد نتائج', en: 'No results found' },
        
        // Language Dialog
        languageTitle: { ar: 'اللغة', en: 'Language' },
        languageArabic: { ar: 'العربية', en: 'العربية' },
        languageEnglish: { ar: 'English', en: 'English' }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Localization;
}