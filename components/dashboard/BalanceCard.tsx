// Ruta: components/dashboard/BalanceCard.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { 
  FaBolt, 
  FaPen, 
  FaCheck, 
  FaTimes, 
  FaUserCircle, 
  FaCamera, 
  FaMedal,
  FaTrophy 
} from 'react-icons/fa'
import { useRouter } from 'next/navigation'

import { 
  LEAGUE_CONFIG, 
  getLeagueByRank, 
  generateFakeUsers 
} from '@/utils/leagues'

import { formatTeam, TeamUI } from '@/utils/teams' 

interface BalanceCardProps {
  userId: string
  initialNickname: string | null
  initialFullName: string | null
  initialAvatarUrl: string | null
  balance: number
  lifetimeScore: number
  groupName: string | null
  rawTeamData: any | null 
}

type LeagueDataType = typeof LEAGUE_CONFIG.legends;

export default function BalanceCard({ 
  userId, 
  initialNickname, 
  initialFullName, 
  initialAvatarUrl,
  balance,
  lifetimeScore,
  groupName,
  rawTeamData 
}: BalanceCardProps) {
  const supabase = createClient()
  const router = useRouter()

  // Transformación de datos del equipo
  const team: TeamUI | null = useMemo(() => {
    return rawTeamData ? formatTeam(rawTeamData) : null
  }, [rawTeamData])

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [nickname, setNickname] = useState(initialNickname || initialFullName || 'Estudiante')
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || '')
  
  const [tempNickname, setTempNickname] = useState(nickname)
  const [tempAvatarUrl, setTempAvatarUrl] = useState(avatarUrl)

  const [globalRank, setGlobalRank] = useState<number | null>(null)
  const [leagueData, setLeagueData] = useState<LeagueDataType | null>(null)

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const { data: realUsers } = await supabase.rpc('get_global_leaderboard')
        
        if (realUsers) {
          const fakeUsers = generateFakeUsers(150);
          // @ts-ignore
          const allUsers = [...realUsers, ...fakeUsers];
          
          // @ts-ignore
          const currentUserIndexInArray = allUsers.findIndex((u) => u.user_id === userId);
          if (currentUserIndexInArray !== -1) {
              // @ts-ignore
              allUsers[currentUserIndexInArray].lifetime_score = lifetimeScore;
          }

          // @ts-ignore
          const sorted = allUsers.sort((a, b) => b.lifetime_score - a.lifetime_score)
          
          // @ts-ignore
          const myIndex = sorted.findIndex((u) => u.user_id === userId)
          const rank = myIndex !== -1 ? myIndex + 1 : null
          
          setGlobalRank(rank)

          if (rank) {
            const league = getLeagueByRank(rank, sorted.length);
            setLeagueData(league);
          }
        }
      } catch (error) {
        console.error("Error calculando rango:", error);
      }
    }

    fetchRank()
  }, [userId, lifetimeScore]) 

  const handleSave = async () => {
    setLoading(true)
    const { error } = await supabase.rpc('update_own_profile_info', {
      new_nickname: tempNickname,
      new_avatar_url: tempAvatarUrl
    })

    if (!error) {
      setNickname(tempNickname)
      setAvatarUrl(tempAvatarUrl)
      setIsEditing(false)
      const event = new CustomEvent('profile_updated', { detail: { avatar_url: tempAvatarUrl } });
      window.dispatchEvent(event);
      router.refresh() 
    } else {
      console.error('Error actualizando perfil:', error)
      alert('Error al guardar los cambios.')
    }
    setLoading(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTempNickname(nickname)
    setTempAvatarUrl(avatarUrl)
  }

  // Estilos de la tarjeta global
  const cardStyle = team ? {
    borderColor: `${team.styles.text.color}40`,
    boxShadow: `0 10px 40px -10px ${team.styles.text.color}20`
  } : {}

  return (
    <div 
      className="w-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden transition-all duration-500 border border-transparent"
      style={cardStyle}
    >
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-white opacity-5 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-white opacity-5 blur-2xl"></div>

      {/* Orbe de fondo del equipo */}
      {team && (
         <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-[80px] pointer-events-none"
            style={{ backgroundColor: team.styles.text.color }}
         ></div>
      )}

      {!isEditing && (
        <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-3">
            <Link 
              href="/achievements"
              className="bg-black/20 hover:bg-black/40 p-2 rounded-full text-yellow-300 transition-all backdrop-blur-sm border border-white/10 shadow-lg group"
              title="Mis Logros"
            >
              <FaMedal size={20} className="group-hover:scale-110 transition-transform" />
            </Link>

            {leagueData && globalRank && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg animate-in fade-in slide-in-from-right-4 duration-700">
                  <div className={`${leagueData.color} drop-shadow-sm`}>
                    <leagueData.icon size={14} />
                  </div>
                  <span className={`text-xs font-black font-mono tracking-wider ${leagueData.color}`}>
                    #{globalRank}
                  </span>
              </div>
            )}
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div className="relative group shrink-0">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt="Avatar" 
                className="w-16 h-16 rounded-2xl object-cover bg-slate-800 transition-all duration-500"
                style={{ 
                    // 👇 CAMBIOS AQUÍ: Borde más grueso y con brillo (Glow)
                    borderWidth: '4px',
                    borderColor: team ? team.styles.text.color : 'rgba(255,255,255,0.2)',
                    boxShadow: team ? `0 0 20px -5px ${team.styles.text.color}` : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <div 
                className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center transition-all duration-500"
                style={{ 
                    // 👇 CAMBIOS AQUÍ TAMBIÉN
                    borderWidth: '4px',
                    borderColor: team ? team.styles.text.color : 'rgba(255,255,255,0.2)',
                    boxShadow: team ? `0 0 20px -5px ${team.styles.text.color}` : 'none'
                }}
              >
                <FaUserCircle size={32} className="text-white/60" />
              </div>
            )}
          </div>

          <div className={`flex-1 min-w-0 pt-1 ${!isEditing ? 'pr-14' : ''}`}>
            {isEditing ? (
              <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                <div>
                  <label className="text-xs text-indigo-200 font-bold uppercase ml-1">Apodo</label>
                  <input 
                    type="text" 
                    value={tempNickname}
                    onChange={(e) => setTempNickname(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                    placeholder="Tu apodo..."
                  />
                </div>
                <div>
                  <label className="text-xs text-indigo-200 font-bold uppercase ml-1 flex items-center gap-1">
                    <FaCamera size={10} /> URL Imagen
                  </label>
                  <input 
                    type="text" 
                    value={tempAvatarUrl}
                    onChange={(e) => setTempAvatarUrl(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/80 placeholder-white/30 focus:outline-none focus:border-white/40"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-2 mt-1">
                  <button onClick={handleSave} disabled={loading} className="flex-1 bg-green-500/80 hover:bg-green-500 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <FaCheck /> Guardar
                  </button>
                  <button onClick={handleCancel} disabled={loading} className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <FaTimes /> Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 group flex-wrap">
                  <h2 className="text-xl font-bold truncate leading-tight">
                    {nickname}
                  </h2>
                  
                  {/* ICONO DEL EQUIPO */}
                  {team?.Icon && (
                    <div 
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur border border-white/10"
                        title={`Miembro de ${team.name}`}
                    >
                        <team.Icon size={12} style={{ color: team.styles.text.color }} />
                    </div>
                  )}

                  <button onClick={() => setIsEditing(true)} className="opacity-60 hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-full">
                    <FaPen size={12} />
                  </button>
                </div>
                
                <p className="text-indigo-200 text-xs mt-0.5 truncate">{initialFullName}</p>
                
                {groupName && (
                  <p className="text-indigo-300/70 text-[10px] uppercase font-bold tracking-wide mt-1 border-l-2 border-indigo-400/30 pl-2 leading-tight">
                    {groupName}
                  </p>
                )}
                
                {leagueData && (
                  <p className={`text-[10px] font-black uppercase mt-1 ${leagueData.color} opacity-90 flex items-center gap-1 tracking-wider`}>
                      {leagueData.name}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {!isEditing && (
          <div className="flex items-stretch gap-3 mt-2">
            <div className="flex-1 bg-black/20 rounded-2xl p-4 flex items-center justify-between border border-white/5 relative overflow-hidden group hover:bg-black/30 transition-colors">
              <div className="relative z-10">
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider">Disponible</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{balance}</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/20 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <FaBolt className="text-slate-900 text-xl" />
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-3 flex flex-col items-center justify-center border border-white/5 w-24 text-center group hover:bg-white/15 transition-colors">
              <FaTrophy className="text-yellow-400 mb-1 group-hover:rotate-12 transition-transform" size={14} />
              <span className="text-lg font-bold leading-none">{lifetimeScore}</span>
              <span className="text-[10px] text-indigo-200 uppercase font-bold mt-1">Total</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}