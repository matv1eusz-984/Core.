"use client";
import React, { useEffect, useState } from "react";
import { useSite } from "@/lib/SiteContext";
import Hero3DBackground from "./Hero3DBackground";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { motion, useAnimation } from "framer-motion";

function FishingLine() {
  const [isRetracted, setIsRetracted] = useState(false);

  return (
    <div
      onClick={() => setIsRetracted(true)}
      className={`hidden md:flex absolute bottom-[5%] md:bottom-[10%] right-4 md:left-[calc(100%+1rem)] h-[60vh] md:h-[70vh] w-[20px] md:-ml-[10px] cursor-pointer z-30 group justify-center ${isRetracted ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isRetracted ? 0 : "100%" }}
        transition={{
          duration: isRetracted ? 4 : 1.5,
          delay: isRetracted ? 0 : 0.5,
          ease: isRetracted ? "easeInOut" : "circOut"
        }}
        className="w-[2px] bg-primary relative shadow-[0_0_15px_rgba(0,112,243,0.8)] shadow-primary/50 origin-top"
      >
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full blur-md"
        />
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_12px_#fff]" />

        {/* Tooltip hint on hover */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest font-bold">
          Zwiń
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero({ dict }: { dict: any }) {
  const { siteData, isPreloaderDone } = useSite();
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (isPreloaderDone) {
      const sequence = async () => {
        await new Promise(resolve => setTimeout(resolve, 800)); // Small delay after preloader vanishes
        await controls.start({
          y: [0, -15, 0],
          transition: { duration: 0.4, ease: "backOut" }
        });
      };
      sequence();
    }
  }, [controls, isPreloaderDone]);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 md:pt-24 pb-12 px-6 text-center overflow-hidden">
      <Hero3DBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPreloaderDone ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl relative z-10 flex flex-col items-center"
      >
        <div className="flex flex-col md:grid md:grid-cols-[auto_auto] gap-x-8 gap-y-2 items-center md:items-baseline justify-center mb-8 relative">
          {siteData.heroTitle?.split('\n').map((line, i) => {
            const words = line.split(' ');
            const firstWord = words[0];
            const rest = words.slice(1).join(' ');

            if (i < 2) {
              const isSecondLine = i === 1;
              return (
                <React.Fragment key={i}>
                  <motion.span
                    animate={isSecondLine ? controls : {}}
                    className="text-4xl sm:text-6xl md:text-8xl text-foreground font-black md:text-[1.75em] text-center min-w-[1.5em] relative inline-block leading-none"
                  >
                    {firstWord}
                    {isSecondLine && <FishingLine />}
                  </motion.span>
                  <motion.span
                    animate={isSecondLine ? controls : {}}
                    className="text-2xl sm:text-4xl md:text-7xl text-gradient font-serif italic tracking-tight text-center md:text-left relative pb-4 md:pb-6 px-2 leading-none"
                  >
                    {rest}
                  </motion.span>
                </React.Fragment>
              );
            }
            return null;
          })}
        </div>

        <div className="flex flex-col items-center gap-4 mt-12 relative">
          {siteData.heroTitle?.split('\n').slice(2).map((line, i) => {
            if (!line.trim()) return null;
            const isSubLine = line.startsWith('...');

            return (
              <motion.h2
                key={i}
                initial={{ opacity: 0, y: 15, x: isSubLine ? (i === 1 ? -20 : 20) : 0 }}
                animate={isPreloaderDone ? { opacity: 1, y: 0, x: isSubLine ? (i === 1 ? -40 : 40) : 0 } : { opacity: 0, y: 15, x: isSubLine ? (i === 1 ? -20 : 20) : 0 }}
                transition={{
                  delay: isSubLine ? 1.2 + (i * 0.4) : 0.8,
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={`${isSubLine
                  ? "text-2xl md:text-5xl text-foreground/60 font-serif italic"
                  : "text-3xl md:text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] uppercase tracking-tight"
                  } leading-tight text-center relative px-4`}
              >
                {line}
              </motion.h2>
            );
          })}
        </div>
        <p className="text-lg md:text-xl text-foreground/60 my-8 md:my-12 max-w-2xl mx-auto leading-relaxed px-6">
          {dict.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Magnetic>
            <Link
              href="/#nasze-uslugi"
              className="btn-premium px-10 py-5 bg-foreground text-background rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-foreground/10 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 block"
            >
              {dict.cta}
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/#pricing"
              className="btn-premium px-10 py-5 bg-foreground/5 text-foreground border border-foreground/10 rounded-full font-bold hover:bg-foreground/10 transition-all backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 block"
            >
              {dict.viewWork}
            </Link>
          </Magnetic>
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <div className="w-1 h-12 bg-gradient-to-b from-white to-transparent rounded-full" />
      </div>
    </section>
  );
}
