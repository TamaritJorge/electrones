// Ruta: context/NotificationContext.tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClient } from '@/utils/supabase/client'

export type NotificationType = 'ACHIEVEMENT' | 'CROWDFUNDING' | 'SYSTEM' | 'PURCHASE'

export interface AppNotification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  is_read: boolean
  metadata: any
  created_at: string
}

interface NotificationContextType {
  notifications: AppNotification[]
  unreadCount: number
  fetchNotifications: () => Promise<void>
  markAsRead: (id: string) => Promise<void>
  deleteNotification: (id: string) => Promise<void>
  clearAll: () => Promise<void>
}

// 1. Creamos el contexto
export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// 2. EXPORTAMOS EL PROVIDER
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const supabase = createClient()

  const fetchNotifications = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setNotifications(data as AppNotification[])
      setUnreadCount(data.filter(n => !n.is_read).length)
    }
  }

  const markAsRead = async (id: string) => {
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id)
    if (!error) fetchNotifications()
  }

  const deleteNotification = async (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    await supabase.from('notifications').delete().eq('id', id)
    fetchNotifications()
  }

  const clearAll = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setNotifications([])
    setUnreadCount(0)
    await supabase.from('notifications').delete().eq('user_id', user.id)
  }

  // --- EL EFFECT ACTUALIZADO CON POLLING Y FOCUS ---
  useEffect(() => {
    // Carga inicial
    fetchNotifications()
    
    // Refrescar al volver a la pestaña
    const handleFocus = () => fetchNotifications()
    window.addEventListener('focus', handleFocus)

    // Sondeo silencioso cada 15 segundos
    const intervalId = setInterval(() => {
      fetchNotifications()
    }, 15000)

    // Limpieza al desmontar
    return () => {
      window.removeEventListener('focus', handleFocus)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <NotificationContext.Provider 
      value={{ notifications, unreadCount, fetchNotifications, markAsRead, deleteNotification, clearAll }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

// 3. EXPORTAMOS EL HOOK PARA USARLO EN LOS COMPONENTES
export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications debe usarse dentro de un NotificationProvider')
  }
  return context
}