"use client";
import type { CSSProperties } from "react";

interface Props {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderRadius?: string;
}

export default function BorderBeam({
  size = 220,
  duration = 10,
  delay = 0,
  colorFrom = "#3b6ff5",
  colorTo = "#a855f7",
  borderRadius = "1rem",
}: Props) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
    >
      <div
        style={{
          position: "absolute",
          width: `${size}px`,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
          filter: "blur(3px)",
          offsetPath: `inset(0 round ${borderRadius})`,
          animation: `border-beam ${duration}s ${delay > 0 ? `-${delay}s` : "0s"} linear infinite`,
        } as CSSProperties}
      />
    </div>
  );
}
