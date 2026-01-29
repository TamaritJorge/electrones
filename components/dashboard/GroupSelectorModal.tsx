// Ruta: components/dashboard/GroupSelectorModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaUsers, FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface GroupSelectorProps {
  userId: string
  currentGroup: string | null
}

const GROUPS = [
  'Grado en Ingeniería en Tecnologías Industriales',
  'Grado en Ingeniería Eléctrica',
  'Grado en Ingeniería Mecánica',
  'Euruji (ARA)'
]

export default function GroupSelectorModal({ userId, currentGroup }: GroupSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    // Si no tiene grupo asignado, abrimos el modal
    if (!currentGroup) {
      setIsOpen(true)
    }
  }, [currentGroup])

  const handleSave = async () => {
    if (!selectedGroup) return
    setLoading(true)

    // 🔒 CAMBIO DE SEGURIDAD:
    // Usamos la función RPC 'set_student_group' en lugar de un update directo.
    // Esto funciona aunque hayamos quitado los permisos de escritura en la tabla.
    const { error } = await supabase.rpc('set_student_group', { 
      group_name: selectedGroup 
    })

    if (!error) {
      setIsOpen(false)
      router.refresh() // Recargar para que la app sepa el nuevo grupo
    } else {
      alert('Error al guardar el grupo. Inténtalo de nuevo.')
      console.error(error)
    }
    setLoading(false)
  }

  // Si ya tiene grupo o el modal está cerrado, no renderizamos nada
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-800 w-full max-w-md rounded-2xl p-8 border border-slate-700 shadow-2xl animate-in zoom-in-95 duration-300">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-400/20">
            <FaUsers className="text-slate-900 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Bienvenido a Electrones</h2>
          <p className="text-slate-400">
            Para comenzar, necesitamos saber a qué grupo de la asignatura perteneces.
          </p>
        </div>

        <div className="space-y-3">
          {GROUPS.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group ${
                selectedGroup === group 
                  ? 'bg-yellow-400 border-yellow-400 text-slate-900 font-bold shadow-lg shadow-yellow-400/10 transform scale-[1.02]' 
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
              }`}
            >
              <span className="text-sm">{group}</span>
              {selectedGroup === group && <FaCheck />}
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={!selectedGroup || loading}
          className={`w-full mt-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            selectedGroup 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg' 
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Guardando...' : 'Confirmar Grupo'}
        </button>

        <p className="text-center text-xs text-slate-600 mt-4">
          Una vez seleccionado, no podrás cambiarlo manualmente.
        </p>

      </div>
    </div>
  )
}