/**
 * Initializes all UI and navigation features.
 */
function init() {
    renderProjects();
    renderDesktopSharedSections();
    renderSharedSections();
    initMobileMenu();
    initSectionArrows();
    initSectionArrowAlignment();
    initSidebarNavigation();
    initLogoNavigation();
    initMobileMenuNavigation();
    initContactButton();
    initContactArrowNavigation();
    initShellBackground();
    initDragScroll();
    initDragScrollResize();
    initActiveSectionTracking();
    initFadeInOnScroll();
    initSectionViewportReveal();
    initAccentBarReveal();
    initSkillsTitleWrapPosition();
    initContactTitleWrapPosition();
    initHeaderReveal();
    initHeroTitle();
    initHeroLocation();
    initFrontendDeveloper();
    initFrontendDeveloperMobile();
    initHeroImage();
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


/**
 * Renders all shared desktop contact sections.
 */
function renderDesktopSharedSections() {
    renderDesktopContactSharedArea();
}


/**
 * Renders the desktop shared contact area.
 */
function renderDesktopContactSharedArea() {
    const container = document.getElementById("desktopContactSharedArea");
    if (!container) return;
    container.innerHTML += createDesktopContactSharedMarkup();
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


/**
 * Returns the mobile sidebar element.
 * @returns {HTMLElement|null}
 */
function getSidebar() {
    return document.querySelector(".sidebar");
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
 * Moves focus to a safe element after menu closes.
 * @param {HTMLButtonElement} toggleBtn
 */
function moveFocusAfterMenuClose(toggleBtn) {
    toggleBtn.focus();
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
 * Initializes mobile menu event listeners.
 */
function initMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    const toggleBtn = document.getElementById("mobileMenuToggle");
    if (!menu || !toggleBtn) return;
    toggleBtn.addEventListener("click", () => toggleMobileMenu(menu, toggleBtn));
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
 * Initializes contact button navigation to the contact section.
 */
function initContactButton() {
    const buttons = document.querySelectorAll(".whyme-contact-btn, .contact-trigger-btn");
    if (buttons.length === 0) return;
    buttons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            scrollToPanel("#contact");
        });
    });
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
 * Initializes dynamic desktop arrow alignment.
 */
function initSectionArrowAlignment() {
    updateSectionArrowAlignment();
    queueSectionArrowAlignment();
    window.addEventListener("resize", queueSectionArrowAlignment);
    window.addEventListener("load", queueSectionArrowAlignment);
    document.fonts?.ready.then(queueSectionArrowAlignment);
}


/**
 * Queues repeated arrow alignment after layout updates.
 */
function queueSectionArrowAlignment() {
    requestAnimationFrame(() => {
        updateSectionArrowAlignment();
        requestAnimationFrame(updateSectionArrowAlignment);
    });
}


/**
 * Updates all desktop section arrow positions.
 */
function updateSectionArrowAlignment() {
    if (isMobileView()) return resetSectionArrowAlignment();
    getDynamicSectionArrows().forEach(updateSingleSectionArrow);
}


/**
 * Returns all dynamically aligned section arrows.
 * @returns {HTMLButtonElement[]}
 */
function getDynamicSectionArrows() {
    return Array.from(document.querySelectorAll(".section-arrow[data-arrow-target]"));
}


/**
 * Updates one arrow against its target title.
 * @param {HTMLButtonElement} arrow
 */
function updateSingleSectionArrow(arrow) {
    const target = getArrowTarget(arrow);
    const container = getArrowContainer(arrow);
    if (!target || !container) return;
    setArrowTop(arrow, getArrowTopOffset(container, target, arrow));
}


/**
 * Returns the target element for one arrow.
 * @param {HTMLButtonElement} arrow
 * @returns {HTMLElement|null}
 */
function getArrowTarget(arrow) {
    const selector = arrow.dataset.arrowTarget;
    const target = selector ? document.querySelector(selector) : null;
    return target instanceof HTMLElement ? target : null;
}


/**
 * Returns the positioning container for one arrow.
 * @param {HTMLButtonElement} arrow
 * @returns {HTMLElement|null}
 */
function getArrowContainer(arrow) {
    const parent = arrow.offsetParent;
    return parent instanceof HTMLElement ? parent : arrow.parentElement;
}


/**
 * Returns the computed top offset for one arrow.
 * @param {HTMLElement} container
 * @param {HTMLElement} target
 * @param {HTMLButtonElement} arrow
 * @returns {number}
 */
function getArrowTopOffset(container, target, arrow) {
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const arrowHeight = arrow.offsetHeight || 0;
    const top = targetRect.top - containerRect.top + targetRect.height - arrowHeight;
    return Math.max(0, Math.round(top));
}


/**
 * Sets the top position for one arrow.
 * @param {HTMLButtonElement} arrow
 * @param {number} top
 */
function setArrowTop(arrow, top) {
    arrow.style.top = `${top}px`;
    arrow.style.bottom = "auto";
}


/**
 * Resets desktop arrow alignment on mobile.
 */
function resetSectionArrowAlignment() {
    getDynamicSectionArrows().forEach(resetSingleSectionArrow);
}


/**
 * Resets one arrow inline position.
 * @param {HTMLButtonElement} arrow
 */
function resetSingleSectionArrow(arrow) {
    arrow.style.removeProperty("top");
    arrow.style.removeProperty("bottom");
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
 * Initializes layout shell background syncing.
 */
function initShellBackground() {
    const shell = getLayoutShell();
    if (!shell) return;
    bindShellBackgroundEvents(shell);
    syncShellBackground(shell);
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
 * @param {HTMLElement} shell
 */
function bindShellBackgroundEvents(shell) {
    getBackgroundTracks().forEach((track) => {
        track.addEventListener("scroll", () => queueShellBackgroundSync(shell));
    });
    window.addEventListener("resize", () => queueShellBackgroundSync(shell));
}


/**
 * Returns all tracks that can drive the shell background.
 * @returns {HTMLElement[]}
 */
function getBackgroundTracks() {
    const sectionsTrack = document.getElementById("sectionsTrack");
    const legalTrack = document.getElementById("legalNoticeTrack");
    const privacyTrack = document.getElementById("privacyPolicyTrack");
    return [sectionsTrack, legalTrack, privacyTrack].filter(Boolean);
}


/**
 * Queues one shell background sync.
 * @param {HTMLElement} shell
 */
function queueShellBackgroundSync(shell) {
    requestAnimationFrame(() => syncShellBackground(shell));
}


/**
 * Syncs the shell background with the active track.
 * @param {HTMLElement|null} shell
 */
function syncShellBackground(shell = getLayoutShell()) {
    const track = getActiveBackgroundTrack();
    if (!shell) return;
    if (!track) return resetShellBackground(shell);
    applyShellBackground(track, shell);
}


/**
 * Returns the active background track.
 * @returns {HTMLElement|null}
 */
function getActiveBackgroundTrack() {
    if (isFlowVisible("legalNoticeFlow")) return null;
    if (isFlowVisible("privacyPolicyFlow")) return null;
    return getSectionsTrack();
}


/**
 * Returns whether one flow is currently visible.
 * @param {string} flowId
 * @returns {boolean}
 */
function isFlowVisible(flowId) {
    const flow = document.getElementById(flowId);
    return Boolean(flow && !flow.classList.contains("d-none"));
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
 * Binds flow background events.
 * @param {HTMLElement} flow
 * @param {HTMLElement} track
 */
function bindFlowBackgroundEvents(flow, track) {
    track.addEventListener("scroll", () => queueFlowBackgroundSync(flow, track));
    window.addEventListener("resize", () => queueFlowBackgroundSync(flow, track));
}


/**
 * Queues one flow background sync.
 * @param {HTMLElement} flow
 * @param {HTMLElement} track
 */
function queueFlowBackgroundSync(flow, track) {
    requestAnimationFrame(() => applyFlowBackground(flow, track));
}


/**
 * Applies one flow background.
 * @param {HTMLElement} flow
 * @param {HTMLElement} track
 */
function applyFlowBackground(flow, track) {
    const shell = getLayoutShell();
    if (!shell) return;
    if (isMobileView()) return resetFlowBackground(flow);
    const bgWidth = `${getFlowBackgroundRenderWidth(track)}px 100%`;
    const bgX = `${-track.scrollLeft}px`;
    setFlowBackgroundSize(shell, bgWidth);
    setFlowBackgroundX(shell, bgX);
    shell.classList.add("has-flow-bg");
}


/**
 * Resets one flow background.
 * @param {HTMLElement} flow
 */
function resetFlowBackground(flow) {
    const shell = getLayoutShell();
    if (!shell) return;
    shell.style.removeProperty("--flow-bg-size");
    shell.style.removeProperty("--flow-bg-x");
    shell.classList.remove("has-flow-bg");
}


/**
 * Returns the full render width for one flow background.
 * @param {HTMLElement} track
 * @returns {number}
 */
function getFlowBackgroundRenderWidth(track) {
    const shell = getLayoutShell();
    if (!shell) return track.scrollWidth;
    const trackRect = track.getBoundingClientRect();
    const shellRect = shell.getBoundingClientRect();
    return track.scrollWidth + (trackRect.left - shellRect.left);
}


/**
 * Sets one flow background size.
 * @param {HTMLElement} flow
 * @param {string} size
 */
function setFlowBackgroundSize(flow, size) {
    flow.style.setProperty("--flow-bg-size", size);
}


/**
 * Sets one flow background x position.
 * @param {HTMLElement} flow
 * @param {string} x
 */
function setFlowBackgroundX(flow, x) {
    flow.style.setProperty("--flow-bg-x", x);
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
        ".reference-card, .fade-in, .contact-mobile-reveal"
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
    queueSectionArrowAlignment();
}


/**
 * Initializes one-time reveal animations for section titles and reveal arrows.
 */
function initSectionViewportReveal() {
    const items = getSectionRevealItems();
    if (items.length === 0) return;
    const observer = createSectionRevealObserver();
    items.forEach((item) => observer.observe(item));
}


/**
 * Returns all section elements that should reveal on view.
 * @returns {HTMLElement[]}
 */
function getSectionRevealItems() {
    return Array.from(document.querySelectorAll(
        ".whyme-title, .skills-title, .mywork-title, .contact-title, .arrow-reveal-right, .arrow-reveal-left"
    ));
}


/**
 * Creates the section reveal observer.
 * @returns {IntersectionObserver}
 */
function createSectionRevealObserver() {
    const root = isMobileView() ? null : getSectionsTrack();
    return new IntersectionObserver(handleSectionRevealEntries, {
        root,
        threshold: 0.35
    });
}


/**
 * Handles section reveal entries.
 * @param {IntersectionObserverEntry[]} entries
 */
function handleSectionRevealEntries(entries) {
    entries.forEach((entry) => revealSectionItem(entry));
}


/**
 * Reveals one section item when visible.
 * @param {IntersectionObserverEntry} entry
 */
function revealSectionItem(entry) {
    entry.target.classList.toggle("is-visible", entry.isIntersecting);
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
 * Returns the legal notice track.
 * @returns {HTMLElement|null}
 */
function getLegalNoticeTrack() {
    return document.getElementById("legalNoticeTrack");
}


/**
 * Returns the privacy policy track.
 * @returns {HTMLElement|null}
 */
function getPrivacyPolicyTrack() {
    return document.getElementById("privacyPolicyTrack");
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


/**
 * Initializes the skills title wrap position sync.
 */
function initSkillsTitleWrapPosition() {
    syncSkillsTitleWrapPosition();
    window.addEventListener("resize", syncSkillsTitleWrapPosition);
    window.addEventListener("load", syncSkillsTitleWrapPosition);
    document.fonts?.ready.then(syncSkillsTitleWrapPosition);
}


/**
 * Syncs the skills title wrap with the skills stage top.
 */
function syncSkillsTitleWrapPosition() {
    if (isMobileView()) return resetSkillsTitleWrapPosition();
    const wrap = getSkillsTitleWrap();
    const stage = getSkillsStage();
    if (!wrap || !stage) return;
    wrap.style.top = `${stage.offsetTop}px`;
    queueSectionArrowAlignment();
}


/**
 * Resets the skills title wrap position.
 */
function resetSkillsTitleWrapPosition() {
    const wrap = getSkillsTitleWrap();
    if (!wrap) return;
    wrap.style.removeProperty("top");
}


/**
 * Returns the skills title wrap.
 * @returns {HTMLElement|null}
 */
function getSkillsTitleWrap() {
    return document.querySelector(".skills-title-wrap");
}


/**
 * Returns the skills stage.
 * @returns {HTMLElement|null}
 */
function getSkillsStage() {
    return document.querySelector(".skills-stage");
}


/**
 * Initializes the contact title wrap position sync.
 */
function initContactTitleWrapPosition() {
    syncContactTitleWrapPosition();
    window.addEventListener("resize", syncContactTitleWrapPosition);
    window.addEventListener("load", syncContactTitleWrapPosition);
    document.fonts?.ready.then(syncContactTitleWrapPosition);
}


/**
 * Syncs the contact title wrap with the contact stage top.
 */
function syncContactTitleWrapPosition() {
    if (isMobileView()) return resetContactTitleWrapPosition();
    const wrap = getContactTitleWrap();
    const stage = getContactStage();
    if (!wrap || !stage) return;
    wrap.style.top = `${stage.offsetTop}px`;
    queueSectionArrowAlignment();
}


/**
 * Resets the contact title wrap position.
 */
function resetContactTitleWrapPosition() {
    const wrap = getContactTitleWrap();
    if (!wrap) return;
    wrap.style.removeProperty("top");
}


/**
 * Returns the contact title wrap.
 * @returns {HTMLElement|null}
 */
function getContactTitleWrap() {
    return document.querySelector(".contact-title-wrap");
}


/**
 * Returns the contact stage.
 * @returns {HTMLElement|null}
 */
function getContactStage() {
    return document.querySelector(".contact-stage");
}


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
    setInitialReferenceButton(grid, buttons);
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
 * Sets the initial active reference button state.
 * @param {HTMLElement} grid
 * @param {HTMLButtonElement[]} buttons
 */
function setInitialReferenceButton(grid, buttons) {
    storeActiveReferenceIndex(grid, 0);
    setActiveReferenceButton(grid, buttons, 0);
}


/**
 * Stores the current active reference index.
 * @param {HTMLElement} grid
 * @param {number} index
 */
function storeActiveReferenceIndex(grid, index) {
    grid.dataset.activeReferenceIndex = String(index);
}


/**
 * Updates the active state of all reference buttons.
 * @param {HTMLElement} grid
 * @param {HTMLButtonElement[]} buttons
 * @param {number} activeIndex
 */
function setActiveReferenceButton(grid, buttons, activeIndex) {
    storeActiveReferenceIndex(grid, activeIndex);
    buttons.forEach((button, index) => {
        button.classList.toggle("is-active", index === activeIndex);
    });
}


/**
 * Binds click events to all reference control buttons.
 * @param {HTMLElement} grid
 * @param {HTMLButtonElement[]} buttons
 * @param {HTMLElement[]} cards
 */
function bindReferenceControlButtons(grid, buttons, cards) {
    buttons.forEach((button) => {
        button.addEventListener("click", () => handleReferenceButtonClick(grid, buttons, cards, button));
    });
}


/**
 * Handles one reference control button click.
 * @param {HTMLElement} grid
 * @param {HTMLButtonElement[]} buttons
 * @param {HTMLElement[]} cards
 * @param {HTMLButtonElement} button
 */
function handleReferenceButtonClick(grid, buttons, cards, button) {
    const index = getReferenceButtonIndex(button);
    const card = cards[index];
    if (!card || isSameReferenceIndex(grid, index)) return;
    scrollReferenceCardIntoView(grid, card);
    setActiveReferenceButton(grid, buttons, index);
}


/**
 * Syncs the active button with the current scroll position.
 * @param {HTMLElement} grid
 * @param {HTMLButtonElement[]} buttons
 * @param {HTMLElement[]} cards
 */
function syncReferenceButtonsOnScroll(grid, buttons, cards) {
    grid.addEventListener("scroll", () => handleReferenceGridScroll(grid, buttons, cards));
}


/**
 * Handles the reference grid scroll sync.
 * @param {HTMLElement} grid
 * @param {HTMLButtonElement[]} buttons
 * @param {HTMLElement[]} cards
 */
function handleReferenceGridScroll(grid, buttons, cards) {
    const activeIndex = getActiveReferenceIndex(grid, cards);
    if (isSameReferenceIndex(grid, activeIndex)) return;
    setActiveReferenceButton(grid, buttons, activeIndex);
}


/**
 * Checks whether the reference index is already active.
 * @param {HTMLElement} grid
 * @param {number} index
 * @returns {boolean}
 */
function isSameReferenceIndex(grid, index) {
    return Number(grid.dataset.activeReferenceIndex) === index;
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
    return document.querySelector(".contact-arrow-back");
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
    if (link.closest("#legalNoticeFlow")) return resetFlowStart(flow, track);
    if (link.closest("#privacyPolicyFlow")) closePrivacyPolicy();
    openLegalNotice(flow);
    requestAnimationFrame(() => resetFlowStart(flow, track));
}


/**
 * Scrolls one flow to its start position.
 * @param {HTMLElement|null} flow
 * @param {HTMLElement|null} track
 */
function resetFlowStart(flow, track) {
    if (isMobileView()) return flow?.scrollTo({ top: 0, behavior: "auto" });
    if (!track) return;
    scrollTrackTo(track, 0);
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
    const track = document.getElementById("legalNoticeTrack");
    hideMainSections();
    flow.classList.remove("d-none");
    syncShellBackground();
    if (track) queueFlowBackgroundSync(flow, track);
}


/**
 * Closes the legal notice flow and shows normal sections.
 */
function closeLegalNotice() {
    const flow = document.getElementById("legalNoticeFlow");
    if (!flow) return;
    resetFlowBackground(flow);
    flow.classList.add("d-none");
    showMainSections();
    syncShellBackground();
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
    if (link.closest("#privacyPolicyFlow")) return resetFlowStart(flow, track);
    if (link.closest("#legalNoticeFlow")) closeLegalNotice();
    openPrivacyPolicy(flow);
    requestAnimationFrame(() => resetFlowStart(flow, track));
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
    const track = document.getElementById("privacyPolicyTrack");
    hideMainSections();
    flow.classList.remove("d-none");
    syncShellBackground();
    if (track) queueFlowBackgroundSync(flow, track);
}


/**
 * Closes the privacy policy flow and shows normal sections.
 */
function closePrivacyPolicy() {
    const flow = document.getElementById("privacyPolicyFlow");
    if (!flow) return;
    resetFlowBackground(flow);
    flow.classList.add("d-none");
    showMainSections();
    syncShellBackground();
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


window.addEventListener("DOMContentLoaded", init, { once: true });
window.addEventListener("load", () => syncShellBackground(), { once: true });