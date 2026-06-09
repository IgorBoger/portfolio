/**
 * Initializes the header intro animation.
 */
function initHeaderReveal() {
    const header = document.querySelector(".header");
    if (!header) return;
    requestAnimationFrame(() => showHeader(header));
}


/**
 * Shows the header with its intro state.
 * @param {HTMLElement} header
 */
function showHeader(header) {
    header.classList.add("is-visible");
}


/**
 * Initializes the hero title intro animation.
 */
function initHeroTitle() {
    const heroTitle = document.querySelector(".hero-title");
    if (!heroTitle) return;
    requestAnimationFrame(() => showHeroTitle(heroTitle));
}


/**
 * Shows the hero title with its intro state.
 * @param {HTMLElement} heroTitle
 */
function showHeroTitle(heroTitle) {
    heroTitle.classList.add("is-visible");
}


/**
 * Initializes the hero location intro animation.
 */
function initHeroLocation() {
    const heroLocation = document.querySelector(".hero-location");
    if (!heroLocation) return;
    requestAnimationFrame(() => showHeroLocation(heroLocation));
}


/**
 * Shows the hero location with its intro state.
 * @param {HTMLElement} heroLocation
 */
function showHeroLocation(heroLocation) {
    heroLocation.classList.add("is-visible");
}


/**
 * Initializes the frontend developer mobile intro animation.
 */
function initFrontendDeveloperMobile() {
    const frontendDeveloperMobile = document.querySelector(".frontend-developer-mobile");
    if (!frontendDeveloperMobile) return;
    requestAnimationFrame(() => showFrontendDeveloperMobile(frontendDeveloperMobile));
}


/**
 * Shows the frontend developer mobile with its intro state.
 * @param {HTMLElement} frontendDeveloperMobile
 */
function showFrontendDeveloperMobile(frontendDeveloperMobile) {
    frontendDeveloperMobile.classList.add("is-visible");
}


/**
 * Initializes the frontend developer intro animation.
 */
function initFrontendDeveloper() {
    const frontendDeveloper = document.querySelector(".frontend-developer");
    if (!frontendDeveloper) return;
    requestAnimationFrame(() => delayFrontendDeveloper(frontendDeveloper));

}


/**
 * Delays the frontend developer reveal for staggered animation.
 * @param {HTMLElement} frontendDeveloper
 */
function delayFrontendDeveloper(frontendDeveloper) {
    setTimeout(() => showFrontendDeveloper(frontendDeveloper), 240);
}


/**
 * Shows the frontend developer element with its intro state.
 * @param {HTMLElement} frontendDeveloper
 */
function showFrontendDeveloper(frontendDeveloper) {
    frontendDeveloper.classList.add("is-visible");
}


/**
 * Initializes the hero image intro animation.
 */
function initHeroImage() {
    const heroImage = document.querySelector(".hero-image");
    if (!heroImage) return;
    requestAnimationFrame(() => delayHeroImage(heroImage));
}


/**
 * Delays the hero image reveal for staggered animation.
 * @param {HTMLElement} heroImage
 */
function delayHeroImage(heroImage) {
    setTimeout(() => showHeroImage(heroImage), 120);
}


/**
 * Shows the hero image with its intro state.
 * @param {HTMLElement} heroImage
 */
function showHeroImage(heroImage) {
    heroImage.classList.add("is-visible");
}


/**
 * Initializes the sidebar intro animation.
 */
function initSidebarReveal() {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;
    requestAnimationFrame(() => showSidebar(sidebar));
}


/**
 * Shows the sidebar with its intro state.
 * @param {HTMLElement} sidebar
 */
function showSidebar(sidebar) {
    sidebar.classList.add("is-visible");
}