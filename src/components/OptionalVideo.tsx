"use client";
import { useEffect, useRef, useState } from "react";
export function OptionalVideo({
  slot,
  available,
  loop = false,
  onComplete,
  onFailure,
  onReady,
}: {
  slot: string;
  available: string[];
  loop?: boolean;
  onComplete?: () => void;
  onFailure?: () => void;
  onReady?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const enabled = available.includes(slot);
  useEffect(() => {
    if (!enabled) return;
    const video = ref.current;
    if (!video) return;
    const fail = () => {
      setFailed(true);
      onFailure?.();
    };
    let watchdog: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(watchdog);
      watchdog = setTimeout(fail, 5000);
    };
    const progress = () => {
      if (video.currentTime > 0) reset();
    };
    const play = () => {
      video.play().catch(fail);
    };
    reset();
    video.addEventListener("timeupdate", progress);
    video.addEventListener("canplay", play);
    if (video.readyState >= 3) play();
    return () => {
      clearTimeout(watchdog);
      video.removeEventListener("timeupdate", progress);
      video.removeEventListener("canplay", play);
      video.pause();
    };
  }, [enabled, onFailure]);
  if (!enabled || failed) return null;
  return (
    <video
      ref={ref}
      className={`scene-video ${ready ? "is-ready" : ""}`}
      src={`/videos/${slot}.mp4`}
      muted
      playsInline
      loop={loop}
      preload="auto"
      onPlaying={() => {
        setReady(true);
        onReady?.();
      }}
      onEnded={onComplete}
      onError={() => {
        setFailed(true);
        onFailure?.();
      }}
      aria-hidden="true"
    />
  );
}
