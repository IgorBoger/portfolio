/**
 * Returns the legal notice track.
 * @returns {HTMLElement|null}
 */
function getLegalNoticeTrack() {
    return document.getElementById("legalNoticeTrack");
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
 * Opens the legal notice flow and hides normal sections.
 * @param {HTMLElement} flow
 */
function openLegalNotice(flow) {
    const track = document.getElementById("legalNoticeTrack");
    hideMainSections();
    flow.classList.remove("d-none");
    revealStaticFlowContent(flow);
    syncShellBackground();
    requestAnimationFrame(refreshLegalPrivacyScrollHints);
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
 * Scrolls the legal notice flow to its first page.
 */
function scrollLegalNoticeToStart() {
    const track = document.getElementById("legalNoticeTrack");
    if (!track) return;
    scrollTrackTo(track, 0);
}