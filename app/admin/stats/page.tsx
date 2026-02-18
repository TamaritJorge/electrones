import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaChartBar } from 'react-icons/fa'
import KpiGrid from '@/components/admin/stats/KpiGrid'
import CrowdfundingStats from '@/components/admin/stats/CrowdfundingStats'
import MetricsCharts from '@/components/admin/stats/MetricsCharts'
import EconomyCharts from '@/components/admin/stats/EconomyCharts'

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

        {/* 2. ZONA CROWDFUNDINGS (Ocupa todo el ancho ahora) */}
        <div className="mt-8">
          <CrowdfundingStats />
        </div>

        {/* 3. ZONA GRÁFICAS TEMPORALES (Ocupa todo el ancho) */}
        <div className="mt-8">
          <MetricsCharts />
          <EconomyCharts />
        </div>

      </div>
    </main>
  )
}