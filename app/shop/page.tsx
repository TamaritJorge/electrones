// Ruta: app/shop/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { FaArrowLeft, FaBolt, FaShoppingCart, FaLock, FaBoxOpen, FaBan, FaTimes, FaCheck } from 'react-icons/fa'
import ProductArtifact from '@/components/ProductArtifact'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_icon: string
  category: string
  stock: number | null     
  max_per_user: number | null
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [myBalance, setMyBalance] = useState(0)
  const [ownedCounts, setOwnedCounts] = useState<Record<string, number>>({})
  
  // Estado para la lógica de compra
  const [purchasingId, setPurchasingId] = useState<string | null>(null)
  
  // NUEVO: Estado para el producto que estamos "pensando" comprar (abre el modal)
  const [confirmingProduct, setConfirmingProduct] = useState<Product | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      // 1. Cargar catálogo
      const { data: productsData } = await supabase
        .from('shop_products')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true })

      if (productsData) setProducts(productsData)

      if (user) {
        // 2. Cargar saldo
        const { data: profile } = await supabase
          .from('profiles')
          .select('current_balance')
          .eq('id', user.id)
          .single()
        if (profile) setMyBalance(profile.current_balance)

        // 3. Cargar inventario
        const { data: inventoryData } = await supabase
          .from('user_inventory')
          .select('product_id')
          .eq('user_id', user.id)
        
        if (inventoryData) {
          const counts: Record<string, number> = {}
          inventoryData.forEach((item) => {
            counts[item.product_id] = (counts[item.product_id] || 0) + 1
          })
          setOwnedCounts(counts)
        }
      }
      
      setLoading(false)
    }

    fetchData()
  }, [])

  // --- LÓGICA DE EJECUCIÓN REAL (Se llama DESDE el modal) ---
  const executePurchase = async () => {
    if (!confirmingProduct) return
    
    // Cerramos el modal y ponemos estado de carga
    const product = confirmingProduct
    setConfirmingProduct(null) 
    setPurchasingId(product.id)

    try {
      const { data, error } = await supabase.rpc('buy_item', { 
        p_product_id: product.id 
      })

      if (error) throw error

      if (data.success) {
        setMyBalance(data.new_balance)
        
        // Actualizar stock local
        if (product.stock !== null) {
            setProducts(prev => prev.map(p => 
                p.id === product.id ? { ...p, stock: (p.stock as number) - 1 } : p
            ))
        }

        // Actualizar conteo local
        setOwnedCounts(prev => ({
            ...prev,
            [product.id]: (prev[product.id] || 0) + 1
        }))

        // Opcional: Feedback visual de éxito (toast) en lugar de alert
        // alert(`¡Has comprado: ${product.name}!`) 
      } else {
        alert(data.message)
      }
    } catch (err) {
      console.error(err)
      alert('Error al procesar la compra.')
    } finally {
      setPurchasingId(null)
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* CABECERA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition text-slate-200 border border-slate-700">
              <FaArrowLeft />
            </Link>
            <h1 className="text-xl font-bold text-white flex items-center gap-2 tracking-wide">
              ALMACÉN
            </h1>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-full border border-slate-700 shadow-inner">
            <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center shadow-[0_0_8px_#facc15]">
              <FaBolt className="text-slate-900 text-[10px]" />
            </div>
            <span className="text-lg font-mono font-bold text-white tabular-nums">{myBalance}</span>
          </div>
        </div>

        {/* LISTA DE PRODUCTOS */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 animate-pulse font-mono">INICIANDO SISTEMA...</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {products.map((product) => {
              const isOutOfStock = product.stock !== null && product.stock <= 0
              const canAfford = myBalance >= product.price
              const isBuying = purchasingId === product.id
              const ownedAmount = ownedCounts[product.id] || 0
              const isMaxReached = product.max_per_user !== null && ownedAmount >= product.max_per_user
              const isButtonEnabled = canAfford && !isOutOfStock && !isBuying && !isMaxReached

              return (
                <div 
                  key={product.id} 
                  className={`
                    relative rounded-2xl p-4 flex gap-4 overflow-hidden transition-all duration-300
                    ${isButtonEnabled 
                        ? 'bg-slate-800 border border-slate-700' 
                        : 'bg-slate-900/80 border border-slate-800 opacity-75 grayscale-[0.3]'}
                  `}
                >
                  <ProductArtifact iconName={product.image_icon} />

                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 relative z-10">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-base font-bold text-white leading-tight pr-2 font-sans tracking-tight">
                          {product.name}
                        </h3>
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border shrink-0 ${canAfford ? 'bg-slate-900 border-slate-600' : 'bg-red-900/10 border-red-900/30'}`}>
                          <FaBolt className={`text-[10px] ${canAfford ? 'text-yellow-400' : 'text-slate-600'}`} />
                          <span className={`text-xs font-bold font-mono ${canAfford ? 'text-white' : 'text-slate-500'}`}>
                            {product.price}
                          </span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                            {product.description}
                        </p>
                        {product.max_per_user && (
                            <p className="text-[10px] text-slate-500 mt-1 font-mono">
                                Tienes: {ownedAmount} / {product.max_per_user}
                            </p>
                        )}
                      </div>
                    </div>

                    <button 
                      // 1. CAMBIO: En vez de comprar directo, guardamos el producto en 'confirmingProduct'
                      onClick={() => setConfirmingProduct(product)}
                      disabled={!isButtonEnabled}
                      className={`
                        w-full py-2 rounded-lg font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-150
                        ${isButtonEnabled 
                          ? 'bg-gradient-to-b from-indigo-500 to-indigo-700 border-t border-indigo-400/60 text-white shadow-[0_4px_12px_rgba(79,70,229,0.4)] hover:shadow-[0_6px_16px_rgba(79,70,229,0.6)] hover:from-indigo-400 hover:to-indigo-600 active:translate-y-[1px] active:shadow-none' 
                          : 'bg-slate-800/50 text-slate-500 border border-slate-700/50 cursor-not-allowed bg-[image:repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.2)_5px,rgba(0,0,0,0.2)_10px)]'}
                      `}
                    >
                      {isBuying ? (
                         "Procesando..."
                      ) : isMaxReached ? (
                        <>
                           <FaBan size={11} />
                           Máx. Alcanzado
                        </>
                      ) : isOutOfStock ? (
                        <>
                           <FaBoxOpen size={11} />
                           Agotado
                        </>
                      ) : canAfford ? (
                        <>
                          <FaShoppingCart size={11} className="text-indigo-100" />
                          Comprar
                        </>
                      ) : (
                        <>
                          <FaLock size={10} />
                          Electrones Insuficientes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* --- MODAL DE CONFIRMACIÓN --- */}
        {confirmingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl transform transition-all scale-100 relative overflow-hidden">
               {/* Fondo decorativo sutil */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
               
               <h3 className="text-lg font-bold text-white mb-2">Confirmar Transacción</h3>
               
               <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                 ¿Estás seguro de que quieres adquirir <strong className="text-white">{confirmingProduct.name}</strong> por un valor de:
               </p>

               <div className="flex items-center justify-center gap-2 mb-8 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                  <FaBolt className="text-yellow-400" />
                  <span className="text-xl font-bold font-mono text-white tracking-wider">{confirmingProduct.price}</span>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setConfirmingProduct(null)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
                  >
                    <FaTimes /> Cancelar
                  </button>
                  
                  <button 
                    onClick={executePurchase}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/20"
                  >
                    <FaCheck /> Confirmar
                  </button>
               </div>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}