'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaLock, FaTrophy } from 'react-icons/fa'
// CAMBIO IMPORTANTE: Añade llaves { } para importar la función nombrada
import { TeamAssignment } from './TeamAssignment' 
import { useRouter } from 'next/navigation'

export default function TeamLeaderboard() {
  // ... (el resto del código sigue exactamente igual)
  const [loading, setLoading] = useState(true)
  const [hasTeam, setHasTeam] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const checkUserTeam = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('team')
        .eq('id', user.id)
        .single()

      if (profile?.team) {
        setHasTeam(true)
      } else {
        setHasTeam(false)
      }
    } catch (error) {
      console.error('Error verificando equipo:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkUserTeam()
  }, [])

  const handleAssignmentComplete = () => {
    setHasTeam(true)
    router.refresh()
  }

  if (loading) {
    return <div className="text-center py-20 text-slate-500 animate-pulse">Cargando datos de facción...</div>
  }

  if (!hasTeam) {
    return <TeamAssignment onAssignComplete={handleAssignmentComplete} />
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center">
        <div className="w-20 h-20 bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400">
          <FaTrophy size={32} />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Clasificación de Equipos</h3>
        <p className="text-slate-400 mb-8">
          ¡Ya tienes equipo! En la próxima actualización verás aquí la puntuación global de tu facción contra las demás.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-sm border border-indigo-500/20">
          <FaLock />
          <span>RANKING GLOBAL EN CONSTRUCCIÓN</span>
        </div>
      </div>
    </div>
  )
}