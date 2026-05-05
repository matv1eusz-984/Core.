"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VisualShowcase({ dict }: { dict: any }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-20%", "40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["20%", "-40%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["40%", "-60%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 0.9]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden w-full min-h-screen flex items-center justify-center">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      
      {/* 3D abstract cards floating */}
      <motion.div style={{ y: y1 }} className="hidden md:flex flex-col p-6 absolute left-[5%] lg:left-[15%] top-[20%] w-64 h-80 bg-[var(--card-bg)] rounded-[2.5rem] border border-[var(--glass-border)] shadow-2xl rotate-12 overflow-hidden gap-4 backdrop-blur-2xl">
        {/* Dashboard Chart Mock */}
        <div className="w-full flex justify-between items-center opacity-70">
           <div className="w-12 h-4 rounded-full bg-foreground/10" />
           <div className="w-6 h-6 rounded-full bg-foreground/5" />
        </div>
        <div className="flex-1 w-full flex items-end justify-between gap-2 mt-4">
           <div className="w-full bg-primary/40 rounded-t-lg h-[60%] animate-[pulse_2s_ease-in-out_infinite]" />
           <div className="w-full bg-accent/50 rounded-t-lg h-[90%] animate-[pulse_3s_ease-in-out_infinite]" />
           <div className="w-full bg-primary/30 rounded-t-lg h-[40%] animate-[pulse_2.5s_ease-in-out_infinite]" />
           <div className="w-full bg-blue-500/40 rounded-t-lg h-[70%] animate-[pulse_4s_ease-in-out_infinite]" />
        </div>
      </motion.div>

      <motion.div style={{ y: y2 }} className="hidden md:flex flex-col p-6 absolute right-[5%] lg:right-[15%] top-[40%] w-56 h-72 bg-[var(--card-bg)] rounded-[2.5rem] border border-[var(--glass-border)] shadow-2xl -rotate-6 gap-3 backdrop-blur-2xl">
        {/* Code/Settings Mock */}
        <div className="flex gap-2 mb-2">
           <div className="w-3 h-3 rounded-full bg-red-500/60" />
           <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
           <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="w-3/4 h-2 rounded-full bg-foreground/20 mt-2" />
        <div className="w-1/2 h-2 rounded-full bg-foreground/10" />
        <div className="w-full h-2 rounded-full bg-foreground/5 mt-4" />
        <div className="w-5/6 h-2 rounded-full bg-foreground/10" />
        <div className="mt-auto w-full h-12 rounded-xl bg-foreground/5 flex items-center px-4">
           <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-primary/50 border border-background/20" />
              <div className="w-6 h-6 rounded-full bg-accent/50 border border-background/20" />
           </div>
        </div>
      </motion.div>

      <motion.div style={{ y: y3, scale }} className="relative z-10 w-full max-w-2xl mx-auto p-12 lg:p-16 bg-[var(--navbar-glass)] backdrop-blur-3xl rounded-[3.5rem] border border-[var(--glass-border)] shadow-[0_30px_100px_rgba(0,112,243,0.1)] flex flex-col items-center text-center">
        <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-[0_20px_40px_rgba(0,112,243,0.3)]">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient tracking-tight">{dict.title}</h2>
        <p className="text-foreground/60 text-lg md:text-xl leading-relaxed">
          {dict.desc}
        </p>
      </motion.div>
    </section>
  )
}
