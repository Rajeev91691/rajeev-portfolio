"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NexScrollArrowProps {
  targetId: string;
  className?: string;
  label?: string;
}

export function NexScrollArrow({
  targetId,
  className,
  label = "Scroll to next section",
}: NexScrollArrowProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (!target) return;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: Element | string, opts?: { offset?: number; duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -30, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      aria-label={label}
      data-cursor-hover="true"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className={cn(
        "group relative flex items-center justify-center size-11 md:size-12 rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:border-white/40 hover:bg-white/[0.08] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {/* Outer subtle glow ring on hover */}
      <span className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Signature NexStudio Linear Arrow */}
      <svg
        viewBox="0 0 24 24"
        className="size-5 md:size-5.5 text-current animate-arrow-drift transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M12 4.5v15M6.5 14l5.5 5.5 5.5-5.5" />
      </svg>
    </motion.button>
  );
}

export default NexScrollArrow;
