// Ruta: app/admin/layout.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // 1. Verificamos quién eres
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 2. Verificamos si eres ADMIN
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // 3. ¡LA TRAMPA!
  if (profile?.role !== 'admin') {
    // Llamamos a la función de base de datos que tiene permisos para escribir
    const { error } = await supabase.rpc('check_hack_achievement', { 
      target_user_id: user.id 
    })

    if (error) console.error("Error al ejecutar check_hack_achievement:", error.message)

    // Lo sacamos de aquí inmediatamente
    redirect('/')
  }

  // 4. Si es admin, todo normal
  return <>{children}</>
}