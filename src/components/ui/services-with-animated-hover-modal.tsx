"use client";
import gsap from "gsap";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  techStack: string;
  color: string;
  image?: string;
  link?: string;
  github?: string;
}

interface ProjectsWithAnimatedHoverModalProps {
  projects: Project[];
  className?: string;
}

const scaleAnimation = {
  closed: {
    scale: 0,
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
    x: "-50%",
    y: "-50%",
  },
  enter: {
    scale: 1,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    x: "-50%",
    y: "-50%",
  },
  initial: { scale: 0, x: "-50%", y: "-50%" },
};

export function ProjectsWithAnimatedHoverModal({
  projects,
  className,
}: ProjectsWithAnimatedHoverModalProps) {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <div className={cn("py-[clamp(3.5rem,6vw,6.5rem)] overflow-hidden bg-transparent", className)}>
      <div className="mx-auto max-w-[min(92vw,1440px)] px-[clamp(1rem,3vw,2.5rem)]">
        <div className="flex flex-col md:flex-row justify-between mb-[clamp(2rem,3.5vw,3.5rem)] gap-6">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw+0.5rem,3.2rem)] font-bold tracking-tight">
            Projects.
          </h2>
          <p className="max-w-md text-xs md:text-sm text-muted-foreground leading-relaxed">
            A collection of work exploring the intersection of artificial intelligence, high-performance web systems, and data science.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          {projects.map((project, index) => (
            <ProjectItem
              key={project.title}
              index={index}
              setModal={setModal}
              project={project}
            />
          ))}
        </div>
      </div>
      <ProjectModal modal={modal} projects={projects} />
    </div>
  );
}

function ProjectItem({
  index,
  project,
  setModal,
}: {
  index: number;
  project: Project;
  setModal: (modal: { active: boolean; index: number }) => void;
}) {
  const primaryLink = project.link || project.github;
  const hasLinks = project.link || project.github;

  const handleProjectClick = () => {
    if (primaryLink) {
      window.open(primaryLink, "_blank");
    }
  };

  return (
    <div
      className="group flex w-full cursor-pointer items-center justify-between border-white/[0.08] border-t px-[clamp(0.75rem,2vw,2rem)] py-[clamp(1rem,1.8vw,1.6rem)] transition-all duration-200 last:border-b hover:bg-white/[0.02]"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      onClick={handleProjectClick}
      data-cursor-hover="true"
    >
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <h3 className="m-0 font-display font-medium text-[clamp(1.05rem,1.8vw+0.2rem,2rem)] text-foreground transition-all duration-300 group-hover:translate-x-2 truncate">
          {project.title}
        </h3>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-muted-foreground hover:text-white transition-colors shrink-0"
            data-cursor-hover="true"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="size-3.5" />
            <span className="text-[11px] font-mono">Code</span>
          </a>
        )}
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <p className="font-mono text-[clamp(0.68rem,0.9vw,0.82rem)] text-muted-foreground/75 transition-all duration-300 group-hover:translate-x-1 hidden md:block">
          {project.techStack}
        </p>
        {hasLinks && <ArrowUpRight className="size-4 md:size-5 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1" />}
      </div>
    </div>
  );
}

function ProjectModal({
  modal,
  projects,
}: {
  modal: { active: boolean; index: number };
  projects: Project[];
}) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none absolute flex h-[22rem] md:h-87.5 w-[22rem] md:w-100 items-center justify-center overflow-hidden bg-white z-50"
        initial="initial"
        ref={modalContainer}
        variants={scaleAnimation}
      >
        <div
          className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: `${index * -100}%` }}
        >
          {projects.map((project, idx) => (
            <div
              className="flex h-full w-full items-center justify-center"
              key={project.title}
              style={{ backgroundColor: project.color }}
            >
              {project.image && (
                <img
                  alt={project.title}
                  className="h-auto max-w-full max-h-full object-contain"
                  src={project.image}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none absolute z-50 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-foreground font-light text-xs md:text-sm text-background"
        initial="initial"
        ref={cursor}
        variants={scaleAnimation}
      />
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none absolute z-50 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-transparent font-light text-xs md:text-sm text-background"
        initial="initial"
        ref={cursorLabel}
        variants={scaleAnimation}
      >
        View
      </motion.div>
    </>
  );
}