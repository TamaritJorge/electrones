// Ruta: app/login/page.tsx
'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
// 👇 He cambiado FaUserAstronaut por FaStar
import { FaBolt, FaTrophy, FaStar, FaChartLine } from 'react-icons/fa' 

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleLogin = async () => {
    setLoading(true)
    setErrorMessage(null)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
            hd: 'uji.es',
          },
        },
      })
      if (error) throw error
    } catch (error) {
      setErrorMessage('Error al conectar con Google. Inténtalo de nuevo.')
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black px-4 py-12">
      
      {/* Efecto de brillo de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50">
        
        {/* Cabecera */}
        <div className="p-8 pb-6 text-center border-b border-slate-800/50">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-4 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <FaBolt className="text-3xl text-yellow-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            Electrones
          </h1>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
            Academia de Agentes UJI
          </p>
        </div>

        {/* Cuerpo / Descripción */}
        <div className="p-8 space-y-6">
          
          {/* Pequeña descripción de características */}
          <div className="space-y-3 text-sm text-slate-300">
            <p className="text-center mb-4 text-slate-400">
              Bienvenido a la plataforma de gamificación para electrotecnia.
            </p>
            
            <div className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
              <FaTrophy className="text-yellow-500" />
              <span>Compite en el <strong>Ranking Global</strong></span>
            </div>
            
            <div className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
              <FaChartLine className="text-cyan-400" />
              <span>Sigue tu progreso académico</span>
            </div>
            
            {/* 👇 LÍNEA MODIFICADA */}
            <div className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
              <FaStar className="text-purple-400" />
              <span>Obtén <strong>ventajas</strong> para la asignatura</span>
            </div>

          </div>

          {/* Botón de Login */}
          <div className="pt-2">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full group relative flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 font-bold py-3.5 px-4 rounded-xl transition-all transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                 <span className="w-5 h-5 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin"></span>
              ) : (
                 <FcGoogle size={24} className="group-hover:drop-shadow-sm transition-all" />
              )}
              <span>Acceder con cuenta <strong>UJI</strong></span>
            </button>
            <p className="mt-3 text-[10px] text-center text-slate-500 font-mono">
              Solo se permite el acceso a correos @uji.es
            </p>
          </div>

          {/* Mensajes de Error */}
          {errorMessage && (
            <div className="animate-in fade-in slide-in-from-top-2">
              <p className="text-red-400 text-xs text-center bg-red-950/30 border border-red-900/50 p-3 rounded-lg">
                {errorMessage}
              </p>
            </div>
          )}
        </div>

        {/* Footer Legal */}
        <div className="p-6 bg-slate-950/50 text-center border-t border-slate-800/50">
          <p className="text-xs text-slate-500 leading-relaxed">
            Al iniciar sesión, aceptas nuestros{' '}
            <Link href="/terms" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
              Términos de Servicio
            </Link> y{' '} 
            <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
              Política de Privacidad
            </Link>.
            <br />
            Los datos se utilizarán de forma anónima para fines de investigación.
          </p>
        </div>
      </div>
    </div>
  )
}