'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaSearch, FaCalendarAlt, FaGraduationCap, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'
import LootboxDischarger from './LootboxDischarger' 
import FileCard, { UnlockedFile } from './FileCard' 
import GroundingKitModal from './GroundingKitModal'

// Tipos para la ordenación
type SortMode = 'date' | 'academic'
type SortOrder = 'asc' | 'desc'

export default function InventoryFiles() {
  const [files, setFiles] = useState<UnlockedFile[]>([])
  
  // Estados de Inventario y UI
  const [lootboxCount, setLootboxCount] = useState(0)
  const [groundingCount, setGroundingCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null)

  // ESTADOS DE ORDENACIÓN
  const [sortMode, setSortMode] = useState<SortMode>('date')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc') // 'desc' por defecto (lo más nuevo arriba)

  const supabase = createClient()

  const refreshAll = async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // 1. Cargar Archivos
        const { data: unlocks } = await supabase
            .from('user_unlocks')
            .select(`
                unlocked_at, has_solution,
                exercise:exercise_library (id, academic_year, session, type, number)
            `)
            .eq('user_id', user.id)
            .order('unlocked_at', { ascending: false }) // Orden inicial por defecto DB

        if (unlocks) {
            const formatted: UnlockedFile[] = unlocks.map((u: any) => ({
                unlocked_at: u.unlocked_at,
                has_solution: u.has_solution,
                exercise: Array.isArray(u.exercise) ? u.exercise[0] : u.exercise
            })).filter(f => f.exercise !== null)
            setFiles(formatted)
        }

        // 2. Cargar Inventario
        const { data: inventory, error } = await supabase
            .from('user_inventory')
            .select('id, shop_products!inner(name)') 
            .eq('user_id', user.id)
            .eq('is_consumed', false)
            .in('shop_products.name', ['Caja de Alto Voltaje', 'Puesta a Tierra'])
        
        if (error) console.error("Error inventario:", error)

        if (inventory) {
            const boxes = inventory.filter((i: any) => i.shop_products.name === 'Caja de Alto Voltaje').length
            const groundings = inventory.filter((i: any) => i.shop_products.name === 'Puesta a Tierra').length
            setLootboxCount(boxes)
            setGroundingCount(groundings)
        }

    } catch (error) {
        console.error("Error general:", error)
    } finally {
        setLoading(false)
    }
  }

  useEffect(() => { refreshAll() }, [])

  // --- LÓGICA DE ORDENACIÓN ---
  const handleSortChange = (mode: SortMode) => {
      if (sortMode === mode) {
          // Si pulsamos el mismo botón, invertimos el orden
          setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
      } else {
          // Si cambiamos de modo, ponemos 'desc' por defecto (suele ser lo deseado)
          setSortMode(mode)
          setSortOrder('desc')
      }
  }

  const sortedFiles = useMemo(() => {
      return [...files].sort((a, b) => {
          let comparison = 0;

          if (sortMode === 'date') {
              // 1. MODO FECHA (Simple)
              const dateA = new Date(a.unlocked_at).getTime()
              const dateB = new Date(b.unlocked_at).getTime()
              comparison = dateA - dateB
          } else {
              // 2. MODO ACADÉMICO (Complejo)
              
              // A. Comparar Año Académico
              // Usamos numeric: true para que "Curso 10" vaya después de "Curso 2" si fuera el caso
              const yearCompare = a.exercise.academic_year.localeCompare(b.exercise.academic_year, undefined, { numeric: true })
              
              if (yearCompare !== 0) {
                  comparison = yearCompare
              } else {
                  // B. Mismo Año -> Comparar Sesión (Convocatoria)
                  const sessionCompare = a.exercise.session.localeCompare(b.exercise.session, undefined, { numeric: true })
                  
                  if (sessionCompare !== 0) {
                      comparison = sessionCompare
                  } else {
                      // C. Misma Sesión -> Orden Interno (Cuestión vs Problema)
                      // Aquí NO aplicamos el sortOrder global para que el examen siempre se lea 
                      // Cuestión 1 -> Problema 2, independientemente de si ordenamos años asc o desc.
                      
                      // Tipo: 'C' (Cuestión) antes que 'P' (Problema)
                      if (a.exercise.type !== b.exercise.type) {
                          // Si a es 'C' y b es 'P', retorna negativo (a va antes)
                          return a.exercise.type.localeCompare(b.exercise.type)
                      }
                      
                      // Número: 1, 2, 3...
                      return a.exercise.number - b.exercise.number
                  }
              }
          }

          // Aplicamos la dirección (Ascendente/Descendente) al resultado de Año/Sesión o Fecha
          return sortOrder === 'asc' ? comparison : -comparison
      })
  }, [files, sortMode, sortOrder])


  if (loading) return <div className="py-12 text-center text-slate-600 font-mono animate-pulse">CARGANDO BANCO DE MEMORIA...</div>

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* SECCIÓN DE DESCARGA */}
      <LootboxDischarger boxCount={lootboxCount} onDischarge={refreshAll} />

      {/* LISTA DE ARCHIVOS */}
      {files.length === 0 ? (
          lootboxCount === 0 && (
            <div className="text-center py-12 border border-slate-800 rounded-2xl bg-slate-900/50">
                <FaSearch className="mx-auto text-slate-600 mb-4 text-3xl" />
                <p className="text-slate-400 font-bold">Memoria vacía.</p>
                <p className="text-slate-600 text-sm mt-2">Consigue cajas para obtener datos.</p>
            </div>
          )
      ) : (
          <div className="space-y-3">
             {/* CABECERA: Título + Herramientas de Ordenación */}
             <div className="flex flex-col sm:flex-row sm:items-end justify-between px-2 mb-2 gap-3">
                
                {/* Título y Contador */}
                <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                        Archivos Extraídos ({files.length})
                    </h4>
                    {groundingCount > 0 && (
                        <div className="text-[10px] bg-yellow-900/20 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20 inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
                            {groundingCount} {groundingCount === 1 ? 'Puesta a Tierra' : 'Puestas a Tierra'}
                        </div>
                    )}
                </div>

                {/* BOTONES DE ORDENACIÓN */}
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                    {/* Botón 1: Por Fecha */}
                    <button
                        onClick={() => handleSortChange('date')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold transition-all
                            ${sortMode === 'date' 
                                ? 'bg-slate-700 text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                            }
                        `}
                    >
                        <FaCalendarAlt />
                        OBTENCIÓN
                        {sortMode === 'date' && (
                            sortOrder === 'asc' ? <FaSortAmountUp className="text-indigo-400"/> : <FaSortAmountDown className="text-indigo-400"/>
                        )}
                    </button>

                    <div className="w-[1px] bg-slate-800 mx-1 my-1"></div>

                    {/* Botón 2: Por Examen (Académico) */}
                    <button
                        onClick={() => handleSortChange('academic')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold transition-all
                            ${sortMode === 'academic' 
                                ? 'bg-slate-700 text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                            }
                        `}
                    >
                        <FaGraduationCap className="text-lg" />
                        CURSO
                        {sortMode === 'academic' && (
                            sortOrder === 'asc' ? <FaSortAmountUp className="text-indigo-400"/> : <FaSortAmountDown className="text-indigo-400"/>
                        )}
                    </button>
                </div>
             </div>

             {/* LISTADO ORDENADO */}
             <div className="space-y-3">
                 {sortedFiles.map((file) => (
                    <FileCard 
                        key={file.exercise.id} 
                        file={file} 
                        onOpenEnunciado={() => console.log("Enunciado:", file.exercise.id)}
                        onOpenSolution={() => {
                            if (file.has_solution) {
                                console.log("Solución:", file.exercise.id)
                            } else {
                                setSelectedExerciseId(file.exercise.id)
                            }
                        }}
                    />
                 ))}
             </div>
          </div>
      )}

      <GroundingKitModal 
          isOpen={!!selectedExerciseId}
          exerciseId={selectedExerciseId}
          inventoryCount={groundingCount}
          onClose={() => setSelectedExerciseId(null)}
          onSuccess={() => refreshAll()}
      />
    </div>
  )
}