// Ruta: app/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import BalanceCard from '@/components/dashboard/BalanceCard'
import TransactionList from '@/components/dashboard/TransactionList'

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

  // 3. Obtenemos transacciones
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* BalanceCard ahora recibe también la URL del avatar */}
        <BalanceCard 
          userId={user.id} 
          initialNickname={profile?.nickname} 
          initialFullName={profile?.full_name} 
          initialAvatarUrl={profile?.avatar_url} // <--- NUEVO
          balance={profile?.current_balance ?? 0} 
        />

        <TransactionList 
          transactions={transactions || []} 
        />
        
      </div>
    </main>
  )
}