"use client";
import Link from "next/link";
import { CopyMailto } from "./CopyMailto";
import { Lock, Unlock } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function AnimatedLock() {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLocked((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-flex items-center justify-center w-10 h-10 mr-8 text-primary shrink-0">
      <AnimatePresence mode="wait">
        {isLocked ? (
          <motion.span
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute"
          >
            <Lock size={32} />
          </motion.span>
        ) : (
          <motion.span
            key="unlocked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute"
          >
            <Unlock size={32} />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function Pricing({ dict }: { dict: any }) {
  const plans = [
    {
      name: dict.p1Title,
      price: dict.p1Price,
      features: dict.p1Features,
    },
    {
      name: dict.p2Title,
      price: dict.p2Price,
      features: dict.p2Features,
      featured: true,
    },
    {
      name: dict.p3Title,
      price: dict.p3Price,
      features: dict.p3Features,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-gradient pb-4 break-words">{dict.title}</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          {dict.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-8 rounded-[2.5rem] flex flex-col border transition-all duration-300 ${
              plan.featured 
                ? "bg-[var(--card-bg)] border-primary shadow-[0_20px_50px_rgba(0,112,243,0.1)] scale-100 md:scale-105 z-10" 
                : "bg-[var(--card-bg)] opacity-90 border-[var(--glass-border)]"
            }`}
          >
            <h3 className="text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
            <p className="text-xl uppercase tracking-widest font-bold mb-8 text-primary">{plan.price}</p>
            <ul className="space-y-4 mb-12 flex-grow">
              {plan.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-center gap-3 text-foreground/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <CopyMailto
              email="rnstock.trades@gmail.com"
              copiedText={dict.copied}
              className={`block text-center w-full py-4 rounded-full font-bold transition-all ${
                plan.featured 
                  ? "bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/20" 
                  : "bg-foreground/5 text-foreground hover:bg-foreground/10 border border-foreground/10"
              }`}
            >
              {dict.action}
            </CopyMailto>
          </div>
        ))}
      </div>

      {dict.trustInfo && (
        <div className="mt-16 max-w-4xl mx-auto p-8 rounded-3xl bg-[var(--card-bg)] border border-[var(--glass-border)] text-center relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-50" />
          <div className="text-foreground/80 text-lg md:text-xl leading-relaxed relative z-10 font-medium flex items-center text-left max-w-2xl">
            <AnimatedLock />
            <span>{dict.trustInfo}</span>
          </div>
        </div>
      )}
    </section>
  );
}
