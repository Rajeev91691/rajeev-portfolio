"use client";

import React, { useState, useEffect, useRef } from "react";

export const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointerPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const currentAngle = useRef(0);
  const targetAngle = useRef(0);
  const isHoveredRef = useRef(false);
  const requestRef = useRef<number>();

  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setVisible(true);
      const prevX = pointerPos.current.x;
      const prevY = pointerPos.current.y;
      
      pointerPos.current = { x: e.clientX, y: e.clientY };

      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Subtle dynamic angle rotation based on velocity
      if (speed > 2) {
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        targetAngle.current = angle - 45; // Align default 45deg arrow orientation
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover='true']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("[role='button']")
      );

      isHoveredRef.current = isInteractive;
      setIsHovered(isInteractive);
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    // Smooth physics loop
    const animate = () => {
      const targetX = pointerPos.current.x;
      const targetY = pointerPos.current.y;

      // Position lerp
      currentPos.current.x += (targetX - currentPos.current.x) * 0.22;
      currentPos.current.y += (targetY - currentPos.current.y) * 0.22;

      // Angle lerp
      const angleDiff = targetAngle.current - currentAngle.current;
      currentAngle.current += angleDiff * 0.15;

      if (cursorRef.current) {
        const x = currentPos.current.x;
        const y = currentPos.current.y;
        const scale = isHoveredRef.current ? 1.35 : 1;
        const rot = isHoveredRef.current ? 0 : currentAngle.current;

        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rot}deg)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transformOrigin: "center center",
      }}
      aria-hidden="true"
    >
      {/* NexStudio Fluid Arrow Pointer */}
      <div className="relative -top-2.5 -left-2.5 flex items-center justify-center">
        {/* Glow halo on hover */}
        {isHovered && (
          <span className="absolute size-9 rounded-full bg-white/20 blur-sm -z-10 animate-pulse" />
        )}
        
        {/* Crisp Vector Arrow Glyph */}
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] filter transition-colors duration-200"
        >
          {/* NexStudio Fluid Arrowhead Contour */}
          <path
            d="M3.5 2.5L20.5 9.5L12 12.5L9.5 20.5L3.5 2.5Z"
            stroke="black"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Cursor;
