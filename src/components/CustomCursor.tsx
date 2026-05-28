"use client";

import { useEffect, useRef } from "react";

const LERP_FACTOR = 0.12;

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  life: number;        // 1→0 countdown
  alpha: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const curX = useRef(0);
  const curY = useRef(0);
  const rafId = useRef<number | null>(null);
  const isHovered = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverProgress = useRef(0);
  const particles = useRef<Particle[]>([]);
  const spawnTimer = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    if (!cursor || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 120;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const CX = SIZE / 2;

    let animFrame: number;

    // Spawn a new orbital debris particle
    const spawnParticle = (progress: number) => {
      const spawnR = 28 + Math.random() * 20 + progress * 10;
      particles.current.push({
        angle: Math.random() * Math.PI * 2,
        radius: spawnR,
        speed: 0.06 + Math.random() * 0.06,   // angular speed per frame
        size: 1 + Math.random() * 1.5,
        life: 1.0,
        alpha: 0.6 + Math.random() * 0.4,
      });
    };

    const drawBlackHole = (progress: number) => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // — Outer warp rings —
      const numRings = 4;
      for (let i = numRings; i >= 1; i--) {
        const baseR = 18 + i * 7;
        const warpR = baseR + progress * i * 5;
        const alpha = (0.05 + progress * 0.07) * (1 - i / (numRings + 1));
        ctx.beginPath();
        ctx.arc(CX, CX, warpR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // — Accretion disk —
      const diskR = 22 + progress * 8;
      const diskGrad = ctx.createRadialGradient(CX, CX, diskR - 6, CX, CX, diskR + 4);
      diskGrad.addColorStop(0, `rgba(255,255,255,${0.55 + progress * 0.3})`);
      diskGrad.addColorStop(0.5, `rgba(200,200,200,${0.25 + progress * 0.15})`);
      diskGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(CX, CX, diskR, 0, Math.PI * 2);
      ctx.strokeStyle = diskGrad;
      ctx.lineWidth = 2 + progress * 3;
      ctx.stroke();

      // — Spiraling orbital debris particles (swallow animation) —
      spawnTimer.current++;
      const spawnRate = Math.floor(3 - progress * 1.5); // faster spawn on hover
      if (progress > 0.05 && spawnTimer.current % Math.max(1, spawnRate) === 0) {
        spawnParticle(progress);
      }

      const coreR = 12 + progress * 2;

      particles.current = particles.current.filter((p) => {
        // Tighten orbit — spiral inward as life decreases
        const inwardPull = 0.12 + progress * 0.35;
        p.radius -= inwardPull;
        p.angle += p.speed * (1 + (1 - p.radius / 48) * 2.5); // accelerate as it spirals in
        p.life -= 0.018 + progress * 0.015;

        if (p.radius <= coreR || p.life <= 0) return false;

        const px = CX + Math.cos(p.angle) * p.radius;
        const py = CX + Math.sin(p.angle) * p.radius;
        const fade = Math.min(1, p.life * 2) * p.alpha * Math.min(1, (p.radius - coreR) / 6);

        ctx.beginPath();
        ctx.arc(px, py, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${fade})`;
        ctx.fill();

        return true;
      });

      // — Event horizon (dead black core) —
      const coreGrad = ctx.createRadialGradient(CX, CX, 0, CX, CX, coreR + 2);
      coreGrad.addColorStop(0, "rgba(0,0,0,1)");
      coreGrad.addColorStop(0.7, "rgba(0,0,0,1)");
      coreGrad.addColorStop(1, "rgba(0,0,0,0.8)");
      ctx.beginPath();
      ctx.arc(CX, CX, coreR, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // — Photon ring —
      ctx.beginPath();
      ctx.arc(CX, CX, coreR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.65 + progress * 0.3})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const animateRing = () => {
      curX.current += (mouseX.current - curX.current) * LERP_FACTOR;
      curY.current += (mouseY.current - curY.current) * LERP_FACTOR;

      const targetProgress = isHovered.current ? 1 : 0;
      hoverProgress.current += (targetProgress - hoverProgress.current) * 0.08;

      // Wipe particles when returning to idle
      if (!isHovered.current && hoverProgress.current < 0.05) {
        particles.current = [];
      }

      const scale = 1 + hoverProgress.current * 0.5;
      cursor.style.transform = `translate(${curX.current - 60}px, ${curY.current - 60}px) scale(${scale})`;

      drawBlackHole(hoverProgress.current);

      rafId.current = requestAnimationFrame(animateRing);
    };

    const updateMouse = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const handleMouseEnter = () => { isHovered.current = true; };
    const handleMouseLeave = () => { isHovered.current = false; };

    window.addEventListener("mousemove", updateMouse);

    const attachHover = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    attachHover();

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    animateRing();

    return () => {
      window.removeEventListener("mousemove", updateMouse);
      observer.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[120px] h-[120px] pointer-events-none z-[9999]"
      style={{ transform: "translate(-200px, -200px)", willChange: "transform" }}
    >
      <canvas
        ref={canvasRef}
        width={120}
        height={120}
        className="w-full h-full"
      />
    </div>
  );
}