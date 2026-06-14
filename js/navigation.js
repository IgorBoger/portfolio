/**
 * Initializes all navigation features.
 */
function initNavigation() {
    initSidebarNavigation();
    initLogoNavigation();
    initMobileMenuNavigation();
    initActiveSectionTracking();
}


/**
 * Initializes sidebar scroll navigation.
 */
function initSidebarNavigation() {
    const buttons = document.querySelectorAll(".sidebar-btn");
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.target;
            if (target) scrollToPanel(target);
        });
    });
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
 * Initializes mobile menu navigation (scroll + close).
 */
function initMobileMenuNavigation() {
    const menu = document.getElementById("mobileMenu");
    const toggleBtn = document.getElementById("mobileMenuToggle");
    const links = document.querySelectorAll(".mobile-menu-link");
    if (!menu || !toggleBtn || links.length === 0) return;
    links.forEach((link) => {
        link.addEventListener("click", () => {
            const target = link.dataset.target;
            if (target) scrollToPanel(target);
            closeMobileMenu(menu, toggleBtn);
        });
    });
}


/**
 * Initializes active sidebar tracking.
 */
function initActiveSectionTracking() {
    const track = getSectionsTrack();
    if (!track) return;
    updateActiveSection();
    track.addEventListener("scroll", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);
}


/**
 * Updates the active sidebar button based on scroll position.
 */
function updateActiveSection() {
    const track = getSectionsTrack();
    const buttons = getSidebarButtons();
    if (!track || buttons.length === 0 || isMobileView()) return clearActiveSidebarButtons(buttons);
    if (track.scrollLeft < 50) return clearActiveSidebarButtons(buttons);
    const activeTarget = getActiveSidebarTarget(track, buttons);
    setActiveSidebarButton(buttons, activeTarget);
}


/**
 * Returns all sidebar buttons.
 * @returns {HTMLButtonElement[]}
 */
function getSidebarButtons() {
    return Array.from(document.querySelectorAll(".sidebar-btn"));
}


/**
 * Clears the active state from all sidebar buttons.
 * @param {HTMLButtonElement[]} buttons
 */
function clearActiveSidebarButtons(buttons) {
    buttons.forEach((button) => button.classList.remove("is-active"));
}


/**
 * Returns the active sidebar target id.
 * @param {HTMLElement} track
 * @param {HTMLButtonElement[]} buttons
 * @returns {string}
 */
function getActiveSidebarTarget(track, buttons) {
    let activeTarget = "";
    let minDistance = Number.POSITIVE_INFINITY;
    buttons.forEach((button) => updateActiveTarget(track, button, minDistance, (target, distance) => {
        activeTarget = target;
        minDistance = distance;
    }));
    return activeTarget;
}


/**
 * Updates the current closest sidebar target.
 * @param {HTMLElement} track
 * @param {HTMLButtonElement} button
 * @param {number} minDistance
 * @param {(target:string,distance:number) => void} setActive
 */
function updateActiveTarget(track, button, minDistance, setActive) {
    const targetId = button.dataset.target;
    const target = targetId ? document.querySelector(targetId) : null;
    if (!targetId || !(target instanceof HTMLElement)) return;
    const distance = Math.abs(track.scrollLeft - getSidebarTargetLeft(track, target));
    if (distance < minDistance) setActive(targetId, distance);
}


/**
 * Returns the aligned scroll position for one sidebar target.
 * @param {HTMLElement} track
 * @param {HTMLElement} target
 * @returns {number}
 */
function getSidebarTargetLeft(track, target) {
    if (target.id === "contact") return getTrackMaxScroll(track);
    const panelWidth = getSectionPanelWidth(track);
    const rawIndex = target.offsetLeft / panelWidth;
    return Math.round(rawIndex) * panelWidth;
}


/**
 * Sets the active sidebar button.
 * @param {HTMLButtonElement[]} buttons
 * @param {string} activeTarget
 */
function setActiveSidebarButton(buttons, activeTarget) {
    buttons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.target === activeTarget);
    });
}


/**
 * Scrolls to a specific panel or legal notice target.
 * @param {string} targetId
 */
function scrollToPanel(targetId) {
    if (!isStaticFlowTarget(targetId)) {
        closeLegalNotice();
        closePrivacyPolicy();
    }
    requestAnimationFrame(() => {
        if (isMobileView()) return scrollToSectionVertical(targetId);
        const track = getSectionsTrack();
        const target = document.querySelector(targetId);
        if (!track || !target) return;
        scrollToTrackGrid(track, target);
        queueMainArrowRefresh();
    });
}


/**
 * Returns whether a target belongs to a static flow section.
 * @param {string} targetId
 * @returns {boolean}
 */
function isStaticFlowTarget(targetId) {
    return isLegalNoticeTarget(targetId) || isPrivacyPolicyTarget(targetId);
}


/**
 * Scrolls to the nearest track-width grid position for a target.
 * @param {HTMLElement} track
 * @param {Element} target
 */
function scrollToTrackGrid(track, target) {
    if (!(target instanceof HTMLElement)) return;
    if (target.id === "contact") {
        return scrollTrackTo(track, getTrackMaxScroll(track));
    }
    const panelWidth = getSectionPanelWidth(track);
    const rawIndex = target.offsetLeft / panelWidth;
    const index = Math.round(rawIndex);
    scrollTrackTo(track, index * panelWidth);
}


/**
 * Queues repeated main arrow alignment after section visibility changes.
 */
function queueMainArrowRefresh() {
    requestAnimationFrame(() => {
        queueSectionArrowAlignment();
        requestAnimationFrame(queueSectionArrowAlignment);
    });
}


/**
 * Scrolls vertically to a section (mobile behavior).
 * @param {string} targetId
 */
function scrollToSectionVertical(targetId) {
    const target = document.querySelector(targetId);
    const track = getSectionsTrack();
    if (!track || !(target instanceof HTMLElement)) return;
    scrollToMobileSection(track, target);
}


/**
 * Scrolls to the top of one mobile section.
 * @param {HTMLElement} track
 * @param {HTMLElement} target
 */
function scrollToMobileSection(track, target) {
    target.scrollTo({ top: 0, behavior: "auto" });
    track.scrollTo({ top: target.offsetTop, behavior: getMotionSafeScrollBehavior() });
}