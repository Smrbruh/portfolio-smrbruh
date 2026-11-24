"use client";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import gsap from "gsap";
import {
  launchReducer,
  fallbackDuration,
  videoSlot,
} from "@/lib/launch-machine";
import { Artwork } from "./Artwork";
import { OptionalVideo } from "./OptionalVideo";
import { GlassScene } from "glassy-liquid/react";
import { LensButton, LensBar } from "./LiquidGlass";

export function Launch() {
  const [state, dispatch] = useReducer(launchReducer, "idle");
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(3);
  const [available, setAvailable] = useState<string[]>([]);
  const [failedSlot, setFailedSlot] = useState<string | null>(null);
  const [readySlot, setReadySlot] = useState<string | null>(null);
  const [sound, setSound] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const scene = useRef<HTMLDivElement>(null);
  const start = useRef<HTMLButtonElement>(null);
  const finish = useCallback(() => dispatch("NEXT"), []);
  const slot = videoSlot(state);
  const fail = useCallback(() => setFailedSlot(slot), [slot]);
  const isDone =
    state === "portfolio" || state === "skipped" || state === "error";
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let completed = false;
    try {
      completed = sessionStorage.getItem("smrbruh-intro") === "complete";
    } catch {}
    const frame = requestAnimationFrame(() => {
      if (!motion.matches && !completed && !location.hash) {
        setActive(true);
        start.current?.focus();
      }
    });
    const change = () => {
      if (motion.matches) dispatch("SKIP");
    };
    motion.addEventListener("change", change);
    const controller = new AbortController();
    fetch("/videos/manifest.json", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : { available: [] }))
      .then((data) => {
        if (Array.isArray(data.available))
          setAvailable(
            data.available.filter((v: unknown) => typeof v === "string"),
          );
      })
      .catch(() => {});
    const replay = () => {
      if (motion.matches) {
        document
          .getElementById("archive-title")
          ?.focus({ preventScroll: true });
        return;
      }
      setActive(true);
      dispatch("RESET");
      setFailedSlot(null);
    };
    window.addEventListener("replay-launch", replay);
    return () => {
      cancelAnimationFrame(frame);
      controller.abort();
      motion.removeEventListener("change", change);
      window.removeEventListener("replay-launch", replay);
    };
  }, []);
  useEffect(() => {
    if (!active || isDone) return;
    const body = document.body;
    const previous = body.style.overflow;
    const page = document.getElementById("portfolio");
    body.style.overflow = "hidden";
    page?.setAttribute("inert", "");
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") dispatch("SKIP");
      if (event.key === "Tab") {
        const buttons = scene.current?.querySelectorAll<HTMLElement>(
          "button:not(:disabled), a[href]",
        );
        if (!buttons?.length) return;
        const first = buttons[0],
          last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    start.current?.focus();
    return () => {
      body.style.overflow = previous;
      page?.removeAttribute("inert");
      window.removeEventListener("keydown", key);
    };
  }, [active, isDone]);
  useEffect(() => {
    if (!isDone || !active) return;
    try {
      sessionStorage.setItem("smrbruh-intro", "complete");
    } catch {}
    const frame = requestAnimationFrame(() =>
      document.getElementById("archive-title")?.focus({ preventScroll: true }),
    );
    window.dispatchEvent(new Event("launch-complete"));
    audio.current?.suspend().catch(() => {});
    return () => cancelAnimationFrame(frame);
  }, [isDone, active]);
  useEffect(() => {
    if (!active || isDone || state === "idle") return;
    const usingVideo =
      slot &&
      available.includes(slot) &&
      failedSlot !== slot &&
      (state === "launch" || state === "ascent");
    if (usingVideo) {
      const cap = setTimeout(finish, 60000);
      return () => clearTimeout(cap);
    }
    const delay = fallbackDuration[state];
    if (!delay) return;
    const timer = setTimeout(finish, delay);
    return () => clearTimeout(timer);
  }, [state, active, isDone, available, slot, failedSlot, finish]);
  useEffect(() => {
    if (state !== "countdown") return;
    let n = 3;
    const timer = setInterval(() => {
      n--;
      if (n > 0) setCount(n);
    }, 900);
    return () => clearInterval(timer);
  }, [state]);
  useEffect(() => {
    if (!active || isDone) return;
    const ctx = gsap.context(() => {
      if (state === "arming")
        gsap.to(".launch-copy", { opacity: 0, y: -12, duration: 0.8 });
      if (state === "launch")
        gsap.to(".pad-art", {
          scale: 1.08,
          yPercent: -9,
          transformOrigin: "76% 65%",
          duration: 2.4,
          ease: "power2.in",
        });
      if (state === "ascent")
        gsap.to(".pad-art", {
          scale: 1.15,
          yPercent: 18,
          opacity: 0,
          duration: 2.4,
          ease: "power2.inOut",
        });
      if (state === "orbit")
        gsap.fromTo(
          ".launch-earth",
          { scale: 1.04, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2 },
        );
    }, scene);
    return () => ctx.revert();
  }, [state, active, isDone]);
  useEffect(() => {
    if (!sound || !audio.current || isDone) return;
    if (state !== "countdown" && state !== "launch") return;
    const ctx = audio.current;
    const osc = ctx.createOscillator(),
      gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = state === "launch" ? 55 : 220 + count * 110;
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }, [sound, state, count, isDone]);
  const toggleSound = () => {
    if (!sound) {
      try {
        audio.current ??= new AudioContext();
        audio.current.resume().catch(() => {});
        setSound(true);
      } catch {
        setSound(false);
      }
    } else {
      setSound(false);
      audio.current?.suspend().catch(() => {});
    }
  };
  if (!active || isDone) return null;
  const running = state !== "idle";
  const status = {
    idle: "Introduction",
    arming: "Preparing launch",
    countdown: "Countdown",
    launch: "Ignition · Lift-off",
    ascent: "Clearing the atmosphere",
    orbit: "Orbit established",
    portfolio: "Selected work",
    skipped: "Intro skipped",
    error: "Selected work",
  }[state];
  return (
    <div
      ref={scene}
      className={`launch-screen state-${state}`}
      role="dialog"
      aria-modal="true"
      aria-label="Launch introduction"
      data-state={state}
    >
      <GlassScene
        backdrop={
          readySlot === slot && failedSlot !== slot
            ? ".launch-screen video"
            : state === "orbit"
              ? ".launch-screen .launch-earth img"
              : ".launch-screen .pad-art img"
        }
        className="launch-glass-scene"
      >
        <Artwork
          src="/assets/site/launchpad"
          alt="A silver spacecraft on a quiet launchpad beneath the night sky"
          className="pad-art"
          priority
        />
        <Artwork
          src="/assets/site/orbit-earth"
          alt=""
          className="launch-earth"
        />
        {slot && failedSlot !== slot && (
          <OptionalVideo
            key={slot}
            slot={slot}
            available={available}
            poster={`/assets/site/${state === "orbit" ? "orbit-earth" : "launchpad"}.webp`}
            loop={state === "idle" || state === "orbit"}
            onComplete={finish}
            onReady={() => setReadySlot(slot)}
            onFailure={fail}
          />
        )}
        <div className="launch-shade" />
        <div className="engine-light" aria-hidden="true" />
        <div className="cloud-transition" aria-hidden="true" />
        <div className="launch-navigation">
          <LensBar appearance="dark">
            <a
              className="wordmark"
              href="#top"
              onClick={() => dispatch("SKIP")}
            >
              smrbruh<span>.</span>
            </a>
            <nav aria-label="Introduction navigation">
              <a href="#missions" onClick={() => dispatch("SKIP")}>
                Work
              </a>
              <a href="#about" onClick={() => dispatch("SKIP")}>
                About
              </a>
              <a href="#contact" onClick={() => dispatch("SKIP")}>
                Contact
              </a>
            </nav>
            <button onClick={() => dispatch("SKIP")}>Skip Intro</button>
          </LensBar>
        </div>
        <div className="launch-copy">
          <div className="hero-kicker">
            <span>Bakdaulet Sotsial / Portfolio</span>
            <span>Astana, Kazakhstan</span>
          </div>
          <h1>
            BAKDAULET
            <br />
            SOTSIAL
          </h1>
          <div className="hero-bottom">
            <p>
              Software Engineering.
              <br />
              Cybersecurity.
              <br />
              Applied Research.
            </p>
            <div className="hero-actions">
              <LensButton
                ref={start}
                disabled={running}
                onClick={() => {
                  setCount(3);
                  dispatch("START");
                }}
              >
                Initiate Launch <span aria-hidden="true">+</span>
              </LensButton>
              <button className="plain-button" onClick={() => dispatch("SKIP")}>
                Explore Work
              </button>
            </div>
            <span className="hero-footnote">
              Beyond the interface.
              <br />
              Closer to the work.
            </span>
          </div>
        </div>
        {running && (
          <div className="launch-sequence" aria-live="polite">
            <span>
              {state === "countdown"
                ? count
                : state === "orbit"
                  ? "A wider perspective."
                  : ""}
            </span>
            <p>{status}</p>
          </div>
        )}
        <div className="floating-media">
          <LensBar appearance="dark">
            <button
              onClick={toggleSound}
              aria-pressed={sound}
              aria-label={sound ? "Mute launch sound" : "Enable launch sound"}
            >
              Sound {sound ? "on" : "off"}
            </button>
            {running && (
              <button onClick={() => dispatch("SKIP")}>Skip film</button>
            )}
          </LensBar>
        </div>
      </GlassScene>
    </div>
  );
}
