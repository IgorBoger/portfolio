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
    bindArrowAlignmentEvents();
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
 * Binds all layout events that can affect arrow alignment.
 */
function bindArrowAlignmentEvents() {
    const track = getSectionsTrack();
    if (track) track.addEventListener("scroll", queueSectionArrowAlignment);
    window.addEventListener("resize", queueSectionArrowAlignment);
    window.addEventListener("load", queueSectionArrowAlignment);
    document.fonts?.ready.then(queueSectionArrowAlignment);
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