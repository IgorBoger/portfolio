# Igor Boger Portfolio

Personal portfolio website for presenting my frontend development profile, technical skills, selected projects, references, and contact options.

The project is built as a responsive single-page website with a custom visual design, desktop horizontal navigation, mobile-first interaction patterns, multilingual content, and a working contact form flow.

## Live Demo

https://igor-boger.de/

## Overview

This portfolio is designed to show both my frontend skills and the way I structure user-facing web projects. It combines semantic HTML, modular CSS, and vanilla JavaScript to create an interactive portfolio experience without relying on a frontend framework.

The page includes an introduction, skill section, project showcase, reference area, contact form, legal notice, and privacy policy.

## Features

- Responsive layout for desktop, tablet, and mobile devices
- Horizontal section navigation on desktop
- Mobile burger menu and vertical section scrolling
- Multilingual content handled through JavaScript translations
- Dynamically rendered project cards
- Project links to GitHub repositories and live demos
- Reference slider with button, touch, and mousewheel support
- Contact form with client-side validation
- PHP endpoint for sending contact form emails
- Legal notice and privacy policy views
- Keyboard-friendly navigation behavior
- iOS/Safari viewport handling for more stable mobile heights
- Cache-busting for CSS and JavaScript asset updates

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- PHP
- Firebase, used in showcased projects
- Angular and TypeScript, used in showcased projects
- Git
- Local web fonts and custom image assets

## Highlighted Skills

- Responsive web development
- DOM manipulation
- Modular JavaScript structure
- Form validation
- Accessibility-oriented markup and controls
- Dynamic content rendering
- Touch, wheel, and keyboard interaction handling
- Cross-browser and mobile browser testing
- Deployment preparation and cache handling

## Projects

### Join

A Kanban-style project management application for creating, organizing, and managing tasks across workflow columns.

Technologies: HTML, CSS, JavaScript, Firebase

### El Pollo Loco

A browser-based jump-and-run game with animated gameplay, enemies, collectibles, collision detection, and object-oriented JavaScript structure.

Technologies: HTML, CSS, JavaScript

### DA Bubble

A real-time communication platform focused on structured messaging workflows and collaborative interaction.

Technologies: Angular, TypeScript, Firebase, HTML, CSS

## Project Structure

```text
.
+-- index.html
+-- style.css
+-- script.js
+-- send-mail-portfolio.php
+-- css/
+-- js/
+-- fonts/
+-- img/
+-- private/
```

Key directories:

- `css/` contains the separated styles for layout, hero, projects, contact, legal pages, responsive behavior, and motion.
- `js/` contains modular logic for navigation, animations, project rendering, references, translations, contact handling, and viewport fixes.
- `img/` contains visual assets, icons, project previews, and responsive section graphics.
- `fonts/` contains local web fonts.
- `private/` is reserved for non-public project files.

## Running Locally

The portfolio can be opened directly through `index.html` for basic static testing.

For a more realistic local setup, especially when testing PHP behavior, run a local PHP server:

```powershell
php -S localhost:8000
```

Then open:

```text
http://localhost:8000
```

## Deployment Notes

When deploying updates, upload all changed HTML, CSS, JavaScript, PHP, image, and font files to the web server.

CSS and JavaScript files use version parameters for cache-busting, for example:

```html
style.css?v=20260610-viewport3
```

When visible styles or scripts change, this version should be updated so browsers load the newest assets reliably, especially Safari on iOS.

## Contact Form

The contact form sends requests through:

```text
send-mail-portfolio.php
```

Before production use, the hosting environment should be checked for PHP mail support, recipient configuration, and server-side delivery behavior.

## Author

Igor Boger

Frontend Developer