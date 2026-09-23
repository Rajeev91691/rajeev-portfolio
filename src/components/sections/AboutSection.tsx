"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { GraduationCap, Terminal, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [gpa, setGpa] = useState(0);

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-[clamp(3.5rem,6vw,6.5rem)] bg-transparent relative overflow-hidden"
    >
      <div className="max-w-[min(92vw,1440px)] mx-auto px-[clamp(1rem,3vw,2.5rem)] relative z-10">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(1rem,1.8vw,1.75rem)] items-stretch">
          
          {/* ROW 1: Card 1 (Narrative Block - 7 columns) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/[0.06] bg-[#141416]/30 p-[clamp(1.25rem,2vw,2rem)] backdrop-blur-xl flex flex-col justify-between gap-5">
            <div>
              <h2 className="font-display text-[clamp(1.75rem,3.2vw+0.2rem,2.8rem)] font-bold mb-3">
                About Me
              </h2>
              <p className="text-foreground text-[clamp(0.95rem,1.4vw,1.2rem)] font-serif italic text-white/90 leading-snug mb-2.5">
                &ldquo;I turn complex artificial intelligence into simple, lightning-fast tools that anyone can use.&rdquo;
              </p>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                Building intelligent apps that feel effortless, respond in real time, and bring ideas to life.
              </p>
            </div>
            
            {/* Direct Signal Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="rounded-xl border border-white/[0.04] bg-[#141416]/20 p-3.5">
                <div className="flex items-center gap-2 text-accent mb-1">
                  <Zap className="size-3.5 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Research</span>
                </div>
                <h4 className="text-xs md:text-sm font-semibold text-foreground">IIT Kanpur Research</h4>
                <p className="text-muted-foreground text-[11px] mt-0.5">Trained AI to create images 22% faster</p>
              </div>

              <div className="rounded-xl border border-white/[0.04] bg-[#141416]/20 p-3.5">
                <div className="flex items-center gap-2 text-accent mb-1">
                  <Terminal className="size-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Open Source</span>
                </div>
                <h4 className="text-xs md:text-sm font-semibold text-foreground">Live AI Projects</h4>
                <p className="text-muted-foreground text-[11px] mt-0.5">Open source tools published on GitHub</p>
              </div>
            </div>
          </div>

          {/* ROW 1: Card 2 (Education Block - 5 columns) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/[0.06] bg-[#141416]/30 p-[clamp(1.25rem,2vw,2rem)] backdrop-blur-xl flex flex-col justify-between gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center shrink-0">
                <GraduationCap className="size-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-0.5 text-foreground">Education</h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  GITAM University, Visakhapatnam
                </p>
                <p className="text-muted-foreground/60 text-xs mt-0.5">
                  B.Tech Computer Science &amp; Engineering
                </p>
                <p className="text-muted-foreground/45 text-[11px]">2023–Present</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.04]">
              <div className="flex items-end gap-2 mb-1.5">
                <span className="text-[clamp(2.75rem,5vw,4.5rem)] font-display font-bold text-foreground leading-none">
                  {gpa.toFixed(2)}
                </span>
                <span className="text-muted-foreground text-lg mb-1 font-medium">
                  /10
                </span>
              </div>
              <p className="text-muted-foreground text-xs font-mono tracking-wide">
                Cumulative CGPA • Latest Sem GPA: 9.73/10
              </p>
            </div>
          </div>

          {/* ROW 2: Card 3 (Windows PowerShell - 12 columns full width) */}
          <div className="lg:col-span-12 flex flex-col">
            <DevTerminal />
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
  const [userInput, setUserInput] = useState("");
  const shellRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shellRef.current) {
      const shell = shellRef.current;
      requestAnimationFrame(() => {
        shell.scrollTop = shell.scrollHeight;
      });
    }
  }, [terminalHistory, isMinimized, currentInput, isTyping, userInput]);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = userInput.trim();
    if (!trimmed) return;
    executeCommand(trimmed);
    setUserInput("");
  };

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
      output = <GPALoader />;
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
              <span className="text-white font-bold">Repository Hub:</span> GitHub &amp; Hugging Face Spaces
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
                <span className="text-[#16C60C] font-bold select-none">[active]</span> genai-assistant (RAG Engine)
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-1 w-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16C60C] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1 w-1 bg-[#16C60C]"></span>
                </span>
                <span className="text-[#16C60C] font-bold select-none">[active]</span> Object-Detection (Live Web Vision)
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-1 w-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16C60C] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1 w-1 bg-[#16C60C]"></span>
                </span>
                <span className="text-[#16C60C] font-bold select-none">[active]</span> image-gen (Diffusion Pipeline)
              </div>
            </div>
          </div>
        </div>
      );
    } else if (normalizedCmd === "help" || normalizedCmd === "h" || normalizedCmd === "?") {
      output = (
        <div className="space-y-1.5 font-mono text-[10px] text-[#CCCCCC] select-none">
          <div className="text-[#F9F1A5] font-bold border-b border-white/[0.06] pb-1">AVAILABLE POWERSHELL CMDLETS:</div>
          <div>• <span className="text-white font-semibold">Get-Content gpa.txt</span> - Display certified GPA transcripts.</div>
          <div>• <span className="text-white font-semibold">Get-Content research.txt</span> - View IIT Kanpur GenAI research telemetry.</div>
          <div>• <span className="text-white font-semibold">Get-Content stack.txt</span> - Review live ML deployment stack nodes.</div>
          <div>• <span className="text-white font-semibold">Clear-Host</span> - Clear the terminal session log.</div>
          <div className="text-white/40 mt-1">You can type these cmdlets directly or click the buttons below!</div>
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
      onClick={() => inputRef.current?.focus()}
      className="rounded-2xl border border-white/15 bg-[#0C0C0C]/90 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(0,0,0,0.85)] p-4 md:p-5 font-mono text-xs overflow-hidden flex flex-col justify-between text-[#CCCCCC] backdrop-blur-xl transition-shadow duration-500 cursor-text"
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
              {isTyping ? (
                <div className="text-[#CCCCCC] flex items-start gap-1 select-none">
                  <span className="text-[#CCCCCC] shrink-0">PS C:\Users\rajeev&gt; </span>
                  <span className="text-white flex items-center font-bold">
                    {currentInput}
                    <span className="w-1.5 h-3 bg-white animate-pulse ml-0.5" />
                  </span>
                </div>
              ) : (
                <form onSubmit={handleInputSubmit} className="text-[#CCCCCC] flex items-center gap-1 w-full" onClick={(e) => e.stopPropagation()}>
                  <span className="text-[#CCCCCC] shrink-0 select-none">PS C:\Users\rajeev&gt; </span>
                  <div className="relative flex-1 flex items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="bg-transparent border-none outline-none text-white font-bold font-mono text-[10px] w-full p-0 focus:ring-0 focus:border-none focus:outline-none placeholder-white/10"
                      placeholder="Type a cmdlet (e.g. cat gpa.txt, help) and press Enter..."
                    />
                  </div>
                </form>
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

function GPALoader() {
  const [semProgress, setSemProgress] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [finished, setFinished] = useState<boolean[]>([false, false, false, false, false, false]);

  useEffect(() => {
    let currentSemIdx = 0;
    const targets = [8, 9, 9, 9, 9, 10]; // target green blocks

    const interval = setInterval(() => {
      setSemProgress((prev) => {
        const next = [...prev];
        if (currentSemIdx > 5) {
          clearInterval(interval);
          return prev;
        }

        if (next[currentSemIdx] < targets[currentSemIdx]) {
          next[currentSemIdx] += 1;
          return next;
        } else {
          setFinished((prevFin) => {
            const nextFin = [...prevFin];
            nextFin[currentSemIdx] = true;
            return nextFin;
          });
          if (currentSemIdx < 5) {
            currentSemIdx += 1;
            next[currentSemIdx] += 1;
            return next;
          } else {
            clearInterval(interval);
            return prev;
          }
        }
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const semData = [
    { name: "SEM_01", val: "8.60" },
    { name: "SEM_02", val: "9.38" },
    { name: "SEM_03", val: "9.30" },
    { name: "SEM_04", val: "9.38" },
    { name: "SEM_05", val: "9.17" },
    { name: "SEM_06", val: "9.73" },
  ];

  return (
    <div className="space-y-2 font-mono text-[10px] text-[#CCCCCC]">
      <div className="text-[#F9F1A5] font-extrabold tracking-wider border-b border-white/[0.06] pb-1.5 select-none">
        TELEMETRY: GPA PROGRESS ARCHIVES [DOWNLOADING...]
      </div>

      {semData.map((sem, idx) => {
        const progress = semProgress[idx];
        const isCompleted = finished[idx] || progress >= (idx === 5 ? 10 : [8, 9, 9, 9, 9, 10][idx]);
        const isActive = !isCompleted && progress > 0;

        return (
          <div key={sem.name} className="flex items-center gap-4">
            <span className="text-white/40 text-[9px] w-12 select-none">{sem.name}:</span>
            <span className="text-[#16C60C] font-bold tracking-widest text-xs select-none">
              {"■".repeat(progress)}
              <span className="text-white/10">
                {"■".repeat(10 - progress)}
              </span>
            </span>
            {isCompleted ? (
              <span className="text-right text-[#16C60C] font-semibold text-[10px] ml-auto">
                {sem.val}
              </span>
            ) : isActive ? (
              <span className="text-right text-[#F9F1A5] font-bold text-[9px] ml-auto animate-pulse">
                DOWNLOADING...
              </span>
            ) : (
              <span className="text-right text-white/20 text-[9px] ml-auto select-none">
                QUEUED
              </span>
            )}
          </div>
        );
      })}

      <div className="text-white/50 border-t border-white/[0.06] pt-2 flex justify-between items-center select-none">
        <span>CUMULATIVE CGPA:</span>
        {finished[5] ? (
          <span className="text-white bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded shadow-[0_0_8px_rgba(255,255,255,0.05)] font-extrabold text-[11px] animate-bounce">
            9.24 / 10.0
          </span>
        ) : (
          <span className="text-white/30 font-bold text-[9px] animate-pulse">
            CALCULATING...
          </span>
        )}
      </div>
    </div>
  );
}