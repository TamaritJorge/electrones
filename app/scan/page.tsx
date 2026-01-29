// Ruta: app/scan/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Scanner } from '@yudiel/react-qr-scanner'
import { createClient } from '@/utils/supabase/client'
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaSpinner, FaCamera } from 'react-icons/fa'

export default function ScanPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [scanning, setScanning] = useState(true)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [classInfo, setClassInfo] = useState<{ group: string, type: string } | null>(null)

  const handleScan = async (result: string) => {
    if (!result || status === 'loading' || status === 'success') return
    
    setScanning(false)
    setStatus('loading')
    setMessage('Validando asistencia...')

    try {
      // 1. Parsear el QR
      let qrData
      try {
        qrData = JSON.parse(result)
      } catch (e) {
        throw new Error('QR no válido. ¿Es el correcto?')
      }

      if (!qrData.id || !qrData.sc) throw new Error('QR incompleto.')

      // 2. Verificar autenticación (opcional, Supabase ya lo chequea, pero mejor prevenir visualmente)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
         router.push('/login')
         return
      }

      // 3. LLAMADA BLINDADA AL SERVIDOR (RPC) 🛡️
      // No insertamos nada aquí. Le pedimos al servidor que lo haga si todo está OK.
      const { data, error } = await supabase.rpc('register_attendance', {
        p_session_id: qrData.id,
        p_secret_code: qrData.sc
      })

      if (error) throw error

      // 4. Interpretar respuesta del servidor
      // La función devuelve un JSON: { success: boolean, message: string, ... }
      if (!data.success) {
        throw new Error(data.message || 'Error al registrar')
      }

      // ¡ÉXITO!
      setClassInfo({ 
        group: data.group_name, 
        type: data.session_type 
      })
      
      setStatus('success')
      setMessage(data.message) // "Asistencia registrada" o "Ya habías fichado"

      if (navigator.vibrate) navigator.vibrate(200)

    } catch (err: any) {
      console.error(err)
      setStatus('error')
      setMessage(err.message || 'Error de conexión')
      if (navigator.vibrate) navigator.vibrate([100, 50, 100])
    }
  }

  const resetScanner = () => {
    setStatus('idle')
    setScanning(true)
    setMessage('')
  }

  const onScanResult = (results: any[]) => {
    if (results && results.length > 0) handleScan(results[0].rawValue)
  }

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      
      {/* Cabecera */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <Link href="/" className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition">
          <FaArrowLeft />
        </Link>
        <h1 className="text-white font-bold text-lg drop-shadow-md">Escanear Asistencia</h1>
        <div className="w-10"></div>
      </div>

      {/* --- CÁMARA --- */}
      {status === 'idle' || status === 'loading' ? (
        <div className="flex-1 relative bg-black flex flex-col justify-center">
            {scanning && (
                <div className="relative w-full h-full">
                    <Scanner 
                        onScan={onScanResult}
                        onError={(error) => console.log(error)}
                        allowMultiple={true}
                        scanDelay={500}
                        components={{
                            onOff: false,
                            torch: true,
                            zoom: true,
                            finder: false 
                        }}
                        styles={{
                            container: { height: '100%', width: '100%' },
                            video: { objectFit: 'cover', height: '100%' }
                        }}
                    />
                    
                    {/* Marco visual */}
                    <div className="absolute inset-0 border-[40px] border-black/50 z-10 pointer-events-none flex items-center justify-center">
                        <div className="w-64 h-64 border-2 border-white/50 rounded-lg relative animate-pulse">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-yellow-400 -mt-1 -ml-1"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-yellow-400 -mt-1 -mr-1"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-yellow-400 -mb-1 -ml-1"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-yellow-400 -mb-1 -mr-1"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading */}
            {status === 'loading' && (
                <div className="absolute inset-0 z-30 bg-black/80 flex flex-col items-center justify-center text-white">
                    <FaSpinner className="animate-spin text-5xl text-yellow-400 mb-4" />
                    <p className="text-xl font-medium animate-pulse">{message}</p>
                </div>
            )}
            
            <div className="absolute bottom-10 left-0 right-0 text-center z-20 px-6">
                <p className="text-white/80 text-sm bg-black/40 p-2 rounded-lg backdrop-blur-sm inline-block">
                    Apunta al código QR de la clase
                </p>
            </div>
        </div>
      ) : null}

      {/* --- ÉXITO --- */}
      {status === 'success' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-900 animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)] mb-6">
                <FaCheckCircle className="text-5xl text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2 text-center">¡Procesado!</h2>
            <p className="text-green-400 mb-8 font-medium text-center">{message}</p>

            {classInfo && (
                <div className="bg-slate-800 p-6 rounded-2xl w-full max-w-sm border border-slate-700">
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Grupo</p>
                    <p className="text-white text-lg font-bold mb-4">{classInfo.group}</p>
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Clase</p>
                    <p className="text-blue-400 font-bold capitalize">{classInfo.type}</p>
                </div>
            )}

            <Link href="/" className="mt-12 py-3 px-8 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition">
                Volver al Inicio
            </Link>
        </div>
      )}

      {/* --- ERROR --- */}
      {status === 'error' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-900 animate-in shake duration-300">
             <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.4)] mb-6">
                <FaTimesCircle className="text-5xl text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
            <p className="text-red-300 text-center mb-8 max-w-xs">{message}</p>

            <button 
                onClick={resetScanner}
                className="py-4 px-8 bg-white text-black rounded-full font-bold hover:bg-slate-200 transition flex items-center gap-2"
            >
                <FaCamera /> Probar otra vez
            </button>
        </div>
      )}
    </main>
  )
}