# Verification — Orbital / Editorial

Validated on 24 November 2026 using Node.js 24 and the Chromium-based in-app browser.

## Passed

- ESLint and TypeScript checks.
- Four automated launch-state tests: full progression, skip/error recovery, duplicate-start protection and exact video-slot mapping.
- Browser: video launch plays ignition and ascent clips, then completes at the orbital portfolio. Body scroll lock and background inert state are removed; focus lands on the main heading.
- Browser: replay and immediate skip during arming work and restore scrolling.
- Browser: InkMath case study opens; Escape closes it and returns keyboard focus to the original Read study button.
- Browser: Qadam gallery switches to its real repository screenshot and the GlassScene backdrop changes to that exact image.
- Browser: mobile navigation opens and navigates; Systems & research filtering returns ORBIT, 1C2API and PROMETHEUS.
- Browser: 1440px desktop and 390px mobile have no horizontal document overflow.
- Browser: glass surfaces report `data-glass-engine="backdrop"`; the computed backdrop filters include both blur and an SVG `url(#glf...)` displacement filter. This is the library's actual refraction path, not a blur-only substitute.
- Browser: no hydration warnings or JavaScript errors observed during the checked interactions.
- Browser: with an empty manifest, launch completes on the dark background with zero video/image substitutes and restores scrolling.
- Browser: intro and hero contain zero image elements and no video poster attributes. Idle, ignition, ascent and orbital video playback were observed; orbital video loops.

## Scope and limitations

- Native Safari/WebKit and Firefox were not available in the supplied browser interface. Their media-scene WebGL path and frosted fallback are implemented through glassy-liquid, but not claimed as browser-tested.
- OS reduced-motion emulation was not available through the test interface. The matchMedia bypass and preference-change cleanup are implemented; the library additionally respects reduced motion, reduced transparency and forced colors.
- Supplied Gemini clips are integrated and tested in Chromium. Network-stall and rejected-autoplay recovery are implemented; those specific browser failures were not artificially injected.
- GitHub stars depend on the public API and its rate limits. Only actual API/cache values are displayed.

The production output and no-JavaScript HTML are checked as part of the final build. GitHub Actions repeats lint, typecheck, tests and the production build for future changes.

## Navigation correction

- At 390px, expanded navigation uses numeric 24px optical radius rather than capsule geometry.
- With the hero edge inside the open panel, dark and light optical layers are clipped to the actual edge. Text contrast follows the same edge independently for each control. No whole-header appearance toggle remains.
- Mobile Work link closes the menu and navigates. No browser errors observed.
- Native iOS/Instagram WebView remains untested; Chromium mobile viewport was checked.
