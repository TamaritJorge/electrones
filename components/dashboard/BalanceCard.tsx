// Ruta: components/dashboard/BalanceCard.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaBolt, FaPen, FaCheck, FaTimes, FaUserCircle, FaCamera } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface BalanceCardProps {
  userId: string
  initialNickname: string | null
  initialFullName: string | null
  initialAvatarUrl: string | null
  balance: number
}

export default function BalanceCard({ 
  userId, 
  initialNickname, 
  initialFullName, 
  initialAvatarUrl,
  balance 
}: BalanceCardProps) {
  const supabase = createClient()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Estados para los datos
  const [nickname, setNickname] = useState(initialNickname || initialFullName || 'Estudiante')
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || '')
  
  // Estados temporales para la edición
  const [tempNickname, setTempNickname] = useState(nickname)
  const [tempAvatarUrl, setTempAvatarUrl] = useState(avatarUrl)

  const handleSave = async () => {
    setLoading(true)

    // Guardamos nickname y avatar_url en Supabase
    // (Recuerda que ya dimos permiso en SQL para editar estas dos columnas)
    const { error } = await supabase
      .from('profiles')
      .update({ 
        nickname: tempNickname,
        avatar_url: tempAvatarUrl 
      })
      .eq('id', userId)

    if (!error) {
      setNickname(tempNickname)
      setAvatarUrl(tempAvatarUrl)
      setIsEditing(false)
      router.refresh() // Actualiza la página y el Header
    } else {
      console.error('Error actualizando perfil:', error)
      alert('Error al guardar los cambios')
    }
    setLoading(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTempNickname(nickname)
    setTempAvatarUrl(avatarUrl)
  }

  return (
    <div className="w-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden">
      
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-white opacity-5 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-white opacity-5 blur-2xl"></div>

      <div className="relative z-10 flex flex-col gap-6">
        
        {/* CABECERA DE LA TARJETA: FOTO Y NOMBRE */}
        <div className="flex items-start gap-4">
          
          {/* FOTO DE PERFIL */}
          <div className="relative group shrink-0">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt="Avatar" 
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md bg-slate-800"
                onError={(e) => {
                  // Si la URL falla, ocultamos la imagen
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border-2 border-white/20">
                <FaUserCircle size={32} className="text-white/60" />
              </div>
            )}
          </div>

          {/* NOMBRE Y EDICIÓN */}
          <div className="flex-1 min-w-0 pt-1">
            {isEditing ? (
              <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                {/* Input Nickname */}
                <div>
                  <label className="text-xs text-indigo-200 font-bold uppercase ml-1">Apodo</label>
                  <input 
                    type="text" 
                    value={tempNickname}
                    onChange={(e) => setTempNickname(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-black/30 transition-all"
                    placeholder="Tu apodo..."
                  />
                </div>

                {/* Input URL Avatar */}
                <div>
                  <label className="text-xs text-indigo-200 font-bold uppercase ml-1 flex items-center gap-1">
                    <FaCamera size={10} /> URL Imagen
                  </label>
                  <input 
                    type="text" 
                    value={tempAvatarUrl}
                    onChange={(e) => setTempAvatarUrl(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/80 placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-black/30 transition-all"
                    placeholder="https://..."
                  />
                </div>

                {/* Botones de acción */}
                <div className="flex gap-2 mt-1">
                  <button 
                    onClick={handleSave} 
                    disabled={loading}
                    className="flex-1 bg-green-500/80 hover:bg-green-500 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FaCheck /> Guardar
                  </button>
                  <button 
                    onClick={handleCancel}
                    disabled={loading} 
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FaTimes /> Cancelar
                  </button>
                </div>
              </div>
            ) : (
              // VISTA NORMAL
              <div>
                <div className="flex items-center gap-2 group">
                  <h2 className="text-xl font-bold truncate leading-tight">
                    {nickname}
                  </h2>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="opacity-60 hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-full"
                  >
                    <FaPen size={12} />
                  </button>
                </div>
                <p className="text-indigo-200 text-xs mt-0.5 truncate">{initialFullName}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* SALDO (Solo se muestra si NO estamos editando para ahorrar espacio, o siempre si prefieres) */}
        {!isEditing && (
          <div className="mt-2 bg-black/20 rounded-2xl p-4 flex items-center justify-between border border-white/5">
            <div>
              <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider">Saldo Disponible</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">{balance}</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/20 animate-pulse">
              <FaBolt className="text-slate-900 text-xl" />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}