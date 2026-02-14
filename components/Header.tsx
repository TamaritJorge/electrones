// Ruta: components/Header.tsx
'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaSignOutAlt, FaUserCircle, FaUserShield } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { formatTeam, TeamUI } from '@/utils/teams' 
import NotificationBell from '@/components/NotificationBell'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  
  // 1. TODOS LOS HOOKS SIEMPRE PRIMERO
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [nickname, setNickname] = useState<string>('Estudiante')
  const [team, setTeam] = useState<TeamUI | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  // Efecto para cargar datos
  useEffect(() => {
    const supabase = createClient()

    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // 1. Obtenemos perfil con campos de equipo y nickname
        const { data: profile } = await supabase
          .from('profiles')
          .select('avatar_url, role, nickname, team, team_id')
          .eq('id', user.id)
          .single()
        
        if (profile) {
          if (profile.avatar_url) setAvatarUrl(profile.avatar_url)
          if (profile.nickname) setNickname(profile.nickname)
          if (profile.role === 'admin') setIsAdmin(true)

          // 2. Lógica para obtener el equipo visual
          const teamId = profile.team_id || profile.team
          if (teamId) {
             const { data: teamRaw } = await supabase
                .from('teams')
                .select('*')
                .eq('id', teamId)
                .single()
             
             if (teamRaw) {
                setTeam(formatTeam(teamRaw)) 
             }
          }
        }
      }
    }

    fetchProfile()

    // Escuchar cambios en el perfil (desde BalanceCard o TeamAssignment)
    const handleProfileUpdate = (event: any) => {
      if (event.detail?.avatar_url) setAvatarUrl(event.detail.avatar_url)
      // NUEVO: Cazamos el equipo cuando se emite el evento
      if (event.detail?.teamUI) setTeam(event.detail.teamUI)
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

  // 2. CONDICIONALES DE RENDERIZADO
  if (pathname === '/login') return null

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-center px-4 shadow-sm">
      <div className="w-full max-w-md flex justify-between items-center">
        
        {/* PARTE IZQUIERDA: Avatar + Info Usuario */}
        <div className="flex items-center gap-3">
          <Link href="/" className="relative cursor-pointer group">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt="Perfil" 
                className="w-10 h-10 rounded-full object-cover transition-all duration-300"
                style={{ 
                    borderWidth: '2px',
                    borderColor: team ? team.styles.text.color : '#334155',
                    boxShadow: team ? `0 0 10px -2px ${team.styles.text.color}` : 'none'
                }}
              />
            ) : (
              <div 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border-2 transition-all duration-300"
                style={{ 
                    borderColor: team ? team.styles.text.color : '#334155',
                    color: team ? team.styles.text.color : '#94a3b8'
                }}
              >
                <FaUserCircle size={24} />
              </div>
            )}
            
            {/* Punto de estado online */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full"></span>
          </Link>

          <div className="flex flex-col justify-center">
            <Link href="/" className="font-bold text-sm text-white tracking-tight hover:opacity-80 transition-opacity leading-tight">
              {nickname}
            </Link>
            
            {/* Nombre del equipo + Icono */}
            {team ? (
                <div className="flex items-center gap-1 opacity-80" style={{ color: team.styles.text.color }}>
                    <team.Icon size={10} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{team.name}</span>
                </div>
            ) : (
                <span className="text-[10px] text-slate-500 font-medium">Sin equipo</span>
            )}
          </div>
        </div>

        {/* PARTE DERECHA: Botones de Acción */}
        <div className="flex items-center gap-1">
          
          <NotificationBell />
          
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