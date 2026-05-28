"use client";
import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const links = [
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Skills",
    href: "#skills",
  },
  {
    title: "Projects",
    href: "#projects",
  },
  {
    title: "Experience",
    href: "#experience",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Rajeev91691",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rajeev-nandan-d-59b367293",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "#",
    icon: Twitter,
  },
  {
    name: "Instagram",
    href: "#",
    icon: Instagram,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-muted py-16 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/"
          aria-label="go home"
          className="mx-auto block size-fit mb-8"
        >
          <h2 className="font-display text-2xl font-bold">Rajeev Nandan.D</h2>
        </Link>

        <div className="my-8 flex flex-wrap justify-center gap-6">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-muted-foreground hover:text-foreground block duration-150"
            >
              <span>{link.title}</span>
            </Link>
          ))}
        </div>

        <div className="my-8 flex flex-wrap justify-center gap-6">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-muted-foreground hover:text-foreground block duration-150"
                data-cursor-hover="true"
              >
                <Icon className="size-6" />
              </Link>
            );
          })}
        </div>

        <span className="text-muted-foreground block text-center text-sm">
          &copy; {year} Rajeev Nandan D. All rights reserved.
        </span>
      </div>
    </footer>
  );
}