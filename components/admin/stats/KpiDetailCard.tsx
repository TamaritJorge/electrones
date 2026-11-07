"use client"
// Ruta: components/admin/stats/KpiDetailCard.tsx
// Tarjeta KPI clicable que abre un panel con el detalle (logros, compras o cajas abiertas)

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import { AchievementsDetail, PurchasesDetail, LootboxDetail } from './KpiDetails'

export type KpiDetailKind = 'achievements' | 'purchases' | 'lootboxes'

const TITLES: Record<KpiDetailKind, string> = {
  achievements: 'Logros conseguidos',
  purchases: 'Compras de la tienda',
  lootboxes: 'Cajas abiertas y desbloqueos',
}

export default function KpiDetailCard({ icon, value, label, kind }: {
  icon: React.ReactNode, value: number, label: string, kind: KpiDetailKind
}) {
  const [open, setOpen] = useState(false)

  // Bloquear el scroll de fondo y cerrar con Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 hover:border-slate-600 transition-colors cursor-pointer"
        title={`Ver detalle de ${label.toLowerCase()}`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{icon}</span>
          <span className="text-xl font-bold text-white leading-none">{value}</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold truncate w-full">
          {label} ›
        </span>
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 p-4 border-b border-slate-800">
              <h2 className="font-bold text-white flex items-center gap-2">{icon} {TITLES[kind]}</h2>
              <button onClick={() => setOpen(false)} className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800" aria-label="Cerrar">
                <FaTimes />
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              {kind === 'achievements' && <AchievementsDetail />}
              {kind === 'purchases' && <PurchasesDetail />}
              {kind === 'lootboxes' && <LootboxDetail />}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
