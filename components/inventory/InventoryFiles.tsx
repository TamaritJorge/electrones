'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaCheck, FaFlask, FaCalculator, FaSearch } from 'react-icons/fa'
import LootboxDischarger from './LootboxDischarger' 

// Definición de tipos basada en tu imagen 'exercise_library'
interface UnlockedFile {
  unlocked_at: string
  has_solution: boolean
  exercise: {
    id: string
    academic_year: string
    session: string
    type: string // En la DB es text, aunque nosotros sabemos que será 'C' o 'P'
    number: number // CORREGIDO: Basado en tu columna 'number' (int4)
  }
}

export default function InventoryFiles() {
  const [files, setFiles] = useState<UnlockedFile[]>([])
  const [lootboxCount, setLootboxCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // Función maestra de carga (Recarga cajas y archivos)
  const refreshAll = async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // --- 1. CARGAR ARCHIVOS (Exámenes) ---
        try {
            // CORREGIDO: Usamos 'number' en la selección de columnas
            const { data: unlocks, error: filesError } = await supabase
            .from('user_unlocks')
            .select(`
                unlocked_at,
                has_solution,
                exercise:exercise_library (
                    id, academic_year, session, type, number
                )
            `)
            .eq('user_id', user.id)
            .order('unlocked_at', { ascending: false })

            if (filesError) throw filesError

            if (unlocks) {
                // Mapeo seguro para TypeScript
                const formattedFiles: UnlockedFile[] = unlocks.map((u: any) => ({
                    unlocked_at: u.unlocked_at,
                    has_solution: u.has_solution,
                    // Protección extra por si exercise viene null o es un array
                    exercise: Array.isArray(u.exercise) ? u.exercise[0] : u.exercise
                })).filter(f => f.exercise !== null) // Filtramos ejercicios borrados
                
                setFiles(formattedFiles)
            }
        } catch (fileErr: any) {
            console.error("Error cargando archivos:", JSON.stringify(fileErr, null, 2))
        }

        // --- 2. CONTAR CAJAS (Método Robusto con Join) ---
        // Basado en la relación entre user_inventory y shop_products que se ve en tus diagramas
        try {
            const { count, error: boxError } = await supabase
                .from('user_inventory')
                .select('*, shop_products!inner(name)', { count: 'exact', head: true }) 
                .eq('user_id', user.id)
                .eq('is_consumed', false)
                .eq('shop_products.name', 'Caja de Alto Voltaje')
            
            if (boxError) throw boxError
            
            setLootboxCount(count || 0)

        } catch (boxErr: any) {
            console.error("Error contando cajas:", JSON.stringify(boxErr, null, 2))
        }

    } catch (generalError) {
        console.error("Error general en InventoryFiles:", generalError)
    } finally {
        setLoading(false)
    }
  }

  // Carga inicial
  useEffect(() => {
    refreshAll()
  }, [])

  if (loading) {
     return <div className="py-12 text-center text-slate-600 font-mono animate-pulse">CARGANDO BANCO DE MEMORIA...</div>
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. SECCIÓN DE DESCARGA (Solo aparece si hay cajas) */}
      <LootboxDischarger 
         boxCount={lootboxCount} 
         onDischarge={refreshAll} 
      />

      {/* 2. LISTA DE ARCHIVOS */}
      {files.length === 0 ? (
          
          lootboxCount === 0 && (
            <div className="text-center py-12 border border-slate-800 rounded-2xl bg-slate-900/50">
                <FaSearch className="mx-auto text-slate-600 mb-4 text-3xl" />
                <p className="text-slate-400 font-bold">Memoria vacía.</p>
                <p className="text-slate-600 text-sm mt-2 max-w-[200px] mx-auto">
                    Consigue cajas en la tienda para obtener datos de exámenes.
                </p>
            </div>
          )

      ) : (
          <div className="space-y-3">
             <div className="flex justify-between items-end px-2 mb-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Archivos Extraídos ({files.length})
                </h4>
             </div>

             {files.map((file) => {
                const isNew = new Date(file.unlocked_at).getTime() > Date.now() - 60000;

                return (
                    <div 
                    key={file.exercise.id} 
                    className={`group relative bg-slate-900 border p-4 rounded-xl flex items-center justify-between transition-all hover:shadow-lg hover:shadow-indigo-500/10
                        ${isNew ? 'border-green-500/50 bg-green-900/10' : 'border-slate-800 hover:border-indigo-500/50'}
                    `}
                    >
                    {/* Icono Tipo */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mr-4 border shadow-inner
                        ${file.exercise.type === 'P' 
                            ? 'bg-blue-900/20 text-blue-400 border-blue-500/20' 
                            : 'bg-purple-900/20 text-purple-400 border-purple-500/20'
                        }`}
                    >
                        {file.exercise.type === 'P' ? <FaCalculator /> : <FaFlask />}
                    </div>

                    {/* Info Texto */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-200">
                                {file.exercise.academic_year} · {file.exercise.session}
                            </span>
                            
                            {isNew && (
                                <span className="bg-green-500 text-slate-950 text-[9px] font-bold px-1.5 rounded animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                                    NUEVO
                                </span>
                            )}
                        </div>
                        <div className="text-xs text-slate-500 flex gap-2">
                            {/* CORREGIDO: Usamos .number para mostrar el número */}
                            <span>{file.exercise.type === 'P' ? 'Problema' : 'Cuestión'} {file.exercise.number}</span>
                        </div>
                    </div>

                    {/* Estado Solución */}
                    <div className="text-right pl-2">
                        {file.has_solution ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-900/20 px-2 py-1 rounded-full border border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                                <FaCheck size={10} /> SOLUCIÓN
                            </span>
                        ) : (
                            <span className="text-[10px] font-bold text-slate-600 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">
                                ENUNCIADO
                            </span>
                        )}
                    </div>
                    </div>
                )
             })}
          </div>
      )}
    </div>
  )
}