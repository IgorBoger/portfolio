/**
 * Returns the shared desktop direct links markup.
 * @returns {string}
 */
function createSharedDirectLinksMarkup() {
    return `
        <div class="shared-direct-links">
            <a class="shared-direct-link" href="mailto:igorboger26@gmail.com">
                <img class="shared-direct-icon" src="img/contact-me/email.png" alt="">
                <span>E-mail: igorboger26@gmail.com</span>
            </a>

            <a class="shared-direct-link" href="tel:+4917662045018">
                <img class="shared-direct-icon" src="img/contact-me/phone.png" alt="">
                <span>Tel: 017662045018</span>
            </a>
        </div>
    `;
}


/**
 * Returns the shared desktop footer markup.
 * @returns {string}
 */
function createSharedDesktopFooterMarkup() {
    return `
        <div class="shared-footer">
            <div class="footer-links">
                <a class="footer-link-mobile" href="#legalNotice" data-target="#legalNotice">Legal notice</a>
                <a class="footer-link-mobile" href="#privacyPolicy" data-target="#privacyPolicy">Privacy policy</a>
            </div>

            <p class="footer-copy">© Igor Boger 2026</p>
        </div>
    `;
}


/**
 * Returns the desktop shared contact markup.
 * @returns {string}
 */
function createDesktopSharedMarkup() {
    return `
        <a class="section-arrow contact-arrow-link contact-arrow-back" href="#top" aria-label="Back to hero section">
            <img class="section-arrow-img arrow-reveal-left" src="img/contact-me/switch-arrow-to-hero.png" alt="">
        </a>

        ${createSharedDirectLinksMarkup()}
        ${createSharedDesktopFooterMarkup()}
    `;
}


/**
 * Returns the shared social links markup.
 * @returns {string}
 */
function createSharedSocialMarkup() {
    return `
        <nav class="shared-social fade-in" aria-label="Social links">
            <a class="shared-social-link" href="https://github.com/IgorBoger" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <span class="social-ico ico-github" aria-hidden="true"></span>
            </a>

            <a class="shared-social-link" href="mailto:igorboger26@gmail.com?subject=Project Inquiry" target="_blank" rel="noopener noreferrer" aria-label="E-Mail">
                <span class="social-ico ico-mail" aria-hidden="true"></span>
            </a>

            <a class="shared-social-link" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <span class="social-ico ico-linkedin" aria-hidden="true"></span>
            </a>
        </nav>
    `;
}


/**
 * Returns the shared footer markup.
 * @param {string} logoPathId
 * @returns {string}
 */
function createSharedFooterMarkup(logoPathId) {
    return `
        <div class="shared-footer fade-in">
            <a class="shared-footer-logo" href="#top" aria-label="Zur Startseite">
                <span class="logo-frame" aria-hidden="true">
                    <svg class="logo-arc" viewBox="0 0 130 100">
                        <defs>
                            <path id="${logoPathId}" d="M 15 65 A 50 50 0 0 1 115 65" />
                        </defs>

                        <text class="logo-arc-text">
                            <textPath href="#${logoPathId}" startOffset="50%" text-anchor="middle">
                                frontend developer
                            </textPath>
                        </text>
                    </svg>

                    <span class="logo-initials">IB</span>
                </span>
            </a>

            <p class="footer-copy">© Igor Boger 2026</p>

            <div class="footer-links">
                <a class="footer-link-mobile" href="#legalNotice" data-target="#legalNotice">Legal notice</a>
                <a class="footer-link-mobile" href="#privacyPolicy" data-target="#privacyPolicy">Privacy policy</a>
            </div>
        </div>
    `;
}


/**
 * Returns the shared contact markup.
 * @returns {string}
 */
function createContactSharedMarkup() {
    return `
        <a class="section-arrow contact-arrow-link contact-arrow-back fade-in" href="#top" aria-label="Back to hero section">
            <img class="section-arrow-img arrow-reveal-left" src="img/contact-me/switch-arrow-to-hero.png" alt="">
        </a>

        ${createSharedSocialMarkup()}
        ${createSharedFooterMarkup("contactSharedLogoArcPath")}
    `;
}


/**
 * Returns the shared legal markup.
 * @returns {string}
 */
function createLegalSharedMarkup() {
    return `
        <button class="legal-mobile-top-arrow" type="button" aria-label="Back to top of legal notice">
            <img class="legal-mobile-top-arrow-icon" src="img/contact-me/switch-arrow-to-hero.png" alt="">
        </button>

        ${createSharedSocialMarkup()}
        ${createSharedFooterMarkup("legalSharedLogoArcPath")}
    `;
}


/**
 * Returns the shared privacy markup.
 * @returns {string}
 */
function createPrivacySharedMarkup() {
    return `
        <button class="privacy-mobile-top-arrow" type="button" aria-label="Back to top of privacy policy">
            <img class="privacy-mobile-top-arrow-icon" src="img/contact-me/switch-arrow-to-hero.png" alt="">
        </button>

        ${createSharedSocialMarkup()}
        ${createSharedFooterMarkup("privacySharedLogoArcPath")}
    `;
}