# Global Portfolio Unification

The entire portfolio has been ruthlessly standardized. The disconnected styles, different page concepts, and isolated experiences have been completely removed. Everything now feels like a single, unified premium SaaS product.

## What Was Standardized

### 1. The Avatar
- The isolated `avatar` page and folder have been **deleted**.
- The avatar is now a small, premium, interactive circular profile element sitting directly at the top of the Homepage Hero section.

### 2. Global Components & Navigation
- I injected the exact same `<nav>` and `<footer>` HTML code across all 4 pages (`Home`, `Projects`, `Journey`, `Certifications`).
- The navigation actively highlights the current page in the `var(--accent-primary)` color to provide clear wayfinding within the same application.

### 3. Strict Component Usage
- **One Card to Rule Them All:** The `.glass-card` component is now the exclusive structural component for content.
- The **Projects Page** was rebuilt from massive custom blocks into a clean `.bento-grid` of `.glass-card` elements.
- The **Journey Page** timeline was standardized to use the exact same grid and card variables.
- The **Certifications Page** was updated to match identically.

### 4. Typography Hierarchy Enforced
- **Homepage Only:** The `clamp(4rem, 10vw, 11rem)` massive hero text only exists on the homepage now, ensuring it remains the strongest visual anchor of the site.
- **Subpage Heroes:** Projects, Journey, and Certifications use a slightly smaller hero scale (`clamp(3rem, 8vw, 8rem)`).
- **Section Headers:** Every page now strictly uses the `.heading-section` class for standard section dividers.

> [!TIP]
> Navigate seamlessly between the 4 pages. Notice how the header, footer, spacing, fonts, and interactive card glows (`--accent-primary-glow`) remain perfectly identical, providing a flawless transition experience.

## Next Steps
Please navigate through the entire local site. Check the Homepage Avatar, then click through Projects, Journey, and Certifications. If this strict standardization hits the mark, let me know and we will commit it!
