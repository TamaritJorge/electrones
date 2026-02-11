'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { TeamAssignment } from './TeamAssignment' 
import { useRouter } from 'next/navigation'
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
      
      {/* Lista de Tarjetas */}
      <div className="flex flex-col items-center w-full space-y-3">
        {teamData.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 w-full">
             <p className="text-slate-500">No hay datos disponibles en este momento.</p>
          </div>
        ) : (
          teamData.map((team, index) => {
            const isFirst = index === 0;
            
            return (
              <div 
                key={team.id}
                className={`w-full transition-all duration-500 ${isFirst ? 'mb-8 z-10' : 'opacity-90 hover:opacity-100'}`}
                style={isFirst ? {
                    // Brillo potente: Una sombra dura y otra difusa del color del equipo
                    boxShadow: `0 0 40px -10px ${team.hex_color}50, 0 0 10px ${team.hex_color}40`,
                    transform: 'translateY(-5px)' // Pequeña elevación
                } : undefined}
              >
                <TeamLeaderboardCard 
                  entry={team} 
                  rank={index + 1} 
                />
              </div>
            )
          })
        )}
      </div>

      <div className="mt-12 text-center opacity-0 hover:opacity-100 transition-opacity duration-700">
        <p className="text-[10px] text-slate-700">
          Clasificación dinámica en tiempo real
        </p>
      </div>

    </div>
  )
}