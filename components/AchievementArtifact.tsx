import React from 'react'
import { 
  FaStar, 
  FaBolt, 
  FaGlobe, 
  FaUsers, 
  FaBoxOpen, 
  FaPlug, 
  FaSkull, 
  FaInfinity, 
  FaMoon, 
  FaHandshake,
  FaTrophy,
  FaCoins,
  FaCheckCircle,
  FaWifi // <-- Añadido el icono de Wifi para la interferencia
} from 'react-icons/fa'

interface AchievementArtifactProps {
  iconName: string
  className?: string
}

const BadgeBase = ({ 
  children, colorClass, glowClass, className 
}: { 
  children: React.ReactNode, colorClass: string, glowClass: string, className: string 
}) => (
  <div className={`relative flex items-center justify-center shrink-0 rounded-full border-2 ${colorClass} ${className} overflow-hidden shadow-lg group`}>
    <div className={`absolute inset-0 opacity-20 ${glowClass} blur-md`}></div>
    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent z-0"></div>
    <div className="relative z-10 flex items-center justify-center w-full h-full">
      {children}
    </div>
  </div>
)

export default function AchievementArtifact({ iconName, className = "w-16 h-16" }: AchievementArtifactProps) {
  
  switch (iconName) {
    // --- ASISTENCIA A CLASES ---
    case 'achv_class_1':
      return (
        <BadgeBase colorClass="border-amber-700 bg-amber-900/50" glowClass="bg-amber-600" className={className}>
          <FaBolt className="text-amber-600 drop-shadow-[0_0_5px_rgba(180,83,9,0.8)] w-1/2 h-1/2" />
        </BadgeBase>
      )
    case 'achv_class_5':
      return (
        <BadgeBase colorClass="border-slate-300 bg-slate-700/60" glowClass="bg-slate-300" className={className}>
          <FaBolt className="text-slate-200 drop-shadow-[0_0_8px_rgba(226,232,240,0.8)] w-1/2 h-1/2" />
        </BadgeBase>
      )
    case 'achv_class_10':
      return (
        <BadgeBase colorClass="border-yellow-400 bg-yellow-900/40" glowClass="bg-yellow-400" className={className}>
          <FaBolt className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,1)] w-1/2 h-1/2 animate-pulse" />
        </BadgeBase>
      )
    case 'achv_class_20':
      return (
        <BadgeBase colorClass="border-cyan-300 bg-cyan-900/50" glowClass="bg-cyan-400" className={className}>
          <FaBolt className="absolute text-cyan-100 blur-sm w-3/4 h-3/4 animate-pulse" />
          <FaBolt className="text-cyan-300 drop-shadow-[0_0_15px_rgba(103,232,249,1)] w-1/2 h-1/2 z-10" />
        </BadgeBase>
      )

    // --- CROWDFUNDING EQUIPO ---
    case 'achv_crowd_team_contribute':
      return (
        <BadgeBase colorClass="border-emerald-500 bg-emerald-950" glowClass="bg-emerald-500" className={className}>
          <FaCoins className="text-emerald-400 w-1/2 h-1/2 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        </BadgeBase>
      )
    case 'achv_crowd_team_finish':
      return (
        <BadgeBase colorClass="border-emerald-400 bg-emerald-900" glowClass="bg-emerald-300" className={className}>
          <FaCheckCircle className="text-emerald-300 w-1/2 h-1/2 drop-shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
        </BadgeBase>
      )

    // --- CROWDFUNDING GLOBAL ---
    case 'achv_crowd_global_contribute':
      return (
        <BadgeBase colorClass="border-blue-500 bg-blue-950" glowClass="bg-blue-500" className={className}>
          <FaGlobe className="text-blue-400 w-1/2 h-1/2 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        </BadgeBase>
      )
    case 'achv_crowd_global_finish':
      return (
        <BadgeBase colorClass="border-blue-400 bg-blue-900" glowClass="bg-blue-300" className={className}>
          <FaStar className="text-blue-200 w-1/2 h-1/2 drop-shadow-[0_0_12px_rgba(147,197,253,1)] animate-pulse" />
        </BadgeBase>
      )

    // --- EQUIPO Y SISTEMA ---
    case 'achv_team_join':
      return (
        <BadgeBase colorClass="border-pink-500 bg-pink-950" glowClass="bg-pink-500" className={className}>
          <FaHandshake className="text-pink-400 w-1/2 h-1/2 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
        </BadgeBase>
      )
    case 'achv_first_box':
      return (
        <BadgeBase colorClass="border-violet-500 bg-violet-950" glowClass="bg-violet-500" className={className}>
          <FaBoxOpen className="text-violet-400 w-1/2 h-1/2 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
        </BadgeBase>
      )
    case 'achv_first_ground':
      return (
        <BadgeBase colorClass="border-green-500 bg-green-950" glowClass="bg-green-500" className={className}>
          <FaPlug className="text-green-400 w-1/2 h-1/2 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
        </BadgeBase>
      )
    case 'achv_logins_100':
      return (
        <BadgeBase colorClass="border-indigo-500 bg-indigo-950" glowClass="bg-indigo-500" className={className}>
          <FaInfinity className="text-indigo-400 w-1/2 h-1/2 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
        </BadgeBase>
      )
    case 'achv_night_owl':
      return (
        <BadgeBase colorClass="border-slate-300 bg-slate-900" glowClass="bg-slate-100" className={className}>
          <FaMoon className="text-slate-200 w-1/2 h-1/2 drop-shadow-[0_0_8px_rgba(241,245,249,0.8)]" />
        </BadgeBase>
      )
    case 'achv_hacker_fail':
      return (
        <BadgeBase colorClass="border-red-600 bg-red-950" glowClass="bg-red-600" className={className}>
          <FaSkull className="text-red-500 w-1/2 h-1/2 drop-shadow-[0_0_10px_rgba(239,68,68,1)] animate-bounce" />
        </BadgeBase>
      )
      
    // 👇 --- NUEVO LOGRO: INTERFERENCIA --- 👇
    case 'achv_interference':
      return (
        <BadgeBase colorClass="border-fuchsia-600 bg-fuchsia-950/80" glowClass="bg-fuchsia-600" className={className}>
          <FaWifi className="text-fuchsia-400 w-1/2 h-1/2 drop-shadow-[0_0_10px_rgba(217,70,239,0.9)] animate-pulse" />
        </BadgeBase>
      )

    default:
      return (
        <BadgeBase colorClass="border-slate-600 bg-slate-800" glowClass="bg-slate-500" className={className}>
          <FaTrophy className="text-slate-400 w-1/2 h-1/2" />
        </BadgeBase>
      )
  }
}