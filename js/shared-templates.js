/**
 * Returns the shared desktop direct links markup.
 * @returns {string}
 */
function createSharedDirectLinksMarkup() {
    return `
        <div class="shared-direct-links">
            <a class="shared-direct-link" target="_blank" rel="noopener noreferrer" href="mailto:kontakt@igor-boger.de">
        <img class="shared-direct-icon" src="img/contact-me/email.png" alt="" width="15" height="18" loading="lazy" decoding="async">
                <span>E-mail: kontakt@igor-boger.de</span>
            </a>

            <a class="shared-direct-link" href="tel:+4917662045018">
        <img class="shared-direct-icon" src="img/contact-me/phone.png" alt="" width="15" height="16" loading="lazy" decoding="async">
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
                <a class="footer-link" href="#legalNotice" data-target="#legalNotice" data-i18n="footerLegalNotice">Legal notice</a>
                <a class="footer-link" href="#privacyPolicy" data-target="#privacyPolicy" data-i18n="footerPrivacyPolicy">Privacy policy</a>
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
        <div class="shared-actions">
            ${createSharedDirectLinksMarkup()}
            <a class="shared-back-arrow" href="#top" aria-label="Back to hero section">
            <img class="section-arrow-img arrow-reveal-left" src="img/contact-me/switch-arrow-to-hero.png" alt="" width="112" height="37" loading="lazy" decoding="async">
            </a>
            ${createSharedDesktopFooterMarkup()}
        </div>
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
            <a class="shared-social-link" href="mailto:kontakt@igor-boger.de?subject=Project Inquiry" target="_blank" rel="noopener noreferrer" aria-label="E-Mail">
                <span class="social-ico ico-mail" aria-hidden="true"></span>
            </a>
            <a class="shared-social-link" href="https://www.linkedin.com/in/igor-boger-814534247/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
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
                            <path id="${logoPathId}" d="M 12 65 A 50 50 0 0 1 118 65" />
                        </defs>
                        <text class="logo-arc-text">
                            <textPath href="#${logoPathId}" startOffset="50%" text-anchor="middle" data-i18n="logoArcText">
                                frontend developer
                            </textPath>
                        </text>
                    </svg>
                    <img class="logo-initials" src="img/logo/initials-ib.png" alt="">
                </span>
            </a>
            <p class="footer-copy">© Igor Boger 2026</p>
            <div class="footer-links">
                <a class="footer-link" href="#legalNotice" data-target="#legalNotice" data-i18n="footerLegalNotice">Legal notice</a>
                <a class="footer-link" href="#privacyPolicy" data-target="#privacyPolicy" data-i18n="footerPrivacyPolicy">Privacy policy</a>
            </div>
        </div>
    `;
}


/**
 * Returns the shared top arrow markup.
 * @param {string} label
 * @returns {string}
 */
function createSharedTopArrowMarkup(label) {
    return `
        <button class="shared-top-arrow fade-in" type="button" aria-label="${label}">
            <img class="shared-top-arrow-icon" src="img/contact-me/switch-arrow-to-hero.png" alt="" width="112" height="37" loading="lazy" decoding="async">
        </button>
    `;
}


/**
 * Returns the shared contact markup.
 * @returns {string}
 */
function createContactSharedMarkup() {
    return `
        ${createSharedTopArrowMarkup("Back to hero section")}
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
        ${createSharedTopArrowMarkup("Back to top of legal notice")}
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
        ${createSharedTopArrowMarkup("Back to top of privacy policy")}
        ${createSharedSocialMarkup()}
        ${createSharedFooterMarkup("privacySharedLogoArcPath")}
    `;
}