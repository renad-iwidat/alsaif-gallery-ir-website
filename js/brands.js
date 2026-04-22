// Brands Page Script

// Translations for Brands Page
const brandsTranslations = {
    ar: {
        pageTitle: 'محفظة العلامات التجارية',
        intro: 'تمتلك الشركة محفظة متنوعة من العلامات التجارية تضم علامات ملكية وعلامات دولية موزعة عبر شبكة صالات العرض. تغطي المحفظة فئات متعددة، بما في ذلك الأجهزة المنزلية وأدوات المطبخ. خلال السنة المالية 2025، أضافت الشركة علامات تجارية رئيسية لمجموعة الأجهزة المنزلية الصغيرة في نطاقها المتميز، مدعومة بالموثوقية والضمان وتوافر قطع الغيار.',
        proprietaryTitle: 'العلامات التجارية الملكية',
        proprietarySubtitle: 'الأجهزة المنزلية وأدوات المطبخ',
        edisonDesc: 'أجهزة منزلية صغيرة وكبيرة مصممة لتلبية متطلبات الاستخدام المنزلي اليومي، بما في ذلك منتجات مخصصة لتحضير المأكولات التقليدية.',
        tornadoDesc: 'مجموعة متنوعة من أدوات المطبخ المصممة لتحضير الطعام والطهي اليومي.',
        rockyDesc: 'أدوات الطهي والتحضير المصممة للاستخدام الآمن، وتتميز بمتانتها.',
        robustDesc: 'أدوات التقديم والمطبخ المصممة للاستخدام المنزلي، مع التركيز على المتانة والوظائف العملية.',
        storageTitle: 'علامات التخزين والتقديم وإكسسوارات الضيافة',
        storageText: 'تشمل محفظة الشركة عدداً من العلامات التجارية المتخصصة في التخزين والتقديم وإكسسوارات الضيافة المنزلية. وتشمل هذه العلامات:',
        internationalTitle: 'الشراكات والعلامات الدولية',
        internationalText: 'تشمل محفظة المنتجات بالإضافة إلى ذلك علامات تجارية دولية موزعة من خلال صالات عرض الشركة.',
        tableBrandHeader: 'العلامة التجارية',
        tableCountryHeader: 'بلد المنشأ',
        countryGermany: 'ألمانيا',
        countryTurkey: 'تركيا',
        noteLabel: 'ملاحظة: ',
        noteText: 'جميع العلامات التجارية الملكية (إديسون، تورنادو، روكي، روبست) مصممة ومحددة للأسر السعودية، مع ما يقرب من 80٪ من إيراداتنا المتدفقة من خلال العلامات التجارية الملكية والحصرية.'
    },
    en: {
        pageTitle: 'Brand Portfolio',
        intro: 'The Company holds a diversified portfolio of brands comprising both proprietary and international brands distributed through its showroom network. This portfolio covers multiple categories, including household essentials and kitchen appliances. During the fiscal year 2025, the Company added major kitchen appliances to its product range, supported by delivery, installation, warranty, and spare parts availability services.',
        proprietaryTitle: 'Proprietary Brands',
        proprietarySubtitle: 'Home Appliances and Kitchen Tools',
        edisonDesc: 'Small and large home appliances designed to meet everyday household usage requirements, including products dedicated to traditional cuisine preparation.',
        tornadoDesc: 'A diverse range of kitchen tools designed for daily food preparation and cooking.',
        rockyDesc: 'Cookware and preparation tools engineered for safe use, distinguished by their durability.',
        robustDesc: 'Serving and kitchen tools designed for home use, with an emphasis on durability and practical functionality.',
        storageTitle: 'Storage, Serving, and Hospitality Accessory Brands',
        storageText: 'The Company\'s portfolio includes a number of branded lines specialized in vacuum flasks, serving ware, and beverage accessories for domestic hospitality use. These brands include:',
        internationalTitle: 'International Partnerships and Brands',
        internationalText: 'The product portfolio additionally includes international brands distributed through the Company\'s showrooms.',
        tableBrandHeader: 'Brand',
        tableCountryHeader: 'Country of Origin',
        countryGermany: 'Germany',
        countryTurkey: 'Turkey',
        noteLabel: 'Note: ',
        noteText: 'All proprietary brands (Edison, Tornado, Rocky, Robust) are designed and specified for Saudi households, with approximately 80% of our revenue flowing through brands we own or exclusively distribute.'
    }
};

// Update page content based on language
function updateBrandsPageLanguage() {
    const currentLang = document.documentElement.lang || 'ar';
    const t = brandsTranslations[currentLang];
    
    // Update page title
    document.title = `${t.pageTitle} | ${currentLang === 'ar' ? 'السيف غاليري' : 'Al Saif Gallery'}`;
    
    // Update all text elements
    const elements = {
        'brands-dialog-title': t.pageTitle,
        'brands-intro': t.intro,
        'proprietary-title': t.proprietaryTitle,
        'proprietary-subtitle': t.proprietarySubtitle,
        'edison-desc': t.edisonDesc,
        'tornado-desc': t.tornadoDesc,
        'rocky-desc': t.rockyDesc,
        'robust-desc': t.robustDesc,
        'storage-title': t.storageTitle,
        'storage-text': t.storageText,
        'international-title': t.internationalTitle,
        'international-text': t.internationalText,
        'table-brand-header': t.tableBrandHeader,
        'table-country-header': t.tableCountryHeader,
        'country-germany-1': t.countryGermany,
        'country-germany-2': t.countryGermany,
        'country-turkey-1': t.countryTurkey,
        'country-turkey-2': t.countryTurkey,
        'note-label': t.noteLabel,
        'note-text': t.noteText
    };
    
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    updateBrandsPageLanguage();
    
    // Listen for language changes
    window.addEventListener('languageChanged', function(e) {
        updateBrandsPageLanguage();
    });
});
