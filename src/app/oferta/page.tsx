import { getDictionary } from "@/lib/get-dictionary";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { Building2, User } from "lucide-react";

export default async function OfertaPage() {
  const dict = await getDictionary();
  const offer = dict.offer;

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white/20">
      
      <section className="pt-48 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Umowa o Dzieło / B2B / B2C</span>
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-black mb-8 text-white uppercase tracking-tighter leading-none break-words">{offer.title}</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Dostarczam rozwiązania zarówno dla potężnych firm potrzebujących skalowalnych systemów, jak i dla twórców budujących swoją markę w sieci. Rozliczenia realizujemy wygodnie poprzez platformy dla freelancerów (np. Useme).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          {/* B2B */}
          <div className="glass p-12 rounded-[3rem] border border-white/10 hover:border-primary/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-all -z-10" />
            <Building2 className="w-16 h-16 text-blue-400 mb-8" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight break-words">{offer.b2bTitle}</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
              {offer.b2bDesc}
            </p>
            <ul className="space-y-4 mb-12">
              <li className="flex items-center gap-3 text-gray-300"><span className="w-2 h-2 rounded-full bg-blue-400" /> Skomplikowane panele administracyjne</li>
              <li className="flex items-center gap-3 text-gray-300"><span className="w-2 h-2 rounded-full bg-blue-400" /> Architektura Microservices</li>
              <li className="flex items-center gap-3 text-gray-300"><span className="w-2 h-2 rounded-full bg-blue-400" /> Optymalizacja wskaźników Core Web Vitals</li>
            </ul>
            <Link href="/zamow?type=b2b" className="btn-premium inline-block w-full text-center py-5 bg-white text-black font-bold rounded-full hover:scale-[1.02] transition-transform shadow-lg">
              Zapytaj o Ofertę B2B
            </Link>
          </div>

          {/* B2C */}
          <div className="glass p-12 rounded-[3rem] border border-white/10 hover:border-purple-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/20 transition-all -z-10" />
            <User className="w-16 h-16 text-purple-400 mb-8" />
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">{offer.b2cTitle}</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
              {offer.b2cDesc}
            </p>
            <ul className="space-y-4 mb-12">
              <li className="flex items-center gap-3 text-gray-300"><span className="w-2 h-2 rounded-full bg-purple-400" /> Artystyczne portfolio i wizytówki</li>
              <li className="flex items-center gap-3 text-gray-300"><span className="w-2 h-2 rounded-full bg-purple-400" /> Integracja z social media</li>
              <li className="flex items-center gap-3 text-gray-300"><span className="w-2 h-2 rounded-full bg-purple-400" /> Animacje przyciągające wzrok (GSAP)</li>
            </ul>
            <Link href="/zamow?type=b2c" className="btn-premium inline-block w-full text-center py-5 bg-white text-black font-bold rounded-full hover:scale-[1.02] transition-transform shadow-lg">
              Zamów Stronę Wizytówkę
            </Link>
          </div>
        </div>
      </section>

      <FAQ dict={dict.faq} />
    </main>
  );
}
