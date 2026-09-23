"use client";

import { useRef, useState, useCallback } from "react";
import TextMarquee from "@/components/ui/text-marque";
import ParticleImage from "@/components/ParticleImage";
import { Brain, Database, Network, Sliders, Atom, Server, Code2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SKILLS_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="250" viewBox="0 0 800 250"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Plus Jakarta Sans, Inter, sans-serif" font-weight="900" font-size="140" fill="%23ffffff" letter-spacing="8">SKILLS</text></svg>`;

type SkillCategory = "all" | "ai" | "search" | "fullstack";

interface KeySkill {
  id: string;
  name: string;
  category: SkillCategory;
  icon: any;
  color: string;
  status: string;
  statusColor: string;
  companionTech: string[];
  description: string;
}

const keySkills: KeySkill[] = [
  {
    id: "rag",
    name: "RAG & Vector Search",
    category: "search",
    icon: Database,
    color: "rgba(59, 130, 246, 0.25)",
    status: "Production",
    statusColor: "bg-emerald-400",
    companionTech: ["FAISS", "Python", "Transformers", "Qdrant"],
    description: "Dense indexing & semantic vector retrieval."
  },
  {
    id: "diffusion",
    name: "Diffusion & GenAI",
    category: "ai",
    icon: Brain,
    color: "rgba(168, 85, 247, 0.25)",
    status: "Research",
    statusColor: "bg-purple-400",
    companionTech: ["PyTorch", "CUDA", "Hugging Face", "Gradio"],
    description: "PyTorch latent diffusion & image synthesis."
  },
  {
    id: "faiss",
    name: "High-Speed Vectors (FAISS)",
    category: "search",
    icon: Network,
    color: "rgba(236, 72, 153, 0.25)",
    status: "Benchmark",
    statusColor: "bg-pink-400",
    companionTech: ["Python", "C++", "Qdrant", "PyTorch"],
    description: "Sub-millisecond similarity search at scale."
  },
  {
    id: "nextjs",
    name: "Next.js & TypeScript",
    category: "fullstack",
    icon: Code2,
    color: "rgba(6, 182, 212, 0.25)",
    status: "Fullstack",
    statusColor: "bg-cyan-400",
    companionTech: ["React", "Node.js", "TypeScript", "Tailwind"],
    description: "Type-safe fullstack & edge architectures."
  },
  {
    id: "react",
    name: "WebGL & 3D Interfaces",
    category: "fullstack",
    icon: Atom,
    color: "rgba(168, 85, 247, 0.25)",
    status: "Interactive",
    statusColor: "bg-purple-400",
    companionTech: ["Three.js", "Framer Motion", "TypeScript", "Next.js"],
    description: "Three.js canvas shaders & fluid 3D flows."
  },
  {
    id: "backend",
    name: "FastAPI & Node Pipelines",
    category: "fullstack",
    icon: Server,
    color: "rgba(132, 204, 22, 0.25)",
    status: "High-Throughput",
    statusColor: "bg-lime-400",
    companionTech: ["Python", "FastAPI", "WebSockets", "Docker"],
    description: "Async backend pipelines & inference serving."
  },
  {
    id: "gradio",
    name: "Interactive ML Sandboxes",
    category: "ai",
    icon: Sliders,
    color: "rgba(245, 158, 11, 0.25)",
    status: "Live Sandboxes",
    statusColor: "bg-amber-400",
    companionTech: ["Python", "PyTorch", "Hugging Face", "FastAPI"],
    description: "Real-time playgrounds & Gradio demos."
  },
  {
    id: "security",
    name: "Cybersecurity & Protection",
    category: "fullstack",
    icon: ShieldAlert,
    color: "rgba(239, 68, 68, 0.25)",
    status: "Enterprise",
    statusColor: "bg-red-400",
    companionTech: ["Docker", "OAuth 2.0", "FastAPI", "CI/CD"],
    description: "Access control, OAuth 2.0 & API security."
  }
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("all");
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  const filteredSkills = keySkills.filter(
    (skill) => activeTab === "all" || skill.category === activeTab
  );

  const upperSkills =
    "Python • PyTorch • Hugging Face • Transformers • RAG • Vector Databases • Qdrant • FAISS • LLM Fine-Tuning • Stable Diffusion • C++ • TypeScript • SQL • System Design";

  const lowerSkills =
    "Next.js • React • Node.js • FastAPI • REST APIs • WebSockets • Docker • AWS • Git • CI/CD • OAuth 2.0 • Secure API Development • Data Encryption • High-Throughput serving";

  const handleTabChange = useCallback((tab: SkillCategory) => {
    setActiveTab(tab);
  }, []);

  return (
    <section id="skills" className="py-[clamp(3.5rem,6vw,6.5rem)] bg-transparent overflow-hidden">
      {/* Particle text heading — stationary until cursor repulsion */}
      <div className="relative w-full overflow-hidden isolate mx-auto mb-4" style={{ height: "clamp(150px, 18vw, 230px)", maxWidth: "min(92vw, 720px)" }}>
        <ParticleImage
          width="100%"
          height="100%"
          particleCount={50}
          particleSize={5}
          particleShape="circle"
          particleColor="original"
          imageConfig={{
            image: SKILLS_SVG,
            mode: "fit",
            scale: 10,
          }}
          hoverEnabled={false}
          repulsionEnabled={true}
          repulsionConfig={{
            repulsionMode: "outside",
            repulsionForce: 18,
            repulsionRadius: 100
          }}
        />
      </div>

      <div className="space-y-3">
        <TextMarquee
          baseVelocity={-2}
          className="font-bold tracking-[-0.07em] leading-[90%] text-muted-foreground/50"
          scrollDependent={true}
        >
          {upperSkills}
        </TextMarquee>
        <TextMarquee
          baseVelocity={2}
          className="font-bold tracking-[-0.07em] leading-[90%] text-muted-foreground/50"
        >
          {lowerSkills}
        </TextMarquee>
      </div>

      {/* ─── Interactive Filter Tabs & Isolation Controls ────────────── */}
      <div className="max-w-[min(92vw,1440px)] mx-auto px-[clamp(1rem,3vw,2.5rem)] mt-[clamp(2rem,3vw,3.5rem)] mb-4 flex flex-col items-center justify-center gap-3">
        {/* Filter Capsule */}
        <div className="inline-flex p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
          {(
            [
              { id: "all", label: "All Stack" },
              { id: "ai", label: "AI & Vision" },
              { id: "search", label: "Search & Vectors" },
              { id: "fullstack", label: "Fullstack & Cloud" },
            ] as const
          ).map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer select-none ${
                  isSelected ? "text-white" : "text-muted-foreground hover:text-white"
                }`}
                data-cursor-hover="true"
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSkillFilterTab"
                    className="absolute inset-0 rounded-full bg-white/[0.1] border border-white/[0.15] shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pure GPU-Accelerated Focus Grid Container */}
      <div className="max-w-[min(92vw,1440px)] mx-auto px-[clamp(1rem,3vw,2.5rem)] min-h-[320px]">
        <motion.div
          layout="position"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(0.75rem,1.4vw,1.4rem)]"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const isHovered = skill.id === hoveredSkillId;
              const isInvisible = hoveredSkillId !== null && !isHovered;

              return (
                <SmoothSkillCard
                  key={skill.id}
                  skill={skill}
                  isHovered={isHovered}
                  isInvisible={isInvisible}
                  onHover={() => setHoveredSkillId(skill.id)}
                  onLeave={() => setHoveredSkillId(null)}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pure Hardware-Accelerated 120 FPS Card Component (Constellation-Aware)
// ---------------------------------------------------------------------------

function SmoothSkillCard({
  skill,
  isHovered,
  isInvisible,
  onHover,
  onLeave,
}: {
  skill: KeySkill;
  isHovered: boolean;
  isInvisible: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Directly mutate DOM style properties on mousemove — 0 React re-renders!
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotlightRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, ${skill.color}, transparent 70%)`;
  };

  const Icon = skill.icon;

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{
        opacity: isInvisible ? 0 : 1,
        scale: isHovered ? 1.02 : isInvisible ? 0.94 : 1,
        filter: isInvisible ? "blur(6px)" : "blur(0px)",
      }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden rounded-2xl border bg-[#0E0E10]/65 backdrop-blur-xl p-[clamp(1.1rem,1.6vw,1.6rem)] transition-all duration-300 ease-out cursor-pointer shadow-lg flex flex-col justify-between group/card will-change-transform ${
        isInvisible ? "pointer-events-none" : ""
      } ${
        isHovered
          ? "!border-white/40 !shadow-2xl -translate-y-1.5 bg-[#0E0E10]/90"
          : "border-white/[0.08]"
      }`}
      style={{
        boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.03)",
      }}
      data-cursor-hover="true"
    >
      {/* Zero-Lag Spotlight Overlay */}
      <div
        ref={spotlightRef}
        className={`pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 will-change-[background,opacity] ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-start gap-3.5 pointer-events-none">
        {/* Top Header Row */}
        <div className="w-full flex items-center justify-between">
          <div
            className={`p-2.5 rounded-xl border transition-all duration-300 ${
              isHovered
                ? "scale-110 bg-white/[0.08] border-white/20"
                : "bg-white/[0.04] border-white/[0.08]"
            }`}
            style={{
              color: skill.color.replace("0.25", "1"),
            }}
          >
            <Icon
              className={`size-5 transition-transform duration-500 ${
                isHovered ? "rotate-[12deg]" : ""
              }`}
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono transition-colors bg-white/[0.03] border border-white/[0.06] text-muted-foreground">
            <span className={`w-1.5 h-1.5 rounded-full ${skill.statusColor} animate-pulse`} />
            <span>{skill.status}</span>
          </div>
        </div>

        {/* Text descriptions */}
        <div>
          <h3 className="font-display font-bold text-base md:text-lg text-foreground mb-1 tracking-tight">
            {skill.name}
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed transition-colors">
            {skill.description}
          </p>
        </div>
      </div>

      {/* Tech Stack Chips */}
      <div className="relative z-10 flex flex-wrap items-center gap-1.5 pt-3.5 mt-3.5 border-t border-white/[0.05] pointer-events-none">
        {skill.companionTech.map((tech, idx) => (
          <span
            key={idx}
            className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-all duration-200 ${
              isHovered
                ? "text-white border-white/20 bg-white/[0.08]"
                : "bg-white/[0.03] border border-white/[0.06] text-muted-foreground/80"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}