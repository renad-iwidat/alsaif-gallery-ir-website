// ============================================================================
// Home Page Animations
// ============================================================================

(function() {
    'use strict';
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize animations on page load
    function initAnimations() {
        // Animate elements on scroll
        const animateElements = document.querySelectorAll('.animate-on-scroll, .brand-card, .service-card, .section-title, .fade-in, .scale-in, .slide-in-left, .slide-in-right');
        
        animateElements.forEach(function(element) {
            observer.observe(element);
        });
        
        // Counter animation for numbers
        animateCounters();
        
        // Image lazy loading with fade in
        lazyLoadImages();
    }
    
    // Counter animation for stats/numbers
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number, [data-count]');
        
        counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-count') || counter.textContent.replace(/[^0-9]/g, ''));
            
            if (isNaN(target)) return;
            
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const timer = setInterval(function() {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            counter.textContent = Math.floor(current).toLocaleString();
                        }, 16);
                        
                        counterObserver.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            
            counterObserver.observe(counter);
        });
    }
    
    // Lazy load images with fade in effect
    function lazyLoadImages() {
        const images = document.querySelectorAll('.brand-card img, .service-card img');
        
        images.forEach(function(img) {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    img.classList.add('loaded');
                });
            }
        });
    }
    
    // Add stagger animation to brand cards
    function staggerBrandCards() {
        const brandCards = document.querySelectorAll('.brand-card');
        const brandObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Trigger animation for all cards when first one is visible
                    brandCards.forEach(function(card) {
                        card.classList.add('animated');
                    });
                    brandObserver.disconnect();
                }
            });
        }, { threshold: 0.1 });
        
        if (brandCards.length > 0) {
            brandObserver.observe(brandCards[0]);
        }
    }
    
    // Add stagger animation to service cards
    function staggerServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        const serviceObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    serviceCards.forEach(function(card) {
                        card.classList.add('animated');
                    });
                    serviceObserver.disconnect();
                }
            });
        }, { threshold: 0.1 });
        
        if (serviceCards.length > 0) {
            serviceObserver.observe(serviceCards[0]);
        }
    }
    
    // Parallax effect for hero background (subtle)
    function initParallax() {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallaxSpeed = 0.5;
                hero.style.transform = 'translateY(' + (scrolled * parallaxSpeed) + 'px)';
            }
        });
    }
    
    // Initialize everything when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initAnimations();
            staggerBrandCards();
            staggerServiceCards();
            // Uncomment for parallax effect (optional)
            // initParallax();
        });
    } else {
        initAnimations();
        staggerBrandCards();
        staggerServiceCards();
        // initParallax();
    }
    
})();


// ============================================================================
// About Us Page Animations
// ============================================================================

