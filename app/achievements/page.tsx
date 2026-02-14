'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaTrophy, FaBolt, FaBoxOpen, FaSearch } from 'react-icons/fa'
import AchievementArtifact from '@/components/AchievementArtifact'

type Achievement = {
  id: string
  name: string
  description: string
  icon_name: string
  reward_electrons: number
  reward_product_id: string | null
}

type MergedAchievement = Achievement & {
  isUnlocked: boolean
  unlockedAt?: string
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<MergedAchievement[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchAchievements() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // 🛠️ TRUCO DE DEBUG: Consultamos el rol en la tabla perfiles
      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profileErr) console.error('Error cargando el perfil:', profileErr)

      // Verificamos si es admin (asegúrate de que el string coincida con lo que usas en tu BD, ej: 'admin' o 'ADMIN')
      const isAdmin = profile?.role === 'admin'

      // 1. Traemos TODOS para saber el total
      const { data: allAchievements, error: allErr } = await supabase
        .from('achievements')
        .select('*')
        .order('reward_electrons', { ascending: true })

      if (allErr) console.error('Error cargando catálogo de logros:', allErr)

      // 2. Traemos los desbloqueados
      const { data: userAchievements, error: userErr } = await supabase
        .from('user_achievements')
        .select('achievement_id, unlocked_at')
        .eq('user_id', user.id)

      if (userErr) console.error('Error cargando logros del usuario:', userErr)

      if (allAchievements) {
        const unlockedIds = new Set(userAchievements?.map(ua => ua.achievement_id))
        
        const merged: MergedAchievement[] = allAchievements.map(achv => {
          const unlockedData = userAchievements?.find(ua => ua.achievement_id === achv.id)
          
          return {
            ...achv,
            // Magia aquí: Si es Admin, lo marcamos como desbloqueado siempre para poder debuguear
            isUnlocked: isAdmin || unlockedIds.has(achv.id),
            unlockedAt: unlockedData?.unlocked_at
          }
        })

        setAchievements(merged)
      }
      setLoading(false)
    }

    fetchAchievements()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <FaBolt className="animate-spin text-yellow-400 text-4xl" />
      </div>
    )
  }

  const unlockedAchievements = achievements.filter(a => a.isUnlocked)
  const unlockedCount = unlockedAchievements.length
  const totalCount = achievements.length
  const progressPercentage = totalCount === 0 ? 0 : Math.round((unlockedCount / totalCount) * 100)

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* CABECERA Y BARRA DE PROGRESO */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 mb-2 flex items-center gap-3 justify-center md:justify-start">
              <FaTrophy className="text-yellow-500" /> 
              Sala de Trofeos
            </h1>
            <p className="text-slate-400">Cada aportación en clase cuenta! Participa activamente en la asignatura, da lo mejor de ti y llena tu vitrina de recompensas.</p>
          </div>
          
          <div className="w-full md:w-64 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-sm mb-2 font-bold">
              <span className="text-slate-300">Progreso total</span>
              <span className="text-yellow-400">{unlockedCount} / {totalCount}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-amber-500 h-2.5 rounded-full transition-all duration-1000" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* ESTADO VACÍO O CUADRÍCULA DE LOGROS */}
        {unlockedAchievements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
            <FaSearch className="text-6xl mb-6 opacity-20" />
            <h3 className="text-2xl font-bold text-slate-400 mb-2">Vitrina vacía</h3>
            <p className="max-w-md text-center">Aún no has descubierto ningún logro. Participa en clase e interactúa con la plataforma para conseguir el primero.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {unlockedAchievements.map((achv) => (
              <div 
                key={achv.id} 
                className="relative overflow-hidden rounded-2xl border transition-all duration-300 p-6 flex flex-col items-center text-center bg-slate-800/80 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.15)] hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1"
              >
                <div className="mb-4 flex justify-center">
                  <AchievementArtifact iconName={achv.icon_name} className="w-20 h-20" />
                </div>

                <h3 className="font-bold text-lg mb-2 text-slate-100">
                  {achv.name}
                </h3>
                <p className="text-sm text-slate-400 mb-4 flex-grow">
                  {achv.description}
                </p>

                <div className="w-full pt-4 border-t border-slate-700/50 flex flex-wrap justify-center gap-2">
                  {achv.reward_electrons > 0 && (
                    <span className="text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 bg-blue-500/20 text-blue-300">
                      <FaBolt /> {achv.reward_electrons} pts
                    </span>
                  )}
                  {achv.reward_product_id && (
                    <span className="text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 bg-purple-500/20 text-purple-300">
                      <FaBoxOpen /> Objeto
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}