"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Calendar, ExternalLink, Code2, Sparkles, Zap, Cpu, Layers, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const timelineLine = timelineLineRef.current;

    if (!section || !timeline || !timelineLine) return;

    const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node", section);

    const ctx = gsap.context(() => {
      // Grow the vertical timeline line dynamically with smooth catch-up
      gsap.fromTo(
        timelineLine,
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 65%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        }
      );

      // Activate each timeline node
      nodes.forEach((node) => {
        const parent = node.parentElement;
        if (!parent) return;

        gsap.fromTo(
          node,
          { backgroundColor: "#333" },
          {
            backgroundColor: "#FFFFFF",
            ease: "none",
            scrollTrigger: {
              trigger: parent,
              start: "top 65%",
              end: "top 64%",
              scrub: 0.5,
            },
          }
        );
      });
    }, section);

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimeout);
    };
  }, []);

  const experience = [
    {
      company: "Indian Institute of Technology, Kanpur",
      role: "Generative AI Research Intern",
      period: "June 2025 – August 2025",
      status: "Completed",
      icon: Building2,
      accentColor: "from-orange-500/20 via-orange-500/5 to-transparent",
      borderColor: "group-hover:border-orange-500/40",
      glowColor: "rgba(249, 115, 22, 0.15)",
      stats: [
        { value: "+22%", label: "Inference Speed", icon: Zap },
        { value: "-15%", label: "FID Score (Sharper)", icon: Sparkles },
        { value: "FP16", label: "Model Optimization", icon: Cpu },
      ],
      tags: ["Stable Diffusion", "PyTorch", "FP16 TensorRT", "CUDA Benchmarks"],
    },
    {
      company: "Open Source · GitHub",
      role: "Independent AI Engineer",
      period: "Jan 2025 – Present",
      status: "Active",
      icon: Code2,
      accentColor: "from-blue-500/20 via-purple-500/5 to-transparent",
      borderColor: "group-hover:border-blue-500/40",
      glowColor: "rgba(59, 130, 246, 0.15)",
      stats: [
        { value: "80K+", label: "Pages Indexed", icon: Layers },
        { value: "15 FPS", label: "Webcam Vision AI", icon: Zap },
        { value: "3+", label: "Live Web Apps", icon: Sparkles },
      ],
      tags: ["FAISS Vector Search", "DETR Vision", "Next.js", "FastAPI"],
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-[clamp(3.5rem,6vw,6.5rem)] bg-transparent relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-accent/3 blur-[160px] pointer-events-none" />

      <div className="max-w-[min(92vw,1440px)] mx-auto px-[clamp(1rem,3vw,2.5rem)] mb-[clamp(2rem,3.5vw,3.5rem)] relative z-10">
        <h2 className="font-display text-[clamp(1.75rem,3.2vw+0.2rem,2.8rem)] font-bold mb-2 bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent tracking-tight">
          Experience
        </h2>
        <p className="text-muted-foreground text-xs md:text-sm max-w-xl">
          Hands-on research benchmarks and production-ready AI applications.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-[clamp(1rem,3vw,2.5rem)] relative z-10" ref={timelineRef}>
        <div className="relative">
          {/* Timeline background vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/[0.06]">
            <div ref={timelineLineRef} className="timeline-line w-full h-0 bg-accent/50 transition-none" />
          </div>

          {/* Cards Mapping */}
          {experience.map((exp, index) => (
            <div key={index} className="group relative pl-8 md:pl-10 pb-10 md:pb-12 last:pb-0">
              
              {/* Timeline pulse node dot */}
              <div className="absolute left-[-9px] top-6 w-[20px] h-[20px] flex items-center justify-center select-none">
                <div className="timeline-node w-3 h-3 rounded-full bg-[#333] border-2 border-white/20 transition-all duration-500 relative z-10 scale-100 group-hover:scale-125 group-hover:border-accent" />
                <div className="absolute inset-0 rounded-full bg-accent/25 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Redesigned Experience Tile Card */}
              <ExperienceTile exp={exp} />
            </div>
          ))}

          {/* Certifications footer button */}
          <div className="relative pl-8 md:pl-10 pt-4">
            <a
              href="https://github.com/Rajeev91691/Certifications"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.2] text-foreground text-xs md:text-sm font-medium transition-all duration-300 backdrop-blur-md shadow-lg"
              data-cursor-hover="true"
            >
              <ExternalLink className="size-3.5 text-muted-foreground" />
              <span>Explore Verified Credentials &amp; Certifications</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

function ExperienceTile({ exp }: { exp: any }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isFocused, setIsFocused] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const Icon = exp.icon;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E0E10]/50 p-5 md:p-6 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 ${exp.borderColor} shadow-xl`}
      style={{
        boxShadow: isFocused
          ? `0 15px 40px -15px ${exp.glowColor}, inset 0 1px 0 0 rgba(255, 255, 255, 0.08)`
          : "inset 0 1px 0 0 rgba(255, 255, 255, 0.03)",
      }}
    >
      {/* Top soft gradient wash */}
      <div className={`pointer-events-none absolute -inset-px bg-gradient-to-b ${exp.accentColor} opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

      {/* Dynamic Cursor Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              280px circle at ${mouseX}px ${mouseY}px,
              ${exp.glowColor},
              transparent 80%
            )
          `,
        }}
      />

      {/* Header Info */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 text-white shadow-md">
            <Icon className="size-6 text-white/90" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-display text-lg md:text-xl font-bold text-foreground">
                {exp.role}
              </h3>
              <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
            </div>
            <p className="text-sm font-medium text-white/60">
              {exp.company}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono font-medium text-white/70">
            <span className={`w-1.5 h-1.5 rounded-full ${exp.status === "Active" ? "bg-emerald-400 animate-pulse" : "bg-orange-400"}`} />
            {exp.status}
          </span>
          <div className="flex items-center gap-1.5 text-white/40 text-xs font-mono">
            <Calendar className="size-3.5" />
            <span>{exp.period}</span>
          </div>
        </div>
      </div>

      {/* Visual Telemetry Stat Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
        {exp.stats.map((stat: any, idx: number) => {
          const StatIcon = stat.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md group-hover:border-white/[0.12] transition-colors"
            >
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-white/80 shrink-0">
                <StatIcon className="size-4 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="font-display font-bold text-base md:text-lg text-foreground tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono truncate">
                  {stat.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Tech Pill Tags */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.04]">
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest mr-1">
          Stack:
        </span>
        {exp.tags.map((tag: string, idx: number) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-white/[0.02] border border-white/[0.06] text-white/70 hover:border-white/20 hover:text-white transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}