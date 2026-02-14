// Ruta: components/leaderboard/PlayerCard.tsx
import { FaUserCircle, FaTrophy, FaBolt } from 'react-icons/fa'
import { formatTeam } from '@/utils/teams' 

interface PlayerCardProps {
  rank: number
  nickname: string
  avatarUrl: string | null
  score: number
  isCurrentUser?: boolean
  leagueColor?: string
  team?: { id: string } | null 
}

export default function PlayerCard({ 
  rank, 
  nickname, 
  avatarUrl, 
  score, 
  isCurrentUser = false,
  leagueColor = 'text-slate-200',
  team 
}: PlayerCardProps) {
  
  const teamVisuals = team ? formatTeam(team) : null

  const isTop1 = rank === 1
  const isTop2 = rank === 2
  const isTop3 = rank === 3
  const isPodium = rank <= 3

  let podiumBorder = ''
  let podiumText = ''
  let podiumIconColor = ''

  if (isTop1) {
    podiumBorder = 'border-yellow-500/60 bg-yellow-500/10'
    podiumText = 'text-yellow-400'
    podiumIconColor = 'text-yellow-400'
  } else if (isTop2) {
    podiumBorder = 'border-slate-300/60 bg-slate-400/10'
    podiumText = 'text-slate-300'
    podiumIconColor = 'text-slate-300'
  } else if (isTop3) {
    podiumBorder = 'border-amber-700/60 bg-amber-700/10'
    podiumText = 'text-amber-600'
    podiumIconColor = 'text-amber-600'
  }

  const normalStyle = isCurrentUser 
    ? 'bg-indigo-600/20 border-indigo-500 shadow-indigo-500/20 shadow-lg translate-x-2' 
    : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'

  return (
    <div 
      className={`
        flex items-center justify-between rounded-xl border transition-all duration-300 gap-2
        ${isPodium ? `p-4 my-2 shadow-xl ${podiumBorder}` : `p-3 ${normalStyle}`}
        ${isPodium && !isCurrentUser ? 'scale-[1.02]' : ''} 
      `}
    >
      {/* AQUÍ ESTÁ LA MAGIA: 
        Añadimos flex-1 y min-w-0 al contenedor izquierdo para que 
        permita encoger el texto del nombre en lugar de empujar la puntuación 
      */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        
        {/* RANGO */}
        <div className={`
          font-black text-lg w-8 text-center font-mono flex justify-center shrink-0
          ${isPodium ? 'text-2xl' : 'text-lg'}
          ${isCurrentUser ? 'scale-110' : 'opacity-80'}
        `}>
          {isPodium ? (
            <FaTrophy className={`${podiumIconColor} drop-shadow-sm`} />
          ) : (
            <span className={leagueColor}>#{rank}</span>
          )}
        </div>

        {/* AVATAR */}
        <div className="relative shrink-0">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={nickname} 
              className={`
                rounded-full object-cover transition-all duration-300
                ${isPodium ? 'w-12 h-12' : 'w-10 h-10'}
              `}
              style={{
                borderWidth: '2px',
                borderColor: teamVisuals ? teamVisuals.styles.text.color : (isCurrentUser ? '#818cf8' : '#475569'),
                boxShadow: teamVisuals ? `0 0 10px -3px ${teamVisuals.styles.text.color}` : 'none'
              }}
            />
          ) : (
            <div 
              className={`
                rounded-full flex items-center justify-center transition-all duration-300
                ${isPodium ? 'w-12 h-12' : 'w-10 h-10'}
                ${isCurrentUser && !teamVisuals ? 'bg-indigo-900' : 'bg-slate-800'}
              `}
              style={{
                borderWidth: '2px',
                borderColor: teamVisuals ? teamVisuals.styles.text.color : (isCurrentUser ? '#818cf8' : '#475569'),
                color: teamVisuals ? teamVisuals.styles.text.color : '#94a3b8',
                boxShadow: teamVisuals ? `0 0 10px -3px ${teamVisuals.styles.text.color}` : 'none'
              }}
            >
              <FaUserCircle size={isPodium ? 24 : 20} />
            </div>
          )}
        </div>

        {/* NOMBRE + ICONO EQUIPO */}
        {/* Añadimos flex-1 para que ocupe el espacio restante y empuje el truncate */}
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {/* Quitamos los max-w fijos. Ahora truncate funciona perfectamente 
              sin importar el tamaño de pantalla 
            */}
            <span className={`
              font-bold truncate
              ${isPodium ? 'text-base text-white' : 'text-sm'}
              ${isCurrentUser ? 'text-white' : 'text-slate-200'}
            `}>
              {nickname}
            </span>
            
            {teamVisuals && (
              <div 
                className="shrink-0 opacity-90" 
                title={teamVisuals.name}
                style={{ color: teamVisuals.styles.text.color }}
              >
                <teamVisuals.Icon size={12} />
              </div>
            )}
          </div>

          {isCurrentUser && (
            <span className="text-[10px] text-indigo-300 font-normal leading-none mt-0.5">
              (Tú)
            </span>
          )}
        </div>
      </div>

      {/* SCORE */}
      {/* Añadido text-right al contenedor por si la puntuación es altísima */}
      <div className={`
        font-mono font-bold flex items-center justify-end gap-1.5 shrink-0 ml-2
        ${isPodium ? 'text-white text-lg' : 'text-sm'}
        ${isCurrentUser ? 'text-indigo-200' : 'text-slate-400'}
      `}>
        <span>{score.toLocaleString()}</span>
        <FaBolt className={`text-xs ${leagueColor} shrink-0`} />
      </div>
    </div>
  )
}