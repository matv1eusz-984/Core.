"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSite } from "@/lib/SiteContext";
import { Shield, Code, Layout, Cpu, Zap, Globe, Sparkles } from "lucide-react";

export default function StickyScrollFeatures({ dict }: { dict: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { siteData } = useSite();

  // Smooth out the scroll progress for animations
  const smoothProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Section Opacities
  const op1 = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const op2 = useTransform(smoothProgress, [0.2, 0.35, 0.45], [0, 1, 0]);
  const op3 = useTransform(smoothProgress, [0.4, 0.55, 0.65], [0, 1, 0]);
  const op4 = useTransform(smoothProgress, [0.6, 0.75, 0.85], [0, 1, 0]);
  const op5 = useTransform(smoothProgress, [0.8, 0.95, 1], [0, 1, 1]);

  // Visual 1: UI Design (Floating Glass Panels)
  const v1Rotate = useTransform(smoothProgress, [0, 0.2], [0, 15]);
  const v1Y = useTransform(smoothProgress, [0, 0.2], [0, -20]);

  // Visual 2: Engineering (Code Lines)
  const v2Width1 = useTransform(smoothProgress, [0.2, 0.35], ["0%", "100%"]);
  const v2Width2 = useTransform(smoothProgress, [0.25, 0.4], ["0%", "80%"]);

  // Visual 3: Future Ready (3D Rotating Grid)
  const v3Rotate = useTransform(smoothProgress, [0.4, 0.6], [0, 360]);

  // Visual 4: Security (Shield Pulse)
  const v4Scale = useTransform(smoothProgress, [0.6, 0.75], [0.8, 1.2]);

  // Visual 5: AI (Connecting Particles)
  const v5Opacity = useTransform(smoothProgress, [0.8, 1], [0.3, 1]);

  return (
    <section ref={containerRef} className="relative h-[500vh] w-full bg-[var(--background)]">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center overflow-hidden pt-20 md:pt-0">
        
        {/* Left/Top side Sticky Visuals */}
        <div className="w-full h-[40vh] md:w-1/2 md:h-full flex items-center justify-center relative bg-gradient-to-br from-primary/5 to-transparent border-b md:border-b-0 md:border-r border-[var(--glass-border)]">
          
          {/* Visual 1: UI Design */}
          <motion.div style={{ opacity: op1, rotateY: v1Rotate, y: v1Y }} className="absolute inset-x-0 bottom-10 top-20 md:top-0 flex items-center justify-center pointer-events-none perspective-1000">
             <div className="relative w-[70vw] h-[25vh] md:w-80 md:h-96">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden">
                   <div className="h-12 bg-white/10 flex items-center px-6 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/40" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                      <div className="w-3 h-3 rounded-full bg-green-500/40" />
                   </div>
                   <div className="p-8 space-y-6">
                      <div className="w-2/3 h-8 bg-primary/20 rounded-lg animate-pulse" />
                      <div className="space-y-3">
                         <div className="w-full h-4 bg-white/5 rounded-full" />
                         <div className="w-5/6 h-4 bg-white/5 rounded-full" />
                         <div className="w-4/6 h-4 bg-white/5 rounded-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                         <div className="aspect-square bg-accent/20 rounded-2xl" />
                         <div className="aspect-square bg-primary/10 rounded-2xl" />
                      </div>
                   </div>
                </div>
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-12 top-1/4 w-32 h-32 bg-primary/30 backdrop-blur-3xl rounded-3xl border border-white/30 shadow-2xl flex items-center justify-center z-10"
                >
                   <Layout className="text-white w-12 h-12" />
                </motion.div>
             </div>
          </motion.div>

          {/* Visual 2: Engineering */}
          <motion.div style={{ opacity: op2 }} className="absolute inset-x-0 bottom-10 top-20 md:top-0 flex items-center justify-center pointer-events-none">
             <div className="w-[85vw] md:w-96 p-4 md:p-8 bg-[#0a0a0a] rounded-3xl border border-white/10 font-mono text-xs md:text-sm overflow-hidden shadow-2xl">
                <div className="flex gap-2 mb-6">
                   <Code className="text-primary w-5 h-5" />
                   <span className="text-white/40">performance.ts</span>
                </div>
                <div className="space-y-4">
                   <div className="flex gap-4">
                      <span className="text-white/20">01</span>
                      <motion.div style={{ width: v2Width1 }} className="h-4 bg-primary/20 rounded-full" />
                   </div>
                   <div className="flex gap-4">
                      <span className="text-white/20">02</span>
                      <motion.div style={{ width: v2Width2 }} className="h-4 bg-accent/20 rounded-full" />
                   </div>
                   <div className="flex gap-4">
                      <span className="text-white/20">03</span>
                      <motion.div style={{ width: v2Width1 }} className="h-4 bg-white/5 rounded-full" />
                   </div>
                   <div className="flex gap-4">
                      <span className="text-white/20">04</span>
                      <div className="w-1/2 h-4 bg-white/5 rounded-full" />
                   </div>
                   <div className="flex gap-4 pt-4">
                      <Zap className="text-yellow-500 animate-pulse" />
                      <span className="text-yellow-500/60 font-bold uppercase tracking-tighter">Ultra Fast Engine Active</span>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Visual 3: Future Ready */}
          <motion.div style={{ opacity: op3 }} className="absolute inset-x-0 bottom-10 top-20 md:top-0 flex items-center justify-center pointer-events-none">
             <div className="relative w-48 h-48 md:w-64 md:h-64">
                <motion.div 
                   style={{ rotate: v3Rotate }}
                   className="absolute inset-0 border-4 border-dashed border-primary/30 rounded-full"
                />
                <motion.div 
                   style={{ rotate: useTransform(v3Rotate, [0, 360], [360, 0]) }}
                   className="absolute inset-4 border-2 border-dashed border-accent/30 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-primary to-accent rounded-2xl md:rounded-3xl shadow-2xl flex items-center justify-center transform rotate-12">
                      <Globe className="text-white w-8 h-8 md:w-12 md:h-12 animate-pulse" />
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Visual 4: Security */}
          <motion.div style={{ opacity: op4 }} className="absolute inset-x-0 bottom-10 top-20 md:top-0 flex items-center justify-center pointer-events-none">
             <motion.div style={{ scale: v4Scale }} className="relative">
                <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
                <div className="relative w-32 h-32 md:w-48 md:h-48 bg-white/5 backdrop-blur-md border border-green-500/30 rounded-full flex items-center justify-center shadow-2xl">
                   <Shield className="text-green-500 w-12 h-12 md:w-16 md:h-16" />
                   <motion.div 
                     animate={{ opacity: [0, 1, 0] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="absolute inset-0 border-4 border-green-500 rounded-full"
                   />
                </div>
             </motion.div>
          </motion.div>

          {/* Visual 5: AI / Visionary */}
          <motion.div style={{ opacity: op5 }} className="absolute inset-x-0 bottom-10 top-20 md:top-0 flex items-center justify-center pointer-events-none">
             <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Sparkles className="absolute top-4 right-4 text-primary w-10 h-10 md:w-12 md:h-12 animate-pulse" />
                <Cpu className="absolute bottom-4 left-4 text-accent w-12 h-12 md:w-16 md:h-16 animate-bounce" />
                <motion.div 
                   style={{ opacity: v5Opacity }}
                   className="absolute inset-0 flex items-center justify-center"
                >
                   <div className="w-24 h-24 md:w-48 md:h-48 bg-gradient-to-tr from-primary/40 to-accent/40 blur-[30px] md:blur-[80px] rounded-full animate-pulse" />
                   <div className="relative z-10 text-4xl md:text-6xl font-black text-gradient italic tracking-tighter">AI CORE</div>
                </motion.div>
             </div>
          </motion.div>

        </div>

        {/* Right side Scrolling Text Area */}
        <div className="w-full h-[60vh] md:w-1/2 md:h-full relative flex flex-col justify-center px-6 md:px-24">
          
          <motion.div style={{ opacity: op1 }} className="absolute top-1/2 -translate-y-1/2 inset-x-6 md:inset-x-24 pointer-events-none text-center md:text-left overflow-visible">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 break-words hyphens-auto">{dict.s1Title}</h2>
            <p className="text-base md:text-xl text-foreground/60">{dict.s1Desc}</p>
          </motion.div>
          
          <motion.div style={{ opacity: op2 }} className="absolute top-1/2 -translate-y-1/2 inset-x-6 md:inset-x-24 pointer-events-none text-center md:text-left overflow-visible">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 break-words hyphens-auto">{dict.s2Title}</h2>
            <p className="text-base md:text-xl text-foreground/60">{dict.s2Desc}</p>
          </motion.div>

          <motion.div style={{ opacity: op3 }} className="absolute top-1/2 -translate-y-1/2 inset-x-6 md:inset-x-24 pointer-events-none text-center md:text-left overflow-visible">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-foreground break-words hyphens-auto">{dict.s3Title}</h2>
            <p className="text-base md:text-xl text-foreground/60">{dict.s3Desc}</p>
          </motion.div>

          <motion.div style={{ opacity: op4 }} className="absolute top-1/2 -translate-y-1/2 inset-x-6 md:inset-x-24 pointer-events-none text-center md:text-left overflow-visible">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-foreground break-words hyphens-auto">{dict.s4Title}</h2>
            <p className="text-base md:text-xl text-foreground/60">{dict.s4Desc}</p>
          </motion.div>

          <motion.div style={{ opacity: op5 }} className="absolute top-1/2 -translate-y-1/2 inset-x-6 md:inset-x-24 pointer-events-none text-center md:text-left overflow-visible">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-foreground break-words hyphens-auto">{dict.s5Title}</h2>
            <p className="text-base md:text-xl text-foreground/60">{dict.s5Desc}</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
