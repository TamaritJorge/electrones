// Ruta: components/leaderboard/IndividualLeaderboardSummaryCard.tsx
'use client'

import { FaCrown, FaBolt } from 'react-icons/fa'
import { 
  LEAGUE_CONFIG, 
  getLeagueThresholds, 
  getLeagueByRank 
} from '@/utils/leagues'

interface LeaderboardEntry {
  user_id: string
  nickname: string
  avatar_url: string | null
  lifetime_score: number
  rank: number
  team_id?: string | null
}

interface SummaryCardProps {
  currentUserEntry: LeaderboardEntry | null
  totalPlayers: number
  allEntries: LeaderboardEntry[] 
}

// Mapa de colores hexadecimales para el brillo (necesario para la sombra CSS)
const LEAGUE_GLOW_COLORS: Record<string, string> = {
  legends: '#eab308',   // Yellow-500
  trifasica: '#f97316', // Orange-500
  alterna: '#3b82f6',   // Blue-500
  continua: '#64748b',  // Slate-500
}

export default function IndividualLeaderboardSummaryCard({ 
  currentUserEntry, 
  totalPlayers,
  allEntries 
}: SummaryCardProps) {

  if (!currentUserEntry) return null

  // 1. Calcular Liga y Colores
  const currentLeague = getLeagueByRank(currentUserEntry.rank, totalPlayers)
  const LeagueIcon = currentLeague.icon
  const glowColor = LEAGUE_GLOW_COLORS[currentLeague.id] || '#ffffff'

  // 2. Calcular Objetivos
  const thresholds = getLeagueThresholds(totalPlayers)
  let nextRankTarget = 1
  
  if (currentLeague.id === LEAGUE_CONFIG.continua.id) {
    nextRankTarget = thresholds.cutAlterna 
  } else if (currentLeague.id === LEAGUE_CONFIG.alterna.id) {
    nextRankTarget = Math.max(thresholds.cutLegends, thresholds.cutTrifasica)
  } else if (currentLeague.id === LEAGUE_CONFIG.trifasica.id) {
    nextRankTarget = thresholds.cutLegends
  } else {
    nextRankTarget = 1 
  }

  // 3. Calcular Puntos Faltantes
  const targetEntry = allEntries.find(e => e.rank === nextRankTarget)
  const pointsNeeded = targetEntry 
    ? Math.max(0, (targetEntry.lifetime_score - currentUserEntry.lifetime_score) + 1)
    : 0

  return (
    <>
      {/* Inyectamos estilos CSS dinámicos para la animación del brillo.
          Usamos variables CSS (--glow-color) para que el keyframe funcione con cualquier color.
      */}
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px -5px var(--glow-color); border-color: rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 40px 5px var(--glow-color); border-color: var(--glow-color); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>

      <div 
        className="w-full mb-8 relative overflow-hidden rounded-2xl border transition-all duration-500"
        style={{ 
          // @ts-ignore
          '--glow-color': glowColor,
          animation: 'pulse-glow 3s infinite ease-in-out' // Aquí aplicamos la animación definida arriba
        }}
      >
        
        {/* FONDO BASE */}
        <div className={`absolute inset-0 bg-gradient-to-r ${currentLeague.gradient} opacity-90 z-0`} />

        {/* EFECTO DE MOVIMIENTO INTERNO (The "Living Energy" Effect) */}
        {/* Este div rota lentamente detrás del contenido para dar sensación de fluido */}
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-30 animate-spin-slow pointer-events-none z-0 mix-blend-overlay">
           <div className={`w-full h-full bg-gradient-to-tr from-transparent via-${currentLeague.color} to-transparent`} />
        </div>
        
        {/* CONTENIDO (Z-10 para estar encima del fondo) */}
        <div className="relative z-10 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* IZQUIERDA: Info del Usuario */}
          <div className="flex items-center gap-6 w-full md:w-auto">
            
            {/* Icono grande con brillo estático intenso */}
            <div 
              className={`hidden sm:flex h-20 w-20 rounded-full items-center justify-center border-2 ${currentLeague.borderColor} bg-slate-950/30 backdrop-blur-sm`}
              style={{ boxShadow: `0 0 25px ${glowColor}60` }}
            >
               <LeagueIcon className={`text-4xl ${currentLeague.color} drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
            </div>

            <div className="flex flex-col items-center md:items-start">
               <div className="flex items-center gap-2 mb-1">
                  <span className="text-slate-300 text-[10px] uppercase tracking-wider font-bold bg-black/40 px-2 py-0.5 rounded-md border border-white/10 shadow-sm">
                    Tu Posición Global
                  </span>
               </div>
               
               {/* RANKING + TOTAL */}
               <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    #{currentUserEntry.rank}
                  </span>
                  <span className="text-xl font-bold text-slate-300/60">
                    / {totalPlayers}
                  </span>
               </div>
               
               <span className={`text-sm font-bold ${currentLeague.color} uppercase tracking-widest mb-2 opacity-100 drop-shadow-sm`}>
                  {currentLeague.name}
               </span>

               {/* Electrones totales */}
               <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 shadow-inner">
                  <p className="text-slate-300 text-sm font-medium">
                    Electrones totales:
                  </p>
                  <div className="flex items-center gap-1">
                      <span className="text-white font-bold">{currentUserEntry.lifetime_score.toLocaleString()}</span>
                      <FaBolt className="text-yellow-400 text-xs drop-shadow-[0_0_8px_rgba(250,204,21,1)]" />
                  </div>
               </div>
            </div>
          </div>

          {/* DERECHA: Meta Simplificada */}
          {currentUserEntry.rank > 1 && (
            <div className="w-full md:w-auto bg-black/40 backdrop-blur-md rounded-xl px-6 py-4 border border-white/10 flex items-center justify-center transition-transform hover:scale-[1.02] shadow-xl group">
               <div className="flex items-center gap-3">
                  <span className="font-black text-white text-3xl tabular-nums tracking-tight drop-shadow-md">
                      {pointsNeeded.toLocaleString()}
                  </span>
                  <div className="flex flex-col items-start leading-none">
                      <FaBolt className="text-yellow-400 text-lg mb-0.5 animate-pulse drop-shadow-[0_0_8px_rgba(250,204,21,1)]" />
                      <span className="text-slate-300 text-[10px] uppercase font-bold tracking-wider group-hover:text-white transition-colors">
                          Para ascender
                      </span>
                  </div>
               </div>
            </div>
          )}

          {/* Caso especial: El número 1 */}
          {currentUserEntry.rank === 1 && (
             <div className="w-full md:w-auto bg-yellow-500/20 backdrop-blur-md rounded-xl p-4 border border-yellow-500/50 flex items-center gap-4 shadow-[0_0_30px_rgba(234,179,8,0.4)] animate-pulse">
                <FaCrown className="text-3xl text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,1)]" />
                <div>
                  <p className="text-yellow-200 font-bold text-lg">¡Eres el Primero!</p>
                  <p className="text-yellow-100/80 text-sm">Rey de la colina.</p>
                </div>
             </div>
          )}

        </div>
      </div>
    </>
  )
}