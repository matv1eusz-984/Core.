import { getDictionary } from "@/lib/get-dictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dict = await getDictionary();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar dict={dict.common} />
      <article className="pt-48 pb-24 px-6 max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-16 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Journal
        </Link>
        <h1 className="text-5xl md:text-7xl font-bold mb-10 tracking-tighter leading-[0.9] text-white italic uppercase">
          {slug.replace(/-/g, ' ')}
        </h1>
        <div className="prose prose-invert prose-lg max-w-none text-gray-400">
          <p className="text-xl text-white mb-8">
            Detailed content for {slug} would go here. This is a placeholder for the full article content.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </article>
      <Footer dict={dict.footer} />
    </main>
  );
}
