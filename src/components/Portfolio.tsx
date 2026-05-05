"use client";
import Link from "next/link";

const projects = [
  {
    title: "Visionary OS",
    category: "PWA Native Layer",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
    slug: "visionary-os",
  },
  {
    title: "Spatial Commerce",
    category: "3D E-Commerce",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    slug: "spatial-commerce",
  },
  {
    title: "Neo Banking",
    category: "Fintech App",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    slug: "neo-banking",
  },
];

export default function Portfolio({ dict }: { dict: any }) {
  const portfolioDict = dict.portfolio || { title: "Portfolio", projects: [] };
  
  return (
    <section id="specializations" className="py-24 px-6 bg-foreground/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            {portfolioDict.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(portfolioDict.projects || []).map((project: any, index: number) => {
            // Find image from the hardcoded list or use a placeholder
            const images = [
              "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
            ];
            const image = images[index % images.length];

            return (
              <Link 
                key={index} 
                href={`/specializations/${project.slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[var(--card-bg)] border border-[var(--glass-border)] cursor-pointer block hover:scale-[1.02] transition-transform duration-500 shadow-xl shadow-black/5"
              >
                <img
                  src={image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-40 dark:opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-background to-transparent pt-20">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground transition-transform group-hover:translate-x-1">{project.title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
