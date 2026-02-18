import { createClient } from '@/utils/supabase/server'
import { FaUsers, FaBolt, FaTrophy, FaShoppingCart, FaGraduationCap, FaBoxOpen, FaPlug } from 'react-icons/fa'
import { formatTeam } from '@/utils/teams'

// --- FUNCIÓN AUXILIAR PARA LIMPIAR EL NOMBRE DEL GRADO ---
function formatGradeName(grade: string) {
  let cleaned = grade.replace(/grado en ingenier[ií]a/i, '').trim()
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
  }
  return cleaned || grade 
}

export default async function KpiGrid() {
  const supabase = await createClient()

  // --- 1. OBTENER PERFILES DE ESTUDIANTES ---
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, current_balance, team, student_group') 
    .eq('role', 'student')

  if (error) console.error("Error cargando perfiles:", error)

  const totalStudents = profiles?.length || 0
  const totalElectrons = profiles?.reduce((sum, p) => sum + (p.current_balance || 0), 0) || 0

  // Agrupar contadores por el campo "team"
  const teamCounts = profiles?.reduce((acc: Record<string, number>, p) => {
    const teamKey = p.team ? String(p.team) : null; 
    if (teamKey) {
      acc[teamKey] = (acc[teamKey] || 0) + 1
    }
    return acc
  }, {}) || {}

  // Agrupar contadores por el campo "student_group"
  const gradeCounts = profiles?.reduce((acc: Record<string, number>, p) => {
    if (p.student_group) {
      acc[p.student_group] = (acc[p.student_group] || 0) + 1
    }
    return acc
  }, {}) || {}

  // --- 2. OBTENER INFORMACIÓN DE LA TABLA EQUIPOS ---
  const { data: teamsData } = await supabase
    .from('teams')
    .select('*')

  // --- 3. LOGROS OBTENIDOS ---
  const { count: totalAchievements } = await supabase
    .from('user_achievements')
    .select('*', { count: 'exact', head: true })

  // --- 4. COMPRAS TOTALES ---
  const { count: totalPurchases } = await supabase
    .from('transactions')
    .select('id, profiles!inner(role)', { count: 'exact', head: true })
    .ilike('concept', 'Compra:%')
    .eq('profiles.role', 'student')

  // --- 5. CAJAS ABIERTAS (Filtrando por categoría 'lootbox' y SOLO alumnos) ---
  const { count: totalLootboxes } = await supabase
    .from('user_inventory')
    .select('id, shop_products!inner(category), profiles!inner(role)', { count: 'exact', head: true })
    .eq('is_consumed', true)
    .eq('shop_products.category', 'lootbox')
    .eq('profiles.role', 'student')

  // --- 6. PUESTAS A TIERRA USADAS (Filtrando por categoría 'key' y SOLO alumnos) ---
  const { count: totalGroundings } = await supabase
    .from('user_inventory')
    .select('id, shop_products!inner(category), profiles!inner(role)', { count: 'exact', head: true })
    .eq('is_consumed', true)
    .eq('shop_products.category', 'key')
    .eq('profiles.role', 'student')

  return (
    <div className="mb-8 flex flex-col gap-8">
      
      {/* --- BLOQUE 1: GENERALES --- */}
      <section>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Métricas Generales</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <KpiCard icon={<FaUsers className="text-blue-400" />} value={totalStudents} label="Alumnos" />
          <KpiCard icon={<FaBolt className="text-yellow-400" />} value={totalElectrons} label="En circulación" />
          <KpiCard icon={<FaTrophy className="text-purple-400" />} value={totalAchievements || 0} label="Logros" />
          <KpiCard icon={<FaShoppingCart className="text-emerald-400" />} value={totalPurchases || 0} label="Compras" />
          <KpiCard icon={<FaBoxOpen className="text-orange-400" />} value={totalLootboxes || 0} label="Cajas Abiertas" />
          <KpiCard icon={<FaPlug className="text-teal-400" />} value={totalGroundings || 0} label="Puestas a Tierra" />
        </div>
      </section>

      {/* --- BLOQUE 2: EQUIPOS --- */}
      <section>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Equipos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {teamsData?.map(team => {
            const count = teamCounts[String(team.id)] || 0;
            const teamStyles = formatTeam(team as any); 
            const FactionIcon = teamStyles.Icon;

            return (
              <KpiCard 
                key={`team-${team.id}`} 
                icon={<FactionIcon style={{ color: team.hex_color || '#cbd5e1' }} />} 
                value={count} 
                label={team.name} 
              />
            )
          })}
        </div>
      </section>

      {/* --- BLOQUE 3: GRADOS --- */}
      <section>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Grados</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Object.entries(gradeCounts).map(([grade, count]) => (
            <KpiCard 
              key={`grade-${grade}`} 
              icon={<FaGraduationCap className="text-indigo-400" />} 
              value={count} 
              label={formatGradeName(grade)} 
            />
          ))}
        </div>
      </section>

    </div>
  )
}

// Subcomponente de la tarjeta
function KpiCard({ icon, value, label }: { icon: React.ReactNode, value: number, label: string }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 transition-colors">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{icon}</span>
        <span className="text-xl font-bold text-white leading-none">{value}</span>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold truncate w-full" title={label}>
        {label}
      </span>
    </div>
  )
}