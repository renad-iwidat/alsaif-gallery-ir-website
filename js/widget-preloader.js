// Widget Preloader - Advanced preloading with multiple strategies
(function() {
    // Check if we're already on investors page
    const isInvestorsPage = window.location.pathname.includes('investors');
    
    // Cache key for widget data
    const CACHE_KEY = 'alsaif_widgets_cache';
    const CACHE_DURATION = 1000 * 60 * 60; // 60 minutes (increased from 30)
    
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
    
    // Preload widget domain resources
    function preloadWidgetResources() {
        const widgetDomain = 'https://widgets.financialcontent.com';
        const irpDomain = 'https://irp.atnmo.com';
        
        // DNS prefetch
        ['dns-prefetch', 'preconnect'].forEach(function(rel) {
            [widgetDomain, irpDomain].forEach(function(domain) {
                const link = document.createElement('link');
                link.rel = rel;
                link.href = domain;
                if (rel === 'preconnect') {
                    link.crossOrigin = 'anonymous';
                }
                document.head.appendChild(link);
            });
        });
    }
    
    // If not on investors page, preload aggressively
    if (!isInvestorsPage) {
        // Immediate preload of widget domains (no wait)
        preloadWidgetResources();
        
        // Wait for page to load first
        window.addEventListener('load', function() {
            // Shorter wait time - 1 second instead of 2
            setTimeout(function() {
                // Skip if already cached recently
                if (isCacheValid()) {
                    console.log('Widgets already cached (valid for ' + 
                        Math.round((CACHE_DURATION - (Date.now() - JSON.parse(localStorage.getItem(CACHE_KEY)).timestamp)) / 60000) + 
                        ' more minutes)');
                    return;
                }
                
                console.log('Starting aggressive widget preload...');
                
                // Detect language
                const htmlDir = document.documentElement.getAttribute('dir');
                const isArabic = htmlDir === 'rtl';
                
                // Build investors page URL
                const investorsUrl = isArabic ? 
                    window.location.origin + '/ar/investors.html' : 
                    window.location.origin + '/investors.html';
                
                // Use high priority fetch
                fetch(investorsUrl, {
                    method: 'GET',
                    cache: 'force-cache',
                    priority: 'high'
                }).then(function(response) {
                    return response.text();
                }).then(function(html) {
                    console.log('Investors page preloaded and cached');
                    markWidgetsCached();
                    
                    // Parse HTML and preload widget scripts
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const scripts = doc.querySelectorAll('script[src*="irp.atnmo.com"]');
                    
                    // Preload each widget script
                    scripts.forEach(function(script, index) {
                        setTimeout(function() {
                            const link = document.createElement('link');
                            link.rel = 'prefetch';
                            link.as = 'script';
                            link.href = script.src;
                            document.head.appendChild(link);
                            console.log('Prefetching widget script:', script.src);
                        }, index * 100);
                    });
                }).catch(function(err) {
                    console.log('Preload skipped:', err);
                });
                
                console.log('Widget preload initiated');
            }, 1000); // Reduced from 2000ms to 1000ms
        });
    } else {
        // On investors page, mark as cached after widgets load
        window.addEventListener('load', function() {
            setTimeout(function() {
                markWidgetsCached();
                console.log('Widgets cached for future visits');
            }, 3000); // Reduced from 5000ms to 3000ms
        });
    }
    
    // Prefetch on hover over investor links (predictive loading)
    document.addEventListener('DOMContentLoaded', function() {
        const investorLinks = document.querySelectorAll('a[href*="investors"]');
        investorLinks.forEach(function(link) {
            link.addEventListener('mouseenter', function() {
                if (!isCacheValid()) {
                    preloadWidgetResources();
                }
            }, { once: true });
        });
    });
})();
