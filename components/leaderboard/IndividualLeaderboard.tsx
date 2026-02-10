// Ruta: components/leaderboard/IndividualLeaderboard.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaChevronDown, FaBolt, FaUsers } from 'react-icons/fa' // Agregado FaUsers
import PlayerCard from '@/components/leaderboard/PlayerCard'
import IndividualLeaderboardSummaryCard from '@/components/leaderboard/IndividualLeaderboardSummaryCard' 

import { 
  LEAGUE_CONFIG, 
  getLeagueThresholds, 
  generateFakeUsers 
} from '@/utils/leagues'

interface LeaderboardEntry {
  user_id: string
  nickname: string
  avatar_url: string | null
  lifetime_score: number
  rank: number
  team_id?: string | null 
}

export default function IndividualLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [currentUserEntry, setCurrentUserEntry] = useState<LeaderboardEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedLeague, setExpandedLeague] = useState<string | null>('legends')
  const [teamsMap, setTeamsMap] = useState<Record<string, any>>({})

  const supabase = createClient()

  useEffect(() => {
    const initData = async () => {
      setLoading(true)
      await Promise.all([fetchLeaderboard(), fetchTeams()])
      setLoading(false)
    }
    initData()
  }, [])

  // 1. CARGAR DATOS DE EQUIPOS
  const fetchTeams = async () => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('id, name, hex_color, icon_key') 
      
      if (error) throw error

      const map: Record<string, any> = {}
      data?.forEach(team => {
        map[team.id.toLowerCase()] = team
      })
      setTeamsMap(map)
    } catch (err) {
      console.error('Error cargando equipos:', err)
    }
  }

  // 2. CARGAR RANKING (VERSIÓN LIMPIA)
  const fetchLeaderboard = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data, error } = await supabase.rpc('get_global_leaderboard')
      
      if (error) throw error

      // Mapeo seguro para evitar fallos de nombres de columnas (id vs user_id)
      let allEntries: LeaderboardEntry[] = (data || []).map((item: any) => ({
         user_id: item.user_id || item.id, 
         nickname: item.nickname || 'Agente Desconocido',
         avatar_url: item.avatar_url || null,
         lifetime_score: item.lifetime_score || 0,
         rank: 0, 
         team_id: item.team_id || null
      }));

      // Generar Bots
      const TEAM_IDS = ['tesla', 'maxwell', 'ayrton', 'clarke'];
      const fakeUsers = generateFakeUsers(150).map((u, i) => ({
         user_id: u.user_id,
         nickname: u.nickname,
         avatar_url: u.avatar_url,
         lifetime_score: u.lifetime_score,
         rank: 0,
         team_id: TEAM_IDS[i % TEAM_IDS.length] 
      })) as LeaderboardEntry[]
      
      // Unificar
      // @ts-ignore
      allEntries = [...allEntries, ...fakeUsers];

      // Ordenar y asignar Ranking
      allEntries.sort((a, b) => b.lifetime_score - a.lifetime_score);
      allEntries = allEntries.map((entry, index) => ({ 
        ...entry, 
        rank: index + 1 
      }));

      setEntries(allEntries)

      // Buscar al usuario actual
      if (user) {
        const foundEntry = allEntries.find((e) => e.user_id === user.id)
        setCurrentUserEntry(foundEntry || null)
      }

    } catch (err) {
      console.error('Error cargando ranking:', err)
    }
  }

  // --- LÓGICA DE CORTES ---
  const { cutLegends, cutTrifasica, cutAlterna } = getLeagueThresholds(entries.length)
  const groupLegends = entries.slice(0, cutLegends);
  const groupTrifasica = entries.slice(cutLegends, Math.max(cutLegends, cutTrifasica));
  const groupAlterna = entries.slice(Math.max(cutLegends, cutTrifasica), cutAlterna);
  const groupContinua = entries.slice(cutAlterna);

  if (loading) {
     return (
        <div className="w-full max-w-4xl mx-auto mt-12 space-y-4">
           {[1,2,3].map(i => (<div key={i} className="h-24 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800"></div>))}
        </div>
     )
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 pb-20 space-y-6">
        
        {/* TARJETA RESUMEN PERSONAL */}
        <IndividualLeaderboardSummaryCard 
          currentUserEntry={currentUserEntry}
          totalPlayers={entries.length}
          allEntries={entries}
        />

        {/* LIGAS DESPLEGABLES */}
        <div className="space-y-4">
            <LeagueSection 
                config={LEAGUE_CONFIG.legends} 
                players={groupLegends} 
                expandedLeague={expandedLeague}
                setExpandedLeague={setExpandedLeague}
                currentUserId={currentUserEntry?.user_id}
                teamsMap={teamsMap}
            />
            <LeagueSection 
                config={LEAGUE_CONFIG.trifasica} 
                players={groupTrifasica} 
                expandedLeague={expandedLeague}
                setExpandedLeague={setExpandedLeague}
                currentUserId={currentUserEntry?.user_id}
                teamsMap={teamsMap}
            />
            <LeagueSection 
                config={LEAGUE_CONFIG.alterna} 
                players={groupAlterna} 
                expandedLeague={expandedLeague}
                setExpandedLeague={setExpandedLeague}
                currentUserId={currentUserEntry?.user_id}
                teamsMap={teamsMap}
            />
            <LeagueSection 
                config={LEAGUE_CONFIG.continua} 
                players={groupContinua} 
                expandedLeague={expandedLeague}
                setExpandedLeague={setExpandedLeague}
                currentUserId={currentUserEntry?.user_id}
                teamsMap={teamsMap}
            />
        </div>

        {/* FOOTER: TOTAL PARTICIPANTES */}
        <div className="flex items-center justify-center pt-8 opacity-40 hover:opacity-80 transition-opacity select-none">
            <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-full border border-white/5">
                <FaUsers className="text-slate-400 text-sm" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                    Participantes totales: {entries.length}
                </span>
            </div>
        </div>

    </div>
  )
}

