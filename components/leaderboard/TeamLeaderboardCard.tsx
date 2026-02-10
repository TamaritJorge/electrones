// Ruta: components/leaderboard/TeamLeaderboardCard.tsx
import { FaBolt, FaUsers, FaTrophy, FaMedal } from 'react-icons/fa'
import { formatTeam } from '@/utils/teams'

export interface TeamLeaderboardEntry {
  id: string
  name: string
  hex_color: string
  icon_key: string
  total_score: number
  member_count: number
}

interface CardProps {
  entry: TeamLeaderboardEntry
  rank: number
}

export default function TeamLeaderboardCard({ entry, rank }: CardProps) {
  
  // 1. Usamos tu utilidad para obtener el icono y estilos procesados
  const teamStyles = formatTeam(entry)
  const FactionIcon = teamStyles.Icon

  // 2. Estilos según ranking
  const getRankStyle = (position: number) => {
    switch (position) {
      case 1:
        return {
          rankIcon: <FaTrophy className="text-yellow-400 text-xl drop-shadow-md" />,
          border: 'border-yellow-500/50',
          bg: 'bg-gradient-to-r from-yellow-500/10 to-slate-900/40',
        }
      case 2:
        return {
          rankIcon: <FaMedal className="text-slate-300 text-xl drop-shadow-md" />,
          border: 'border-slate-400/50',
          bg: 'bg-gradient-to-r from-slate-400/10 to-slate-900/40',
        }
      case 3:
        return {
          rankIcon: <FaMedal className="text-orange-400 text-xl drop-shadow-md" />,
          border: 'border-orange-500/50',
          bg: 'bg-gradient-to-r from-orange-500/10 to-slate-900/40',
        }
      default:
        return {
          rankIcon: <span className="text-base font-bold text-slate-500 font-mono">#{position}</span>,
          border: 'border-slate-800',
          bg: 'bg-slate-900/40',
        }
    }
  }

  const rankStyle = getRankStyle(rank)

  return (
    <div 
      className={`relative w-full flex items-center justify-between p-4 rounded-xl border ${rankStyle.border} ${rankStyle.bg} transition-all duration-300 hover:scale-[1.01] hover:shadow-lg mb-3`}
      style={{
        boxShadow: `inset 0 0 20px ${entry.hex_color}05`
      }}
    >
      {/* Barra lateral de color */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl" 
        style={{ backgroundColor: entry.hex_color, boxShadow: `0 0 15px ${entry.hex_color}80` }}
      />

      {/* SECCIÓN IZQUIERDA: Rank + Icono + Nombre */}
      <div className="flex items-center gap-5 pl-4">
        
        {/* Ranking */}
        <div className="w-8 flex justify-center items-center">
          {rankStyle.rankIcon}
        </div>

        <div className="flex items-center gap-4">
            {/* Icono de Facción en círculo */}
            <div 
                className="w-10 h-10 rounded-full flex items-center justify-center border bg-slate-950/50 backdrop-blur-sm"
                style={{ 
                    borderColor: entry.hex_color,
                    boxShadow: `0 0 10px ${entry.hex_color}40`
                }}
            >
                <FactionIcon className="text-lg" style={{ color: entry.hex_color }} />
            </div>

            {/* Nombre de la Facción (Coloreado y limpio) */}
            <h4 
              className="text-xl font-black tracking-tight drop-shadow-sm" 
              style={{ color: entry.hex_color }}
            >
                {entry.name}
            </h4>
        </div>
      </div>

      {/* SECCIÓN DERECHA: Estadísticas (Sin etiquetas de texto) */}
      <div className="flex items-center gap-6 sm:gap-8 pr-2">
        
        {/* Miembros */}
        <div className="hidden sm:flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity" title="Miembros activos">
          <span className="text-slate-300 font-mono text-sm font-bold">{entry.member_count}</span>
          <FaUsers className="text-slate-400 text-xs" />
        </div>

        {/* Puntuación */}
        <div className="flex items-center gap-2 min-w-[80px] justify-end" title="Energía total">
          <span className="text-white font-mono text-xl font-bold drop-shadow-md">
            {entry.total_score.toLocaleString()}
          </span>
          <FaBolt className="text-yellow-400 text-sm animate-pulse" />
        </div>

      </div>

    </div>
  )
}