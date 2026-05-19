"use client";
import { useRef, ReactNode, useEffect } from "react";

const colorMap: Record<string, string> = {
  blue:   "59, 111, 245",
  purple: "124, 58, 237",
  cyan:   "14, 165, 233",
  violet: "139, 92, 246",
  emerald:"16, 185, 129",
};

/* ── SpotlightCard — full card wrapper ─────────────────────────────── */
interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: keyof typeof colorMap;
  style?: React.CSSProperties;
}

export default function SpotlightCard({ children, className = "", glowColor = "blue", style }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rgb = colorMap[glowColor] ?? colorMap.blue;

  const track = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={track}
      onMouseEnter={(e) => { track(e); ref.current?.style.setProperty("--op", "1"); }}
      onMouseLeave={() => ref.current?.style.setProperty("--op", "0")}
      className={`relative overflow-hidden ${className}`}
      style={{ "--mx": "50%", "--my": "50%", "--op": "0", "--rgb": rgb, ...style } as React.CSSProperties}
    >
      {/* Gradient covers full card */}
      <div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{ opacity: "var(--op)", background: `radial-gradient(200px circle at var(--mx) var(--my), rgba(var(--rgb),0.7), transparent 65%)` }} />
      {/* Punch-out: covers the interior, exposing only the border ring */}
      <div className="pointer-events-none absolute inset-[1.5px] z-[1] rounded-[inherit] bg-white" />
      {/* Children above everything */}
      <div className="relative z-[2]">
        {children}
      </div>
    </div>
  );
}

/* ── useSpotlight — hook to add effect to existing cards ────────────── */
export function useSpotlight(rgb = "59, 111, 245") {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--op", "0");
    el.style.setProperty("--rgb", rgb);

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const enter = (e: MouseEvent) => { move(e); el.style.setProperty("--op", "1"); };
    const leave = () => el.style.setProperty("--op", "0");

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [rgb]);

  // Overlay JSX to insert inside the card
  const overlay = (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{ opacity: "var(--op)", background: `radial-gradient(200px circle at var(--mx) var(--my), rgba(var(--rgb),0.7), transparent 65%)` }} />
      <div className="pointer-events-none absolute inset-[1.5px] z-[1] rounded-[inherit] bg-white" />
    </>
  );

  return { ref, overlay };
}
