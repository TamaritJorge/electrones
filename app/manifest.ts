// Ruta: app/manifest.ts
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Electrones',
    short_name: 'Electrones',
    description: 'Monedero virtual y sistema de recompensas para estudiantes',
    start_url: '/',
    display: 'standalone', // Esto oculta la barra de navegación del navegador (parece una app nativa)
    background_color: '#0f172a', // Tu color slate-900 para que no haya destellos blancos al cargar
    theme_color: '#0f172a', // El color de la barra de estado superior en Android
    orientation: 'portrait', // Bloqueamos la app en vertical (opcional, pero recomendado para móviles)
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable' // Permite a Android redondear o adaptar el icono a su sistema
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      // Puedes añadir el icono de Apple aquí si quieres, aunque Safari usa también etiquetas meta
      {
        src: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any'
      }
    ],
  }
}