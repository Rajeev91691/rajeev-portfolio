import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import AmbientBackground from "@/components/3d/AmbientBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body" });
const displayFont = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display" });
const monoFont = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Rajeev Nandan.D | AI Engineer & Full-Stack Developer",
  description:
    "Engineering Neural Inference Pipelines at the intersection of AI and Web Development. B.Tech CSE at GITAM, Visakhapatnam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} font-body antialiased`}>
        <CustomCursor />
        <AmbientBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}