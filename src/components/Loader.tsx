"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusLines = [
    "INITIALIZING SYSTEM ARCHITECTURE...",
    "LOADING NEURAL INFERENCE ENGINE...",
    "COALESCING 3D RENDERING CONTEXT...",
    "SYNCING DATA RETRIEVAL PIPELINES...",
    "DEPLOYING VISUAL CORRIDORS...",
    "SYSTEM STABLE. READY."
  ];

  useEffect(() => {
    // Disable scrolling when loader is active
    document.body.style.overflow = "hidden";

    // Progress counter simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random incremental step to feel organic and progressive
        const increment = Math.floor(Math.random() * 8) + 2;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Cycle statuses based on progress milestones
    if (progress < 20) setStatusIndex(0);
    else if (progress < 45) setStatusIndex(1);
    else if (progress < 65) setStatusIndex(2);
    else if (progress < 85) setStatusIndex(3);
    else if (progress < 98) setStatusIndex(4);
    else setStatusIndex(5);

    if (progress === 100) {
      const timer = setTimeout(() => {
        // Re-enable scrolling on completion
        document.body.style.overflow = "unset";
        onComplete();
      }, 700); // Small buffer for the user to see the "READY" state
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100vh", 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white font-mono select-none"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-[85%] max-w-md space-y-6 z-10">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 text-[10px] text-white/30 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>RAJEEV_NANDAN // BOOT_SEQUENCE</span>
        </div>

        {/* Dynamic Status Text */}
        <div className="h-6 flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusLines[statusIndex]}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[11px] text-white/70 tracking-wider font-mono flex items-center"
            >
              <span className="text-white/40 mr-2">&gt;</span>
              {statusLines[statusIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar Container */}
        <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Progress Value Counter */}
        <div className="flex justify-between items-end">
          <span className="text-[10px] text-white/30 tracking-wider uppercase">CORE_LOAD_ACTIVE</span>
          <span className="text-4xl font-extrabold tracking-tighter text-white tabular-nums select-none font-mono">
            {progress.toString().padStart(3, "0")}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
