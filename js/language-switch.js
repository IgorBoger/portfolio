/**
 * Initializes the language switch buttons.
 */
function initLanguageSwitch() {
    getLanguageButtons().forEach(bindLanguageButton);
    applySavedLanguage();
}


/**
 * Returns all language buttons.
 * @returns {HTMLButtonElement[]}
 */
function getLanguageButtons() {
    return Array.from(document.querySelectorAll(".lang-btn"));
}


/**
 * Applies the saved language or the fallback language.
 */
function applySavedLanguage() {
    const savedLanguage = localStorage.getItem("language");
    const language = savedLanguage || "en";
    applyLanguage(language, false);
}


/**
 * Binds one language button.
 * @param {HTMLButtonElement} button
 */
function bindLanguageButton(button) {
    button.addEventListener("click", () => {
        const language = button.dataset.lang;
        applyLanguage(language);
    });
}


/**
 * Applies the selected language.
 * @param {string} language
 * @param {boolean} shouldAnimate
 */
function applyLanguage(language, shouldAnimate = true) {
    if (!translations[language]) return;
    if (!shouldAnimate) return updateLanguage(language);
    fadeOutLanguageContent(() => updateLanguage(language));
}


/**
 * Updates all language related content.
 * @param {string} language
 */
function updateLanguage(language) {
    document.documentElement.lang = language;
    document.title = translations[language].documentTitle;
    updateTranslatedTexts(language);
    updateLanguageButtons(language);
    updateTranslatedPlaceholders(language);
    updateProjectToggleTranslationsSafely();
    refreshLanguageLayoutSafely();
    localStorage.setItem("language", language);
}


/**
 * Fades out language content before replacing text.
 * @param {Function} updateCallback
 */
function fadeOutLanguageContent(updateCallback) {
    document.body.classList.add("is-language-changing");
    window.setTimeout(() => finishLanguageTransition(updateCallback), 120);
}


/**
 * Updates language content and fades it back in.
 * @param {Function} updateCallback
 */
function finishLanguageTransition(updateCallback) {
    updateCallback();
    requestAnimationFrame(() => document.body.classList.remove("is-language-changing"));
}


/**
 * Refreshes layout positions after language changes.
 */
function refreshLanguageLayoutSafely() {
    if (typeof queueSectionArrowAlignment === "function") queueSectionArrowAlignment();
    if (typeof syncSkillsTitleWrapPosition === "function") syncSkillsTitleWrapPosition();
    if (typeof syncContactTitleWrapPosition === "function") syncContactTitleWrapPosition();
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
 * Updates all translated placeholder elements.
 * @param {string} language
 */
function updateTranslatedPlaceholders(language) {
    getTranslatedPlaceholderElements().forEach((element) => {
        const text = findTranslationValue(translations[language], element.dataset.i18nPlaceholder);
        if (text) element.placeholder = text;
    });
}


/**
 * Returns all elements with translated placeholder keys.
 * @returns {HTMLElement[]}
 */
function getTranslatedPlaceholderElements() {
    return Array.from(document.querySelectorAll("[data-i18n-placeholder]"));
}


/**
 * Updates project toggle translations if project logic is loaded.
 */
function updateProjectToggleTranslationsSafely() {
    if (typeof updateProjectToggleTranslations !== "function") return;
    updateProjectToggleTranslations();
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