"use client";
import { motion } from "framer-motion";
import { useSite } from "@/lib/SiteContext";
import { Smartphone, Zap, Shield, Sparkles, Globe } from "lucide-react";

export default function BentoGrid({ dict }: { dict: any }) {
  const { siteData } = useSite();

  const features = [
    {
      title: dict.f1Title,
      desc: dict.f1Desc,
      icon: <Zap size={32} className="text-yellow-500" />,
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-1",
    },
    {
      title: dict.f2Title,
      desc: dict.f2Desc,
      icon: <Shield size={32} className="text-green-500" />,
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1",
    },
    {
      title: dict.f3Title,
      desc: dict.f3Desc,
      icon: <Sparkles size={32} className="text-purple-500" />,
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-2",
    },
    {
      title: dict.f4Title,
      desc: dict.f4Desc,
      icon: <Smartphone size={32} className="text-blue-500" />,
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-1",
    },
    {
      title: dict.f5Title,
      desc: dict.f5Desc,
      icon: <Globe size={32} className="text-teal-500" />,
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-1",
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-gradient">
          {dict.title}
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          {dict.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[300px]">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            className={`card p-8 flex flex-col group ${feature.colSpan} ${feature.rowSpan}`}
          >
            <div className="mb-8">
              {feature.icon}
            </div>
            <div className="mt-auto">
              <h3 className="text-2xl font-bold mb-2 transition-transform group-hover:translate-x-1 text-foreground">{feature.title}</h3>
              <p className="text-foreground/60">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
