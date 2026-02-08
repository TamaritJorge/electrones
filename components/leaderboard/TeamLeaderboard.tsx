import { FaUsers, FaLock } from 'react-icons/fa'

export default function TeamLeaderboard() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center relative overflow-hidden group">
        
        {/* Efecto de fondo */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
          <FaUsers size={40} />
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 relative z-10">
          Competición por Escuadrones
        </h3>
        
        <p className="text-slate-400 max-w-md mx-auto mb-8 relative z-10">
          Pronto podrás unirte a un bando, sumar puntos en conjunto y desbloquear recompensas grupales exclusivas.
        </p>

        <div className="flex items-center gap-2 px-5 py-2 bg-yellow-500/10 text-yellow-500 text-sm font-bold rounded-full border border-yellow-500/20 animate-pulse">
          <FaLock size={12} />
          <span>EN DESARROLLO</span>
        </div>
      </div>
    </div>
  )
}