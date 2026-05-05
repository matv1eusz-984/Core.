"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export function CopyMailto({ 
  email = "rnstock.trades@gmail.com", 
  children, 
  className = "",
  copiedText = "Copied to clipboard",
  as: Component = "button"
}: { 
  email?: string; 
  children: React.ReactNode; 
  className?: string;
  copiedText?: string;
  as?: any;
}) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      <button onClick={handleCopy} className={className} type="button">
        {children}
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-6 right-6 z-[99999] bg-green-500/10 text-green-400 border border-green-500/20 backdrop-blur-xl px-6 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
            >
              <Check className="w-5 h-5" />
              {copiedText}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
