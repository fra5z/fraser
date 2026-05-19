"use client";
import { useEffect, useRef } from "react";

// Each blob drifts in a slow oval path around its centre point
const BLOBS = [
  { color: [59,  111, 245], r: 560, cx: 0.78, cy: 0.18, rx: 0.14, ry: 0.11, spd: 0.22, px: 0.0, py: 0.8, opacity: 0.20 },
  { color: [124,  58, 237], r: 500, cx: 0.22, cy: 0.55, rx: 0.11, ry: 0.14, spd: 0.16, px: 2.1, py: 1.4, opacity: 0.18 },
  { color: [ 14, 165, 233], r: 460, cx: 0.60, cy: 0.82, rx: 0.16, ry: 0.09, spd: 0.28, px: 4.0, py: 3.2, opacity: 0.16 },
  { color: [139,  92, 246], r: 420, cx: 0.82, cy: 0.52, rx: 0.09, ry: 0.13, spd: 0.19, px: 1.2, py: 5.0, opacity: 0.14 },
  { color: [ 59, 111, 245], r: 400, cx: 0.18, cy: 0.22, rx: 0.13, ry: 0.09, spd: 0.13, px: 3.3, py: 2.6, opacity: 0.13 },
];

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      // White base
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);

      for (const b of BLOBS) {
        const x = (b.cx + Math.sin(t * b.spd + b.px) * b.rx) * W;
        const y = (b.cy + Math.cos(t * b.spd * 0.71 + b.py) * b.ry) * H;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        grad.addColorStop(0,   `rgba(${b.color},${b.opacity})`);
        grad.addColorStop(0.4, `rgba(${b.color},${b.opacity * 0.5})`);
        grad.addColorStop(1,   `rgba(${b.color},0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      t += 0.004; // very slow drift — full cycle ~25 s
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
