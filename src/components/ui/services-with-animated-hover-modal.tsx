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
    <div className={cn("py-24 md:py-32 overflow-hidden bg-transparent", className)}>
      <div className="mx-auto max-w-7xl px-5 md:px-0">
        <div className="flex flex-col md:flex-row justify-between mb-16 gap-8">
          <h2 className="font-display text-5xl md:text-7xl tracking-tight">
            Projects.
          </h2>
          <p className="max-w-md font-medium text-muted-foreground">
            A collection of work exploring the intersection of AI, web
            development, and data science.
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
      className="group flex w-full cursor-pointer items-center justify-between border-[rgb(50,50,50)] border-t px-5 md:px-25 py-8 md:py-12.5 transition-all duration-200 last:border-b hover:opacity-50"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      onClick={handleProjectClick}
      data-cursor-hover="true"
    >
      <div className="flex items-center gap-4">
        <h2 className="m-0 font-normal text-3xl md:text-6xl transition-all duration-300 group-hover:translate-x-2.5">
          {project.title}
        </h2>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-muted-foreground/60 hover:text-white transition-colors"
            data-cursor-hover="true"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="size-4" />
            <span className="text-xs font-medium">Code</span>
          </a>
        )}
      </div>
      <div className="flex items-center gap-4">
        <p className="font-light text-sm md:text-base transition-all duration-300 group-hover:translate-x-2.5 hidden md:block">
          {project.techStack}
        </p>
        {hasLinks && <ArrowUpRight className="size-5 md:size-6 transition-all duration-300 group-hover:translate-x-2.5 group-hover:-translate-y-2.5" />}
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