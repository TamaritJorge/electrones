"use client"
// Ruta: components/leaderboard/PlayerName.tsx
import { useState } from 'react'

// Nombre truncado que se despliega completo al pasar el ratón (escritorio)
// o al tocarlo (móvil, donde no existe hover)
export default function PlayerName({ name, className = '' }: { name: string, className?: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <span
      title={name}
      onClick={() => setExpanded(e => !e)}
      className={`
        cursor-pointer select-none min-w-0
        ${expanded ? 'whitespace-normal break-words' : 'truncate hover:whitespace-normal hover:break-words'}
        ${className}
      `}
    >
      {name}
    </span>
  )
}
