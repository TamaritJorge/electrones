// components/inventory/FileCard.tsx
'use client'

import { FaCheck, FaFlask, FaCalculator, FaFileAlt } from 'react-icons/fa'
import ProductArtifact from '@/components/ProductArtifact'

export interface UnlockedFile {
  unlocked_at: string
  has_solution: boolean
  exercise: {
    id: string
    academic_year: string
    session: string
    type: string
    number: number
  }
}

interface FileCardProps {
  file: UnlockedFile
  onOpenEnunciado?: () => void 
  onOpenSolution?: () => void
}

export default function FileCard({ file, onOpenEnunciado, onOpenSolution }: FileCardProps) {
  const isNew = new Date(file.unlocked_at).getTime() > Date.now() - 60000
  const isProblem = file.exercise.type === 'P'
  
  // --- NUEVA LÓGICA DE SEGURIDAD ---
  const openSecurePdf = (type: 'statement' | 'solution') => {
    // Generamos la URL a nuestra API segura
    const url = `/api/secure-pdf?id=${file.exercise.id}&type=${type}`
    // Abrimos en nueva pestaña
    window.open(url, '_blank')
  }
  // ---------------------------------

  return (
    <div 
      className={`group relative bg-slate-900/80 border p-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:bg-slate-900
        ${isNew ? 'border-green-500/50 shadow-[inset_0_0_20px_rgba(34,197,94,0.1)]' : 'border-slate-800 hover:border-indigo-500/30'}
      `}
    >
      {/* 1. IZQUIERDA: Icono del Tipo */}
      <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl mr-4 border shadow-inner transition-colors duration-300
          ${isProblem 
            ? 'bg-blue-950/40 text-blue-400 border-blue-500/20 group-hover:border-blue-500/40' 
            : 'bg-purple-950/40 text-purple-400 border-purple-500/20 group-hover:border-purple-500/40'
          }`}
      >
        {isProblem ? <FaCalculator /> : <FaFlask />}
      </div>

      {/* 2. CENTRO: Información del Ejercicio */}
      <div className="flex-1 min-w-0 pr-4">
          {/* Cabecera: Año y Sesión */}
          <div className="flex items-center gap-2 mb-1.5">
              <span className="font-bold text-slate-100 text-sm tracking-wide">
                  {file.exercise.academic_year} · {file.exercise.session}
              </span>
              
              {isNew && (
                  <span className="bg-green-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse">
                      NUEVO
                  </span>
              )}
          </div>

          {/* Subtítulo: Número y Tipo */}
          <div className="text-xs text-slate-500 flex items-center gap-2 font-mono">
              <span className={`w-1.5 h-1.5 rounded-full ${isProblem ? 'bg-blue-500' : 'bg-purple-500'}`}></span>
              <span>{isProblem ? 'Problema' : 'Cuestión'} <strong className="text-slate-400">#{file.exercise.number}</strong></span>
          </div>
      </div>

      {/* 3. DERECHA: Botones de Acción */}
      <div className="flex flex-col gap-2 shrink-0 w-[110px]">
          
          {/* Botón A: Enunciado (CAMBIO: Ahora llama a openSecurePdf) */}
          <button 
            onClick={() => openSecurePdf('statement')}
            className="group/btn flex items-center justify-between px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600 transition-all active:scale-95"
          >
             <span className="text-[10px] font-bold text-slate-400 group-hover/btn:text-slate-200">ENUNCIADO</span>
             <FaFileAlt className="text-slate-500 text-[10px] group-hover/btn:text-indigo-400" />
          </button>

          {/* Botón B: Solución */}
          {file.has_solution ? (
              // ESTADO 1: Desbloqueado (Check Verde) -> (CAMBIO: Ahora llama a openSecurePdf)
              <button 
                onClick={() => openSecurePdf('solution')}
                className="group/btn flex items-center justify-between px-3 py-1.5 rounded-lg border border-green-500/30 bg-green-900/20 hover:bg-green-900/30 hover:border-green-500/50 transition-all active:scale-95 shadow-[0_0_10px_rgba(34,197,94,0.05)]"
              >
                 <span className="text-[10px] font-bold text-green-400 group-hover/btn:text-green-300">SOLUCIÓN</span>
                 <FaCheck className="text-green-500 text-[10px]" />
              </button>
          ) : (
              // ESTADO 2: Bloqueado (Requiere Puesta a Tierra) -> (MANTENEMOS: Llama al modal)
              <button 
                onClick={onOpenSolution} 
                className="group/btn relative flex items-center justify-between px-3 py-1.5 rounded-lg border border-slate-800 bg-black/40 hover:border-yellow-700/50 hover:bg-yellow-900/10 transition-all active:scale-95 cursor-pointer overflow-hidden"
              >
                 <span className="text-[10px] font-bold text-slate-500 group-hover/btn:text-yellow-500/80 transition-colors z-10">SOLUCIÓN</span>
                 
                 <div className="relative w-5 h-5 flex items-center justify-center z-10">
                     <div className="transform scale-[0.25] origin-center opacity-80 group-hover/btn:opacity-100 transition-opacity">
                          <ProductArtifact iconName="FaKey" className="w-20 h-20" />
                     </div>
                 </div>

                 <div className="absolute inset-0 bg-yellow-500/0 group-hover/btn:bg-yellow-500/5 transition-colors duration-300"></div>
              </button>
          )}

      </div>
    </div>
  )
}