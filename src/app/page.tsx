import { getDictionary } from "@/lib/get-dictionary";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import StickyScrollFeatures from "@/components/StickyScrollFeatures";
import VisualShowcase from "@/components/VisualShowcase";
import TechStackMarquee from "@/components/TechStackMarquee";
import ScrollRevealText from "@/components/ScrollRevealText";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

export default async function Page() {
  const dict = await getDictionary();

  return (
    <main className="relative w-full">
        <Hero dict={dict.hero} />
        <StickyScrollFeatures dict={dict.sticky} />
        <VisualShowcase dict={dict.showcase} />
        <TechStackMarquee dict={dict.marquee} />
        <BentoGrid dict={dict.bento} />
        <ScrollRevealText dict={dict.approach} />
        <Services dict={dict.services} />
        <Portfolio dict={dict.common} />
        <Pricing dict={{ ...dict.pricingDetails, copied: dict.common.copied }} />
        <FAQ dict={dict.faq} />
    </main>
  );
}
