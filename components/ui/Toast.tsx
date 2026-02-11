// Ruta: components/ui/Toast.tsx
import { useEffect } from 'react'
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
  duration?: number
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const isSuccess = type === 'success'

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`
        flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md
        ${isSuccess 
          ? 'bg-slate-900/90 border-green-500/50 text-green-100 shadow-[0_0_20px_rgba(34,197,94,0.2)]' 
          : 'bg-slate-900/90 border-red-500/50 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
        }
      `}>
        {/* Icono */}
        <div className={`text-xl ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
          {isSuccess ? <FaCheckCircle /> : <FaExclamationCircle />}
        </div>

        {/* Mensaje */}
        <div className="flex flex-col">
          <span className={`text-xs font-bold uppercase tracking-wider ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {isSuccess ? '¡Éxito!' : 'Error'}
          </span>
          <span className="font-medium text-sm">
            {message}
          </span>
        </div>

        {/* Botón cerrar manual */}
        <button 
          onClick={onClose} 
          className="ml-4 p-1 hover:bg-white/10 rounded-full transition-colors opacity-70 hover:opacity-100"
        >
          <FaTimes size={12} />
        </button>
      </div>
    </div>
  )
}