(function () {
    function getViewportHeight() {
        return window.visualViewport?.height || window.innerHeight;
    }

    function setViewportHeight() {
        document.documentElement.style.setProperty(
            "--app-viewport-height",
            `${getViewportHeight()}px`
        );
    }

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight, { passive: true });
    window.addEventListener("orientationchange", setViewportHeight, { passive: true });
    window.addEventListener("pageshow", setViewportHeight, { passive: true });
    window.visualViewport?.addEventListener("resize", setViewportHeight, { passive: true });
}());