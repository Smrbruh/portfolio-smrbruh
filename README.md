# SMRBRUH / Beyond the Interface

An editorial portfolio for Bakdaulet Sotsial. Next.js App Router, TypeScript, Tailwind CSS, GSAP/ScrollTrigger, locally hosted Geist and real optical surfaces from `glassy-liquid`.

The current visual direction is **Orbital / Editorial**. `REDESIGN_BRIEF.md` supersedes the initial visual direction in `CODEX_MASTER_PROMPT.md`; project facts, links and the video contract remain intact.

## Development

Node.js 24 and npm are recommended.

```sh
npm install
npm run dev
```

Open http://localhost:3000. First visits show the launchpad introduction. Initiate Launch starts the film; Skip Intro and Escape immediately leave it. Completion is remembered per browser session. Returning visitors can browse normally and replay from the hero.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`npm start` serves the production `out/` directory on port 3000. Stop the dev server first. The app is fully statically exportable; deploy `out/` to a static host or build the Next.js project on Vercel. Set `NEXT_PUBLIC_SITE_URL` before building to customize canonical, Open Graph and sitemap URLs.

## Design and implementation

- `src/app/tokens.css`: neutral light/dark design tokens, typography and optical accents.
- `src/app/globals.css`: responsive editorial compositions, restrained motion and accessibility fallbacks.
- `src/components/LiquidGlass.tsx`: reusable native controls surrounded by `GlassSurface` optical layers.
- `src/components/Archive.tsx`: six varied case-study compositions, image/interface gallery controls, native dialogs, filters, open-source stars, education, experience and contacts.
- `src/components/Launch.tsx`: typed launch orchestration, countdown, media integration, audio opt-in, focus management and session recovery.
- `src/components/OptionalVideo.tsx`: frame-ready crossfade, end events, rejected playback and progress watchdog.
- `src/lib/launch-machine.ts`: transitions, exact video slots and fallback timing.
- `src/lib/projects.ts`: factual project data with explicit engineering limitations.
- `src/lib/project-media.ts`: real repository screenshots and numerical figures, with source links.

The portfolio renders in server-generated HTML. Content and repository/contact links remain discoverable without JavaScript. Native dialogs restore focus; normal scrolling is never replaced by a custom scrolling system.

## Liquid Glass

Installed package: `glassy-liquid` 0.1.0. Documentation: https://github.com/9und30/glassy-liquid

The React bindings are SSR-safe and defer custom-element upgrades until hydration. Glass is limited to navigation, primary launch actions, gallery controls and floating media controls. Paragraphs and case studies use ordinary HTML surfaces.

Chromium uses the library's `backdrop` engine: SVG displacement in the live backdrop filter, edge refraction, specular rim, transmission and restrained dispersion on the launch action. Image/video controls live inside `GlassScene`, which supplies media-backed WebGL refraction for supported Safari/Firefox versions. Outside supported image scenes, browsers without live backdrop refraction use the library's frosted fallback; this is not claimed as full live refraction. Gallery scenes switch their backdrop to the actual image shown.

The library sleeps offscreen scenes and shares its WebGL context. Reduced motion removes elastic transitions; reduced transparency and forced-color preferences get opaque/system-color alternatives. Chromium was inspected during development; native WebKit/Safari and Firefox testing were not available in the provided browser interface.

## Video integration

No MP4 is required. Add any subset of these files to `public/videos/`:

- `idle-launchpad.mp4`
- `ignition-launch.mp4`
- `ascent-to-orbit.mp4`
- `orbit-loop.mp4`

Run `npm run build`, or `node scripts/media-manifest.mjs` while developing and then refresh. The generated manifest prevents missing clips from creating broken video tags. See `public/videos/VIDEO_SLOTS.md`.

Loaded video frames fade in over a dark background. Intro and hero have no photographic posters or image substitutes. Sequence clips advance on `ended`. A loading/playback error, rejected autoplay, or five seconds without progress switches to the dark-background timed fallback. A 60-second safety ceiling prevents malformed clips from trapping a visitor; it is not normal timing. All video is muted and inline. Sound requires explicit opt-in and uses synthesized tones. Reduced-motion visitors bypass the sequence.

The supplied Gemini clips are included as four silent H.264 fast-start MP4s. They are cumulative extensions; distinct ten-second segments avoid restarting earlier footage. See VIDEO_SLOTS.md for provenance. Reduced motion disables ambient playback and retains the dark surface.

## Content integrity

All supplied cinematic artwork is identified as concept imagery. Real InkMath and Qadam screenshots, plus a PROMETHEUS numerical figure, were retrieved from the corresponding public repositories. They are labeled separately and linked in `src/lib/project-media.ts`. Research figures are not physical validation.

No employment, certification, awards, usage or performance metrics are invented. No résumé PDF was supplied; Request a copy opens the actual Telegram contact. GitHub star counts are fetched from GitHub and cached for one hour. On failure, the last actual snapshot remains, or the repository link appears without a fabricated number.

See `VERIFICATION.md` for checks and explicit testing limitations. GitHub Actions runs lint, typecheck, state-machine tests and the production build on pushes to main and pull requests.
