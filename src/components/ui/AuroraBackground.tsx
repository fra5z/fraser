"use client";
import { CSSProperties } from "react";

interface Props {
  opacity?: number;
  showRadialGradient?: boolean;
  className?: string;
}

export default function AuroraBackground({
  opacity = 0.35,
  showRadialGradient = true,
  className = "",
}: Props) {
  const mask = showRadialGradient
    ? "radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)"
    : undefined;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -inset-[10px] will-change-transform overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <div
        className={[
          // CSS variable definitions
          "[--white-gradient:repeating-linear-gradient(100deg,var(--aurora-white)_0%,var(--aurora-white)_7%,transparent_10%,transparent_12%,var(--aurora-white)_16%)]",
          "[--aurora:repeating-linear-gradient(100deg,var(--aurora-blue500)_10%,var(--aurora-indigo300)_15%,var(--aurora-blue300)_20%,var(--aurora-violet200)_25%,var(--aurora-blue400)_30%)]",
          // Base background layers
          "[background-image:var(--white-gradient),var(--aurora)]",
          "[background-size:300%,_200%]",
          "[background-position:50%_50%,50%_50%]",
          // Blur/filter
          "blur-[10px]",
          // After pseudo-element (animated layer)
          "after:content-[''] after:absolute after:inset-0",
          "after:[background-image:var(--white-gradient),var(--aurora)]",
          "after:[background-size:200%,_100%]",
          "after:animate-aurora",
          "after:bg-fixed",
          "after:mix-blend-difference",
          // Layout
          "absolute inset-0 w-full h-full",
        ].join(" ")}
        style={{
          "--aurora-white": "white",
          "--aurora-blue500": "rgb(59,130,246)",
          "--aurora-indigo300": "rgb(165,180,252)",
          "--aurora-blue300": "rgb(147,197,253)",
          "--aurora-violet200": "rgb(221,214,254)",
          "--aurora-blue400": "rgb(96,165,250)",
          maskImage: mask,
          WebkitMaskImage: mask,
        } as CSSProperties}
      />
    </div>
  );
}
