// Cache Manager - Auto-clear cache on version change
(function() {
    const CURRENT_VERSION = '2.1.0';
    const VERSION_KEY = 'app_version';
    
    // Check if version changed
    const storedVersion = localStorage.getItem(VERSION_KEY);
    
    if (storedVersion && storedVersion !== CURRENT_VERSION) {
        console.log(`Version changed from ${storedVersion} to ${CURRENT_VERSION}. Clearing cache...`);
        
        // Clear Service Worker caches
        if ('caches' in window) {
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        return caches.delete(cacheName);
                    })
                );
            }).then(() => {
                console.log('All caches cleared');
            });
        }
        
        // Clear localStorage except language preference
        const lang = localStorage.getItem('lang');
        localStorage.clear();
        if (lang) {
            localStorage.setItem('lang', lang);
        }
        
        // Update version
        localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
        
        // Force hard reload
        window.location.reload(true);
    } else if (!storedVersion) {
        // First visit
        localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    }
})();
