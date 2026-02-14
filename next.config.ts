// Ruta: next.config.ts
import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  workboxOptions: {
    skipWaiting: true,
  },
});

const nextConfig: NextConfig = {
  // Aquí no añadimos nada de Turbo para evitar errores de TypeScript
  reactStrictMode: true,
};

export default withPWA(nextConfig);