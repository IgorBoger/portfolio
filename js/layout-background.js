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