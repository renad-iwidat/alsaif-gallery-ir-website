// Leadership Dialog Modal System
// Opens Board of Directors and Executive Management pages as modal overlays

function openLeadershipDialog(url) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'leadership-dialog-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  `;
  
  // Create modal container
  const modal = document.createElement('div');
  modal.style.cssText = `
    width: 100%;
    max-width: 1200px;
    height: 90vh;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  `;
  
  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
  `;
  
  modal.appendChild(iframe);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  // Disable body scroll
  document.body.style.overflow = 'hidden';
  
  // Close on overlay click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      closeLeadershipDialog();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function escapeHandler(e) {
    if (e.key === 'Escape') {
      closeLeadershipDialog();
      document.removeEventListener('keydown', escapeHandler);
    }
  });
}

function closeLeadershipDialog() {
  const overlay = document.getElementById('leadership-dialog-overlay');
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = '';
  }
}

function openBoardDialog(lang) {
  // Determine the correct path based on language and current location
  let url;
  
  if (lang === 'ar') {
    // If we're calling from Arabic page, use relative path
    const isInArFolder = window.location.pathname.includes('/ar/');
    url = isInArFolder ? 'board-of-directors.html' : 'ar/board-of-directors.html';
  } else {
    // English version
    const isInArFolder = window.location.pathname.includes('/ar/');
    url = isInArFolder ? '../board-of-directors.html' : 'board-of-directors.html';
  }
  
  openLeadershipDialog(url);
}

function openExecutiveDialog(lang) {
  // Determine the correct path based on language and current location
  let url;
  
  if (lang === 'ar') {
    // If we're calling from Arabic page, use relative path
    const isInArFolder = window.location.pathname.includes('/ar/');
    url = isInArFolder ? 'executive-management.html' : 'ar/executive-management.html';
  } else {
    // English version
    const isInArFolder = window.location.pathname.includes('/ar/');
    url = isInArFolder ? '../executive-management.html' : 'executive-management.html';
  }
  
  openLeadershipDialog(url);
}

// Listen for postMessage from iframe to close dialog
window.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'closeLeadershipDialog') {
    closeLeadershipDialog();
  }
});
