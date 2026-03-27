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
    initContactArrowNavigation();
    initShellBackground();
    initDragScroll();
    initDragScrollResize();
    initActiveSectionTracking();
    initFadeInOnScroll();
    initSidebarReveal();
    initProjectCards();
    initReferenceSlider();
    initContactForm();
    initLegalNoticeFlow();
    initLegalMobileBack();
    initLegalMobileTopArrow();
    initPrivacyPolicyFlow();
    initPrivacyMobileBack();
    initPrivacyMobileTopArrow();
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
 * Scrolls the sections track one panel step to the right.
 */
function scrollOnePanelRight() {
    const track = getSectionsTrack();
    if (!track) return;
    const next = getNearestPanelIndex(track) + 1;
    const panelWidth = getSectionPanelWidth(track);
    const maxScroll = getTrackMaxScroll(track);
    const nextLeft = Math.min(next * panelWidth, maxScroll);
    track.scrollTo({ left: nextLeft, behavior: "smooth" });
}


/**
 * Returns the nearest panel index based on current scroll position.
 * @param {HTMLElement} track
 * @returns {number}
 */
function getNearestPanelIndex(track) {
    const panelWidth = getSectionPanelWidth(track);
    return Math.round(track.scrollLeft / panelWidth);
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
 * Initializes contact arrow navigation back to the hero section.
 */
function initContactArrowNavigation() {
    const arrow = getContactArrowLink();
    if (!arrow) return;
    arrow.addEventListener("click", handleContactArrowClick);
}


/**
 * Handles smooth navigation from contact back to the hero section.
 * @param {MouseEvent} event
 */
function handleContactArrowClick(event) {
    event.preventDefault();
    scrollToPanel("#top");
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
    arrows.forEach((arrow) => bindSectionArrow(arrow));
}


/**
 * Returns all section arrow button elements.
 * @returns {HTMLButtonElement[]}
 */
function getSectionArrows() {
    return Array.from(document.querySelectorAll(
        ".hero-arrow, .whyme-arrow, .skills-arrow, .ongoing-arrow, .references-arrow"
    ));
}


/**
 * Binds one main section arrow to the sections track.
 * @param {HTMLButtonElement} arrow
 */
function bindSectionArrow(arrow) {
    arrow.addEventListener("click", () => handleSectionArrowClick(arrow));
}


/**
 * Handles one section arrow click by arrow type.
 * @param {HTMLButtonElement} arrow
 */
function handleSectionArrowClick(arrow) {
    if (arrow.classList.contains("ongoing-arrow")) return scrollToReferences();
    if (arrow.classList.contains("references-arrow")) return scrollToPanel("#contact");
    scrollOnePanelRight();
}


/**
 * Scrolls the main track to the references block inside My Work.
 */
function scrollToReferences() {
    const track = getSectionsTrack();
    const refs = document.querySelector(".references-container");
    if (!track || !refs) return;
    const left = getReferencesScrollLeft(track, refs);
    scrollTrackTo(track, left);
}


/**
 * Returns the aligned scroll position for the references block.
 * @param {HTMLElement} track
 * @param {HTMLElement} refs
 * @returns {number}
 */
function getReferencesScrollLeft(track, refs) {
    const trackRect = track.getBoundingClientRect();
    const refsRect = refs.getBoundingClientRect();
    const maxScroll = getTrackMaxScroll(track);
    const left = track.scrollLeft + refsRect.left - trackRect.left;
    return Math.max(0, Math.min(left, maxScroll));
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
 * Initializes shell background syncing.
 */
function initShellBackground() {
    const track = getSectionsTrack();
    const shell = getLayoutShell();
    if (!track || !shell) return;
    bindShellBackgroundEvents(track, shell);
    queueShellBackgroundSync(track, shell);
}


/**
 * Returns the layout shell element.
 * @returns {HTMLElement|null}
 */
function getLayoutShell() {
    return document.getElementById("layoutShell");
}


/**
 * Binds shell background events.
 * @param {HTMLElement} track
 * @param {HTMLElement} shell
 */
function bindShellBackgroundEvents(track, shell) {
    track.addEventListener("scroll", () => queueShellBackgroundSync(track, shell));
    window.addEventListener("resize", () => queueShellBackgroundSync(track, shell));
}


/**
 * Queues one shell background sync.
 * @param {HTMLElement} track
 * @param {HTMLElement} shell
 */
function queueShellBackgroundSync(track, shell) {
    requestAnimationFrame(() => applyShellBackground(track, shell));
}


/**
 * Applies shell background values.
 * @param {HTMLElement} track
 * @param {HTMLElement} shell
 */
function applyShellBackground(track, shell) {
    if (isMobileView()) return resetShellBackground(shell);
    const bgWidth = `${getShellBackgroundRenderWidth(track)}px 100%`;
    const bgX = `${-track.scrollLeft}px`;
    setShellBackgroundSize(shell, bgWidth);
    setShellBackgroundX(shell, bgX);
    shell.classList.add("has-shell-bg");
}


/**
 * Returns the shell background width.
 * @param {HTMLElement} track
 * @returns {number}
 */
function getShellBackgroundRenderWidth(track) {
    return track.scrollWidth + track.offsetLeft;
}


/**
 * Resets shell background values.
 * @param {HTMLElement} shell
 */
function resetShellBackground(shell) {
    shell.style.removeProperty("--shell-bg-size");
    shell.style.removeProperty("--shell-bg-x");
    shell.classList.remove("has-shell-bg");
}


/**
 * Sets shell background size.
 * @param {HTMLElement} shell
 * @param {string} size
 */
function setShellBackgroundSize(shell, size) {
    shell.style.setProperty("--shell-bg-size", size);
}


/**
 * Sets shell background position x.
 * @param {HTMLElement} shell
 * @param {string} x
 */
function setShellBackgroundX(shell, x) {
    shell.style.setProperty("--shell-bg-x", x);
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
    const legalTrack = document.getElementById("legalNoticeTrack");
    const privacyTrack = document.getElementById("privacyPolicyTrack");
    return [sectionsTrack, legalTrack, privacyTrack].filter(Boolean);
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
 * Initializes fade-in animation on scroll.
 */
function initFadeInOnScroll() {
    const elements = document.querySelectorAll(
        ".fade-in, .contact-section, .contact-mobile-reveal"
    );
    if (elements.length === 0) return;
    const observer = createFadeInObserver();
    elements.forEach((element) => observer.observe(element));
}


/**
 * Creates the fade-in intersection observer.
 * @returns {IntersectionObserver}
 */
function createFadeInObserver() {
    return new IntersectionObserver(handleFadeInEntries, { threshold: 0.2 });
}


/**
 * Handles fade-in observer entries.
 * @param {IntersectionObserverEntry[]} entries
 */
function handleFadeInEntries(entries) {
    entries.forEach((entry) => toggleFadeInVisibility(entry));
}


/**
 * Toggles one fade-in element visibility.
 * @param {IntersectionObserverEntry} entry
 */
function toggleFadeInVisibility(entry) {
    entry.target.classList.toggle("is-visible", entry.isIntersecting);
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


/**
 * Initializes the mobile reference slider controls.
 */
function initReferenceSlider() {
    const grid = getReferenceGrid();
    const buttons = getReferenceControlButtons();
    const cards = getReferenceCards();
    if (!grid || buttons.length === 0 || cards.length === 0) return;
    bindReferenceControlButtons(grid, buttons, cards);
    syncReferenceButtonsOnScroll(grid, buttons, cards);
}


/**
 * Returns the references grid element.
 * @returns {HTMLElement|null}
 */
function getReferenceGrid() {
    return document.querySelector(".references-grid");
}


/**
 * Returns all reference cards.
 * @returns {HTMLElement[]}
 */
function getReferenceCards() {
    return Array.from(document.querySelectorAll(".reference-card"));
}


/**
 * Returns all reference control buttons.
 * @returns {HTMLButtonElement[]}
 */
function getReferenceControlButtons() {
    return Array.from(document.querySelectorAll(".reference-control-btn"));
}


/**
 * Binds click events to all reference control buttons.
 * @param {HTMLElement} grid
 * @param {HTMLButtonElement[]} buttons
 * @param {HTMLElement[]} cards
 */
function bindReferenceControlButtons(grid, buttons, cards) {
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const index = getReferenceButtonIndex(button);
            const card = cards[index];
            if (!card) return;
            scrollReferenceCardIntoView(grid, card);
            setActiveReferenceButton(buttons, index);
        });
    });
}


