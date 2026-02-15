import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaBolt, FaUsers, FaTrophy, FaShoppingCart, FaChartBar, FaMedal } from 'react-icons/fa'

export const dynamic = 'force-dynamic'

export default async function AdminStatsPage() {
  const supabase = await createClient()

  // --- 1. SEGURIDAD: Comprobar que es admin ---
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (adminProfile?.role !== 'admin') redirect('/')

  // --- 2. OBTENER DATOS BÁSICOS (Métricas) ---
  // Alumnos y saldo global
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, nickname, balance, avatar_url')
    .eq('role', 'student')
    .order('balance', { ascending: false })

  const totalStudents = profiles?.length || 0
  const totalElectrons = profiles?.reduce((sum, p) => sum + (p.balance || 0), 0) || 0
  
  // Top 5 alumnos más ricos
  const topStudents = profiles?.slice(0, 5) || []

  // Total de logros desbloqueados globalmente
  const { count: totalAchievements } = await supabase
    .from('user_achievements')
    .select('*', { count: 'exact', head: true })

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 pb-24">
      <div className="max-w-6xl mx-auto">
        
        {/* CABECERA */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/admin"
            className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
          >
            <FaArrowLeft />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <FaChartBar className="text-emerald-500" /> Estadísticas Globales
            </h1>
            <p className="text-slate-500 text-sm mt-1">Métricas y datos de uso de la aplicación</p>
          </div>
        </div>

        {/* TARJETAS DE KPIs (Métricas principales) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* KPI 1: Total Alumnos */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <FaUsers className="text-blue-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-black text-white leading-none">{totalStudents}</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mt-1">Alumnos Totales</div>
            </div>
          </div>

          {/* KPI 2: Electrones en circulación */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
              <FaBolt className="text-yellow-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-black text-white leading-none">{totalElectrons}</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mt-1">⚡ en Circulación</div>
            </div>
          </div>

          {/* KPI 3: Logros Desbloqueados */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <FaTrophy className="text-purple-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-black text-white leading-none">{totalAchievements || 0}</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mt-1">Logros Obtenidos</div>
            </div>
          </div>

          {/* KPI 4: Objetos Comprados (Placeholder) */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <FaShoppingCart className="text-emerald-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-black text-white leading-none">--</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mt-1">Objetos Comprados</div>
            </div>
          </div>

        </div>

        {/* SECCIÓN DE RANKINGS DETALLADOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* TOP ALUMNOS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FaMedal className="text-yellow-500" /> Los más ricos (Top 5)
            </h2>
            <div className="flex flex-col gap-3">
              {topStudents.map((student, index) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500 text-yellow-950' : 
                      index === 1 ? 'bg-slate-300 text-slate-800' : 
                      index === 2 ? 'bg-amber-700 text-amber-100' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-slate-200 font-medium">{student.nickname}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-yellow-400">
                    <FaBolt size={12} /> {student.balance}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ESPACIO PARA OTRA MÉTRICA MAÑANA */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center text-center min-h-[300px]">
            <FaChartBar className="text-slate-700 text-5xl mb-4" />
            <h2 className="text-lg font-bold text-slate-400 mb-2">Más estadísticas próximamente</h2>
            <p className="text-sm text-slate-500 max-w-sm">
              Mañana añadiremos aquí consultas para ver qué logros son los más fáciles/difíciles, o qué objetos de la tienda se venden más.
            </p>
          </div>

        </div>

      </div>
    </main>
  )
}