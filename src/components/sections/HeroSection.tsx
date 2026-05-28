"use client";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { TextScramble } from "@/components/ui/text-scramble";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 144;

// Build the URL list once — no computation on every render
const FRAME_URLS = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/frames/frame_${String(i + 1).padStart(3, "0")}.webp`
);

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const framesRef = useRef<ImageBitmap[]>([]);
  const rafPendingRef = useRef(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // ─── Phase 1: Parallel WebP fetch & decode ───────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Size canvas immediately so first frame draws correctly
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(framesRef.current[0]);
    };
    window.addEventListener("resize", handleResize);

    let loaded = 0;
    let cancelled = false;

    const drawFrame = (frame: ImageBitmap | undefined) => {
      if (!frame) return;
      const scale = Math.max(canvas.width / frame.width, canvas.height / frame.height);
      const x = (canvas.width - frame.width * scale) / 2;
      const y = (canvas.height - frame.height * scale) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(frame, x, y, frame.width * scale, frame.height * scale);
    };

    // Fetch all frames in parallel — the browser handles concurrency limits
    const promises = FRAME_URLS.map((url, i) =>
      fetch(url)
        .then((r) => r.blob())
        .then((blob) => createImageBitmap(blob))
        .then((bitmap) => {
          if (cancelled) return;
          framesRef.current[i] = bitmap;
          loaded++;
          setLoadProgress((loaded / TOTAL_FRAMES) * 100);
          // Show frame 0 the instant it arrives
          if (i === 0 && loaded === 1) drawFrame(bitmap);
        })
    );

    Promise.all(promises).then(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      framesRef.current.forEach((f) => f?.close());
    };
  }, []);

  // ─── Phase 2: Wire ScrollTrigger once frames are ready ───────────────────
  useEffect(() => {
    if (isLoading) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const container = containerRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const scrollContent = scrollContentRef.current;

    if (!canvas || !ctx || !container || !leftPanel || !rightPanel || !scrollContent) return;

    const renderFrame = (index: number) => {
      const frame = framesRef.current[Math.max(0, Math.min(index, TOTAL_FRAMES - 1))];
      if (!frame) { rafPendingRef.current = false; return; }
      const scale = Math.max(canvas.width / frame.width, canvas.height / frame.height);
      const x = (canvas.width - frame.width * scale) / 2;
      const y = (canvas.height - frame.height * scale) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(frame, x, y, frame.width * scale, frame.height * scale);
      rafPendingRef.current = false;
    };

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const targetFrame = Math.round(progress * (TOTAL_FRAMES - 1));

        if (!rafPendingRef.current) {
          rafPendingRef.current = true;
          requestAnimationFrame(() => renderFrame(targetFrame));
        }

        leftPanel.style.opacity = "1";
        leftPanel.style.transform = `translateY(${progress * -20}px)`;

        rightPanel.style.opacity = "1";
        rightPanel.style.transform = `translateY(${progress * 20}px)`;

        // Fade background video frames (canvas) rather than the buttons and text
        canvas.style.opacity = String(Math.max(0, 1 - progress * 1.5));

        const scrollFade = Math.min(1, (progress - 0.3) / 0.3);
        scrollContent.style.opacity = String(Math.max(0, scrollFade));
        scrollContent.style.transform = `translateY(${(1 - Math.max(0, scrollFade)) * 50}px)`;
      },
      onEnterBack: () => {
        if (!rafPendingRef.current) {
          rafPendingRef.current = true;
          requestAnimationFrame(() => renderFrame(0));
        }
      },
    });

    return () => { scrollTriggerRef.current?.kill(); };
  }, [isLoading]);

  const roles = ["AI/ML Engineer", "LLM Systems Builder", "Full-Stack Developer", "Inference Pipeline Dev"];

  return (
    <section ref={containerRef} className="relative h-screen bg-background hero-vignette">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {isLoading && (
        <div className="absolute inset-0 bg-background flex items-center justify-center z-20">
          <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-foreground transition-all duration-150"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="absolute inset-0 flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between px-6 sm:px-12 md:px-20 lg:px-32 gap-6 md:gap-0 pt-24 pb-12 md:py-0 overflow-y-auto md:overflow-hidden">

        {/* LEFT — identity + CTA */}
        <div ref={leftPanelRef} className="w-full md:w-1/2 space-y-4 flex flex-col items-start justify-center">

          {/* Name */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-bold text-foreground leading-[1.05] tracking-tight">
            <TextScramble text="Rajeev Nandan" />
          </h1>

          {/* Primary title */}
          <p className="text-xl sm:text-2xl font-semibold text-foreground/75 tracking-tight">
            AI &amp; Full-Stack Engineer
          </p>

          {/* Credential strip */}
          <p className="font-mono text-xs text-muted-foreground tracking-wide leading-relaxed">
            Generative AI Intern&nbsp;@&nbsp;IIT&nbsp;Kanpur&nbsp;&nbsp;·&nbsp;&nbsp;3× Hugging Face deployments&nbsp;&nbsp;·&nbsp;&nbsp;GPA&nbsp;9.24
          </p>

          {/* Intent */}
          <p className="text-sm text-muted-foreground/55 leading-relaxed max-w-xs">
            Looking for roles in AI/ML Engineering or Full-Stack Development
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="/Rajeev_Nandan_Damarla_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity"
              data-cursor-hover="true"
            >
              Download Resume
            </a>
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/30 text-foreground text-sm font-semibold hover:border-foreground/60 transition-colors"
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
          <div className="text-left md:text-right space-y-4 w-full">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[11px] font-medium tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to opportunities
            </div>

            {/* Role cycler — one step below name size */}
            <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight min-h-[2.5rem] md:min-h-[3.5rem]">
              <RoleCycler roles={roles} />
            </div>

            <p className="text-[11px] text-muted-foreground/45 font-mono tracking-widest uppercase">
              B.Tech CSE&nbsp;·&nbsp;GITAM University, Visakhapatnam
            </p>
          </div>
        </div>
      </div>

      <div
        ref={scrollContentRef}
        className="absolute inset-0 flex items-center justify-start px-6 md:px-20 lg:px-32 opacity-0 pointer-events-none"
      >
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 max-w-xl">
          <h3 className="text-foreground text-2xl md:text-3xl font-bold mb-4">
            AI Engineering with Product & Deployment Impact
          </h3>
          <ul className="space-y-3 text-white/70 text-sm md:text-base mb-6 leading-relaxed list-disc list-inside">
            <li>Delivered 3+ production Hugging Face deployments with real user-facing value.</li>
            <li>Built scalable Next.js + TypeScript full-stack systems for modern AI experiences.</li>
            <li>Optimized ML inference and backend workflows to improve performance and reliability.</li>
          </ul>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-white/50 text-sm">
            <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse" />
            <span>Scroll to review high-impact AI projects, architecture, and execution details.</span>
          </div>
        </div>
      </div>

      {/* Seamless bottom gradient — dissolves hero video into spacetime grid */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: "45%",
          background: "linear-gradient(to bottom, rgba(12,12,12,0) 0%, rgba(12,12,12,0.4) 30%, rgba(12,12,12,0.75) 60%, rgba(12,12,12,0.95) 85%, rgba(12,12,12,1) 100%)",
        }}
      />
    </section>
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
      className="relative h-12 sm:h-16 md:h-24 lg:h-28 flex items-center justify-start md:justify-end"
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
