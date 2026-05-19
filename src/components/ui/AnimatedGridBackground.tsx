"use client";
import { useEffect, useRef } from "react";

export default function AnimatedGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = 0;
    const INTERVAL = 1000 / 30;

    const SPACING = 38;
    const DOT_RADIUS = 1.5;
    const WAVE_SPEED = 0.4;
    const WAVE_FREQ = 0.010;
    const MOUSE_RADIUS = 220;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const frame = (time: number) => {
      animId = requestAnimationFrame(frame);
      if (time - lastTime < INTERVAL) return;
      lastTime = time;

      const W = window.innerWidth;
      const H = window.innerHeight;

      // White canvas
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const { x: mx, y: my } = mouseRef.current;
      const t = tRef.current;

      const cols = Math.ceil(W / SPACING) + 2;
      const rows = Math.ceil(H / SPACING) + 2;
      const ox = (W % SPACING) / 2;
      const oy = (H % SPACING) / 2;

      ctx.fillStyle = "rgb(59,111,245)";

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = ox + c * SPACING;
          const y = oy + r * SPACING;

          // Wave ripple from centre
          const dc = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          const wave = Math.sin(dc * WAVE_FREQ - t * WAVE_SPEED) * 0.5 + 0.5;

          // Mouse spotlight
          const dm = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
          const boost = Math.max(0, 1 - dm / MOUSE_RADIUS) * 0.30;

          // Base range: 0.05 → 0.22, plus mouse boost up to 0.30
          const alpha = Math.min(0.45, wave * 0.17 + 0.05 + boost);

          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      tRef.current += 0.016;
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
