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