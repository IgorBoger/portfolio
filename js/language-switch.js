/**
 * Initializes the language switch buttons.
 */
function initLanguageSwitch() {
    getLanguageButtons().forEach(bindLanguageButton);
    applyLanguage("en");
}


/**
 * Returns all language buttons.
 * @returns {HTMLButtonElement[]}
 */
function getLanguageButtons() {
    return Array.from(document.querySelectorAll(".lang-btn"));
}


/**
 * Binds one language button.
 * @param {HTMLButtonElement} button
 */
function bindLanguageButton(button) {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
}


/**
 * Applies the selected language.
 * @param {string} language
 */
function applyLanguage(language) {
    if (!translations[language]) return;
    document.documentElement.lang = language;
    document.title = translations[language].documentTitle;
    updateTranslatedTexts(language);
    updateLanguageButtons(language);
}


/**
 * Updates all translated text elements.
 * @param {string} language
 */
function updateTranslatedTexts(language) {
    getTranslatedElements().forEach((element) => {
        const key = element.dataset.i18n;
        if (translations[language][key]) element.textContent = translations[language][key];
    });
}


/**
 * Returns all elements with translation keys.
 * @returns {HTMLElement[]}
 */
function getTranslatedElements() {
    return Array.from(document.querySelectorAll("[data-i18n]"));
}


/**
 * Updates active language button states.
 * @param {string} language
 */
function updateLanguageButtons(language) {
    getLanguageButtons().forEach((button) => {
        const isActive = button.dataset.lang === language;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}


window.addEventListener("DOMContentLoaded", initLanguageSwitch, { once: true });