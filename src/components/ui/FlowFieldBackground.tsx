"use client";
import { useEffect, useRef } from "react";

interface Props {
  color?: string;
  trailOpacity?: number;
  particleCount?: number;
  speed?: number;
  className?: string;
}

export default function FlowFieldBackground({
  color = "rgba(59,111,245,0.28)",
  trailOpacity = 0.18,
  particleCount = 350,
  speed = 1,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let particles: Particle[] = [];
    let animId: number;
    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x = Math.random() * width;
      y = Math.random() * height;
      vx = 0;
      vy = 0;
      age = 0;
      life = Math.random() * 200 + 100;

      update() {
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
        this.vx += Math.cos(angle) * 0.2 * speed;
        this.vy += Math.sin(angle) * 0.2 * speed;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.vx -= dx * force * 0.05;
          this.vy -= dy * force * 0.05;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.age++;
        if (this.age > this.life) this.reset();
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
      }

      draw(c: CanvasRenderingContext2D) {
        const alpha = 1 - Math.abs(this.age / this.life - 0.5) * 2;
        c.globalAlpha = alpha;
        c.fillStyle = color;
        c.fillRect(this.x, this.y, 1.5, 1.5);
      }
    }

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // White canvas base
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    const animate = () => {
      // White trail fade (keeps background white)
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(255,255,255,${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);
      particles.forEach((p) => { p.update(); p.draw(ctx); });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };

    const onResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      init();
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -1000; mouse.y = -1000; };

    init();
    animate();
    window.addEventListener("resize", onResize);
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(animId);
    };
  }, [color, trailOpacity, particleCount, speed]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
