// Ruta: components/dashboard/BalanceCard.tsx
import { FaBolt } from 'react-icons/fa' 

interface BalanceCardProps {
  fullName: string | null
  balance: number
}

export default function BalanceCard({ fullName, balance }: BalanceCardProps) {
  const displayName = fullName || 'Estudiante'

  return (
    <div className="w-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-xl"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white opacity-10 blur-xl"></div>

      <div className="relative z-10">
        <h2 className="text-lg font-medium opacity-90">Bienvenido, {displayName}</h2>
        
        <div className="mt-6">
          <p className="text-sm text-indigo-200 uppercase tracking-wider font-semibold">Saldo Actual</p>
          <div className="flex items-center gap-3 mt-1">
            <FaBolt className="text-yellow-400 text-4xl animate-pulse" />
            <span className="text-5xl font-bold tracking-tight">{balance}</span>
            <span className="text-xl self-end mb-2 font-medium opacity-80">Electrones</span>
          </div>
        </div>
      </div>
    </div>
  )
}