/**
 * Returns the card index of one reference button.
 * @param {HTMLButtonElement} button
 * @returns {number}
 */
function getReferenceButtonIndex(button) {
    return Number(button.dataset.referenceIndex);
}


/**
 * Scrolls one reference card into view inside the grid.
 * @param {HTMLElement} grid
 * @param {HTMLElement} card
 */
function scrollReferenceCardIntoView(grid, card) {
    const left = card.offsetLeft - grid.offsetLeft;
    grid.scrollTo({
        left: left,
        behavior: "smooth"
    });
}


/**
 * Syncs the active button with the current scroll position.
 * @param {HTMLElement} grid
 * @param {HTMLButtonElement[]} buttons
 * @param {HTMLElement[]} cards
 */
function syncReferenceButtonsOnScroll(grid, buttons, cards) {
    grid.addEventListener("scroll", () => {
        const activeIndex = getActiveReferenceIndex(grid, cards);
        setActiveReferenceButton(buttons, activeIndex);
    });
}


/**
 * Returns the currently closest visible reference card index.
 * @param {HTMLElement} grid
 * @param {HTMLElement[]} cards
 * @returns {number}
 */
function getActiveReferenceIndex(grid, cards) {
    let activeIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - grid.scrollLeft);
        if (distance < minDistance) {
            minDistance = distance;
            activeIndex = index;
        }
    });

    return activeIndex;
}


