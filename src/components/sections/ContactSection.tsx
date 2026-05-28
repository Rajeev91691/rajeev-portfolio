"use client";

import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Globe, Award } from "lucide-react";
import { AnimatedInput } from "@/components/ui/input";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      detail: "rajeevnandan382@gmail.com",
      href: "mailto:rajeevnandan382@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      detail: "+91 9481509488",
      href: "tel:+919481509488",
    },
    {
      icon: MapPin,
      title: "Location",
      detail: "Visakhapatnam, India",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/rajeev-nandan-d-59b367293",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/Rajeev91691",
      icon: Github,
    },
    {
      name: "Hugging Face",
      href: "https://huggingface.co/Rajeev91691",
      icon: Globe,
    },
    {
      name: "Certifications",
      href: "https://github.com/Rajeev91691/Certifications",
      icon: Award,
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-transparent relative overflow-hidden"
    >

      <div className="noise-overlay" />
      <div className="dot-grid absolute inset-0 opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent tracking-tight">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Have a project in mind, looking to hire, or simply want to say hello? I&apos;m always open to discussing new opportunities.
          </p>
        </div>

        {/* 21st.dev Premium Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Bento: Info Cards and Social Buttons (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Header Bento Box */}
            <div className="rounded-3xl border border-white/[0.06] bg-[#141414]/25 p-8 backdrop-blur-xl flex flex-col justify-between min-h-[160px]">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Connect Directly</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Skip the form if you prefer. My inbox is always open for direct inquiries.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-accent/80">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                <span>Response time within 24 hours</span>
              </div>
            </div>

            {/* Info Cards Column */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((info, index) => (
                <ContactInfoCard key={index} info={info} />
              ))}
            </div>

            {/* Socials Bento Box */}
            <div className="rounded-3xl border border-white/[0.06] bg-[#141414]/20 p-6 backdrop-blur-xl flex flex-col gap-4">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Follow On Socials
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300"
                      data-cursor-hover="true"
                    >
                      <Icon className="size-4" />
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Bento: Clean Message Form Card (7 columns) */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-3xl border border-white/[0.06] bg-[#141414]/25 p-8 md:p-10 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[20rem] h-[20rem] rounded-full bg-accent/2 blur-[80px] pointer-events-none" />

              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Send a Message</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  Fill in the details below, and I&apos;ll get back to you to start our conversation.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <AnimatedInput
                    label="Your Name"
                    value={formData.name}
                    onChange={(value) => setFormData({ ...formData, name: value })}
                    type="text"
                  />
                  <AnimatedInput
                    label="Your Email"
                    value={formData.email}
                    onChange={(value) => setFormData({ ...formData, email: value })}
                    type="email"
                  />
                  <AnimatedInput
                    label="Your Message"
                    value={formData.message}
                    onChange={(value) =>
                      setFormData({ ...formData, message: value })
                    }
                    textarea
                  />
                  
                  <button
                    type="submit"
                    className="relative group w-full md:w-auto overflow-hidden px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    data-cursor-hover="true"
                  >
                    {/* Glowing effect inside the button */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/60 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactInfoCard({ info }: { info: any }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = info.icon;

  return (
    <a
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      href={info.href}
      className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md p-5 transition-all duration-300 hover:border-white/[0.18] hover:-translate-y-1.5"
      style={{
        boxShadow: isFocused
          ? "0 10px 30px -15px rgba(255, 255, 255, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)"
          : "inset 0 1px 0 0 rgba(255, 255, 255, 0.03)"
      }}
      data-cursor-hover="true"
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.12), transparent 65%)`,
        }}
      />

      {/* Icon Frame */}
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300 group-hover:scale-110"
        style={{
          color: "rgb(255, 255, 255)",
          boxShadow: isFocused ? "0 0 15px 2px rgba(255, 255, 255, 0.12)" : "none"
        }}
      >
        <Icon className="size-5 transition-transform duration-500 group-hover:rotate-[12deg]" />
      </div>

      {/* Metadata */}
      <div className="flex-1 min-w-0 relative z-10">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
          {info.title}
        </h4>
        <p className="font-mono text-sm text-foreground/90 truncate select-all group-hover:text-foreground/80 transition-colors">
          {info.detail}
        </p>
      </div>

      <span className="text-muted-foreground/30 text-sm transform translate-x-[-10px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-accent relative z-10">
        →
      </span>
    </a>
  );
}