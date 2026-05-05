"use client";
import { motion } from "framer-motion";

export default function Footer({ dict }: { dict: any }) {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-12 px-6 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-foreground/40 text-sm">
          <p>© {new Date().getFullYear()} {dict.rights}</p>
          <p className="mt-4 md:mt-0">{dict.builtWith}</p>
        </div>
      </div>
    </motion.footer>
  );
}
