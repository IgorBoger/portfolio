/**
 * Returns the privacy policy track.
 * @returns {HTMLElement|null}
 */
function getPrivacyPolicyTrack() {
    return document.getElementById("privacyPolicyTrack");
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
 * Scrolls the privacy policy flow to its first page.
 */
function scrollPrivacyPolicyToStart() {
    const track = document.getElementById("privacyPolicyTrack");
    if (!track) return;
    scrollTrackTo(track, 0);
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