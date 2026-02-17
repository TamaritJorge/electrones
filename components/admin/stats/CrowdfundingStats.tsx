import { createClient } from '@/utils/supabase/server'
import { formatTeam } from '@/utils/teams'
import { FaGlobe, FaBoxOpen } from 'react-icons/fa'
import CampaignCard from './CampaignCard'

export default async function CrowdfundingStats() {
  const supabase = await createClient()

  // --- 1. OBTENER CAMPAÑAS + APORTACIONES (Sin profiles) ---
  const { data: campaigns, error } = await supabase
    .from('crowdfunding_campaigns')
    .select(`
      *,
      shop_products ( name ),
      crowdfunding_contributions (
        id,
        amount,
        contributed_at,
        user_id
      )
    `)
    .order('created_at', { ascending: false })

  if (error) console.error("Error cargando crowdfundings:", error)

  // --- 2. OBTENER PERFILES DE LOS DONANTES (Join Manual) ---
  // Sacamos una lista única de todos los user_id que han donado
  const allUserIds = campaigns?.flatMap(c => 
    c.crowdfunding_contributions.map((contrib: any) => contrib.user_id)
  ) || []
  const uniqueUserIds = [...new Set(allUserIds)]

  // Buscamos esos usuarios en la tabla profiles y creamos un diccionario
  let profilesMap: Record<string, any> = {}
  if (uniqueUserIds.length > 0) {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, nickname, full_name, avatar_url')
      .in('id', uniqueUserIds)

    profiles?.forEach(p => {
      profilesMap[p.id] = p
    })
  }

  // --- 3. OBTENER EQUIPOS ---
  const { data: teamsData } = await supabase.from('teams').select('*')

  const globalCampaigns = campaigns?.filter(c => !c.team_id) || []
  const teamCampaigns = campaigns?.filter(c => c.team_id) || []

  return (
    <div className="mb-8 flex flex-col gap-8">
      
      {/* --- CROWDFUNDINGS GLOBALES --- */}
      <section>
        <div className="flex items-center gap-2 mb-4 px-1">
          <FaGlobe className="text-blue-400 text-lg" />
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Crowdfundings Globales</h2>
        </div>
        
        {globalCampaigns.length === 0 ? (
          <p className="text-slate-500 text-sm italic px-1">No hay campañas globales activas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {globalCampaigns.map(campaign => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                title={campaign.shop_products?.name || "Campaña Global"} 
                color="#3b82f6" 
                icon={<FaGlobe />}
                profilesMap={profilesMap} // Pasamos el mapa de perfiles
              />
            ))}
          </div>
        )}
      </section>

      {/* --- CROWDFUNDINGS DE EQUIPO --- */}
      <section>
        <div className="flex items-center gap-2 mb-4 px-1">
          <FaBoxOpen className="text-purple-400 text-lg" />
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Crowdfundings de Facción</h2>
        </div>

        {teamCampaigns.length === 0 ? (
          <p className="text-slate-500 text-sm italic px-1">No hay campañas de equipo activas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamCampaigns.map(campaign => {
              const team = teamsData?.find(t => t.id === campaign.team_id)
              const teamStyles = team ? formatTeam(team as any) : null
              const FactionIcon = teamStyles?.Icon || FaBoxOpen
              const teamColor = team?.hex_color || '#cbd5e1'

              return (
                <CampaignCard 
                  key={campaign.id} 
                  campaign={campaign} 
                  title={campaign.shop_products?.name || "Campaña de Equipo"} 
                  color={teamColor}
                  icon={<FactionIcon />}
                  teamName={team?.name}
                  profilesMap={profilesMap} // Pasamos el mapa de perfiles
                />
              )
            })}
          </div>
        )}
      </section>

    </div>
  )
}