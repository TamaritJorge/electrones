// Ruta: components/BottomNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaShoppingCart, FaTrophy, FaQrcode, FaMedal } from 'react-icons/fa'

export default function BottomNav() {
  const pathname = usePathname()

  // Si estamos en el login, NO mostramos el menú
  if (pathname === '/login') return null

  // Definición de los botones
  const navItems = [
    { name: 'Tienda', href: '/shop', icon: FaShoppingCart },
    { name: 'Ranking', href: '/leaderboard', icon: FaTrophy },
    { name: 'Inicio', href: '/', icon: FaHome }, // Central
    { name: 'Logros', href: '/achievements', icon: FaMedal },
    { name: 'Escanear', href: '/scan', icon: FaQrcode },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const isHome = item.href === '/'

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors relative
                ${isActive ? 'text-yellow-400' : 'text-slate-400 hover:text-slate-200'}
              `}
            >
              {/* El botón de inicio (centro) lo hacemos un poco más grande o especial si quieres */}
              <div className={`
                text-2xl mb-1 transition-transform
                ${isActive && isHome ? 'scale-110' : ''}
              `}>
                <item.icon />
              </div>
              
              <span className="text-[10px] font-medium uppercase tracking-wide">
                {item.name}
              </span>

              {/* Indicador brillante si está activo */}
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)] rounded-b-full" />
              )}
            </Link>
          )
        })}

      </div>
    </nav>
  )
}