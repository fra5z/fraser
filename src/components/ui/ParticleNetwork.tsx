"use client";
import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 72;
const MAX_DIST = 130;
const MOUSE_RADIUS = 100;
const BASE_SPEED = 0.35;

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
}

function make(W: number, H: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const spd = BASE_SPEED * (0.5 + Math.random() * 0.5);
  return { x: Math.random() * W, y: Math.random() * H, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd };
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    resize();

    let particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => make(W, H));

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener("resize", () => { resize(); particles = Array.from({ length: PARTICLE_COUNT }, () => make(W, H)); });
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const frame = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);

      const { x: mx, y: my } = mouseRef.current;

      // Update positions
      for (const p of particles) {
        // Gentle mouse repulsion
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.8;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 2.0) { p.vx = (p.vx / spd) * 2.0; p.vy = (p.vy / spd) * 2.0; }

        // Damp back to base speed
        p.vx *= 0.99; p.vy *= 0.99;

        p.x += p.vx; p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.18;
            ctx.strokeStyle = `rgba(59,111,245,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of particles) {
        const dx = p.x - mx, dy = p.y - my;
        const near = Math.sqrt(dx * dx + dy * dy) < MOUSE_RADIUS * 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? 2.5 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = near ? "rgba(124,58,237,0.7)" : "rgba(59,111,245,0.45)";
        ctx.fill();
      }

      animId = requestAnimationFrame(frame);
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
