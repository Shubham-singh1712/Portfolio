# Implementation Plan - Device-Specific Splash Screens

We will build responsive, interactive splash screens for desktop (≥1024px) and mobile (<1024px) based on the design mockups. Clicking either CTA will trigger a synchronized transition: the character and glow move upward/expand, the splash screen fades out, and the main portfolio content is revealed.

## Proposed Changes

### Assets Integration
We will copy the design assets from the artifacts directory to the workspace root:
- `media__1781117784128.png` -> [splash-desktop.png](file:///c:/Users/SHUBHAM/OneDrive/Documents/Portfolio/splash-desktop.png) (1024x576, widescreen cinematic)
- `media__1781117784140.jpg` -> [splash-mobile.jpg](file:///c:/Users/SHUBHAM/OneDrive/Documents/Portfolio/splash-mobile.jpg) (682x1024, portrait poster)

---

### Splash Screen HTML & Layout

#### [MODIFY] [index.html](file:///c:/Users/SHUBHAM/OneDrive/Documents/Portfolio/index.html)
- Inject the `#splash-wrapper` HTML at the very top of `<body>`.
- Create two separate containers: `.splash-desktop` (active for ≥1024px) and `.splash-mobile` (active for <1024px) inside the wrapper to ensure independent, device-specific layouts.
- In both layouts, use an **Aspect-Ratio Box** to contain the background image and overlays. This ensures that text, buttons, and graphics align pixel-perfectly with the design images across all screen shapes (e.g., ultrawide desktops, iPads, different mobile models) without clipping.
- Implement the interactive overlays:
  - **Desktop CTA:** A glassmorphic button with border-glow and reflection sweep effects overlaying the image CTA.
  - **Mobile CTA:** A circular interactive button with `↗` and a pulsing border ring overlaying the image circle.
  - **Progression Timelines:** Overlay interactive text links for both desktop and mobile timelines.
  - **Canvas Particle System:** Add a `<canvas id="splash-particles">` layer to render rising orange sparks that react to the mouse.

#### [MODIFY] [styles.css](file:///c:/Users/SHUBHAM/OneDrive/Documents/Portfolio/styles.css)
- Add styles for `#splash-wrapper` (`position: fixed; inset: 0; background: #000; z-index: 9999; overflow: hidden;`).
- Implement the aspect-ratio container system:
  - Desktop: `aspect-ratio: 16 / 9; max-width: 100vw; max-height: 100vh;` centered with flex/grid.
  - Mobile: `aspect-ratio: 9 / 16; max-width: 100vw; max-height: 100vh;` centered.
- Code the premium effects:
  - **Glass CTA:** Glassmorphism styles (frosted backdrop blur, semi-transparent background, subtle outline, orange glow on hover, and an animated diagonal shine/reflection sweep).
  - **Pulsing Mobile CTA:** Circular pulsing animations (`@keyframes pulse`) for the mobile button border.
  - **Timeline Styling:** Dots, lines, and active glows (`box-shadow: 0 0 12px var(--accent-primary)`).
  - **Transition Animations:** Define `.splash-wrapper.fade-out` where:
    - The character background scales up and moves upward (`transform: translate(-50%, -55%) scale(1.05); opacity: 0;`).
    - The central glow halo expands (`transform: scale(2); opacity: 0;`).
    - The wrapper fades out (`opacity: 0; pointer-events: none;`).
- Modify the body scroll behavior during splash: lock scroll using `.splash-locked { overflow: hidden; }` on the `body` and remove it once the splash screen is dismissed.

#### [MODIFY] [script.js](file:///c:/Users/SHUBHAM/OneDrive/Documents/Portfolio/script.js)
- Add a lightweight Canvas particle emitter that:
  - Spawns small orange sparks floating upwards.
  - Applies slight sinusoidal wave movements and alpha fades as they rise.
  - Repels or attracts particles slightly based on mouse movements.
- Implement the click handlers for both `#desktop-cta` and `#mobile-cta`:
  - When clicked, lock interactive elements, add the `.fade-out` class to the splash overlay.
  - Remove `.splash-locked` from `body` to restore scrolling.
  - After the transition ends (e.g. 1500ms), remove the splash HTML element from the DOM or hide it (`display: none`) to optimize performance.
  - Trigger the portfolio's entrance animations (`.reveal-up` elements in the hero section) immediately upon click so they slide in dynamically as the splash screen fades.

---

## Verification Plan

### Automated/Local Build Verification
- Open the application locally and verify that there are no compilation, console, or resource loading errors.

### Manual Verification
- **Aesthetics Check:** Emulate a widescreen display (≥1024px) and mobile device (<1024px). Ensure the aspect ratio boxes center correctly on black backdrops, and that text overlays align precisely over the mockup image features.
- **Micro-interactions:** Hover over the desktop glass CTA to check the border-glow and reflection sweep. Verify that the mobile circular button pulses smoothly.
- **Canvas Particles:** Confirm that the orange particles float upwards and respond to mouse pointer movements.
- **Transition Animation:** Click the CTA button on both desktop and mobile. Confirm:
  - The character slides upward.
  - The orange halo expands outwards.
  - The splash screen fades smoothly.
  - Scroll lock on the body is released.
  - Hero elements slide up immediately during transition.
