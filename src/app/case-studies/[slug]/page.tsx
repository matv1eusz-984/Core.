import { getDictionary } from "@/lib/get-dictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dict = await getDictionary();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar dict={dict.common} />
      <section className="pt-48 pb-24 px-6 max-w-6xl mx-auto">
        <Link href="/case-studies" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-16 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Works
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
           <div>
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Case Study</span>
              <h1 className="text-6xl md:text-8xl font-bold mb-10 text-white italic uppercase tracking-tighter leading-none">{slug.replace(/-/g, ' ')}</h1>
              <p className="text-2xl text-gray-400 font-light leading-relaxed mb-12">
                Exploring how we redefined digital boundaries for {slug}. A deep dive into architecture and aesthetics.
              </p>
              <button className="flex items-center gap-3 px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all group">
                Live Preview <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
           </div>
           <div className="aspect-[3/4] rounded-[3rem] overflow-hidden border border-white/10 glass">
              <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center p-12">
                <span className="text-gray-600 text-sm italic font-bold uppercase tracking-widest">Project Visual Space</span>
              </div>
           </div>
        </div>
      </section>
      <Footer dict={dict.footer} />
    </main>
  );
}
