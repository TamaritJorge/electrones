// Ruta: app/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link' // <--- IMPORTANTE
import BalanceCard from '@/components/dashboard/BalanceCard'
import TransactionList from '@/components/dashboard/TransactionList'
import { FaHistory, FaArrowRight } from 'react-icons/fa' // Iconos opcionales

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. Verificamos usuario
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 2. Obtenemos perfil
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 3. Obtenemos transacciones (SOLO LAS 5 ÚLTIMAS)
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5) // <--- CAMBIADO A 5

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Tarjeta de Saldo */}
        <BalanceCard 
          userId={user.id} 
          initialNickname={profile?.nickname} 
          initialFullName={profile?.full_name} 
          initialAvatarUrl={profile?.avatar_url}
          balance={profile?.current_balance ?? 0} 
          lifetimeScore={profile?.lifetime_score ?? 0}
        />

        <div>
          
          <TransactionList 
            transactions={transactions || []} 
          />

          {/* BOTÓN "VER MÁS" */}
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