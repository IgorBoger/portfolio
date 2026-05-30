/**
 * Initializes the PHP contact mail handling.
 */
function initContactMail() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", (event) => handleContactMailSubmit(event, form));
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
    const response = await fetch("send_mail_portfolio.php", createMailRequest(form));
    const result = await response.json();
    handleMailResponse(form, response.ok && result.success);
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
        // name: form.contactName.value.trim(),
        // email: form.contactEmail.value.trim(),
        // message: form.contactMessage.value.trim()
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
    if (!isSuccess) return;
    form.reset();
    syncContactSubmitState(form);
}


window.addEventListener("DOMContentLoaded", initContactMail, { once: true });