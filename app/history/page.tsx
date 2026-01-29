// Ruta: app/history/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import TransactionList from '@/components/dashboard/TransactionList'
import { FaArrowLeft } from 'react-icons/fa'

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  const supabase = await createClient()

  // 1. Verificamos usuario
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 2. Obtenemos transacciones (MUCHAS MÁS, ej: 50)
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50) 

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-6 pb-24">
      <div className="max-w-md mx-auto">
        
        {/* Cabecera con botón de volver */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/"
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold text-white">Historial</h1>
        </div>

        {/* Reutilizamos el componente de lista */}
        <div className="bg-slate-900/50 rounded-2xl">
           <TransactionList transactions={transactions || []} />
        </div>

        {/* Mensaje final de lista */}
        <p className="text-center text-slate-600 text-xs mt-8">
          Mostrando los últimos 50 movimientos
        </p>

      </div>
    </main>
  )
}