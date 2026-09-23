"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "experience", "contact"];
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;

      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  const handleScrollClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <nav className="pointer-events-auto max-w-[95vw] overflow-x-auto no-scrollbar flex items-center gap-1 sm:gap-2 rounded-full border border-white/[0.08] bg-[#0E0E10]/75 px-2.5 sm:px-4 py-1.5 sm:py-2 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all">
        
        {/* Navigation Links */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
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
                  "relative px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium transition-colors duration-200 rounded-full shrink-0",
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                )}
                data-cursor-hover="true"
              >
                {/* Smooth Floating Active Pill */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.12] -z-10 shadow-sm"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {/* Subtle Hover Highlight */}
                {hoveredIdx === idx && !isActive && (
                  <motion.span
                    layoutId="hoverNavPill"
                    className="absolute inset-0 rounded-full bg-white/[0.04] -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Clean Action Button */}
        <a
          href="/Rajeev_Nandan_Damarla_Resume.pdf"
          download
          className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#0A0A0C] text-xs font-semibold hover:bg-white/90 transition-all shadow-md active:scale-95"
          data-cursor-hover="true"
        >
          <span>Resume</span>
          <span className="text-[10px]">↓</span>
        </a>

      </nav>
    </header>
  );
}