/**
 * Updates the active state of all reference buttons.
 * @param {HTMLButtonElement[]} buttons
 * @param {number} activeIndex
 */
function setActiveReferenceButton(buttons, activeIndex) {
    buttons.forEach((button, index) => {
        button.classList.toggle("is-active", index === activeIndex);
    });
}


/**
 * Initializes contact form interactions.
 */
function initContactForm() {
    const form = getContactForm();
    if (!form) return;
    bindContactValidation(form);
    syncContactSubmitState(form);
}


/**
 * Returns the contact form element.
 * @returns {HTMLFormElement|null}
 */
function getContactForm() {
    return document.getElementById("contactForm");
}


/**
 * Binds all contact form validation events.
 * @param {HTMLFormElement} form
 */
function bindContactValidation(form) {
    form.addEventListener("submit", (event) => handleContactSubmit(event, form));
    getContactFields(form).forEach((field) => bindFieldValidation(field, form));
    getPrivacyCheckbox(form)?.addEventListener("change", () => syncContactSubmitState(form));
}


/**
 * Returns all contact form fields.
 * @param {HTMLFormElement} form
 * @returns {HTMLElement[]}
 */
function getContactFields(form) {
    return [form.contactName, form.contactEmail, form.contactMessage].filter(Boolean);
}


/**
 * Binds validation events for one field.
 * @param {HTMLElement} field
 * @param {HTMLFormElement} form
 */
function bindFieldValidation(field, form) {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => handleFieldInput(field, form));
}


/**
 * Handles field input updates.
 * @param {HTMLElement} field
 * @param {HTMLFormElement} form
 */
function handleFieldInput(field, form) {
    if (hasFeedback(field)) validateField(field);
    syncContactSubmitState(form);
}


/**
 * Handles contact form submit validation.
 * @param {SubmitEvent} event
 * @param {HTMLFormElement} form
 */
function handleContactSubmit(event, form) {
    const isValid = validateContactForm(form);
    if (!isValid) event.preventDefault();
}


/**
 * Validates the full contact form.
 * @param {HTMLFormElement} form
 * @returns {boolean}
 */
function validateContactForm(form) {
    const fieldsValid = getContactFields(form).every((field) => validateField(field));
    const policyValid = validatePrivacyCheckbox(form);
    syncContactSubmitState(form);
    return fieldsValid && policyValid;
}