(function() {
    'use strict';
    
    function initAboutAnimations() {
        // Check if we're on about page
        const isAboutPage = document.body.dataset.page === 'about';
        if (!isAboutPage) return;
        
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Animate value cards
        const valueCards = document.querySelectorAll('.value-card');
        valueCards.forEach(function(card) {
            observer.observe(card);
        });
        
        // Timeline items - no animation (removed)
        
        // Animate leadership cards
        const leadershipCards = document.querySelectorAll('.leadership-card');
        leadershipCards.forEach(function(card) {
            observer.observe(card);
        });
        
        // Animate purpose paragraphs
        const purposeParas = document.querySelectorAll('.purpose-content p');
        purposeParas.forEach(function(para) {
            observer.observe(para);
        });
        
        // Animate section titles
        const sectionTitles = document.querySelectorAll('.section__title');
        sectionTitles.forEach(function(title) {
            observer.observe(title);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAboutAnimations);
    } else {
        initAboutAnimations();
    }
    
})();


// ============================================================================
// Strategy Page Animations - Subtle & Professional
// ============================================================================

(function() {
    'use strict';
    
    function initStrategyAnimations() {
        // Check if we're on strategy page
        const isStrategyPage = document.body.dataset.page === 'strategy';
        if (!isStrategyPage) return;
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -30px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Animate pillar cards
        const pillarCards = document.querySelectorAll('.pillar-card');
        pillarCards.forEach(function(card) {
            observer.observe(card);
        });
        
        // Animate phase cards
        const phaseCards = document.querySelectorAll('.phase-card');
        phaseCards.forEach(function(card) {
            observer.observe(card);
        });
        
        // Animate risk table rows
        const riskRows = document.querySelectorAll('.risk-table tbody tr');
        riskRows.forEach(function(row) {
            observer.observe(row);
        });
        
        // Animate roadmap connector
        const roadmapConnector = document.querySelector('.roadmap-connector');
        if (roadmapConnector) {
            observer.observe(roadmapConnector);
        }
        
        // Animate intro paragraphs
        const introParagraphs = document.querySelectorAll('.intro-content p, .section__text');
        introParagraphs.forEach(function(para) {
            observer.observe(para);
        });
        
        // Animate section titles
        const sectionTitles = document.querySelectorAll('.section__title');
        sectionTitles.forEach(function(title) {
            observer.observe(title);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStrategyAnimations);
    } else {
        initStrategyAnimations();
    }
    
})();


// ============================================================================
// Investors Page Animations - Premium & Professional
// ============================================================================

(function() {
    'use strict';
    
    function initInvestorsAnimations() {
        // Check if we're on investors page
        const isInvestorsPage = document.body.dataset.page === 'investors';
        if (!isInvestorsPage) return;
        
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Animate investment cards
        const investmentCards = document.querySelectorAll('.investment-card');
        investmentCards.forEach(function(card) {
            observer.observe(card);
        });
        
        // Animate IR widget items
        const widgetItems = document.querySelectorAll('.ir-widget-item');
        widgetItems.forEach(function(item) {
            observer.observe(item);
        });
        
        // Animate stock ticker
        const stockTicker = document.querySelector('.stock-ticker-wrapper');
        if (stockTicker) {
            observer.observe(stockTicker);
        }
        
        // Animate intro text
        const introTexts = document.querySelectorAll('.intro-text');
        introTexts.forEach(function(text) {
            observer.observe(text);
        });
        
        // Animate section titles and subtitles
        const sectionTitles = document.querySelectorAll('.section__title');
        sectionTitles.forEach(function(title) {
            observer.observe(title);
        });
        
        const sectionSubtitles = document.querySelectorAll('.section__subtitle');
        sectionSubtitles.forEach(function(subtitle) {
            observer.observe(subtitle);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInvestorsAnimations);
    } else {
        initInvestorsAnimations();
    }
    
})();


// ============================================================================
// News & Careers Page Animations - Dynamic & Engaging
// ============================================================================

(function() {
    'use strict';
    
    function initNewsCareersAnimations() {
        // Check if we're on news-careers page
        const isNewsCareersPage = document.body.dataset.page === 'news-careers';
        if (!isNewsCareersPage) return;
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Animate news cards
        const newsCards = document.querySelectorAll('.news-card');
        newsCards.forEach(function(card) {
            observer.observe(card);
        });
        
        // Animate stat cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(function(card) {
            observer.observe(card);
        });
        
        // Animate info cards
        const infoCards = document.querySelectorAll('.info-card');
        infoCards.forEach(function(card) {
            observer.observe(card);
        });
        
        // Animate CTA banner
        const ctaBanner = document.querySelector('.cta-banner');
        if (ctaBanner) {
            observer.observe(ctaBanner);
        }
        
        // Contact cards - no animation needed (always visible with glow)
        
        // Animate section titles only
        const sectionTitles = document.querySelectorAll('.section__title');
        sectionTitles.forEach(function(title) {
            observer.observe(title);
        });
        
        // Section subtitles - no animation needed (always visible with glow)
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewsCareersAnimations);
    } else {
        initNewsCareersAnimations();
    }
    
})();
