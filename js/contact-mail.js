/**
 * Initializes the PHP contact mail handling.
 */
function initContactMail() {
    const form = getContactForm();
    if (!form) return;
    bindContactValidation(form);
    syncContactSubmitState(form);
    form.addEventListener("submit", (event) => handleContactMailSubmit(event, form));
}


/**
 * Returns the contact form element.
 * @returns {HTMLFormElement|null}
 */
function getContactForm() {
    return document.getElementById("contactForm");
}


/**
 * Handles the contact mail submit event.
 * @param {SubmitEvent} event
 * @param {HTMLFormElement} form
 */
function handleContactMailSubmit(event, form) {
    event.preventDefault();
    if (!validateContactForm(form)) return;
    sendContactMail(form);
}


/**
 * Sends the contact form data to the PHP endpoint.
 * @param {HTMLFormElement} form
 */
async function sendContactMail(form) {
    try {
        const response = await fetch("send-mail-portfolio.php", createMailRequest(form));
        const result = await parseMailResponse(response);
        handleMailResponse(form, response.ok && result.success);
    } catch {
        handleMailResponse(form, false);
    }
}


/**
 * Parses a PHP mail response safely.
 * @param {Response} response
 * @returns {Promise<{success:boolean}>}
 */
async function parseMailResponse(response) {
    try {
        return await response.json();
    } catch {
        return { success: false };
    }
}


/**
 * Creates the mail request configuration.
 * @param {HTMLFormElement} form
 * @returns {RequestInit}
 */
function createMailRequest(form) {
    return {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getMailPayload(form))
    };
}


/**
 * Returns the contact form payload.
 * @param {HTMLFormElement} form
 * @returns {{name:string,email:string,message:string}}
 */
function getMailPayload(form) {
    return {
        name: document.getElementById("contactName").value.trim(),
        email: document.getElementById("contactEmail").value.trim(),
        message: document.getElementById("contactMessage").value.trim()
    };
}


/**
 * Handles the PHP mail response.
 * @param {HTMLFormElement} form
 * @param {boolean} isSuccess
 */
function handleMailResponse(form, isSuccess) {
    if (!isSuccess) {
        showContactErrorMessage();
        return;
    }
    preserveSectionsTrackPosition(() => {
        blurActiveContactElement(form);
        form.reset();
        syncContactSubmitState(form);
        showContactSuccessMessage();
    });
}


/**
 * Keeps the visible contact section from moving while the form UI updates.
 * @param {() => void} callback
 */
function preserveSectionsTrackPosition(callback) {
    const track = document.getElementById("sectionsTrack");
    const left = track?.scrollLeft ?? 0;
    const top = track?.scrollTop ?? 0;
    callback();
    restoreSectionsTrackPosition(track, left, top);
}


/**
 * Restores one track position after browser layout/focus adjustments.
 * @param {HTMLElement|null} track
 * @param {number} left
 * @param {number} top
 */
function restoreSectionsTrackPosition(track, left, top) {
    if (!track) return;
    track.scrollTo({ left, top, behavior: "auto" });
    requestAnimationFrame(() => track.scrollTo({ left, top, behavior: "auto" }));
}


/**
 * Removes focus from a contact field/button before disabling/resetting it.
 * @param {HTMLFormElement} form
 */
function blurActiveContactElement(form) {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement && form.contains(activeElement)) {
        activeElement.blur();
    }
}


/**
 * Shows the contact form success message.
 */
function showContactSuccessMessage() {
    const message = getContactSuccessMessage();
    if (!message) return;
    message.classList.add("is-visible");
    window.setTimeout(hideContactSuccessMessage, 4000);
}


/**
 * Hides the contact form success message.
 */
function hideContactSuccessMessage() {
    const message = getContactSuccessMessage();
    if (!message) return;
    preserveSectionsTrackPosition(() => message.classList.remove("is-visible"));
}


/**
 * Returns the contact success message element.
 * @returns {HTMLElement|null}
 */
function getContactSuccessMessage() {
    return document.getElementById("contactSuccessMessage");
}


/**
 * Shows the contact form error message.
 */
function showContactErrorMessage() {
    const message = getContactErrorMessage();
    if (!message) return;
    message.classList.add("is-visible");
    window.setTimeout(hideContactErrorMessage, 4000);
}


/**
 * Hides the contact form error message.
 */
function hideContactErrorMessage() {
    const message = getContactErrorMessage();
    if (!message) return;
    preserveSectionsTrackPosition(() => message.classList.remove("is-visible"));
}


/**
 * Returns the contact error message element.
 * @returns {HTMLElement|null}
 */
function getContactErrorMessage() {
    return document.getElementById("contactErrorMessage");
}