const MOBILE_TOUCH_EDGE_THRESHOLD = 110;
const MOBILE_WHEEL_EDGE_THRESHOLD = 180;
const MOBILE_WHEEL_RESET_DELAY = 220;


/**
 * Initializes controlled mobile section swiping.
 */
function initMobileSectionSwipeNavigation() {
    const track = getSectionsTrack();
    if (!track) return;
    const state = createMobileSwipeState();
    track.addEventListener("touchstart", (event) => handleMobileSectionTouchStart(event, state), { passive: true });
    track.addEventListener("touchmove", (event) => handleMobileSectionTouchMove(event, state, track), { passive: false });
    track.addEventListener("touchend", () => resetMobileSwipeState(state), { passive: true });
    track.addEventListener("touchcancel", () => resetMobileSwipeState(state), { passive: true });
    track.addEventListener("wheel", (event) => handleMobileSectionWheel(event, state, track), { passive: false });
}


/**
 * Creates the mobile swipe state.
 * @returns {{startX:number,startY:number,edgeStartY:number,edgeDirection:number,wheelDelta:number,isLocked:boolean,lockTimer:number,wheelTimer:number}}
 */
function createMobileSwipeState() {
    return {
        startX: 0,
        startY: 0,
        edgeStartY: 0,
        edgeDirection: 0,
        wheelDelta: 0,
        isLocked: false,
        lockTimer: 0,
        wheelTimer: 0
    };
}


/**
 * Stores the first touch position.
 * @param {TouchEvent} event
 * @param {{startX:number,startY:number,edgeStartY:number,edgeDirection:number,wheelDelta:number}} state
 */
function handleMobileSectionTouchStart(event, state) {
    if (!isMobileView() || event.touches.length !== 1) return;
    state.startX = event.touches[0].clientX;
    state.startY = event.touches[0].clientY;
    resetMobileEdgeState(state);
}


/**
 * Routes strong vertical swipes to one section at a time.
 * @param {TouchEvent} event
 * @param {{startX:number,startY:number,edgeStartY:number,edgeDirection:number,isLocked:boolean,lockTimer:number}} state
 * @param {HTMLElement} track
 */
function handleMobileSectionTouchMove(event, state, track) {
    if (!shouldHandleMobileSectionSwipe(event, state)) return;
    const currentY = event.touches[0].clientY;
    const deltaY = state.startY - currentY;
    const panel = getCurrentMobileSectionPanel(track);
    if (canScrollPanelVertically(panel, deltaY)) {
        resetMobileEdgeState(state);
        return;
    }
    if (event.cancelable) event.preventDefault();
    if (state.isLocked) return;
    if (!hasMobileTouchEdgeIntent(state, currentY, deltaY)) return;
    if (navigateMobileSection(track, deltaY > 0 ? 1 : -1)) lockMobileSwipeState(state);
}


/**
 * Routes wheel input in the mobile layout to one section at a time.
 * @param {WheelEvent} event
 * @param {{wheelDelta:number,wheelTimer:number,isLocked:boolean,lockTimer:number}} state
 * @param {HTMLElement} track
 */
function handleMobileSectionWheel(event, state, track) {
    if (!shouldHandleMobileSectionWheel(event)) return;
    const panel = getCurrentMobileSectionPanel(track);
    if (canScrollPanelVertically(panel, event.deltaY)) {
        resetMobileWheelState(state);
        return;
    }
    if (event.cancelable) event.preventDefault();
    if (state.isLocked) return;
    if (!hasMobileWheelEdgeIntent(state, event.deltaY)) return;
    if (navigateMobileSection(track, event.deltaY > 0 ? 1 : -1)) lockMobileSwipeState(state);
}


/**
 * Returns whether wheel input should control mobile section navigation.
 * @param {WheelEvent} event
 * @returns {boolean}
 */
function shouldHandleMobileSectionWheel(event) {
    if (!isMobileView() || document.body.classList.contains("is-contact-field-focused")) return false;
    if (isMobileStaticFlowOpen()) return false;
    return Math.abs(event.deltaY) > Math.abs(event.deltaX);
}


/**
 * Returns whether a touch move should control section navigation.
 * @param {TouchEvent} event
 * @param {{startX:number,startY:number,isLocked:boolean,lockTimer:number}} state
 * @returns {boolean}
 */
function shouldHandleMobileSectionSwipe(event, state) {
    if (!isMobileView() || document.body.classList.contains("is-contact-field-focused")) return false;
    if (isMobileStaticFlowOpen()) return false;
    if (event.touches.length !== 1) return false;
    const deltaX = state.startX - event.touches[0].clientX;
    const deltaY = state.startY - event.touches[0].clientY;
    return Math.abs(deltaY) > 42 && Math.abs(deltaY) > Math.abs(deltaX);
}


