// Ruta: app/admin/history/[id]/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import TransactionList from '@/components/dashboard/TransactionList' 
import { FaArrowLeft, FaUserGraduate } from 'react-icons/fa'

export const dynamic = 'force-dynamic'

// 1. CAMBIO AQUÍ: params ahora es una Promesa
interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AdminStudentHistoryPage({ params }: PageProps) {
  // 2. CAMBIO AQUÍ: Desempaquetamos el ID con await
  const { id } = await params

  const supabase = await createClient()

  // --- SEGURIDAD (Igual que antes) ---
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (adminProfile?.role !== 'admin') {
    redirect('/')
  }

  // --- OBTENER DATOS ---

  // 3. Usamos la variable 'id' que acabamos de extraer
  const { data: student } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id) // <--- Usamos 'id'
    .single()

  if (!student) {
    return <div className="text-white p-10">Alumno no encontrado</div>
  }

  // Obtener transacciones del ALUMNO
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', id) // <--- Usamos 'id'
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 pb-24">
      <div className="max-w-2xl mx-auto">
        
        {/* Cabecera */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/admin"
            className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
          >
            <FaArrowLeft />
          </Link>
          
          <div className="flex items-center gap-4">
             {student.avatar_url ? (
                <img src={student.avatar_url} className="w-12 h-12 rounded-full object-cover border border-slate-700" />
             ) : (
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                   <FaUserGraduate className="text-slate-500" />
                </div>
             )}
             <div>
                <h1 className="text-2xl font-bold text-white leading-none">{student.nickname}</h1>
                <p className="text-slate-500 text-sm mt-1">Historial de movimientos</p>
             </div>
          </div>
        </div>

        {/* Lista de Movimientos */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-1">
           <TransactionList transactions={transactions || []} />
        </div>

      </div>
    </main>
  )
}