import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Apple system colors (dark mode values)
        red: "#FF4245",
        orange: "#FF9230",
        yellow: "#FFD600",
        green: "#30D158",
        mint: "#00DCB3",
        teal: "#64D2FF",
        blue: "#0A84FF",
        indigo: "#5E5CE6",
        purple: "#BF5AF2",
        pink: "#FF375F",
        brown: "#B78A5E",
        // Custom dark theme colors
        background: "#0C0C0C",
        foreground: "#F0EDE8",
        muted: "#141414",
        "muted-foreground": "#B0ADA8",
        border: "#FFFFFF10",
        primary: "#E8553A",
        "primary-foreground": "#0C0C0C",
        accent: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      cursor: {
        none: "none",
      },
    },
  },
  plugins: [],
};

export default config;