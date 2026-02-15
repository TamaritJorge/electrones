import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaUserGraduate, FaBolt, FaBoxOpen, FaLock, FaCheckCircle, FaUsers, FaCompass, FaFire, FaStar } from 'react-icons/fa'
import AchievementArtifact from '@/components/AchievementArtifact'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

// Mapeo exacto de las categorías de tu página general de logros
const CATEGORY_CONFIG: Record<string, { label: string, color: string, bg: string, border: string, icon: React.ReactNode }> = {
  constancia: { label: 'Constancia', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: <FaFire /> },
  cooperacion: { label: 'Cooperación', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: <FaUsers /> },
  exploracion: { label: 'Exploración', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: <FaCompass /> },
  especial: { label: 'Bonus', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: <FaStar /> }
};

export default async function AdminStudentAchievementsPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // --- SEGURIDAD ---
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (adminProfile?.role !== 'admin') redirect('/')

  // --- OBTENER DATOS ---
  
  // 1. Datos del alumno
  const { data: student } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (!student) {
    return <div className="text-white p-10">Alumno no encontrado</div>
  }

  // 2. Obtener TODOS los logros disponibles + Info de la tienda
  const { data: allAchievements } = await supabase
    .from('achievements')
    // Hacemos el join con shop_products igual que en tu página principal
    .select(`*, shop_products!reward_product_id ( name )`)
    .order('category')
    .order('reward_electrons', { ascending: true })

  // 3. Obtener los logros que HA DESBLOQUEADO este alumno
  const { data: unlockedAchievements } = await supabase
    .from('user_achievements')
    .select('achievement_id, unlocked_at')
    .eq('user_id', id)

  // Mapa rápido
  const unlockedMap = new Map()
  unlockedAchievements?.forEach((ua) => {
    unlockedMap.set(ua.achievement_id, ua.unlocked_at)
  })

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 pb-24">
      <div className="max-w-5xl mx-auto">
        
        {/* CABECERA */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin"
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
            >
              <FaArrowLeft />
            </Link>
            
            <div className="flex items-center gap-4">
               {student.avatar_url ? (
                  <img src={student.avatar_url} className="w-12 h-12 rounded-full object-cover border border-slate-700" alt="Avatar" />
               ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                     <FaUserGraduate className="text-slate-500" />
                  </div>
               )}
               <div>
                  <h1 className="text-2xl font-bold text-white leading-none">{student.nickname}</h1>
                  <p className="text-slate-500 text-sm mt-1">Sala de Trofeos del Alumno</p>
               </div>
            </div>
          </div>

          {/* CONTADOR EN ESCRITORIO */}
          <div className="hidden sm:block text-right">
            <div className="text-3xl font-black text-yellow-400">
              {unlockedAchievements?.length || 0} <span className="text-lg text-slate-500 font-normal">/ {allAchievements?.length || 0}</span>
            </div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Completados</p>
          </div>
        </div>

        {/* CONTADOR EN MÓVIL */}
        <div className="sm:hidden flex items-end justify-between mb-6 border-b border-slate-800 pb-4">
           <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Progreso global</p>
           <div className="text-2xl font-black text-yellow-400">
              {unlockedAchievements?.length || 0} <span className="text-sm text-slate-500 font-normal">/ {allAchievements?.length || 0}</span>
           </div>
        </div>

        {/* CUADRÍCULA DE LOGROS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allAchievements?.map((achievement) => {
            const isUnlocked = unlockedMap.has(achievement.id)
            const unlockedDate = isUnlocked ? new Date(unlockedMap.get(achievement.id)).toLocaleDateString('es-ES') : null
            
            // Fallback por si la categoría en BBDD no coincide exactamente
            const catConfig = CATEGORY_CONFIG[achievement.category] || CATEGORY_CONFIG.especial

            return (
              <div 
                key={achievement.id} 
                className={`relative flex flex-col p-5 rounded-xl border transition-all duration-300 ${
                  isUnlocked 
                    ? `bg-slate-800/40 border-slate-600 shadow-lg hover:border-slate-500` 
                    : 'bg-slate-900/30 border-slate-800 opacity-50 grayscale hover:grayscale-0 hover:opacity-100'
                }`}
              >
                {/* Categoría y Status (Top) */}
                <div className="flex justify-between items-center w-full mb-4">
                  <div className={`flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded ${isUnlocked ? `${catConfig.bg} ${catConfig.color} ${catConfig.border} border` : 'text-slate-500 bg-slate-800'}`}>
                    {catConfig.icon}
                    {catConfig.label}
                  </div>
                  {isUnlocked ? (
                    <FaCheckCircle className="text-green-500" title={`Desbloqueado el ${unlockedDate}`} />
                  ) : (
                    <FaLock className="text-slate-600" />
                  )}
                </div>

                {/* Icono Central (Usando AchievementArtifact) */}
                <div className="flex justify-center mb-4">
                   <div className={`transition-transform duration-300 ${isUnlocked ? 'scale-100' : 'scale-90 opacity-70'}`}>
                      <AchievementArtifact iconName={achievement.icon_name} className="w-16 h-16" />
                   </div>
                </div>

                {/* Textos */}
                <div className="text-center flex-grow mb-4">
                  <h3 className={`font-bold text-sm uppercase tracking-tight mb-1 ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                    {achievement.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

                {/* Recompensas (Bottom) */}
                <div className="flex gap-2 flex-wrap justify-center w-full mt-auto">
                  {/* Etiqueta de Electrones */}
                  {achievement.reward_electrons > 0 && (
                    <div className={`text-[10px] px-2 py-1 rounded border font-bold flex items-center gap-1 ${isUnlocked ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                      <FaBolt size={8} /> {achievement.reward_electrons}
                    </div>
                  )}
                  
                  {/* Etiqueta de Objeto de Tienda */}
                  {achievement.reward_product_id && (
                    <div className={`text-[10px] px-2 py-1 rounded border font-bold flex items-center gap-1 ${isUnlocked ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                      <FaBoxOpen size={8} /> {achievement.shop_products?.name || 'Objeto misterioso'}
                    </div>
                  )}
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </main>
  )
}