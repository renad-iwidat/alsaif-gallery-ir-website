// Utility Functions
const Utils = {
    // DOM Utilities
    dom: {
        // Get element by ID
        get: (id) => document.getElementById(id),
        
        // Get elements by class name
        getByClass: (className) => document.getElementsByClassName(className),
        
        // Get elements by query selector
        query: (selector) => document.querySelector(selector),
        
        // Get all elements by query selector
        queryAll: (selector) => document.querySelectorAll(selector),
        
        // Create element
        create: (tag, className = '', innerHTML = '') => {
            const element = document.createElement(tag);
            if (className) element.className = className;
            if (innerHTML) element.innerHTML = innerHTML;
            return element;
        },
        
        // Add event listener
        on: (element, event, handler) => {
            if (element) element.addEventListener(event, handler);
        },
        
        // Remove event listener
        off: (element, event, handler) => {
            if (element) element.removeEventListener(event, handler);
        },
        
        // Add class
        addClass: (element, className) => {
            if (element) element.classList.add(className);
        },
        
        // Remove class
        removeClass: (element, className) => {
            if (element) element.classList.remove(className);
        },
        
        // Toggle class
        toggleClass: (element, className) => {
            if (element) element.classList.toggle(className);
        },
        
        // Check if element has class
        hasClass: (element, className) => {
            return element ? element.classList.contains(className) : false;
        }
    },
    
    // Local Storage Utilities
    storage: {
        // Set item
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Storage set error:', e);
                return false;
            }
        },
        
        // Get item
        get: (key, defaultValue = null) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.error('Storage get error:', e);
                return defaultValue;
            }
        },
        
        // Remove item
        remove: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Storage remove error:', e);
                return false;
            }
        },
        
        // Clear all
        clear: () => {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                console.error('Storage clear error:', e);
                return false;
            }
        }
    },
    
    // Responsive Utilities
    responsive: {
        // Get current breakpoint
        getCurrentBreakpoint: () => {
            const width = window.innerWidth;
            if (width < CONFIG.BREAKPOINTS.MOBILE) return 'mobile';
            if (width < CONFIG.BREAKPOINTS.TABLET) return 'tablet';
            if (width < CONFIG.BREAKPOINTS.DESKTOP) return 'desktop';
            return 'large-desktop';
        },
        
        // Check if mobile
        isMobile: () => window.innerWidth < CONFIG.BREAKPOINTS.MOBILE,
        
        // Check if tablet
        isTablet: () => {
            const width = window.innerWidth;
            return width >= CONFIG.BREAKPOINTS.MOBILE && width < CONFIG.BREAKPOINTS.DESKTOP;
        },
        
        // Check if desktop
        isDesktop: () => window.innerWidth >= CONFIG.BREAKPOINTS.DESKTOP,
        
        // Get horizontal padding based on screen size
        getHorizontalPadding: () => {
            const width = window.innerWidth;
            if (width >= CONFIG.BREAKPOINTS.LARGE_DESKTOP) {
                return 192; // Large desktop
            } else if (width >= CONFIG.BREAKPOINTS.DESKTOP) {
                return Math.max(8, (width * 0.1) - 8); // Desktop
            } else if (width >= CONFIG.BREAKPOINTS.MOBILE) {
                return 52; // Tablet
            } else {
                return 12; // Mobile
            }
        }
    },
    
    // Animation Utilities
    animation: {
        // Fade in element
        fadeIn: (element, duration = CONFIG.ANIMATIONS.NORMAL) => {
            if (!element) return;
            element.style.opacity = '0';
            element.style.display = 'block';
            
            let opacity = 0;
            const timer = setInterval(() => {
                opacity += 50 / duration;
                element.style.opacity = opacity;
                if (opacity >= 1) {
                    clearInterval(timer);
                    element.style.opacity = '1';
                }
            }, 50);
        },
        
        // Fade out element
        fadeOut: (element, duration = CONFIG.ANIMATIONS.NORMAL) => {
            if (!element) return;
            let opacity = 1;
            const timer = setInterval(() => {
                opacity -= 50 / duration;
                element.style.opacity = opacity;
                if (opacity <= 0) {
                    clearInterval(timer);
                    element.style.display = 'none';
                    element.style.opacity = '0';
                }
            }, 50);
        },
        
        // Slide up element
        slideUp: (element, duration = CONFIG.ANIMATIONS.NORMAL) => {
            if (!element) return;
            element.style.transform = 'translateY(20px)';
            element.style.opacity = '0';
            element.style.display = 'block';
            
            setTimeout(() => {
                element.style.transition = `all ${duration}ms ease-out`;
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, 10);
        },
        
        // Animate number counter
        animateNumber: (element, target, duration = CONFIG.ANIMATIONS.STATS, isDecimal = false, prefix = '', suffix = '') => {
            if (!element) return;
            
            let current = 0;
            const increment = target / (duration / 50);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                const displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
                element.textContent = `${prefix}${displayValue}${suffix}`;
            }, 50);
        }
    },
    
    // URL Utilities
    url: {
        // Get current path
        getCurrentPath: () => window.location.pathname,
        
        // Get query parameters
        getQueryParams: () => {
            const params = new URLSearchParams(window.location.search);
            const result = {};
            for (const [key, value] of params) {
                result[key] = value;
            }
            return result;
        },
        
        // Navigate to URL
        navigate: (url) => {
            window.location.href = url;
        },
        
        // Open URL in new tab
        openInNewTab: (url) => {
            window.open(url, '_blank');
        }
    },
    
    // String Utilities
    string: {
        // Capitalize first letter
        capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
        
        // Truncate string
        truncate: (str, length, suffix = '...') => {
            return str.length > length ? str.substring(0, length) + suffix : str;
        },
        
        // Remove HTML tags
        stripHtml: (str) => str.replace(/<[^>]*>/g, ''),
        
        // Escape HTML
        escapeHtml: (str) => {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }
    },
    
    // Validation Utilities
    validate: {
        // Validate email
        email: (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        
        // Validate phone
        phone: (phone) => {
            const re = /^[\+]?[1-9][\d]{0,15}$/;
            return re.test(phone.replace(/\s/g, ''));
        },
        
        // Check if empty
        isEmpty: (value) => {
            return !value || value.trim() === '';
        }
    },
    
    // Debounce function
    debounce: (func, wait) => {
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
    
    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format number with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Generate unique ID
    generateId: () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Deep clone object
    deepClone: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}