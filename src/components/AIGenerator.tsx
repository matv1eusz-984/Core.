"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useSite } from "@/lib/SiteContext";

export default function AIGenerator() {
  const { updateSiteData } = useSite();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", industry: "", style: "Modern" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsComplete(true);
      updateSiteData(data);
    }, 3000);
  };

  const steps = [
    { title: "What's your business name?", field: "name", placeholder: "e.g. Nova Tech" },
    { title: "What industry are you in?", field: "industry", placeholder: "e.g. SaaS, Finance, Fashion" },
    { title: "Preferred Aesthetic?", field: "style", options: ["Modern", "Luxury", "Minimal", "Bold"] },
  ];

  return (
    <section id="ai-generator" className="py-24 px-6 bg-white/[0.03]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
          <Sparkles size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">AI Builder Beta</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
          Build Your Dream Site in Seconds
        </h2>
        <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Experience the future of web development. Our AI understands your brand and crafts a unique experience instantly.
        </p>

        <div className="glass p-12 rounded-[3rem] min-h-[400px] flex flex-col justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isGenerating && !isComplete && (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold">{steps[step].title}</h3>
                {steps[step].options ? (
                  <div className="grid grid-cols-2 gap-4">
                    {steps[step].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setData({ ...data, style: opt });
                          if (step < steps.length - 1) setStep(step + 1);
                        }}
                        className={`p-4 rounded-xl border transition-all ${
                          data.style === opt ? "bg-white/10 border-white/40" : "bg-white/5 border-transparent hover:border-white/10"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={data[steps[step].field as keyof typeof data]}
                    onChange={(e) => setData({ ...data, [steps[step].field]: e.target.value })}
                    placeholder={steps[step].placeholder}
                    className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-xl outline-none focus:border-primary/50 transition-all font-light"
                  />
                )}

                <div className="flex justify-between items-center mt-12">
                  <span className="text-gray-500 text-sm">Step {step + 1} of 3</span>
                  {step < steps.length - 1 ? (
                    <button
                      onClick={() => setStep(step + 1)}
                      className="flex items-center gap-2 text-white font-bold group"
                    >
                      Next <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                      onClick={startGeneration}
                      className="px-10 py-4 bg-primary text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                    >
                      Generate My Site
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {isGenerating && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-8"
              >
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-xl font-medium animate-pulse">Our AI is dreaming up your design...</p>
                <div className="text-xs text-gray-500 space-y-2">
                  <p>Analyzing {data.industry} patterns...</p>
                  <p>Applying {data.style} aesthetics...</p>
                  <p>Optimizing UX for {data.name}...</p>
                </div>
              </motion.div>
            )}

            {isComplete && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="flex justify-center text-green-500">
                  <CheckCircle2 size={64} />
                </div>
                <h3 className="text-3xl font-bold">Your {data.style} Site is Ready!</h3>
                <p className="text-gray-400">
                  We've personalized every pixel for **{data.name}**. Explore your custom dashboard now.
                </p>
                <button
                  onClick={() => {
                    setIsComplete(false);
                    setStep(0);
                  }}
                  className="px-10 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all"
                >
                  View Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
