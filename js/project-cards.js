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
    scrollProjectCardAfterClose(card, nextState);
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
 * Updates all project toggle translations.
 */
function updateProjectToggleTranslations() {
    getProjectCards().forEach(updateProjectToggleTranslation);
}


/**
 * Updates one project card toggle translation.
 * @param {HTMLElement} card
 */
function updateProjectToggleTranslation(card) {
    const insideButton = getInsideProjectButton(card);
    const outsideButton = getOutsideProjectButton(card);
    updateProjectButtons(insideButton, outsideButton, isProjectCardExpanded(card));
}


/**
 * Updates the inside project button.
 * @param {HTMLButtonElement|null} button
 * @param {boolean} isExpanded
 */
function updateInsideProjectButton(button, isExpanded) {
    if (!button) return;
    button.setAttribute("aria-expanded", String(isExpanded));
    setProjectButtonContent(button, "projectShowMoreBtn", "▼", !isExpanded);
}


/**
 * Updates the outside project button.
 * @param {HTMLButtonElement|null} button
 * @param {boolean} isExpanded
 */
function updateOutsideProjectButton(button, isExpanded) {
    if (!button) return;
    button.setAttribute("aria-expanded", String(isExpanded));
    setProjectButtonContent(button, "projectShowLessBtn", "▲", isExpanded);
}


/**
 * Sets the label and icon of one project button.
 * @param {HTMLButtonElement} button
 * @param {string} translationKey
 * @param {string} iconText
 * @param {boolean} shouldShow
 */
function setProjectButtonContent(button, translationKey, iconText, shouldShow) {
    const label = getProjectButtonLabel(button);
    const icon = getProjectButtonIcon(button);
    if (label) label.textContent = shouldShow ? getProjectToggleText(translationKey) : "";
    if (icon) icon.textContent = shouldShow ? iconText : "";
}


/**
 * Returns the translated project toggle text.
 * @param {string} translationKey
 * @returns {string}
 */
function getProjectToggleText(translationKey) {
    const language = document.documentElement.lang || "en";
    if (typeof findTranslationValue !== "function") return translationKey;
    return findTranslationValue(translations[language], translationKey) || translationKey;
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
 * Scrolls back to the project card after the close animation.
 * @param {HTMLElement} card
 * @param {boolean} isExpanded
 */
function scrollProjectCardAfterClose(card, isExpanded) {
    if (!isMobileView() || isExpanded) return;
    window.setTimeout(() => scrollProjectCardToTop(card), 500);
}


/**
 * Scrolls one project card into a stable mobile position.
 * @param {HTMLElement} card
 */
function scrollProjectCardToTop(card) {
    const track = getSectionsTrack();
    if (!track) return;
    track.scrollTo({ top: getProjectCardTrackTop(card, track), behavior: getMotionSafeScrollBehavior() });
}


/**
 * Returns the target scroll position for one project card.
 * @param {HTMLElement} card
 * @param {HTMLElement} track
 * @returns {number}
 */
function getProjectCardTrackTop(card, track) {
    const cardTop = card.getBoundingClientRect().top;
    const trackTop = track.getBoundingClientRect().top;
    return track.scrollTop + cardTop - trackTop - getProjectCardScrollOffset();
}


/**
 * Returns the mobile offset for project card scroll alignment.
 * @returns {number}
 */
function getProjectCardScrollOffset() {
    return (document.querySelector(".sidebar-inner")?.getBoundingClientRect().height || 0) + 36;
}