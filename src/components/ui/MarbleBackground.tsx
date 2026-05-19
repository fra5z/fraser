"use client";
import { useEffect, useRef } from "react";

// Smooth trig-based vector field — produces organic marble/contour curves
const fieldAngle = (x: number, y: number, t: number): number =>
  Math.sin(x * 0.0028 + t * 0.055) * 2.4
  + Math.cos(y * 0.0032 + x * 0.0013 - t * 0.040) * 1.9
  + Math.sin((x + y) * 0.0019 + t * 0.030) * 1.2;

const SPACING  = 18;  // seed grid spacing (px)
const STEPS    = 18;  // steps per streamline
const STEP_LEN = 4.5; // px per step

export default function MarbleBackground() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const offRef     = useRef<HTMLCanvasElement | null>(null);
  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const tRef       = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Offscreen canvas for the lines — updated at ~8 fps to keep main thread light
    const off = document.createElement("canvas");
    offRef.current = off;
    const offCtx = off.getContext("2d")!;

    let animId: number;
    let lastMain = 0;
    let lastOff  = 0;
    const MAIN_INTERVAL = 1000 / 30;
    const OFF_INTERVAL  = 1000 / 8;

    const resize = () => {
      const W = window.innerWidth, H = window.innerHeight;
      canvas.width  = W; canvas.height  = H;
      off.width     = W; off.height     = H;
    };
    resize();

    const onMove  = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    // Render all flow-field streamlines to the offscreen canvas
    const renderLines = () => {
      const W = off.width, H = off.height;
      const t = tRef.current;

      offCtx.fillStyle = "#ffffff";
      offCtx.fillRect(0, 0, W, H);

      offCtx.beginPath();
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          let x = c * SPACING, y = r * SPACING;
          offCtx.moveTo(x, y);
          for (let s = 0; s < STEPS; s++) {
            const a = fieldAngle(x, y, t);
            x += Math.cos(a) * STEP_LEN;
            y += Math.sin(a) * STEP_LEN;
            if (x < -20 || x > W + 20 || y < -20 || y > H + 20) break;
            offCtx.lineTo(x, y);
          }
        }
      }
      offCtx.strokeStyle = "rgba(0,0,0,0.065)";
      offCtx.lineWidth   = 0.75;
      offCtx.stroke();
    };

    // Initial render
    renderLines();

    const frame = (time: number) => {
      animId = requestAnimationFrame(frame);

      // Slowly evolve the field
      if (time - lastOff > OFF_INTERVAL) {
        lastOff = time;
        tRef.current += 0.12;
        renderLines();
      }

      if (time - lastMain < MAIN_INTERVAL) return;
      lastMain = time;

      const W = canvas.width, H = canvas.height;

      // Copy pre-rendered lines
      ctx.drawImage(off, 0, 0);

      // Purple glow under the cursor
      const { x: mx, y: my } = mouseRef.current;
      if (mx > -1000) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
        grd.addColorStop(0,   "rgba(139,92,246,0.22)");
        grd.addColorStop(0.35,"rgba(109,40,217, 0.12)");
        grd.addColorStop(1,   "rgba(139,92,246,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      }
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
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
