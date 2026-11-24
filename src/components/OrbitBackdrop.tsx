"use client";
import { useEffect, useRef, useState } from "react";
import { OptionalVideo } from "./OptionalVideo";
/** Optional orbital ambience loads only while the hero is visible. */
export function OrbitBackdrop() {
  const anchor = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    const frame = requestAnimationFrame(update);
    preference.addEventListener("change", update);
    const observer = new IntersectionObserver((entries) =>
      setVisible(entries[0]?.isIntersecting ?? false),
    );
    if (anchor.current) observer.observe(anchor.current);
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
    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", update);
      observer.disconnect();
      controller.abort();
    };
  }, []);
  return (
    <div className="orbit-video-layer" ref={anchor}>
      {visible && !reduced && (
        <OptionalVideo
          slot="orbit-loop"
          available={available}
          poster="/assets/site/orbit-earth.webp"
          loop
        />
      )}
    </div>
  );
}
