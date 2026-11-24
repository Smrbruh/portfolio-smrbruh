import { test } from "node:test";
import assert from "node:assert/strict";
import {
  launchReducer,
  videoSlot,
  fallbackDuration,
  type LaunchState,
} from "../src/lib/launch-machine.ts";
test("a complete launch reaches the portfolio without any videos", () => {
  let state: LaunchState = "idle";
  state = launchReducer(state, "START");
  const observed = [state];
  while (state !== "portfolio") {
    assert.ok(fallbackDuration[state]);
    state = launchReducer(state, "NEXT");
    observed.push(state);
  }
  assert.deepEqual(observed, [
    "arming",
    "countdown",
    "launch",
    "ascent",
    "orbit",
    "portfolio",
  ]);
});
test("skip and failure are recoverable from every stage", () => {
  for (const stage of [
    "idle",
    "arming",
    "countdown",
    "launch",
    "ascent",
    "orbit",
  ] as LaunchState[]) {
    assert.equal(
      launchReducer(launchReducer(stage, "SKIP"), "NEXT"),
      "portfolio",
    );
    assert.equal(
      launchReducer(launchReducer(stage, "FAIL"), "NEXT"),
      "portfolio",
    );
  }
});
test("duplicate starts do not interrupt a launch and replay resets", () => {
  assert.equal(launchReducer("ascent", "START"), "ascent");
  assert.equal(launchReducer("portfolio", "RESET"), "idle");
  assert.equal(launchReducer("idle", "NEXT"), "idle");
});
test("only contracted media slots are selected", () => {
  assert.equal(videoSlot("idle"), "idle-launchpad");
  assert.equal(videoSlot("launch"), "ignition-launch");
  assert.equal(videoSlot("ascent"), "ascent-to-orbit");
  assert.equal(videoSlot("orbit"), "orbit-loop");
  assert.equal(videoSlot("countdown"), null);
});
