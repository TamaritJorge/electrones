"use client"

import { useState } from 'react'
import { FaCheckCircle, FaBolt, FaUsers, FaTimes } from 'react-icons/fa'

export default function CampaignCard({ 
  campaign, 
  title, 
  color, 
  icon,
  teamName,
  profilesMap 
}: { 
  campaign: any, 
  title: string, 
  color: string, 
  icon: React.ReactNode,
  teamName?: string,
  profilesMap: Record<string, any>
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const progress = Math.min(100, Math.round((campaign.current_amount / campaign.target_amount) * 100)) || 0
  const isCompleted = campaign.is_completed || progress >= 100
  const contributions = campaign.crowdfunding_contributions || []

  return (
    <>
      <div 
        className="bg-slate-900/80 border rounded-xl p-4 flex flex-col gap-3 transition-all relative overflow-hidden group hover:bg-slate-800/80"
        style={{ borderColor: `${color}40`, boxShadow: isCompleted ? `0 0 15px ${color}20` : 'none' }}
      >
        {isCompleted && (
          <div className="absolute -right-4 -top-4 text-7xl opacity-5 pointer-events-none" style={{ color }}>
            <FaCheckCircle />
          </div>
        )}

        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-col">
            <h3 className="text-white font-bold leading-tight line-clamp-1 truncate" title={title}>
              {title}
            </h3>
            {teamName && (
              <span className="text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ color }}>
                {teamName}
              </span>
            )}
          </div>
          <div 
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border bg-slate-950/50"
            style={{ borderColor: color, color: color }}
          >
            {icon}
          </div>
        </div>

        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1.5 font-mono">
            <span className="text-slate-300 flex items-center gap-1">
              {campaign.current_amount.toLocaleString()} <FaBolt className="text-yellow-400" />
            </span>
            <span className="text-slate-500">
              {campaign.target_amount.toLocaleString()} ⚡
            </span>
          </div>
          
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progress}%`, backgroundColor: color }}
            >
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/30" />
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-1.5 mb-3">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              {isCompleted ? '¡Completado!' : 'En progreso'}
            </span>
            <span className="text-xs font-bold" style={{ color }}>{progress}%</span>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2 bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700 rounded-lg text-xs font-semibold text-slate-300 transition-colors flex items-center justify-center gap-2"
          >
            <FaUsers /> Ver Aportaciones ({contributions.length})
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <h3 className="font-bold text-white flex items-center gap-2">
                <FaUsers className="text-slate-400" /> 
                Aportaciones a la campaña
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex flex-col gap-2.5">
              {contributions.length === 0 ? (
                <p className="text-center text-slate-500 text-sm py-4">Aún no hay aportaciones.</p>
              ) : (
                contributions
                  .sort((a: any, b: any) => new Date(b.contributed_at).getTime() - new Date(a.contributed_at).getTime())
                  .map((contrib: any) => {
                    const userProfile = profilesMap[contrib.user_id] || {}
                    const avatar = userProfile.avatar_url || `https://api.dicebear.com/9.x/bottts/svg?seed=${contrib.user_id}`
                    const nickname = userProfile.nickname || 'Anónimo'
                    const fullName = userProfile.full_name || 'Sin nombre registrado'
                    
                    // Formatear fecha a formato corto (Ej: 15 oct, 16:30)
                    const dateFormatted = new Date(contrib.contributed_at).toLocaleDateString('es-ES', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                    })

                    return (
                      <div key={contrib.id} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-slate-800/60">
                        {/* IZQUIERDA: Avatar + Nombres */}
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img 
                            src={avatar} 
                            alt="Avatar" 
                            className="w-9 h-9 rounded-full border border-slate-600 bg-slate-700 shrink-0"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold text-slate-200 truncate">
                              {nickname}
                            </span>
                            <span className="text-[10px] text-slate-500 truncate" title={fullName}>
                              {fullName}
                            </span>
                          </div>
                        </div>

                        {/* DERECHA: Cantidad + Fecha */}
                        <div className="flex flex-col items-end shrink-0 pl-2">
                          <div className="flex items-center gap-1 font-mono text-sm font-bold text-white">
                            +{contrib.amount} <FaBolt className="text-yellow-400 text-xs" />
                          </div>
                          <span className="text-[10px] text-slate-500 mt-0.5">
                            {dateFormatted}
                          </span>
                        </div>
                      </div>
                    )
                  })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}