"use client";
import { CSSProperties, ReactNode, HTMLAttributes } from "react";

type AnimationMode = "auto-rotate" | "rotate-on-hover" | "stop-rotate-on-hover";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  children: ReactNode;
  className?: string;
  animationMode?: AnimationMode;
  animationSpeed?: number;
  gradientColors?: { primary: string; secondary: string; accent: string };
  backgroundColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  style?: CSSProperties;
}

const defaultPurple = {
  primary: "#3b1f6e",
  secondary: "#7c3aed",
  accent: "#c4b5fd",
};

export default function AnimatedGradientBorder({
  children,
  className = "",
  animationMode = "auto-rotate",
  animationSpeed = 4,
  gradientColors = defaultPurple,
  backgroundColor = "#ffffff",
  borderWidth = 2,
  borderRadius = 16,
  style = {},
  ...props
}: Props) {
  const animClass =
    animationMode === "auto-rotate" ? "agb-auto" :
    animationMode === "rotate-on-hover" ? "agb-hover" :
    "agb-stop-hover";

  const combined: CSSProperties = {
    "--agb-speed": `${animationSpeed}s`,
    border: `${borderWidth}px solid transparent`,
    borderRadius: `${borderRadius}px`,
    backgroundImage: `
      linear-gradient(${backgroundColor}, ${backgroundColor}),
      conic-gradient(
        from var(--agb-angle, 0deg),
        ${gradientColors.primary} 0%,
        ${gradientColors.secondary} 30%,
        ${gradientColors.accent} 50%,
        ${gradientColors.secondary} 70%,
        ${gradientColors.primary} 100%
      )
    `,
    backgroundClip: "padding-box, border-box",
    backgroundOrigin: "padding-box, border-box",
    ...style,
  } as CSSProperties;

  return (
    <div className={`${animClass} ${className}`} style={combined} {...props}>
      {children}
    </div>
  );
}
