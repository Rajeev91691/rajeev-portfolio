"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { GraduationCap, Code, Shield, Terminal, Zap, Cpu, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [gpa, setGpa] = useState(0);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = 9.24;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setGpa(start + (end - start) * easeOutQuart);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView]);

  const courseworkData = [
    {
      id: 0,
      title: "Artificial Intelligence & NLP",
      icon: Code,
      desc: "Applying deep neural networks, language modeling, and image synthesis algorithms.",
      tags: ["Stable Diffusion Tuning", "RAG Vector Pipelines", "GPT Prompt Taxonomy", "YOLOv8 Edge ML"],
      details: "Configured Stable Diffusion noise scheduling parameters in PyTorch to cut FID scores by 15%. Engineered scalable LangChain RAG architectures using semantic chunking."
    },
    {
      id: 1,
      title: "Systems & Algorithms",
      icon: Cpu,
      desc: "Optimizing hardware utilization, database indexes, and algorithmic execution profiles.",
      tags: ["Mixed-Precision (FP16)", "Dynamic Batching", "FAISS Search Index", "Parallel algorithms"],
      details: "Slashed inference latency by 22% via mixed-precision and dynamic batching. Applied custom FAISS vector indexing to optimize high-dimensional query performance."
    },
    {
      id: 2,
      title: "Network & Security",
      icon: Shield,
      desc: "Hardening endpoint routes, real-time streaming sockets, and cryptographic schemas.",
      tags: ["Websocket video feeds", "OAuth 2.0 Auth", "REST API protection", "AES Encrypted data"],
      details: "Engineered sub-40ms webcam pipelines using low-latency WebSockets. Integrated OAuth2 security protocols for protected multi-document upload and storage."
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-transparent relative overflow-hidden"
    >
      {/* Top gradient — continues seamless dissolve from hero */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-0"
        style={{
          height: "200px",
          background: "linear-gradient(to bottom, rgba(12,12,12,1) 0%, rgba(12,12,12,0.5) 50%, rgba(12,12,12,0) 100%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ROW 1: Card 1 (Narrative Block - 7 columns) */}
          <div className="lg:col-span-7 rounded-3xl border border-white/[0.06] bg-[#141416]/30 p-8 backdrop-blur-xl flex flex-col justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                About Me
              </h2>
              <p className="text-foreground text-lg md:text-xl font-medium leading-relaxed mb-4">
                Bridging core computer science theory with scalable, production-ready AI pipelines.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                As a Computer Science student at GITAM, I do not just train ML models—I optimize them for high-performance serving. I specialize in Generative AI systems, focusing on Stable Diffusion tuning, multi-document RAG pipelines, and sub-40ms real-time vision pipelines.
              </p>
            </div>
            
            {/* Direct Signal Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/[0.04] bg-[#141416]/20 p-5">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Zap className="size-4 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Research</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground">IIT Kanpur Intern</h4>
                <p className="text-muted-foreground text-xs mt-1">Stable Diffusion &amp; LLM baseline tuning</p>
              </div>

              <div className="rounded-2xl border border-white/[0.04] bg-[#141416]/20 p-5">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Terminal className="size-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Deployment</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground">3+ Live ML Spaces</h4>
                <p className="text-muted-foreground text-xs mt-1">Production serving deployed on Hugging Face</p>
              </div>
            </div>
          </div>

          {/* ROW 1: Card 2 (Education Block - 5 columns) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/[0.06] bg-[#141416]/30 p-8 backdrop-blur-xl flex flex-col justify-between gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center shrink-0">
                <GraduationCap className="size-6 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1 text-foreground">Education</h3>
                <p className="text-muted-foreground text-sm">
                  GITAM University, Visakhapatnam
                </p>
                <p className="text-muted-foreground/60 text-xs mt-0.5">
                  B.Tech Computer Science &amp; Engineering
                </p>
                <p className="text-muted-foreground/45 text-xs">2023–Present</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.04]">
              <div className="flex items-end gap-2 mb-2">
                <span className="text-6xl md:text-7xl font-display font-bold text-foreground leading-none">
                  {gpa.toFixed(2)}
                </span>
                <span className="text-muted-foreground text-xl mb-1 font-medium">
                  /10
                </span>
              </div>
              <p className="text-muted-foreground text-xs font-mono tracking-wide">
                Cumulative CGPA • Latest Sem GPA: 9.73/10
              </p>
            </div>
          </div>

          {/* ROW 2: Card 3 (Windows PowerShell - 7 columns) */}
          <div className="lg:col-span-7 flex flex-col">
            <DevTerminal />
          </div>

          {/* ROW 2: Card 4 (Hugging Face Sandbox - 5 columns) */}
          <div className="lg:col-span-5 flex flex-col">
            <HuggingFaceSandbox />
          </div>

          {/* ROW 3: Card 5 (Applied CS Theory - 12 columns full width) */}
          <div className="lg:col-span-12 rounded-3xl border border-white/[0.06] bg-[#141416]/25 p-8 backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Accordion Left Explanation */}
              <div className="lg:col-span-4 space-y-3 lg:pr-6">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">Applied CS Theory</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Click on each category to explore how textbook computer science principles are directly integrated into high-performance ML pipelines.
                </p>
              </div>

              {/* Accordion Right Column */}
              <div className="lg:col-span-8 space-y-4">
                {courseworkData.map((item) => {
                  const Icon = item.icon;
                  const isOpen = activeTab === item.id;
                  
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "rounded-2xl border transition-all duration-300 cursor-pointer",
                        isOpen 
                          ? "border-accent/40 bg-white/[0.02] shadow-[0_15px_30px_rgba(255, 255, 255, 0.02)]" 
                          : "border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.08]"
                      )}
                    >
                      {/* Header info */}
                      <div className="p-5 flex items-center justify-between gap-4 select-none">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-500",
                            isOpen 
                              ? "bg-accent/5 border-accent/20 text-accent scale-105" 
                              : "bg-white/[0.03] border-white/[0.06] text-foreground/80"
                          )}>
                            <Icon className="size-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm md:text-base text-foreground/95">
                              {item.title}
                            </h4>
                            <span className="text-muted-foreground/50 text-[10px]">Click to inspect applied project metrics</span>
                          </div>
                        </div>
                        <ChevronRight className={cn(
                          "size-4 text-muted-foreground/45 transition-transform duration-300 shrink-0",
                          isOpen ? "transform rotate-90 text-accent" : ""
                        )} />
                      </div>

                      {/* Animated accordion panel */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-0 border-t border-white/[0.03] space-y-4">
                              <p className="text-muted-foreground text-xs leading-relaxed pt-4">
                                {item.desc}
                              </p>
                              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04]">
                                <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-1">Production Application</span>
                               <p className="text-foreground/90 text-xs leading-relaxed">
                                  {item.details}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag) => (
                                  <span key={tag} className="px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.04] text-[10px] text-foreground font-mono font-medium">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function DevTerminal() {
  const [isClosed, setIsClosed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    {
      command: "power_on",
      output: (
        <div className="text-[#EEEEEE] text-[10px] leading-relaxed font-mono select-none">
          Windows PowerShell<br />
          Copyright (C) Microsoft Corporation. All rights reserved.<br /><br />
          Try the new cross-platform PowerShell https://aka.ms/pscore6
        </div>
      ),
    },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shellRef.current) {
      const shell = shellRef.current;
      requestAnimationFrame(() => {
        shell.scrollTop = shell.scrollHeight;
      });
    }
  }, [terminalHistory, isMinimized, currentInput, isTyping]);

  const runCommand = (cmd: string) => {
    if (isTyping) return;
    setIsTyping(true);
    setCurrentInput("");

    let i = 0;
    const interval = window.setInterval(() => {
      setCurrentInput((prev) => prev + cmd[i]);
      i++;
      if (i >= cmd.length) {
        window.clearInterval(interval);
        setTimeout(() => {
          executeCommand(cmd);
          setCurrentInput("");
          setIsTyping(false);
        }, 150);
      }
    }, 45);
  };

  const executeCommand = (cmd: string) => {
    let output: React.ReactNode = null;
    const normalizedCmd = cmd.toLowerCase().trim();

    if (normalizedCmd === "get-content gpa.txt" || normalizedCmd === "cat gpa.txt") {
      output = (
        <div className="space-y-2.5 font-mono text-[10px] text-[#CCCCCC]">
          <div className="text-[#F9F1A5] font-extrabold tracking-wider border-b border-white/[0.06] pb-1 select-none">TELEMETRY: GPA PROGRESS ARCHIVES</div>
          
          <div className="grid grid-cols-12 gap-2 items-center">
            <span className="col-span-3 text-white/40 text-[9px]">SEM_01:</span>
            <div className="col-span-7 h-1.5 bg-white/[0.04] rounded overflow-hidden">
              <div className="h-full bg-[#16C60C]" style={{ width: "86%" }} />
            </div>
            <span className="col-span-2 text-right text-[#16C60C] font-semibold">8.60</span>
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <span className="col-span-3 text-white/40 text-[9px]">SEM_02:</span>
            <div className="col-span-7 h-1.5 bg-white/[0.04] rounded overflow-hidden">
              <div className="h-full bg-[#16C60C]" style={{ width: "93.8%" }} />
            </div>
            <span className="col-span-2 text-right text-[#16C60C] font-semibold">9.38</span>
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <span className="col-span-3 text-white/40 text-[9px]">SEM_03:</span>
            <div className="col-span-7 h-1.5 bg-white/[0.04] rounded overflow-hidden">
              <div className="h-full bg-[#16C60C]" style={{ width: "93%" }} />
            </div>
            <span className="col-span-2 text-right text-[#16C60C] font-semibold">9.30</span>
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <span className="col-span-3 text-white/40 text-[9px]">SEM_04:</span>
            <div className="col-span-7 h-1.5 bg-white/[0.04] rounded overflow-hidden">
              <div className="h-full bg-[#16C60C]" style={{ width: "93.8%" }} />
            </div>
            <span className="col-span-2 text-right text-[#16C60C] font-semibold">9.38</span>
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <span className="col-span-3 text-white/40 text-[9px]">SEM_05:</span>
            <div className="col-span-7 h-1.5 bg-white/[0.04] rounded overflow-hidden">
              <div className="h-full bg-[#16C60C]" style={{ width: "91.7%" }} />
            </div>
            <span className="col-span-2 text-right text-[#16C60C] font-semibold">9.17</span>
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <span className="col-span-3 text-white/40 text-[9px]">SEM_06:</span>
            <div className="col-span-7 h-1.5 bg-white/[0.04] rounded overflow-hidden">
              <div className="h-full bg-white animate-pulse" style={{ width: "97.3%" }} />
            </div>
            <span className="col-span-2 text-right text-white font-bold">9.73</span>
          </div>

          <div className="text-white/50 border-t border-white/[0.06] pt-2 flex justify-between items-center select-none">
            <span>CUMULATIVE CGPA:</span>
            <span className="text-white bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded shadow-[0_0_8px_rgba(255,255,255,0.05)] font-extrabold text-[11px]">9.24 / 10.0</span>
          </div>
        </div>
      );
    } else if (normalizedCmd === "get-content research.txt" || normalizedCmd === "cat research.txt") {
      output = (
        <div className="space-y-2 font-mono text-[10px] text-[#CCCCCC]">
          <div className="text-[#F9F1A5] font-extrabold tracking-wider border-b border-white/[0.06] pb-1 select-none">TELEMETRY: IIT KANPUR RESEARCH</div>
          <div className="flex items-start gap-2">
            <span className="text-[#3A96DD]">├──</span>
            <div>
              <span className="text-white font-bold">Focus:</span> Stable Diffusion Noise Scheduling
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#3A96DD]">├──</span>
            <div>
              <span className="text-white font-bold">Frameworks:</span> PyTorch (DDPM/DDIM), FP16 Serving
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#3A96DD]">└──</span>
            <div className="flex flex-wrap gap-2 items-center mt-0.5">
              <span className="text-white font-bold select-none">Metrics Verified:</span>
              <span className="px-1.5 py-0.5 rounded bg-[#13A10E]/10 text-[#16C60C] border border-[#13A10E]/20 font-bold">FID -15.0%</span>
              <span className="px-1.5 py-0.5 rounded bg-[#13A10E]/10 text-[#16C60C] border border-[#13A10E]/20 font-bold">Latency -22.0%</span>
            </div>
          </div>
        </div>
      );
    } else if (normalizedCmd === "get-content stack.txt" || normalizedCmd === "cat stack.txt") {
      output = (
        <div className="space-y-2 font-mono text-[10px] text-[#CCCCCC]">
          <div className="text-[#F9F1A5] font-extrabold tracking-wider border-b border-white/[0.06] pb-1 select-none">TELEMETRY: ML DEPLOYMENT STACK</div>
          <div className="flex items-start gap-2">
            <span className="text-[#3A96DD]">├──</span>
            <div>
              <span className="text-white font-bold">Vector Database:</span> FAISS + Semantic Indexing
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#3A96DD]">├──</span>
            <div>
              <span className="text-white font-bold">Serving Hub:</span> Hugging Face Hub (3 Active Endpoints)
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#3A96DD]">└──</span>
            <div className="space-y-1 mt-1 pl-4 border-l border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1 w-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16C60C] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1 w-1 bg-[#16C60C]"></span>
                </span>
                <span className="text-[#16C60C] font-bold select-none">[active]</span> genai-assistant (spaces)
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-1 w-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16C60C] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1 w-1 bg-[#16C60C]"></span>
                </span>
                <span className="text-[#16C60C] font-bold select-none">[active]</span> Object-Detection (spaces)
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-1 w-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16C60C] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1 w-1 bg-[#16C60C]"></span>
                </span>
                <span className="text-[#16C60C] font-bold select-none">[active]</span> image-gen (spaces)
              </div>
            </div>
          </div>
        </div>
      );
    } else if (normalizedCmd === "clear-host" || normalizedCmd === "clear") {
      setTerminalHistory([
        {
          command: "power_on",
          output: (
            <div className="text-[#EEEEEE] text-[10px] leading-relaxed font-mono select-none">
              Windows PowerShell<br />
              Copyright (C) Microsoft Corporation. All rights reserved.<br /><br />
              Try the new cross-platform PowerShell https://aka.ms/pscore6
            </div>
          ),
        },
      ]);
      setIsTyping(false);
      return;
    } else {
      const tildes = "~".repeat(cmd.length);
      output = (
        <div className="text-[#FF3333] font-mono text-[10px] leading-relaxed mt-1 select-none space-y-1">
          <div>
            {cmd} : The term &apos;{cmd}&apos; is not recognized as the name of a cmdlet, function, script file, or operable program.
          </div>
          <div>Check the spelling of the name, or if a path was included, verify that the path is correct and try again.</div>
          <div>At line:1 char:1</div>
          <div>+ {cmd}</div>
          <div>+ {tildes}</div>
          <div className="pl-4">
            + CategoryInfo          : ObjectNotFound: ({cmd}:String) [], CommandNotFoundException<br />
            + FullyQualifiedErrorId : CommandNotFoundException
          </div>
        </div>
      );
    }

    setTerminalHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const actions = ["Get-Content research.txt", "Get-Content stack.txt", "Get-Content gpa.txt", "Clear-Host"];

  if (isClosed) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={() => {
          setIsClosed(false);
          setIsMinimized(false);
          setIsMaximized(false);
        }}
        className="w-full py-4 rounded-xl border border-dashed border-white/10 bg-[#0C0C0C]/40 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-white/30 hover:bg-[#0C0C0C]/80 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm select-none"
      >
        <Terminal className="size-4 text-white animate-pulse" />
        <span>[System] Launch powershell_telemetry.exe</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      layout
      animate={{
        minHeight: isMinimized ? "52px" : (isMaximized ? "340px" : "240px"),
        height: isMinimized ? "52px" : "auto",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="rounded-2xl border border-white/15 bg-[#0C0C0C]/90 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(0,0,0,0.85)] p-4 md:p-5 font-mono text-xs overflow-hidden flex flex-col justify-between text-[#CCCCCC] backdrop-blur-xl transition-shadow duration-500"
    >
      {/* PowerShell Title Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 select-none">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
          </span>
          <span className="text-[10px] text-white font-extrabold tracking-wider">Windows PowerShell</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-white/50 select-none">
          <span
            onClick={() => setIsMinimized(!isMinimized)}
            className="cursor-pointer hover:text-white transition-colors px-1 font-bold text-xs"
          >
            ⎯
          </span>
          <span
            onClick={() => {
              setIsMaximized(!isMaximized);
              setIsMinimized(false);
            }}
            className="cursor-pointer hover:text-white transition-colors px-1 text-xs"
          >
            ⧠
          </span>
          <span
            onClick={() => setIsClosed(true)}
            className="cursor-pointer hover:text-white transition-colors px-1 text-xs"
          >
            ✕
          </span>
        </div>
      </div>

      {/* Terminal Shell Window & Actions */}
      <AnimatePresence initial={false}>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col justify-between mt-3"
          >
            <div
              ref={shellRef}
              className={cn(
                "flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin transition-all duration-300",
                isMaximized ? "max-h-[220px]" : "max-h-[140px]"
              )}
            >
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  {item.command !== "power_on" && (
                    <div className="text-[#CCCCCC] flex items-start gap-1 select-none">
                      <span className="text-[#CCCCCC] shrink-0">PS C:\Users\rajeev&gt; </span>
                      <span className="text-white font-bold">{item.command}</span>
                    </div>
                  )}
                  <div>{item.output}</div>
                </div>
              ))}
              {isTyping && (
                <div className="text-[#CCCCCC] flex items-start gap-1 select-none">
                  <span className="text-[#CCCCCC] shrink-0">PS C:\Users\rajeev&gt; </span>
                  <span className="text-white flex items-center font-bold">
                    {currentInput}
                    <span className="w-1.5 h-3 bg-white animate-pulse ml-0.5" />
                  </span>
                </div>
              )}
            </div>

            {/* Quick Action Commands */}
            <div className="mt-4 pt-3 border-t border-white/[0.06]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] text-white/40 shrink-0 select-none">Try command:</span>
                {actions.map((act) => (
                  <button
                    key={act}
                    onClick={() => runCommand(act)}
                    disabled={isTyping}
                    className="px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/10 text-[9px] text-[#CCCCCC] hover:text-white hover:bg-white/[0.08] hover:border-white/20 disabled:opacity-50 transition-all duration-300 cursor-pointer font-mono shadow-sm hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] select-none"
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function HuggingFaceSandbox() {
  const [activeTab, setActiveTab] = useState<"spaces" | "sandbox">("spaces");
  const [inferenceModel, setInferenceModel] = useState<"rag" | "diffusion">("rag");
  const [promptInput, setPromptInput] = useState("Explain RAG pipeline latency.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inferenceOutput, setInferenceOutput] = useState<React.ReactNode | null>(null);
  const [pings, setPings] = useState<Record<string, string | boolean>>({});

  const pingServer = (id: string, ms: number) => {
    if (pings[id] === "pinging") return;
    setPings((prev) => ({ ...prev, [id]: "pinging" }));
    setTimeout(() => {
      setPings((prev) => ({ ...prev, [id]: `${ms}ms` }));
    }, 800);
  };

  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setProgress(0);
    setInferenceOutput(null);

    let currentProgress = 0;
    const interval = window.setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        window.clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          renderOutput();
        }, 200);
      }
    }, 150);
  };

  const renderOutput = () => {
    if (inferenceModel === "rag") {
      setInferenceOutput(
        <div className="space-y-2 text-xs font-mono leading-relaxed text-[#80d8ff] border-t border-white/[0.04] pt-4">
          <span className="text-white/60 font-semibold uppercase block text-[9px] tracking-wider">Insight GPT (RAG Engine):</span>
          <p>
            • FAISS indexing active across 80k vector nodes.<br />
            • Semantic query parsing resolved in 28ms.<br />
            • Cache hits: 94.2% (cuts latency by 35%).
          </p>
        </div>
      );
    } else {
      setInferenceOutput(
        <div className="space-y-2 text-xs font-mono leading-relaxed text-[#80ffaa] border-t border-white/[0.04] pt-4">
          <span className="text-white/60 font-semibold uppercase block text-[9px] tracking-wider">Diffusion Pipeline (512px):</span>
          <pre className="text-[10px] leading-tight select-none font-bold text-green-400 bg-black/40 p-3 rounded-lg border border-white/[0.04]">
{`  +-------------------------+
  |  [O _ O]  <-- Developer  |
  |  /|___|\\                |
  |   |   |   [GenAI: OK]   |
  |  /     \\  [GPU: FP16]   |
  +-------------------------+`}
          </pre>
          <p className="text-[10px] text-white/50">Image generated in 1.82s (CLIP score: 0.78).</p>
        </div>
      );
    }
  };

  const spaces = [
    { id: "rag", name: "Insight GPT Space", ping: 28, cpu: "14%", ram: "4.2GB" },
    { id: "diffusion", name: "Stable Diffusion Space", ping: 180, cpu: "8%", ram: "6.8GB" },
    { id: "edge", name: "YOLOv8 Edge Feed", ping: 38, cpu: "21%", ram: "2.1GB" },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#141416]/25 p-5 md:p-6 backdrop-blur-xl text-left h-full flex flex-col justify-between">
      {/* Title */}
      <div className="flex items-center justify-between mb-5 border-b border-white/[0.04] pb-3 select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
          <h4 className="font-display font-bold text-sm tracking-wide text-foreground">Hugging Face Live Sandbox</h4>
        </div>
        
        {/* Tabs switcher */}
        <div className="flex bg-white/[0.03] p-0.5 rounded-lg border border-white/[0.05]">
          <button
            onClick={() => setActiveTab("spaces")}
            className={cn(
              "px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer",
              activeTab === "spaces" ? "bg-white/[0.08] text-white" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Spaces
          </button>
          <button
            onClick={() => setActiveTab("sandbox")}
            className={cn(
              "px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer",
              activeTab === "sandbox" ? "bg-white/[0.08] text-white" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Sandbox
          </button>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="min-h-[160px] flex-1 flex flex-col justify-between">
        
        {/* Spaces tab content */}
        {activeTab === "spaces" && (
          <div className="space-y-3.5">
            {spaces.map((space) => (
              <div key={space.id} className="flex items-center justify-between gap-3 text-xs bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl transition-colors hover:bg-white/[0.04]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff00] shrink-0 animate-pulse" />
                  <span className="font-medium text-foreground/90 truncate">{space.name}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-mono shrink-0 select-none">
                  <span>CPU: {space.cpu}</span>
                  <button
                    onClick={() => pingServer(space.id, space.ping)}
                    className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer"
                  >
                    {pings[space.id] === "pinging" ? "..." : (pings[space.id] || "Ping")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sandbox tab content */}
        {activeTab === "sandbox" && (
          <div className="space-y-4">
            {/* Input selectors */}
            <div className="flex items-center gap-2 select-none">
              <span className="text-[10px] text-white/50">Model:</span>
              <button
                onClick={() => {
                  setInferenceModel("rag");
                  setPromptInput("Explain RAG pipeline latency.");
                  setInferenceOutput(null);
                }}
                className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-medium border transition-all cursor-pointer",
                  inferenceModel === "rag" ? "bg-accent/5 border-accent/20 text-accent" : "border-white/[0.05] bg-white/[0.02] text-muted-foreground"
                )}
              >
                RAG Engine
              </button>
              <button
                onClick={() => {
                  setInferenceModel("diffusion");
                  setPromptInput("Anime developer portrait ASCII.");
                  setInferenceOutput(null);
                }}
                className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-medium border transition-all cursor-pointer",
                  inferenceModel === "diffusion" ? "bg-accent/5 border-accent/20 text-accent" : "border-white/[0.05] bg-white/[0.02] text-muted-foreground"
                )}
              >
                Diffusion v2
              </button>
            </div>

            {/* Prompt bar */}
            <div className="p-3 bg-black/40 border border-white/[0.05] rounded-xl flex items-center justify-between gap-4 font-mono text-[10px]">
              <span className="text-white/80 select-none truncate">Prompt: &quot;{promptInput}&quot;</span>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-3 py-1.5 rounded-lg bg-foreground text-background font-bold uppercase tracking-wider shrink-0 hover:opacity-85 disabled:opacity-50 transition-opacity cursor-pointer text-[9px]"
              >
                {isGenerating ? "Running" : "Inference"}
              </button>
            </div>

            {/* Live Progress Bar */}
            {isGenerating && (
              <div className="space-y-1 font-mono text-[10px] text-white/50 select-none">
                <div className="flex justify-between">
                  <span>Generating Pipeline Output...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            )}

            {/* Model output display */}
            {inferenceOutput}
          </div>
        )}

      </div>
    </div>
  );
}