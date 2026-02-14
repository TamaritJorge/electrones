'use client'

import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function NightOwlChecker() {
  const supabase = createClient()

  useEffect(() => {
    const checkNightOwl = async () => {
      // 1. Comprobamos la hora local antes de nada
      const hour = new Date().getHours()
      
      // 2. Solo si estamos entre las 3 y las 5 AM intentamos la llamada
      if (hour >= 3 && hour < 15) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          // Llamamos a la función de la DB que ya tiene la lógica de seguridad
          await supabase.rpc('check_night_owl_achievement', { 
            target_user_id: user.id 
          })
        }
      }
    }

    checkNightOwl()
  }, [])

  return null // No ocupa espacio en la UI
}