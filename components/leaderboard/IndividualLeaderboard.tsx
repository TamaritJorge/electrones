'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaRocket, FaChevronDown, FaBolt } from 'react-icons/fa' 
import PlayerCard from '@/components/leaderboard/PlayerCard'

// 👇 Importamos la configuración centralizada
import { 
  LEAGUE_CONFIG, 
  getLeagueThresholds, 
  getLeagueByRank, 
  generateFakeUsers 
} from '@/utils/leagues'

// Definimos la interfaz aquí para usarla en todo el archivo
interface LeaderboardEntry {
  user_id: string
  nickname: string
  avatar_url: string | null
  lifetime_score: number
  rank: number
}

export default function IndividualLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [currentUserEntry, setCurrentUserEntry] = useState<LeaderboardEntry | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Estado para saber qué liga está desplegada (Por defecto 'legends')
  const [expandedLeague, setExpandedLeague] = useState<string | null>('legends')

  const supabase = createClient()

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      // Llamada a la nueva función SQL que ya filtra admins
      const { data, error } = await supabase.rpc('get_global_leaderboard')
      
      if (error) throw error

      let allEntries: LeaderboardEntry[] = data || []

      // 1. GENERAR ALUMNOS VIRTUALES
      // Mapeamos para asegurar que coincidan los tipos
      const fakeUsers = generateFakeUsers(150).map(u => ({
         user_id: u.user_id,
         nickname: u.nickname,
         avatar_url: u.avatar_url,
         lifetime_score: u.lifetime_score,
         rank: 0 // Se calculará después
      })) as LeaderboardEntry[]
      
      allEntries = [...allEntries, ...fakeUsers];

      // 2. ORDENAR Y ASIGNAR RANKING
      allEntries.sort((a, b) => b.lifetime_score - a.lifetime_score);
      
      // Reasignamos el rank basado en el índice ordenado
      allEntries = allEntries.map((entry, index) => ({ 
        ...entry, 
        rank: index + 1 
      }));

      setEntries(allEntries)

      if (user) {
        const myEntry = allEntries.find((e) => e.user_id === user.id)
        setCurrentUserEntry(myEntry || null)
      }

    } catch (err) {
      console.error('Error cargando ranking:', err)
    } finally {
      setLoading(false)
    }
  }

  // --- LÓGICA DE CORTES ---
  const { cutLegends, cutTrifasica, cutAlterna } = getLeagueThresholds(entries.length)
  
  const groupLegends = entries.slice(0, cutLegends);
  const groupTrifasica = entries.slice(cutLegends, Math.max(cutLegends, cutTrifasica));
  const groupAlterna = entries.slice(Math.max(cutLegends, cutTrifasica), cutAlterna);
  const groupContinua = entries.slice(cutAlterna);

  // --- RENDERIZADO TARJETA USUARIO ---
  const renderUserStats = () => {
    if (!currentUserEntry) return null
    
    // Obtener configuración desde Utils
    const userLeague = getLeagueByRank(currentUserEntry.rank, entries.length);
    
    // Calcular siguiente objetivo
    const nextRank = Math.max(1, currentUserEntry.rank - 1);
    const targetUser = entries.find(e => e.rank === nextRank);
    
    // Si eres el primero, no necesitas puntos para subir
    const pointsNeeded = targetUser && currentUserEntry.rank > 1
      ? (targetUser.lifetime_score - currentUserEntry.lifetime_score) + 1 
      : 0;

    return (
      <div className={`mb-8 bg-gradient-to-r ${userLeague.gradient} border ${userLeague.borderColor} border-opacity-50 rounded-2xl p-6 relative overflow-hidden shadow-2xl transition-colors duration-500`}>
        
        {/* Fondo decorativo */}
        <div className={`absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full blur-3xl opacity-20 bg-white mix-blend-overlay`}></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-center md:items-start">
                <span className="text-slate-300 text-[10px] uppercase tracking-wider font-bold">Tu Posición Global</span>
                <span className="text-4xl font-black text-white">#{currentUserEntry.rank}</span>
             </div>
             
             <div className="h-10 w-[1px] bg-white/20 hidden md:block"></div>
             
             <div className="flex flex-col items-center md:items-start">
                <span className="text-slate-300 text-[10px] uppercase tracking-wider font-bold">Liga Actual</span>
                <span className={`text-xl font-bold ${userLeague.color} flex items-center gap-2 drop-shadow-sm`}>
                   {userLeague.name}
                </span>
             </div>
          </div>

          {currentUserEntry.rank > 1 && (
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-4 w-full md:w-auto">
               <div className={`p-2 rounded-lg text-white shadow-lg ${userLeague.id === 'legends' ? 'bg-yellow-600' : 'bg-indigo-600'}`}>
                  <FaRocket className="text-sm animate-pulse" />
               </div>
               <p className="text-slate-200 text-sm">
                 <span className="font-bold text-white text-lg">{pointsNeeded} pts</span> para ascender
               </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (loading) {
     return (
        <div className="w-full max-w-4xl mx-auto mt-12 space-y-4">
           {[1,2,3].map(i => (<div key={i} className="h-24 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800"></div>))}
        </div>
     )
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 pb-20 space-y-6">
        
        {/* 1. FICHA SUPERIOR (Solo si hay usuario logueado en ranking) */}
        {renderUserStats()}

        {/* 2. LISTAS DE LIGAS */}
        <div className="space-y-4">
            <LeagueSection 
                config={LEAGUE_CONFIG.legends} 
                players={groupLegends} 
                expandedLeague={expandedLeague}
                setExpandedLeague={setExpandedLeague}
                currentUserId={currentUserEntry?.user_id}
            />
            <LeagueSection 
                config={LEAGUE_CONFIG.trifasica} 
                players={groupTrifasica} 
                expandedLeague={expandedLeague}
                setExpandedLeague={setExpandedLeague}
                currentUserId={currentUserEntry?.user_id}
            />
            <LeagueSection 
                config={LEAGUE_CONFIG.alterna} 
                players={groupAlterna} 
                expandedLeague={expandedLeague}
                setExpandedLeague={setExpandedLeague}
                currentUserId={currentUserEntry?.user_id}
            />
            <LeagueSection 
                config={LEAGUE_CONFIG.continua} 
                players={groupContinua} 
                expandedLeague={expandedLeague}
                setExpandedLeague={setExpandedLeague}
                currentUserId={currentUserEntry?.user_id}
            />
        </div>

        {/* Mensaje final */}
        <div className="text-center pt-8 border-t border-slate-800/50 border-dashed">
           <p className="text-xs text-slate-600 italic">
             Academia Activa: <span className="text-slate-400 font-bold">{entries.length} Agentes</span>
           </p>
        </div>

    </div>
  )
}

// ----------------------------------------------------------------------
// 👇 COMPONENTE EXTRAÍDO FUERA (CRUCIAL PARA EVITAR RE-RENDERS)
// ----------------------------------------------------------------------

interface LeagueSectionProps {
  config: any; // O typeof LEAGUE_CONFIG.legends
  players: LeaderboardEntry[];
  expandedLeague: string | null;
  setExpandedLeague: (id: string | null) => void;
  currentUserId?: string;
}

const LeagueSection = ({ config, players, expandedLeague, setExpandedLeague, currentUserId }: LeagueSectionProps) => {
    if (players.length === 0) return null;

    const isExpanded = expandedLeague === config.id;
    const maxScore = players[0]?.lifetime_score || 0;
    const minScore = players[players.length - 1]?.lifetime_score || 0;

    return (
      <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded ? `${config.borderColor} shadow-lg` : 'border-slate-800'}`}>
        
        {/* CABECERA (Clickable) */}
        <button 
          onClick={() => setExpandedLeague(isExpanded ? null : config.id)}
          className={`w-full p-4 flex items-center justify-between transition-colors ${config.bgColor} hover:brightness-110`}
        >
          <div className="flex items-center gap-4">
             {/* Icono dinámico */}
             <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${config.borderColor} bg-slate-950/50`}>
                <config.icon className={config.color} />
             </div>
             
             <div className="text-left">
                <h4 className={`font-black uppercase tracking-wider text-sm md:text-base ${config.color}`}>
                  {config.name}
                </h4>
                <p className="text-slate-400 text-xs font-semibold">
                  {players.length} Agentes
                </p>
             </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Rango de Puntos */}
            <div className="hidden sm:block text-right">
               <div className={`font-mono font-bold ${config.color} flex items-center gap-2 justify-end text-sm`}>
                  {maxScore.toLocaleString()} <span className="opacity-50">-</span> {minScore.toLocaleString()}
                  <FaBolt className="text-xs opacity-70"/>
               </div>
            </div>

            {/* Flecha */}
            <div className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
               <FaChevronDown />
            </div>
          </div>
        </button>

        {/* LISTA DE JUGADORES (Acordeón) */}
        {isExpanded && (
           <div className="bg-slate-900/50 p-4 space-y-2 border-t border-slate-800 animate-in slide-in-from-top-2 duration-300">
              {players.map((entry) => (
                  <PlayerCard 
                    key={entry.user_id}
                    rank={entry.rank}
                    nickname={entry.nickname}
                    avatarUrl={entry.avatar_url}
                    score={entry.lifetime_score}
                    isCurrentUser={entry.user_id === currentUserId}
                    leagueColor={config.color} // Pasamos el color correcto para el badge
                  />
              ))}
           </div>
        )}
      </div>
    )
}