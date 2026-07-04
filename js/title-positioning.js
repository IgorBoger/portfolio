const SKILLS_TITLE_MIN_BOTTOM_GAP = 80;


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
    resetSkillsStageTop(stage);
    const top = getSkillsTitleTopOffset(wrap, stage);
    wrap.style.top = `${top}px`;
    stage.style.top = `${top}px`;
    queueSectionArrowAlignment();
}


/**
 * Returns the skills title top offset without letting it sit too close to the bottom edge.
 * @param {HTMLElement} wrap
 * @param {HTMLElement} stage
 * @returns {number}
 */
function getSkillsTitleTopOffset(wrap, stage) {
    const container = wrap.offsetParent;
    const containerHeight = container instanceof HTMLElement ? container.clientHeight : 0;
    const maxTop = containerHeight - wrap.offsetHeight - SKILLS_TITLE_MIN_BOTTOM_GAP;
    return Math.max(0, Math.min(stage.offsetTop, maxTop));
}


/**
 * Resets the skills title wrap position.
 */
function resetSkillsTitleWrapPosition() {
    const wrap = getSkillsTitleWrap();
    const stage = getSkillsStage();
    if (wrap) wrap.style.removeProperty("top");
    if (stage) resetSkillsStageTop(stage);
}


/**
 * Resets the inline skills stage top position.
 * @param {HTMLElement} stage
 */
function resetSkillsStageTop(stage) {
    stage.style.removeProperty("top");
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