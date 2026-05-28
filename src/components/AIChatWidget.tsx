"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Brain, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Code, 
  ExternalLink 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface KnowledgeEntry {
  category: string;
  keywords: string[];
  content: string;
}

const knowledgeBase: KnowledgeEntry[] = [
  {
    category: "iit_kanpur",
    keywords: ["iit", "kanpur", "intern", "internship", "research", "diffusion", "fid", "latency", "pytorch"],
    content: "Rajeev was a **Generative AI Research Intern** at the prestigious **Indian Institute of Technology (IIT), Kanpur** from June to August 2025. During his tenure, he achieved outstanding technical milestones:\n\n• **Inference Latency Reduction:** Engineered advanced PyTorch optimizations (including batch processing and mixed precision) that reduced inference latency by **22%**.\n\n• **FID Score Improvement:** Refined diffusion model training and sampling pipelines, achieving a **15% reduction in FID score** (greatly improving generation fidelity).\n\n• **LLM Architectures Evaluation:** Built an benchmarking evaluation framework across 3 distinct LLM architectures, raising baseline response quality by **18%** on internal prompts."
  },
  {
    category: "skills",
    keywords: ["skills", "tech", "technologies", "languages", "programming", "frameworks", "tools", "stack"],
    content: "Rajeev possesses a highly sought-after **'unicorn' Full-Stack AI Engineer** skill set:\n\n• **AI/ML Core:** Retrieval-Augmented Generation (RAG), Diffusion Models, Dense Vector Similarity Search (FAISS), PyTorch, TensorFlow, Scikit-learn, Hugging Face, NLP.\n\n• **Full-Stack Web:** React, Next.js, Node.js, TypeScript, JavaScript, SQL, HTML, CSS.\n\n• **Data Tools:** Pandas, NumPy, Jupyter Notebooks, Google Colab, Gradio (for interactive AI demos).\n\n• **Cybersecurity Fundamentals:** Wireshark, Splunk, Kali Linux, Nessus, Metasploit, Snort, ELK Stack."
  },
  {
    category: "projects",
    keywords: ["projects", "portfolio", "built", "apps", "code", "work", "developments"],
    content: "Rajeev has engineered a series of premium, high-impact projects. The highlights include:\n\n• **3D Professional Portfolio:** Built using Next.js, Three.js, GSAP, and Tailwind. It features advanced video-scrubbing frame scrubbing, interactive spotlight skill grids, and a custom mouse cursor tracking system.\n\n• **GenAI Assistant & Image Gen:** Live model interfaces built with Python, Hugging Face spaces, and Gradio, showing advanced text generation and diffusion-based image synthesis.\n\n• **Object & Facial Emotion Detectors:** Real-time visual intelligence applications utilizing OpenCV, Deep Learning models, and Python.\n\n• **BankMarketing Analysis:** Customer semantic clustering and predictive machine learning models built inside Jupyter notebooks."
  },
  {
    category: "education",
    keywords: ["education", "college", "gpa", "gitam", "university", "academic", "coursework", "grades"],
    content: "Rajeev is pursuing a **B.Tech in Computer Science & Engineering** at **GITAM (Gandhi Institute of Technology and Management), Visakhapatnam** (2023–Present).\n\nHis academic stats are exemplary:\n\n• **Cumulative GPA:** **9.24 / 10**\n\n• **Semester Peak GPA:** **9.55 / 10**\n\n• **Key Coursework:** Artificial Intelligence, Natural Language Processing, Cryptography & Network Security, Design & Analysis of Algorithms, Database Management Systems, Compiler Design, Data Structures."
  },
  {
    category: "contact",
    keywords: ["contact", "email", "phone", "hire", "recruiting", "job", "linkedin", "github", "connect", "reach"],
    content: "You can reach out to Rajeev directly through the following channels:\n\n• 📧 **Email:** rajeevnandan382@gmail.com\n\n• 📞 **Phone:** +91 9481509488\n\n• 💼 **LinkedIn:** [linkedin.com/in/rajeev-nandan-d](https://www.linkedin.com/in/rajeev-nandan-d-59b367293)\n\n• 🐙 **GitHub:** [github.com/Rajeev91691](https://github.com/Rajeev91691)\n\n*He is currently based in Visakhapatnam, India, and is open to immediate internships, full-time engineering roles, and exciting collaborations!*"
  },
  {
    category: "whois",
    keywords: ["who", "rajeev", "about", "profile", "background", "career"],
    content: "Rajeev Nandan.D is a passionate **Full-Stack AI Engineer** specializing in bridging advanced deep learning model research (like Diffusion, RAG, and FAISS similarity indexing) with immersive, high-fidelity user experiences (built in Next.js and Three.js).\n\nHe is academically excellent (GPA 9.24/10) and has real-world pedigree through a highly technical GenAI research internship at IIT Kanpur. This unique combination allows him to build robust AI backends AND beautiful, interactive frontend applications."
  }
];

