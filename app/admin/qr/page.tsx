// Ruta: app/admin/qr/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { QRCodeSVG } from 'qrcode.react'
import { FaArrowLeft, FaBook, FaCalculator, FaFlask, FaQrcode, FaCheck, FaUsers, FaTimes, FaExpand, FaSpinner, FaStopwatch } from 'react-icons/fa'

const GROUPS = [
  'Grado en Ingeniería en Tecnologías Industriales',
  'Grado en Ingeniería Eléctrica',
  'Grado en Ingeniería Mecánica',
  'Euruji (ARA)'
]

const CLASS_TYPES = [
  { id: 'teoria', label: 'Teoría', icon: FaBook, color: 'text-blue-400', border: 'hover:border-blue-400' },
  { id: 'problemas', label: 'Problemas', icon: FaCalculator, color: 'text-orange-400', border: 'hover:border-orange-400' },
  { id: 'laboratorio', label: 'Laboratorio', icon: FaFlask, color: 'text-green-400', border: 'hover:border-green-400' },
]

export default function AdminQRPage() {
  const supabase = createClient()
  
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [showFullScreen, setShowFullScreen] = useState(false)
  
  // Estados para la lógica dinámica
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [qrCode, setQrCode] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState(5)
  const [loading, setLoading] = useState(false)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // 🔒 SEGURIDAD EXTRA: Referencia para acceder al ID durante el desmontaje
  const sessionRef = useRef<string | null>(null)

  // Mantenemos la referencia sincronizada con el estado
  useEffect(() => {
    sessionRef.current = sessionId
  }, [sessionId])

  // Generador de códigos aleatorios
  const generateRandomCode = () => Math.random().toString(36).substring(2, 8).toUpperCase()

  // 1. INICIAR SESIÓN
  const startSession = async () => {
    if (!selectedType || !selectedGroup) return
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const initialCode = generateRandomCode()

    const { data, error } = await supabase
      .from('class_sessions')
      .insert({
        group_name: selectedGroup,
        session_type: selectedType,
        secret_code: initialCode,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      console.error('Error creando sesión:', error)
      alert('Error: No tienes permisos o fallo de red.')
      setLoading(false)
      return
    }

    setSessionId(data.id)
    setQrCode(initialCode)
    setShowFullScreen(true)
    setLoading(false)
  }

  // 2. DETENER SESIÓN (Manual)
  const stopSession = async () => {
    setShowFullScreen(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    // Usamos la referencia por seguridad
    const idToClose = sessionId || sessionRef.current
    
    if (idToClose) {
      await supabase.from('class_sessions').update({ is_active: false }).eq('id', idToClose)
    }
    
    setSessionId(null)
    setQrCode('')
  }

  // 🔒 3. SEGURIDAD AUTOMÁTICA (El "Seguro de Vida")
  useEffect(() => {
    // Esta función se ejecuta si el usuario intenta cerrar la pestaña del navegador
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (sessionRef.current) {
        // Intentamos desactivar la sesión antes de morir
        supabase.from('class_sessions').update({ is_active: false }).eq('id', sessionRef.current).then()
        // Mostramos aviso estándar del navegador
        e.preventDefault()
        e.returnValue = '' 
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    // Esta función se ejecuta cuando el usuario navega a otra página de la app (Desmontaje)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      if (sessionRef.current) {
         // "Fire and forget": Lanzamos la petición de cierre sin esperar respuesta
         supabase.from('class_sessions').update({ is_active: false }).eq('id', sessionRef.current).then()
      }
    }
  }, [])

  // 4. BUCLE DE ROTACIÓN (Cada 5s)
  useEffect(() => {
    if (showFullScreen && sessionId) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) return 5
          return prev - 1
        })
      }, 1000)

      intervalRef.current = setInterval(async () => {
        const newCode = generateRandomCode()
        setQrCode(newCode)
        
        await supabase
          .from('class_sessions')
          .update({ secret_code: newCode })
          .eq('id', sessionId)
          
      }, 5000)

      return () => {
        clearInterval(timer)
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    } else {
        setTimeLeft(5)
    }
  }, [showFullScreen, sessionId])

  const qrData = JSON.stringify({
    id: sessionId,
    sc: qrCode
  })

  return (
    <main className="min-h-screen bg-slate-950 p-4 pb-20">
      
      {/* --- MODO PANTALLA COMPLETA --- */}
      {showFullScreen && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center animate-in fade-in duration-300">
          
          <button 
            onClick={stopSession}
            className="absolute top-6 right-6 p-4 rounded-full bg-slate-800 text-white hover:bg-red-500/20 hover:text-red-400 transition-colors z-50"
          >
            <FaTimes size={24} />
          </button>

          <div className="text-center mb-8 px-4 relative z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 border border-slate-700">
              {selectedType?.toUpperCase()}
            </span>
            <h2 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 max-w-4xl leading-tight">
              {selectedGroup}
            </h2>
            
            <div className="flex items-center justify-center gap-2 mt-4 text-slate-400">
               <FaStopwatch className={timeLeft < 2 ? "text-red-500 animate-pulse" : "text-slate-500"} />
               <p className="text-sm font-mono">
                  Actualizando en {timeLeft}s...
               </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-[0_0_100px_-20px_rgba(250,204,21,0.3)] animate-in zoom-in-90 duration-300 relative">
            <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
               <QRCodeSVG 
                  value={qrData}
                  size={450}
                  level={"L"} 
                  includeMargin={false}
               />
            </div>
            
            <div className="absolute -bottom-12 left-0 right-0 text-center">
                <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Código Actual</p>
                <p className="text-white font-mono text-xl tracking-[0.5em]">{qrCode}</p>
            </div>
          </div>
          
          <p className="mt-16 text-slate-600 text-sm font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Sesión Activa • Seguridad Automática
          </p>
        </div>
      )}

      {/* --- FORMULARIO DE SELECCIÓN --- */}
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold text-white">Generar Asistencia</h1>
        </div>

        <div className="space-y-8">
          {/* 1. Selector Tipo */}
          <section>
            <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 ml-1">1. Tipo de Clase</h2>
            <div className="grid grid-cols-3 gap-3">
              {CLASS_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                    selectedType === type.id
                      ? `bg-slate-800 border-white/40 shadow-lg scale-105`
                      : `bg-slate-900 border-slate-800 ${type.border} opacity-70 hover:opacity-100`
                  }`}
                >
                  <type.icon className={`text-2xl ${type.color}`} />
                  <span className={`text-xs font-bold ${selectedType === type.id ? 'text-white' : 'text-slate-400'}`}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* 2. Selector Grupo */}
          <section>
            <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 ml-1">2. Grupo Destino</h2>
            <div className="space-y-2">
              {GROUPS.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    selectedGroup === group
                      ? 'bg-slate-800 border-yellow-400 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedGroup === group ? 'bg-yellow-400 text-black' : 'bg-slate-800 text-slate-600'}`}>
                      <FaUsers size={14} />
                    </div>
                    <span className="text-sm font-medium">{group}</span>
                  </div>
                  {selectedGroup === group && <FaCheck className="text-yellow-400" />}
                </button>
              ))}
            </div>
          </section>

          {/* 3. Botón Acción */}
          <button
            onClick={startSession}
            disabled={!selectedType || !selectedGroup || loading}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl group ${
              selectedType && selectedGroup && !loading
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transform hover:scale-[1.02]'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            {loading ? (
                <>
                    <FaSpinner className="animate-spin" /> Creando sesión...
                </>
            ) : selectedType && selectedGroup ? (
                <>
                    <FaExpand className="group-hover:scale-110 transition-transform"/>
                    Presentar Código QR
                </>
            ) : (
                <>
                    <FaQrcode />
                    Generar Código QR
                </>
            )}
          </button>
        </div>
      </div>
    </main>
  )
}