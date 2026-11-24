# Gemini video file contract

Drop generated/edited Gemini Veo clips into this directory:

- `idle-launchpad.mp4` — quiet loop for initial hero, optional; fallback is `/assets/site/launchpad.webp`.
- `ignition-launch.mp4` — engines ignite, then rocket lifts off after user clicks.
- `ascent-to-orbit.mp4` — ascent through clouds and into orbital space.
- `orbit-loop.mp4` — slow stable orbital background for portfolio reveal, optional; fallback is `/assets/site/orbit-earth.webp`.

Use muted `playsInline`, a `poster`, reliable `onEnded` handlers, and graceful fallback when any clip is missing, can't load, or when `prefers-reduced-motion` is enabled. Do not rely on a fixed 8/10-second duration. For transitions between clips, use crossfades, color-matched frames or smoke/cloud wipes. Optional soundtrack only after an explicit user gesture.
