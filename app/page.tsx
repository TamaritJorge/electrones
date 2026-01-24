// Ruta: app/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import BalanceCard from '@/components/dashboard/BalanceCard'
import TransactionList from '@/components/dashboard/TransactionList'

// 👇 ESTO ES CLAVE: Obliga a Next.js a no guardar caché y leer siempre el dato real
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. Verificamos usuario
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 2. Obtenemos perfil
  // Al hacer select('*'), nos traemos todas las columnas, incluida 'current_balance'
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
    <main className="min-h-screen bg-slate-900 px-4 py-8">
      <div className="max-w-md mx-auto">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-white">Mi Dashboard</h1>
        </div>

        {/* AQUÍ ESTÁ EL CAMBIO:
           Le pasamos a la tarjeta el valor de 'current_balance'.
           Si es null o no existe, le pasamos un 0.
        */}
        <BalanceCard 
          fullName={profile?.full_name} 
          balance={profile?.current_balance ?? 0} 
        />

        <TransactionList 
          transactions={transactions || []} 
        />
        
      </div>
    </main>
  )
}