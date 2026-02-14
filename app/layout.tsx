// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav"; 
import Header from "@/components/Header";
import { NotificationProvider } from "@/context/NotificationContext";
import NightOwlChecker from "@/components/NightOwlChecker";
import RouteTracker from "@/components/RouteTracker"; // <--- Importamos el rastreador de métricas

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Electrones",
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
        <NotificationProvider>
          {/* Rastreador de visitas para el Heatmap */}
          <RouteTracker /> 
          
          {/* El vigilante de logros nocturnos */}
          <NightOwlChecker /> 
          
          <Header />

          <div className="min-h-screen pb-20 pt-16">
            {children}
          </div>

          <BottomNav />
          
        </NotificationProvider>
      </body>
    </html>
  );
}