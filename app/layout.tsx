// app/layout.tsx
import type { Metadata, Viewport } from "next"; // <--- Añadimos Viewport aquí
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav"; 
import Header from "@/components/Header";
import { NotificationProvider } from "@/context/NotificationContext";
import NightOwlChecker from "@/components/NightOwlChecker";
import RouteTracker from "@/components/RouteTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// NUEVO: Configuración de la pantalla y zoom para la PWA
export const viewport: Viewport = {
  themeColor: "#0f172a", // Color slate-900 para la barra de estado superior
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Impide que el usuario haga zoom, dando sensación de app nativa
  userScalable: false, // Bloquea el zoom por "pellizco"
};

// ACTUALIZADO: Metadatos extendidos para soporte PWA, especialmente en iOS
export const metadata: Metadata = {
  title: "Electrones",
  description: "Monedero virtual para estudiantes",
  manifest: "/manifest.json", // Opcional, pero ayuda a forzar la detección del manifest
  appleWebApp: {
    capable: true, // Habilita el modo PWA en Safari/iOS
    statusBarStyle: "default", // Estilo de la barra superior en iPhone
    title: "Electrones",
  },
  formatDetection: {
    telephone: false, // Evita que el móvil convierta números como tus "Electrones" en enlaces de llamadas
  },
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