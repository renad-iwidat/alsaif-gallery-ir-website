// ============================================================================
// AGGRESSIVE CACHE MANAGER - Forces updates immediately
// ============================================================================
(function() {
    'use strict';
    
    // CRITICAL: Version is loaded from version.js
    const CURRENT_VERSION = window.ALSAIF_VERSION || '2.1.5';
    const VERSION_KEY = 'alsaif_app_version';
    
    // Get stored version
    const storedVersion = localStorage.getItem(VERSION_KEY);
    
    // Check if we need to update
    const needsUpdate = !storedVersion || storedVersion !== CURRENT_VERSION;
    
    if (needsUpdate) {
        console.log('🔄 CACHE UPDATE REQUIRED');
        console.log(`   Version: ${storedVersion || 'none'} → ${CURRENT_VERSION}`);
        
        // Clear everything
        clearAllCaches().then(() => {
            // Update version
            localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
            
            // Force reload if version changed (not first visit)
            if (storedVersion) {
                console.log('🔃 Reloading page...');
                window.location.reload(true);
            } else {
                console.log('✅ First visit - cache initialized');
            }
        });
    } else {
        console.log('✓ Cache up to date (v' + CURRENT_VERSION + ')');
    }
    
    // Clear all caches function
    async function clearAllCaches() {
        const promises = [];
        
        // 1. Service Worker caches
        if ('caches' in window) {
            promises.push(
                caches.keys().then(names => 
                    Promise.all(names.map(name => caches.delete(name)))
                )
            );
        }
        
        // 2. Unregister service workers
        if ('serviceWorker' in navigator) {
            promises.push(
                navigator.serviceWorker.getRegistrations().then(regs =>
                    Promise.all(regs.map(reg => reg.unregister()))
                )
            );
        }
        
        // 3. Clear sessionStorage
        try {
            const lang = sessionStorage.getItem('lang');
            sessionStorage.clear();
            if (lang) sessionStorage.setItem('lang', lang);
        } catch (e) {}
        
        await Promise.all(promises);
        console.log('✅ All caches cleared');
    }
    
})();
