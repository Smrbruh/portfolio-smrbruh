export type LaunchState =
  | "idle"
  | "arming"
  | "countdown"
  | "launch"
  | "ascent"
  | "orbit"
  | "portfolio"
  | "skipped"
  | "error";
export type LaunchEvent = "START" | "NEXT" | "SKIP" | "FAIL" | "RESET";
const next: Partial<Record<LaunchState, LaunchState>> = {
  arming: "countdown",
  countdown: "launch",
  launch: "ascent",
  ascent: "orbit",
  orbit: "portfolio",
  skipped: "portfolio",
  error: "portfolio",
};
export function launchReducer(
  state: LaunchState,
  event: LaunchEvent,
): LaunchState {
  if (event === "RESET") return "idle";
  if (event === "SKIP") return "skipped";
  if (event === "FAIL") return "error";
  if (event === "START") return state === "idle" ? "arming" : state;
  return next[state] ?? state;
}
export const fallbackDuration: Partial<Record<LaunchState, number>> = {
  arming: 900,
  countdown: 2700,
  launch: 2400,
  ascent: 2500,
  orbit: 1300,
};
export function videoSlot(state: LaunchState): string | null {
  return (
    (
      {
        idle: "idle-launchpad",
        arming: "idle-launchpad",
        countdown: "idle-launchpad",
        launch: "ignition-launch",
        ascent: "ascent-to-orbit",
        orbit: "orbit-loop",
      } as Partial<Record<LaunchState, string>>
    )[state] ?? null
  );
}
