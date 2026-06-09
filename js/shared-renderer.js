/**
 * Renders all shared desktop contact sections.
 */
function renderDesktopSharedSections() {
    renderDesktopContactSharedArea();
    renderDesktopLegalSharedArea();
    renderDesktopPrivacySharedArea();
}


/**
 * Renders the desktop shared contact area.
 */
function renderDesktopContactSharedArea() {
    const container = document.getElementById("desktopContactSharedArea");
    if (!container) return;
    container.innerHTML += createDesktopSharedMarkup();
}


/**
 * Renders the desktop shared area for legal notice.
 */
function renderDesktopLegalSharedArea() {
    const container = document.getElementById("desktopLegalSharedArea");
    if (!container) return;
    container.innerHTML = createDesktopSharedMarkup();
}


/**
 * Renders the desktop shared area for privacy policy.
 */
function renderDesktopPrivacySharedArea() {
    const container = document.getElementById("desktopPrivacySharedArea");
    if (!container) return;
    container.innerHTML = createDesktopSharedMarkup();
}


/**
 * Renders all shared mobile sections.
 */
function renderSharedSections() {
    renderContactSharedArea();
    renderLegalSharedArea();
    renderPrivacySharedArea();
}


/**
 * Renders the shared contact area.
 */
function renderContactSharedArea() {
    const container = document.getElementById("contactSharedArea");
    if (!container) return;
    container.innerHTML = createContactSharedMarkup();
}


/**
 * Renders the shared legal area.
 */
function renderLegalSharedArea() {
    const container = document.getElementById("legalSharedArea");
    if (!container) return;
    container.innerHTML = createLegalSharedMarkup();
}


/**
 * Renders the shared privacy area.
 */
function renderPrivacySharedArea() {
    const container = document.getElementById("privacySharedArea");
    if (!container) return;
    container.innerHTML = createPrivacySharedMarkup();
}