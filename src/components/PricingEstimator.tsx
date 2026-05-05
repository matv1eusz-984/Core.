"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const modules = [
  { id: "cm", label: "Custom CMS", price: 800 },
  { id: "ec", label: "E-Commerce", price: 1500 },
  { id: "ai", label: "AI Integration", price: 1200 },
  { id: "se", label: "Advanced SEO", price: 500 },
  { id: "mo", label: "Mobile App Hybrid", price: 2000 },
];

export default function PricingEstimator() {
  const [selected, setSelected] = useState<string[]>([]);
  const [total, setTotal] = useState(2500);

  useEffect(() => {
    const additional = selected.reduce((acc, id) => {
      const module = modules.find((m) => m.id === id);
      return acc + (module?.price || 0);
    }, 0);
    setTotal(2500 + additional);
  }, [selected]);

  const toggleModule = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const formatPrice = (price: number) => {
    return `${(price * 4.3).toLocaleString()} PLN`;
  };

  return (
    <section id="estimator" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="glass p-12 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
          <div className="text-right">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-1">Estimated Total</p>
            <h3 className="text-4xl font-bold text-gradient">{formatPrice(total)}</h3>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8">Build Your Package</h2>
        <p className="text-gray-400 mb-12 max-w-md">
          Tailor our premium services to your exact needs and see the price update in real-time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => toggleModule(m.id)}
              className={`flex items-center justify-between p-6 rounded-2xl transition-all border ${
                selected.includes(m.id)
                  ? "bg-white/10 border-white/30"
                  : "bg-white/5 border-transparent hover:border-white/10"
              }`}
            >
              <span className="font-medium">{m.label}</span>
              <span className="text-gray-500">+{formatPrice(m.price)}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/10">
          <p className="text-xs text-gray-500 uppercase tracking-tighter">
            * Final pricing subject to detailed briefing and scope analysis.
          </p>
          <Link href="#contact" className="btn-premium inline-block px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
            Book Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
