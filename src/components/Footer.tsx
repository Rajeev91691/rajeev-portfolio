"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

function ScrambleLogo() {
  const text = "RAJEEV NANDAN.D";
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let frames = 0;
    const maxFrames = 15;
    const chars = "X01&$%#@!?+=*{}[]<>";

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      frames++;
      const progress = frames / maxFrames;
      const revealCount = Math.floor(progress * text.length);

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " " || char === ".") return char;
          if (index < revealCount) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (frames >= maxFrames) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 45);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Link
      href="/"
      className="font-mono text-xs tracking-widest font-extrabold text-white flex items-center gap-2 select-none"
      onMouseEnter={triggerScramble}
      data-cursor-hover="true"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      <span>{displayText}</span>
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [isBackHovered, setIsBackHovered] = useState(false);

  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Rajeev91691",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/rajeev-nandan-d-59b367293",
      icon: Linkedin,
    },
    {
      name: "Certifications",
      href: "https://github.com/Rajeev91691/Certifications",
      icon: ExternalLink,
    },
  ];

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-transparent py-24 relative overflow-hidden select-none">
      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-0"
        style={{
          height: "400px",
          background: "linear-gradient(to top, rgba(12,12,12,1) 0%, rgba(12,12,12,0.4) 60%, rgba(12,12,12,0) 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Brand & Node Status (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/[0.06] bg-[#141416]/20 p-8 backdrop-blur-xl flex flex-col justify-between gap-8 hover:border-white/15 transition-all duration-500 group">
            <div className="space-y-4">
              <ScrambleLogo />
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest leading-relaxed">
                Engineering Neural Inference Pipelines at the intersection of AI
                and Web Development.
              </p>
            </div>

            <div className="space-y-3 font-mono text-[9px] text-zinc-500 uppercase tracking-widest border-t border-white/5 pt-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                </span>
                <span>System: Serv_Neural_Inference</span>
              </div>
              <div>Node: GITAM CSE · Visakhapatnam</div>
              <div>Status: open_to_opportunities</div>
              <div className="text-zinc-700 font-semibold tracking-widest font-serif lowercase italic pt-1">
                G_μν + Λ g_μν = 8πG/c⁴ T_μν
              </div>
            </div>
          </div>

          {/* Card 2: Warp Navigation (3 cols) */}
          <div className="lg:col-span-3 rounded-3xl border border-white/[0.06] bg-[#141416]/20 p-8 backdrop-blur-xl flex flex-col hover:border-white/15 transition-all duration-500">
            <h3 className="font-mono text-[10px] tracking-widest text-zinc-500 font-bold uppercase mb-6">
              WARP DIRECTORY
            </h3>
            <div className="flex flex-col gap-1">
              {links.map((link, idx) => (
                <motion.div key={link.href} whileHover={{ x: 6 }} className="group">
                  <Link
                    href={link.href}
                    onClick={(e) => handleScrollClick(e, link.href)}
                    className="flex items-center gap-3 text-zinc-400 group-hover:text-white text-xs font-mono uppercase tracking-widest transition-colors duration-300 py-1.5"
                    data-cursor-hover="true"
                  >
                    <span className="text-[9px] text-zinc-600 font-bold group-hover:text-white/50 transition-colors">
                      [0{idx + 1}]
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Card 3: Connect & Transmit (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl border border-white/[0.06] bg-[#141416]/20 p-8 backdrop-blur-xl flex flex-col justify-between gap-6 hover:border-white/15 transition-all duration-500">
            <div>
              <h3 className="font-mono text-[10px] tracking-widest text-zinc-500 font-bold uppercase mb-6">
                CONNECT & TRANSMIT
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/15 text-zinc-400 hover:text-white transition-all duration-300 group"
                      data-cursor-hover="true"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-4 text-zinc-500 group-hover:text-white transition-colors" />
                        <span className="text-[10px] font-mono uppercase tracking-widest">{link.name}</span>
                      </div>
                      <span className="text-[8px] text-zinc-600 group-hover:text-white/80 font-mono tracking-widest transition-all translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300 select-none">
                        TRANSMIT ↗
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Accretion Disk and Copyright */}
        <div className="w-full h-px bg-white/5 my-16 flex justify-center items-center relative">
          <div className="absolute">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              onMouseEnter={() => setIsBackHovered(true)}
              onMouseLeave={() => setIsBackHovered(false)}
              className="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black hover:border-white/40 transition-colors group shadow-2xl z-20"
              data-cursor-hover="true"
            >
              {/* Accretion disk spinning rings */}
              <motion.span
                className="absolute inset-0.5 rounded-full border border-dashed border-white/20"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: isBackHovered ? 2.5 : 12,
                  ease: "linear"
                }}
              />
              <motion.span
                className="absolute -inset-1 rounded-full border border-double border-white/5 opacity-50 group-hover:opacity-100"
                animate={{ rotate: -360 }}
                transition={{
                  repeat: Infinity,
                  duration: isBackHovered ? 4.5 : 24,
                  ease: "linear"
                }}
              />
              <ArrowUp size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
            </motion.button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-widest leading-relaxed">
            &copy; {year} RAJEEV NANDAN D. SERVING INFERENCE IN REAL-TIME. BUILT WITH NEXT.JS, THREE.JS & FRAMER MOTION.
          </p>
        </div>
      </div>
    </footer>
  );
}