/**
 * Initializes contact button navigation to the contact section.
 */
function initContactButton() {
    const buttons = document.querySelectorAll(".whyme-contact-btn, .contact-trigger-btn");
    if (buttons.length === 0) return;
    buttons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            scrollToPanel("#contact");
        });
    });
}