"use client";
import { forwardRef, useLayoutEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { GlassSurface } from "glassy-liquid/react";

/** Native controls retain their semantics; the library owns only the optical layer. */
export const LensButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { appearance?: "light" | "dark" }
>(function LensButton(
  { children, className = "", appearance = "dark", ...props },
  ref,
) {
  return (
    <GlassSurface
      className={`lens-button ${className}`}
      radius="capsule"
      material="clear"
      appearance={appearance}
      refraction={24}
      bezel={12}
      blur={1.4}
      dispersion={0.06}
      specular={0.8}
      interactive
    >
      <button {...props} ref={ref}>
        {children}
      </button>
    </GlassSurface>
  );
});

export function LensBar({
  children,
  className = "",
  appearance = "light",
}: {
  children: ReactNode;
  className?: string;
  appearance?: "light" | "dark";
}) {
  return (
    <GlassSurface
      className={`lens-bar ${className}`}
      radius="capsule"
      material="regular"
      appearance={appearance}
      refraction={20}
      bezel={10}
      blur={7}
      dispersion={0}
      specular={0.7}
    >
      {children}
    </GlassSurface>
  );
}

/** Each optical layer is clipped to the actual hero boundary, never toggled globally. */
export function AdaptiveLensBar({ children, className = "", panel = false }: {
  children: ReactNode; className?: string; panel?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const host = root.current;
    const hero = document.getElementById("top");
    if (!host || !hero) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const boundary = hero.getBoundingClientRect().bottom;
      const rect = host.getBoundingClientRect();
      host.style.setProperty("--hero-cut", `${Math.max(0, Math.min(rect.height, boundary - rect.top))}px`);
      host.querySelectorAll<HTMLElement>("a, button, .nav-descriptor").forEach((el) => {
        el.style.setProperty("--text-cut", `${boundary - el.getBoundingClientRect().top}px`);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(host); observer.observe(hero);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);
  return (
    <div ref={root} className={`adaptive-lens ${panel ? "adaptive-panel" : ""}`}>
      <div className="adaptive-optics adaptive-light" aria-hidden="true">
        <GlassSurface radius={panel ? 24 : "capsule"} material="regular" appearance="light" blur={7} refraction={20} bezel={10} />
      </div>
      <div className="adaptive-optics adaptive-dark" aria-hidden="true">
        <GlassSurface radius={panel ? 24 : "capsule"} material="regular" appearance="dark" blur={7} refraction={20} bezel={10} />
      </div>
      <div className={`adaptive-content ${className}`}>{children}</div>
    </div>
  );
}
