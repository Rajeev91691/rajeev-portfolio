"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

const TOTAL_SLATS = 5;

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // 60fps/120fps Butter-smooth number animation from 0 to 100
    const controls = animate(0, 100, {
      duration: 1.9,
      ease: [0.22, 1, 0.36, 1], // Custom luxury cubic-bezier easing
      onUpdate: (latest) => {
        setProgress(Math.floor(latest));
      },
      onComplete: () => {
        setProgress(100);
        const finishTimer = setTimeout(() => {
          setIsFinished(true);
        }, 300);

        const completeTimer = setTimeout(() => {
          document.body.style.overflow = "unset";
          onComplete();
        }, 1100);

        return () => {
          clearTimeout(finishTimer);
          clearTimeout(completeTimer);
        };
      },
    });

    return () => {
      controls.stop();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden">
      {/* 5 Vertical Staggered Column Shutter Slats */}
      <div className="absolute inset-0 flex w-full h-full">
        {Array.from({ length: TOTAL_SLATS }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "0%" }}
            animate={isFinished ? { y: "-100%" } : { y: "0%" }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: i * 0.08,
            }}
            className="flex-1 h-full bg-[#08080A] border-r border-white/[0.03] last:border-r-0"
          />
        ))}
      </div>

      {/* Central Typographic Counter */}
      <AnimatePresence>
        {!isFinished && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: -25,
              transition: { duration: 0.35, ease: "easeInOut" },
            }}
            className="absolute inset-0 flex flex-col items-center justify-between py-16 md:py-24 px-8 text-white z-10"
          >
            {/* Top Monogram */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs tracking-widest uppercase text-white/60">
                Rajeev Nandan · 2026
              </span>
            </div>

            {/* Giant Central Swiss Number with Continuous Interpolation */}
            <div className="flex flex-col items-center">
              <div className="flex items-baseline font-mono">
                <span className="text-7xl sm:text-9xl md:text-[11rem] font-extrabold tracking-tighter text-white tabular-nums leading-none drop-shadow-2xl">
                  {progress.toString().padStart(2, "0")}
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-light text-accent ml-2">
                  %
                </span>
              </div>
              <div className="w-36 h-[2px] bg-white/10 rounded-full overflow-hidden mt-6">
                <div
                  className="h-full bg-accent transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Bottom Subtitle */}
            <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase flex items-center gap-4">
              <span>DESIGN &amp; AI ENGINEERING</span>
              <span>•</span>
              <span>SCROLL TO EXPLORE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
