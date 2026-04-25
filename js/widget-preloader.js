// Widget Preloader - Preload and cache widgets for instant display
(function() {
    // Check if we're already on investors page
    const isInvestorsPage = window.location.pathname.includes('investors');
    
    // Cache key for widget data
    const CACHE_KEY = 'alsaif_widgets_cache';
    const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes
    
    // Function to check if cache is valid
    function isCacheValid() {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return false;
        
        try {
            const data = JSON.parse(cached);
            const now = Date.now();
            return (now - data.timestamp) < CACHE_DURATION;
        } catch (e) {
            return false;
        }
    }
    
    // Function to mark widgets as cached
    function markWidgetsCached() {
        const data = {
            timestamp: Date.now(),
            cached: true
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    }
    
    // If not on investors page, preload in background
    if (!isInvestorsPage) {
        // Wait for page to load first
        window.addEventListener('load', function() {
            // Wait 2 seconds to let current page settle
            setTimeout(function() {
                // Skip if already cached recently
                if (isCacheValid()) {
                    console.log('Widgets already cached');
                    return;
                }
                
                console.log('Starting widget preload in background...');
                
                // Detect language
                const htmlDir = document.documentElement.getAttribute('dir');
                const isArabic = htmlDir === 'rtl';
                
                // Build investors page URL
                const investorsUrl = isArabic ? 
                    window.location.origin + '/ar/investors.html' : 
                    window.location.origin + '/investors.html';
                
                // Preload the investors page HTML
                fetch(investorsUrl, {
                    method: 'GET',
                    cache: 'force-cache'
                }).then(function(response) {
                    return response.text();
                }).then(function(html) {
                    console.log('Investors page preloaded and cached');
                    markWidgetsCached();
                }).catch(function(err) {
                    console.log('Preload skipped:', err);
                });
                
                // Preload widget scripts domain
                const widgetDomain = 'https://widgets.financialcontent.com';
                const link = document.createElement('link');
                link.rel = 'dns-prefetch';
                link.href = widgetDomain;
                document.head.appendChild(link);
                
                // Preconnect to widget domain for faster loading
                const preconnect = document.createElement('link');
                preconnect.rel = 'preconnect';
                preconnect.href = widgetDomain;
                preconnect.crossOrigin = 'anonymous';
                document.head.appendChild(preconnect);
                
                console.log('Widget preload initiated');
            }, 2000);
        });
    } else {
        // On investors page, mark as cached after widgets load
        window.addEventListener('load', function() {
            setTimeout(function() {
                markWidgetsCached();
            }, 5000); // Wait 5 seconds for widgets to load
        });
    }
})();
