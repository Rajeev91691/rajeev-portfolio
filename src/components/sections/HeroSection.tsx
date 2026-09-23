"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { TextScramble } from "@/components/ui/text-scramble";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 144;

const FRAME_URLS = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/frames/frame_${String(i + 1).padStart(3, "0")}.webp`
);

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const framesRef = useRef<ImageBitmap[]>([]);
  const rafPendingRef = useRef(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // ─── Phase 1: Progressive WebP fetch & decode ───────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const setCanvasDimensions = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    setCanvasDimensions();

    const drawFrame = (frame: ImageBitmap | undefined) => {
      if (!frame) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cW = canvas.width;
      const cH = canvas.height;
      const scale = Math.max(cW / frame.width, cH / frame.height);
      const x = (cW - frame.width * scale) / 2;
      const y = (cH - frame.height * scale) / 2;
      ctx.clearRect(0, 0, cW, cH);
      ctx.drawImage(frame, x, y, frame.width * scale, frame.height * scale);
    };

    const handleResize = () => {
      setCanvasDimensions();
      drawFrame(framesRef.current[0]);
    };
    window.addEventListener("resize", handleResize);

    let loadedCount = 0;
    let cancelled = false;

    const loadFrame = async (i: number) => {
      try {
        const response = await fetch(FRAME_URLS[i]);
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);
        const blob = await response.blob();
        const bitmap = await createImageBitmap(blob);
        if (cancelled) {
          bitmap.close();
          return;
        }
        framesRef.current[i] = bitmap;
        loadedCount++;
        setLoadProgress((loadedCount / TOTAL_FRAMES) * 100);
        if (i === 0) drawFrame(bitmap);
      } catch (err) {
        console.error(`Failed to load frame ${i}`, err);
      }
    };

    const criticalIndices = Array.from({ length: 15 }, (_, i) => i);
    const nonCriticalIndices = Array.from({ length: TOTAL_FRAMES - 15 }, (_, i) => i + 15);

    const criticalPromises = criticalIndices.map((i) => loadFrame(i));

    Promise.all(criticalPromises).then(() => {
      if (cancelled) return;
      setIsLoading(false);

      const loadRemaining = async () => {
        const batchSize = 8;
        for (let k = 0; k < nonCriticalIndices.length; k += batchSize) {
          if (cancelled) break;
          const batch = nonCriticalIndices.slice(k, k + batchSize);
          await Promise.all(batch.map((i) => loadFrame(i)));
          await new Promise((r) => setTimeout(r, 40));
        }
      };
      loadRemaining();
    });

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      framesRef.current.forEach((f) => f?.close());
    };
  }, []);

  // ─── Phase 2: Full-Page Continuous Canvas Scrubbing ───────────────────────
  useEffect(() => {
    if (isLoading) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const container = containerRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;

    if (!canvas || !ctx || !container || !leftPanel || !rightPanel) return;

    const renderFrame = (index: number) => {
      let frame = framesRef.current[Math.max(0, Math.min(index, TOTAL_FRAMES - 1))];
      
      if (!frame) {
        let dist = 1;
        while (dist < TOTAL_FRAMES) {
          const prevIdx = index - dist;
          const nextIdx = index + dist;
          if (prevIdx >= 0 && framesRef.current[prevIdx]) {
            frame = framesRef.current[prevIdx];
            break;
          }
          if (nextIdx < TOTAL_FRAMES && framesRef.current[nextIdx]) {
            frame = framesRef.current[nextIdx];
            break;
          }
          dist++;
        }
      }

      if (!frame) {
        rafPendingRef.current = false;
        return;
      }

      const cW = canvas.width;
      const cH = canvas.height;
      const scale = Math.max(cW / frame.width, cH / frame.height);
      const x = (cW - frame.width * scale) / 2;
      const y = (cH - frame.height * scale) / 2;
      ctx.clearRect(0, 0, cW, cH);
      ctx.drawImage(frame, x, y, frame.width * scale, frame.height * scale);
      rafPendingRef.current = false;
    };

    // Continuous smooth GSAP frame scrubbing synchronized with Lenis
    const frameData = { index: 0 };
    const frameTween = gsap.to(frameData, {
      index: TOTAL_FRAMES - 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      },
      onUpdate: () => {
        renderFrame(Math.round(frameData.index));
      },
    });

    // Fade hero panel text as user scrolls into About section
    const panelTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        leftPanel.style.opacity = String(Math.max(0, 1 - p * 1.8));
        leftPanel.style.transform = `translateY(${p * -50}px)`;

        rightPanel.style.opacity = String(Math.max(0, 1 - p * 1.8));
        rightPanel.style.transform = `translateY(${p * -30}px)`;
      },
    });

    return () => {
      frameTween.kill();
      panelTrigger.kill();
    };
  }, [isLoading]);

  const roles = ["AI/ML Engineer", "LLM Systems Builder", "Full-Stack Developer", "Inference Pipeline Dev"];

  return (
    <>
      {/* Fixed Background Canvas — Ambient Video Frames for Whole Web Page */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none -z-10 object-cover opacity-85"
        aria-hidden="true"
      />

      {/* Hero Content Section */}
      <section ref={containerRef} className="relative min-h-[100dvh] flex items-center justify-center bg-transparent">
        {isLoading && (
          <div className="fixed inset-0 bg-[#0C0C0C] flex items-center justify-center z-50">
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-150"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="max-w-[min(92vw,1440px)] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between px-[clamp(1rem,3vw,2.5rem)] gap-8 md:gap-6 pt-24 pb-12 md:py-0">

          {/* LEFT — identity + CTA */}
          <div ref={leftPanelRef} className="w-full md:w-1/2 space-y-[clamp(0.75rem,1.5vw,1.25rem)] flex flex-col items-start justify-center">

            {/* Name with Fluid Clamp Typography */}
            <h1 className="font-display text-[clamp(1.75rem,3.8vw+0.5rem,3.4rem)] font-bold text-foreground leading-[1.08] tracking-tight whitespace-nowrap">
              <TextScramble text="Rajeev&nbsp;Nandan" />
            </h1>

            {/* Primary title */}
            <p className="text-[clamp(1.1rem,2vw,1.5rem)] font-semibold text-foreground/85 tracking-tight">
              AI &amp; Full-Stack Engineer
            </p>

            {/* Credential strip */}
            <p className="font-mono text-[clamp(0.68rem,0.9vw,0.8rem)] text-muted-foreground tracking-wide leading-relaxed">
              Generative AI Intern&nbsp;@&nbsp;IIT&nbsp;Kanpur&nbsp;&nbsp;·&nbsp;&nbsp;Open Source Dev&nbsp;&nbsp;·&nbsp;&nbsp;GPA&nbsp;9.24
            </p>

            {/* Intent */}
            <p className="text-[clamp(0.8rem,1vw,0.92rem)] text-muted-foreground/75 leading-relaxed max-w-sm">
              Building intelligent, production-ready AI applications and high-throughput web systems.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="/Rajeev_Nandan_Damarla_Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-xs sm:text-sm font-semibold hover:opacity-85 transition-opacity shadow-lg"
                data-cursor-hover="true"
              >
                Download Resume
              </a>
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-md text-foreground text-xs sm:text-sm font-semibold hover:border-white/50 transition-colors shadow-lg"
                data-cursor-hover="true"
              >
                View Projects
              </Link>
            </div>
          </div>

          {/* RIGHT — status + role cycler + university */}
          <div
            ref={rightPanelRef}
            className="w-full md:w-5/12 flex justify-start md:justify-end items-center"
          >
            <div className="text-left md:text-right space-y-[clamp(0.75rem,1.5vw,1.25rem)] w-full">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[11px] font-medium tracking-wide uppercase shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Open to opportunities
              </div>

              {/* Role cycler with fluid clamp */}
              <div className="font-display text-[clamp(1.4rem,2.8vw+0.2rem,2.8rem)] font-bold text-foreground leading-tight min-h-[clamp(2rem,4vw,3rem)]">
                <RoleCycler roles={roles} />
              </div>

              <p className="text-[11px] text-muted-foreground/60 font-mono tracking-widest uppercase">
                B.Tech CSE&nbsp;·&nbsp;GITAM University, Visakhapatnam
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function RoleCycler({ roles }: { roles: string[] }) {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, [roles.length]);

  return (
    <div
      className="relative h-[clamp(2.5rem,4vw,3.5rem)] flex items-center justify-start md:justify-end"
      style={{ clipPath: "polygon(-1000% 0%, 2000% 0%, 2000% 100%, -1000% 100%)" }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={currentRole}
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-60%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 md:left-auto md:right-0 top-0 bottom-0 flex items-center justify-start md:justify-end text-left md:text-right whitespace-nowrap leading-none"
        >
          {roles[currentRole]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
