# CODEX MASTER PROMPT — SMRBRUH / SPACE-TECH PORTFOLIO

You are the lead frontend engineer, motion designer and creative developer. Build a **real, complete, production-grade personal portfolio website**, not a UI mockup, a text-only landing page, a generic dashboard, or a template. Work autonomously inside the current repository, implement the project end-to-end, run the required checks, fix errors, and report actual verification results. Do not ask me to provide a design or more instructions. All assets are already included in this pack.

## 1) Brand, purpose, content

- Brand: **SMRBRUH / BEYOND THE INTERFACE**.
- Person: **Bakdaulet Sotsial**. Second-year **Cybersecurity** BSc student at **Astana IT University**, Kazakhstan.
- Positioning: **Software Engineering · Cybersecurity · Applied Research**; builder of developer tools, desktop apps, numerical research prototypes and ML systems. Write concise, sharp, non-generic English copy. No “passionate about technology”, no fake awards, no motivational AI filler.
- Primary goal: impress serious recruiters, engineers and collaborators by pairing striking visual direction with verifiable, technically meaningful work.
- Visual DNA: cinematic near-black/navy sci-fi, electric violet, blue atmospheric glow, immaculate typography, aerospace telemetry details, elegant glass/metal surfaces. Make it resemble a premium interactive launch-control experience, **not a neon-purple SaaS dashboard**. Treat the supplied concept artworks as the art direction.

## 2) Stack

Use **Next.js App Router + TypeScript + Tailwind CSS**, with **GSAP + ScrollTrigger** (or equivalent robust animation library) for cinematic choreography. Use React Three Fiber only for small, purposeful effects if it meaningfully improves quality without damaging load time. Use accessible semantic markup and maintainable component architecture. Avoid unnecessary libraries. Implement full responsive design and production deploy compatibility (e.g. Vercel).

## 3) Assets: use them, do not replace them with remote stock imagery

All web-ready assets are already inside `public/assets/` with smaller `-sm.webp` variants. Full originals are in `source-originals/`, and exact intended uses are in `ASSET_MAP.md`. Required:

- `/assets/site/launchpad.webp` — landing/launch idle poster.
- `/assets/site/orbit-earth.webp` — orbit reveal and portfolio backdrop.
- `/assets/site/mission-control.webp` — engineering/about/contact ambiance.
- `/assets/projects/{inkmath,orbit,1c2api,prometheus,qadam,komek-kids}.webp` — six distinct cinematic project covers.

Use **real HTML text and UI** on top of imagery. Never pretend the fictional UI or numbers embedded inside concept images are actual screenshots/measurements. Add thoughtful gradients, crops, subtle masks and overlays to maintain contrast and keep the design visually cohesive.

## 4) The central interaction: LAUNCH / ENTER ORBIT

This is the primary feature and **must be implemented as working UI**. On first load, visitors see full-screen Mission Control with dramatic launchpad art on the right, clean left-side copy, understated technical metadata and an enormous tasteful `INITIATE LAUNCH` CTA. Also show `SKIP INTRO` and an accessible mute/audio toggle (default silent). Design for both mouse and touch.

Implement a typed launch state machine: `idle → arming → countdown → launch → ascent → orbit → portfolio`, plus `skipped`/`error` recovery. Clicking starts a fast animated 3–2–1 countdown, panel disassembly, engine illumination and reveal. Transition into the Gemini videos when supplied:

- `/videos/idle-launchpad.mp4` (optional quiet looping idle)
- `/videos/ignition-launch.mp4` (main launch)
- `/videos/ascent-to-orbit.mp4` (follow-up ascent)
- `/videos/orbit-loop.mp4` (optional loop after reveal)

**Videos have not been supplied yet. Do not create broken video tags or block the project on them.** Build a beautiful functioning fallback NOW: CSS/GSAP camera push on still launchpad, ignition flashes, animated exhaust/particles, cloud/gradient wipe, Earth reveal. Auto-detect video availability and switch to video choreography when files are later added. Use `onEnded` / loading events and timeouts as fallback, not brittle hard-coded duration guesses. Crossfade at logical boundaries; avoid black frames. `SKIP INTRO` works immediately at any point. `prefers-reduced-motion` instantly bypasses the sequence. Store the intro-completed flag per session, never trap users in it, and ensure scroll unlocks after every path. The content must remain discoverable/indexable without JavaScript.

