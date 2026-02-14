// Ruta: components/loot/LootRatesModal.tsx
'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { createClient } from '@/utils/supabase/client'
import { FaTimes, FaCube } from 'react-icons/fa'
import ProductArtifact from '@/components/ProductArtifact'

// Interfaz unificada para mostrar en la lista (sea real o bonus)
interface DisplayItem {
  id: string
  name: string
  percent: number
  hex_color: string
  subtitle: string | null
  isBonus?: boolean
}

interface Props {
  onClose: () => void
  iconName?: string
}

const RARITY_PALETTE = [
  '#94a3b8', // Gris
  '#22c55e', // Verde
  '#3b82f6', // Azul
  '#a855f7', // Morado
  '#eab308', // Dorado
  '#ef4444', // Rojo
]

export default function LootRatesModal({ onClose, iconName }: Props) {
  const [items, setItems] = useState<DisplayItem[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)

    const fetchAndProcessData = async () => {
      // 1. Obtener datos reales
      const { data } = await supabase
        .from('loot_tiers')
        .select('*')
        .order('probability', { ascending: false })

      if (data) {
        // Calcular peso total solo de los items reales
        const totalWeight = data.reduce((acc, tier) => acc + tier.probability, 0) || 1

        // 2. Mapear items reales a la interfaz de visualización
        const realItems: DisplayItem[] = data.map((tier, index) => {
          // Asignar color si no tiene
          const safeIndex = Math.min(index, RARITY_PALETTE.length - 1)
          const color = tier.hex_color || RARITY_PALETTE[safeIndex]
          
          return {
            id: tier.id,
            name: tier.name,
            percent: (tier.probability / totalWeight) * 100,
            hex_color: color,
            subtitle: tier.min_value && tier.max_value 
              ? `Valor: ${tier.min_value}-${tier.max_value}` 
              : null 
          }
        })

        // 3. Crear el item de BONUS (10% fijo) con color Ámbar
        const bonusItem: DisplayItem = {
          id: 'extra-box-bonus',
          name: 'Caja Extra',
          percent: 10.00,
          hex_color: '#f59e0b', // Ámbar vibrante
          subtitle: 'Probabilidad independiente',
          isBonus: true
        }

        // 4. Juntar TODO y ordenar por probabilidad (así caerá donde le toque)
        const allItems = [...realItems, bonusItem].sort((a, b) => b.percent - a.percent)

        setItems(allItems)
      }
      setLoading(false)
    }

    fetchAndProcessData()

    document.body.style.overflow = 'hidden'
    return () => {
       document.body.style.overflow = 'unset'
    }
  }, [])

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 w-full max-w-md rounded-3xl border border-slate-800 shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* --- CABECERA --- */}
        <div className="p-6 border-b border-slate-800 flex items-center bg-slate-900/90 gap-5 relative z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />

          <div className="w-16 h-16 relative flex-shrink-0 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center p-2 shadow-lg">
             {iconName ? (
               <div className="w-full h-full flex items-center justify-center relative">
                 <ProductArtifact iconName={iconName} />
               </div>
             ) : (
               <FaCube className="text-indigo-400 text-3xl" />
             )}
          </div>
          
          <div className="flex-1 min-w-0">
              <h3 className="text-white font-black text-xl leading-tight tracking-tight">Probabilidades</h3>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex-shrink-0"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* --- LISTA DE ITEMS --- */}
        <div className="p-5 overflow-y-auto max-h-[60vh] space-y-3 custom-scrollbar bg-slate-950/30">
            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                </div>
            ) : items.length === 0 ? (
                <p className="text-center text-slate-500 py-10">No hay datos disponibles.</p>
            ) : (
                items.map((item) => {
                    const displayPercent = item.percent < 0.01 ? '< 0.01' : item.percent.toFixed(2)

                    return (
                        <div 
                            key={item.id}
                            className="group relative overflow-hidden rounded-xl border p-3 flex items-center justify-between transition-all hover:brightness-110"
                            style={{ 
                                backgroundColor: `${item.hex_color}10`,
                                borderColor: `${item.hex_color}30`,
                                // Si es bonus, inyectamos la sombra usando su propio hex_color
                                boxShadow: item.isBonus ? `0 0 15px -5px ${item.hex_color}60` : 'none'
                            }}
                        >
                            {/* Barra lateral */}
                            <div 
                                className="absolute left-0 top-0 bottom-0 w-1" 
                                style={{ backgroundColor: item.hex_color }}
                            />

                            <div className="pl-3 flex-1">
                                <h4 
                                    className="font-extrabold text-sm tracking-wide uppercase flex items-center gap-2 drop-shadow-sm"
                                    style={{ color: item.hex_color }}
                                >
                                    {item.name}
                                    {/* Etiqueta BONUS con color de fondo dinámico */}
                                    {item.isBonus && (
                                      <span 
                                        className="text-[9px] text-slate-950 font-black px-1.5 py-0.5 rounded ml-1 tracking-normal"
                                        style={{ backgroundColor: item.hex_color }}
                                      >
                                        BONUS
                                      </span>
                                    )}
                                </h4>
                                
                                {/* Subtítulo */}
                                {item.subtitle && (
                                  <p className="text-slate-400 text-[11px] font-mono mt-0.5 opacity-80">
                                      {item.subtitle}
                                  </p>
                                )}
                            </div>

                            <div className="flex flex-col items-end pl-4">
                                <div className="flex items-baseline gap-0.5">
                                    <span className="font-mono font-bold text-white text-lg tabular-nums tracking-tighter">
                                        {displayPercent}
                                    </span>
                                    <span 
                                        className="text-xs font-bold"
                                        style={{ color: item.hex_color }}
                                    >
                                        %
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
        
        {/* Pie vacío para margen estético */}
        <div className="h-2 bg-slate-950/30"></div>
      </div>
      
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>,
    document.body
  )
}