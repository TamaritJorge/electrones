// Ruta: components/loot/LootRatesButton.tsx
'use client'

import { useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import LootRatesModal from './LootRatesModal'

interface Props {
    className?: string
    minimal?: boolean 
    iconName?: string // <--- Añadido
}

export default function LootRatesButton({ className = '', minimal = false, iconName }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
            e.stopPropagation() 
            setIsOpen(true)
        }}
        className={`flex items-center gap-2 transition-all active:scale-95 z-20 relative ${className} ${
            minimal 
            ? 'text-slate-400 hover:text-indigo-400 p-2' 
            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-bold uppercase tracking-wide hover:border-indigo-500/50'
        }`}
        title="Ver probabilidades de botín"
      >
        <FaInfoCircle className={minimal ? "text-lg" : ""} />
        {!minimal && <span>Drop Rates</span>}
      </button>

      {/* Pasamos el iconName al modal */}
      {isOpen && <LootRatesModal iconName={iconName} onClose={() => setIsOpen(false)} />}
    </>
  )
}