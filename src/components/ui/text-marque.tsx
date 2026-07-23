"use client";
import { useRef, useEffect, forwardRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "motion/react";
import { wrap } from "@motionone/utils";
import { cn } from "@/lib/utils";

interface TextMarqueeProps {
  children: string;
  baseVelocity?: number;
  className?: string;
  scrollDependent?: boolean;
  delay?: number;
}

const TextMarquee = forwardRef<HTMLDivElement, TextMarqueeProps>(({
  children,
  baseVelocity = -5,
  className,
  scrollDependent = false,
  delay = 0,
}, ref) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false,
  });

  // Since we render 2 identical copies, translating from 0% to -50% is mathematically seamless
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  const hasStarted = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      hasStarted.current = true;
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useAnimationFrame((t, delta) => {
    if (!hasStarted.current) return;

    // Use a small velocity threshold to prevent micro-fluctuations from shaking the direction
    if (scrollDependent) {
      const vel = velocityFactor.get();
      if (vel < -0.05) {
        directionFactor.current = -1;
      } else if (vel > 0.05) {
        directionFactor.current = 1;
      }
    }

    // Smoothly scale the speed based on scroll velocity
    const speedMultiplier = 1 + Math.abs(velocityFactor.get()) * 1.5;
    const moveBy = directionFactor.current * baseVelocity * (delta / 1000) * speedMultiplier;

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div 
      ref={ref} 
      className="overflow-hidden whitespace-nowrap flex flex-nowrap w-full" 
      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
    >
      <motion.div
        className="flex whitespace-nowrap gap-20 flex-nowrap w-max"
        style={{ x }}
      >
        <span className={cn("block text-[8vw] shrink-0", className)}>{children} &nbsp;&nbsp;•&nbsp;&nbsp;</span>
        <span className={cn("block text-[8vw] shrink-0", className)}>{children} &nbsp;&nbsp;•&nbsp;&nbsp;</span>
      </motion.div>
    </div>
  );
});

TextMarquee.displayName = "TextMarquee";

export default TextMarquee;