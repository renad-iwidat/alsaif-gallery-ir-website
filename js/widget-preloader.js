// Widget Preloader - Simple and reliable
(function() {
    // Check if we're already on investors page
    const isInvestorsPage = window.location.pathname.includes('investors');
    
    // Skip preloading if already on investors page
    if (isInvestorsPage) {
        return;
    }
    
    // Simple preload after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            console.log('Preloading investor page resources...');
            
            // Detect language
            const htmlDir = document.documentElement.getAttribute('dir');
            const isArabic = htmlDir === 'rtl';
            
            // Preload widget domains
            const domains = [
                'https://widgets.financialcontent.com',
                'https://irp.atnmo.com'
            ];
            
            domains.forEach(function(domain) {
                const link = document.createElement('link');
                link.rel = 'dns-prefetch';
                link.href = domain;
                document.head.appendChild(link);
            });
            
            console.log('Widget domains preloaded');
        }, 2000);
    });
})();
