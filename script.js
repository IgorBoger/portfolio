/**
 * Initializes all UI and navigation features.
 */
function init() {
    renderInitialContent();
    initNavigationFeatures();
    initScrollFeatures();
    initRevealFeatures();
    initLayoutFeatures();
    initProjectFeatures();
    initLegalFeatures();
    initContactFeatures();
}


/**
 * Renders all dynamic page content.
 */
function renderInitialContent() {
    renderProjects();
    renderDesktopSharedSections();
    renderSharedSections();
}


/**
 * Initializes all navigation related features.
 */
function initNavigationFeatures() {
    initNavigation();
    initMobileMenu();
    initContactButton();
    initSharedTopArrows();
    initSharedBackArrows();
}


/**
 * Initializes all scroll related features.
 */
function initScrollFeatures() {
    initSectionArrows();
    initSectionArrowAlignment();
    initMobileSectionSwipeNavigation();
    initDragScroll();
    initDragScrollResize();
    initWheelHorizontalScroll();
    initLegalPrivacyScrollHints();
}


/**
 * Initializes all reveal and animation features.
 */
function initRevealFeatures() {
    initFadeInOnScroll();
    initSectionViewportReveal();
    initAccentBarReveal();
    initHeaderReveal();
    initHeroTitle();
    initHeroLocation();
    initFrontendDeveloper();
    initFrontendDeveloperMobile();
    initHeroImage();
    initSidebarReveal();
}


/**
 * Initializes all layout synchronization features.
 */
function initLayoutFeatures() {
    initShellBackground();
    initSkillsTitleWrapPosition();
    initContactTitleWrapPosition();
}


/**
 * Initializes all project related features.
 */
function initProjectFeatures() {
    initProjectCards();
    initReferenceSlider();
}


/**
 * Initializes all legal page features.
 */
function initLegalFeatures() {
    initLegalNoticeFlow();
    initLegalMobileBack();
    initPrivacyPolicyFlow();
    initPrivacyMobileBack();
}


/**
 * Initializes all contact related features.
 */
function initContactFeatures() {
    initContactMail();
}


/**
 * Returns the sections track element.
 * @returns {HTMLElement|null}
 */
function getSectionsTrack() {
    return document.getElementById("sectionsTrack");
}


/**
 * Returns the current section panel width.
 * @param {HTMLElement} track
 * @returns {number}
 */
function getSectionPanelWidth(track) {
    const panel = track.querySelector(".section-panel");
    return panel?.clientWidth || track.clientWidth || 1;
}


/**
 * Returns the maximum horizontal scroll position.
 * @param {HTMLElement} track
 * @returns {number}
 */
function getTrackMaxScroll(track) {
    return Math.max(0, track.scrollWidth - track.clientWidth);
}


/**
 * Checks if the current viewport is considered mobile.
 * @returns {boolean}
 */
function isMobileView() {
    return window.matchMedia("(max-width: 900px)").matches;
}


/**
 * Checks if the user prefers reduced motion.
 * @returns {boolean}
 */
function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}


/**
 * Returns a scroll behavior that respects motion preferences.
 * @returns {"auto"|"smooth"}
 */
function getMotionSafeScrollBehavior() {
    return prefersReducedMotion() ? "auto" : "smooth";
}


/**
 * Scrolls one track horizontally to a target position.
 * @param {HTMLElement} track
 * @param {number} position
 */
function scrollTrackTo(track, position) {
    track.scrollTo({ left: position, behavior: getMotionSafeScrollBehavior() });
    queueArrowAlignmentAfterScroll(track);
}


/**
 * Updates arrows shortly after smooth scrolling starts.
 * @param {HTMLElement} track
 */
function queueArrowAlignmentAfterScroll(track) {
    queueSectionArrowAlignment();
    window.setTimeout(queueSectionArrowAlignment, 180);
    window.setTimeout(queueSectionArrowAlignment, 360);
}


/**
 * Shows all main section panels except the legal notice flow.
 */
function showMainSections() {
    getSectionPanels().forEach((panel) => panel.classList.remove("d-none"));
}


/**
 * Hides all main section panels except the legal notice flow.
 */
function hideMainSections() {
    getSectionPanels().forEach((panel) => panel.classList.add("d-none"));
}


/**
 * Returns all normal section panels.
 * @returns {HTMLElement[]}
 */
function getSectionPanels() {
    return Array.from(document.querySelectorAll(".section-panel"))
        .filter((panel) => panel.id !== "legalNoticeFlow")
        .filter((panel) => panel.id !== "privacyPolicyFlow");
}


window.addEventListener("DOMContentLoaded", init, { once: true });
window.addEventListener("load", () => syncShellBackground(), { once: true });
