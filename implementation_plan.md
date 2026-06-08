# Interactive 3D Avatar Experience Plan

The goal is to replace the current entry screen with a highly interactive, "scroll-following" 3D avatar that acts as a digital guide through the portfolio.

## User Review Required

> [!IMPORTANT]
> **3D Model Sourcing**: I cannot easily generate a custom `.gltf` or `.obj` 3D character file from scratch. Therefore, I will build a highly sophisticated **procedural low-poly rig** using Three.js geometry primitives (spheres, cylinders, boxes). It will look like a stylized humanoid/robot with fully articulated joints (shoulders, elbows, hips, knees, neck, eyelids). If you already have a `.gltf` model (like from ReadyPlayerMe or Mixamo) you want to use, please provide the URL or file path! Otherwise, I will build the procedural rig.

> [!WARNING]
> **Scroll Behavior Clarification**: You mentioned "Character should walk downward as user scrolls". To achieve this, I will make the Three.js canvas `position: fixed` across the entire screen. As you scroll down the page, the character will remain visible on the side of the screen, playing a "walking" animation synced to your scroll speed. Does this match your vision?

## Proposed Changes

### 1. 3D Scene Architecture (`index.html`)
- Move the Three.js canvas from just the entry screen to a fixed background layer covering the whole site (`z-index: 10`, but `pointer-events: none` mostly).
- Add a **Starfield Background**: A `THREE.Points` system with slow rotation and subtle mouse parallax.
- Add **Lighting & Reflections**: High-quality `DirectionalLight` with shadows, an ambient light, and a subtle reflective ground plane that moves with the character.

### 2. Procedural Character Rig
- Build an articulated hierarchy: `Root > Torso > (Head, L_Arm, R_Arm, L_Leg, R_Leg)`.
- **Eyes & Blinking**: Separate eye and eyelid meshes. Eyelids will scale down to simulate blinking on a random interval timer.
- **Breathing**: A slow sine wave applied to the Torso's Y-scale and Arm rotations to simulate natural breathing.
- **Cursor Tracking**: Calculate the mouse vector in 3D space. Use `THREE.MathUtils.lerp` to make the Head and Eyes subtly rotate toward the cursor.

### 3. Scroll-Linked Animation System
- Hook into `window.addEventListener('scroll')`.
- Calculate scroll velocity. When velocity > 0, trigger the **Walking Cycle** (sine wave rotations applied to hips and knees).
- Calculate intersection with sections (`#skills`, `#projects`). When the character reaches these thresholds, trigger specific animations (e.g., looking at the section, pointing).

### 4. Interactions (Hover & Click)
- Use `THREE.Raycaster` to detect when the mouse hovers over the character. 
- Trigger a "surprise" or "wave" reaction animation on hover.
- Create an HTML-based Speech Bubble linked to the 3D head's projected 2D screen coordinates.
- On click, cycle through the requested messages ("Hi, I'm Shubham 👋", "Building AI-powered products", etc.).

## Verification Plan
- Verify smooth 60fps performance by using low-poly geometries and reusing materials.
- Test the scroll physics to ensure the walking animation feels natural and stops when scrolling stops.
- Confirm the speech bubble tracks perfectly with the character's head across responsive screen sizes.
