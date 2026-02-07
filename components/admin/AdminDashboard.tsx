// Ruta: components/admin/AdminDashboard.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
// Importamos los iconos de FontAwesome
import { FaSearch, FaUserGraduate, FaTimes, FaBolt, FaChalkboardTeacher, FaBug, FaHistory, FaExternalLinkAlt, FaQrcode, FaArrowRight } from 'react-icons/fa'
// IMPORTANTE: Importamos la mochila de Bootstrap Icons
import { BsBackpackFill } from 'react-icons/bs' 

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PermanentUnlocksTable from '@/components/admin/PermanentUnlocksTable'

export default function AdminDashboard({ initialStudents }: { initialStudents: any[] }) {
  const supabase = createClient()
  const router = useRouter()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  
  // Estado para el modal de mejoras permanentes
  const [showUnlocksModal, setShowUnlocksModal] = useState(false)
  
  // Formulario
  const [amount, setAmount] = useState('')
  const [concept, setConcept] = useState('')

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
      {/* 🚀 SECCIÓN: ACCIONES RÁPIDAS */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* BOTÓN 1: QR */}
        <Link 
          href="/admin/qr"
          className="group relative overflow-hidden p-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-inner">
                <FaQrcode className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white leading-none">Generar QR</h3>
                <p className="text-blue-100 text-sm mt-1 opacity-90">Crear código de asistencia</p>
              </div>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <FaArrowRight className="text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* BOTÓN 2: MEJORAS PERMANENTES (MOCHILA) */}
        <button 
          onClick={() => setShowUnlocksModal(true)}
          className="group relative overflow-hidden p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-xl hover:shadow-2xl hover:border-yellow-500/50 hover:scale-[1.01] transition-all duration-300 text-left"
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-500 opacity-5 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Contenedor del Icono */}
              <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-inner border border-slate-600 group-hover:border-yellow-500/30 transition-colors">
                {/* Usamos la Mochila rellena */}
                <BsBackpackFill className="text-yellow-500 text-2xl group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100 leading-none group-hover:text-yellow-400 transition-colors">Mochilas</h3>
                <p className="text-slate-400 text-sm mt-1 opacity-90">Ver objetos desbloqueados</p>
              </div>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
              <FaArrowRight className="text-slate-400 group-hover:text-yellow-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>

      </div>

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

      {/* 🛠 MODAL DE GESTIÓN (TRANSACCIONES) */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-slate-800 w-full max-w-md sm:rounded-2xl rounded-t-3xl p-6 border-t sm:border border-slate-700 animate-in slide-in-from-bottom-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Enviando puntos a</h3>
                <h2 className="text-2xl font-bold text-white leading-none">{selectedStudent.nickname}</h2>
                <div className="mt-2 text-sm text-slate-300 space-y-0.5">
                   <p>{selectedStudent.full_name}</p>
                   <p className="text-slate-500 text-xs font-mono">{selectedStudent.email}</p>
                </div>
              </div>

              <button onClick={() => setSelectedStudent(null)} className="p-2 rounded-full text-slate-400 hover:text-white bg-white/5">
                <FaTimes size={20} />
              </button>
            </div>

            <div className="mb-6">
               <Link 
                 href={`/admin/history/${selectedStudent.id}`}
                 className="flex items-center justify-center gap-2 w-full py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
               >
                  <FaHistory /> Ver Historial Completo <FaExternalLinkAlt size={10} />
               </Link>
            </div>

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

      {/* 🛡️ NUEVO MODAL: LISTA DE MEJORAS PERMANENTES */}
      {showUnlocksModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 w-full max-w-4xl max-h-[85vh] rounded-2xl border border-slate-700 shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
                
                {/* Botón Cerrar */}
                <button 
                    onClick={() => setShowUnlocksModal(false)}
                    className="absolute top-4 right-4 z-10 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-all"
                >
                    <FaTimes />
                </button>

                {/* Contenido: La Tabla */}
                <div className="flex-1 overflow-hidden p-1 flex flex-col">
                   <PermanentUnlocksTable />
                </div>
            </div>
            
            {/* Click fuera para cerrar */}
            <div className="absolute inset-0 -z-10" onClick={() => setShowUnlocksModal(false)}></div>
        </div>
      )}

    </div>
  )
}