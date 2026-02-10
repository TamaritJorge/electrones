// Ruta: utils/teams.ts
import { 
  FaBolt, 
  FaWaveSquare, 
  FaFire, 
  FaProjectDiagram, 
  FaAtom, 
  FaLightbulb, 
  FaQuestionCircle,
  FaAppleAlt,   // Newton
  FaRadiation,  // Curie
  FaMagnet      // Faraday
} from 'react-icons/fa'
import { IconType } from 'react-icons'

// 1. DICCIONARIO DE ICONOS
// Mapea el texto de la columna 'icon_key' de Supabase al componente de React.
const ICON_MAP: Record<string, IconType> = {
  'bolt': FaBolt,            // Tesla
  'wave': FaWaveSquare,      // Maxwell
  'fire': FaFire,            // Ayrton
  'chart': FaProjectDiagram, // Clarke
  'atom': FaAtom,            // Bohr
  'bulb': FaLightbulb,       // Edison
  'apple': FaAppleAlt,       // Newton
  'radiation': FaRadiation,  // Curie
  'magnet': FaMagnet,        // Faraday
  'default': FaQuestionCircle
}

// 2. INTERFAZ (Tipo de dato para usar en el frontend)
export interface TeamUI {
  id: string
  name: string
  description: string
  Icon: IconType
  styles: {
    text: { color: string }
    bg: { backgroundColor: string }
    border: { borderColor: string }
    gradient: { background: string } 
    glow: { boxShadow: string }      
  }
}

// 3. FUNCIÓN DE MAPEO
// Transforma los datos crudos de Supabase en estilos visuales.
export const formatTeam = (dbTeam: any): TeamUI => {
  // Valores por defecto (Gris Slate)
  const defaultHex = '#64748b'
  
  // A. Si no hay objeto equipo, devolvemos el default completo
  if (!dbTeam) {
    return createTeamStyle('unknown', 'Sin Equipo', '', 'default', defaultHex)
  }

  // B. Extraemos datos (con seguridad por si algún campo viene vacío de la DB)
  // IMPORTANTE: Aquí confiamos 100% en que 'dbTeam' trae el campo 'hex_color' desde Supabase.
  const hex = dbTeam.hex_color || defaultHex
  const iconKey = dbTeam.icon_key || 'default'
  const name = dbTeam.name || 'Equipo'
  const id = dbTeam.id || 'unknown'
  const desc = dbTeam.description || ''

  return createTeamStyle(id, name, desc, iconKey, hex)
}

// Función auxiliar para no repetir código y mantener limpio el return
const createTeamStyle = (id: string, name: string, desc: string, iconKey: string, hex: string): TeamUI => {
  return {
    id,
    name,
    description: desc,
    Icon: ICON_MAP[iconKey] || ICON_MAP['default'],
    
    styles: {
      text: { color: hex },
      bg: { backgroundColor: hex }, // Nota: El componente PlayerCard suele aplicar opacidad a esto
      border: { borderColor: hex },
      // Gradiente diagonal suave
      gradient: { 
        background: `linear-gradient(135deg, ${hex} 20%, ${hex}aa 100%)` 
      },
      // Brillo/Glow basado en el color
      glow: { 
        boxShadow: `0 0 20px ${hex}40` // hex + 40 (transparencia)
      }
    }
  }
}