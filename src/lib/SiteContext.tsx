"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SiteData {
  name: string;
  industry: string;
  style: string;
  heroTitle?: string;
  heroSubtitle?: string;
}

interface SiteContextType {
  siteData: SiteData;
  updateSiteData: (newData: Partial<SiteData>) => void;
  isPreloaderDone: boolean;
  setPreloaderDone: (val: boolean) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children, initialDict }: { children: ReactNode; initialDict: any }) {
  const [siteData, setSiteData] = useState<SiteData>({
    name: "AG.",
    industry: "Web Development",
    style: "Modern",
    heroTitle: initialDict.hero.title,
    heroSubtitle: initialDict.hero.subtitle,
  });
  
  const [isPreloaderDone, setPreloaderDone] = useState(false);

  const updateSiteData = (newData: Partial<SiteData>) => {
    setSiteData((prev) => {
      const merged = { ...prev, ...newData };

      // Forced Dark Mode
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }

      return {
        ...merged,
        heroTitle: newData.name ? `${newData.name}: The Future of ${newData.industry || "Business"}` : prev.heroTitle,
        heroSubtitle: newData.style ? `A breathtaking ${newData.style} experience tailored to perform perfectly.` : prev.heroSubtitle,
      };
    });
  };

  return (
    <SiteContext.Provider value={{ siteData, updateSiteData, isPreloaderDone, setPreloaderDone }}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within SiteProvider");
  return context;
};
