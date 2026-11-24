# CODEX TASK — COMPLETE VISUAL REDESIGN

## Project: SMRBRUH Personal Portfolio
## Design direction: ORBITAL / EDITORIAL

You are working inside an existing portfolio codebase.

Your task is to fundamentally redesign the current website. This is not a minor restyling pass.

The current design feels generic, overproduced, and visibly AI-generated. It relies too heavily on neon gradients, science-fiction dashboards, glowing borders, repetitive cards, and decorative interface elements.

I want an entirely different visual identity.

**Design a premium editorial portfolio with the visual discipline of Apple product pages, the typography of a modern Swiss design studio, and the cinematic restraint of an aerospace documentary.**

Do not build another AI-generated landing page.

---

## 1. DESIGN PHILOSOPHY

The website should feel designed by an exceptional human art director.

It must be:

- Minimal but visually ambitious.
- Cinematic but never theatrical for no reason.
- Highly interactive but not distracting.
- Technically sophisticated but not visually cluttered.
- Visually distinctive without relying on popular AI design clichés.

Use massive typography, asymmetrical layouts, dramatic negative space, carefully composed imagery, sophisticated motion and beautifully rendered materials.

Every section needs its own composition.

Do not repeat the same visual pattern.

### Visual references

Art direction inspired by:

- Apple product websites: typography, spacing, motion, material quality.
- macOS 26 and visionOS: transparent controls, floating navigation and optical depth.
- Swiss editorial design: asymmetric compositions and structured grids.
- Contemporary architecture portfolios: large imagery and refined presentation.

Do not directly copy Apple's website or brand identity.

---

## 2. REMOVE THE OLD DESIGN

Inspect the existing implementation before editing.

Remove or fundamentally redesign:

- Neon purple outlines everywhere.
- Excessive gradients and glow.
- Generic dashboard cards.
- Fake terminal readouts.
- Fake mission telemetry.
- Decorative status indicators with no functionality.
- Arbitrary futuristic icons.
- Repeated glass rectangles.
- Template-like bento grids.
- Typewriter animations.
- Generic AI-generated headlines.
- Excessive particle effects.
- Background effects that reduce text readability.

Preserve working features, project data, legitimate links, and the existing video integration infrastructure.

Do not blindly delete functionality.

---

## 3. DESIGN SYSTEM

### Colors

Create an editorial, mostly neutral design system.

Light:
- Background: #F5F5F3
- Surface: #FFFFFF
- Primary text: #111214
- Secondary text: #707176

Dark:
- Background: #101114
- Surface: #1B1C20
- Primary text: #F4F4F2
- Secondary text: #9A9CA3

Accent:
- Restrained cool blue: #5179B8
- Silver highlights and neutral glass reflections.

Avoid saturated purple gradients as a primary design element.

### Typography

Use a premium sans-serif such as Geist, Inter, or another appropriate licensed typeface.

Typography should carry the visual identity.

Desktop hero headings should be exceptionally large and responsive, with carefully controlled tracking, line-height and line breaks.

Use a clear hierarchy between editorial headings, descriptions, labels and technical metadata.

Avoid excessive uppercase labels and decorative monospace text.

### Layout

Use a considered 12-column desktop grid, responsive editorial spacing, and a maximum content width around 1440–1600px.

Mix full-bleed images with narrow text columns.

Use whitespace as a design tool.

Not every element needs a container.

---

## 4. REAL APPLE-STYLE LIQUID GLASS

This is a critical requirement.

Use this actual GitHub implementation:

https://github.com/9und30/glassy-liquid

Documentation/demo:
https://9und30.github.io/glassy-liquid/

Install the maintained npm package:

npm install glassy-liquid

Read the repository documentation, especially its React API, GlassScene, GlassSurface, accessibility guidance, Safari limitations, and performance notes.

In particular, review the installed package documentation before implementing the components.

### Required optical behavior

The glass must exhibit:

1. Real background refraction, not just backdrop blur.
2. Edge lensing / displacement.
3. Subtle specular highlights.
4. Light transmission.
5. Appropriately restrained tint.
6. Slight chromatic dispersion where supported.
7. Natural optical depth.
8. Responsive hover and press interaction.

Do not implement fake Liquid Glass using only:

background: rgba(...);
backdrop-filter: blur(...);

Those may be supporting layers or fallbacks, not the complete implementation.

### Cross-browser support

On Chromium, take advantage of live backdrop refraction.

For Safari and Firefox, use the library's GlassScene mechanism around supported image/video backdrops where necessary.

Do not claim full live refraction where the browser cannot provide it.

If refraction is unavailable, degrade gracefully to high-quality frosted glass.

Handle React hydration correctly in Next.js.

### Where to use Liquid Glass

Use it selectively:

- Floating top navigation.
- The primary launch button.
- Project gallery controls.
- Floating media controls.
- Mobile navigation.
- Occasional contextual action buttons.

Do not render entire paragraphs or large content sections inside glass panels.

Do not stack multiple glass panels inside other glass panels.

### Desired result

The glass should look like a physical transparent lens floating above the webpage.

It must be visually obvious when positioned over detailed photography, but restrained over neutral backgrounds.

The user should see the imagery bend subtly at the glass edges.

---

## 5. HOMEPAGE

### Hero section

Create a monumental editorial hero.

Use the existing cinematic launchpad image or Gemini launch video as the principal visual asset.

The visual should dominate the screen without being obscured by excessive UI.