/**
 * Validates one contact field.
 * @param {HTMLElement} field
 * @returns {boolean}
 */
function validateField(field) {
    const message = getFieldErrorMessage(field);
    showFieldFeedback(field, message);
    toggleInvalidClass(field, Boolean(message));
    return !message;
}


/**
 * Returns the validation error message for one field.
 * @param {HTMLElement} field
 * @returns {string}
 */
function getFieldErrorMessage(field) {
    if (field.id === "contactName") return getNameError(field.value);
    if (field.id === "contactEmail") return getEmailError(field.value);
    return getMessageError(field.value);
}


/**
 * Returns the name validation message.
 * @param {string} value
 * @returns {string}
 */
function getNameError(value) {
    const trimmed = value.trim();
    if (trimmed.length >= 2) return "";
    return "Please enter your name.";
}


/**
 * Returns the email validation message.
 * @param {string} value
 * @returns {string}
 */
function getEmailError(value) {
    const email = value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (regex.test(email)) return "";
    return "Please enter a valid e-mail address.";
}


/**
 * Returns the message validation message.
 * @param {string} value
 * @returns {string}
 */
function getMessageError(value) {
    const trimmed = value.trim();
    if (trimmed.length >= 10) return "";
    return "Please enter a message with at least 10 characters.";
}


/**
 * Shows one field validation message.
 * @param {HTMLElement} field
 * @param {string} message
 */
function showFieldFeedback(field, message) {
    const feedback = getFieldFeedback(field);
    if (!feedback) return;
    feedback.textContent = message;
    feedback.classList.toggle("contact-feedback-visible", Boolean(message));
}


/**
 * Returns one field feedback element.
 * @param {HTMLElement} field
 * @returns {HTMLElement|null}
 */
function getFieldFeedback(field) {
    return field.parentElement?.querySelector(".contact-feedback") ?? null;
}


/**
 * Returns whether one field already shows feedback.
 * @param {HTMLElement} field
 * @returns {boolean}
 */
function hasFeedback(field) {
    return Boolean(getFieldFeedback(field)?.textContent.trim());
}


/**
 * Toggles invalid class on one field.
 * @param {HTMLElement} field
 * @param {boolean} isInvalid
 */
function toggleInvalidClass(field, isInvalid) {
    field.classList.toggle("contact-input-invalid", isInvalid);
}


/**
 * Validates the privacy checkbox.
 * @param {HTMLFormElement} form
 * @returns {boolean}
 */
function validatePrivacyCheckbox(form) {
    const checkbox = getPrivacyCheckbox(form);
    if (!checkbox) return false;
    checkbox.classList.toggle("contact-policy-checkbox-invalid", !checkbox.checked);
    return checkbox.checked;
}


/**
 * Returns the privacy checkbox element.
 * @param {HTMLFormElement} form
 * @returns {HTMLInputElement|null}
 */
function getPrivacyCheckbox(form) {
    return form.querySelector("#privacyPolicyConsent");
}


/**
 * Returns the send button element.
 * @param {HTMLFormElement} form
 * @returns {HTMLButtonElement|null}
 */
function getSendButton(form) {
    return form.querySelector("#sendBtn");
}


/**
 * Syncs send button state with the privacy checkbox.
 * @param {HTMLFormElement} form
 */
function syncContactSubmitState(form) {
    const checkbox = getPrivacyCheckbox(form);
    const button = getSendButton(form);
    if (!checkbox || !button) return;
    button.disabled = !checkbox.checked;
}


/**
 * Returns the contact arrow link element.
 * @returns {HTMLAnchorElement|null}
 */
function getContactArrowLink() {
    return document.querySelector(".contact-arrow-link-right");
}


/**
 * Initializes the legal notice flow behaviour.
 */
function initLegalNoticeFlow() {
    const flow = document.getElementById("legalNoticeFlow");
    const track = document.getElementById("legalNoticeTrack");
    const links = document.querySelectorAll('[data-target="#legalNotice"]');
    if (!flow || !track || links.length === 0) return;
    bindFooterLinks(links, flow, track);
    initLegalArrows(track);
}


