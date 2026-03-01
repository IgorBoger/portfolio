/**
 * Initializes all UI and navigation features.
 */
function init() {
    initMobileMenu();
    initHeroArrow();
    initSectionArrows();
    initSidebarNavigation();
    initLogoNavigation();
    initMobileMenuNavigation();
    initTrackBackground();
}


init();


/**
* Opens the mobile menu.
* @param {HTMLElement} menu
* @param {HTMLButtonElement} toggleBtn
*/
function openMobileMenu(menu, toggleBtn) {
    menu.classList.remove("d-none");
    menu.classList.add("d-flex");
    menu.setAttribute("aria-hidden", "false");
    toggleBtn.setAttribute("aria-expanded", "true");
}


/**
 * Closes the mobile menu.
 * @param {HTMLElement} menu
* @param {HTMLButtonElement} toggleBtn
*/
function closeMobileMenu(menu, toggleBtn) {
    menu.classList.add("d-none");
    menu.classList.remove("d-flex");
    menu.setAttribute("aria-hidden", "true");
    toggleBtn.setAttribute("aria-expanded", "false");
}


/**
 * Toggles the mobile menu state.
 * @param {HTMLElement} menu
* @param {HTMLButtonElement} toggleBtn
*/
function toggleMobileMenu(menu, toggleBtn) {
    const isHidden = menu.classList.contains("d-none");
    if (isHidden) openMobileMenu(menu, toggleBtn);
    else closeMobileMenu(menu, toggleBtn);
}


/**
 * Initializes mobile menu event listeners..
 */
function initMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    const toggleBtn = document.getElementById("mobileMenuToggle");
    const closeBtn = document.getElementById("mobileMenuClose");
    if (!menu || !toggleBtn || !closeBtn) return;
    toggleBtn.addEventListener("click", () => toggleMobileMenu(menu, toggleBtn));
    closeBtn.addEventListener("click", () => closeMobileMenu(menu, toggleBtn));
}


/**
 * Initializes logo click navigation back to the hero section.
 */
function initLogoNavigation() {
    const logo = getSidebarLogo();
    if (!logo) return;
    logo.addEventListener("click", (event) => {
        event.preventDefault();
        scrollToPanel("#top");
    });
}


/**
 * Returns the sidebar logo link element.
 * @returns {HTMLAnchorElement|null}
 */
function getSidebarLogo() {
    return document.querySelector(".sidebar-logo");
}


/**
 * Scrolls exactly one panel to the right.
 */
function scrollOnePanelRight() {
    const track = getSectionsTrack();
    if (!track) return;
    const panelWidth = track.clientWidth;
    track.scrollBy({ left: panelWidth, behavior: "smooth" });
}


/**
 * Returns the sections track element.
 * @returns {HTMLElement|null}
 */
function getSectionsTrack() {
    return document.getElementById("sectionsTrack");
}


/**
 * Initializes hero arrow scroll behavior.
 */
function initHeroArrow() {
    const arrow = getHeroArrow();
    if (!arrow) return;
    arrow.addEventListener("click", scrollOnePanelRight);
}


/**
 * Returns the hero arrow button element.
 * @returns {HTMLButtonElement|null}
 */
function getHeroArrow() {
    return document.querySelector(".hero-arrow");
}


/**
 * Scrolls to a specific panel/section depending on viewport.
 * @param {string} targetId
 */
function scrollToPanel(targetId) {
    if (isMobileView()) {
        scrollToSectionVertical(targetId);
        return;
    }
    const track = getSectionsTrack();
    const target = document.querySelector(targetId);
    if (!track || !target) return;
    track.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
}


/**
 * Initializes section arrow scroll behavior.
 */
function initSectionArrows() {
    const arrows = getSectionArrows();
    if (arrows.length === 0) return;
    arrows.forEach(arrow => arrow.addEventListener("click", scrollOnePanelRight));
}


/**
 * Returns all section arrow button elements.
 * @returns {NodeListOf<HTMLButtonElement>}
 */
function getSectionArrows() {
    return document.querySelectorAll(".section-arrow");
}


/**
 * Checks if the current viewport is considered mobile.
 * @returns {boolean}
 */
function isMobileView() {
    return window.matchMedia("(max-width: 900px)").matches;
}


/**
 * Scrolls vertically to a section (mobile behavior).
 * @param {string} targetId
 */
function scrollToSectionVertical(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
}


/**
 * Initializes sidebar scroll navigation.
 */
function initSidebarNavigation() {
    const buttons = document.querySelectorAll(".sidebar-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.target;
            if (target) scrollToPanel(target);
        });
    });
}


/**
 * Initializes mobile menu navigation (scroll + close).
 */
function initMobileMenuNavigation() {
    const menu = document.getElementById("mobileMenu");
    const toggleBtn = document.getElementById("mobileMenuToggle");
    const links = document.querySelectorAll(".mobile-menu-link");
    if (!menu || !toggleBtn || links.length === 0) return;
    links.forEach(link => {
        link.addEventListener("click", () => {
            const target = link.dataset.target;
            if (target) scrollToPanel(target);
            closeMobileMenu(menu, toggleBtn);
        });
    });
}


/**
 * Initializes fullscreen background syncing to horizontal track scroll.
 */
function initTrackBackground() {
    const track = getSectionsTrack();
    if (!track) return;
    applyTrackBackground(track);
    track.addEventListener("scroll", () => requestAnimationFrame(() => applyTrackBackground(track)));
    window.addEventListener("resize", () => applyTrackBackground(track));
}


/**
 * Applies CSS variables for background-size and background-position based on track scroll.
 * @param {HTMLElement} track
 */
function applyTrackBackground(track) {
    if (isMobileView()) return resetTrackBackground();
    const gutters = getTrackGutters(track);
    const bgWidth = track.scrollWidth + gutters.left + gutters.right;
    const bgX = -track.scrollLeft + gutters.left;
    setTrackBackgroundSize(`${bgWidth}px 100%`);
    setTrackBackgroundX(`${bgX}px`);
}


/**
 * Resets the background variables (mobile behavior).
 */
function resetTrackBackground() {
    setTrackBackgroundSize("100% 100%");
    setTrackBackgroundX("0px");
}


/**
 * Sets the background-size variable on body.
 * @param {string} size
 */
function setTrackBackgroundSize(size) {
    document.body.style.setProperty("--track-bg-size", size);
}


/**
 * Sets the background-position-x variable on body.
 * @param {string} x
 */
function setTrackBackgroundX(x) {
    document.body.style.setProperty("--track-bg-x", x);
}


/**
 * Returns left/right gutter widths between track and viewport edges.
 * @param {HTMLElement} track
 * @returns {{left:number,right:number}}
 */
function getTrackGutters(track) {
    const rect = track.getBoundingClientRect();
    const left = Math.max(0, rect.left);
    const right = Math.max(0, window.innerWidth - rect.right);
    return { left, right };
}