# Verification — Orbital / Editorial

Validated on 24 November 2026 using Node.js 24 and the Chromium-based in-app browser.

## Passed

- ESLint and TypeScript checks.
- Four automated launch-state tests: full progression, skip/error recovery, duplicate-start protection and exact video-slot mapping.
- Browser: image-only launch starts in `arming` and completes at the portfolio. Body scroll lock and background inert state are removed; focus lands on the main heading.
- Browser: replay and immediate skip during arming work and restore scrolling.
- Browser: InkMath case study opens; Escape closes it and returns keyboard focus to the original Read study button.
- Browser: Qadam gallery switches to its real repository screenshot and the GlassScene backdrop changes to that exact image.
- Browser: mobile navigation opens and navigates; Systems & research filtering returns ORBIT, 1C2API and PROMETHEUS.
- Browser: 1440px desktop and 390px mobile have no horizontal document overflow.
- Browser: glass surfaces report `data-glass-engine="backdrop"`; the computed backdrop filters include both blur and an SVG `url(#glf...)` displacement filter. This is the library's actual refraction path, not a blur-only substitute.
- Browser: no hydration warnings or JavaScript errors observed during the checked interactions.
- Missing video slots use image fallback and render zero video elements.

## Scope and limitations

- Native Safari/WebKit and Firefox were not available in the supplied browser interface. Their media-scene WebGL path and frosted fallback are implemented through glassy-liquid, but not claimed as browser-tested.
- OS reduced-motion emulation was not available through the test interface. The matchMedia bypass and preference-change cleanup are implemented; the library additionally respects reduced motion, reduced transparency and forced colors.
- Final MP4s were not supplied under the contracted slot filenames. Named-video end transitions and playback failure recovery are implemented but have not been verified with the final Gemini clips.
- GitHub stars depend on the public API and its rate limits. Only actual API/cache values are displayed.

The production output and no-JavaScript HTML are checked as part of the final build. GitHub Actions repeats lint, typecheck, tests and the production build for future changes.
