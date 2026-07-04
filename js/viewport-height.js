(function () {
    const MOBILE_QUERY = "(max-width: 900px)";
    const CONTACT_FIELD_SELECTOR = ".contact-form input, .contact-form textarea, .contact-form select";
    let editedPanel = null;
    let blurTimer = 0;

    function isMobileViewport() {
        return window.matchMedia(MOBILE_QUERY).matches;
    }


    function getViewportHeight() {
        if (isMobileViewport()) return window.innerHeight;
        return window.visualViewport?.height || window.innerHeight;
    }


    function setViewportHeight() {
        document.documentElement.style.setProperty(
            "--app-viewport-height",
            `${getViewportHeight()}px`
        );
    }


    function isContactField(element) {
        return element instanceof HTMLElement && element.matches(CONTACT_FIELD_SELECTOR);
    }


    function handleContactFieldFocus(event) {
        if (!isMobileViewport() || !isContactField(event.target)) return;
        window.clearTimeout(blurTimer);
        editedPanel = event.target.closest(".section-panel");
        document.body.classList.add("is-contact-field-focused");
        setViewportHeight();
    }


    function handleContactFieldBlur(event) {
        if (!isContactField(event.target)) return;
        const panel = editedPanel;
        blurTimer = window.setTimeout(() => {
            document.body.classList.remove("is-contact-field-focused");
            setViewportHeight();
            keepEditedPanelInView(panel);
            editedPanel = null;
        }, 250);
    }


    function keepEditedPanelInView(panel) {
        const track = document.getElementById("sectionsTrack");
        if (!isMobileViewport() || !track || !(panel instanceof HTMLElement)) return;
        track.scrollTo({ top: panel.offsetTop, behavior: "auto" });
    }

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight, { passive: true });
    window.addEventListener("orientationchange", setViewportHeight, { passive: true });
    window.addEventListener("pageshow", setViewportHeight, { passive: true });
    window.visualViewport?.addEventListener("resize", setViewportHeight, { passive: true });
    document.addEventListener("focusin", handleContactFieldFocus);
    document.addEventListener("focusout", handleContactFieldBlur);
}());