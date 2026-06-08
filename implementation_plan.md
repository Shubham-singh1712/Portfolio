# Goal
Fix all mobile responsiveness issues (<=768px) across the entire portfolio, ensuring zero horizontal scrolling, a properly functioning mobile menu, and an optimized mobile layout without altering the desktop experience.

## User Review Required
Please review the proposed global CSS overrides, mobile menu overhaul, and the HTML structure changes for the rotating role text in the About section. 

## Proposed Changes

### `styles.css`
All changes will be scoped inside `@media (max-width: 768px)` or applied globally in a way that does not affect desktop.

1. **Global Overflow Fix:**
   - Add `html, body { overflow-x: hidden; width: 100%; position: relative; }` to prevent any horizontal scrolling globally.

2. **Mobile Navigation Overhaul:**
   - Modify `.mobile-menu-overlay` to act as a proper full-screen overlay with a solid background and flexbox alignment (`flex-direction: column`, `align-items: center`, `justify-content: center`).
   - Style `.mobile-nav-links` to stack vertically with a large gap (e.g., `gap: 1.5rem`), centering the text.
   - Adjust the font size of mobile links to prevent the "giant overlapping text" issue.

3. **Hero Tweaks:**
   - Ensure the hero name spans explicitly force a line break (`display: block; width: 100%;`).
   - Add `box-sizing: border-box;` and padding to `.hero-section-main` to keep content inside the viewport.

4. **Project Cards:**
   - Add responsive CSS for project tags: `.pill-group { flex-wrap: wrap; gap: 0.5rem; }`.
   - Add `box-sizing: border-box;` to the `.glass-card` elements to prevent padding from expanding the element width.

5. **Footer:**
   - Apply `flex-direction: column` to the footer links container on mobile to prevent clipping.

### `index.html`

1. **Mobile Menu Functionality:**
   - Update the mobile menu HTML to ensure all links (About, Skills, Certifications, Projects, Journey, Contact, Resume) are present.
   - Add an `onclick="toggleMenu()"` to every link inside the mobile overlay so the menu closes automatically when a link is clicked.

2. **About Page Rotating Roles:**
   - Remove the static "Computer Science Engineer" heading.
   - Insert an animated role switcher container using the existing `.rotating-text` CSS animation (or adding a simple JS text rotator) to cycle through: Tech Explorer, AI Builder, Startup Enthusiast, Full Stack Developer, CS Engineer.

## Verification Plan
- Open Chrome DevTools and emulate `320px`, `375px`, `390px`, and `430px` breakpoints.
- **Hero:** Check for overflow and text clipping.
- **Menu:** Click the hamburger icon to open the menu, ensure links are readable and stacked, then click a link to verify the menu closes.
- **About:** Verify the role animation transitions smoothly.
- **Footer & Projects:** Confirm elements stack and wrap correctly without causing horizontal scroll.
