//ruta: components/admin/StudentCard.tsx
'use client'

import { FaUserGraduate } from 'react-icons/fa'
import { formatTeam } from '@/utils/teams'

interface StudentCardProps {
  student: any;
  onClick: () => void;
}

export default function StudentCard({ student, onClick }: StudentCardProps) {
  const rawTeam = Array.isArray(student.teams) ? student.teams[0] : student.teams
  const teamDisplay = formatTeam(rawTeam) 
  const TeamIcon = teamDisplay.Icon

  return (
    <div 
      onClick={onClick}
      className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between hover:border-yellow-400/50 cursor-pointer transition-all active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        {student.avatar_url ? (
          <img 
            src={student.avatar_url} 
            className="w-12 h-12 rounded-full object-cover bg-slate-800 border-2" 
            style={{ borderColor: teamDisplay.styles.border.borderColor }}
            alt={student.nickname}
          />
        ) : (
          <div 
            className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 border-2"
            style={{ borderColor: teamDisplay.styles.border.borderColor }}
          >
            <FaUserGraduate size={20} style={{ color: teamDisplay.styles.text.color }} />
          </div>
        )}
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-lg leading-tight">
                {student.nickname || 'Sin Apodo'}
            </span>
            {teamDisplay.id !== 'unknown' && (
                <div 
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 border border-slate-700"
                    title={`Facción: ${teamDisplay.name}`}
                >
                    <TeamIcon 
                        className="text-[10px]" 
                        style={{ color: teamDisplay.styles.text.color }} 
                    />
                </div>
            )}
          </div>
          
          <span className="text-xs text-slate-400">{student.full_name}</span>
        </div>
      </div>

      <div className="text-right bg-black/20 px-3 py-1 rounded-lg">
        <span className="text-yellow-400 font-mono font-bold text-xl">{student.current_balance}</span>
        <span className="text-yellow-400/50 text-xs ml-1">⚡</span>
      </div>
    </div>
  )
}