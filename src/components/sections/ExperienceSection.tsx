"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Calendar, ExternalLink, Code, Terminal, Play, RefreshCw, Cpu } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

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
      // 1. Grow the vertical timeline line dynamically with smooth catch-up
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

      // 2. Activate each timeline node using stable parent elements
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
      role: "Generative AI Intern",
      period: "June 2025 – August 2025",
      icon: Building2,
      metrics: ["-15% FID Score", "-22% Inference Latency", "+18% Quality Lift"],
      achievements: [
        "Engineered Stable Diffusion fine-tuning pipelines in PyTorch (DDPM/DDIM), cutting FID score by 15% through custom noise scheduling on domain-specific image datasets",
        "Slashed inference latency by 22% by implementing dynamic batching and FP16 mixed-precision inference across the full diffusion model serving stack",
        "Built a model evaluation harness benchmarking GPT-2, LLaMA, and Mistral across 3 prompt taxonomies — surfacing the highest-performing architecture (18% quality lift) adopted as the team's standard baseline",
      ],
      certificate: "https://acrobat.adobe.com/id/urn:aaid:sc:AP:4913a4f8-1ead-4529-8ef8-c829b7aa3078",
    },
    {
      company: "Open Source · Hugging Face Spaces",
      role: "Independent AI Engineer",
      period: "Jan 2025 – Present",
      icon: Code,
      metrics: ["Insight GPT (RAG)", "Stable Diffusion UI", "YOLOv8 Edge Feed"],
      achievements: [
        "Shipped Insight GPT — a production RAG pipeline (LangChain + FAISS + OpenAI) with live inference on Hugging Face Spaces, handling multi-document Q&A with semantic chunking and source attribution",
        "Built and deployed a Stable Diffusion UI with custom LoRA fine-tuning pipeline for domain-specific image synthesis, enabling style-transfer at inference time without full retraining",
        "Deployed a real-time YOLOv8 object detection system with webcam inference pipeline achieving sub-40ms end-to-end latency, demonstrating production edge-AI readiness",
      ],
      certificate: "https://huggingface.co/Rajeev91691",
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-32 bg-transparent relative overflow-hidden"
    >
      {/* Decorative subtle background grid and glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-accent/2 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent tracking-tight">
          Experience
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
          Professional experience optimizing high-throughput AI systems and delivering research value.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10" ref={timelineRef}>
        <div className="relative">
          {/* Timeline background vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/[0.06]">
            <div ref={timelineLineRef} className="timeline-line w-full h-0 bg-accent/50 transition-none" />
          </div>

          {/* Cards Mapping */}
          {experience.map((exp, index) => (
            <div key={index} className="group relative pl-12 pb-16 last:pb-0">
              
              {/* Animated Pulse timeline node radar dot */}
              <div className="absolute left-[-9px] top-1.5 w-[20px] h-[20px] flex items-center justify-center select-none">
                <div className="timeline-node w-2.5 h-2.5 rounded-full bg-[#333] border border-white/20 transition-all duration-500 relative z-10 scale-105 group-hover:scale-125" />
                <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Glowing Interactive Card */}
              <ExperienceCard exp={exp} />
            </div>
          ))}

          {/* Certifications footer button */}
          <div className="relative pl-12 pt-8">
            <a
              href="https://github.com/Rajeev91691/Certifications"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/[0.12] text-foreground text-sm font-medium transition-all duration-300"
              data-cursor-hover="true"
            >
              <ExternalLink className="size-4 text-muted-foreground" />
              <span>View All Certifications</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp }: { exp: any }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const Icon = exp.icon;
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className="group/card relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#141416]/20 p-6 md:p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/45 hover:bg-[#141416]/40"
      style={{
        boxShadow: isFocused
          ? "0 15px 40px -15px rgba(255, 255, 255, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)"
          : "inset 0 1px 0 0 rgba(255, 255, 255, 0.03)"
      }}
    >
      {/* Mouse Tracking Ambient Light */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              160px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Decorative top border gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-center" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5 relative z-10 select-none">
        <div className="flex items-center gap-4">
          <div
            className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] transition-all duration-300 group-hover/card:scale-110"
            style={{
              color: "rgb(255, 255, 255)",
              boxShadow: isFocused ? "0 0 15px 2px rgba(255, 255, 255, 0.12)" : "none"
            }}
          >
            <Icon className="size-5 transition-transform duration-500 group-hover/card:rotate-[12deg]" />
          </div>
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold mb-1 text-foreground transition-colors duration-300 group-hover/card:text-accent">
              {exp.role}
            </h3>
            <span className="text-sm font-medium text-muted-foreground">{exp.company}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground/60 text-xs font-mono">
          <Calendar className="size-3.5" />
          <span>{exp.period}</span>
        </div>
      </div>

      {/* Key Metric Spotlight pills */}
      {exp.metrics && (
        <div className="flex flex-wrap gap-2.5 mb-6 relative z-10 select-none">
          {exp.metrics.map((metric: string, idx: number) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide bg-accent/5 border border-accent/15 text-accent shadow-[0_2px_10px_rgba(255, 255, 255, 0.02)]"
            >
              {metric}
            </span>
          ))}
        </div>
      )}

      {/* Accomplishments Bullets */}
      <ul className="space-y-3 mb-6 relative z-10">
        {exp.achievements.map((achievement: string, i: number) => (
          <li
            key={i}
            className="text-muted-foreground text-sm flex items-start gap-2.5 leading-relaxed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent/45 mt-2.5 shrink-0 group-hover/card:scale-125 transition-transform duration-300" />
            <span>{achievement}</span>
          </li>
        ))}
      </ul>

      {/* Verification CTA & Terminal Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-white/[0.04] relative z-10">
        <Link
          href={exp.certificate}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-foreground/80 hover:text-accent transition-colors select-none"
          data-cursor-hover="true"
        >
          <span>{exp.certificate.includes("huggingface") ? "View Hugging Face Profile" : "Verify Certificate"}</span>
          <span className="transform translate-x-0 transition-transform duration-300 group-hover/card:translate-x-1">→</span>
        </Link>

        <button
          onClick={() => setIsTerminalOpen(!isTerminalOpen)}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wide transition-all duration-300 border cursor-pointer",
            isTerminalOpen
              ? "bg-accent/10 border-accent/30 text-accent animate-pulse"
              : "bg-white/[0.02] border-white/[0.08] text-muted-foreground hover:text-foreground hover:border-accent/30 hover:bg-accent/5"
          )}
        >
          <Terminal className="size-3.5" />
          <span>{isTerminalOpen ? "Close Diagnostics" : "Run Impact Analytics"}</span>
        </button>
      </div>

      {/* Expandable Terminal Sandbox */}
      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 20 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ExperienceTerminal
              type={exp.company.toLowerCase().includes("indian") ? "iitk" : "hf"}
              onClose={() => setIsTerminalOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Experience Terminal Component & Step Definitions
interface TerminalStep {
  type: "command" | "output" | "success" | "progress" | "stream" | "error";
  text: string;
  delay: number;
}

const iitkScript: TerminalStep[] = [
  { type: "command", text: ".\\run_benchmark.ps1 -Model SD-v2.1 -Precision FP16", delay: 800 },
  { type: "output", text: "Initializing Stable Diffusion fine-tuning benchmark...", delay: 400 },
  { type: "output", text: "CUDA Device detected: NVIDIA A100-SXM4-80GB (81.9 GB VRAM)", delay: 300 },
  { type: "output", text: "Loading base weights (FP16/SafeTensors) into VRAM...", delay: 300 },
  { type: "progress", text: "Loading weights", delay: 700 },
  { type: "success", text: "SUCCESS: Weights loaded. Active footprint: 12.4 GB", delay: 200 },
  { type: "output", text: "Running baseline FP32 inference (batch_size=1)...", delay: 400 },
  { type: "output", text: "  -> FP32 Average Latency: 23.41 ms / image", delay: 200 },
  { type: "output", text: "  -> Baseline FID Score : 24.12", delay: 200 },
  { type: "output", text: "Activating FP16 Mixed-Precision & Tensor Cores...", delay: 500 },
  { type: "success", text: "  -> FP16 Average Latency: 18.26 ms / image (-22.0% latency!)", delay: 250 },
  { type: "output", text: "Fine-tuning DDPM/DDIM custom noise schedules...", delay: 400 },
  { type: "progress", text: "Fine-tuning schedules", delay: 800 },
  { type: "success", text: "  -> Fine-Tuned FID Score : 20.50 (-15.0% FID improvement!)", delay: 250 },
  { type: "success", text: "SUCCESS: Dynamic batching and scheduler pipeline fully verified.", delay: 200 }
];

const hfScript: TerminalStep[] = [
  { type: "command", text: ".\\test_rag_pipeline.ps1 -Query 'Explain semantic FAISS chunking'", delay: 800 },
  { type: "output", text: "Initializing Insight GPT (RAG Pipeline)...", delay: 400 },
  { type: "output", text: "Opening local FAISS vector store index (dim=1536)...", delay: 300 },
  { type: "progress", text: "Scanning indexes", delay: 600 },
  { type: "success", text: "SUCCESS: Loaded 12,450 embeddings in 45ms.", delay: 200 },
  { type: "output", text: "Performing Cosine Similarity index scan...", delay: 400 },
  { type: "output", text: "  -> Found Node #0432 (Dist: 0.281) in docs/rag_architecture.pdf", delay: 250 },
  { type: "output", text: "  -> Found Node #1201 (Dist: 0.309) in docs/faiss_index.md", delay: 250 },
  { type: "output", text: "Rerank complete. Injecting into LLM context window...", delay: 350 },
  { type: "output", text: "Streaming prompt response from local LLaMA endpoint...", delay: 300 },
  { type: "stream", text: "Semantic FAISS chunking splits source texts by logical structural meaning (such as paragraphs or semantic boundaries) rather than hard character counts. This preserves context coherence, ensuring search queries return precise target chunks and boosting overall RAG retrieval accuracy.", delay: 1200 },
  { type: "success", text: "SUCCESS: Query completed in 238ms. Semantic accuracy verified.", delay: 200 }
];

function ExperienceTerminal({ type, onClose }: { type: "iitk" | "hf"; onClose: () => void }) {
  const script = type === "iitk" ? iitkScript : hfScript;
  const [logs, setLogs] = useState<Array<{ type: string; text: string; progress?: number }>>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTypingCommand, setIsTypingCommand] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<boolean>(false);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs, currentInput]);

  useEffect(() => {
    return () => {
      abortControllerRef.current = true;
    };
  }, []);

  const startExecution = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setHasRun(true);
    setLogs([]);
    setCurrentInput("");
    abortControllerRef.current = false;

    setLogs([
      {
        type: "system",
        text: "Windows PowerShell\nCopyright (C) Microsoft Corporation. All rights reserved.\n",
      },
    ]);

    await new Promise((resolve) => setTimeout(resolve, 400));
    if (abortControllerRef.current) return;

    for (let stepIndex = 0; stepIndex < script.length; stepIndex++) {
      if (abortControllerRef.current) return;
      const step = script[stepIndex];

      if (step.type === "command") {
        setIsTypingCommand(true);
        setCurrentInput("");
        for (let i = 0; i < step.text.length; i++) {
          if (abortControllerRef.current) return;
          await new Promise((resolve) => setTimeout(resolve, 15 + Math.random() * 15));
          setCurrentInput((prev) => prev + step.text[i]);
        }
        await new Promise((resolve) => setTimeout(resolve, 200));
        setIsTypingCommand(false);
        setLogs((prev) => [...prev, { type: "command", text: step.text }]);
        setCurrentInput("");
      } else if (step.type === "progress") {
        setLogs((prev) => [...prev, { type: "progress", text: step.text, progress: 0 }]);
        for (let p = 0; p <= 100; p += 10) {
          if (abortControllerRef.current) return;
          await new Promise((resolve) => setTimeout(resolve, step.delay / 10));
          setLogs((prev) => {
            const updated = [...prev];
            const targetIdx = updated.length - 1;
            if (updated[targetIdx] && updated[targetIdx].type === "progress") {
              updated[targetIdx] = { ...updated[targetIdx], progress: p };
            }
            return updated;
          });
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      } else if (step.type === "stream") {
        setLogs((prev) => [...prev, { type: "stream", text: "" }]);
        const words = step.text.split(" ");
        let currentText = "";
        for (let w = 0; w < words.length; w++) {
          if (abortControllerRef.current) return;
          await new Promise((resolve) => setTimeout(resolve, 15 + Math.random() * 20));
          currentText += (w === 0 ? "" : " ") + words[w];
          setLogs((prev) => {
            const updated = [...prev];
            const targetIdx = updated.length - 1;
            if (updated[targetIdx] && updated[targetIdx].type === "stream") {
              updated[targetIdx] = { ...updated[targetIdx], text: currentText };
            }
            return updated;
          });
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, step.delay));
        if (abortControllerRef.current) return;
        setLogs((prev) => [...prev, { type: step.type, text: step.text }]);
      }
    }

    setIsRunning(false);
  };

  const renderLogLine = (log: any, idx: number) => {
    switch (log.type) {
      case "system":
        return (
          <div key={idx} className="text-[#EEEEEE] whitespace-pre-line leading-relaxed text-[11px]">
            {log.text}
          </div>
        );
      case "command":
        return (
          <div key={idx} className="text-white flex items-start gap-1 text-[11px] select-none">
            <span className="text-[#EEEEEE] shrink-0">PS C:\Users\rajeev&gt; </span>
            <span className="text-white font-bold">{log.text}</span>
          </div>
        );
      case "progress":
        const barsCount = Math.floor((log.progress || 0) / 5);
        const emptyBarsCount = 20 - barsCount;
        const filledStr = "█".repeat(barsCount);
        const emptyStr = "░".repeat(emptyBarsCount);
        return (
          <div key={idx} className="text-[#EEEEEE] font-mono select-none text-[11px] flex items-center gap-1">
            <span>{log.text}:</span>
            <span className="text-yellow-300 font-bold">[{filledStr}{emptyStr}]</span>
            <span className="ml-2 font-bold text-white">{log.progress}%</span>
          </div>
        );
      case "success":
        return (
          <div key={idx} className="text-[#00ff00] font-mono leading-relaxed text-[11px]">
            {log.text}
          </div>
        );
      case "error":
        return (
          <div key={idx} className="text-[#ff3333] font-mono leading-relaxed text-[11px]">
            {log.text}
          </div>
        );
      case "stream":
        return (
          <div key={idx} className="text-[#80d8ff] font-mono leading-relaxed italic whitespace-pre-wrap pl-3 border-l border-[#80d8ff]/30 text-[11px]">
            {log.text}
          </div>
        );
      default:
        return (
          <div key={idx} className="text-white/90 font-mono leading-relaxed text-[11px]">
            {log.text}
          </div>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-[#0C0C0C]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(0,0,0,0.65)] p-4 font-mono text-xs overflow-hidden flex flex-col justify-between text-[#CCCCCC] relative min-h-[220px]">
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-3 select-none">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
          </span>
          <span className="text-[10px] text-white font-extrabold tracking-wider">Windows PowerShell</span>
          <span className="text-[9px] text-white/40"> - {type === "iitk" ? "benchmark_diffusion.ps1" : "test_rag_pipeline.ps1"}</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-white/50">
          <span className="cursor-pointer hover:text-white transition-colors">⎯</span>
          <span className="cursor-pointer hover:text-white transition-colors">⧠</span>
          <span onClick={onClose} className="cursor-pointer hover:text-accent transition-colors">✕</span>
        </div>
      </div>

      <div 
        ref={terminalBodyRef}
        className="flex-1 overflow-y-auto max-h-[160px] space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/10"
      >
        {logs.map((log, idx) => renderLogLine(log, idx))}
        
        {isTypingCommand && (
          <div className="text-white flex items-start gap-1 text-[11px] select-none">
            <span className="text-[#EEEEEE] shrink-0">PS C:\Users\rajeev&gt; </span>
            <span className="text-white font-bold">{currentInput}</span>
            <span className="w-1.5 h-3.5 bg-white animate-pulse inline-block self-center ml-0.5" />
          </div>
        )}

        {logs.length === 0 && (
          <div className="text-white/40 italic flex flex-col items-center justify-center py-6 gap-2">
            <Cpu className="size-6 text-white/20 animate-pulse" />
            <span>PowerShell Sandbox Standby</span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-white/[0.08] flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isRunning ? "bg-yellow-400 animate-ping" : (hasRun ? "bg-[#00ff00]" : "bg-white/20")
          )} />
          <span className="text-[10px] text-white/40">
            {isRunning ? "Executing benchmarks..." : (hasRun ? "Execution verified" : "Standby")}
          </span>
        </div>

        <button
          onClick={startExecution}
          disabled={isRunning}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold tracking-wide border transition-all duration-300 cursor-pointer",
            isRunning
              ? "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
              : "bg-[#00ff00]/10 border-[#00ff00]/30 text-[#00ff00] hover:bg-[#00ff00]/20 hover:border-[#00ff00]/50"
          )}
        >
          {isRunning ? (
            <>
              <RefreshCw className="size-3 animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play className="size-3" />
              <span>{hasRun ? "Re-run Diagnostics" : "Run Script"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}