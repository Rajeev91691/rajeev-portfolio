# Rajeev Nandan.D - Portfolio Website

A premium, production-ready portfolio website built with Next.js, TypeScript, Tailwind CSS, GSAP, Framer Motion, and Three.js.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd D:\portfolio22thmay
```

2. Install dependencies (already done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
D:\portfolio22thmay/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with cursor & background
│   │   ├── page.tsx            # Main page orchestrator
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── CustomCursor.tsx    # Animated cursor
│   │   ├── Navbar.tsx          # Navigation
│   │   ├── Footer.tsx          # Footer
│   │   ├── 3d/
│   │   │   └── AmbientBackground.tsx  # Three.js background
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx        # Video scrubbing hero
│   │   │   ├── AboutSection.tsx       # About with GPA counter
│   │   │   ├── SkillsSection.tsx      # Skills with marquee
│   │   │   ├── ProjectsSection.tsx    # Projects with hover modal
│   │   │   ├── ExperienceSection.tsx  # Timeline
│   │   │   └── ContactSection.tsx     # Contact form
│   │   └── ui/
│   │       ├── menu-vertical.tsx
│   │       ├── special-text.tsx
│   │       ├── text-marque.tsx
│   │       ├── services-with-animated-hover-modal.tsx
│   │       ├── footer.tsx
│   │       ├── flip-links.tsx
│   │       └── input.tsx
│   └── lib/
│       └── utils.ts             # cn utility function
├── public/
│   └── assets/
│       ├── 1080p final.mp4      
│       └── images/             
└── package.json
```

## 📤 Assets to Upload

### 1. Hero Section Video

**Location:** `D:\portfolio22thmay\public\assets\1080p final.mp4`

Upload your 1080p video file here. The hero section will extract 90 frames from this video for scroll scrubbing.

### 2. Project Images

**Location:** `D:\portfolio22thmay\public\assets\images\`

Upload project images with these filenames (optional - will use placeholders if not provided):

- `genai-assistant.jpg` or `.png`
- `object-detector.jpg` or `.png`
- `emotion-detector.jpg` or `.png`
- `image-gen-app.jpg` or `.png`
- `yt-to-mp4-mp3.jpg` or `.png`
- `3d-professional-portfolio.jpg` or `.png`
- `portfolio.jpg` or `.png`
- `login-page.jpg` or `.png`
- `password-generator.jpg` or `.png`
- `bankmarketing-case-study.jpg` or `.png`

## ✨ Features

- **Custom Cursor:** Monochrome cursor with spring-eased follower
- **Hero Section:** Frame-extraction video scrubbing (90 frames)
- **Three.js Background:** Ambient particle field with mouse interaction
- **Smooth Animations:** GSAP ScrollTrigger & Framer Motion
- **Dark Editorial Theme:** Premium dark aesthetic with Apple system colors
- **Responsive Design:** Mobile-first approach
- **Liquid Glass Effects:** Subtle glassmorphism throughout

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP, Framer Motion, motion
- **3D:** Three.js
- **Icons:** Lucide React

## 📝 Notes

- All apostrophes use `&apos;` for Next.js build safety
- Hero video scrubbing uses ImageBitmap frame extraction (NOT video.currentTime)
- Cursor replaces OS cursor globally via `cursor: none` on body
- Smooth scrolling enabled via CSS

## 🎨 Color Palette

- Background: `#0C0C0C`
- Foreground: `#F0EDE8`
- Primary: `#E8553A`
- Accent: `#D4A574`
- Muted: `#141414`

---

Built with ❤️ using Next.js, Three.js & Framer Motion.