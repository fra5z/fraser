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
    const INTERVAL = 1000 / 30; // 30 fps cap — light on CPU

    const SPACING = 36;
    const DOT_RADIUS = 1.3;
    const MAX_OPACITY = 0.13;
    const WAVE_SPEED = 0.45;
    const WAVE_FREQ = 0.011;
    const MOUSE_RADIUS = 200;
    const MOUSE_BOOST = 0.18;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
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

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = ox + c * SPACING;
          const y = oy + r * SPACING;

          // Ripple wave radiating from centre
          const dc = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          const wave = Math.sin(dc * WAVE_FREQ - t * WAVE_SPEED) * 0.5 + 0.5;

          // Mouse proximity spotlight
          const dm = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
          const boost = Math.max(0, 1 - dm / MOUSE_RADIUS) * MOUSE_BOOST;

          const alpha = Math.min(0.22, wave * MAX_OPACITY + boost);
          if (alpha < 0.005) continue;

          ctx.globalAlpha = alpha;
          ctx.fillStyle = "rgb(59,111,245)";
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
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: -9 }}
    />
  );
}
