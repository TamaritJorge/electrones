//ruta: components/leaderboard/TeamLeaderboardCard.tsx
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
          rankIcon: <FaTrophy className="text-yellow-400 text-2xl sm:text-3xl drop-shadow-md" />,
          border: 'border-yellow-500/50',
          bg: 'bg-gradient-to-r from-yellow-500/20 to-slate-900/80',
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
      className={`relative w-full flex items-center justify-between gap-2 rounded-xl border ${rankStyle.border} ${rankStyle.bg} transition-all duration-300 hover:scale-[1.01] ${isFirst ? 'p-4 sm:p-6 lg:p-8' : 'p-3 sm:p-4'}`}
      style={{
        boxShadow: `inset 0 0 20px ${entry.hex_color}05`
      }}
    >
      {/* Barra lateral de color */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl" 
        style={{ backgroundColor: entry.hex_color, boxShadow: `0 0 15px ${entry.hex_color}80` }}
      />

      {/* SECCIÓN IZQUIERDA (Añadido flex-1 y min-w-0 para evitar desbordamiento) */}
      <div className="flex items-center gap-3 sm:gap-5 pl-3 sm:pl-4 flex-1 min-w-0">
        
        {/* Ranking */}
        <div className="w-6 sm:w-8 flex justify-center items-center shrink-0">
          {rankStyle.rankIcon}
        </div>

        {/* Contenedor del Icono + Nombre (Añadido flex-1 min-w-0) */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            {/* Icono de Facción: Reducido un poco en móvil para dar espacio al texto */}
            <div 
                className={`shrink-0 rounded-full flex items-center justify-center border bg-slate-950/50 backdrop-blur-sm transition-all ${isFirst ? 'w-12 h-12 sm:w-16 sm:h-16' : 'w-8 h-8 sm:w-10 sm:h-10'}`}
                style={{ 
                    borderColor: entry.hex_color,
                    boxShadow: `0 0 ${isFirst ? '20px' : '10px'} ${entry.hex_color}40`
                }}
            >
                <FactionIcon 
                  className={`transition-all ${isFirst ? 'text-2xl sm:text-3xl' : 'text-base sm:text-lg'}`} 
                  style={{ color: entry.hex_color }} 
                />
            </div>

            {/* Nombre: Añadido truncate para cortarlo si es muy largo */}
            <h4 
              className={`font-black tracking-tight drop-shadow-sm truncate ${isFirst ? 'text-xl sm:text-3xl' : 'text-lg sm:text-xl'}`}
              style={{ color: entry.hex_color }}
              title={entry.name} // Muestra el nombre completo al pasar el ratón si se trunca
            >
                {entry.name}
            </h4>
        </div>
      </div>

      {/* SECCIÓN DERECHA (Añadido shrink-0) */}
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 pr-1 sm:pr-2 shrink-0">
        
        {/* Contador de miembros: Se oculta en pantallas pequeñas para ganar espacio */}
        <div className="hidden md:flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity" title={`${entry.member_count} miembros`}>
          <span className="text-slate-300 font-mono text-sm font-bold">{entry.member_count}</span>
          <FaUsers className="text-slate-400 text-xs" />
        </div>

        {/* Puntos: Reducidos ligeramente en móvil si es isFirst */}
        <div className="flex items-center gap-1.5 sm:gap-2 justify-end">
          <span className={`text-white font-mono font-bold drop-shadow-md ${isFirst ? 'text-xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
            {entry.total_score.toLocaleString()}
          </span>
          <FaBolt className={`text-yellow-400 animate-pulse shrink-0 ${isFirst ? 'text-lg sm:text-xl' : 'text-sm'}`} />
        </div>

      </div>

    </div>
  )
}