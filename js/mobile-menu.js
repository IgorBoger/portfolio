/**
 * Closes the mobile menu.
 * @param {HTMLElement} menu
 * @param {HTMLButtonElement} toggleBtn
 */
function closeMobileMenu(menu, toggleBtn) {
    const sidebar = getSidebar();
    if (!sidebar) return;
    sidebar.classList.remove("is-menu-open");
    menu.setAttribute("inert", "");
    toggleBtn.setAttribute("aria-expanded", "false");
    moveFocusAfterMenuClose(toggleBtn);
}


/**
 * Returns the mobile sidebar element.
 * @returns {HTMLElement|null}
 */
function getSidebar() {
    return document.querySelector(".sidebar");
}


/**
 * Moves focus to a safe element after menu closes.
 * @param {HTMLButtonElement} toggleBtn
 */
function moveFocusAfterMenuClose(toggleBtn) {
    toggleBtn.focus();
}


/**
 * Initializes mobile menu event listeners.
 */
function initMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    const toggleBtn = document.getElementById("mobileMenuToggle");
    if (!menu || !toggleBtn) return;
    toggleBtn.addEventListener("click", () => toggleMobileMenu(menu, toggleBtn));
    document.addEventListener("click", (event) => closeMobileMenuOnOutsideClick(event, menu, toggleBtn));
}


/**
 * Toggles the mobile menu state.
 * @param {HTMLElement} menu
 * @param {HTMLButtonElement} toggleBtn
 */
function toggleMobileMenu(menu, toggleBtn) {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
        closeMobileMenu(menu, toggleBtn);
        return;
    }
    openMobileMenu(menu, toggleBtn);
}


/**
 * Opens the mobile menu.
 * @param {HTMLElement} menu
 * @param {HTMLButtonElement} toggleBtn
 */
function openMobileMenu(menu, toggleBtn) {
    const sidebar = getSidebar();
    if (!sidebar) return;
    sidebar.classList.add("is-menu-open");
    menu.removeAttribute("inert");
    toggleBtn.setAttribute("aria-expanded", "true");
}


/**
 * Closes the mobile menu when clicking outside the sidebar.
 * @param {MouseEvent} event
 * @param {HTMLElement} menu
 * @param {HTMLButtonElement} toggleBtn
 */
function closeMobileMenuOnOutsideClick(event, menu, toggleBtn) {
    const sidebar = getSidebar();
    if (!sidebar || !isMobileMenuOpen(toggleBtn)) return;
    if (sidebar.contains(event.target)) return;
    closeMobileMenu(menu, toggleBtn);
}


/**
 * Returns whether the mobile menu is currently open.
 * @param {HTMLButtonElement} toggleBtn
 * @returns {boolean}
 */
function isMobileMenuOpen(toggleBtn) {
    return toggleBtn.getAttribute("aria-expanded") === "true";
}