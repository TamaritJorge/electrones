// Ruta: app/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import BalanceCard from '@/components/dashboard/BalanceCard'
import TransactionList from '@/components/dashboard/TransactionList'
import GroupSelectorModal from '@/components/dashboard/GroupSelectorModal'
import { FaHistory, FaArrowRight } from 'react-icons/fa'
// YA NO IMPORTAMOS formatTeam AQUÍ
// import { formatTeam } from '@/utils/teams' 

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // 1. Perfil
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 2. Equipo (Datos crudos)
  let teamRawData = null
  const teamId = profile?.team_id || profile?.team

  if (teamId) {
    const { data } = await supabase
      .from('teams')
      .select('*')
      .eq('id', teamId)
      .single()
      
    if (data) {
      teamRawData = data // <--- Pasamos el objeto JSON puro
    }
  }

  // 3. Transacciones
  const { data: transactions } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-6 pb-24">
      <GroupSelectorModal 
        userId={user.id} 
        currentGroup={profile?.student_group} 
      />

      <div className="max-w-md mx-auto space-y-6">
        
        {/* Pasamos rawTeamData en lugar de team formateado */}
        <BalanceCard 
          userId={user.id} 
          initialNickname={profile?.nickname} 
          initialFullName={profile?.full_name} 
          initialAvatarUrl={profile?.avatar_url}
          balance={profile?.current_balance ?? 0}
          lifetimeScore={profile?.lifetime_score ?? 0}
          groupName={profile?.student_group}
          rawTeamData={teamRawData} // <--- CAMBIO AQUÍ
        />
        
        <div>
          <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-3 px-1">
            Últimos movimientos
          </h3>
          <TransactionList transactions={transactions || []} />
          <Link 
            href="/history"
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium group"
          >
            <FaHistory className="text-slate-500 group-hover:text-yellow-400 transition-colors" />
            Ver historial completo
            <FaArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Link>
        </div>
      </div>
    </main>
  )
}