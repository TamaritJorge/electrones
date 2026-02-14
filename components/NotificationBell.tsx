// Ruta: components/NotificationBell.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { FaBell, FaTrophy, FaRocket, FaInfoCircle, FaTimes, FaShoppingCart, FaTrashAlt } from 'react-icons/fa'
import { useNotifications } from '@/context/NotificationContext'
import type { NotificationType } from '@/context/NotificationContext'

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, deleteNotification, clearAll } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Cerrar el panel al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Asignar icono según el tipo de notificación
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'ACHIEVEMENT': return <FaTrophy className="text-yellow-400" />
      case 'CROWDFUNDING': return <FaRocket className="text-purple-400" />
      case 'PURCHASE': return <FaShoppingCart className="text-green-400" />
      default: return <FaInfoCircle className="text-blue-400" />
    }
  }

  const handleNotificationClick = (id: string, isRead: boolean) => {
    if (!isRead) markAsRead(id)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* BOTÓN DE LA CAMPANITA */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
      >
        <FaBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
        )}
      </button>

      {/* PANEL DESPLEGABLE CON LAS CLASES MÁGICAS PARA MÓVIL */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] origin-top-right bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col">
          
          {/* Cabecera del Panel */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700 shrink-0">
            <span className="font-bold text-slate-200 text-sm">Notificaciones</span>
            {notifications.length > 0 && (
              <button 
                onClick={() => clearAll()}
                className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <FaTrashAlt /> Limpiar
              </button>
            )}
          </div>

          {/* Lista de Notificaciones */}
          <div className="max-h-[350px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-sm">
                No tienes notificaciones nuevas.
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif.id, notif.is_read)}
                  className={`relative flex items-start gap-3 p-4 border-b border-slate-800/50 hover:bg-slate-800/80 transition-colors cursor-pointer group ${
                    !notif.is_read ? 'bg-slate-800/30' : ''
                  }`}
                >
                  {/* Indicador de no leída */}
                  {!notif.is_read && (
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full"></span>
                  )}

                  {/* Icono */}
                  <div className="shrink-0 mt-1 p-2 bg-slate-950/50 rounded-lg shadow-inner">
                    {getIcon(notif.type)}
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-semibold truncate ${!notif.is_read ? 'text-slate-200' : 'text-slate-400'}`}>
                      {notif.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed break-words">
                      {notif.message}
                    </p>
                  </div>

                  {/* Botón Borrar (Aparece en hover) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notif.id);
                    }}
                    className="shrink-0 p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-md opacity-0 md:group-hover:opacity-100 transition-all"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}