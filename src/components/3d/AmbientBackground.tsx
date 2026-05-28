"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let particles: THREE.Points;
    let animationId: number;

    const init = () => {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 50;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const particleCount = 2000;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;

        const gray = 0.3 + Math.random() * 0.3;
        colors[i] = gray;
        colors[i + 1] = gray;
        colors[i + 2] = gray;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);

      const animate = () => {
        animationId = requestAnimationFrame(animate);

        if (particles) {
          particles.rotation.x += 0.0001;
          particles.rotation.y += 0.0002;

          const positions = particles.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i] * 0.05) * 0.01;
          }
          particles.geometry.attributes.position.needsUpdate = true;

          camera.position.x += (mouseX * 10 - camera.position.x) * 0.02;
          camera.position.y += (mouseY * 10 - camera.position.y) * 0.02;
          camera.lookAt(scene.position);
        }

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
      };
    };

    const cleanup = init();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      if (particles) {
        particles.geometry.dispose();
        (particles.material as THREE.Material).dispose();
      }
      cleanup && cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform" }}
      aria-hidden="true"
    />
  );
}