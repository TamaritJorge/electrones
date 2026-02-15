// Ruta: components/shop/ProductCard.tsx
'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { 
  FaBolt, FaBan, FaUsers, FaBoxOpen, FaCheckCircle, FaGlobe, 
  FaFire, FaShieldAlt, FaStar, FaCrown, FaGhost, FaDragon, FaTimes 
} from 'react-icons/fa'
import ProductArtifact from '@/components/ProductArtifact'
import LootRatesButton from '@/components/loot/LootRatesButton'
import { TeamAssignment } from '@/components/leaderboard/TeamAssignment'

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

interface ProductCardProps {
  product: Product
  myBalance: number
  ownedAmount: number
  isBuying: boolean
  activeCampaign?: Campaign
  hasClaimed?: boolean
  teamColor?: string 
  teamIcon?: string  
  userHasTeam?: boolean
  onBuy: (product: Product) => void
  onStartCampaign: (productId: string) => void
  onContribute: (campaign: Campaign) => void
  onClaim: (campaignId: string) => void
  onTeamAssigned?: () => void
}

export default function ProductCard({
  product,
  myBalance,
  ownedAmount,
  isBuying,
  activeCampaign,
  hasClaimed,
  teamColor,
  teamIcon,
  userHasTeam = true,
  onBuy,
  onStartCampaign,
  onContribute,
  onClaim,
  onTeamAssigned
}: ProductCardProps) {
  
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isMaxReached = product.max_per_user !== null && ownedAmount >= product.max_per_user
  const isIndividual = product.purchase_type === 'individual'
  const isTeam = product.purchase_type === 'team'
  const isGlobal = product.purchase_type === 'global'
  const notEnoughMoney = myBalance < product.price

  const customStyles = isTeam && teamColor 
    ? { backgroundColor: `${teamColor}15`, borderColor: `${teamColor}40` }
    : isGlobal 
      ? { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)' } 
      : {} 

  const renderTeamIcon = (iconKey?: string) => {
    if (!iconKey) return null;
    
    switch (iconKey.toLowerCase()) {
      case 'fire': return <FaFire />;
      case 'bolt': return <FaBolt />;
      case 'shield': return <FaShieldAlt />;
      case 'star': return <FaStar />;
      case 'crown': return <FaCrown />;
      case 'ghost': return <FaGhost />;
      case 'dragon': return <FaDragon />;
      default: return <FaUsers />; 
    }
  }

  const handleTeamAction = (action: () => void) => {
    if (!userHasTeam && isTeam) {
      setShowTeamModal(true)
    } else {
      action()
    }
  }

  return (
    <>
      <div 
        className={`rounded-xl p-4 flex gap-4 items-start shadow-sm transition-all
          ${(!isTeam && !isGlobal) ? 'bg-slate-800 border-slate-700' : 'border'}`}
        style={customStyles}
      >
        {/* SECCIÓN DEL ICONO MODIFICADA */}
        <div className="relative shrink-0 mt-1 w-16 h-16">
           <ProductArtifact iconName={product.image_icon} className="w-full h-full" />
           
           {/* El botón ahora es un "badge" sobre el icono */}
           {product.name === 'Caja de Alto Voltaje' && (
             <div className="absolute -top-1.5 -right-1.5 z-10 scale-[0.8] origin-center shadow-sm rounded-full bg-slate-900">
               <LootRatesButton minimal={true} iconName={product.image_icon} />
             </div>
           )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            {/* TÍTULO REVERTIDO AL ESTADO ORIGINAL (con flex-wrap) */}
            <h3 className="text-white font-bold text-sm sm:text-base leading-tight pr-2 flex items-center gap-2 flex-wrap">
              {isTeam && teamIcon && (
                <span className="text-lg drop-shadow-md" style={{ color: teamColor || 'white' }}>
                  {renderTeamIcon(teamIcon)}
                </span>
              )}
              
              {isGlobal && <FaGlobe className="text-blue-400" size={14} />}
              
              <span>{product.name}</span>
              {/* El botón ya no está aquí */}
            </h3>
            
            <div className={`flex items-center justify-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono font-bold border whitespace-nowrap shrink-0
              ${notEnoughMoney 
                ? 'bg-red-950/40 border-red-500/30 text-red-400 shadow-inner shadow-red-900/20' 
                : 'bg-slate-950/50 border-slate-700 text-yellow-500 shadow-inner shadow-black/20'}`}
            >
              <FaBolt size={10} className={notEnoughMoney ? 'text-red-400' : 'text-yellow-400'} /> 
              {product.price}
            </div>
          </div>

          <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{product.description}</p>
          
          {product.max_per_user && (
            <div className="mt-1.5 text-[11px] font-mono text-slate-500">
              Límite: <span className={isMaxReached ? 'text-amber-500 font-bold' : ''}>{ownedAmount}/{product.max_per_user}</span>
            </div>
          )}

          <div className="mt-4">
            {isIndividual && (
              <button
                onClick={() => onBuy(product)}
                disabled={notEnoughMoney || isMaxReached || isBuying}
                className={`w-full py-2 rounded-lg font-bold text-xs border transition-all flex justify-center items-center gap-2
                  ${isMaxReached 
                    ? 'bg-slate-800/50 text-slate-500 border-slate-700/50 cursor-not-allowed bg-[image:repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.2)_5px,rgba(0,0,0,0.2)_10px)]' 
                    : notEnoughMoney
                      ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-900/20'}`}
              >
                {isMaxReached ? (
                  <><FaBan size={11} /> Límite Alcanzado</>
                ) : (
                  <><FaBolt size={10} className={notEnoughMoney ? 'text-slate-500' : 'text-yellow-400'} /> Comprar</>
                )}
              </button>
            )}

            {!isIndividual && (
              <>
                {!activeCampaign ? (
                  <button 
                    onClick={() => handleTeamAction(() => onStartCampaign(product.id))}
                    disabled={isBuying || isMaxReached}
                    className={`w-full py-2 rounded-lg font-bold text-xs border transition-colors flex justify-center items-center gap-2
                      ${isMaxReached 
                        ? 'bg-slate-800/50 text-slate-500 border-slate-700/50 cursor-not-allowed bg-[image:repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.2)_5px,rgba(0,0,0,0.2)_10px)]' 
                        : 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600/40'}`}
                  >
                    {isMaxReached ? <><FaBan size={11} /> Límite Alcanzado</> : <><FaUsers size={12} /> Iniciar Colecta</>}
                  </button>
                ) : !activeCampaign.is_completed ? (
                  <div className="space-y-2">
                    <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-700 overflow-hidden relative shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((activeCampaign.current_amount / activeCampaign.target_amount) * 100, 100)}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-[8px] font-mono font-bold text-white drop-shadow-md">
                        {activeCampaign.current_amount} / {activeCampaign.target_amount}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleTeamAction(() => onContribute(activeCampaign))}
                      disabled={myBalance <= 0 || isBuying || isMaxReached}
                      className={`w-full py-2 rounded-lg font-bold text-xs border flex justify-center items-center gap-2 transition-all
                        ${isMaxReached
                          ? 'bg-slate-800/50 text-slate-500 border-slate-700/50 cursor-not-allowed bg-[image:repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.2)_5px,rgba(0,0,0,0.2)_10px)]'
                          : 'bg-gradient-to-b from-amber-500 to-amber-700 border-t border-amber-400/60 text-white shadow-[0_4px_12px_rgba(245,158,11,0.3)] hover:from-amber-400 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed'}`}
                    >
                        {isMaxReached ? <><FaBan size={11} /> Límite Alcanzado</> : <><FaBolt size={10} className="text-amber-100" /> Aportar Electrones</>}
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => !hasClaimed && onClaim(activeCampaign.id)}
                    disabled={hasClaimed || isBuying || isMaxReached}
                    className={`w-full py-2 rounded-lg font-bold text-xs border transition-all flex justify-center items-center gap-2
                      ${hasClaimed || isMaxReached
                        ? 'bg-slate-800/50 text-slate-400 border-slate-700/50 cursor-not-allowed bg-[image:repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.2)_5px,rgba(0,0,0,0.2)_10px)]' 
                        : 'bg-gradient-to-b from-purple-500 to-purple-700 border-t border-purple-400/60 text-white shadow-[0_4px_12px_rgba(168,85,247,0.4)] hover:shadow-[0_6px_16px_rgba(168,85,247,0.6)] animate-pulse hover:animate-none'}`}
                  >
                    {hasClaimed ? (
                      <><FaCheckCircle size={12} className="text-emerald-500"/> ¡Objeto en tu Mochila!</>
                    ) : isMaxReached ? (
                      <><FaBan size={11} className="text-slate-500"/> Límite Alcanzado</>
                    ) : (
                      <><FaBoxOpen size={12} /> ¡Reclamar Premio!</>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {mounted && showTeamModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl animate-in zoom-in-95 duration-300">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-t-3xl p-4 mb-[-20px] pb-8 text-center relative z-0">
              <p className="text-amber-200/80 text-sm mt-1 max-w-md mx-auto">
                Para participar en colectas de equipo, primero debes descubrir a cuál perteneces
              </p>
            </div>
            <div className="relative z-10">
              <TeamAssignment 
                onAssignComplete={() => {
                  setShowTeamModal(false)
                  if (onTeamAssigned) onTeamAssigned()
                }} 
              />
            </div>
            <button 
              onClick={() => setShowTeamModal(false)} 
              className="absolute -top-4 -right-4 bg-slate-800 p-2 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 shadow-xl transition-colors z-20"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}