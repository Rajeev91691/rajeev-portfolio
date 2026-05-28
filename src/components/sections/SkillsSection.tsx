"use client";

import { useRef, useState } from "react";
import TextMarquee from "@/components/ui/text-marque";
import { ParticleTextEffect } from "@/components/ui/interactive-text-particle";
import { Brain, Cpu, Database, Network, Sliders, BookOpen, Atom, Server, Code2, ShieldAlert } from "lucide-react";

interface KeySkill {
  name: string;
  icon: any;
  color: string;
  description: string;
}

const keySkills: KeySkill[] = [
  {
    name: "RAG",
    icon: Database,
    color: "rgba(59, 130, 246, 0.15)", // Blue glow
    description: "Vector Embeddings & Semantic Search Pipelines"
  },
  {
    name: "Diffusion Models",
    icon: Brain,
    color: "rgba(168, 85, 247, 0.15)", // Purple glow
    description: "PyTorch & Hugging Face Image Synthesis"
  },
  {
    name: "FAISS",
    icon: Network,
    color: "rgba(236, 72, 153, 0.15)", // Pink glow
    description: "High-Performance Dense Vector Similarity Search"
  },
  {
    name: "Gradio",
    icon: Sliders,
    color: "rgba(245, 158, 11, 0.15)", // Amber glow
    description: "Interactive Web Interfaces for Model Demos"
  },
  {
    name: "Next.js & TypeScript",
    icon: Code2,
    color: "rgba(6, 182, 212, 0.15)", // Cyan glow
    description: "Type-safe React architectures, server component state, and premium performance optimization."
  },
  {
    name: "Cybersecurity Systems",
    icon: ShieldAlert,
    color: "rgba(239, 68, 68, 0.15)", // Red glow
    description: "Security log auditing, intrusion detection, and threat analysis for enterprise operations."
  },
  {
    name: "React",
    icon: Atom,
    color: "rgba(168, 85, 247, 0.15)", // Purple glow
    description: "Component architecture & dynamic user flows"
  },
  {
    name: "Node.js",
    icon: Server,
    color: "rgba(132, 204, 22, 0.15)", // Lime glow
    description: "Asynchronous Backend Pipelines & REST APIs"
  }
];

export default function SkillsSection() {
  const upperSkills =
    "Python • PyTorch • Hugging Face • Transformers • RAG • Vector Databases • Qdrant • FAISS • LLM Fine-Tuning • Stable Diffusion • C++ • TypeScript • SQL • System Design";

  const lowerSkills =
    "Next.js • React • Node.js • FastAPI • REST APIs • WebSockets • Docker • AWS • Git • CI/CD • OAuth 2.0 • Secure API Development • Data Encryption • High-Throughput serving";

  return (
    <section id="skills" className="py-24 md:py-32 bg-transparent overflow-hidden">

      {/* Particle text heading — interactive, cursor-reactive */}
      <div className="relative w-full overflow-hidden isolate" style={{ height: "260px" }}>
        <ParticleTextEffect
          text="SKILLS"
          colors={['ffffff', 'e0e0e0', 'aaaaaa', '888888', '555555', '888888', 'aaaaaa', 'e0e0e0', 'ffffff']}
          animationForce={90}
          particleDensity={3}
        />
      </div>



      <div className="space-y-4">
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
          scrollDependent={true}
        >
          {lowerSkills}
        </TextMarquee>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keySkills.map((skill) => (
            <SpotlightCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpotlightCard({ skill }: { skill: KeySkill }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = skill.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md p-6 transition-all duration-300 hover:border-white/[0.18] hover:-translate-y-1.5 group cursor-pointer"
      style={{
        boxShadow: isFocused
          ? `0 10px 30px -15px ${skill.color}, inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`
          : `inset 0 1px 0 0 rgba(255, 255, 255, 0.03)`
      }}
      data-cursor-hover="true"
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, ${skill.color}, transparent 65%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-start gap-4">
        {/* Animated & Glowing Icon Frame */}
        <div
          className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] group-hover:scale-110 transition-transform duration-300"
          style={{
            color: skill.color.replace("0.15", "1"),
            boxShadow: isFocused ? `0 0 15px 2px ${skill.color}` : "none"
          }}
        >
          <Icon className="size-6 transition-transform duration-500 group-hover:rotate-[12deg]" />
        </div>

        {/* Text descriptions */}
        <div>
          <h3 className="font-display font-bold text-lg text-foreground mb-1 tracking-tight">
            {skill.name}
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed group-hover:text-foreground/75 transition-colors">
            {skill.description}
          </p>
        </div>
      </div>
    </div>
  );
}