"use client";

const techStack = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "WebGL", "Node.js", "Vercel", "GSAP", "Prisma"
];

export default function TechStackMarquee({ dict }: { dict: any }) {
  return (
    <section className="py-24 border-y border-black/5 dark:border-white/5 overflow-hidden w-full bg-black/5 dark:bg-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h3 className="text-sm md:text-base uppercase tracking-widest text-black/60 dark:text-gray-500 font-bold">{dict.title}</h3>
      </div>
      
      {/* Left/Right Gradients for smooth fade out */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <div className="flex justify-around items-center px-4 shrink-0">
          {techStack.map((tech, i) => (
            <span key={i} className="text-3xl md:text-5xl font-bold text-black dark:text-white opacity-20 hover:opacity-100 hover:text-primary transition-all duration-300 mx-8 whitespace-nowrap cursor-default">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-around items-center px-4 shrink-0">
          {techStack.map((tech, i) => (
            <span key={'duplicate-'+i} className="text-3xl md:text-5xl font-bold text-black dark:text-white opacity-20 hover:opacity-100 hover:text-primary transition-all duration-300 mx-8 whitespace-nowrap cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
