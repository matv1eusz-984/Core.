import { getDictionary } from "@/lib/get-dictionary";
import SpecializationContent from "@/components/SpecializationContent";
import { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const dict = await getDictionary();
  const data = specializationData[slug];
  
  if (!data) return { title: "Not Found" };
  
  const currentData = data.pl || data.en;
  
  return {
    title: `${currentData.title} | AG Premium`,
    description: currentData.desc,
  };
}

const specializationData: Record<string, any> = {
  "visionary-os": {
    en: {
      title: "Visionary OS",
      tech: "PWA, Service Workers, React, TypeScript, Tailwind v4",
      desc: "We build Progressive Web Apps that behave like native desktop and mobile applications. High-performance caching, offline capabilities, and OS-level integrations."
    },
    pl: {
      title: "Visionary OS",
      tech: "PWA, Service Workers, React, TypeScript, Tailwind v4",
      desc: "Budujemy progresywne aplikacje internetowe (PWA), które zachowują się jak natywne aplikacje desktopowe i mobilne. Wysokowydajne cache'owanie, działanie offline i integracja na poziomie systemu operacyjnego."
    }
  },
  "spatial-commerce": {
    en: {
      title: "Spatial Commerce",
      tech: "Three.js, WebGL, GLSL, Framer Motion 3D",
      desc: "Immersive 3D shopping experiences that bridge the gap between physical and digital. We push the limits of WebGL to create realistic product interactions."
    },
    pl: {
      title: "Handel Przestrzenny",
      tech: "Three.js, WebGL, GLSL, Framer Motion 3D",
      desc: "Immersyjne doświadczenia zakupowe 3D, które niwelują różnicę między światem fizycznym a cyfrowym. Przesuwamy granice WebGL, aby tworzyć realistyczne interakcje z produktami."
    }
  },
  "neo-banking": {
    en: {
      title: "Neo Banking",
      tech: "Next.js Edge, Prisma, Fintech Security, Real-time APIs",
      desc: "Ultra-secure, low-latency financial dashboards. Leveraging Edge Computing to provide real-time data visualization with uncompromising security standards."
    },
    pl: {
      title: "Neo Bankowość",
      tech: "Next.js Edge, Prisma, Bezpieczeństwo Fintech, Real-time API",
      desc: "Ultra-bezpieczne panele finansowe o niskim opóźnieniu. Wykorzystujemy Edge Computing, aby zapewnić wizualizację danych w czasie rzeczywistym przy zachowaniu restrykcyjnych standardów bezpieczeństwa."
    }
  }
};

export default async function SpecializationPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const dict = await getDictionary();
  const data = specializationData[slug];

  if (!data) return <div>Not Found</div>;

  const currentData = data.pl || data.en;

  return (
    <SpecializationContent data={currentData} dict={dict} slug={slug} />
  );
}
