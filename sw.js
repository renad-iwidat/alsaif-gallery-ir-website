// Service Worker for Al Saif Gallery Website
// يوفر التخزين المؤقت وتحسين الأداء

const CACHE_VERSION = 'v1.0.6'; // Cache-First for widgets
const CACHE_NAME = `alsaif-gallery-${CACHE_VERSION}`;
const WIDGET_CACHE = `alsaif-widgets-${CACHE_VERSION}`;

// Resources to cache immediately
const PRECACHE_URLS = [
    '/',
    '/index-new.html',
    '/css/main.css',
    '/css/variables.css',
    '/css/reset.css',
    '/css/components.css',
    '/css/shared-layout.css',
    '/css/responsive.css',
    '/js/main.js',
    '/js/config.js',
    '/js/utils.js',
    '/js/localization.js',
    '/js/router.js',
    '/js/shared-components.js',
    '/js/performance.js',
    '/assets/images/Al_Saif_Logo.svg'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Precaching resources');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => {
                console.log('[ServiceWorker] Installed successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[ServiceWorker] Installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[ServiceWorker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[ServiceWorker] Activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Handle external widget scripts - Cache-First strategy for instant loading
    if (url.hostname === 'irp.atnmo.com' || url.hostname === 'widgets.financialcontent.com') {
        event.respondWith(
            caches.open(WIDGET_CACHE)
                .then((cache) => {
                    return cache.match(request)
                        .then((cachedResponse) => {
                            // Return cached version immediately if available
                            if (cachedResponse) {
                                console.log('[ServiceWorker] Serving widget from cache:', url.pathname);
                                // Update cache in background
                                fetch(request)
                                    .then((networkResponse) => {
                                        if (networkResponse && networkResponse.status === 200) {
                                            cache.put(request, networkResponse.clone());
                                        }
                                    })
                                    .catch(() => {});
                                return cachedResponse;
                            }
                            
                            // Not in cache, fetch from network
                            console.log('[ServiceWorker] Fetching widget from network:', url.pathname);
                            return fetch(request)
                                .then((networkResponse) => {
                                    if (networkResponse && networkResponse.status === 200) {
                                        cache.put(request, networkResponse.clone());
                                    }
                                    return networkResponse;
                                })
                                .catch(() => {
                                    return new Response('Widget unavailable', {
                                        status: 503,
                                        statusText: 'Service Unavailable'
                                    });
                                });
                        });
                })
        );
        return;
    }
    
    // Skip other cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }
    
    // For HTML pages with widgets, use network first to get fresh content
    if (request.url.includes('investors.html')) {
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    // Cache the response
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(request, responseToCache);
                            });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    // Fallback to cache if network fails
                    return caches.match(request);
                })
        );
        return;
    }
    
    // Strategy: Cache First, falling back to Network
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version and update cache in background
                    updateCache(request);
                    return cachedResponse;
                }
                
                // Not in cache, fetch from network
                return fetch(request)
                    .then((networkResponse) => {
                        // Cache successful responses
                        if (networkResponse && networkResponse.status === 200) {
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(request, responseToCache);
                                });
                        }
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('[ServiceWorker] Fetch failed:', error);
                        
                        // Return offline page for navigation requests
                        if (request.mode === 'navigate') {
                            return caches.match('/offline.html');
                        }
                        
                        throw error;
                    });
            })
    );
});

// Update cache in background
function updateCache(request) {
    fetch(request)
        .then((response) => {
            if (response && response.status === 200) {
                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(request, response);
                    });
            }
        })
        .catch(() => {
            // Silently fail - we already have cached version
        });
}

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME)
            .then(() => {
                event.ports[0].postMessage({ success: true });
            });
    }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

// Sync data when back online
function syncData() {
    return new Promise((resolve) => {
        console.log('[ServiceWorker] Syncing data...');
        // Implement your sync logic here
        resolve();
    });
}

// Push notification support (for future use)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New update available',
        icon: '/assets/images/Al_Saif_Logo.svg',
        badge: '/assets/images/Al_Saif_Logo.svg',
        vibrate: [200, 100, 200]
    };
    
    event.waitUntil(
        self.registration.showNotification('Al Saif Gallery', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});
