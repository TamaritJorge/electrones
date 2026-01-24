import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav"; 
import Header from "@/components/Header"; // <--- 1. IMPORTAR HEADER

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Electrones UJI",
  description: "Monedero virtual para estudiantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900`}
      >
        {/* 2. INSERTAR HEADER AQUÍ */}
        <Header />

        {/* 3. AÑADIR pt-16 PARA QUE EL HEADER NO TAPE EL CONTENIDO */}
        <div className="min-h-screen pb-20 pt-16">
          {children}
        </div>

        <BottomNav />
        
      </body>
    </html>
  );
}