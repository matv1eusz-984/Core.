"use client";
import { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const services = [
  {
    id: "01",
    label: "Web Design",
    description: "Creating visually stunning and user-centric designs that elevate your brand.",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: "02",
    label: "Development",
    description: "Building fast, secure, and scalable web applications using modern tech.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: "03",
    label: "SEO & Performance",
    description: "Optimizing your site for speed and search engine visibility.",
    gradient: "from-pink-500 to-red-600",
  },
  {
    id: "04",
    label: "AI Emails",
    description: "",
    gradient: "from-green-500 to-emerald-600",
  },
];

function ServiceCard({ service, dict }: { service: any, dict: any }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const label = service.label === "Web Design" ? dict.webDesign : service.label === "Development" ? dict.development : service.label === "SEO & Performance" ? dict.seo : dict.aiEmails;
  const description = service.label === "Web Design" ? dict.webDesignDesc : service.label === "Development" ? dict.developmentDesc : service.label === "SEO & Performance" ? dict.seoDesc : dict.aiEmailsDesc;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative p-8 rounded-[2.5rem] bg-[var(--card-bg)] backdrop-blur-3xl overflow-hidden cursor-default transition-all duration-500 flex flex-col justify-start border border-[var(--glass-border)] hover:shadow-[0_20px_50px_rgba(0,112,243,0.1)] hover:border-primary/30"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(var(--color-primary-rgb), 0.2),
              transparent 80%
            )
          `,
        }}
      />
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} mb-8 flex items-center justify-center font-bold text-white relative z-10 shadow-lg`}>
        {service.id}
      </div>
      <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300 relative z-10 text-foreground">
        {label}
      </h3>
      <p className="text-foreground/60 leading-relaxed relative z-10 text-sm md:text-base">
        {description}
      </p>
    </motion.div>
  );
}

export default function Services({ dict }: { dict: any }) {
  return (
    <section id="nasze-uslugi" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gradient pb-4 break-words">
            {dict.title}
          </h2>
          <p className="text-foreground/60 text-lg">
            {dict.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} dict={dict} />
        ))}
      </div>
    </section>
  );
}
