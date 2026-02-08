import { FaUserCircle, FaTrophy, FaBolt } from 'react-icons/fa'

interface PlayerCardProps {
  rank: number
  nickname: string
  avatarUrl: string | null
  score: number
  isCurrentUser?: boolean
  leagueColor?: string 
}

export default function PlayerCard({ 
  rank, 
  nickname, 
  avatarUrl, 
  score, 
  isCurrentUser = false,
  leagueColor = 'text-slate-200' 
}: PlayerCardProps) {
  
  // Determinamos si es Top 1, 2 o 3 para estilos especiales
  const isTop1 = rank === 1
  const isTop2 = rank === 2
  const isTop3 = rank === 3
  const isPodium = rank <= 3

  // Configuración de estilos según el puesto
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

  // Estilo base para usuarios normales
  const normalStyle = isCurrentUser 
    ? 'bg-indigo-600/20 border-indigo-500 shadow-indigo-500/20 shadow-lg translate-x-2' 
    : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'

  return (
    <div 
      className={`
        flex items-center justify-between rounded-xl border transition-all duration-300
        ${isPodium ? `p-4 my-2 shadow-xl ${podiumBorder}` : `p-3 ${normalStyle}`}
        ${isPodium && !isCurrentUser ? 'scale-[1.02]' : ''} 
      `}
    >
      <div className="flex items-center gap-4">
        
        {/* RANGO / POSICIÓN */}
        <div className={`
          font-black text-lg w-10 text-center font-mono flex justify-center
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
        <div className="relative">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={nickname} 
              className={`
                rounded-full object-cover border-2 shadow-sm
                ${isPodium ? 'w-12 h-12' : 'w-10 h-10'}
                ${isCurrentUser ? 'border-indigo-400' : isPodium ? podiumText.replace('text', 'border') : 'border-slate-600'}
              `}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <div className={`
              rounded-full flex items-center justify-center border-2
              ${isPodium ? 'w-12 h-12' : 'w-10 h-10'}
              ${isCurrentUser ? 'bg-indigo-900 border-indigo-400' : 'bg-slate-700 border-slate-600'}
            `}>
              <FaUserCircle className="text-white/50 text-xl" />
            </div>
          )}
          
          {/* Nota: He quitado la "coronita pequeña" que había antes porque ahora ya tienen una copa grande a la izquierda */}
        </div>

        {/* NOMBRE */}
        <div className="flex flex-col">
          <span className={`
            font-bold truncate max-w-[120px] sm:max-w-[200px]
            ${isPodium ? 'text-base text-white' : 'text-sm'}
            ${isCurrentUser ? 'text-white' : 'text-slate-200'}
          `}>
            {nickname}
            {isCurrentUser && <span className="text-[10px] ml-2 text-indigo-300 font-normal">(Tú)</span>}
          </span>
        </div>
      </div>

      {/* PUNTUACIÓN */}
      <div className={`
        font-mono font-bold flex items-center gap-2
        ${isPodium ? 'text-white text-lg' : 'text-sm'}
        ${isCurrentUser ? 'text-indigo-200' : 'text-slate-400'}
      `}>
        {score.toLocaleString()} 
        {/* Icono del rayo con el color de la liga */}
        <FaBolt className={`text-xs ${leagueColor}`} />
      </div>
    </div>
  )
}