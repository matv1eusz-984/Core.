"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sendEmail } from "@/app/actions/sendEmail";

export default function ContactForm({ dict }: { dict: any }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const form = new FormData(e.currentTarget);
      const res = await sendEmail(form);
      if (res.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-[var(--card-bg)] backdrop-blur-3xl rounded-[2.5rem] border border-green-500/30"
      >
        <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
        <h3 className="text-3xl font-bold mb-4 text-foreground">{dict.formSuccessTitle}</h3>
        <p className="text-foreground/60">{dict.formSuccessDesc}</p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-8 px-8 py-3 bg-foreground/5 text-foreground border border-foreground/10 rounded-full hover:bg-foreground/10 transition-all font-medium"
        >
          {dict.formSubmitAnother}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-[var(--card-bg)] backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-[var(--glass-border)] relative overflow-hidden shadow-2xl shadow-black/5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-2">{dict.formName}</label>
            <input
              name="name"
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-foreground/5 border border-foreground/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all font-light text-foreground"
              placeholder={dict.formPlaceholderName}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-2">{dict.formEmail}</label>
            <input
              name="email"
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-foreground/5 border border-foreground/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all font-light text-foreground"
              placeholder={dict.formPlaceholderEmail}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-2">{dict.formMessage}</label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-foreground/5 border border-foreground/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all font-light resize-none text-foreground"
            placeholder={dict.formPlaceholderMessage}
          />
        </div>

        <button
          disabled={status === "loading"}
          type="submit"
          className="btn-premium w-full py-5 bg-primary text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {status === "loading" ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              {dict.formSubmit} <Send size={18} />
            </>
          )}
        </button>

        {status === "error" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-500 text-sm mt-4">
            <AlertCircle size={14} /> {dict.formError}
          </motion.p>
        )}
      </form>
    </div>
  );
}
