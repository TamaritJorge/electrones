'use client'

import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { formatTeam, TeamUI } from '@/utils/teams'
// Asegúrate de tener: npm install canvas-confetti @types/canvas-confetti
import confetti from 'canvas-confetti' 
import { FaBolt, FaSpinner, FaAtom } from 'react-icons/fa'

interface TeamAssignmentProps {
  onAssignComplete: () => void 
}

export function TeamAssignment({ onAssignComplete }: TeamAssignmentProps) {
  const [status, setStatus] = useState<'idle' | 'resonating' | 'revealed'>('idle')
  const [assignedTeam, setAssignedTeam] = useState<TeamUI | null>(null)
  
  // Estado para guardar los colores reales traídos de la DB
  const [dbColors, setDbColors] = useState<string[]>([])
  
  // Estado para el texto cambiante durante la carga
  const [loadingText, setLoadingText] = useState('Iniciando protocolos...')

  const supabase = createClient()
  const resonanceIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const textIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // 1. CARGAR COLORES REALES AL MONTAR
  useEffect(() => {
    async function fetchColors() {
      const { data } = await supabase.from('teams').select('hex_color')
      if (data) {
        setDbColors(data.map(t => t.hex_color))
      }
    }
    fetchColors()
  }, [])

  const startResonance = async () => {
    setStatus('resonating')
    
    // Fallback por si la DB falla: colores por defecto
    const colorsToUse = dbColors.length > 0 ? dbColors : ['#FACC15', '#22D3EE', '#F97316', '#A3E635']
    
    // --- ANIMACIÓN DE TEXTOS ---
    const steps = [
      "Sintonizando frecuencias...",
      "Calibrando espectro...",
      "Analizando potencial...",
      "Triangulando facción...",
      "Resonancia encontrada."
    ]
    let stepIndex = 0
    setLoadingText(steps[0])
    
    textIntervalRef.current = setInterval(() => {
      stepIndex++
      if (stepIndex < steps.length) {
        setLoadingText(steps[stepIndex])
      }
    }, 1000) // Cambia texto cada segundo

    // --- EFECTOS DE PARTÍCULAS ---
    resonanceIntervalRef.current = setInterval(() => {
      const randomColor = colorsToUse[Math.floor(Math.random() * colorsToUse.length)]
      try {
        confetti({
          particleCount: 20,
          startVelocity: 30,
          spread: 360,
          origin: { 
            x: Math.random(), 
            y: Math.random() 
          }, 
          colors: [randomColor, '#ffffff'],
          ticks: 60,
          zIndex: 50,
          disableForReducedMotion: true
        })
      } catch (e) { /* Ignorar */ }
    }, 400) // Lanza partículas cada 400ms

    // --- ESPERA FORZADA DE 5 SEGUNDOS (Para dar drama) ---
    await new Promise(resolve => setTimeout(resolve, 5000))

    try {
      // Llamada real al RPC
      const { data: teamId, error } = await supabase.rpc('assign_user_team')
      if (error) throw error

      const { data: teamData } = await supabase
        .from('teams')
        .select('*')
        .eq('id', teamId)
        .single()

      if (teamData) {
        const formattedTeam = formatTeam(teamData)
        setAssignedTeam(formattedTeam)
        
        // Limpiar intervalos
        if (resonanceIntervalRef.current) clearInterval(resonanceIntervalRef.current)
        if (textIntervalRef.current) clearInterval(textIntervalRef.current)
        
        setStatus('revealed')
        triggerFinalExplosion(formattedTeam.styles.text.color)
      }

    } catch (err) {
      console.error('Error en la resonancia:', err)
      if (resonanceIntervalRef.current) clearInterval(resonanceIntervalRef.current)
      if (textIntervalRef.current) clearInterval(textIntervalRef.current)
      setStatus('idle')
      alert('Interferencia detectada. Inténtalo de nuevo.')
    }
  }

  const triggerFinalExplosion = (colorHex: string) => {
    try {
      // Explosión central
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: [colorHex, '#ffffff'],
        zIndex: 60
      })
      // Explosiones laterales para más fiesta
      setTimeout(() => {
        confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors: [colorHex] });
        confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors: [colorHex] });
      }, 400);
    } catch (e) { console.log('Confetti error') }
  }

  // Helper para renderizar los orbes de fondo dinámicamente según los colores cargados
  const renderBackgroundOrbs = () => {
    // Si no hay colores aun, no renderizamos nada o unos default
    const colors = dbColors.length > 0 ? dbColors : ['#FACC15', '#22D3EE', '#F97316']
    
    return (
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
         {/* Orbe 1 */}
         <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] animate-pulse -translate-x-1/2 -translate-y-1/2 mix-blend-screen duration-1000"
            style={{ backgroundColor: `${colors[0]}40` }} // Añadimos transparencia al hex
         ></div>
         {/* Orbe 2 */}
         <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] animate-pulse translate-x-1/2 translate-y-1/2 mix-blend-screen duration-700 animation-delay-500"
            style={{ backgroundColor: `${colors[1] || colors[0]}40` }}
         ></div>
         {/* Orbe 3 */}
         <div 
            className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-[120px] animate-pulse -translate-x-1/2 -translate-y-1/2 mix-blend-screen duration-1500"
            style={{ backgroundColor: `${colors[2] || colors[0]}40` }}
         ></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 relative">
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-3xl p-8 md:p-12 text-center shadow-2xl overflow-hidden relative min-h-[450px] flex flex-col items-center justify-center">
        
        {/* ESTADO 1: IDLE */}
        {status === 'idle' && (
          <div className="animate-in fade-in zoom-in duration-500 space-y-6 relative z-10">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.2)] animate-pulse group">
              <FaBolt size={40} className="group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-3xl font-black text-white">Sin Frecuencia Asignada</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              El universo eléctrico busca el equilibrio. Inicia la resonancia para descubrir a qué facción histórica perteneces.
            </p>
            <button
              onClick={startResonance}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-bold text-white text-lg shadow-lg hover:scale-105 hover:shadow-indigo-500/50 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FaAtom className="animate-spin-slow" /> Iniciar Resonancia
              </span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full group-hover:scale-150 transition-all duration-700 bg-white/10"></div>
            </button>
          </div>
        )}

        {/* ESTADO 2: RESONATING */}
        {status === 'resonating' && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/90 w-full h-full">
            
            {/* Fondo dinámico con colores reales */}
            {renderBackgroundOrbs()}

            <div className="relative z-30 flex flex-col items-center space-y-8 p-4">
               <div className="relative">
                  <div className="absolute inset-[-20px] rounded-full animate-spin-slow bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70 blur-xl"></div>
                  <div className="relative bg-slate-950 p-6 rounded-full border-2 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                    <FaSpinner className="animate-spin text-5xl text-white" />
                  </div>
               </div>

              <div className="text-center space-y-2">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-cyan-300 to-orange-300 font-black text-2xl animate-pulse uppercase tracking-[0.2em]">
                  {loadingText}
                </p>
                <p className="text-indigo-200 font-mono text-xs md:text-sm tracking-widest opacity-80">
                  ACCEDIENDO AL NÚCLEO...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ESTADO 3: REVEALED */}
        {status === 'revealed' && assignedTeam && (
          <div className="relative z-10 animate-in zoom-in spin-in-1 duration-700 ease-out w-full">
            <div 
              className="absolute inset-0 opacity-30 blur-3xl rounded-full transition-all duration-1000 scale-150"
              style={{ backgroundColor: assignedTeam.styles.bg.backgroundColor }}
            />

            <div className="relative z-10 space-y-6">
              <div className="inline-block p-6 rounded-full bg-slate-950 border-4 shadow-[0_0_60px_rgba(0,0,0,0.6)] scale-110 transition-all"
                   style={{ borderColor: assignedTeam.styles.border.borderColor }}>
                 {assignedTeam.Icon && (
                    <assignedTeam.Icon 
                      size={72} 
                      style={{ color: assignedTeam.styles.text.color }}
                      className="drop-shadow-lg"
                    />
                 )}
              </div>

              <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-backwards">
                <h2 className="text-lg text-slate-400 uppercase tracking-widest font-bold mb-2">Te has unido a</h2>
                <h1 
                  className="text-5xl md:text-7xl font-black tracking-tighter drop-shadow-2xl"
                  style={{ color: assignedTeam.styles.text.color, textShadow: `0 0 30px ${assignedTeam.styles.bg.backgroundColor}` }}
                >
                  {assignedTeam.name}
                </h1>
              </div>

              <p className="text-slate-200 text-lg max-w-lg mx-auto border-t border-slate-800/50 pt-6 mt-6 animate-in fade-in duration-1000 delay-500 fill-mode-backwards font-medium leading-relaxed">
                {assignedTeam.description}
              </p>

              <button
                onClick={onAssignComplete}
                className="mt-8 px-12 py-4 rounded-full font-black text-slate-950 text-lg transition-transform hover:scale-105 animate-in zoom-in duration-500 delay-700 fill-mode-backwards"
                style={{ 
                  backgroundColor: assignedTeam.styles.bg.backgroundColor,
                  boxShadow: `0 0 30px ${assignedTeam.styles.bg.backgroundColor}80`
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}