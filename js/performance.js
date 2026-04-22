// Performance Optimization Module
// تحسينات الأداء للموقع

const PerformanceOptimizer = {
    // Cache for loaded resources
    cache: new Map(),
    
    // Initialize performance optimizations
    init() {
        this.setupResourceHints();
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupCriticalCSS();
        this.monitorPerformance();
    },
    
    // Setup resource hints for faster loading
    setupResourceHints() {
        // Preconnect to external domains
        const domains = [
            'https://irp.atnmo.com',
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];
        
        domains.forEach(domain => {
            // DNS prefetch
            const dnsPrefetch = document.createElement('link');
            dnsPrefetch.rel = 'dns-prefetch';
            dnsPrefetch.href = domain;
            document.head.appendChild(dnsPrefetch);
            
            // Preconnect
            const preconnect = document.createElement('link');
            preconnect.rel = 'preconnect';
            preconnect.href = domain;
            preconnect.crossOrigin = 'anonymous';
            document.head.appendChild(preconnect);
        });
    },
    
    // Setup lazy loading for images and iframes
    setupLazyLoading() {
        // Native lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            images.forEach(img => {
                img.src = img.dataset.src;
                img.loading = 'lazy';
            });
        } else {
            // Fallback to Intersection Observer
            this.setupIntersectionObserver(images);
        }
    },
    
    // Setup Intersection Observer for lazy loading
    setupIntersectionObserver(elements) {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.01
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.dataset.src) {
                        element.src = element.dataset.src;
                        element.removeAttribute('data-src');
                    }
                    
                    if (element.dataset.srcset) {
                        element.srcset = element.dataset.srcset;
                        element.removeAttribute('data-srcset');
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, options);
        
        elements.forEach(element => observer.observe(element));
    },
    
    // Optimize image loading
    setupImageOptimization() {
        // Add loading="lazy" to all images without it
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.loading = 'lazy';
        });
        
        // Decode images asynchronously
        const criticalImages = document.querySelectorAll('img[data-critical]');
        criticalImages.forEach(img => {
            if (img.decode) {
                img.decode().catch(() => {
                    // Fallback if decode fails
                    console.warn('Image decode failed:', img.src);
                });
            }
        });
    },
    
    // Setup critical CSS loading
    setupCriticalCSS() {
        // Load non-critical CSS asynchronously
        const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"][data-non-critical]');
        
        nonCriticalCSS.forEach(link => {
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
        });
    },
    
    // Monitor performance metrics
    monitorPerformance() {
        if (!window.performance || !window.PerformanceObserver) {
            return;
        }
        
        // Monitor Largest Contentful Paint (LCP)
        try {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.warn('LCP monitoring not supported');
        }
        
        // Monitor First Input Delay (FID)
        try {
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            console.warn('FID monitoring not supported');
        }
        
        // Monitor Cumulative Layout Shift (CLS)
        try {
            let clsScore = 0;
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsScore += entry.value;
                    }
                }
                console.log('CLS:', clsScore);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            console.warn('CLS monitoring not supported');
        }
        
        // Log page load metrics
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                const renderTime = perfData.domComplete - perfData.domLoading;
                
                console.log('Performance Metrics:');
                console.log('- Page Load Time:', pageLoadTime + 'ms');
                console.log('- Connect Time:', connectTime + 'ms');
                console.log('- Render Time:', renderTime + 'ms');
            }, 0);
        });
    },
    
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for performance
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Prefetch next page
    prefetchPage(url) {
        if (this.cache.has(url)) {
            return Promise.resolve(this.cache.get(url));
        }
        
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
        
        return fetch(url)
            .then(response => response.text())
            .then(html => {
                this.cache.set(url, html);
                return html;
            })
            .catch(error => {
                console.error('Prefetch failed:', error);
            });
    },
    
    // Preload critical resources
    preloadResource(url, type = 'script') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = type;
        
        if (type === 'script') {
            link.crossOrigin = 'anonymous';
        }
        
        document.head.appendChild(link);
    },
    
    // Optimize scroll performance
    optimizeScroll() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Your scroll handling code here
                    ticking = false;
                });
                ticking = true;
            }
        });
    },
    
    // Service Worker registration for caching
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('ServiceWorker registered:', registration);
                    })
                    .catch(error => {
                        console.log('ServiceWorker registration failed:', error);
                    });
            });
        }
    }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        PerformanceOptimizer.init();
    });
} else {
    PerformanceOptimizer.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}

window.PerformanceOptimizer = PerformanceOptimizer;
