// Ruta: components/Header.tsx
'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function Header() {
  // 1. PRIMERO: Todos los Hooks
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  // Efecto para cargar el avatar Y escuchar cambios
  useEffect(() => {
    const supabase = createClient()

    const fetchAvatar = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .single()
        
        if (data?.avatar_url) {
          setAvatarUrl(data.avatar_url)
        }
      }
    }

    fetchAvatar()

    const handleProfileUpdate = (event: any) => {
      if (event.detail?.avatar_url) {
        setAvatarUrl(event.detail.avatar_url)
      }
    }

    window.addEventListener('profile_updated', handleProfileUpdate)

    return () => {
      window.removeEventListener('profile_updated', handleProfileUpdate)
    }
  }, []) 

  // 2. SEGUNDO: Ahora sí, podemos decidir si mostramos el componente o no
  if (pathname === '/login') return null

  // 3. TERCERO: Funciones auxiliares y renderizado
  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/login')
    router.refresh()
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-center px-4 shadow-sm">
      <div className="w-full max-w-md flex justify-between items-center">
        
        {/* PARTE IZQUIERDA: Avatar + Nombre App */}
        <div className="flex items-center gap-3">
          <div className="relative">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt="Perfil" 
                className="w-9 h-9 rounded-full border-2 border-yellow-400/50 object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700 text-slate-400">
                <FaUserCircle size={24} />
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full"></span>
          </div>

          <span className="font-bold text-lg text-white tracking-tight">
            Electrones
          </span>
        </div>

        {/* PARTE DERECHA: Botón de Logout */}
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-full hover:bg-white/5"
          title="Cerrar Sesión"
        >
          {isLoggingOut ? (
            <span className="animate-spin block h-4 w-4 border-2 border-slate-500 border-t-transparent rounded-full"></span>
          ) : (
            <FaSignOutAlt size={20} />
          )}
        </button>

      </div>
    </header>
  )
}