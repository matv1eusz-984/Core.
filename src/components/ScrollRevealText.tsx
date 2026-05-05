"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollRevealText({ dict }: { dict: any }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.2"]
  });

  const words = dict.text.split(" ");

  return (
    <section ref={containerRef} className="py-48 px-6 max-w-5xl mx-auto flex justify-center items-center min-h-screen">
      <p className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.3] flex flex-wrap justify-center text-center py-4">
        {words.map((word: string, i: number) => {
           const start = i / words.length;
           const end = start + (1 / words.length);
           // eslint-disable-next-line react-hooks/rules-of-hooks
           const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
           return (
             <motion.span 
               key={i} 
               style={{ opacity }} 
               className="mr-3 md:mr-5 lg:mr-6 mt-3 text-gradient bg-clip-text"
             >
               {word}
             </motion.span>
           )
        })}
      </p>
    </section>
  );
}
