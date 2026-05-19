"use client";
import { useEffect, useRef } from "react";

// Three layered wave fills — drawn back-to-front so they overlap naturally
const LAYERS = [
  { yRatio: 0.62, amp: 0.055, freq: 0.0022, spd: 0.25, phase: 0.0, col: "14,165,233",  alpha: 0.06 },
  { yRatio: 0.52, amp: 0.065, freq: 0.0018, spd: 0.18, phase: 2.4, col: "124,58,237",  alpha: 0.07 },
  { yRatio: 0.42, amp: 0.070, freq: 0.0020, spd: 0.22, phase: 4.8, col: "59,111,245",  alpha: 0.08 },
];

export default function WaveBackground() {
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

    const drawLayer = (W: number, H: number, l: typeof LAYERS[0]) => {
      const baseY = l.yRatio * H;
      const amp   = l.amp * H;

      ctx.beginPath();
      ctx.moveTo(0, H);

      for (let x = 0; x <= W + 4; x += 4) {
        const y = baseY
          + Math.sin(x * l.freq + t * l.spd + l.phase) * amp
          + Math.sin(x * l.freq * 1.6 + t * l.spd * 0.7 + l.phase + 1) * amp * 0.35;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(W, H);
      ctx.closePath();

      // Gradient: colour wash at wave crest → fades white toward bottom
      const grad = ctx.createLinearGradient(0, baseY - amp, 0, H);
      grad.addColorStop(0, `rgba(${l.col},${l.alpha})`);
      grad.addColorStop(1, `rgba(${l.col},0)`);
      ctx.fillStyle = grad;
      ctx.fill();
    };

    const frame = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);

      for (const layer of LAYERS) drawLayer(W, H, layer);

      t += 0.006;
      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);

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
