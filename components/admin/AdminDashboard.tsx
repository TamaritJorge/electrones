// Ruta: components/admin/AdminDashboard.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaSearch, FaUserGraduate, FaTimes, FaCheck, FaBolt, FaChalkboardTeacher, FaBug, FaHistory, FaExternalLinkAlt } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Link from 'next/link' // <--- Necesario para el botón de historial

export default function AdminDashboard({ initialStudents }: { initialStudents: any[] }) {
  const supabase = createClient()
  const router = useRouter()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  
  // Formulario
  const [amount, setAmount] = useState('')
  const [concept, setConcept] = useState('')

  // 1. MEJORA: BUSCADOR INCLUYE EMAIL
  const filteredStudents = initialStudents.filter(s => 
    s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleTransaction = async () => {
    if (!amount || !concept || !selectedStudent) return
    setLoading(true)

    const finalAmount = Math.abs(parseInt(amount))

    const { error } = await supabase.from('transactions').insert({
      user_id: selectedStudent.id,
      amount: finalAmount,
      concept: concept
    })

    if (!error) {
      alert(`✅ ¡Puntos enviados!`)
      setSelectedStudent(null)
      setAmount('')
      setConcept('')
      router.refresh() 
    } else {
      console.error('Error:', error)
      alert('❌ Error al guardar transacción')
    }
    setLoading(false)
  }

  const applyPreset = (presetAmount: string, presetConcept: string) => {
    setAmount(presetAmount)
    setConcept(presetConcept)
  }

  return (
    <div>
      {/* 🔍 BUSCADOR */}
      <div className="relative mb-6 sticky top-4 z-10">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-slate-500" />
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre, apodo o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl py-4 pl-10 pr-4 text-white focus:outline-none focus:border-yellow-400 transition-colors shadow-lg"
        />
      </div>

      {/* 📋 LISTA DE ALUMNOS */}
      <div className="grid gap-3">
        {filteredStudents.length === 0 && (
          <p className="text-center text-slate-500 py-8">No se encontraron alumnos</p>
        )}
        
        {filteredStudents.map((student) => (
          <div 
            key={student.id}
            onClick={() => {
              setSelectedStudent(student)
              setConcept('')
              setAmount('')
            }}
            className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between hover:border-yellow-400/50 cursor-pointer transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              {student.avatar_url ? (
                <img src={student.avatar_url} className="w-12 h-12 rounded-full object-cover bg-slate-800" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                  <FaUserGraduate size={20} />
                </div>
              )}
              
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg leading-tight">{student.nickname || 'Sin Apodo'}</span>
                {/* Mostramos el nombre real pequeño */}
                <span className="text-xs text-slate-400">{student.full_name}</span>
              </div>
            </div>

            <div className="text-right bg-black/20 px-3 py-1 rounded-lg">
              <span className="text-yellow-400 font-mono font-bold text-xl">{student.current_balance}</span>
              <span className="text-yellow-400/50 text-xs ml-1">⚡</span>
            </div>
          </div>
        ))}
      </div>

      {/* 🛠 MODAL DE GESTIÓN */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-800 w-full max-w-md sm:rounded-2xl rounded-t-3xl p-6 border-t sm:border border-slate-700 animate-in slide-in-from-bottom-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Enviando puntos a</h3>
                <h2 className="text-2xl font-bold text-white leading-none">{selectedStudent.nickname}</h2>
                
                {/* 2. MEJORA: DATOS COMPLETOS EN LA FICHA */}
                <div className="mt-2 text-sm text-slate-300 space-y-0.5">
                   <p>{selectedStudent.full_name}</p>
                   <p className="text-slate-500 text-xs font-mono">{selectedStudent.email}</p>
                </div>
              </div>

              <button onClick={() => setSelectedStudent(null)} className="p-2 rounded-full text-slate-400 hover:text-white bg-white/5">
                <FaTimes size={20} />
              </button>
            </div>

            {/* 3. MEJORA: BOTÓN VER HISTORIAL */}
            <div className="mb-6">
               <Link 
                 href={`/admin/history/${selectedStudent.id}`}
                 className="flex items-center justify-center gap-2 w-full py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
               >
                  <FaHistory /> Ver Historial Completo <FaExternalLinkAlt size={10} />
               </Link>
            </div>

            {/* BOTONES RÁPIDOS */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                onClick={() => applyPreset('50', 'Detector de Errores')}
                className="p-4 rounded-xl bg-slate-700/50 hover:bg-yellow-400/10 border border-slate-600 hover:border-yellow-400 flex flex-col items-center gap-2 transition-all active:scale-95 group"
              >
                <FaBug className="text-yellow-400 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-xs font-bold text-slate-300 text-center uppercase">Corregir al Profe</span>
                <span className="text-yellow-400 font-bold">+50 ⚡</span>
              </button>
              
              <button 
                onClick={() => applyPreset('100', 'Salida a Pizarra')}
                className="p-4 rounded-xl bg-slate-700/50 hover:bg-green-400/10 border border-slate-600 hover:border-green-400 flex flex-col items-center gap-2 transition-all active:scale-95 group"
              >
                <FaChalkboardTeacher className="text-green-400 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-xs font-bold text-slate-300 text-center uppercase">Salir a Pizarra</span>
                <span className="text-green-400 font-bold">+100 ⚡</span>
              </button>
            </div>

            {/* Inputs Manuales */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs uppercase text-slate-400 font-bold mb-2 ml-1">
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
                  <label className="block text-xs uppercase text-slate-400 font-bold mb-2 ml-1">
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

            {/* Botón Acción */}
            <button 
              onClick={handleTransaction}
              disabled={loading || !amount || !concept}
              className={`w-full mt-6 py-4 rounded-xl font-bold text-slate-900 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? 'Enviando...' : (
                <>
                  <FaBolt /> ENVIAR RECOMPENSA
                </>
              )}
            </button>

          </div>
        </div>
      )}

    </div>
  )
}