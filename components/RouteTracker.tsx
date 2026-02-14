// Ruta: components/RouteTracker.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function RouteTracker() {
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const trackVisit = async () => {
      // 1. Obtenemos la sesión para asegurarnos de que hay un usuario
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      // 2. Detectamos el tipo de dispositivo de forma básica para el estudio
      const ua = navigator.userAgent
      let device = 'Desktop'
      if (/tablet|ipad|playbook|silk/i.test(ua)) device = 'Tablet'
      else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) device = 'Mobile'

      // 3. Llamamos a la RPC que creamos en la base de datos
      const { error } = await supabase.rpc('increment_page_visit', {
        p_path: pathname,
        p_device: device
      })

      if (error) console.error('Error tracking visit:', error)
    }

    trackVisit()
  }, [pathname, supabase]) // Se dispara cada vez que cambia el path

  return null // Este componente no renderiza nada visualmente
}