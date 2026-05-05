import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import { getDictionary } from "@/lib/get-dictionary";
import { SiteProvider } from "@/lib/SiteContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateMetadata() {
  const dict = await getDictionary();
  
  return {
    title: dict.seo.home.title,
    description: dict.seo.home.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dict = await getDictionary();

  return (
    <html lang="pl" className="dark" suppressHydrationWarning>
      <head suppressHydrationWarning>
      </head>
      <body className="mesh-bg min-h-screen" suppressHydrationWarning>
        <SiteProvider initialDict={dict}>
          <Preloader />
          <Navbar dict={dict.common} />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Footer dict={dict.footer} />
        </SiteProvider>
      </body>
    </html>
  );
}
