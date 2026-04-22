// Top Bar Component
const TopBar = {
    // Initialize top bar
    init() {
        this.render();
        this.bindEvents();
        
        // Listen for language changes
        window.addEventListener('languageChanged', () => {
            this.render();
        });
    },
    
    // Render top bar HTML
    render() {
        const container = Utils.dom.get('top-bar');
        if (!container) return;
        
        const isArabic = Localization.isArabic();
        const isMobile = Utils.responsive.isMobile();
        const horizontalPadding = Utils.responsive.getHorizontalPadding();
        
        container.innerHTML = `
            <div class="top-bar">
                <div class="top-bar-content section-padding">
                    <div class="top-bar-items">
                        ${!isMobile ? `
                            <div class="top-bar-item" data-action="documents">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                                </svg>
                                <span>${Localization.t('topBarDocuments')}</span>
                            </div>
                            <div class="top-bar-item" data-action="contact">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M17.5,13A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 14.5,13A1.5,1.5 0 0,1 16,11.5A1.5,1.5 0 0,1 17.5,13M9.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,11.5A1.5,1.5 0 0,1 9.5,13M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"/>
                                </svg>
                                <span>${Localization.t('topBarContact')}</span>
                            </div>
                            <div class="top-bar-item" data-action="search">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                                </svg>
                                <span>${Localization.t('topBarSearch')}</span>
                            </div>
                            <div class="top-bar-item" data-action="language">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                                </svg>
                                <span>${Localization.t('topBarLangToggle')}</span>
                            </div>
                        ` : `
                            <div class="top-bar-item" data-action="documents">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                                </svg>
                            </div>
                            <div class="top-bar-item" data-action="contact">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M17.5,13A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 14.5,13A1.5,1.5 0 0,1 16,11.5A1.5,1.5 0 0,1 17.5,13M9.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,11.5A1.5,1.5 0 0,1 9.5,13M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"/>
                                </svg>
                            </div>
                            <div class="top-bar-item" data-action="search">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                                </svg>
                            </div>
                            <div class="top-bar-item" data-action="language">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                                </svg>
                                <span>${Localization.t('topBarLangToggle')}</span>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    },
    
    // Bind event listeners
    bindEvents() {
        // Delegate click events
        Utils.dom.on(document, 'click', (e) => {
            const item = e.target.closest('.top-bar-item');
            if (!item) return;
            
            const action = item.dataset.action;
            switch (action) {
                case 'documents':
                    this.handleDocuments();
                    break;
                case 'contact':
                    this.handleContact();
                    break;
                case 'search':
                    this.handleSearch();
                    break;
                case 'language':
                    this.handleLanguage();
                    break;
            }
        });
    },
    
    // Handle documents click
    handleDocuments() {
        Router.navigate('/documents-library');
    },
    
    // Handle contact click
    handleContact() {
        Router.navigate('/news-careers', 'contact');
    },
    
    // Handle search click
    handleSearch() {
        // Show search modal (to be implemented)
        console.log('Search clicked');
    },
    
    // Handle language toggle
    handleLanguage() {
        this.showLanguageDialog();
    },
    
    // Show language selection dialog
    showLanguageDialog() {
        const isArabic = Localization.isArabic();
        
        // Create modal HTML
        const modalHTML = `
            <div class="modal active" id="language-modal">
                <div class="modal-content" style="max-width: 300px;">
                    <div class="modal-header">
                        <h3 class="modal-title">${Localization.t('languageTitle')}</h3>
                        <button class="modal-close" data-action="close">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div style="border-top: 1px solid var(--border-color); margin-bottom: 0;">
                            <label style="display: flex; align-items: center; padding: 12px 0; cursor: pointer; border-bottom: 1px solid var(--border-color);">
                                <input type="radio" name="language" value="ar" ${isArabic ? 'checked' : ''} style="margin-right: 12px; margin-left: 12px;">
                                <span>${Localization.t('languageArabic')}</span>
                            </label>
                            <label style="display: flex; align-items: center; padding: 12px 0; cursor: pointer;">
                                <input type="radio" name="language" value="en" ${!isArabic ? 'checked' : ''} style="margin-right: 12px; margin-left: 12px;">
                                <span>${Localization.t('languageEnglish')}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        const modalContainer = Utils.dom.create('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);
        
        const modal = Utils.dom.get('language-modal');
        
        // Handle radio button changes
        Utils.dom.on(modal, 'change', (e) => {
            if (e.target.name === 'language') {
                const newLang = e.target.value;
                if (newLang !== Localization.currentLanguage) {
                    Localization.setLanguage(newLang);
                }
                this.closeLanguageDialog();
            }
        });
        
        // Handle close button
        Utils.dom.on(modal, 'click', (e) => {
            if (e.target.closest('[data-action="close"]') || e.target === modal) {
                this.closeLanguageDialog();
            }
        });
        
        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                this.closeLanguageDialog();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    },
    
    // Close language dialog
    closeLanguageDialog() {
        const modal = Utils.dom.get('language-modal');
        if (modal) {
            modal.parentElement.remove();
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TopBar;
}