'use client'

import { useState, useEffect } from 'react'
import { FaSearch, FaTimes, FaQrcode, FaChartLine } from 'react-icons/fa'
import { BsBackpackFill } from 'react-icons/bs' 
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PermanentUnlocksTable from '@/components/admin/PermanentUnlocksTable'
import Toast from '@/components/ui/Toast' 
import StudentCard from '@/components/admin/StudentCard'
import TransactionModal from '@/components/admin/TransactionModal'

export default function AdminDashboard({ initialStudents }: { initialStudents: any[] }) {
  const router = useRouter()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [showUnlocksModal, setShowUnlocksModal] = useState(false)
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null)

  const filteredStudents = initialStudents.filter(s => 
    s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    if (selectedStudent || showUnlocksModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedStudent, showUnlocksModal])

  const handleTransactionSuccess = (amount: number, nickname: string) => {
    setToast({ message: `Enviados ${amount}⚡ a ${nickname}`, type: 'success' })
    setSelectedStudent(null)
    router.refresh() 
  }

  return (
    <div>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* SECCIÓN: ACCIONES RÁPIDAS */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* BOTÓN 1: QR */}
        <Link 
          href="/admin/qr"
          className="group relative overflow-hidden p-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
          
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-inner">
              <FaQrcode className="text-white text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white leading-none">Generar QR</h3>
              <p className="text-blue-100 text-sm mt-1 opacity-90">Crear código de asistencia</p>
            </div>
          </div>
        </Link>

        {/* BOTÓN 2: MEJORAS PERMANENTES */}
        <button 
          onClick={() => setShowUnlocksModal(true)}
          className="group relative overflow-hidden p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-xl hover:shadow-2xl hover:border-yellow-500/50 hover:scale-[1.01] transition-all duration-300 text-left"
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-500 opacity-5 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
          
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-inner border border-slate-600 group-hover:border-yellow-500/30 transition-colors">
              <BsBackpackFill className="text-yellow-500 text-2xl group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 leading-none group-hover:text-yellow-400 transition-colors">Mochilas</h3>
              <p className="text-slate-400 text-sm mt-1 opacity-90">Ver objetos desbloqueados</p>
            </div>
          </div>
        </button>

        {/* BOTÓN 3: ESTADÍSTICAS */}
        <Link 
          href="/admin/stats"
          className="group relative overflow-hidden p-6 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
          
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-inner">
              <FaChartLine className="text-white text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white leading-none">Estadísticas</h3>
              <p className="text-emerald-100 text-sm mt-1 opacity-90">Métricas de la app</p>
            </div>
          </div>
        </Link>

      </div>

      {/* BUSCADOR */}
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

      {/* LISTA DE ALUMNOS */}
      <div className="grid gap-3">
        {filteredStudents.length === 0 && (
          <p className="text-center text-slate-500 py-8">No se encontraron alumnos</p>
        )}
        
        {filteredStudents.map((student) => (
          <StudentCard 
            key={student.id} 
            student={student} 
            onClick={() => setSelectedStudent(student)} 
          />
        ))}
      </div>

      {/* MODAL DE GESTIÓN (TRANSACCIONES) */}
      {selectedStudent && (
        <TransactionModal 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)}
          onSuccess={handleTransactionSuccess}
          onError={() => setToast({ message: 'Error al guardar la transacción', type: 'error' })}
        />
      )}

      {/* MODAL: MEJORAS PERMANENTES */}
      {showUnlocksModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setShowUnlocksModal(false)}></div>
            <div className="bg-slate-900 w-full max-w-4xl max-h-[85vh] rounded-2xl border border-slate-700 shadow-2xl flex flex-col relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                <button 
                    onClick={() => setShowUnlocksModal(false)}
                    className="absolute top-4 right-4 z-20 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-all"
                >
                    <FaTimes />
                </button>
                <div className="flex-1 overflow-y-auto p-1 flex flex-col">
                    <PermanentUnlocksTable />
                </div>
            </div>
        </div>
      )}

    </div>
  )
}