const suggestedQuestions = [
  "What did Rajeev do at IIT Kanpur?",
  "What are his core AI/ML skills?",
  "Tell me about his top projects.",
  "What is his GPA & education?",
  "How can I contact/hire him?"
];

// Helper function to format bold and lists in responses
const renderFormattedText = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Process markdown-style links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    // Convert bullet points
    const isBullet = line.startsWith("• ") || line.startsWith("* ");
    const cleanLine = isBullet ? line.substring(2) : line;

    // Bold text parsing (**text**)
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let boldMatch;
    
    // For rendering, we will process links and bolds in a simple way
    let tempText = cleanLine;
    
    if (isBullet) {
      return (
        <div key={i} className="flex items-start gap-2 my-1 pl-1 text-sm md:text-[14.5px] leading-relaxed text-foreground/90">
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-[7px] shrink-0" />
          <span>
            {parseMarkdown(cleanLine)}
          </span>
        </div>
      );
    }

    return (
      <p key={i} className={cn("text-sm md:text-[14.5px] leading-relaxed text-foreground/90 my-1.5", line.trim() === "" ? "h-2" : undefined)}>
        {parseMarkdown(line)}
      </p>
    );
  });
};

function parseMarkdown(text: string): React.ReactNode {
  // Simple markdown parser for bold (**) and links ([text](url))
  const parts: React.ReactNode[] = [];
  let index = 0;
  
  // Combine bold and link search
  const regex = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    
    // Add text before match
    if (matchIndex > index) {
      parts.push(text.substring(index, matchIndex));
    }
    
    if (match[1].startsWith("**")) {
      // It's bold
      parts.push(
        <strong key={matchIndex} className="font-bold text-white bg-white/5 px-1 rounded">
          {match[2]}
        </strong>
      );
    } else {
      // It's a link
      parts.push(
        <a
          key={matchIndex}
          href={match[4]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white/70 underline inline-flex items-center gap-0.5 font-medium transition-colors"
        >
          {match[3]}
          <ExternalLink className="size-3 inline shrink-0" />
        </a>
      );
    }
    
    index = regex.lastIndex;
  }
  
  if (index < text.length) {
    parts.push(text.substring(index));
  }
  
  return parts.length > 0 ? <>{parts}</> : text;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hi there! I am Rajeev's AI representative, trained natively client-side to answer questions about his technical achievements, B.Tech curriculum, IIT Kanpur internship, and portfolio. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleQuery = (query: string) => {
    if (!query.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: "user",
      text: query,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate thinking delay for an authentic LLM feel
    setTimeout(() => {
      const responseText = processRAG(query);
      const aiMsg: Message = {
        sender: "ai",
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 850);
  };

  const processRAG = (query: string): string => {
    const normalizedQuery = query.toLowerCase();
    
    // Split into words and filter out stop words
    const stopWords = new Set([
      "what", "is", "a", "of", "about", "the", "he", "his", "rajeev", "in", "at", 
      "for", "to", "and", "on", "with", "does", "have", "you", "tell", "me", "show", "can"
    ]);
    const tokens = normalizedQuery
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
      .split(/\s+/)
      .filter(w => w.length > 1 && !stopWords.has(w));

    if (tokens.length === 0) {
      // Fallback if the query is just common greeting words
      if (normalizedQuery.match(/\b(hi|hello|hey|greetings|howdy|sup)\b/)) {
        return "Hello! I am Rajeev's virtual AI assistant. I can guide you through his academic background, IIT Kanpur GenAI research, full-stack capabilities, and interactive web projects. What are you interested in?";
      }
    }

    let bestMatch: KnowledgeEntry | null = null;
    let highestScore = 0;

    // Score all knowledge entries based on keyword matching
    for (const entry of knowledgeBase) {
      let score = 0;
      
      // 1. Direct keyword match
      for (const token of tokens) {
        if (entry.keywords.includes(token)) {
          score += 3; // High weight for exact keyword match
        }
        // Partial keyword containment
        else if (entry.keywords.some(k => k.includes(token) || token.includes(k))) {
          score += 1.5;
        }

        // Search within raw content
        if (entry.content.toLowerCase().includes(token)) {
          score += 0.5;
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && highestScore >= 1.5) {
      return bestMatch.content;
    }

    // Default Fallback
    return "I couldn't quite find details matching that specific prompt in my offline vector database.\n\nHowever, I'd love to tell you about Rajeev's **IIT Kanpur research internship**, his **core AI/ML skills**, his **interactive projects**, or how you can **contact/hire him** directly! Feel free to click one of the suggested questions below.";
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-cursor-hover="true"
        >
          {/* Pulsing AI Aura Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-md group-hover:scale-125 transition-transform duration-500 animate-pulse pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="size-6 text-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <div className="relative">
                  <MessageSquare className="size-6 text-foreground" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-ping" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Glassmorphism Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[400px] h-[580px] max-h-[80vh] flex flex-col rounded-2xl bg-black/85 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white animate-pulse">
                  <Brain className="size-4" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm tracking-wide text-foreground flex items-center gap-1.5">
                    Portfolio RAG Agent
                    <Sparkles className="size-3 text-white/50" />
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      Client Vector Index
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                data-cursor-hover="true"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex w-full gap-3",
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {/* Left Avatar for AI */}
                  {msg.sender === "ai" && (
                    <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 self-start text-white text-[10px]">
                      <Brain className="size-3.5" />
                    </div>
                  )}

                  {/* Message bubble */}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-foreground",
                      msg.sender === "user"
                        ? "bg-white text-black rounded-tr-none font-medium text-[14px]"
                        : "bg-white/[0.04] border border-white/[0.06] rounded-tl-none"
                    )}
                  >
                    {msg.sender === "user" ? (
                      <p className="text-sm md:text-[14.5px] leading-relaxed">{msg.text}</p>
                    ) : (
                      <div className="space-y-1">
                        {renderFormattedText(msg.text)}
                      </div>
                    )}
                    <span className={cn(
                      "text-[9px] block mt-1",
                      msg.sender === "user" ? "text-black/40 text-right" : "text-white/20"
                    )}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Right Avatar for User */}
                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shrink-0 self-start text-[10px] font-bold">
                      <User className="size-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex w-full gap-3 justify-start">
                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 self-start text-white">
                    <Brain className="size-3.5" />
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-tl-none px-4 py-3 flex items-center justify-center gap-1.5 h-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Chips */}
            <div className="px-5 py-2.5 border-t border-white/[0.06] bg-black/20 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuery(q)}
                  className="px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-white/[0.12] text-xs font-medium text-foreground/80 hover:text-foreground transition-all shrink-0 cursor-pointer"
                  data-cursor-hover="true"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Form Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleQuery(inputVal);
              }}
              className="p-4 border-t border-white/10 bg-white/[0.01] flex gap-2.5 items-center"
            >
              <input
                type="text"
                placeholder="Ask me about his research, GPA, skills..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-white/20 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="p-2.5 rounded-full bg-white text-black disabled:bg-white/10 disabled:text-white/40 transition-colors cursor-pointer"
                data-cursor-hover="true"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
