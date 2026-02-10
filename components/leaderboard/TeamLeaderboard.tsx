// Ruta: components/leaderboard/TeamLeaderboard.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaTrophy } from 'react-icons/fa'
import { TeamAssignment } from './TeamAssignment' 
import { useRouter } from 'next/navigation'
// Importamos el nuevo componente
import TeamLeaderboardCard, { TeamLeaderboardEntry } from './TeamLeaderboardCard'

export default function TeamLeaderboard() {
  const [loading, setLoading] = useState(true)
  const [hasTeam, setHasTeam] = useState(false)
  const [teamData, setTeamData] = useState<TeamLeaderboardEntry[]>([]) 
  
  const supabase = createClient()
  const router = useRouter()

  const checkUserTeam = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('team')
        .eq('id', user.id)
        .single()

      if (profile?.team) {
        setHasTeam(true)
        await fetchLeaderboardData()
      } else {
        setHasTeam(false)
      }
    } catch (error) {
      console.error('Error verificando equipo:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchLeaderboardData = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_team_leaderboard', { min_score_threshold: 0 })

      if (error) throw error

      if (data) {
        setTeamData(data)
      }
    } catch (error) {
      console.error('Error cargando ranking de equipos:', error)
    }
  }

  useEffect(() => {
    checkUserTeam()
  }, [])

  const handleAssignmentComplete = () => {
    setHasTeam(true)
    fetchLeaderboardData() 
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-500 text-sm animate-pulse">Sincronizando facciones...</p>
      </div>
    )
  }

  if (!hasTeam) {
    return <TeamAssignment onAssignComplete={handleAssignmentComplete} />
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4">
      
      {/* Cabecera de la sección */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <FaTrophy className="text-3xl" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
          Guerra de Facciones
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          Compite junto a tu equipo. La puntuación total es la suma de la energía generada por todos los miembros activos.
        </p>
      </div>

      {/* Lista de Tarjetas */}
      <div className="space-y-4">
        {teamData.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
             <p className="text-slate-500">No hay datos disponibles en este momento.</p>
          </div>
        ) : (
          teamData.map((team, index) => (
            <TeamLeaderboardCard 
              key={team.id} 
              entry={team} 
              rank={index + 1} 
            />
          ))
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-slate-600">
          * La clasificación se actualiza en tiempo real basado en la actividad de los usuarios.
        </p>
      </div>

    </div>
  )
}