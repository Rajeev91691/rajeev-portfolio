import React, { useEffect, useRef } from 'react';

interface Particle {
  ox: number; oy: number;
  cx: number; cy: number;
  cr: number;
  f: number;
  rgb: number[];
}

export interface ParticleTextEffectProps {
  text?: string;
  colors?: string[];
  className?: string;
  animationForce?: number;
  particleDensity?: number;
  maxParticles?: number;
}

const ParticleTextEffect: React.FC<ParticleTextEffectProps> = ({
  text = 'HOVER!',
  colors = ['ffad70', 'f7d297', 'edb9a1', 'e697ac', 'b38dca', '9c76db', '705cb5', '43428e', '2c2142'],
  className = '',
  animationForce = 80,
  particleDensity = 4,
  maxParticles = 2500,
}) => {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const ctxRef      = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef      = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef  = useRef<{ x?: number; y?: number }>({});
  const activeRef   = useRef(false); // is cursor inside?
  const radiusRef   = useRef(100);

  const textRef     = useRef(text);
  const colorsRef   = useRef(colors);
  const forceRef    = useRef(animationForce);
  const densityRef  = useRef(particleDensity);
  const maxRef      = useRef(maxParticles);

  useEffect(() => { textRef.current    = text; },          [text]);
  useEffect(() => { colorsRef.current  = colors; },        [colors]);
  useEffect(() => { forceRef.current   = animationForce; },[animationForce]);
  useEffect(() => { densityRef.current = particleDensity; },[particleDensity]);
  useEffect(() => { maxRef.current     = maxParticles; },  [maxParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;

    const rand = (max = 1, min = 0) => min + Math.random() * (max - min);

    // ── build ──────────────────────────────────────────────────
    const build = (w: number, h: number) => {
      stopLoop();
      canvas.width  = w;
      canvas.height = h;
      ctx.clearRect(0, 0, w, h);

      const str = textRef.current;

      // Cap font size so text never gets absurdly large
      const fontSize = Math.min(Math.floor(w / str.length), 140);
      radiusRef.current = Math.max(50, fontSize * 1.5);

      ctx.font         = `900 ${fontSize}px Verdana, sans-serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';

      const tw = Math.round(ctx.measureText(str).width);
      const tx = 0.5 * (w - tw);
      const ty = 0.5 * (h - fontSize);

      const cols = colorsRef.current;
      const grad = ctx.createLinearGradient(tx, ty, tx + tw, ty + fontSize);
      cols.forEach((c, i) => grad.addColorStop(i / (cols.length - 1), `#${c}`));
      ctx.fillStyle = grad;
      ctx.fillText(str, 0.5 * w, 0.5 * h);

      // Sample pixels, skip by density, then thin further if over cap
      const d    = densityRef.current;
      const data = ctx.getImageData(tx, ty, tw, fontSize).data;
      const candidates: Particle[] = [];

      for (let i = 0; i < data.length; i += 4) {
        if (!data[i + 3]) continue;
        const idx = i / 4;
        const lx  = idx % tw;
        const ly  = Math.floor(idx / tw);
        if (lx % d || ly % d) continue;
        candidates.push({
          ox: tx + lx, oy: ty + ly,
          cx: tx + lx, cy: ty + ly,
          cr: rand(4, 1),
          f:  rand(forceRef.current + 15, forceRef.current - 15),
          rgb: [data[i], data[i + 1], data[i + 2]].map(
            c => Math.max(0, Math.min(255, c + rand(13, -13)))
          ),
        });
      }

      // Hard cap — thin evenly if too many
      const cap = maxRef.current;
      if (candidates.length > cap) {
        const step = candidates.length / cap;
        particlesRef.current = Array.from({ length: cap }, (_, k) =>
          candidates[Math.floor(k * step)]
        );
      } else {
        particlesRef.current = candidates;
      }

      ctx.clearRect(0, 0, w, h);
      drawAll();
    };

    // ── draw ───────────────────────────────────────────────────
    const drawParticle = (p: Particle) => {
      ctx.fillStyle = `rgb(${p.rgb.join(',')})`;
      ctx.beginPath();
      ctx.arc(p.cx, p.cy, p.cr, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawAll = () => particlesRef.current.forEach(drawParticle);

    // ── animation loop — runs ONLY while something moves ──────
    let idle = 0; // consecutive frames with no movement

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let moving = false;
      const { x: px, y: py } = pointerRef.current;
      const r = radiusRef.current;

      for (const p of particlesRef.current) {
        // Repulsion
        if (activeRef.current && px !== undefined && py !== undefined) {
          const dx = p.cx - px, dy = p.cy - py;
          const dist = Math.hypot(dx, dy);
          if (dist < r && dist > 0) {
            const force = Math.min(p.f, ((r - dist) / dist) * 2);
            p.cx += (dx / dist) * force;
            p.cy += (dy / dist) * force;
            moving = true;
          }
        }
        // Restore
        const odx = p.ox - p.cx, ody = p.oy - p.cy;
        const od  = Math.hypot(odx, ody);
        if (od > 0.5) {
          const restore = Math.min(od * 0.1, 3);
          p.cx += (odx / od) * restore;
          p.cy += (ody / od) * restore;
          moving = true;
        }
        drawParticle(p);
      }

      // Stop loop after 60 idle frames (~1 s) — zero CPU at rest
      if (moving) {
        idle = 0;
      } else {
        idle++;
      }

      if (idle < 60) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = null;
      }
    };

    const startLoop = () => {
      idle = 0;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    };

    // ── ResizeObserver ─────────────────────────────────────────
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const { width, height } = e.contentRect;
        if (width > 0 && height > 0) build(Math.round(width), Math.round(height));
      }
    });
    ro.observe(canvas);

    // ── pointer events ─────────────────────────────────────────
    const onMove = (e: PointerEvent) => {
      const rect   = canvas.getBoundingClientRect();
      const scaleX = canvas.width  / rect.width;
      const scaleY = canvas.height / rect.height;
      pointerRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top)  * scaleY,
      };
      startLoop();
    };

    const onEnter = () => { activeRef.current = true; };
    const onLeave = () => {
      activeRef.current   = false;
      pointerRef.current  = {};
      startLoop(); // let particles drift back
    };

    canvas.addEventListener('pointermove',  onMove);
    canvas.addEventListener('pointerenter', onEnter);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      ro.disconnect();
      stopLoop();
      canvas.removeEventListener('pointermove',  onMove);
      canvas.removeEventListener('pointerenter', onEnter);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className} cursor-none`}
      style={{ willChange: 'transform' }}
    />
  );
};

export { ParticleTextEffect };