Place:

BAKDAULET
SOTSIAL

As the main typographic statement.

Supporting copy:

Software Engineering.
Cybersecurity.
Applied Research.

A minimal floating navigation and one prominent Liquid Glass CTA.

Primary CTA:

Initiate Launch

Secondary action:

Explore Work

No fake telemetry, decorative counters, or pretend mission status.

### Interaction

Preserve the interactive rocket launch functionality.

However, redesign its presentation.

The launch should feel like a high-end product film rather than a video game loading screen.

On click:

- The interface gently clears.
- A restrained countdown appears.
- The cinematic launch plays.
- The transition moves into the portfolio content.
- Scroll navigation becomes available.

Provide Skip Intro.

Do not force returning visitors to replay the intro.

Users should always be able to navigate the portfolio normally.

---

## 6. SELECTED WORK

Replace the current generic project card grid.

Use large editorial case-study previews.

Each major project should have its own composition.

Featured projects:

InkMath
ORBIT
1C2API
PROMETHEUS
Qadam
Komek Kids

Link to the real repositories under:
https://github.com/Smrbruh

### Project presentation

For each project, show:

- Project title.
- A precise one-sentence description.
- The real technology stack.
- An actual application screenshot where available.
- One visually dominant image.
- A link to the GitHub repository.
- A case-study page or detailed section.

Use the provided artwork as supporting imagery, not as proof of implemented functionality.

Do not present AI-generated interfaces as real screenshots.

### Layout variation

Use:

- Full-width hero images.
- Two-column editorial layouts.
- Horizontal project showcases.
- Occasional offset typography.
- Carefully cropped screenshots.
- Subtle motion and hover interactions.

Avoid making six identical cards.

---

## 7. ABOUT / RESUME

The website is a real professional portfolio, not a fictional space mission.

Present accurate information:

Bakdaulet Sotsial.
Second-year Cybersecurity student.
Astana IT University.
Kazakhstan.

Focus on software development, cybersecurity, algorithms, engineering experiments, and open-source projects.

Include meaningful Education, Experience, Research, and Contact sections.

Do not fabricate employment history, awards, certifications, users, performance metrics, or achievements.

Use verified project facts and existing content.

Make the resume downloadable if a real resume PDF exists; otherwise implement a clearly identified placeholder state without a broken link.

---

## 8. MOTION DESIGN

Use GSAP / ScrollTrigger for purposeful, premium transitions.

Motion must have consistent timing and easing.

Implement:

- Elegant text reveal.
- Image masking and cropping transitions.
- Scroll-linked image movement.
- Smooth section entrances.
- Subtle optical responses on glass controls.
- Refined project hover behavior.
- Seamless transitions between light and dark sections.

Avoid excessive parallax, constant wobbling, massive zoom effects, and animation on every element.

The best interaction is sometimes no interaction at all.

Respect prefers-reduced-motion.

Do not use forced scroll hijacking.

---

## 9. IMAGES AND VIDEO

Reuse the existing image assets and Gemini video slots already present in the repository.

Do not require new assets to begin.

Preserve the video fallback system.

Images must be:

- Appropriately cropped.
- Responsive.
- Optimized.
- Used at genuinely high visual quality.

Use high-resolution assets where they matter and optimized variants elsewhere.

Keep typography separate from background images.

Do not generate fictional screenshots.

---

## 10. RESPONSIVENESS

Mobile is not a scaled-down desktop screenshot.

Design mobile layouts intentionally.

The floating glass navigation must remain elegant and accessible.

Text must never overlap important imagery.

Avoid expensive GPU effects on low-power devices.

Lazy-load video and offscreen interactive effects.

Preserve excellent visual quality without sacrificing performance.

---

## 11. IMPLEMENTATION REQUIREMENTS

Use the existing stack wherever appropriate.

If the project uses Next.js, React, TypeScript, Tailwind, and GSAP, keep that architecture unless a change is technically necessary.

Create reusable, well-structured components.

Separate visual design tokens from component logic.

Do not introduce unnecessary dependencies.

Ensure working navigation, responsive behavior, keyboard access, contrast, SEO metadata, and accessible interactions.

### Validation

After implementing:

- Run the project's type checker.
- Run linting.
- Run the production build.
- Fix detected errors.
- Verify the interactive launch still works.
- Verify navigation and project links.
- Check the Liquid Glass implementation in Chromium, WebKit, and Firefox where browser testing is available.
- Ensure functional fallbacks where browser support is limited.

Use browser screenshots or automated visual inspection if available.

If a browser cannot be tested, explicitly report that limitation.

---

## 12. ACCEPTANCE CRITERIA

The redesign is complete only when:

1. The old neon sci-fi dashboard aesthetic is gone.
2. The site has a distinctive premium editorial identity.
3. The hero makes a powerful first impression.
4. Liquid Glass is integrated using the specified real library.
5. The glass visibly refracts supported backgrounds.
6. All major project sections use refined and varied layouts.
7. The rocket launch interaction is preserved and redesigned.
8. Mobile layouts are intentional and polished.
9. All existing working functionality remains usable.
10. The application builds successfully.

Do not finish after producing a design plan.

Implement the redesign directly in the existing codebase.

Do not ask me for more design references. Use your own design judgment within this specification.

**Final creative rule:**

Remove everything that looks like it was added merely to make the site appear futuristic.

Make the website feel expensive, intentional, quiet, and unforgettable.