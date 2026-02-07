// Ruta: components/admin/PermanentUnlocksTable.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaUserAstronaut, FaCalendarAlt, FaShieldAlt, FaSearch, FaFilter, FaChevronDown } from 'react-icons/fa'
import ProductArtifact from '@/components/ProductArtifact'

interface UnlockEntry {
  inventory_id: string
  student_name: string
  student_email: string
  item_name: string
  item_icon: string
  unlocked_at: string
}

export default function PermanentUnlocksTable() {
  const [unlocks, setUnlocks] = useState<UnlockEntry[]>([])
  const [loading, setLoading] = useState(true)
  
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('') 
  const [selectedItem, setSelectedItem] = useState('all') // <--- Nuevo estado para el filtro de objeto
  
  const supabase = createClient()

  useEffect(() => {
    fetchUnlocks()
  }, [])

  const fetchUnlocks = async () => {
    try {
      const { data, error } = await supabase.rpc('get_admin_permanent_unlocks')
      
      if (error) {
        console.error('Error fetching admin unlocks:', error)
      } else {
        setUnlocks(data || [])
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Fecha desconocida'
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  // 1. Extraemos la lista de objetos únicos para el desplegable
  // Usamos Set para evitar duplicados y sort para ordenar alfabéticamente
  const uniqueItems = Array.from(new Set(unlocks.map(u => u.item_name))).sort()

  // 2. Lógica de filtrado combinada (Texto AND Objeto)
  const filteredUnlocks = unlocks.filter(entry => {
    // Filtro de Texto (Nombre, Email u Objeto)
    const matchesSearch = 
      entry.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.student_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.item_name?.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de Selector (Objeto específico)
    const matchesItem = selectedItem === 'all' || entry.item_name === selectedItem

    return matchesSearch && matchesItem
  })

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-full">
      
      {/* --- CABECERA Y FILTROS --- */}
      <div className="bg-slate-950/50 p-6 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaShieldAlt className="text-yellow-500" /> 
            Mejoras Permanentes Activas
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Listado de ventajas que los alumnos han desbloqueado.
          </p>
        </div>

        {/* Contenedor de Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
             
             {/* SELECTOR DE OBJETO (Nuevo) */}
             <div className="relative group min-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                   <FaFilter />
                </div>
                <select 
                   value={selectedItem}
                   onChange={(e) => setSelectedItem(e.target.value)}
                   className="w-full appearance-none bg-slate-900 text-slate-200 border border-slate-700 rounded-lg py-2 pl-10 pr-8 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer hover:border-slate-600"
                >
                   <option value="all">Todos los objetos</option>
                   {uniqueItems.map(item => (
                     <option key={item} value={item}>{item}</option>
                   ))}
                </select>
                {/* Icono de flecha custom para el select */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500 text-xs">
                   <FaChevronDown />
                </div>
             </div>

             {/* BUSCADOR DE TEXTO */}
             <div className="relative group w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                   <FaSearch />
                </div>
                <input 
                   type="text"
                   placeholder="Buscar alumno..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full bg-slate-900 text-slate-200 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                />
             </div>
        </div>
      </div>

      {/* --- CONTENIDO DE LA TABLA --- */}
      <div className="flex-1 overflow-x-auto">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center justify-center space-y-4">
             <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
             <span className="text-slate-500 font-mono text-xs animate-pulse">CARGANDO DATOS...</span>
          </div>
        ) : filteredUnlocks.length === 0 ? (
          <div className="p-16 text-center text-slate-500 flex flex-col items-center">
            <FaFilter className="text-4xl mb-3 opacity-20" />
            <p>No se encontraron resultados.</p>
            {(searchTerm || selectedItem !== 'all') && (
                <p className="text-xs mt-2">Prueba a limpiar los filtros.</p>
            )}
          </div>
        ) : (
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950 text-slate-500 uppercase font-mono text-xs border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Alumno</th>
                <th className="px-6 py-4 font-bold tracking-wider">Ventaja</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Adquirido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredUnlocks.map((entry) => (
                <tr key={entry.inventory_id} className="hover:bg-slate-800/40 transition-colors group">
                  
                  {/* COLUMNA ALUMNO */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-800 rounded-full text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                        <FaUserAstronaut />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                            {entry.student_name || 'Estudiante sin nombre'}
                        </span>
                        <span className="text-xs text-slate-600 font-mono group-hover:text-slate-500">
                            {entry.student_email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* COLUMNA OBJETO */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-9 h-9 flex-shrink-0 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center p-1">
                          <div className="scale-75">
                             <ProductArtifact iconName={entry.item_icon} /> 
                          </div>
                       </div>
                       <span className="text-yellow-500/90 font-bold text-xs uppercase tracking-wide bg-yellow-500/5 px-2.5 py-1 rounded border border-yellow-500/10 shadow-[0_0_10px_rgba(234,179,8,0.05)]">
                          {entry.item_name}
                       </span>
                    </div>
                  </td>

                  {/* COLUMNA FECHA */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-500 group-hover:text-slate-300 transition-colors">
                        <span className="font-mono text-xs">{formatDate(entry.unlocked_at)}</span>
                        <FaCalendarAlt className="opacity-30 text-xs" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Footer */}
      {!loading && filteredUnlocks.length > 0 && (
         <div className="bg-slate-950/30 border-t border-slate-800 p-3 flex justify-between items-center px-6">
             <span className="text-xs text-slate-600">
                {selectedItem !== 'all' && `Filtrado por: ${selectedItem}`}
             </span>
             <span className="text-[10px] uppercase font-bold text-slate-600 tracking-widest">
                Total: {filteredUnlocks.length}
             </span>
         </div>
      )}
    </div>
  )
}