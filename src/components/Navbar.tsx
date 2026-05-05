"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CopyMailto } from "./CopyMailto";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({
  dict,
}: {
  dict: any;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <div 
        className={`pointer-events-auto px-8 py-3 rounded-full flex items-center gap-12 max-w-4xl w-full justify-between transition-all duration-500 ${
          isScrolled 
            ? "bg-[var(--navbar-glass)] backdrop-blur-xl border border-[var(--glass-border)] shadow-sm" 
            : "bg-transparent border-transparent"
        }`}
      >
        <Link href="/" aria-label="Go to homepage" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 rounded-sm text-foreground shrink-0">
          CORE.
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-foreground/70">
          <Link href="/#pricing" className="hover:text-foreground transition-colors focus-visible:text-foreground focus-visible:outline-none">
            {dict.pricing}
          </Link>
          <Link href="/#nasze-uslugi" className="hover:text-foreground transition-colors focus-visible:text-foreground focus-visible:outline-none">
            {dict.portfolio}
          </Link>
          <Link href="/oferta" className={`transition-colors focus-visible:text-foreground focus-visible:outline-none ${pathname === '/oferta' ? 'text-foreground font-bold' : 'hover:text-foreground'}`}>
            {dict.offer}
          </Link>
          <Link href="/zamow" className={`transition-colors focus-visible:text-foreground focus-visible:outline-none ${pathname === '/zamow' ? 'text-foreground font-bold' : 'hover:text-foreground'}`}>
            {dict.order}
          </Link>
          <CopyMailto email="rnstock.trades@gmail.com" copiedText={dict.copied} className="hover:text-foreground transition-colors focus-visible:text-foreground focus-visible:outline-none text-left">
            {dict.contact}
          </CopyMailto>
        </div>
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:bg-foreground/5 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 md:hidden pointer-events-auto"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] bg-background border-l border-[var(--glass-border)] z-50 p-12 md:hidden flex flex-col gap-8 shadow-2xl pointer-events-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold tracking-tighter">CORE.</Link>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-6 text-2xl font-bold uppercase tracking-tighter">
                <Link href="/#pricing" className="hover:text-primary transition-colors">
                  {dict.pricing}
                </Link>
                <Link href="/#nasze-uslugi" className="hover:text-primary transition-colors">
                  {dict.portfolio}
                </Link>
                <Link href="/oferta" className={`transition-colors ${pathname === '/oferta' ? 'text-primary' : ''}`}>
                  {dict.offer}
                </Link>
                <Link href="/zamow" className={`transition-colors ${pathname === '/zamow' ? 'text-primary' : ''}`}>
                  {dict.order}
                </Link>
                <div className="pt-8 border-t border-white/10">
                  <CopyMailto 
                    email="rnstock.trades@gmail.com" 
                    copiedText={dict.copied} 
                    className="text-primary text-lg"
                  >
                    {dict.contact}
                  </CopyMailto>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
