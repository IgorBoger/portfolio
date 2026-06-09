/**
 * Creates a project card reveal observer.
 * @returns {IntersectionObserver}
 */
function createProjectRevealObserver() {
    const root = isMobileView() ? null : getSectionsTrack();
    return new IntersectionObserver((entries) => {
        handleRevealEntries(entries, true);
    }, {
        root,
        threshold: 0.1
    });
}


/**
 * Initializes fade-in animation on scroll.
 */
function initFadeInOnScroll() {
    const elements = document.querySelectorAll(getRevealSelector());
    if (elements.length === 0) return;
    const observer = createRevealObserver(true);
    const projectObserver = createProjectRevealObserver();
    elements.forEach((element) => {
        if (element.classList.contains("project-container")) {
            projectObserver.observe(element);
            return;
        }
        observer.observe(element);
    });
}


/**
 * Returns the selector for all reveal elements.
 * @returns {string}
 */
function getRevealSelector() {
    return [
        ".reference-card",
        ".references-mobile-controls",
        ".fade-in",
        ".shared-actions",
        ".contact-mobile-reveal",
        ".hero-title",
        ".frontend-developer",
        ".frontend-developer-mobile",
        ".hero-location",
        ".hero-image"
    ].join(", ");
}


/**
 * Creates a shared reveal observer.
 * @param {boolean} shouldRefreshArrows
 * @returns {IntersectionObserver}
 */
function createRevealObserver(shouldRefreshArrows = false) {
    const root = isMobileView() ? null : getSectionsTrack();
    return new IntersectionObserver((entries) => {
        handleRevealEntries(entries, shouldRefreshArrows);
    }, {
        root,
        threshold: 0.25
    });
}


/**
 * Handles reveal observer entries.
 * @param {IntersectionObserverEntry[]} entries
 * @param {boolean} shouldRefreshArrows
 */
function handleRevealEntries(entries, shouldRefreshArrows) {
    entries.forEach((entry) => {
        toggleRevealVisibility(entry);
        if (shouldRefreshArrows) {
            queueSectionArrowAlignment();
        }
    });
}


/**
 * Toggles reveal visibility for one element.
 * @param {IntersectionObserverEntry} entry
 */
function toggleRevealVisibility(entry) {
    if (entry.target.classList.contains("reference-card") && entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        return;
    }
    if (entry.target.classList.contains("reference-card")) return;
    entry.target.classList.toggle("is-visible", entry.isIntersecting);
}


/**
 * Initializes one-time reveal animations for section titles and reveal arrows.
 */
function initSectionViewportReveal() {
    const items = getSectionRevealItems();
    if (items.length === 0) return;
    const observer = createRevealObserver();
    items.forEach((item) => observer.observe(item));
}


/**
 * Returns all section elements that should reveal on view.
 * @returns {HTMLElement[]}
 */
function getSectionRevealItems() {
    return Array.from(document.querySelectorAll(
        ".whyme-title, .skills-title, .mywork-title, .references-title, .contact-title, .arrow-reveal-right, .arrow-reveal-left, .legal-notice-title, .privacy-policy-title"
    ));
}


/**
 * Initializes accent bar observers for all horizontal tracks.
 */
function initAccentBarReveal() {
    bindAccentBarReveal("#contact .accent-bar", getSectionsTrack());
    bindAccentBarReveal("#legalNoticePageTwo .accent-bar", getLegalNoticeTrack());
    bindAccentBarReveal("#privacyPolicyPageTwo .accent-bar", getPrivacyPolicyTrack());
}


/**
 * Binds one accent bar to its track observer.
 * @param {string} selector
 * @param {HTMLElement|null} root
 */
function bindAccentBarReveal(selector, root) {
    const bar = document.querySelector(selector);
    if (!bar) return;
    createAccentBarObserver(root).observe(bar);
}


/**
 * Creates one accent bar observer.
 * @param {HTMLElement|null} root
 * @returns {IntersectionObserver}
 */
function createAccentBarObserver(root) {
    const observerRoot = isMobileView() ? null : root;
    return new IntersectionObserver(handleAccentBarEntries, {
        root: observerRoot,
        threshold: 0,
        rootMargin: "0px 120px 0px 0px"
    });
}


/**
 * Handles accent bar visibility entries.
 * @param {IntersectionObserverEntry[]} entries
 */
function handleAccentBarEntries(entries) {
    entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
}