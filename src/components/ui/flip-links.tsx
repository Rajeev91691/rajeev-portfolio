"use client";
import Link from "next/link";
import { motion } from "motion/react";

interface FlipLinkProps {
  children: string;
  href: string;
  className?: string;
}

function FlipLink({ children, href, className = "" }: FlipLinkProps) {
  const letters = children.split("");

  return (
    <Link
      href={href}
      className={className}
      data-cursor-hover="true"
    >
      <span className="inline-block overflow-hidden">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ y: 0 }}
            whileHover={{ y: "-110%" }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.025,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
      <span className="inline-block overflow-hidden absolute top-0 left-0">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ y: "110%" }}
            whileHover={{ y: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.025,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </Link>
  );
}

export default FlipLink;