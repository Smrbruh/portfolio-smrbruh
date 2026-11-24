import { existsSync, writeFileSync } from "node:fs";
const slots = [
  "idle-launchpad",
  "ignition-launch",
  "ascent-to-orbit",
  "orbit-loop",
];
const available = slots.filter((slot) =>
  existsSync(`public/videos/${slot}.mp4`),
);
writeFileSync("public/videos/manifest.json", JSON.stringify({ available }));
console.log(
  `Video slots: ${available.length ? available.join(", ") : "cinematic still-image fallback"}`,
);
