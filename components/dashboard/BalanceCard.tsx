// Ruta: components/dashboard/BalanceCard.tsx
'use client' // <--- Ahora es interactivo

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaBolt, FaPen, FaCheck, FaTimes } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface BalanceCardProps {
  userId: string
  initialNickname: string | null
  initialFullName: string | null
  balance: number
}

export default function BalanceCard({ userId, initialNickname, initialFullName, balance }: BalanceCardProps) {
  const supabase = createClient()
  const router = useRouter()

  // Estados para controlar la edición
  const [isEditing, setIsEditing] = useState(false)
  const [nickname, setNickname] = useState(initialNickname || initialFullName || 'Estudiante')
  const [tempNickname, setTempNickname] = useState(nickname)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!tempNickname.trim()) return
    setLoading(true)

    // Guardamos en Supabase
    const { error } = await supabase
      .from('profiles')
      .update({ nickname: tempNickname })
      .eq('id', userId)

    if (!error) {
      setNickname(tempNickname)
      setIsEditing(false)
      router.refresh() // Refresca la página para que todos los datos estén sincronizados
    } else {
      console.error('Error actualizando nickname:', error)
      alert('No se pudo actualizar el nombre')
    }
    setLoading(false)
  }

  return (
    <div className="w-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden transition-all">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-xl"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white opacity-10 blur-xl"></div>

      <div className="relative z-10">
        
        {/* ZONA DE NOMBRE EDITABLE */}
        <div className="flex items-center gap-3 h-8">
          {isEditing ? (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
              <input 
                type="text" 
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                className="bg-white/20 border border-white/30 rounded px-2 py-1 text-sm text-white placeholder-white/50 focus:outline-none focus:bg-white/30 w-40"
                autoFocus
                disabled={loading}
              />
              <button onClick={handleSave} disabled={loading} className="p-1.5 hover:bg-green-500/20 rounded-full text-green-300 transition-colors">
                <FaCheck size={14} />
              </button>
              <button onClick={() => setIsEditing(false)} disabled={loading} className="p-1.5 hover:bg-red-500/20 rounded-full text-red-300 transition-colors">
                <FaTimes size={14} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 group">
              <h2 className="text-lg font-medium opacity-90">Hola, <span className="font-bold">{nickname}</span></h2>
              <button 
                onClick={() => {
                  setTempNickname(nickname)
                  setIsEditing(true)
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-full text-white/70 hover:text-white"
                title="Editar nombre"
              >
                <FaPen size={12} />
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-indigo-200 uppercase tracking-wider font-semibold">Saldo Actual</p>
          <div className="flex items-center gap-3 mt-1">
            <FaBolt className="text-yellow-400 text-4xl animate-pulse" />
            <span className="text-5xl font-bold tracking-tight">{balance}</span>
            <span className="text-xl self-end mb-2 font-medium opacity-80">Electrones</span>
          </div>
        </div>
      </div>
    </div>
  )
}