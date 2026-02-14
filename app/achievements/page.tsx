'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaTrophy, FaBolt, FaBoxOpen, FaSearch, FaCompass, FaStar, FaUserFriends, FaChevronDown, FaChevronUp, FaLock } from 'react-icons/fa'
import AchievementArtifact from '@/components/AchievementArtifact'

interface ShopProduct {
  name: string
}

type AchievementCategory = 'constancia' | 'cooperacion' | 'exploracion' | 'especial';

type Achievement = {
  id: string
  name: string
  description: string
  icon_name: string
  reward_electrons: number
  reward_product_id: string | null
  category: AchievementCategory
  shop_products?: ShopProduct | null 
}

type MergedAchievement = Achievement & {
  isUnlocked: boolean
  unlockedAt?: string
}

const CATEGORY_CONFIG = {
  constancia: { label: 'Constancia', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: <FaBolt /> },
  cooperacion: { label: 'Cooperación', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: <FaUserFriends /> },
  exploracion: { label: 'Exploración', color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: <FaCompass /> },
  especial: { label: 'Bonus', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: <FaStar /> }
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<MergedAchievement[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({
    constancia: true,
    cooperacion: true,
    exploracion: true,
    especial: true
  })
  
  const supabase = createClient()

  useEffect(() => {
    async function fetchAchievements() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: allAchievements } = await supabase
        .from('achievements')
        .select(`*, shop_products!reward_product_id ( name )`)
        .order('reward_electrons', { ascending: true })

      const { data: userAchievements } = await supabase
        .from('user_achievements')
        .select('achievement_id, unlocked_at')
        .eq('user_id', user.id)

      if (allAchievements) {
        const unlockedIds = new Set(userAchievements?.map(ua => ua.achievement_id))
        const merged = allAchievements.map(achv => ({
          ...achv,
          isUnlocked: unlockedIds.has(achv.id),
          unlockedAt: userAchievements?.find(ua => ua.achievement_id === achv.id)?.unlocked_at
        }))
        setAchievements(merged)
      }
      setLoading(false)
    }
    fetchAchievements()
  }, [])

  const toggleCat = (cat: string, hasUnlocked: boolean) => {
    if (!hasUnlocked) return; // No expandir si está vacía
    setExpandedCats(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <FaBolt className="animate-spin text-yellow-400 text-4xl" />
    </div>
  )

  const orderedCategories: AchievementCategory[] = ['constancia', 'cooperacion', 'exploracion', 'especial'];
  const totalUnlocked = achievements.filter(a => a.isUnlocked).length;
  const totalAvailable = achievements.length;
  const progressPercentage = totalAvailable === 0 ? 0 : Math.round((totalUnlocked / totalAvailable) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* CABECERA CON PROGRESO TOTAL */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 mb-2 flex items-center gap-3 justify-center md:justify-start">
              <FaTrophy className="text-yellow-500" /> 
              Sala de Trofeos
            </h1>
            <p className="text-slate-400 italic">Convierte tu curiosidad en electrones y tu esfuerzo en victorias.</p>
          </div>
          
          <div className="w-full md:w-64 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-sm mb-2 font-bold font-mono">
              <span className="text-slate-300 uppercase tracking-tighter">Progreso Global</span>
              <span className="text-yellow-400">{totalUnlocked} / {totalAvailable}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-amber-500 h-3 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(234,179,8,0.3)]" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* SECCIONES DE CATEGORÍAS */}
        {orderedCategories.map((catKey) => {
          const allInCat = achievements.filter(a => a.category === catKey);
          const unlockedInCat = allInCat.filter(a => a.isUnlocked);
          const hasUnlocked = unlockedInCat.length > 0;
          
          if (allInCat.length === 0) return null;

          return (
            <div key={catKey} className={`mb-6 overflow-hidden rounded-2xl border transition-all ${
              hasUnlocked ? 'border-slate-800 bg-slate-900/50' : 'border-slate-900 bg-slate-950/40 opacity-60'
            }`}>
              {/* HEADER DE SECCIÓN */}
              <button 
                onClick={() => toggleCat(catKey, hasUnlocked)}
                disabled={!hasUnlocked}
                className={`w-full flex items-center gap-4 p-5 transition-colors ${hasUnlocked ? 'hover:bg-slate-800/50 cursor-pointer' : 'cursor-not-allowed'}`}
              >
                <div className={`p-2 rounded-lg ${hasUnlocked ? CATEGORY_CONFIG[catKey].bg + ' ' + CATEGORY_CONFIG[catKey].color : 'bg-slate-900 text-slate-600'}`}>
                  {hasUnlocked ? CATEGORY_CONFIG[catKey].icon : <FaLock />}
                </div>
                <div className="flex flex-col items-start">
                  <span className={`font-bold text-lg ${hasUnlocked ? CATEGORY_CONFIG[catKey].color : 'text-slate-500'}`}>
                    {CATEGORY_CONFIG[catKey].label}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {unlockedInCat.length} / {allInCat.length} COMPLETADOS
                  </span>
                </div>
                
                {/* BARRA DE PROGRESO DE CATEGORÍA */}
                <div className="hidden sm:block flex-grow max-w-[200px] h-1 bg-slate-800/50 rounded-full mx-6">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${hasUnlocked ? CATEGORY_CONFIG[catKey].color.replace('text', 'bg') : 'bg-slate-700'}`}
                    style={{ width: `${(unlockedInCat.length / allInCat.length) * 100}%` }}
                  />
                </div>

                <div className="ml-auto text-slate-600">
                  {hasUnlocked ? (expandedCats[catKey] ? <FaChevronUp /> : <FaChevronDown />) : null}
                </div>
              </button>

              {/* LOGROS (Solo si hay desbloqueados y está expandido) */}
              {hasUnlocked && expandedCats[catKey] && (
                <div className="p-6 bg-slate-950/40 border-t border-slate-800/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {unlockedInCat.map((achv) => (
                      <div 
                        key={achv.id} 
                        className="p-5 rounded-xl border border-slate-700 bg-slate-800/30 flex flex-col items-center text-center shadow-lg group hover:border-yellow-500/30 transition-all"
                      >
                        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                          <AchievementArtifact iconName={achv.icon_name} className="w-16 h-16" />
                        </div>
                        <h3 className="font-bold text-slate-100 text-sm mb-2 uppercase tracking-tight">
                          {achv.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {achv.description}
                        </p>
                        
                        <div className="flex gap-2 mt-4">
                          {achv.reward_electrons > 0 && (
                            <div className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-1 rounded border border-blue-500/20 font-bold flex items-center gap-1">
                              <FaBolt size={8} /> {achv.reward_electrons}
                            </div>
                          )}
                          {achv.reward_product_id && (
                            <div className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-1 rounded border border-purple-500/20 font-bold flex items-center gap-1">
                              <FaBoxOpen size={8} /> {achv.shop_products?.name || 'Item'}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}