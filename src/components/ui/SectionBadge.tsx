"use client";
import type { CSSProperties } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function SectionBadge({ children, className = "" }: Props) {
  return (
    <span
      className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(white, white), linear-gradient(90deg, #3b6ff5, #7c3aed, #0ea5e9, #3b6ff5)",
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        backgroundSize: "100% 100%, 300% 100%",
        border: "1px solid transparent",
        animation: "gradient-shift 5s linear infinite",
        color: "#3b6ff5",
      } as CSSProperties}
    >
      {children}
    </span>
  );
}
