// Ruta: components/inventory/InventoryItems.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { FaInfoCircle, FaTimes, FaMagic } from 'react-icons/fa'
import ProductArtifact from '@/components/ProductArtifact'

interface StackedItem {
  product_id: string
  name: string
  description: string
  image_icon: string
  quantity: number
}

export default function InventoryItems() {
  const [inventory, setInventory] = useState<StackedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<StackedItem | null>(null)
  const [isUsing, setIsUsing] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: rawInventory, error } = await supabase
      .from('user_inventory')
      .select(`
          product_id,
          shop_products (
              name,
              description,
              image_icon
          )
      `)
      .eq('user_id', user.id)
      .eq('is_consumed', false)

    if (error) {
      console.error('Error cargando inventario:', error)
    } else if (rawInventory) {
      const groupedMap: Record<string, StackedItem> = {}

      rawInventory.forEach((item: any) => {
         if (!item.shop_products) return 
         const pid = item.product_id
         
         if (!groupedMap[pid]) {
           groupedMap[pid] = {
             product_id: pid,
             name: item.shop_products.name,
             description: item.shop_products.description,
             image_icon: item.shop_products.image_icon,
             quantity: 0
           }
         }
         groupedMap[pid].quantity += 1
      })
      setInventory(Object.values(groupedMap))
    }
    setLoading(false)
  }

  const handleUseItem = async () => {
    if (!selectedItem) return
    setIsUsing(true)

    // TODO: Llamada RPC real
    // const { error } = await supabase.rpc('consume_item', { item_id: selectedItem.product_id })
    
    await new Promise(resolve => setTimeout(resolve, 800)) // Fake delay
    alert(`Has usado: ${selectedItem.name}`)

    setInventory(prev => {
        return prev.map(item => {
            if (item.product_id === selectedItem.product_id) {
                return { ...item, quantity: item.quantity - 1 }
            }
            return item
        }).filter(item => item.quantity > 0)
    })

    setIsUsing(false)
    setSelectedItem(null)
  }

  if (loading) {
      return <div className="text-center py-20 text-slate-600 font-mono animate-pulse">CARGANDO MOCHILA...</div>
  }

  if (inventory.length === 0) {
    return (
        <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-500 mb-4">Tu mochila está vacía.</p>
            <Link href="/shop" className="text-indigo-400 hover:text-indigo-300 underline font-mono text-sm">
                Ir a la tienda
            </Link>
        </div>
    )
  }

  return (
    <>
        <div className="grid grid-cols-2 gap-4">
            {inventory.map((item) => (
                <div key={item.product_id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center relative group overflow-hidden shadow-lg transition-colors hover:border-slate-700">
                    
                    {/* CAMBIO PRINCIPAL AQUÍ:
                       El envoltorio del icono ahora es 'relative inline-block' 
                       y el contador está DENTRO.
                    */}
                    <div className="mb-3 transform group-hover:scale-105 transition-transform duration-300 relative inline-block">
                        <ProductArtifact iconName={item.image_icon} />

                        {/* Contador estilo badge redondo en la esquina del icono */}
                        <div className="absolute -bottom-2 -right-2 bg-slate-950 text-indigo-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-slate-800 shadow-md z-10 font-mono leading-none flex items-center justify-center min-w-[18px] h-[18px]">
                            x{item.quantity}
                        </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-200 text-center leading-tight mb-3 min-h-[2.5em] flex items-center justify-center">
                        {item.name}
                    </h3>
                    
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(item);
                        }}
                        className="cursor-pointer relative z-20 text-[10px] uppercase tracking-wider font-bold text-slate-400 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 px-3 py-1.5 rounded-full transition-all w-full flex items-center justify-center gap-1 active:scale-95"
                    >
                        <FaInfoCircle size={10} /> Examinar
                    </button>
                </div>
            ))}
        </div>

        {/* --- MODAL (Sin cambios) --- */}
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
               
               <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-2 z-10"
               >
                 <FaTimes size={20} />
               </button>

               <div className="mb-6 mt-4 p-4 relative">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>
                  <div className="transform scale-150 relative z-10">
                     <ProductArtifact iconName={selectedItem.image_icon} />
                  </div>
               </div>
               
               <h2 className="text-xl font-bold text-white mb-2">{selectedItem.name}</h2>
               
               <div className="bg-slate-950/50 rounded-xl p-4 w-full mb-6 border border-slate-800/50 max-h-32 overflow-y-auto">
                 <p className="text-slate-400 text-sm leading-relaxed text-left">
                   {selectedItem.description}
                 </p>
               </div>

               <div className="flex items-center justify-between w-full gap-4">
                  <div className="flex flex-col items-start pl-2">
                     <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Inventario</span>
                     <span className="text-2xl font-mono text-white">x{selectedItem.quantity}</span>
                  </div>

                  <button 
                    onClick={handleUseItem}
                    disabled={isUsing}
                    className="flex-1 py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/40 hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUsing ? "Usando..." : <><FaMagic /> USAR</>}
                  </button>
               </div>

            </div>
          </div>
        )}
    </>
  )
}