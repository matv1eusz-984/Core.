import { getDictionary } from "@/lib/get-dictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const mockPosts = [
  {
    slug: "future-of-web-design",
    title: { pl: "Przyszłość Web Designu", en: "Future of Web Design" },
    excerpt: { pl: "Jak AI i 3D zmieniają sposób, w jaki przeglądamy sieć.", en: "How AI and 3D are changing the way we browse the web." },
    date: "2026-04-10"
  },
  {
    slug: "nextjs-16-turbopack",
    title: { pl: "Next.js 16 i Turbopack", en: "Next.js 16 and Turbopack" },
    excerpt: { pl: "Rewolucja w szybkości dewelopmentu pod lupą.", en: "A deep dive into the development speed revolution." },
    date: "2026-04-15"
  }
];

export default async function BlogPage() {
  const dict = await getDictionary();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navbar dict={dict.common} />
      <section className="pt-48 pb-32 px-6 max-w-[1200px] mx-auto">
        <h1 className="text-7xl md:text-[8rem] font-black mb-24 text-white tracking-tighter uppercase leading-[0.85] m-0">
          Digital<br/><span className="text-gray-500 italic font-light">Journal.</span>
        </h1>
        
        <div className="flex flex-col border-t border-white/10">
          {mockPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-3xl">
              <div className="flex flex-col md:w-2/3">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white bg-white/10 px-3 py-1 rounded-full">{post.date}</span>
                  <div className="w-12 h-[1px] bg-white/20 group-hover:w-24 transition-all duration-500 hidden md:block"></div>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-300 group-hover:text-white transition-colors duration-500 tracking-tight leading-tight">
                  {post.title.pl}
                </h2>
              </div>
              <div className="mt-6 md:mt-0 md:w-1/3 flex md:justify-end items-center gap-8">
                <p className="text-gray-500 text-sm md:text-base leading-relaxed md:text-right hidden md:block">
                  {post.excerpt.pl}
                </p>
                <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-white flex items-center justify-center shrink-0 transition-colors duration-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-black transition-colors duration-500"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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
