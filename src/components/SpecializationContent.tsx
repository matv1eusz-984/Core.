"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import * as Accordion from "@radix-ui/react-accordion";
import { 
  ChevronDown, Cpu, Shield, Globe, Layers, BarChart3, Box, 
  Check, Lock, Activity, Zap, Server, ShieldCheck
} from "lucide-react";
import { CopyMailto } from "./CopyMailto";

const images = {
  "visionary-os": "/images/specializations/visionary-os.png",
  "spatial-commerce": "/images/specializations/spatial-commerce.png",
  "neo-banking": "/images/specializations/neo-banking.png"
};

// ---------------------------------------------------------
// Helper Components
// ---------------------------------------------------------

// Animated Number Hook/Component for Neo Banking
const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    const duration = 2000;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(value * easeProgress);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue.toFixed(value % 1 === 0 ? 0 : 1)}</>;
};




export default function SpecializationContent({ 
  data, 
  dict, 
  slug
}: { 
  data: any; 
  dict: any; 
  slug: string;
}) {
  const heroImage = images[slug as keyof typeof images];

  // Common wrapper for layouts
  const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
    <main className="relative w-full min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-hidden">
      <Navbar dict={dict.common} />
      {children}
      <Footer dict={dict.footer} />
    </main>
  );

  // 1. VISIONARY OS: Control Center / Side Panel Layout
  if (slug === "visionary-os") {
    return (
      <LayoutWrapper>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-30 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row min-h-screen pt-24 relative z-10 max-w-[1600px] mx-auto">
          {/* Left Sidebar Info */}
          <aside className="lg:w-1/3 p-8 lg:p-16 lg:sticky lg:top-24 h-fit">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
               <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-6 block drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]">System Protocol 01</span>
               <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 text-white tracking-tighter leading-[0.9] bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">{data.title}</h1>
               <p className="text-gray-400 text-lg leading-relaxed mb-10">{data.desc}</p>
               
               <div className="space-y-4 mb-12">
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-4 text-white/80 glass p-5 rounded-2xl border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all group">
                     <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                       <Cpu className="w-5 h-5" />
                     </div>
                     <span className="text-sm font-bold tracking-wide">{data.tech.split(',')[0]}</span>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-4 text-white/80 glass p-5 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all group">
                     <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                       <Layers className="w-5 h-5" />
                     </div>
                     <span className="text-sm font-bold tracking-wide">{data.tech.split(',')[1] || "Service Workers"}</span>
                  </motion.div>
               </div>

               <CopyMailto email="rnstock.trades@gmail.com" copiedText={dict.common.copied} className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] w-full block text-center px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300">
                 Deploy Initializer
               </CopyMailto>
            </motion.div>
          </aside>

          {/* Right Main content */}
          <div className="flex-1 p-8 lg:p-16 border-l border-white/5 relative">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="aspect-video w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-16 relative group">
               <img src={heroImage} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Hero" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
               <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                 <div>
                   <h3 className="text-2xl font-bold text-white mb-2">Core OS Architecture</h3>
                   <p className="text-white/60 text-sm">Optimized for infinite scalability.</p>
                 </div>
                 <div className="w-12 h-12 rounded-full glass flex items-center justify-center animate-pulse">
                   <Activity className="w-5 h-5 text-cyan-400" />
                 </div>
               </div>
            </motion.div>

            <Tabs.Root defaultValue="features" className="flex flex-col gap-8">
               <Tabs.List className="flex gap-8 border-b border-white/5 pb-4 relative">
                  <Tabs.Trigger value="features" className="text-sm font-bold uppercase tracking-widest opacity-40 data-[state=active]:opacity-100 data-[state=active]:text-cyan-400 transition-all outline-none relative group">
                    Features
                    <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-cyan-400 scale-x-0 group-data-[state=active]:scale-x-100 transition-transform origin-left rounded-t-full" />
                  </Tabs.Trigger>
                  <Tabs.Trigger value="specs" className="text-sm font-bold uppercase tracking-widest opacity-40 data-[state=active]:opacity-100 data-[state=active]:text-purple-400 transition-all outline-none relative group">
                    Capabilities
                    <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-purple-400 scale-x-0 group-data-[state=active]:scale-x-100 transition-transform origin-left rounded-t-full" />
                  </Tabs.Trigger>
               </Tabs.List>
               
               <Tabs.Content value="features" className="grid grid-cols-1 md:grid-cols-2 gap-6 outline-none">
                  {[
                    { icon: Shield, color: "text-green-400", bg: "bg-green-500/10", title: "Enterprise Security", desc: "Military-grade encryption and isolated memory modules." },
                    { icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", title: "Hyper Performance", desc: "Sub-100ms interaction latency with predictive prefetching." },
                    { icon: Box, color: "text-blue-400", bg: "bg-blue-500/10", title: "Modular Architecture", desc: "Decoupled components allowing infinite horizontal scaling." },
                    { icon: Server, color: "text-pink-400", bg: "bg-pink-500/10", title: "Edge Deployment", desc: "Distributed infrastructure guaranteeing zero downtime." },
                  ].map((feat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="glass p-8 rounded-3xl border border-white/5 hover:bg-white/[0.02] hover:border-white/20 transition-all group">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 ${feat.bg} ${feat.color}`}>
                         <feat.icon className="w-6 h-6" />
                       </div>
                       <h4 className="font-bold text-lg text-white mb-2">{feat.title}</h4>
                       <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                    </motion.div>
                  ))}
               </Tabs.Content>
               <Tabs.Content value="specs" className="outline-none">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-10 rounded-3xl border border-white/5 space-y-6">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Visionary OS leverages a custom-built PWA shell with multi-layer caching and predictive prefetching natively integrated at the Edge.
                    </p>
                    <ul className="space-y-4">
                      {['100% Offline Capability via Service Workers', 'Zero-config SSR hydration', 'Seamless push notifications via OS hooks'].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-gray-400">
                          <Check className="w-5 h-5 text-cyan-400" /> {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
               </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  // 2. SPATIAL COMMERCE: Immersive / Visual Centric Layout
  if (slug === "spatial-commerce") {
    const techArray = data.tech.split(',');
    return (
      <LayoutWrapper>
        <section className="relative pt-40 pb-24 overflow-hidden">
           {/* Massive Hero Image Background Scroll & Glows */}
           <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
              <img src={heroImage} className="w-full h-[70vh] object-cover blur-3xl opacity-10 scale-110 animate-pulse" alt="bg" />
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
              <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
           </div>

           <div className="max-w-7xl mx-auto px-6 text-center">
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
                <span className="inline-block py-1 px-3 mb-6 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]">Web 3.0 Standard</span>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 drop-shadow-lg">{data.title}</h1>
                <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12">{data.desc}</p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                   {techArray.map((t: string, i: number) => (
                     <motion.span 
                       key={t}
                       initial={{ opacity: 0, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ delay: 0.2 + i * 0.1 }}
                       whileHover={{ scale: 1.1, y: -5 }}
                       className="px-6 py-3 rounded-full border border-white/10 glass text-xs font-bold uppercase tracking-[0.2em] text-white hover:border-purple-500 hover:text-purple-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all cursor-crosshair"
                     >
                       {t.trim()}
                     </motion.span>
                   ))}
                </div>

                <div className="flex justify-center mb-24">
                   <CopyMailto email="rnstock.trades@gmail.com" copiedText={dict.common.copied} className="bg-white text-black hover:bg-gray-100 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300">
                     Enter Spatial Web
                   </CopyMailto>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32 text-left">
                 <div className="lg:col-span-7 relative group perspective-1000">
                    <motion.div 
                      initial={{ rotateY: 10, rotateX: 5, opacity: 0 }}
                      whileInView={{ rotateY: 0, rotateX: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                      className="relative rounded-[3rem] shadow-[0_0_100px_rgba(168,85,247,0.15)] border border-white/10 overflow-hidden transform-gpu"
                    >
                      <img src={heroImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Commerce" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-transparent to-blue-900/40 mix-blend-overlay" />
                    </motion.div>

                    {/* Floating Stats */}
                    <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       className="absolute -bottom-8 -right-8 glass p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl"
                    >
                       <p className="text-xs text-gray-400 font-bold uppercase mb-1">Render Latency</p>
                       <p className="text-3xl font-black text-white"><AnimatedNumber value={12} />ms</p>
                    </motion.div>
                 </div>
                 
                 <div className="lg:col-span-5">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Reality <br/><span className="text-purple-400">Redefined.</span></h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-10">Transform plain grids into fully explorable 3D environments. We deliver photorealistic fidelity straight to the browser without required downloads.</p>
                    <Accordion.Root type="single" collapsible className="w-full space-y-4">
                       {[
                         { title: "Advanced WebGL Pipelines", desc: "Custom shaders providing photo-realistic real-time rendering in any browser environment." },
                         { title: "Raytraced Materials", desc: "Physically based rendering (PBR) ensuring accurate light reflection and refraction." },
                         { title: "Spatial Navigation API", desc: "Fluid camera controls mirroring the exact physics of the real world." }
                       ].map((item, i) => (
                         <Accordion.Item key={i} value={`item-${i}`} className="border border-white/5 rounded-2xl overflow-hidden glass data-[state=open]:border-purple-500/30 data-[state=open]:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all">
                            <Accordion.Header className="flex">
                               <Accordion.Trigger className="flex flex-1 items-center justify-between p-6 text-white font-bold tracking-tight hover:text-purple-400 transition-all group">
                                  <span>{item.title}</span>
                                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                                    <ChevronDown className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                                  </div>
                               </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className="px-6 pb-6 text-gray-400 leading-relaxed overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                               {item.desc}
                            </Accordion.Content>
                         </Accordion.Item>
                       ))}
                    </Accordion.Root>
                 </div>
              </div>
           </div>
        </section>
      </LayoutWrapper>
    );
  }

  // 3. NEO BANKING: Data / Grid Dashboard Layout
  return (
    <LayoutWrapper>
      <div className="absolute top-0 left-0 w-full h-[500px] bg-emerald-900/10 skew-y-[-5deg] origin-top-left -z-10" />
      <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
             <div className="flex items-center gap-3 mb-8 inline-flex px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-200">Security Core v4.0</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-black mb-8 text-white leading-none tracking-tighter uppercase">{data.title}</h1>
             <p className="text-xl text-gray-400 font-light leading-relaxed mb-12 border-l-4 border-emerald-500/30 pl-6">{data.desc}</p>
             
             <div className="grid grid-cols-2 gap-6 mb-12">
               <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] group-hover:bg-emerald-500/20 transition-all" />
                  <BarChart3 className="w-10 h-10 text-emerald-400 mb-6 relative z-10" />
                  <div className="relative z-10">
                    <span className="text-4xl font-bold text-white"><AnimatedNumber value={99.9} />%</span>
                    <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mt-2">Downtime Zero</p>
                  </div>
               </motion.div>
               <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] group-hover:bg-blue-500/20 transition-all" />
                  <Globe className="w-10 h-10 text-blue-400 mb-6 relative z-10" />
                  <div className="relative z-10">
                    <span className="text-4xl font-bold text-white"><AnimatedNumber value={240} />+</span>
                    <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mt-2">Edge Nodes</p>
                  </div>
               </motion.div>
             </div>

             <div className="flex gap-4">
                <CopyMailto email="rnstock.trades@gmail.com" copiedText={dict.common.copied} className="bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300">
                  Secure Access
                </CopyMailto>
             </div>
          </motion.div>

          <aside className="relative flex flex-col gap-8">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }} 
               animate={{ scale: 1, opacity: 1 }} 
               transition={{ delay: 0.3, duration: 1 }} 
               className="rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative group"
             >
                <img src={heroImage} className="w-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Banking" />
                <div className="absolute inset-0 bg-emerald-900/20 mix-blend-overlay" />
             </motion.div>
             
             <motion.div 
               initial={{ y: 30, opacity: 0 }} 
               animate={{ y: 0, opacity: 1 }} 
               transition={{ delay: 0.5 }}
               className="glass p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden"
             >
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[60px]" />
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center justify-between">
                  Security Integrity
                  <Lock className="w-5 h-5 text-emerald-400" />
                </h3>
                <div className="space-y-8">
                   {[
                     { label: 'AES-256 Encryption', val: 100, color: 'from-emerald-500 to-teal-400' },
                     { label: 'Biometric Auth', val: 95, color: 'from-blue-500 to-cyan-400' },
                     { label: 'Immutable Audit Reg', val: 99, color: 'from-purple-500 to-indigo-400' }
                   ].map((f, i) => (
                     <div key={f.label} className="group">
                        <div className="flex justify-between text-sm font-medium mb-3">
                          <span className="text-gray-300 group-hover:text-white transition-colors">{f.label}</span>
                          <span className="text-white"><AnimatedNumber value={f.val} />%</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: `${f.val}%` }}
                             viewport={{ once: true }}
                             transition={{ duration: 1.5, delay: 0.2 + (i * 0.2), ease: "easeOut" }}
                             className={`h-full bg-gradient-to-r ${f.color} rounded-full relative`}
                           >
                             <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
                           </motion.div>
                        </div>
                     </div>
                   ))}
                </div>
             </motion.div>
          </aside>
        </div>
      </section>
    </LayoutWrapper>
  );
}
