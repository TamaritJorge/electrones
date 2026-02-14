// Ruta: app/shop/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { FaArrowLeft, FaBolt, FaStore, FaUsers } from 'react-icons/fa'
import ProductCard from '@/components/shop/ProductCard'
import Toast from '@/components/ui/Toast'

// Interfaces
interface Product {
  id: string
  name: string
  description: string
  price: number
  image_icon: string
  category: string
  stock: number | null
  max_per_user: number | null
  purchase_type: 'individual' | 'team' | 'global'
}

interface Campaign {
  id: string
  product_id: string
  current_amount: number
  target_amount: number
  is_completed: boolean
}

export default function ShopPage() {
  // Estados de datos
  const [products, setProducts] = useState<Product[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [activeTab, setActiveTab] = useState<'individual' | 'collective'>('individual')
  
  // Estados de usuario e interfaz
  const [loading, setLoading] = useState(true)
  const [myBalance, setMyBalance] = useState(0)
  const [ownedCounts, setOwnedCounts] = useState<Record<string, number>>({})
  const [claimedCampaigns, setClaimedCampaigns] = useState<Set<string>>(new Set())
  const [purchasingId, setPurchasingId] = useState<string | null>(null)
  
  // Estado para guardar la info del equipo del usuario
  const [teamInfo, setTeamInfo] = useState<{ hex_color?: string, icon_key?: string } | null>(null)
  
  // NUEVO: Estado explícito para saber si tiene equipo (para pasar al ProductCard)
  const [userHasTeam, setUserHasTeam] = useState<boolean>(true) // Por defecto true hasta que cargue
  
  // Estado para tu Toast personalizado
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null)
  
  // Estados de modales
  const [confirmingProduct, setConfirmingProduct] = useState<Product | null>(null)
  const [contributingCampaign, setContributingCampaign] = useState<Campaign | null>(null)
  const [contributionAmount, setContributionAmount] = useState<number>(100)

  const supabase = createClient()

  // Función para mostrar el Toast
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
  }

  // 1. FUNCIÓN DE CARGA DE DATOS (Recarga suave)
  const loadShopData = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Cargar Perfil
    const { data: profile } = await supabase
      .from('profiles')
      .select('current_balance, team')
      .eq('id', user.id)
      .single()
      
    if (profile) {
      setMyBalance(profile.current_balance)
      
      // Actualizamos si tiene equipo o no
      setUserHasTeam(!!profile.team)
      
      // Cargar info del equipo usando los nombres exactos de tus columnas
      if (profile.team) {
        const { data: teamData } = await supabase
          .from('teams')
          .select('hex_color, icon_key')
          .eq('id', profile.team)
          .single()
          
        if (teamData) {
          setTeamInfo(teamData)
        }
      } else {
        // Si no tiene equipo, reseteamos la info
        setTeamInfo(null)
      }
    }

    // Cargar Productos
    const { data: productsData } = await supabase
      .from('shop_products')
      .select('*')
      .eq('is_active', true)
      .order('price', { ascending: true })
      
    if (productsData) setProducts(productsData)

    // Cargar Campañas
    const { data: campaignsData } = await supabase
      .from('crowdfunding_campaigns')
      .select('*')
      .or(`team_id.is.null,team_id.eq.${profile?.team}`)
      .order('created_at', { ascending: false })
    
    // Filtrar para quedarnos solo con la campaña más reciente de cada producto
    if (campaignsData) {
      const latestCampaigns: Campaign[] = []
      const seen = new Set()
      campaignsData.forEach(camp => {
        if (!seen.has(camp.product_id)) {
          latestCampaigns.push(camp)
          seen.add(camp.product_id)
        }
      })
      setCampaigns(latestCampaigns)
    }

    // Cargar Reclamos del usuario
    const { data: claimsData } = await supabase
      .from('crowdfunding_claims')
      .select('campaign_id')
      .eq('user_id', user.id)
      
    if (claimsData) {
      setClaimedCampaigns(new Set(claimsData.map(c => c.campaign_id)))
    }

    // Cargar Inventario
    const { data: inventoryData } = await supabase
      .from('user_inventory')
      .select('product_id')
      .eq('user_id', user.id)
      
    if (inventoryData) {
      const counts: Record<string, number> = {}
      inventoryData.forEach(item => counts[item.product_id] = (counts[item.product_id] || 0) + 1)
      setOwnedCounts(counts)
    }

    setLoading(false)
  }

  // Ejecutar carga inicial
  useEffect(() => {
    loadShopData()
  }, [])

  // 2. ACCIONES
  const executePurchase = async () => {
    if (!confirmingProduct) return
    const product = confirmingProduct
    setConfirmingProduct(null) 
    setPurchasingId(product.id)

    try {
      const { data, error } = await supabase.rpc('buy_item', { p_product_id: product.id })
      if (error) throw error
      if (data.success) {
        showToast(`¡Has comprado ${product.name}!`, 'success')
        await loadShopData()
      } else {
        showToast(data.message, 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Error al procesar la compra.', 'error')
    } finally {
      setPurchasingId(null)
    }
  }

  const startCampaign = async (productId: string) => {
    setPurchasingId(productId)
    try {
      const { data, error } = await supabase.rpc('create_crowdfunding_campaign', { target_product_id: productId })
      if (error) throw error
      if (data.success) {
        showToast('¡Colecta iniciada! Avisa a tu equipo.', 'success')
        await loadShopData() 
      } else {
        showToast(data.message, 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Error al iniciar la colecta.', 'error')
    } finally {
      setPurchasingId(null)
    }
  }

  const executeContribution = async () => {
    if (!contributingCampaign) return
    const amount = contributionAmount
    const campId = contributingCampaign.id
    setContributingCampaign(null)
    setPurchasingId(campId)

    try {
      const { data, error } = await supabase.rpc('contribute_to_campaign', { 
        campaign_uuid: campId, 
        contribution_amount: amount 
      })
      
      if (error) throw error
      if (data.success) {
        showToast(`¡Aportaste ${amount} electrones!`, 'success')
        await loadShopData()
      } else {
        showToast(data.message, 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Error al aportar electrones.', 'error')
    } finally {
      setPurchasingId(null)
    }
  }

  const executeClaim = async (campaignId: string) => {
    setPurchasingId(campaignId)
    try {
      const { data, error } = await supabase.rpc('claim_campaign_reward', { p_campaign_id: campaignId })
      if (error) throw error
      if (data.success) {
        showToast('¡Objeto reclamado! Revisa tu mochila.', 'success')
        await loadShopData()
      } else {
        showToast(data.message, 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Error al reclamar el premio.', 'error')
    } finally {
      setPurchasingId(null)
    }
  }

  // 3. FILTRADO PARA PESTAÑAS
  const displayedProducts = products.filter(p => 
    activeTab === 'individual' ? p.purchase_type === 'individual' : p.purchase_type !== 'individual'
  )

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-6 pb-24 relative">
      
      {/* RENDERIZADO DEL TOAST */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="max-w-md mx-auto space-y-6">
        
        {/* CABECERA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition text-slate-200 border border-slate-700">
              <FaArrowLeft />
            </Link>
            <h1 className="text-xl font-bold text-white flex items-center gap-2 tracking-wide">
              TIENDA DE ELECTRONES
            </h1>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-full border border-slate-700 shadow-inner">
            <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center shadow-[0_0_8px_#facc15]">
              <FaBolt className="text-slate-900 text-[10px]" />
            </div>
            <span className="text-lg font-mono font-bold text-white tabular-nums">{myBalance}</span>
          </div>
        </div>

        {/* PESTAÑAS (TABS) */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button 
            onClick={() => setActiveTab('individual')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'individual' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <FaStore /> Individuales
          </button>
          <button 
            onClick={() => setActiveTab('collective')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'collective' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <FaUsers /> Globales
          </button>
        </div>

        {/* LISTA DE PRODUCTOS */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 animate-pulse font-mono">INICIANDO SISTEMA...</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                myBalance={myBalance}
                ownedAmount={ownedCounts[product.id] || 0}
                isBuying={purchasingId === product.id || purchasingId === campaigns.find(c => c.product_id === product.id)?.id}
                activeCampaign={campaigns.find(c => c.product_id === product.id)}
                hasClaimed={claimedCampaigns.has(campaigns.find(c => c.product_id === product.id)?.id || '')}
                
                // Nuevas props pasadas:
                userHasTeam={userHasTeam}
                onTeamAssigned={loadShopData}

                // Pasamos los datos del equipo a la tarjeta
                teamColor={teamInfo?.hex_color}
                teamIcon={teamInfo?.icon_key}
                
                onBuy={setConfirmingProduct}
                onStartCampaign={startCampaign}
                onClaim={executeClaim}
                onContribute={(campaign) => {
                  const amountNeeded = campaign.target_amount - campaign.current_amount
                  const suggestedAmount = Math.min(myBalance, amountNeeded, 100)
                  setContributionAmount(suggestedAmount)
                  setContributingCampaign(campaign)
                }}
              />
            ))}
            
            {/* Mensaje por si la pestaña está vacía */}
            {displayedProducts.length === 0 && (
              <div className="text-center py-10 text-slate-500">
                No hay productos disponibles en esta categoría.
              </div>
            )}
          </div>
        )}

        {/* MODAL: COMPRA INDIVIDUAL */}
        {confirmingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
               <h3 className="text-lg font-bold text-white mb-2">Confirmar Transacción</h3>
               <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                 ¿Adquirir <strong className="text-white">{confirmingProduct.name}</strong>?
               </p>
               <div className="flex items-center justify-center gap-2 mb-8 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                  <FaBolt className="text-yellow-400" />
                  <span className="text-xl font-bold font-mono text-white tracking-wider">{confirmingProduct.price}</span>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setConfirmingProduct(null)} className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">Cancelar</button>
                  <button onClick={executePurchase} className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-indigo-600 text-white shadow-lg shadow-indigo-900/20 hover:bg-indigo-500">Confirmar</button>
               </div>
            </div>
          </div>
        )}

        {/* MODAL: APORTAR A CROWDFUNDING */}
        {contributingCampaign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-500"></div>
               <h3 className="text-lg font-bold text-white mb-2">Aportar Electrones</h3>
               <p className="text-slate-400 text-sm mb-6">
                 Faltan <strong className="text-amber-400">{contributingCampaign.target_amount - contributingCampaign.current_amount}</strong> electrones para completar la meta. ¿Cuánto quieres aportar?
               </p>
               
               <div className="mb-6 flex flex-col items-center">
                 <input 
                   type="number" 
                   value={contributionAmount}
                   onChange={(e) => {
                     const val = Number(e.target.value);
                     const maxAllowed = Math.min(myBalance, contributingCampaign.target_amount - contributingCampaign.current_amount);
                     setContributionAmount(Math.max(1, Math.min(maxAllowed, val)));
                   }}
                   className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-center text-2xl font-mono text-amber-400 focus:outline-none focus:border-amber-500"
                   min="1"
                   max={Math.min(myBalance, contributingCampaign.target_amount - contributingCampaign.current_amount)}
                 />
                 <p className="text-xs text-slate-500 mt-2 font-mono">Saldo disponible: {myBalance}</p>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setContributingCampaign(null)} className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">Cancelar</button>
                  <button onClick={executeContribution} className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-amber-600 text-white shadow-lg shadow-amber-900/20 hover:bg-amber-500">Aportar</button>
               </div>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}