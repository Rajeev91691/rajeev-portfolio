"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Cpu, Layers, Briefcase, Mail } from "lucide-react";
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollActive = () => {
      const sections = ["about", "skills", "projects", "experience", "contact"];
      
      // If reached the absolute bottom of the viewport, force highlight the last section (Contact)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // Track active section relative to 1/3 height of the viewport
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (!el) continue;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScrollActive);
    handleScrollActive();

    return () => window.removeEventListener("scroll", handleScrollActive);
  }, []);

  const navLinks = [
    { href: "#about", label: "About", icon: User },
    { href: "#skills", label: "Skills", icon: Cpu },
    { href: "#projects", label: "Projects", icon: Layers },
    { href: "#experience", label: "Experience", icon: Briefcase },
    { href: "#contact", label: "Contact", icon: Mail },
  ];

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isExpanded = !scrolled || isHovered;

  return (
    <>
      {/* DESKTOP SINGULARITY DOCK */}
      <div className="hidden md:block fixed top-6 left-0 right-0 z-50 px-6">
        <motion.nav
          layout
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 28,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "mx-auto flex items-center border border-white/10 bg-black/55 backdrop-blur-md shadow-2xl",
            isExpanded
              ? "w-full max-w-5xl rounded-full px-6 py-3 justify-between gap-4"
              : "w-max rounded-full px-3 py-2 justify-center"
          )}
          style={{
            boxShadow: isExpanded
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 15px rgba(255, 255, 255, 0.02)"
              : "0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.04)"
          }}
        >
          {/* LOGO CONTAINER */}
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                key="logo"
                layout
                initial={{ opacity: 0, scale: 0.8, x: -15 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -15 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden flex items-center justify-start shrink-0"
              >
                <ScrambleLogo />
              </motion.div>
            )}
          </AnimatePresence>

          {/* NAV LINKS CONTAINER */}
          <motion.div layout className="flex items-center gap-1">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollClick(e, link.href)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={cn(
                    "relative px-4 py-2 text-xs uppercase font-mono tracking-widest transition-colors duration-300 z-10 shrink-0",
                    isActive ? "text-white font-bold" : "text-zinc-400 hover:text-white"
                  )}
                  data-cursor-hover="true"
                >
                  {/* Hover capsule background */}
                  {hoveredIdx === idx && (
                    <motion.span
                      layoutId="navHoverBg"
                      className="absolute inset-0 bg-white/[0.07] border border-white/5 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <span>{link.label}</span>

                  {/* Active glowing indicator light */}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveDot"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </motion.div>

          {/* CONTACT BUTTON CONTAINER */}
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                key="contact"
                layout
                initial={{ opacity: 0, scale: 0.8, x: 15 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 15 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden flex items-center justify-end shrink-0"
              >
                <Link
                  href="#contact"
                  onClick={(e) => handleScrollClick(e, "#contact")}
                  className="relative px-4 py-2 bg-white text-black text-[10px] font-mono font-bold tracking-wider rounded-full shadow-[0_0_12px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all hover:bg-black hover:text-white border border-white duration-300 overflow-hidden group select-none shrink-0"
                  data-cursor-hover="true"
                >
                  {/* Pulsing ring */}
                  <motion.span
                    className="absolute inset-0 rounded-full border border-white/40 -z-10"
                    animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  />
                  GET IN TOUCH
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* MOBILE BOTTOM COMMAND DOCK */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 px-4">
        <div className="mx-auto max-w-sm border border-white/10 bg-black/60 backdrop-blur-xl rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] py-2 px-3 flex justify-around items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            const Icon = link.icon;
            return (
              <motion.div key={link.href} whileTap={{ scale: 0.92 }} className="relative">
                <Link
                  href={link.href}
                  onClick={(e) => handleScrollClick(e, link.href)}
                  className={cn(
                    "relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-300 z-10",
                    isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  )}
                  data-cursor-hover="true"
                >
                  {/* Sliding active background on mobile */}
                  {isActive && (
                    <motion.span
                      layoutId="mobileActiveBg"
                      className="absolute inset-0 bg-white/[0.08] rounded-xl -z-10 border border-white/5"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon size={16} className={isActive ? "stroke-[2.5px]" : "stroke-[1.8px]"} />
                  <span className={cn(
                    "text-[8px] uppercase font-mono tracking-wider mt-1 select-none",
                    isActive ? "font-bold" : "font-normal"
                  )}>
                    {link.label === "Experience" ? "Exp" : link.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}