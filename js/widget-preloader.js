// Widget Preloader - Preload widgets in background for instant display
(function() {
    // Check if we're already on investors page
    const isInvestorsPage = window.location.pathname.includes('investors');
    
    // If not on investors page, preload widgets in background
    if (!isInvestorsPage) {
        // Wait for page to load first
        window.addEventListener('load', function() {
            // Wait 2 seconds to let current page settle
            setTimeout(function() {
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
                    mode: 'no-cors',
                    cache: 'force-cache'
                }).then(function() {
                    console.log('Investors page preloaded');
                }).catch(function(err) {
                    console.log('Preload skipped:', err);
                });
                
                // Preload widget scripts
                const widgetDomain = 'https://widgets.financialcontent.com';
                const link = document.createElement('link');
                link.rel = 'dns-prefetch';
                link.href = widgetDomain;
                document.head.appendChild(link);
                
                console.log('Widget preload initiated');
            }, 2000);
        });
    }
})();