// --- SUB-COMPONENTES ---

interface LeagueSectionProps {
  config: any;
  players: LeaderboardEntry[];
  expandedLeague: string | null;
  setExpandedLeague: (id: string | null) => void;
  currentUserId?: string;
  teamsMap: Record<string, any>;
}

const LeagueSection = ({ config, players, expandedLeague, setExpandedLeague, currentUserId, teamsMap }: LeagueSectionProps) => {
    if (players.length === 0) return null;

    const isExpanded = expandedLeague === config.id;
    const maxScore = players[0]?.lifetime_score || 0;
    const minScore = players[players.length - 1]?.lifetime_score || 0;

    return (
      <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded ? `${config.borderColor} shadow-lg` : 'border-slate-800'}`}>
        <button 
          onClick={() => setExpandedLeague(isExpanded ? null : config.id)}
          className={`w-full p-4 flex items-center justify-between transition-colors ${config.bgColor} hover:brightness-110`}
        >
          <div className="flex items-center gap-4">
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
            <div className="hidden sm:block text-right">
               <div className={`font-mono font-bold ${config.color} flex items-center gap-2 justify-end text-sm`}>
                  {maxScore.toLocaleString()} <span className="opacity-50">-</span> {minScore.toLocaleString()}
                  <FaBolt className="text-xs opacity-70"/>
               </div>
            </div>
            <div className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
               <FaChevronDown />
            </div>
          </div>
        </button>

        {isExpanded && (
           <div className="bg-slate-900/50 p-4 space-y-2 border-t border-slate-800">
              {players.map((entry) => {
                  const fullTeamData = entry.team_id ? teamsMap[entry.team_id.toLowerCase()] : null;

                  return (
                    <PlayerCard 
                      key={entry.user_id}
                      rank={entry.rank}
                      nickname={entry.nickname}
                      avatarUrl={entry.avatar_url}
                      score={entry.lifetime_score}
                      isCurrentUser={entry.user_id === currentUserId}
                      leagueColor={config.color}
                      team={fullTeamData}
                    />
                  )
              })}
           </div>
        )}
      </div>
    )
}