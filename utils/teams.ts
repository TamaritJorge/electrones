import { FaBolt, FaWaveSquare, FaFire, FaProjectDiagram, FaAtom, FaLightbulb, FaQuestionCircle } from 'react-icons/fa'
import { IconType } from 'react-icons'

// 1. DICCIONARIO DE ICONOS
// Mapea el texto de la columna 'icon_key' de Supabase al componente de React.
// Si añades un equipo nuevo en la DB, intenta usar una de estas claves (o añade una nueva aquí).
const ICON_MAP: Record<string, IconType> = {
  'bolt': FaBolt,            // Para Tesla
  'wave': FaWaveSquare,      // Para Maxwell
  'fire': FaFire,            // Para Ayrton
  'chart': FaProjectDiagram, // Para Clarke
  'atom': FaAtom,            // Extra por si acaso
  'bulb': FaLightbulb,       // Extra por si acaso
  'default': FaQuestionCircle
}

// 2. INTERFAZ (Tipo de dato para usar en el frontend)
export interface TeamUI {
  id: string
  name: string
  description: string
  Icon: IconType
  // Aquí guardamos los estilos ya calculados para usarlos directos en el style={}
  styles: {
    text: { color: string }
    bg: { backgroundColor: string }
    border: { borderColor: string }
    gradient: { background: string } // Generado automáticamente
    glow: { boxShadow: string }      // Efecto neón automático
  }
}

// 3. FUNCIÓN DE MAPEO AUTOMÁTICO
// Esta función recibe el objeto crudo de Supabase y te devuelve el objeto UI listo.
export const formatTeam = (dbTeam: any): TeamUI => {
  if (!dbTeam) return {
    id: 'unknown',
    name: 'Sin Equipo',
    description: '',
    Icon: ICON_MAP['default'],
    styles: {
      text: { color: '#64748b' },
      bg: { backgroundColor: '#64748b' },
      border: { borderColor: '#64748b' },
      gradient: { background: '#64748b' },
      glow: { boxShadow: 'none' }
    }
  }

  const hex = dbTeam.hex_color || '#64748b'
  const iconKey = dbTeam.icon_key || 'default'

  return {
    id: dbTeam.id,
    name: dbTeam.name,
    description: dbTeam.description,
    Icon: ICON_MAP[iconKey] || ICON_MAP['default'],
    
    // AQUÍ OCURRE LA MAGIA AUTOMÁTICA
    // Usamos el color hexadecimal de la DB para generar todas las variantes visuales
    styles: {
      text: { color: hex },
      bg: { backgroundColor: hex },
      border: { borderColor: hex },
      // Creamos un gradiente diagonal suave usando el mismo color con transparencia
      gradient: { 
        background: `linear-gradient(135deg, ${hex} 20%, ${hex}aa 100%)` 
      },
      // Creamos un brillo difuso del color del equipo
      glow: { 
        boxShadow: `0 0 20px ${hex}40` 
      }
    }
  }
}