/**
 * Renders all project cards into the project list.
 */
function renderProjects() {
    const container = getProjectsList();
    if (!container || !Array.isArray(projectItems)) return;
    container.innerHTML = projectItems.map(createProjectMarkup).join("");
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
            ${createProjectLearnedMarkup(project)}
            ${createInsideToggleMarkup()}
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
            <img class="project-number" src="${project.numberSrc}" alt="${project.numberAlt}">
            <img class="project-number-mobile" src="${project.numberSrcMobile}" alt="${project.numberAlt}">
            <h2 class="project-title">${project.title}</h2>
        </div>
    `;
}


/**
 * Creates the project content section.
 * @param {Object} project
 * @returns {string}
 */
function createProjectContentMarkup(project) {
    return `
        <div class="project-content">
            ${createProjectDescriptionMarkup(project)}
            ${createProjectPreviewMarkup(project)}
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
            <h3 class="project-subtitle">${title}</h3>
            <p>${text}</p>
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
                <img src="${project.previewSrc}" alt="${project.previewAlt}">
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
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-outline">
                GitHub
            </a>

            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-btn btn-primary">
                Live Test
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
            <h3 class="project-subtitle">${project.learnedTitle}</h3>
            <p>${project.learnedText}</p>
        </div>
    `;
}


/**
 * Creates the inside toggle button.
 * @returns {string}
 */
function createInsideToggleMarkup() {
    return `
        <button class="project-card-toggle" type="button" aria-expanded="false">
            <span class="show-me-more">Show me more</span>
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
            <span class="show-me-less">Show me less</span>
            <span class="project-card-toggle-icon" aria-hidden="true">▲</span>
        </button>
    `;
}