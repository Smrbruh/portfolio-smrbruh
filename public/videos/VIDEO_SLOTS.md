# Gemini video integration

Intro and hero use video only, without image posters or photographic fallbacks. A dark surface remains while loading or if playback fails. Timed recovery and Skip Intro keep the portfolio accessible. Reduced motion bypasses the intro and disables ambient playback.

The supplied files in smrbruh-assets/gemini-videos are cumulative extensions:

| Slot | Original filename | Source interval |
| --- | --- | --- |
| idle-launchpad.mp4 | gemini_generated_video_7fb45dff.mp4 | 0-10 s |
| ignition-launch.mp4 | gemini_generated_video_8f7092cb.mp4 | 10-20 s |
| ascent-to-orbit.mp4 | gemini_generated_video_9cc02a49.mp4 | 20-30 s |
| orbit-loop.mp4 | gemini_generated_video_6445bbd5.mp4 | 30-40 s |

Encoded with libx264 CRF 20, yuv420p, faststart, no audio. Idle continues through arming/countdown. Launch and ascent advance on ended, not hardcoded durations. Idle and orbit loop. Playback errors and a five-second progress watchdog recover automatically. A 60-second safety ceiling handles malformed media. Regenerate the manifest after changing available files.
