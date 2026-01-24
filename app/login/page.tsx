// archivo : app/login/page.tsx
'use client'

import { createClient } from '@/utils/supabase/client' // <--- Importamos nuestro nuevo cliente
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
  // Usamos la función que creamos en utils
  const supabase = createClient()

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Asegúrate de que esta URL coincida con la configuración en Google Cloud y Supabase
          redirectTo: `${location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      if (error) throw error
    } catch (error) {
      setErrorMessage('Error al conectar con Google.')
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">⚡ Electrones</h1>
          <p className="text-slate-400">Plataforma de la UJI</p>
        </div>

        <div className="p-8 pt-0">
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105"
          >
            <FcGoogle size={24} />
            <span>Entrar con cuenta UJI</span>
          </button>

          {errorMessage && (
            <p className="mt-4 text-red-400 text-sm text-center bg-red-900/20 p-2 rounded">
              {errorMessage}
            </p>
          )}

          <p className="mt-6 text-xs text-center text-gray-500">
             Solo acceso permitido para cuentas @alu.uji.es y @uji.es
          </p>
        </div>
      </div>
    </div>
  )
}