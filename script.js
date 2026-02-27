function init() {
    initMobileMenu();
    initHeroArrow();
    initSidebarNavigation();
    initLogoNavigation();
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
 * Scrolls to a specific panel.
 * @param {string} targetId
 */
function scrollToPanel(targetId) {
    const track = getSectionsTrack();
    const target = document.querySelector(targetId);
    if (!track || !target) return;

    const offset = target.offsetLeft;
    track.scrollTo({ left: offset, behavior: "smooth" });
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