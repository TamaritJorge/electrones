// Ruta: components/inventory/InventoryFiles.tsx
'use client'

import { FaScroll } from 'react-icons/fa'

// Aquí definirás la lógica de fetch para los exámenes
export default function InventoryFiles() {
  // Placeholder data
  const hasExams = false; 

  return (
    <div className="space-y-4">
        {/* Aquí iría el map de examenes desbloqueados */}
        
        {!hasExams && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-600">
                    <FaScroll size={24} />
                </div>
                <h3 className="text-slate-300 font-bold mb-2 text-lg">Archivos Encriptados</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[250px]">
                    No has extraido ningún archivo. Descarga las <span className="text-yellow-500 font-bold">Cajas de Alto Voltaje</span> para extraer su contenido oculto.
                </p>
            </div>
        )}
    </div>
  )
}