/**
 * Binds footer links to legal notice navigation.
 * @param {NodeListOf<HTMLAnchorElement>} links
 * @param {HTMLElement} flow
 * @param {HTMLElement} track
 */
function bindFooterLinks(links, flow, track) {
    links.forEach((link) => {
        link.addEventListener("click", (event) => handleFooterLinkClick(event, link, flow, track));
    });
}


/**
 * Handles footer navigation to the legal notice start page.
 * @param {MouseEvent} event
 * @param {HTMLAnchorElement} link
 * @param {HTMLElement} flow
 * @param {HTMLElement} track
 */
function handleFooterLinkClick(event, link, flow, track) {
    event.preventDefault();
    if (link.closest("#legalNoticeFlow")) return scrollTrackTo(track, 0);
    openLegalNotice(flow);
    requestAnimationFrame(() => scrollTrackTo(track, 0));
}


/**
 * Initializes arrow navigation inside legal notice.
 * @param {HTMLElement} track
 */
function initLegalArrows(track) {
    const rightArrow = document.querySelector(".imprint-arrow");
    const leftArrow = document.querySelector(".legal-back-arrow");
    bindTrackArrow(rightArrow, track, () => track.clientWidth);
    bindTrackArrow(leftArrow, track, () => 0);
}


/**
 * Binds one arrow to a horizontal track position.
 * @param {HTMLButtonElement|null} arrow
 * @param {HTMLElement} track
 * @param {() => number} getPosition
 */
function bindTrackArrow(arrow, track, getPosition) {
    if (!arrow) return;
    arrow.addEventListener("click", () => scrollTrackTo(track, getPosition()));
}


/**
 * Scrolls one track horizontally to a target position.
 * @param {HTMLElement} track
 * @param {number} position
 */
function scrollTrackTo(track, position) {
    track.scrollTo({ left: position, behavior: "smooth" });
}


/**
 * Opens the legal notice flow and hides normal sections.
 * @param {HTMLElement} flow
 */
function openLegalNotice(flow) {
    hideMainSections();
    flow.classList.remove("d-none");
}


/**
 * Closes the legal notice flow and shows normal sections.
 */
function closeLegalNotice() {
    const flow = document.getElementById("legalNoticeFlow");
    if (!flow) return;
    flow.classList.add("d-none");
    showMainSections();
}


/**
 * Returns whether a target belongs to the legal notice flow.
 * @param {string} targetId
 * @returns {boolean}
 */
function isLegalNoticeTarget(targetId) {
    return targetId === "#legalNotice" || targetId === "#legalNoticePageTwo";
}


/**
 * Returns whether a target belongs to the privacy policy flow.
 * @param {string} targetId
 * @returns {boolean}
 */
