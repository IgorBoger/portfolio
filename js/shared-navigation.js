/**
 * Initializes all shared desktop back arrows.
 */
function initSharedBackArrows() {
    getSharedBackArrows().forEach(bindSharedBackArrow);
}


/**
 * Returns all shared desktop back arrows.
 * @returns {HTMLAnchorElement[]}
 */
function getSharedBackArrows() {
    return Array.from(document.querySelectorAll(".shared-back-arrow"));
}


/**
 * Binds one shared desktop back arrow.
 * @param {HTMLAnchorElement} arrow
 */
function bindSharedBackArrow(arrow) {
    arrow.addEventListener("click", handleSharedBackArrowClick);
}


/**
 * Handles one shared desktop back arrow click.
 * @param {MouseEvent} event
 */
function handleSharedBackArrowClick(event) {
    event.preventDefault();
    if (isInsideFlow(event, "legalNoticeFlow")) return scrollLegalNoticeToStart();
    if (isInsideFlow(event, "privacyPolicyFlow")) return scrollPrivacyPolicyToStart();
    scrollToPanel("#top");
}


/**
 * Initializes all shared mobile top arrows.
 */
function initSharedTopArrows() {
    getSharedTopArrows().forEach(bindSharedTopArrow);
}


/**
 * Returns all shared top arrow buttons.
 * @returns {HTMLButtonElement[]}
 */
function getSharedTopArrows() {
    return Array.from(document.querySelectorAll(".shared-top-arrow"));
}


/**
 * Binds one shared top arrow.
 * @param {HTMLButtonElement} arrow
 */
function bindSharedTopArrow(arrow) {
    arrow.addEventListener("click", handleSharedTopArrowClick);
}


/**
 * Handles one shared top arrow click.
 * @param {MouseEvent} event
 */
function handleSharedTopArrowClick(event) {
    if (isInsideFlow(event, "legalNoticeFlow")) return scrollFlowToTop("legalNoticeFlow");
    if (isInsideFlow(event, "privacyPolicyFlow")) return scrollFlowToTop("privacyPolicyFlow");
    scrollToPanel("#top");
}


/**
 * Checks whether the event target is inside one flow.
 * @param {MouseEvent} event
 * @param {string} flowId
 * @returns {boolean}
 */
function isInsideFlow(event, flowId) {
    return event.target instanceof Element && Boolean(event.target.closest(`#${flowId}`));
}


/**
 * Scrolls one flow to top.
 * @param {string} flowId
 */
function scrollFlowToTop(flowId) {
    document.getElementById(flowId)?.scrollTo({ top: 0, behavior: getMotionSafeScrollBehavior() });
}