'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { FaBolt, FaShoppingCart, FaTimes, FaCheckCircle } from 'react-icons/fa'
import ProductArtifact from '@/components/ProductArtifact'
import confetti from 'canvas-confetti'

interface GroundingKitModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  exerciseId: string | null
  inventoryCount: number
}

export default function GroundingKitModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  exerciseId, 
  inventoryCount 
}: GroundingKitModalProps) {
  
  const [loading, setLoading] = useState(false)
  const [successView, setSuccessView] = useState(false) // Nuevo estado para la vista de éxito
  const supabase = createClient()
  const router = useRouter()

  if (!isOpen) return null

  const handleUnlock = async () => {
    if (!exerciseId) return
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("No hay usuario autenticado")

      const { data: result, error } = await supabase.rpc('use_grounding_kit', {
        p_user_id: user.id,
        p_exercise_id: exerciseId
      })

      if (error) throw error

      if (result && result.success) {
        // 1. Disparar Confetti
        triggerConfetti()
        
        // 2. Refrescar datos en segundo plano
        onSuccess() 

        // 3. Mostrar vista de éxito (No cerramos el modal aún)
        setSuccessView(true)
      } else {
        alert("Error: " + (result?.message || "No se pudo desbloquear"))
      }

    } catch (err) {
      console.error("Error ejecutando unlock:", err)
      alert("Error de conexión.")
    } finally {
      setLoading(false)
    }
  }

  const triggerConfetti = () => {
    const end = Date.now() + 1000; // 1 segundo de duración
    const colors = ['#eab308', '#22c55e', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  // Si el usuario cierra el modal desde la vista de éxito, reseteamos el estado
  const handleClose = () => {
    setSuccessView(false)
    onClose()
  }

  const hasItems = inventoryCount > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={!loading ? handleClose : undefined}
        ></div>

        <div className="relative bg-slate-900 border border-slate-700 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* --- HEADER VISUAL (Cambia según el estado) --- */}
            <div className={`h-24 flex items-center justify-center relative transition-colors duration-500 ${successView ? 'bg-gradient-to-b from-green-900 to-slate-900' : 'bg-gradient-to-b from-slate-800 to-slate-900'}`}>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="scale-75 transform translate-y-2">
                     {successView ? (
                        <div className="w-24 h-24 flex items-center justify-center text-green-400 animate-in zoom-in duration-300">
                            <FaCheckCircle className="text-6xl drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                        </div>
                     ) : (
                        <ProductArtifact iconName="FaKey" className="w-24 h-24 shadow-none border-none bg-transparent" />
                     )}
                </div>
            </div>

            <div className="p-6 text-center relative z-10">
                
                {successView ? (
                    // --- VISTA DE ÉXITO ---
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-bold text-white mb-2">¡Solución Desbloqueada!</h3>
                        <p className="text-sm text-slate-400 mb-6">
                            La descarga se ha completado con éxito. Ya tienes acceso seguro al archivo.
                        </p>
                        <button 
                            onClick={handleClose}
                            className="w-full py-3 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-500 transition-colors shadow-[0_0_20px_rgba(22,163,74,0.4)]"
                        >
                            ENTENDIDO
                        </button>
                    </div>
                ) : (
                    // --- VISTAS NORMALES (Confirmación / Tienda) ---
                    <>
                        {hasItems ? (
                            // CASO A: TIENE ITEMS
                            <>
                                <h3 className="text-lg font-bold text-slate-100 mb-2">¿Desbloquear Solución?</h3>
                                <p className="text-sm text-slate-400 mb-6">
                                    Usarás 1 <strong>Puesta a Tierra</strong> para descargar la solución segura de este ejercicio.
                                    <br/>
                                    <span className="text-yellow-500/80 text-xs mt-2 block">
                                        Te quedan {inventoryCount} unidades.
                                    </span>
                                </p>
                                
                                <div className="flex gap-3">
                                    <button 
                                        onClick={handleClose}
                                        disabled={loading}
                                        className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 font-bold text-xs hover:bg-slate-800 transition-colors"
                                    >
                                        CANCELAR
                                    </button>
                                    <button 
                                        onClick={handleUnlock}
                                        disabled={loading}
                                        className="flex-1 py-2.5 rounded-xl bg-yellow-500 text-slate-950 font-bold text-xs hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.4)] flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <span className="animate-spin text-lg">⟳</span>
                                        ) : (
                                            <>
                                                <FaBolt /> USAR ITEM
                                            </>
                                        )}
                                    </button>
                                </div>
                            </>
                        ) : (
                            // CASO B: NO TIENE ITEMS
                            <>
                                <h3 className="text-lg font-bold text-slate-100 mb-2">Acceso Denegado</h3>
                                <p className="text-sm text-slate-400 mb-6">
                                    Necesitas una <strong>Puesta a Tierra</strong> para acceder a la solución de forma segura sin dañar los datos.
                                </p>
                                
                                <div className="flex gap-3">
                                    <button 
                                        onClick={handleClose}
                                        className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 font-bold text-xs hover:bg-slate-800 transition-colors"
                                    >
                                        VOLVER
                                    </button>
                                    <button 
                                        onClick={() => router.push('/shop')}
                                        className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors shadow-[0_0_15px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2"
                                    >
                                        <FaShoppingCart /> IR A TIENDA
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
            
            {/* Botón X de cierre */}
            <button 
                onClick={!loading ? handleClose : undefined}
                className="absolute top-3 right-3 text-slate-500 hover:text-white p-2"
            >
                <FaTimes />
            </button>
        </div>
    </div>
  )
}