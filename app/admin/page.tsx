// Ruta: app/admin/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/admin/AdminDashboard'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createClient()

  // 1. Verificamos quién eres
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 2. Verificamos si eres ADMIN (consultando tu tabla profiles)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // Si no es admin, a la calle (o al home)
  if (profile?.role !== 'admin') {
    redirect('/') 
  }

  // 3. Obtenemos lista de alumnos para mostrarlos en el buscador
  const { data: students } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student') // Filtramos para no ver a otros profes
    .order('full_name')

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Panel de Profesor
          </h1>
        </div>

        {/* Cargamos la parte interactiva */}
        <AdminDashboard initialStudents={students || []} />
      </div>
    </main>
  )
}