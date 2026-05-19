"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: "primary" | "secondary";
}

export default function LiquidGlassButton({
  children,
  onClick,
  href,
  className = "",
  style = {},
  variant = "secondary",
}: LiquidGlassButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyle: React.CSSProperties =
    variant === "primary"
      ? {
          background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
          boxShadow: "0 4px 24px rgba(59,111,245,0.35), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          ...style,
        }
      : {
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.04)",
          ...style,
        };

  const sharedClassName = `relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm overflow-hidden cursor-pointer select-none active:scale-95 ${className}`;

  const innerContent = (
    <>
      {/* Glass highlight */}
      <span
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 60%)",
          zIndex: 1,
        }}
      />
      {/* Content */}
      <motion.span
        style={{ x: springX, y: springY }}
        className="relative z-10 flex items-center gap-2"
      >
        {children}
      </motion.span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedClassName}
        style={baseStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.03, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={sharedClassName}
      style={baseStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {innerContent}
    </motion.button>
  );
}
