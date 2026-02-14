//ruta: app/icon.tsx
import { ImageResponse } from 'next/og'

// Configuración de la imagen (Metadatos)
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Generación del icono
export default function Icon() {
  return new ImageResponse(
    (
      // 1. Círculo Amarillo de fondo
      <div
        style={{
          fontSize: 24,
          background: '#FACC15', // El amarillo de tu app
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0F172A', // El color oscuro de tu app (slate-900)
          borderRadius: '50%',
        }}
      >
        {/* 2. El Rayo (Dibujado con SVG simple) */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ margin: 'auto' }}
        >
          {/* Forma de rayo estándar */}
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}