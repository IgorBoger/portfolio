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
 * Initializes desktop wheel scrolling for horizontal tracks.
 */
function initWheelHorizontalScroll() {
    getWheelScrollTracks().forEach(bindWheelScrollTrack);
}


/**
 * Returns all horizontal wheel scroll tracks.
 * @returns {HTMLElement[]}
 */
function getWheelScrollTracks() {
    return [getSectionsTrack(), getLegalNoticeTrack(), getPrivacyPolicyTrack(), getReferenceGrid()].filter(Boolean);
}


/**
 * Binds mouse wheel scrolling to one horizontal track.
 * @param {HTMLElement} track
 */
function bindWheelScrollTrack(track) {
    track.addEventListener("wheel", (event) => handleWheelScroll(event, track), { passive: false });
}


/**
 * Handles vertical wheel input as horizontal scroll.
 * @param {WheelEvent} event
 * @param {HTMLElement} track
 */
function handleWheelScroll(event, track) {
    if (!shouldUseHorizontalWheel(event, track)) return;
    event.preventDefault();
    event.stopPropagation();
    track.scrollLeft += getWheelScrollAmount(event);
}


/**
 * Checks whether horizontal wheel scrolling is allowed.
 * @param {WheelEvent} event
 * @param {HTMLElement} track
 * @returns {boolean}
 */
function shouldUseHorizontalWheel(event, track) {
    if (isMobileView() && !isReferenceWheelTrack(track)) return false;
    return !event.target.closest("input, textarea, select");
}


/**
 * Checks if one track is the reference card slider.
 * @param {HTMLElement} track
 * @returns {boolean}
 */
function isReferenceWheelTrack(track) {
    return track.classList.contains("references-grid");
}


/**
 * Returns a stronger horizontal wheel scroll amount.
 * @param {WheelEvent} event
 * @returns {number}
 */
function getWheelScrollAmount(event) {
    return event.deltaY * 3.2;
}