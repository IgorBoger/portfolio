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
        const text = findTranslationValue(translations[language], element.dataset.i18n);
        if (text) element.textContent = text;
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
 * Finds one translation value inside grouped translation objects.
 * @param {Object} translationData
 * @param {string} key
 * @returns {string}
 */
function findTranslationValue(translationData, key) {
    if (!translationData || typeof translationData !== "object") return "";
    if (typeof translationData[key] === "string") return translationData[key];
    return findNestedTranslationValue(translationData, key);
}


/**
 * Finds one translation value inside nested translation objects.
 * @param {Object} translationData
 * @param {string} key
 * @returns {string}
 */
function findNestedTranslationValue(translationData, key) {
    for (const value of Object.values(translationData)) {
        const text = findTranslationValue(value, key);
        if (text) return text;
    }
    return "";
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