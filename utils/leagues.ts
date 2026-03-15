import { FaTrophy, FaBolt } from 'react-icons/fa'

// 1. Configuración Visual y de Textos
export const LEAGUE_CONFIG = {
  legends: {
    id: 'legends',
    name: 'LEYENDAS',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500',
    bgColor: 'bg-yellow-500/10',
    gradient: 'from-yellow-900/40 to-slate-900',
    icon: FaTrophy
  },
  trifasica: {
    id: 'trifasica',
    name: 'EXPERTOS EN TRIFÁSICA',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500',
    bgColor: 'bg-cyan-900/20',
    gradient: 'from-cyan-900/40 to-slate-900',
    icon: FaBolt 
  },
  alterna: {
    id: 'alterna',
    name: 'ANALISTAS DE ALTERNA',
    color: 'text-purple-400',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-900/20',
    gradient: 'from-purple-900/40 to-slate-900',
    icon: FaBolt
  },
  continua: {
    id: 'continua',
    name: 'ESTUDIANTES DE CONTINUA',
    color: 'text-slate-400', // Gris claro para que se lea bien
    borderColor: 'border-slate-600',
    bgColor: 'bg-slate-800/40',
    gradient: 'from-slate-800 to-slate-950',
    icon: FaBolt
  }
}

// 2. Lógica de cálculo de cortes
export function getLeagueThresholds(totalPlayers: number) {
  // 1. Separar a las leyendas (Top 10, o el total si hay menos de 10)
  const cutLegends = Math.min(10, totalPlayers)

  // 2. Calcular cuántos alumnos quedan después de quitar a las leyendas
  const remainingPlayers = totalPlayers - cutLegends

  // 3. Aplicar porcentajes SOLO a los restantes y sumarlo al corte anterior
  return {
    cutLegends, 
    // 20% de los alumnos restantes se van a Trifásica
    cutTrifasica: cutLegends + Math.floor(remainingPlayers * 0.2), 
    // 50% de los alumnos restantes se van a Alterna (acumulado)
    cutAlterna: cutLegends + Math.floor(remainingPlayers * 0.5)    
  }
}

// 3. Función para saber la liga de un usuario concreto
export function getLeagueByRank(rank: number, totalPlayers: number) {
  const { cutLegends, cutTrifasica, cutAlterna } = getLeagueThresholds(totalPlayers)

  if (rank <= cutLegends) return LEAGUE_CONFIG.legends
  if (rank <= cutTrifasica) return LEAGUE_CONFIG.trifasica
  if (rank <= cutAlterna) return LEAGUE_CONFIG.alterna
  
  return LEAGUE_CONFIG.continua
}

// 4. Generador de Usuarios Falsos (Para que sea idéntico en ambos lados)
export function generateFakeUsers(count: number = 150) {
    return Array.from({ length: count }).map((_, i) => ({
        user_id: `fake-${i}`,
        nickname: `Agente ${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        avatar_url: null, // O una url genérica
        lifetime_score: Math.floor(Math.random() * 8000), 
        rank: 0 
    }));
}