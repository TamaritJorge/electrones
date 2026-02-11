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
  
  const teamStyles = formatTeam(entry)
  const FactionIcon = teamStyles.Icon
  const isFirst = rank === 1

  // 2. Estilos según ranking
  const getRankStyle = (position: number) => {
    switch (position) {
      case 1:
        return {
          rankIcon: <FaTrophy className="text-yellow-400 text-3xl drop-shadow-md" />, // Icono más grande
          border: 'border-yellow-500/50',
          bg: 'bg-gradient-to-r from-yellow-500/20 to-slate-900/80', // Fondo un poco más evidente
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
      // CONDICIONAL: Si es primero (isFirst), usamos p-6 (más alto), si no p-4
      className={`relative w-full flex items-center justify-between rounded-xl border ${rankStyle.border} ${rankStyle.bg} transition-all duration-300 hover:scale-[1.01] ${isFirst ? 'p-6 sm:p-8' : 'p-4'}`}
      style={{
        boxShadow: `inset 0 0 20px ${entry.hex_color}05`
      }}
    >
      {/* Barra lateral de color */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl" 
        style={{ backgroundColor: entry.hex_color, boxShadow: `0 0 15px ${entry.hex_color}80` }}
      />

      {/* SECCIÓN IZQUIERDA */}
      <div className="flex items-center gap-5 pl-4">
        
        {/* Ranking */}
        <div className="w-8 flex justify-center items-center">
          {rankStyle.rankIcon}
        </div>

        <div className="flex items-center gap-4">
            {/* Icono de Facción: Más grande si es primero */}
            <div 
                className={`rounded-full flex items-center justify-center border bg-slate-950/50 backdrop-blur-sm transition-all ${isFirst ? 'w-16 h-16' : 'w-10 h-10'}`}
                style={{ 
                    borderColor: entry.hex_color,
                    boxShadow: `0 0 ${isFirst ? '20px' : '10px'} ${entry.hex_color}40`
                }}
            >
                <FactionIcon 
                  className={`transition-all ${isFirst ? 'text-3xl' : 'text-lg'}`} 
                  style={{ color: entry.hex_color }} 
                />
            </div>

            {/* Nombre: Más grande si es primero */}
            <h4 
              className={`font-black tracking-tight drop-shadow-sm ${isFirst ? 'text-3xl' : 'text-xl'}`}
              style={{ color: entry.hex_color }}
            >
                {entry.name}
            </h4>
        </div>
      </div>

      {/* SECCIÓN DERECHA */}
      <div className="flex items-center gap-6 sm:gap-8 pr-2">
        
        <div className="hidden sm:flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-slate-300 font-mono text-sm font-bold">{entry.member_count}</span>
          <FaUsers className="text-slate-400 text-xs" />
        </div>

        <div className="flex items-center gap-2 min-w-[80px] justify-end">
          <span className={`text-white font-mono font-bold drop-shadow-md ${isFirst ? 'text-3xl' : 'text-xl'}`}>
            {entry.total_score.toLocaleString()}
          </span>
          <FaBolt className={`text-yellow-400 animate-pulse ${isFirst ? 'text-xl' : 'text-sm'}`} />
        </div>

      </div>

    </div>
  )
}