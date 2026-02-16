import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaChartBar } from 'react-icons/fa'
import KpiGrid from '@/components/admin/stats/KpiGrid'

export const dynamic = 'force-dynamic'

export default async function AdminStatsPage() {
  const supabase = await createClient()

  // --- SEGURIDAD: Comprobar que es admin ---
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (adminProfile?.role !== 'admin') redirect('/')

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
              <FaChartBar className="text-emerald-500" /> Estadísticas
            </h1>
          </div>
        </div>

        {/* 1. COMPONENTE DE KPIs */}
        <KpiGrid />

        {/* PLACEHOLDERS PARA LOS SIGUIENTES PASOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          
          {/* ZONA 2: Crowdfundings */}
          <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center min-h-[250px] text-slate-500">
            <p>Componente: Estado de Crowdfundings</p>
            <span className="text-xs mt-2">(Próximo paso)</span>
          </div>

          {/* ZONA 3: Gráficas Temporales */}
          <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center min-h-[250px] text-slate-500">
            <p>Componente: Gráficas Temporales</p>
            <span className="text-xs mt-2">(Próximo paso)</span>
          </div>

        </div>

      </div>
    </main>
  )
}