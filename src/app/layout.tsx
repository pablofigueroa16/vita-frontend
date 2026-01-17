import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import BarraLateral from "@/components/BarraLateral/BarraLateral";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vita Platform",
  description: "Lifeware Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        
        <script
          // Establece el tema antes de la hidratación para evitar FOUC
          dangerouslySetInnerHTML={{
            __html: `(() => { try {
  const ls = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = ls ? ls : (systemPrefersDark ? 'dark' : 'light');
  const root = document.documentElement;
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
  root.setAttribute('data-theme-transition', '');
} catch (_) {} })();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} data-theme-transition>
         
         
         
       

      
           
           
    
          <main className="lg:pl-[90px] pl-0 pt-1">
            {children}
             <BarraLateral />

            
          </main>
         
      </body>
    </html>
  );
}
