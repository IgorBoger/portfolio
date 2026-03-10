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
    initDragScroll();
    initDragScrollResize();
    initProjectCards();
    initReferenceSlider();
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


function scrollOnePanelRight() {
    const track = getSectionsTrack();
    if (!track) return;
    const next = getNearestPanelIndex(track) + 1;
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
}


/**
 * Returns the nearest panel index based on current scroll position.
 * @param {HTMLElement} track
 * @returns {number}
 */
function getNearestPanelIndex(track) {
    const width = track.clientWidth || 1;
    return Math.round(track.scrollLeft / width);
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
    scrollToTrackGrid(track, target);
}


/**
 * Scrolls to the nearest track-width grid position for a target.
 * @param {HTMLElement} track
 * @param {Element} target
 */
function scrollToTrackGrid(track, target) {
    const width = track.clientWidth || 1;
    const rawIndex = target.offsetLeft / width;
    const index = Math.round(rawIndex);
    track.scrollTo({ left: index * width, behavior: "smooth" });
}


/**
 * Returns the index of a section panel inside the sections track.
 * @param {Element} panel
 * @returns {number}
 */
function getPanelIndex(panel) {
    const track = getSectionsTrack();
    if (!track) return -1;
    const panels = Array.from(track.querySelectorAll(".section-panel"));
    return panels.indexOf(panel);
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


/**
 * Initializes drag-to-scroll on horizontal containers (desktop only).
 */
function initDragScroll() {
    if (isMobileView()) return;
    const targets = getDragScrollTargets();
    targets.forEach(setupDragScroll);
}


/**
 * Returns all drag-scroll targets that exist in DOM.
 * @returns {HTMLElement[]}
 */
function getDragScrollTargets() {
    const sectionsTrack = document.getElementById("sectionsTrack");
    return [sectionsTrack].filter(Boolean);
}


/**
 * Sets up drag-to-scroll interaction for one container.
 * @param {HTMLElement} el
 */
function setupDragScroll(el) {
    if (isDragScrollInitialized(el)) return;
    markDragScrollInitialized(el);
    const state = createDragState();
    el.addEventListener("pointerdown", (event) => onDragPointerDown(event, el, state));
    el.addEventListener("pointermove", (event) => onDragPointerMove(event, el, state));
    el.addEventListener("pointerup", () => endDrag(state));
    el.addEventListener("pointerleave", () => endDrag(state));
    el.addEventListener("pointercancel", () => endDrag(state));
}


/**
 * Creates a fresh drag state object.
 * @returns {{isDown:boolean,startX:number,scrollLeft:number}}
 */
function createDragState() {
    return { isDown: false, startX: 0, scrollLeft: 0 };
}


/**
 * Starts dragging on left mouse button.
 * @param {PointerEvent} event
 * @param {HTMLElement} el
 * @param {{isDown:boolean,startX:number,scrollLeft:number}} state
 */
function onDragPointerDown(event, el, state) {
    event.stopPropagation();
    if (event.button !== 0) return;
    if (!isDragStartAllowed(event)) return;
    event.preventDefault();
    state.isDown = true;
    state.startX = event.clientX;
    state.scrollLeft = el.scrollLeft;
    el.setPointerCapture(event.pointerId);
    setDraggingClass(true);
}


/**
 * Handles pointer move and updates horizontal scroll.
 * @param {PointerEvent} event
 * @param {HTMLElement} el
 * @param {{isDown:boolean,startX:number,scrollLeft:number}} state
 */
function onDragPointerMove(event, el, state) {
    event.stopPropagation();
    if (!state.isDown) return;
    event.preventDefault();
    const delta = state.startX - event.clientX;
    el.scrollLeft = state.scrollLeft + delta;
}


/**
 * Ends dragging state and resets UI.
 * @param {{isDown:boolean}} state
 */
function endDrag(state) {
    if (!state.isDown) return;
    state.isDown = false;
    setDraggingClass(false);
    releaseSnapAfterDrag();
}


/**
 * Toggles dragging class on body for cursor/user-select.
 * @param {boolean} isDragging
 */
function setDraggingClass(isDragging) {
    document.body.classList.toggle("is-dragging", isDragging);
}


/**
 * Releases scroll snapping right after dragging ends.
 */
function releaseSnapAfterDrag() {
    requestAnimationFrame(() => setDraggingClass(false));
}


/**
 * Initializes drag scroll on resize when switching to desktop.
 */
function initDragScrollResize() {
    window.addEventListener("resize", () => initDragScroll());
}


/**
 * Checks if drag scroll was already initialized on an element.
 * @param {HTMLElement} el
 * @returns {boolean}
 */
function isDragScrollInitialized(el) {
    return el.dataset.dragScrollInitialized === "true";
}


/**
 * Marks an element as drag-scroll initialized.
 * @param {HTMLElement} el
 */
function markDragScrollInitialized(el) {
    el.dataset.dragScrollInitialized = "true";
}


/**
 * Checks if dragging should start for the current pointer event.
 * @param {PointerEvent} event
 * @returns {boolean}
 */
function isDragStartAllowed(event) {
    const blocked = event.target.closest("button, a, input, textarea, select, label");
    return !blocked;
}


/**
 * Initializes all project card toggles.
 */
function initProjectCards() {
    const cards = getProjectCards();
    if (cards.length === 0) return;
    cards.forEach(initProjectCard);
}


/**
 * Returns all project cards.
 * @returns {HTMLElement[]}
 */
function getProjectCards() {
    return Array.from(document.querySelectorAll(".project-container"));
}


/**
 * Initializes one project card.
 * @param {HTMLElement} card
 */
function initProjectCard(card) {
    const insideButton = getInsideProjectButton(card);
    const outsideButton = getOutsideProjectButton(card);
    if (!insideButton && !outsideButton) return;
    setInitialProjectCardState(card);
    syncProjectCardState(card, insideButton, outsideButton);
    addProjectCardListeners(card, insideButton, outsideButton);
}


/**
 * Adds click listeners to both project card buttons.
 * @param {HTMLElement} card
 * @param {HTMLButtonElement|null} insideButton
 * @param {HTMLButtonElement|null} outsideButton
 */
function addProjectCardListeners(card, insideButton, outsideButton) {
    if (insideButton) {
        insideButton.addEventListener("click", () => toggleProjectCard(card));
    }

    if (outsideButton) {
        outsideButton.addEventListener("click", () => toggleProjectCard(card));
    }
}


/**
 * Returns the button inside the project card.
 * @param {HTMLElement} card
 * @returns {HTMLButtonElement|null}
 */
function getInsideProjectButton(card) {
    return card.querySelector(".project-card-toggle");
}


/**
 * Returns the button directly after the project card.
 * @param {HTMLElement} card
 * @returns {HTMLButtonElement|null}
 */
function getOutsideProjectButton(card) {
    const nextElement = card.nextElementSibling;
    if (!nextElement) return null;
    if (!nextElement.classList.contains("project-card-toggle")) return null;
    return nextElement;
}


/**
 * Sets the initial project card state for the current viewport.
 * @param {HTMLElement} card
 */
function setInitialProjectCardState(card) {
    if (!isMobileView()) return;
    card.dataset.projectExpanded = "false";
}


/**
 * Toggles the expanded state of one project card.
 * @param {HTMLElement} card
 */
function toggleProjectCard(card) {
    const nextState = !isProjectCardExpanded(card);
    setProjectCardExpanded(card, nextState);
}


/**
 * Syncs the initial project card state.
 * @param {HTMLElement} card
 * @param {HTMLButtonElement|null} insideButton
 * @param {HTMLButtonElement|null} outsideButton
 */
function syncProjectCardState(card, insideButton, outsideButton) {
    const isExpanded = isProjectCardExpanded(card);
    updateProjectButtons(insideButton, outsideButton, isExpanded);
}


/**
 * Checks whether a project card is expanded.
 * @param {HTMLElement} card
 * @returns {boolean}
 */
function isProjectCardExpanded(card) {
    return card.dataset.projectExpanded === "true";
}


/**
 * Sets the expanded state of one project card.
 * @param {HTMLElement} card
 * @param {boolean} isExpanded
 */
function setProjectCardExpanded(card, isExpanded) {
    const insideButton = getInsideProjectButton(card);
    const outsideButton = getOutsideProjectButton(card);
    card.dataset.projectExpanded = String(isExpanded);
    updateProjectButtons(insideButton, outsideButton, isExpanded);
}


/**
 * Updates both project card buttons.
 * @param {HTMLButtonElement|null} insideButton
 * @param {HTMLButtonElement|null} outsideButton
 * @param {boolean} isExpanded
 */
function updateProjectButtons(insideButton, outsideButton, isExpanded) {
    updateInsideProjectButton(insideButton, isExpanded);
    updateOutsideProjectButton(outsideButton, isExpanded);
}


/**
 * Updates the inside project button.
 * @param {HTMLButtonElement|null} button
 * @param {boolean} isExpanded
 */
function updateInsideProjectButton(button, isExpanded) {
    if (!button) return;
    button.setAttribute("aria-expanded", String(isExpanded));
    setProjectButtonContent(button, "Show me more", "▼", !isExpanded);
}


/**
 * Updates the outside project button.
 * @param {HTMLButtonElement|null} button
 * @param {boolean} isExpanded
 */
function updateOutsideProjectButton(button, isExpanded) {
    if (!button) return;
    button.setAttribute("aria-expanded", String(isExpanded));
    setProjectButtonContent(button, "Show me less", "▲", isExpanded);
}


/**
 * Sets the label and icon of one project button.
 * @param {HTMLButtonElement} button
 * @param {string} text
 * @param {string} iconText
 * @param {boolean} shouldShow
 */
function setProjectButtonContent(button, text, iconText, shouldShow) {
    const label = getProjectButtonLabel(button);
    const icon = getProjectButtonIcon(button);
    if (label) label.textContent = shouldShow ? text : "";
    if (icon) icon.textContent = shouldShow ? iconText : "";
}


/**
 * Returns the text span of one project button.
 * @param {HTMLButtonElement} button
 * @returns {HTMLSpanElement|null}
 */
function getProjectButtonLabel(button) {
    return button.querySelector("span");
}


/**
 * Returns the icon span of one project button.
 * @param {HTMLButtonElement} button
 * @returns {HTMLSpanElement|null}
 */
function getProjectButtonIcon(button) {
    return button.querySelector(".project-card-toggle-icon");
}