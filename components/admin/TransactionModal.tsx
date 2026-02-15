'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaTimes, FaBolt, FaChalkboardTeacher, FaBug, FaHistory, FaExternalLinkAlt, FaTrophy } from 'react-icons/fa'
import Link from 'next/link'

interface TransactionModalProps {
  student: any;
  onClose: () => void;
  onSuccess: (amount: number, nickname: string) => void;
  onError: () => void;
}

export default function TransactionModal({ student, onClose, onSuccess, onError }: TransactionModalProps) {
  const supabase = createClient()
  
  const [amount, setAmount] = useState('')
  const [concept, setConcept] = useState('')
  const [loading, setLoading] = useState(false)

  const applyPreset = (presetAmount: string, presetConcept: string) => {
    setAmount(presetAmount)
    setConcept(presetConcept)
  }

  const handleTransaction = async () => {
    if (!amount || !concept || !student) return
    setLoading(true)

    const finalAmount = Math.abs(parseInt(amount))

    const { error } = await supabase.from('transactions').insert({
      user_id: student.id,
      amount: finalAmount,
      concept: concept
    })

    if (!error) {
      onSuccess(finalAmount, student.nickname)
    } else {
      console.error('Error:', error)
      onError()
    }
    
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      {/* Fondo oscuro */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* CAJA DEL MODAL */}
      <div className="relative w-full max-w-md bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl flex flex-col max-h-[70vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* CABECERA (Fija) */}
        <div className="shrink-0 p-5 border-b border-slate-700 flex justify-between items-start bg-slate-800 z-10">
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">{student.nickname}</h2>
            <p className="mt-1 text-xs text-slate-300">{student.full_name}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 -mr-2 -mt-2 rounded-full text-slate-400 hover:text-white bg-slate-700/30 hover:bg-red-500/20 hover:text-red-400 transition-all"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* CUERPO DEL MODAL (Scrolleable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-800">
          
          {/* NUEVO: Botones de navegación (Historial y Logros) */}
          <div className="grid grid-cols-2 gap-3">
            <Link 
              href={`/admin/history/${student.id}`}
              className="flex items-center justify-center gap-2 w-full py-2 bg-slate-700/30 hover:bg-slate-700 border border-slate-700 text-slate-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
               <FaHistory /> Transacciones <FaExternalLinkAlt size={10} />
            </Link>

            <Link 
              href={`/admin/achievements/${student.id}`}
              className="flex items-center justify-center gap-2 w-full py-2 bg-slate-700/30 hover:bg-slate-700 border border-slate-700 text-slate-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
               <FaTrophy className="text-yellow-500" /> Logros <FaExternalLinkAlt size={10} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => applyPreset('50', 'Detector de Errores')}
              className="p-3 rounded-xl bg-slate-700/30 hover:bg-yellow-400/10 border border-slate-600 hover:border-yellow-400 flex flex-col items-center gap-2 transition-all active:scale-95 group"
            >
              <FaBug className="text-yellow-400 group-hover:scale-110 transition-transform" size={20} />
              <span className="text-[10px] font-bold text-slate-300 text-center uppercase">Corregir al Profe</span>
              <span className="text-yellow-400 font-bold text-sm">+50 ⚡</span>
            </button>
            
            <button 
              onClick={() => applyPreset('100', 'Salida a Pizarra')}
              className="p-3 rounded-xl bg-slate-700/30 hover:bg-green-400/10 border border-slate-600 hover:border-green-400 flex flex-col items-center gap-2 transition-all active:scale-95 group"
            >
              <FaChalkboardTeacher className="text-green-400 group-hover:scale-110 transition-transform" size={20} />
              <span className="text-[10px] font-bold text-slate-300 text-center uppercase">Salir a Pizarra</span>
              <span className="text-green-400 font-bold text-sm">+100 ⚡</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1.5 ml-1">
                  Cantidad
                </label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3 text-white text-center font-bold font-mono focus:outline-none focus:border-yellow-400"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1.5 ml-1">
                  Concepto
                </label>
                <input 
                  type="text" 
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-yellow-400"
                  placeholder="Motivo..."
                />
              </div>
            </div>
          </div>

        </div>

        {/* PIE DEL MODAL (Fijo, con el botón de enviar) */}
        <div className="shrink-0 p-5 border-t border-slate-700 bg-slate-800 z-10">
          <button 
            onClick={handleTransaction}
            disabled={loading || !amount || !concept}
            className={`w-full py-3.5 rounded-xl font-bold text-slate-900 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Enviando...' : (
              <>
                <FaBolt /> ENVIAR RECOMPENSA
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}