'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaPowerOff, FaExclamationTriangle, FaBolt, FaTimes, FaBoxOpen } from 'react-icons/fa'
import confetti from 'canvas-confetti'
import ProductArtifact from '@/components/ProductArtifact'

type AnimationStage = 'idle' | 'initializing' | 'charging' | 'critical' | 'reveal';

interface LootboxDischargerProps {
  boxCount: number
  onDischarge: () => void
}

export default function LootboxDischarger({ boxCount, onDischarge }: LootboxDischargerProps) {
  const [stage, setStage] = useState<AnimationStage>('idle')
  // Mantenemos estructura simple: text (principal), subtext (secundario), type (color)
  const [displayResult, setDisplayResult] = useState<{ 
    text: string, 
    subtext: string, 
    type: 'success' | 'legendary' 
  } | null>(null)
  
  const supabase = createClient()

  const triggerMassiveConfetti = (isLegendary: boolean, hasBonus: boolean) => {
      let colors = ['#22c55e', '#4ade80', '#ffffff']; 
      if (isLegendary) colors = ['#FFD700', '#FFA500', '#ffffff', '#8b5cf6'];
      else if (hasBonus) colors = ['#fbbf24', '#d97706', '#ffffff'];

      const commonConfig = { colors, origin: { y: 0.7 }, zIndex: 1500 };
      confetti({ ...commonConfig, particleCount: 150, spread: 30, startVelocity: 60, scalar: 1.2 });
      setTimeout(() => confetti({ ...commonConfig, particleCount: 200, spread: 100, startVelocity: 45 }), 200);
  }

  const handleCloseResult = () => {
    setDisplayResult(null);
    setStage('idle');
    onDischarge(); 
  };

  const handleDischarge = async () => {
    if (stage !== 'idle' || boxCount <= 0) return
    setDisplayResult(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setStage('initializing')
      const apiCallPromise = supabase.rpc('open_lootbox', { p_user_id: user.id })
      await new Promise(resolve => setTimeout(resolve, 1500))

      setStage('charging')
      await new Promise(resolve => setTimeout(resolve, 2500))

      setStage('critical')
      await new Promise(resolve => setTimeout(resolve, 2000))

      const { data, error } = await apiCallPromise
      
      if (error) throw error;

      setStage('reveal')

      if (data.status === 'success') {
          triggerMassiveConfetti(data.is_legendary, data.bonus_box)

          // --- AQUÍ ESTÁ EL CAMBIO SOLICITADO ---
          // Preparamos el subtexto base
          let subTextStr = data.tier_message || ""; 
          
          // Si hay caja extra, lo concatenamos al subtexto
          if (data.bonus_box) {
              subTextStr += " • ¡CAJA EXTRA! ⚡";
          }

          setDisplayResult({
              text: data.item_name,    // Nombre del item
              subtext: subTextStr,     // Mensaje tier + Bonus si lo hay
              type: data.is_legendary ? 'legendary' : 'success'
          });
      } else {
          setDisplayResult({
            text: data.message || "Proceso Finalizado",
            subtext: "",
            type: 'success'
          })
      }

    } catch (err) {
      console.error(err)
      setStage('idle')
    }
  }

  if (boxCount === 0) return null
  const isLoading = stage !== 'idle' && stage !== 'reveal';
  
  // Estilos y lógica visual
  let containerBorder = "border-yellow-500/40";
  let parentScale = "scale-[2.0]"; 
  let transitionDuration = "duration-500";
  let glowEffect = "drop-shadow-[0_0_15px_rgba(139,92,246,0.4)]";
  let shakeClass = ""; 
  let buttonText = "INICIAR DESCARGA";
  let buttonStyles = "bg-gradient-to-b from-yellow-500 to-yellow-600 border-yellow-400 text-slate-900 shadow-[0_4px_0_rgb(161,98,7)] hover:brightness-110 active:shadow-none active:translate-y-[4px]";

  if (stage === 'initializing') {
      containerBorder = "border-yellow-500/60";
      parentScale = "scale-[1.3]"; 
      transitionDuration = "duration-[1500ms]";
      glowEffect = "drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]";
      buttonText = "INICIANDO SISTEMAS...";
      buttonStyles = "bg-slate-800 border-yellow-700 text-yellow-500 cursor-wait";
  } else if (stage === 'charging') {
      containerBorder = "border-orange-500/80 animate-pulse";
      parentScale = "scale-[2.0]"; 
      transitionDuration = "duration-[2500ms]"; 
      glowEffect = "drop-shadow-[0_0_40px_rgba(249,115,22,0.8)]";
      buttonText = "ACUMULANDO ENERGÍA...";
      buttonStyles = "bg-slate-800 border-orange-500 text-orange-400 cursor-wait";
  } else if (stage === 'critical') {
      containerBorder = "border-red-600/90 animate-[pulse_0.1s_ease-in-out_infinite]";
      parentScale = "scale-[2.0]"; 
      transitionDuration = "duration-0"; 
      glowEffect = "drop-shadow-[0_0_80px_rgba(239,68,68,1)]";
      shakeClass = "animate-shake-pure"; 
      buttonText = "¡DESCARGA INMINENTE!";
      buttonStyles = "bg-red-700 border-red-900 text-white animate-bounce cursor-not-allowed font-black";
  }

  const getResultStyles = () => {
      if (!displayResult) return '';
      if (displayResult.type === 'legendary') return 'bg-purple-900/95 border-purple-400 text-purple-100 shadow-purple-500/50';
      return 'bg-green-900/95 border-green-400 text-green-100 shadow-green-500/50';
  }

  return (
    <>
    <style jsx global>{`
      @keyframes shake-pure {
        0% { transform: translate(0, 0) rotate(0deg); }
        10% { transform: translate(-2px, -2px) rotate(-3deg); }
        20% { transform: translate(2px, 2px) rotate(3deg); }
        30% { transform: translate(-3px, 1px) rotate(-2deg); }
        40% { transform: translate(3px, -1px) rotate(2deg); }
        50% { transform: translate(-1px, 3px) rotate(-4deg); }
        60% { transform: translate(1px, -3px) rotate(4deg); }
        70% { transform: translate(-3px, 1px) rotate(-3deg); }
        80% { transform: translate(3px, -1px) rotate(3deg); }
        90% { transform: translate(-1px, 1px) rotate(-2deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
      .animate-shake-pure {
        animation: shake-pure 0.4s infinite linear;
      }
    `}</style>

    <div className={`mb-8 relative overflow-hidden rounded-xl border-2 transition-all duration-700 bg-slate-900/50 p-1 shadow-xl group ${containerBorder}`}>
      <div className={`absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(45deg,#000,#000_10px,#eab308_10px,#eab308_20px)] ${stage === 'critical' ? 'animate-pulse' : ''}`}></div>
      
      <div className="relative z-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center border border-white/5">
        <div className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-500
            ${stage === 'critical' ? 'text-red-500 animate-bounce font-bold' : stage === 'charging' ? 'text-orange-400 animate-pulse' : 'text-yellow-500 animate-pulse'}`}>
           <FaExclamationTriangle />
           {stage === 'critical' ? '¡PELIGRO: RUPTURA INMINENTE!' : `Alta Tensión Detectada (${boxCount})`}
        </div>

        <div className="h-40 w-full flex items-center justify-center mb-4">
            <div className={`relative z-20 pointer-events-none transform transition-all ease-in-out ${parentScale} ${transitionDuration} ${glowEffect}`}>
                <div className={`${shakeClass}`}>
                    <div className={`transition-transform duration-300 ${stage === 'idle' ? 'hover:scale-110' : ''}`}>
                        <ProductArtifact iconName="FaBoxOpen" />
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full max-w-sm relative z-30 min-h-[60px] flex items-end justify-center">
            {displayResult ? (
               <div className={`relative flex flex-col items-center justify-center animate-in zoom-in-[1.1] duration-500 px-6 py-6 w-full rounded-xl border-2 shadow-2xl drop-shadow-lg ${getResultStyles()}`}>
                 <button onClick={handleCloseResult} className="absolute top-2 left-2 text-white/50 hover:text-white hover:bg-white/20 rounded-full p-1 transition-all">
                   <FaTimes className="w-4 h-4" />
                 </button>

                 <span className="text-xl font-black uppercase tracking-wide leading-none mb-2">
                    {displayResult.text}
                 </span>
                 
                 
               </div>
            ) : (
                <button
                onClick={handleDischarge}
                disabled={isLoading}
                className={`w-full relative overflow-hidden group/btn transition-all duration-300 rounded-lg font-bold text-sm tracking-wider uppercase py-3 border ${buttonStyles}`}
                >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                        <div className={`${stage === 'critical' ? 'animate-bounce' : 'animate-spin'}`}>
                            {stage === 'critical' ? <FaBolt className="text-white" /> : <ProductArtifact iconName="FaBoxOpen" className="w-5 h-5" />}
                        </div> 
                        {buttonText}
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
                        <FaPowerOff /> {buttonText}
                    </span>
                )}
                </button>
            )}
        </div>
      </div>
    </div>
    </>
  )
}