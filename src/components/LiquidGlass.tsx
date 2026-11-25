"use client";
import { forwardRef, useLayoutEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import gsap from "gsap";
import { GlassScene, GlassSurface } from "glassy-liquid/react";

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

/** One uncut optical surface; only its tint and text follow the hero boundary. */
export function AdaptiveLensBar({ children, className = "", panel = false, open = true }: {
  children: ReactNode; className?: string; panel?: boolean; open?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const refresh = useRef<() => void>(() => {});
  useLayoutEffect(() => {
    if (!panel || !root.current) return;
    const host = root.current;
    const links = host.querySelectorAll("nav a");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf([host, ...links]);
    const timeline = gsap.timeline({ onUpdate: () => refresh.current() });
    if (open) {
      timeline.fromTo(host,
        { autoAlpha: 0, y: -14, scaleX: 0.92, scaleY: 0.58 },
        { autoAlpha: 1, y: 0, scaleX: 1, scaleY: 1, duration: reduced ? 0 : 0.68, ease: "elastic.out(1, 0.62)" })
        .fromTo(links, { opacity: 0, y: -8 }, { opacity: 1, y: 0, stagger: reduced ? 0 : 0.045, duration: reduced ? 0 : 0.3, ease: "power2.out" }, reduced ? 0 : 0.1);
    } else {
      timeline.to(host, { autoAlpha: 0, y: -10, scaleX: 0.96, scaleY: 0.84, duration: reduced ? 0 : 0.22, ease: "power2.in" });
    }
    return () => { timeline.kill(); };
  }, [open, panel]);
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
    refresh.current = update;
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(host); observer.observe(hero);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);
  return (
    <div ref={root} className={`adaptive-lens ${panel ? "adaptive-panel" : ""}`} inert={panel && !open} aria-hidden={panel && !open ? true : undefined}>
      <GlassScene backdrop=".hero-scene video" className="adaptive-media-scene adaptive-optics" aria-hidden="true">
        <GlassSurface className="adaptive-glass" radius={panel ? 24 : "capsule"} material="clear" appearance="light" blur={14} refraction={32} bezel={16} specular={1.15} dispersion={0.035} shadow={false} />
      </GlassScene>
      <div className="adaptive-tint" aria-hidden="true" />
      <div className={`adaptive-content ${className}`}>{children}</div>
    </div>
  );
}
