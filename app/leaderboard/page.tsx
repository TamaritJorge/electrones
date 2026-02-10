//Ruta: app/leaderboard/page.tsx
'use client'

import { useState } from 'react'
import { FaTrophy, FaUsers, FaChartLine } from 'react-icons/fa'
import IndividualLeaderboard from '@/components/leaderboard/IndividualLeaderboard'
import TeamLeaderboard from '@/components/leaderboard/TeamLeaderboard'

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'individual' | 'team'>('individual')

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-sans">
      
        {/* CABECERA COMÚN */}
        <div className="text-center space-y-4 mb-8 pt-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center justify-center gap-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
            <FaTrophy className="text-yellow-500 drop-shadow-lg" />
            CLASIFICACIÓN
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base">
            Demuestra tus conocimientos, sube de rango y conviértete en una leyenda de la electricidad.
          </p>
        </div>

        {/* SELECTOR DE PESTAÑAS */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1 bg-slate-900 rounded-full border border-slate-800 shadow-xl">
            <button 
              onClick={() => setActiveTab('individual')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 duration-300
                ${activeTab === 'individual' 
                  ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                  : 'text-slate-500 hover:text-slate-300'}`}
            >
              <FaChartLine /> Individual
            </button>
            <button 
              onClick={() => setActiveTab('team')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 duration-300
                ${activeTab === 'team' 
                  ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                  : 'text-slate-500 hover:text-slate-300'}`}
            >
              <FaUsers /> Equipos
            </button>
          </div>
        </div>

        {/* CONTENIDO CONDICIONAL */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'individual' ? <IndividualLeaderboard /> : <TeamLeaderboard />}
        </div>

    </div>
  )
}