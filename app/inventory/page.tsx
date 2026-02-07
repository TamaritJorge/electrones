// Ruta: app/inventory/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaBoxOpen, FaMicrochip } from 'react-icons/fa' // Cambiado Icono a Microchip para "Banco de Memoria"
import InventoryItems from '@/components/inventory/InventoryItems'
import InventoryFiles from '@/components/inventory/InventoryFiles'

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<'items' | 'files'>('items')

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 pb-24 text-slate-200">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* --- CABECERA --- */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 bg-slate-900 rounded-full hover:bg-slate-800 transition border border-slate-800 text-slate-400 hover:text-white">
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">
            MOCHILA
          </h1>
        </div>

        {/* --- PESTAÑAS (TABS) --- */}
        <div className="grid grid-cols-2 p-1 bg-slate-900/50 rounded-xl border border-slate-800 mb-6">
            <button 
                onClick={() => setActiveTab('items')}
                className={`py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2
                ${activeTab === 'items' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <FaBoxOpen /> Objetos
            </button>
            <button 
                onClick={() => setActiveTab('files')}
                className={`py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2
                ${activeTab === 'files' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
                {/* Nombre eléctrico sugerido: BANCO DE MEMORIA */}
                <FaMicrochip /> Banco de Memoria
            </button>
        </div>

        {/* --- CONTENIDO CONDICIONAL --- */}
        <div className="min-h-[300px]">
            {activeTab === 'items' ? (
                // Pasamos la función para cambiar de tab como prop
                <InventoryItems onSwitchToFiles={() => setActiveTab('files')} />
            ) : (
                <InventoryFiles />
            )}
        </div>

      </div>
    </main>
  )
}