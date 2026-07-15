import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/inverted-cursor";
import AmbientBackground from "@/components/3d/AmbientBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body" });
const displayFont = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display" });
const monoFont = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Rajeev Nandan Damarla | AI Engineer & Full-Stack Developer",
  description:
    "Engineering Neural Inference Pipelines at the intersection of AI and Web Development. B.Tech CSE at GITAM, Visakhapatnam.",
  keywords: ["rajeevnandan", "Rajeev Nandan Damarla", "Rajeev91691", "AI Developer", "IIT Kanpur", "Stable Diffusion", "FAISS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} font-body antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Rajeev Nandan Damarla",
              "alternateName": "rajeevnandan",
              "url": "https://rajeevnandan.rweb.site",
              "image": "https://github.com/Rajeev91691.png",
              "sameAs": [
                "https://linkedin.com/in/rajeev-nandan-damarla",
                "https://github.com/Rajeev91691",
                "https://huggingface.co/Rajeev91691",
                "https://leetcode.com/u/Rajeev91691/"
              ],
              "jobTitle": "Software Engineer & AI Developer",
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "GITAM University"
              }
            })
          }}
        />
        <Cursor />
        <AmbientBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}