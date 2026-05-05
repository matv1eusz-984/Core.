"use client";
import { useState, useEffect } from "react";
import { sendEmail } from "@/app/actions/sendEmail";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";

export default function OrderPage() {
  const [dict, setDict] = useState<any>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [clientType, setClientType] = useState<"b2b" | "b2c">("b2b");

  useEffect(() => {
    // Load dict on client for simplicity since this has deep interactivity
    getDictionary().then(d => setDict(d));
    
    // Check URL params for type
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("type") === "b2c") {
      setClientType("b2c");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const form = new FormData(e.currentTarget);
      // Append client type
      form.append("message", `[TYP KLIENTA: ${clientType.toUpperCase()}]\n\n${form.get("message")}\n\nNIP: ${form.get("nip")}`);
      
      const res = await sendEmail(form);
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (!dict) return <div className="min-h-screen bg-background" />;

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white/20">
      
      <section className="pt-48 pb-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient uppercase tracking-tighter">{dict.order.title}</h1>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            {dict.order.desc}
          </p>
        </div>

        {status === "success" ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-16 rounded-[3rem] text-center border-green-500/30">
            <CheckCircle2 size={80} className="text-green-500 mx-auto mb-8" />
            <h3 className="text-4xl font-bold mb-4">{dict.footer.formSuccessTitle}</h3>
            <p className="text-gray-400 mb-8">{dict.footer.formSuccessDesc}</p>
            <button onClick={() => setStatus("idle")} className="btn-premium px-8 py-4 bg-white text-black font-bold rounded-full">
              {dict.footer.formSubmitAnother}
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl">
            <div className="flex gap-4 mb-10 p-2 bg-white/5 rounded-2xl">
              <button 
                onClick={() => setClientType("b2b")}
                className={`flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${clientType === 'b2b' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                {dict.order.company}
              </button>
              <button 
                onClick={() => setClientType("b2c")}
                className={`flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${clientType === 'b2c' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                {dict.order.private}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-2">{dict.footer.formName}</label>
                  <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all font-light" placeholder="Jan Kowalski / Nazwa Firmy" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-2">{dict.footer.formEmail}</label>
                  <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all font-light" placeholder="kontakt@domena.pl" />
                </div>
              </div>

              {clientType === "b2b" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-2">{dict.order.nip}</label>
                  <input name="nip" type="text" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all font-light" placeholder="000-000-00-00" />
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-2">{dict.order.details}</label>
                <textarea name="message" required rows={6} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all font-light resize-none" placeholder="Opisz swój pomysł, wymagania i estetykę, w którą celujesz..." />
              </div>

              <button disabled={status === "loading"} type="submit" className="btn-premium w-full py-6 bg-white text-black font-bold text-lg rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-50 mt-8">
                {status === "loading" ? <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <>{dict.order.submit} <Send size={20} /></>}
              </button>

              {status === "error" && (
                <p className="flex items-center justify-center gap-2 text-red-500 text-sm mt-4"><AlertCircle size={14} /> {dict.footer.formError}</p>
              )}
            </form>
          </motion.div>
        )}
      </section>

    </main>
  );
}
