"use client";

import { ProjectsWithAnimatedHoverModal } from "@/components/ui/services-with-animated-hover-modal";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Insight GPT",
      description: "Production-ready RAG engine using FAISS to index 500+ complex PDFs (~80K pages) with custom semantic caching for sub-35% latency reductions.",
      techStack: "Next.js, Python, FAISS, PyTorch",
      color: "#1a1a2e",
      image: "/assets/images/insight_gpt.png",
      link: "https://huggingface.co/spaces/Rajeev91691/genai-assistant",
      github: "https://github.com/Rajeev91691/genai-assistant",
    },
    {
      title: "Edge Object Detector",
      description: "Real-time client-side object detection using DETR-ResNet-50 processing webcam streams at 15 FPS with <100ms in-browser latency.",
      techStack: "React, DETR, PyTorch, Quantization",
      color: "#16213e",
      image: "/assets/images/edge_object_detector.png",
      link: "https://huggingface.co/spaces/Rajeev91691/Object-Detection",
      github: "https://github.com/Rajeev91691/obejct-detector",
    },
    {
      title: "Facial Emotion Classifier",
      description: "High-accuracy facial emotion recognition model utilizing customized deep convolutional neural networks for active expression classification.",
      techStack: "Python, PyTorch, OpenCV, CNN",
      color: "#0f3460",
      image: "/assets/images/facial_emotion_classifier.png",
      github: "https://github.com/Rajeev91691/emotion-detector",
    },
    {
      title: "Latent Diffusion Generator",
      description: "Text-to-image pipeline generating high-fidelity 512x512px images from natural prompts with average latency <2 seconds, achieving 0.78 CLIP alignment.",
      techStack: "Python, PyTorch, Hugging Face, Gradio",
      color: "#1a1a2e",
      image: "/assets/images/latent_diffusion_generator.png",
      link: "https://huggingface.co/spaces/Rajeev91691/image-gen",
      github: "https://github.com/Rajeev91691/image-gen-app",
    },
    {
      title: "3D Dark-Ambient Showcase",
      description: "Premium, scroll-scrubbed developer showcase featuring custom ambient particle fields, video scrubbing, and GSAP ScrollTrigger animations.",
      techStack: "Next.js, Three.js, GSAP, Tailwind",
      color: "#0f3460",
      image: "/assets/images/dark_ambient_showcase.png",
      link: "https://github.com/Rajeev91691/3d-professional-portfolio",
      github: "https://github.com/Rajeev91691/3d-professional-portfolio",
    },
    {
      title: "Customer Segment Analytics",
      description: "Demographic and behavioral customer classification engine utilizing Scikit-learn to discover and target high-yield marketing audiences.",
      techStack: "Python, Pandas, Scikit-learn, Jupyter",
      color: "#1a1a2e",
      image: "/assets/images/customer_segment_analytics.png",
      github: "https://github.com/Rajeev91691/BankMarketing-CaseStudy",
    },
  ];

  return (
    <section id="projects" className="bg-transparent">
      <ProjectsWithAnimatedHoverModal projects={projects} />
    </section>
  );
}