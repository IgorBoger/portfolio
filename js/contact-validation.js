/**
 * Binds all contact form validation events.
 * @param {HTMLFormElement} form
 */
function bindContactValidation(form) {
    getContactFields(form).forEach((field) => bindFieldValidation(field, form));
    getPrivacyCheckbox(form)?.addEventListener("change", () => syncContactSubmitState(form));
}


/**
 * Returns all contact form fields.
 * @param {HTMLFormElement} form
 * @returns {HTMLElement[]}
 */
function getContactFields(form) {
    return [form.contactName, form.contactEmail, form.contactMessage].filter(Boolean);
}


/**
 * Binds validation events for one field.
 * @param {HTMLElement} field
 * @param {HTMLFormElement} form
 */
function bindFieldValidation(field, form) {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => handleFieldInput(field, form));
}


/**
 * Handles field input updates.
 * @param {HTMLElement} field
 * @param {HTMLFormElement} form
 */
function handleFieldInput(field, form) {
    if (hasFeedback(field)) validateField(field);
    syncContactSubmitState(form);
}


/**
 * Handles contact form submit validation.
 * @param {SubmitEvent} event
 * @param {HTMLFormElement} form
 */
function handleContactSubmit(event, form) {
    const isValid = validateContactForm(form);
    if (!isValid) event.preventDefault();
}


/**
 * Validates the full contact form.
 * @param {HTMLFormElement} form
 * @returns {boolean}
 */
function validateContactForm(form) {
    const fieldsValid = getContactFields(form).every((field) => validateField(field));
    const policyValid = validatePrivacyCheckbox(form);
    syncContactSubmitState(form);
    return fieldsValid && policyValid;
}


/**
 * Validates one contact field.
 * @param {HTMLElement} field
 * @returns {boolean}
 */
function validateField(field) {
    const message = getFieldErrorMessage(field);
    showFieldFeedback(field, message);
    toggleInvalidClass(field, Boolean(message));
    return !message;
}


/**
 * Returns the validation error message for one field.
 * @param {HTMLElement} field
 * @returns {string}
 */
function getFieldErrorMessage(field) {
    if (field.id === "contactName") return getNameError(field.value);
    if (field.id === "contactEmail") return getEmailError(field.value);
    return getMessageError(field.value);
}


/**
 * Returns the name validation message.
 * @param {string} value
 * @returns {string}
 */
function getNameError(value) {
    const trimmed = value.trim();
    if (trimmed.length >= 2) return "";
    return getContactTranslation("contactNameError");
}


/**
 * Returns the email validation message.
 * @param {string} value
 * @returns {string}
 */
function getEmailError(value) {
    const email = value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (regex.test(email)) return "";
    return getContactTranslation("contactEmailError");
}


/**
 * Returns the message validation message.
 * @param {string} value
 * @returns {string}
 */
function getMessageError(value) {
    const trimmed = value.trim();
    if (trimmed.length > 0) return "";
    return getContactTranslation("contactMessageError");
}


/**
 * Returns one translated contact text.
 * @param {string} translationKey
 * @returns {string}
 */
function getContactTranslation(translationKey) {
    const language = document.documentElement.lang || "en";
    if (typeof findTranslationValue !== "function") return translationKey;
    return findTranslationValue(translations[language], translationKey) || translationKey;
}


/**
 * Shows one field validation message.
 * @param {HTMLElement} field
 * @param {string} message
 */
function showFieldFeedback(field, message) {
    const feedback = getFieldFeedback(field);
    if (!feedback) return;
    feedback.textContent = message;
    feedback.classList.toggle("contact-feedback-visible", Boolean(message));
}


/**
 * Returns one field feedback element.
 * @param {HTMLElement} field
 * @returns {HTMLElement|null}
 */
function getFieldFeedback(field) {
    return field.parentElement?.querySelector(".contact-feedback") ?? null;
}


/**
 * Returns whether one field already shows feedback.
 * @param {HTMLElement} field
 * @returns {boolean}
 */
function hasFeedback(field) {
    return Boolean(getFieldFeedback(field)?.textContent.trim());
}


/**
 * Toggles invalid class on one field.
 * @param {HTMLElement} field
 * @param {boolean} isInvalid
 */
function toggleInvalidClass(field, isInvalid) {
    field.classList.toggle("contact-input-invalid", isInvalid);
    toggleAriaInvalid(field, isInvalid);
}


/**
 * Toggles the ARIA invalid state on one field.
 * @param {HTMLElement} field
 * @param {boolean} isInvalid
 */
function toggleAriaInvalid(field, isInvalid) {
    if (isInvalid) {
        field.setAttribute("aria-invalid", "true");
        return;
    }
    field.removeAttribute("aria-invalid");
}


/**
 * Validates the privacy checkbox.
 * @param {HTMLFormElement} form
 * @returns {boolean}
 */
function validatePrivacyCheckbox(form) {
    const checkbox = getPrivacyCheckbox(form);
    if (!checkbox) return false;
    checkbox.classList.toggle("contact-policy-checkbox-invalid", !checkbox.checked);
    toggleAriaInvalid(checkbox, !checkbox.checked);
    return checkbox.checked;
}


/**
 * Returns the privacy checkbox element.
 * @param {HTMLFormElement} form
 * @returns {HTMLInputElement|null}
 */
function getPrivacyCheckbox(form) {
    return form.querySelector("#privacyPolicyConsent");
}


/**
 * Returns the send button element.
 * @param {HTMLFormElement} form
 * @returns {HTMLButtonElement|null}
 */
function getSendButton(form) {
    return form.querySelector("#sendBtn");
}


/**
 * Syncs send button state with the privacy checkbox.
 * @param {HTMLFormElement} form
 */
function syncContactSubmitState(form) {
    const checkbox = getPrivacyCheckbox(form);
    const button = getSendButton(form);
    if (!checkbox || !button) return;
    button.disabled = !isContactFormReady(form);
}


/**
 * Returns whether the contact form is ready to submit.
 * @param {HTMLFormElement} form
 * @returns {boolean}
 */
function isContactFormReady(form) {
    return hasValidContactFields(form) && getPrivacyCheckbox(form)?.checked;
}


/**
 * Returns whether all contact fields are valid.
 * @param {HTMLFormElement} form
 * @returns {boolean}
 */
function hasValidContactFields(form) {
    return getContactFields(form).every((field) => !getFieldErrorMessage(field));
}