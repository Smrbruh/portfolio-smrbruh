"use client";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
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
