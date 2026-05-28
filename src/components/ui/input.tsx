"use client";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface AnimatedInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  className?: string;
}

export function AnimatedInput({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  textarea = false,
  className = "",
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const hasValue = value.length > 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative rounded-xl border border-white/[0.08] bg-white/[0.01] transition-all duration-300 focus-within:border-accent/40 focus-within:bg-white/[0.02]",
        className
      )}
    >
      {/* 21st.dev Mouse Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              120px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative p-4 md:p-5 flex flex-col">
        {/* Animated Floating Label */}
        <span
          className={cn(
            "pointer-events-none select-none text-muted-foreground text-sm font-medium transition-all duration-300 origin-left",
            (isFocused || hasValue) 
              ? "text-xs text-accent transform -translate-y-2 scale-90" 
              : "transform translate-y-2 scale-100 text-sm"
          )}
        >
          {label}
        </span>

        {textarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused ? placeholder : ""}
            rows={4}
            className="w-full bg-transparent border-0 p-0 mt-1 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-0 text-sm md:text-base resize-none"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused ? placeholder : ""}
            className="w-full bg-transparent border-0 p-0 mt-1 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-0 text-sm md:text-base"
          />
        )}
      </div>
    </div>
  );
}