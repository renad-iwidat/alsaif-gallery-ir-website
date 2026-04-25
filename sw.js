// Service Worker for Al Saif Gallery Website
// يوفر التخزين المؤقت وتحسين الأداء

const CACHE_VERSION = 'v2.0.0'; // Network-First: Always fresh HTML
const CACHE_NAME = `alsaif-gallery-${CACHE_VERSION}`;
const WIDGET_CACHE = `alsaif-widgets-${CACHE_VERSION}`;

// Resources to cache (only static assets, NO HTML)
const PRECACHE_URLS = [
    '/css/main.css',
    '/css/variables.css',
    '/css/reset.css',
    '/css/components.css',
    '/css/shared-layout.css',
    '/css/responsive.css',
    '/css/animations.css',
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
    
    // Skip cross-origin requests (except widgets)
    if (url.origin !== location.origin && 
        url.hostname !== 'irp.atnmo.com' && 
        url.hostname !== 'widgets.financialcontent.com') {
        return;
    }
    
    // Handle external widget scripts - Cache-First for instant loading
    if (url.hostname === 'irp.atnmo.com' || url.hostname === 'widgets.financialcontent.com') {
        event.respondWith(
            caches.open(WIDGET_CACHE)
                .then((cache) => {
                    return cache.match(request)
                        .then((cachedResponse) => {
                            if (cachedResponse) {
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
    
    // Network-First for ALL HTML pages - ALWAYS get fresh content
    if (request.destination === 'document' || 
        request.url.endsWith('.html') ||
        request.mode === 'navigate') {
        event.respondWith(
            fetch(request, {
                cache: 'no-cache'
            })
                .then((networkResponse) => {
                    // Cache the fresh response for offline use
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
                    // Fallback to cache only if network completely fails
                    return caches.match(request)
                        .then(cachedResponse => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            return new Response('Offline - Page not available', {
                                status: 503,
                                headers: { 'Content-Type': 'text/html' }
                            });
                        });
                })
        );
        return;
    }
    
    // Cache-First for static assets (CSS, JS, images, fonts)
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version and update in background
                    fetch(request)
                        .then((networkResponse) => {
                            if (networkResponse && networkResponse.status === 200) {
                                caches.open(CACHE_NAME)
                                    .then((cache) => {
                                        cache.put(request, networkResponse);
                                    });
                            }
                        })
                        .catch(() => {});
                    return cachedResponse;
                }
                
                // Not in cache, fetch from network
                return fetch(request)
                    .then((networkResponse) => {
                        if (networkResponse && networkResponse.status === 200) {
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(request, responseToCache);
                                });
                        }
                        return networkResponse;
                    });
            })
    );
});

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
