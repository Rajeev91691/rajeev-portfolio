"use client";

import { useEffect, useRef } from "react";

export default function SpacetimeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const SPACING = 40;
    const INFLUENCE_RADIUS = 240;
    const GRAVITY_STRENGTH = 0.75;
    const EASE = 0.15;

    let cols = Math.ceil(width / SPACING) + 2;
    let rows = Math.ceil(height / SPACING) + 2;

    interface Node {
      x0: number;
      y0: number;
      x: number;
      y: number;
    }

    let nodes: Node[][] = [];

    const initNodes = () => {
      cols = Math.ceil(width / SPACING) + 2;
      rows = Math.ceil(height / SPACING) + 2;
      nodes = [];
      for (let i = 0; i < cols; i++) {
        nodes[i] = [];
        for (let j = 0; j < rows; j++) {
          const x0 = (i - 1) * SPACING;
          const y0 = (j - 1) * SPACING;
          nodes[i][j] = { x0, y0, x: x0, y: y0 };
        }
      }
    };

    initNodes();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const currentCols = Math.ceil(width / SPACING) + 2;
      const currentRows = Math.ceil(height / SPACING) + 2;
      if (currentCols !== cols || currentRows !== rows) {
        initNodes();
      }

      const mouse = mouseRef.current;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const node = nodes[i][j];
          let targetX = node.x0;
          let targetY = node.y0;

          if (mouse.active) {
            const dx = mouse.x - node.x0;
            const dy = mouse.y - node.y0;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < INFLUENCE_RADIUS) {
              const force = Math.pow(1 - dist / INFLUENCE_RADIUS, 2);
              targetX = node.x0 + dx * force * GRAVITY_STRENGTH;
              targetY = node.y0 + dy * force * GRAVITY_STRENGTH;
            }
          }

          node.x += (targetX - node.x) * EASE;
          node.y += (targetY - node.y) * EASE;
        }
      }

      ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
      ctx.lineWidth = 1;

      for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          const node = nodes[i][j];
          if (j === 0) {
            ctx.moveTo(node.x, node.y);
          } else {
            ctx.lineTo(node.x, node.y);
          }
        }
        ctx.stroke();
      }

      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        for (let i = 0; i < cols; i++) {
          const node = nodes[i][j];
          if (i === 0) {
            ctx.moveTo(node.x, node.y);
          } else {
            ctx.lineTo(node.x, node.y);
          }
        }
        ctx.stroke();
      }

      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-background"
    />
  );
}