function isPrivacyPolicyTarget(targetId) {
    return targetId === "#privacyPolicy" || targetId === "#privacyPolicyPageTwo";
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


/**
 * Initializes the mobile legal notice back navigation.
 */
function initLegalMobileBack() {
    const backLink = document.querySelector(".legal-notice-mobile-back");
    if (!backLink) return;
    backLink.addEventListener("click", handleLegalMobileBackClick);
}


/**
 * Handles navigation from legal notice back to contact.
 * @param {MouseEvent} event
 */
function handleLegalMobileBackClick(event) {
    event.preventDefault();
    scrollToPanel("#contact");
}


/**
 * Initializes the legal notice mobile top arrow.
 */
function initLegalMobileTopArrow() {
    const arrow = document.querySelector(".legal-mobile-top-arrow");
    if (!arrow) return;
    arrow.addEventListener("click", scrollLegalTrackToTop);
}


/**
 * Scrolls the legal notice flow to the top.
 */
function scrollLegalTrackToTop() {
    const flow = document.getElementById("legalNoticeFlow");
    const track = document.getElementById("legalNoticeTrack");
    if (isMobileView()) return scrollLegalFlowToTop(flow);
    if (!track) return;
    track.scrollTo({ left: 0, behavior: "smooth" });
}


/**
 * Scrolls the legal notice flow vertically to the top on mobile.
 * @param {HTMLElement|null} flow
 */
function scrollLegalFlowToTop(flow) {
    if (!flow) return;
    flow.scrollTo({ top: 0, behavior: "smooth" });
}


/**
 * Initializes the privacy policy flow behaviour.
 */
function initPrivacyPolicyFlow() {
    const flow = document.getElementById("privacyPolicyFlow");
    const track = document.getElementById("privacyPolicyTrack");
    const links = document.querySelectorAll('[data-target="#privacyPolicy"]');
    if (!flow || !track || links.length === 0) return;
    bindPrivacyFooterLinks(links, flow, track);
    initPrivacyArrows(track);
}


/**
 * Binds footer links to privacy policy navigation.
 * @param {NodeListOf<HTMLAnchorElement>} links
 * @param {HTMLElement} flow
 * @param {HTMLElement} track
 */
function bindPrivacyFooterLinks(links, flow, track) {
    links.forEach((link) => {
        link.addEventListener("click", (event) => handlePrivacyFooterLinkClick(event, link, flow, track));
    });
}


/**
 * Handles footer navigation to the privacy policy start page.
 * @param {MouseEvent} event
 * @param {HTMLAnchorElement} link
 * @param {HTMLElement} flow
 * @param {HTMLElement} track
 */
function handlePrivacyFooterLinkClick(event, link, flow, track) {
    event.preventDefault();
    if (link.closest("#privacyPolicyFlow")) {
        return scrollTrackTo(track, 0);
    }
    if (link.closest("#legalNoticeFlow")) {
        closeLegalNotice();
        openPrivacyPolicy(flow);
        return requestAnimationFrame(() => scrollTrackTo(track, 0));
    }
    openPrivacyPolicy(flow);
    requestAnimationFrame(() => scrollTrackTo(track, 0));
}


/**
 * Initializes arrow navigation inside privacy policy.
 * @param {HTMLElement} track
 */
function initPrivacyArrows(track) {
    const rightArrow = document.querySelector(".privacy-policy-next-arrow");
    const leftArrow = document.querySelector(".privacy-policy-back-arrow");
    bindTrackArrow(rightArrow, track, () => track.clientWidth);
    bindTrackArrow(leftArrow, track, () => 0);
}


/**
 * Opens the privacy policy flow and hides normal sections.
 * @param {HTMLElement} flow
 */
function openPrivacyPolicy(flow) {
    hideMainSections();
    flow.classList.remove("d-none");
}


/**
 * Closes the privacy policy flow and shows normal sections.
 */
function closePrivacyPolicy() {
    const flow = document.getElementById("privacyPolicyFlow");
    if (!flow) return;
    flow.classList.add("d-none");
    showMainSections();
}


/**
 * Initializes the mobile privacy policy back navigation.
 */
function initPrivacyMobileBack() {
    const backLink = document.querySelector(".privacy-policy-mobile-back");
    if (!backLink) return;
    backLink.addEventListener("click", handlePrivacyMobileBackClick);
}


/**
 * Handles navigation from privacy policy back to contact.
 * @param {MouseEvent} event
 */
function handlePrivacyMobileBackClick(event) {
    event.preventDefault();
    scrollToPanel("#contact");
}


/**
 * Initializes the privacy policy mobile top arrow.
 */
function initPrivacyMobileTopArrow() {
    const arrow = document.querySelector(".privacy-mobile-top-arrow");
    if (!arrow) return;
    arrow.addEventListener("click", scrollPrivacyTrackToTop);
}


/**
 * Scrolls the privacy policy flow to the top.
 */
function scrollPrivacyTrackToTop() {
    const flow = document.getElementById("privacyPolicyFlow");
    const track = document.getElementById("privacyPolicyTrack");
    if (isMobileView()) return scrollPrivacyFlowToTop(flow);
    if (!track) return;
    track.scrollTo({ left: 0, behavior: "smooth" });
}


/**
 * Scrolls the privacy policy flow vertically to the top on mobile.
 * @param {HTMLElement|null} flow
 */
function scrollPrivacyFlowToTop(flow) {
    if (!flow) return;
    flow.scrollTo({ top: 0, behavior: "smooth" });
}