After cinematic transition, show a powerful `MISSION ARCHIVE / SELECTED WORK` reveal over the orbital background, then a seamless scrollable portfolio. Never force a long animation on repeat navigation.

## 5) Pages and sections

1. **Launch / Hero** — standout typographic hero, rocket, animated statuses, launch CTA, skip intro.
2. **Selected Missions** — six project cards with custom cinematic images, premium hover/focus motion, category, 1–2 precise sentences, stack tags and working GitHub links:
   - InkMath — https://github.com/Smrbruh/InkMath — local-first Windows LaTeX/PDF notebook; Electron, Tectonic, annotation tools.
   - ORBIT — https://github.com/Smrbruh/ORBIT — local robotics RL workstation using PPO vs A*, Tauri + Python; simulation only, no physical robot claim.
   - 1C2API — https://github.com/Smrbruh/1c2api — transform EDT 1C configurations into schema/OpenAPI/Postman/Redoc outputs.
   - PROMETHEUS — https://github.com/Smrbruh/PROMETHEUS — numerical plane-stress and SIMP/OC topology-optimization research baseline; not certified hardware.
   - Qadam — https://github.com/Smrbruh/wafam — Astana walking assistant using POI retrieval, routing and optional Gemini; do not imply public deployment.
   - Komek Kids — https://github.com/Smrbruh/komek-kids — accessible video-first educational platform prototype, Next.js / optional Supabase.
3. **Most-starred Open Source** — Discrete Mathematics Notes (https://github.com/Smrbruh/Discrete-Mathematics-Lecture-Notes-and-Problem-Solving-Weeks-1-10-) and Calculus I Notes (https://github.com/Smrbruh/Calculus-1-Lecture-Notes). Use real GitHub star counts (cached with graceful fallback), never invented hard-coded numbers.
4. **Engineering / Research** — substantive disciplines: security, algorithms, Python, TypeScript, desktop applications, applied ML, FEM/research. Present experience through actual project examples rather than a wall of icons.
5. **About / Timeline** — second-year Cybersecurity at Astana IT University, building open-source tools and experimenting across software, robotics and research; concise and factual. Do not fabricate work experience, employers, degrees, prizes or statistics.
6. **Contact** — GitHub https://github.com/Smrbruh, LinkedIn https://www.linkedin.com/in/bakdaulet-sotsial-06a16b377/, Telegram https://t.me/stcrs. Include clear CV download only if an actual CV file exists; otherwise show `Request résumé` linking to contact, not a fake download.

## 6) Motion and visual requirements

- Staggered text reveal, scroll-linked atmospheric transitions, faint orbital paths, starfield and intelligent parallax.
- Clean responsive project layout, **cinematic imagery actually visible**, no monotonous generic cards; at least one featured project with bigger editorial treatment.
- Premium navigation with scroll progress, section anchors, polished transitions, back-to-top, active section indication.
- Smooth but not sluggish; never prevent normal scrolling for decorative effects. Respect reduced motion.
- Strong editorial grid, highly controlled purple glow, restrained glass effects, tasteful hover depth, no emoji-stuffed copy.
- Light typography on dark backgrounds with verified contrast. Avoid unreadable low-opacity text.
- Mobile: preserve the rocket and Earth through deliberate crops; simplify effects; always keep text and CTA readable, avoid 100vh mobile browser bugs.

## 7) Implementation quality / acceptance

- Create a cohesive production app and folder structure with separated data, components, hooks and animation orchestration.
- Fully keyboard-accessible interactions; focus-visible, Escape/skip path, semantic labels, meaningful alt attributes, no autoplay audio. Scroll restoration and focus after skipping intro.
- Media performance: Next/Image or equivalent optimized image handling, sizes, lazy loading below fold, only load heavy media when needed; no layout shifts, no video preload bombardment; robust missing-video fallback.
- Security: safe external links, no exposed API keys, no client secrets, no unsafe remote HTML.
- SEO: unique metadata, OpenGraph, sitemap/robots where relevant, real titles, favicon or simple monogram, stable social preview.
- Add a working local README with `npm install`, `npm run dev`, production build and a documented video-drop workflow. Provide minimal but meaningful interaction tests where practical.
- Run lint, TypeScript check, tests if added and production build. Fix errors. If a tool/environment is unavailable, say exactly what was not verified and why; don't claim success.

**Deliver a polished, genuinely functioning site with the supplied visual assets and a working cinematic launch even before Gemini videos exist. Do not stop at a plan or wireframe.**
