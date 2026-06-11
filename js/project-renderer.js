/**
 * Renders all project cards into the project list.
 */
function renderProjects() {
    const container = getProjectsList();
    if (!container || !Array.isArray(projectItems)) return;
    container.innerHTML = projectItems.map(createProjectMarkup).join("");
    translateRenderedProjects();
}

/**
 * Returns the project list element.
 * @returns {HTMLElement|null}
 */
function getProjectsList() {
    return document.getElementById("projectsList");
}


/**
 * Creates one full project item.
 * @param {Object} project
 * @returns {string}
 */
function createProjectMarkup(project) {
    return `${createProjectCardMarkup(project)}${createOutsideToggleMarkup()}`;
}


/**
 * Creates one project card wrapper.
 * @param {Object} project
 * @returns {string}
 */
function createProjectCardMarkup(project) {
    return `
        <div class="project-container ${project.projectClass} fade-in" data-project-expanded="true">
            ${createProjectHeaderMarkup(project)}
            ${createProjectContentMarkup(project)}
            ${createInsideToggleMarkup()}
        </div>
    `;
}


/**
 * Creates the project content section with expandable mobile content.
 * @param {Object} project
 * @returns {string}
 */
function createProjectContentMarkup(project) {
    return `
        <div class="project-content">
            <div class="project-description">
                ${createProjectBlockMarkup(project.aboutTitle, project.aboutText)}
                <div class="project-expandable">
                    ${createProjectBlockMarkup(project.technologiesTitle, project.technologiesText)}
                    ${createProjectLearnedMarkup(project)}
                    ${createProjectPreviewMarkup(project)}
                </div>
            </div>
        </div>
    `;
}


/**
 * Creates the project header.
 * @param {Object} project
 * @returns {string}
 */
function createProjectHeaderMarkup(project) {
    return `
        <div class="project-header">
            <img class="project-number" src="${project.numberSrc}" alt="" loading="lazy" decoding="async">
            <img class="project-number-mobile" src="${project.numberSrcMobile}" alt="" loading="lazy" decoding="async">
            <h3 class="project-title">${project.title}</h3>
        </div>
    `;
}


/**
 * Creates the project description column.
 * @param {Object} project
 * @returns {string}
 */
function createProjectDescriptionMarkup(project) {
    return `
        <div class="project-description">
            ${createProjectBlockMarkup(project.aboutTitle, project.aboutText)}
            ${createProjectBlockMarkup(project.technologiesTitle, project.technologiesText)}
        </div>
    `;
}


/**
 * Creates one project text block.
 * @param {string} title
 * @param {string} text
 * @returns {string}
 */
function createProjectBlockMarkup(title, text) {
    return `
        <div class="project-block">
            <h4 class="project-subtitle" data-i18n="${title}">${translateProjectKey(title)}</h4>
            <p data-i18n="${text}">${translateProjectKey(text)}</p>
        </div>
    `;
}


/**
 * Creates the project preview section.
 * @param {Object} project
 * @returns {string}
 */
function createProjectPreviewMarkup(project) {
    return `
        <div class="project-preview">
            <div class="project-preview-inner">
                <img src="${project.previewSrc}" alt="${project.previewAlt}" loading="lazy" decoding="async">
                ${createProjectButtonsMarkup(project)}
            </div>
        </div>
    `;
}


/**
 * Creates the project action buttons.
 * @param {Object} project
 * @returns {string}
 */
function createProjectButtonsMarkup(project) {
    return `
        <div class="project-buttons">
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-outline" data-i18n="projectGithubBtn" aria-label="${project.title} GitHub repository (opens in a new tab)">
                ${translateProjectKey("projectGithubBtn")}
            </a>
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-btn btn-primary" data-i18n="projectLiveTestBtn" aria-label="${project.title} live demo (opens in a new tab)">
                ${translateProjectKey("projectLiveTestBtn")}
            </a>
        </div>
    `;
}


/**
 * Creates the learned section.
 * @param {Object} project
 * @returns {string}
 */
function createProjectLearnedMarkup(project) {
    return `
        <div class="project-learned">
            <h4 class="project-subtitle" data-i18n="${project.learnedTitle}">${translateProjectKey(project.learnedTitle)}</h4>
            <p data-i18n="${project.learnedText}">${translateProjectKey(project.learnedText)}</p>
        </div>
    `;
}


/**
 * Returns one translated project value.
 * @param {string} key
 * @returns {string}
 */
function translateProjectKey(key) {
    const language = document.documentElement.lang || "en";
    if (typeof findTranslationValue !== "function") return key;
    return findTranslationValue(translations[language], key) || key;
}


/**
 * Updates project translations after rendering.
 */
function translateRenderedProjects() {
    const language = document.documentElement.lang || "en";
    if (typeof updateTranslatedTexts === "function") updateTranslatedTexts(language);
}


/**
 * Creates the inside toggle button.
 * @returns {string}
 */
function createInsideToggleMarkup() {
    return `
        <button class="project-card-toggle" type="button" aria-expanded="false">
            <span class="show-me-more" data-project-i18n="projectShowMoreBtn">
                ${translateProjectKey("projectShowMoreBtn")}
            </span>
            <span class="project-card-toggle-icon" aria-hidden="true">▼</span>
        </button>
    `;
}


/**
 * Creates the outside toggle button.
 * @returns {string}
 */
function createOutsideToggleMarkup() {
    return `
        <button class="project-card-toggle" type="button" aria-expanded="true">
            <span class="show-me-less" data-project-i18n="projectShowLessBtn">
                ${translateProjectKey("projectShowLessBtn")}
            </span>
            <span class="project-card-toggle-icon" aria-hidden="true">▲</span>
        </button>
    `;
}