// Ruta: components/Header.tsx
'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaSignOutAlt, FaUserCircle, FaUserShield } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  
  // 1. TODOS LOS HOOKS SIEMPRE PRIMERO
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  // Efecto para cargar datos
  useEffect(() => {
    const supabase = createClient()

    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('avatar_url, role')
          .eq('id', user.id)
          .single()
        
        if (data) {
          if (data.avatar_url) setAvatarUrl(data.avatar_url)
          if (data.role === 'admin') setIsAdmin(true)
        }
      }
    }

    fetchProfile()

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

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/login')
    router.refresh()
  }

  // 2. AHORA SÍ: CONDICIONALES DE RENDERIZADO AL FINAL
  // Si estamos en login, no pintamos nada, pero los hooks de arriba YA se han ejecutado.
  if (pathname === '/login') return null

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-center px-4 shadow-sm">
      <div className="w-full max-w-md flex justify-between items-center">
        
        {/* PARTE IZQUIERDA: Avatar + Nombre App */}
        <div className="flex items-center gap-3">
          <Link href="/" className="relative cursor-pointer">
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
          </Link>

          <Link href="/" className="font-bold text-lg text-white tracking-tight hover:opacity-80 transition-opacity">
            Electrones
          </Link>
        </div>

        {/* PARTE DERECHA: Botones de Acción */}
        <div className="flex items-center gap-2">
          
          {isAdmin && (
            <Link 
              href="/admin"
              className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 rounded-full transition-colors"
              title="Panel de Profesor"
            >
              <FaUserShield size={20} />
            </Link>
          )}

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

      </div>
    </header>
  )
}