/**
 * Returns whether the user moved far enough after reaching a section edge.
 * @param {{edgeStartY:number,edgeDirection:number}} state
 * @param {number} currentY
 * @param {number} deltaY
 * @returns {boolean}
 */
function hasMobileTouchEdgeIntent(state, currentY, deltaY) {
    const direction = deltaY > 0 ? 1 : -1;
    if (state.edgeDirection !== direction) {
        state.edgeDirection = direction;
        state.edgeStartY = currentY;
        return false;
    }
    return Math.abs(state.edgeStartY - currentY) >= MOBILE_TOUCH_EDGE_THRESHOLD;
}


/**
 * Returns whether wheel input is strong enough to leave the current section.
 * @param {{wheelDelta:number,wheelTimer:number}} state
 * @param {number} deltaY
 * @returns {boolean}
 */
function hasMobileWheelEdgeIntent(state, deltaY) {
    if (Math.sign(state.wheelDelta) !== Math.sign(deltaY)) state.wheelDelta = 0;
    state.wheelDelta += deltaY;
    window.clearTimeout(state.wheelTimer);
    state.wheelTimer = window.setTimeout(() => resetMobileWheelState(state), MOBILE_WHEEL_RESET_DELAY);
    return Math.abs(state.wheelDelta) >= MOBILE_WHEEL_EDGE_THRESHOLD;
}


/**
 * Returns whether a legal or privacy flow is currently open.
 * @returns {boolean}
 */
function isMobileStaticFlowOpen() {
    return isVisibleMobileFlow("legalNoticeFlow") || isVisibleMobileFlow("privacyPolicyFlow");
}


/**
 * Returns whether one mobile flow is visible.
 * @param {string} flowId
 * @returns {boolean}
 */
function isVisibleMobileFlow(flowId) {
    const flow = document.getElementById(flowId);
    return Boolean(flow && !flow.classList.contains("d-none"));
}


/**
 * Returns the panel closest to the current mobile track position.
 * @param {HTMLElement} track
 * @returns {HTMLElement|null}
 */
function getCurrentMobileSectionPanel(track) {
    const panels = getSectionPanels();
    return panels.reduce((closest, panel) => {
        if (!closest) return panel;
        const currentDistance = Math.abs(track.scrollTop - panel.offsetTop);
        const closestDistance = Math.abs(track.scrollTop - closest.offsetTop);
        return currentDistance < closestDistance ? panel : closest;
    }, null);
}


/**
 * Returns whether the current panel can still scroll in the swipe direction.
 * @param {HTMLElement|null} panel
 * @param {number} deltaY
 * @returns {boolean}
 */
function canScrollPanelVertically(panel, deltaY) {
    if (!panel) return false;
    if (deltaY > 0) return panel.scrollTop + panel.clientHeight < panel.scrollHeight - 2;
    return panel.scrollTop > 2;
}


/**
 * Scrolls the mobile track by one main section.
 * @param {HTMLElement} track
 * @param {number} direction
 * @returns {boolean}
 */
function navigateMobileSection(track, direction) {
    const panels = getSectionPanels();
    const current = getCurrentMobileSectionPanel(track);
    const currentIndex = panels.indexOf(current);
    if (currentIndex < 0) return false;
    const nextIndex = Math.min(Math.max(currentIndex + direction, 0), panels.length - 1);
    if (nextIndex === currentIndex) return false;
    scrollToMobileSection(track, panels[nextIndex]);
    return true;
}


/**
 * Temporarily locks section swipes while smooth scrolling runs.
 * @param {{isLocked:boolean,lockTimer:number}} state
 */
function lockMobileSwipeState(state) {
    state.isLocked = true;
    resetMobileEdgeState(state);
    resetMobileWheelState(state);
    window.clearTimeout(state.lockTimer);
    state.lockTimer = window.setTimeout(() => {
        state.isLocked = false;
    }, 750);
}


/**
 * Resets mobile swipe state.
 * @param {{edgeStartY:number,edgeDirection:number,wheelDelta:number,wheelTimer:number,isLocked:boolean,lockTimer:number}} state
 */
function resetMobileSwipeState(state) {
    window.clearTimeout(state.lockTimer);
    resetMobileEdgeState(state);
    resetMobileWheelState(state);
    state.isLocked = false;
}


/**
 * Resets the touch edge buffer.
 * @param {{edgeStartY:number,edgeDirection:number}} state
 */
function resetMobileEdgeState(state) {
    state.edgeStartY = 0;
    state.edgeDirection = 0;
}


/**
 * Resets the wheel edge buffer.
 * @param {{wheelDelta:number,wheelTimer:number}} state
 */
function resetMobileWheelState(state) {
    window.clearTimeout(state.wheelTimer);
    state.wheelDelta = 0;
}
