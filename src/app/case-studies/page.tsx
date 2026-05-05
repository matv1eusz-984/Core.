import { getDictionary } from "@/lib/get-dictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const mockCases = [
  {
    slug: "quantum-finance",
    title: "Quantum Finance",
    category: "Neo Banking",
    image: "/images/specializations/neo-banking.png"
  },
  {
    slug: "nova-spatial",
    title: "Nova Spatial",
    category: "Spatial Commerce",
    image: "/images/specializations/spatial-commerce.png"
  }
];

export default async function CaseStudiesPage() {
  const dict = await getDictionary();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navbar dict={dict.common} />
      <section className="pt-40 pb-32 px-6 max-w-[1400px] mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-16">
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 tracking-tighter uppercase leading-[0.8] m-0">
            Select<br/><span className="italic font-light">Works.</span>
          </h1>
          <p className="max-w-md text-xl text-gray-400 font-light leading-relaxed">
            A curated collection of our most ambitious digital transformations. We don't build websites; we engineer experiences.
          </p>
        </div>

        <div className="flex flex-col gap-32">
          {mockCases.map((c, i) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} className="group relative w-full flex flex-col md:flex-row items-center gap-16">
              <div className={`w-full md:w-3/5 aspect-video rounded-[2rem] overflow-hidden relative shadow-[0_0_50px_rgba(255,255,255,0.05)] ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all duration-700 z-10 mix-blend-overlay" />
                <img src={c.image} className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]" alt={c.title} />
              </div>
              
              <div className={`w-full md:w-2/5 flex flex-col justify-center ${i % 2 === 1 ? 'md:order-1 items-end text-right' : 'items-start text-left'}`}>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 mb-6 flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-white/20"></span> {c.category}
                </span>
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all duration-500">{c.title}</h2>
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:scale-110">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-500 ${i % 2 === 1 ? 'group-hover:-translate-x-1 group-hover:-translate-y-1 rotate-180' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`}><line x1="5" y1="19" x2="19" y2="5"></line><polyline points="12 5 19 5 19 12"></polyline></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer dict={dict.footer} />
    </main>
  );
}
