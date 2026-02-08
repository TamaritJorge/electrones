'use client'

import { useState, useEffect } from 'react'
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

// 👇 Importamos nuestras utilidades centralizadas
import { 
  LEAGUE_CONFIG, 
  getLeagueByRank, 
  generateFakeUsers 
} from '@/utils/leagues'

interface BalanceCardProps {
  userId: string
  initialNickname: string | null
  initialFullName: string | null
  initialAvatarUrl: string | null
  balance: number
  lifetimeScore: number
  groupName: string | null
}

// Tipo para el estado de la liga (basado en lo que devuelve getLeagueByRank)
type LeagueDataType = typeof LEAGUE_CONFIG.legends;

export default function BalanceCard({ 
  userId, 
  initialNickname, 
  initialFullName, 
  initialAvatarUrl,
  balance,
  lifetimeScore,
  groupName
}: BalanceCardProps) {
  const supabase = createClient()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Datos de perfil
  const [nickname, setNickname] = useState(initialNickname || initialFullName || 'Estudiante')
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || '')
  
  // Estados temporales para edición
  const [tempNickname, setTempNickname] = useState(nickname)
  const [tempAvatarUrl, setTempAvatarUrl] = useState(avatarUrl)

  // Estado para el Rango y Liga
  const [globalRank, setGlobalRank] = useState<number | null>(null)
  const [leagueData, setLeagueData] = useState<LeagueDataType | null>(null)

  // --- 1. EFECTO PARA CALCULAR EL RANGO GLOBAL ---
  useEffect(() => {
    const fetchRank = async () => {
      try {
        // 1. Obtenemos usuarios reales
        const { data: realUsers } = await supabase.rpc('get_global_leaderboard')
        
        if (realUsers) {
          // 2. GENERAR ALUMNOS VIRTUALES (Desde Utils)
          // Usamos la misma función que el Leaderboard para consistencia
          const fakeUsers = generateFakeUsers(150);

          // 3. UNIFICAR Y ACTUALIZAR PUNTAJE ACTUAL
          // Hacemos un cast a 'any' temporalmente para facilitar la fusión, 
          // ya que la estructura de fakeUsers es compatible en los campos clave.
          const allUsers = [...realUsers, ...fakeUsers];
          
          // Actualizamos mi puntuación en la lista local por si ha cambiado recientemente
          const currentUserIndexInArray = allUsers.findIndex((u: any) => u.user_id === userId);
          if (currentUserIndexInArray !== -1) {
              allUsers[currentUserIndexInArray].lifetime_score = lifetimeScore;
          }

          // 4. ORDENAR
          const sorted = allUsers.sort((a: any, b: any) => b.lifetime_score - a.lifetime_score)
          
          // 5. BUSCAR POSICIÓN
          const myIndex = sorted.findIndex((u: any) => u.user_id === userId)
          const rank = myIndex !== -1 ? myIndex + 1 : null
          
          setGlobalRank(rank)

          // 6. DETERMINAR LIGA (Usando Utils)
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

  // --- FUNCIONES DE GUARDADO ---
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
      // Disparamos evento para que otros componentes se actualicen si es necesario
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

  return (
    <div className="w-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden transition-all duration-500">
      
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-white opacity-5 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-white opacity-5 blur-2xl"></div>

      {/* BOTONES FLOTANTES (Derecha) */}
      {!isEditing && (
        <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-3">
            
            {/* 1. Botón Logros */}
            <Link 
              href="/achievements"
              className="bg-black/20 hover:bg-black/40 p-2 rounded-full text-yellow-300 transition-all backdrop-blur-sm border border-white/10 shadow-lg group"
              title="Mis Logros"
            >
              <FaMedal size={20} className="group-hover:scale-110 transition-transform" />
            </Link>

            {/* 2. Badge de Liga y Rango */}
            {leagueData && globalRank && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg animate-in fade-in slide-in-from-right-4 duration-700">
                  <div className={`${leagueData.color} drop-shadow-sm`}>
                    {/* Renderizamos el icono dinámicamente */}
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
        
        {/* CABECERA: FOTO Y NOMBRE */}
        <div className="flex items-start gap-4">
          
          {/* FOTO */}
          <div className="relative group shrink-0">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt="Avatar" 
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md bg-slate-800"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border-2 border-white/20">
                <FaUserCircle size={32} className="text-white/60" />
              </div>
            )}
          </div>

          {/* NOMBRE Y EDICIÓN */}
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
                <div className="flex items-center gap-2 group">
                  <h2 className="text-xl font-bold truncate leading-tight">
                    {nickname}
                  </h2>
                  <button onClick={() => setIsEditing(true)} className="opacity-60 hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-full">
                    <FaPen size={12} />
                  </button>
                </div>
                <p className="text-indigo-200 text-xs mt-0.5 truncate">{initialFullName}</p>
                
                {groupName && (
                  <p className="text-indigo-300/70 text-[10px] uppercase font-bold tracking-wide mt-1 truncate border-l-2 border-indigo-400/30 pl-2">
                    {groupName}
                  </p>
                )}
                
                {/* NOMBRE DE LA LIGA (Actualizado usando datos centralizados) */}
                {leagueData && (
                  <p className={`text-[10px] font-black uppercase mt-1 ${leagueData.color} opacity-90 flex items-center gap-1 tracking-wider`}>
                      {leagueData.name}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* PARTE INFERIOR: SALDO Y PUNTOS */}
        {!isEditing && (
          <div className="flex items-stretch gap-3 mt-2">
            
            {/* Saldo Disponible */}
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

            {/* Lifetime Score */}
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