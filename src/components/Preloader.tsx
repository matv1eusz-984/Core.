"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSite } from "@/lib/SiteContext";

export default function Preloader() {
  const { setPreloaderDone } = useSite();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Only show preloader once per session
    const hasLoaded = sessionStorage.getItem("core_preloader_done");
    if (hasLoaded) {
      setPreloaderDone(true);
      return;
    }

    setIsLoading(true);

    // Simulate loading sequence
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem("core_preloader_done", "true");
          // Wait for exit animation to finish before triggering main app animations
          setTimeout(() => setPreloaderDone(true), 1200);
        }, 500); // Hold at 100% for a moment
      }
      setProgress(currentProgress);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl font-bold tracking-[0.3em] uppercase"
            >
              CORE.
            </motion.div>
            <div className="relative w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>
            <div className="text-sm font-light tracking-widest text-white/50">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
