import { CSSProperties, ReactNode } from "react";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: ReactNode;
  repeat?: number;
  duration?: string;
  gap?: string;
}

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  repeat = 4,
  duration = "40s",
  gap = "2rem",
}: MarqueeProps) {
  return (
    <div
      className={`group flex overflow-hidden ${className}`}
      style={{ "--duration": duration, "--gap": gap, gap } as CSSProperties}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={[
              "flex shrink-0 justify-around",
              "animate-marquee",
              pauseOnHover ? "group-hover:[animation-play-state:paused]" : "",
              reverse ? "[animation-direction:reverse]" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ gap }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
