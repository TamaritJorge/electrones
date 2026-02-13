// Ruta: components/shop/ProductCard.tsx
import { 
  FaBolt, FaBan, FaUsers, FaBoxOpen, FaCheckCircle, FaGlobe, 
  FaFire, FaShieldAlt, FaStar, FaCrown, FaGhost, FaDragon // Importamos iconos extra para los equipos
} from 'react-icons/fa'
import ProductArtifact from '@/components/ProductArtifact'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_icon: string
  category: string
  stock: number | null
  max_per_user: number | null
  purchase_type: 'individual' | 'team' | 'global'
}

interface Campaign {
  id: string
  product_id: string
  current_amount: number
  target_amount: number
  is_completed: boolean
}

interface ProductCardProps {
  product: Product
  myBalance: number
  ownedAmount: number
  isBuying: boolean
  activeCampaign?: Campaign
  hasClaimed?: boolean
  teamColor?: string 
  teamIcon?: string  
  onBuy: (product: Product) => void
  onStartCampaign: (productId: string) => void
  onContribute: (campaign: Campaign) => void
  onClaim: (campaignId: string) => void
}

export default function ProductCard({
  product,
  myBalance,
  ownedAmount,
  isBuying,
  activeCampaign,
  hasClaimed,
  teamColor,
  teamIcon,
  onBuy,
  onStartCampaign,
  onContribute,
  onClaim
}: ProductCardProps) {
  // Comprobaciones de estado
  const isMaxReached = product.max_per_user !== null && ownedAmount >= product.max_per_user
  const isIndividual = product.purchase_type === 'individual'
  const isTeam = product.purchase_type === 'team'
  const isGlobal = product.purchase_type === 'global'
  const notEnoughMoney = myBalance < product.price

  // Determinar los estilos de fondo dinámicos (tintado según el equipo o si es global)
  const customStyles = isTeam && teamColor 
    ? { backgroundColor: `${teamColor}15`, borderColor: `${teamColor}40` }
    : isGlobal 
      ? { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)' } 
      : {} 

  // NUEVO: Diccionario para traducir el texto de la base de datos a un icono real
  const renderTeamIcon = (iconKey?: string) => {
    if (!iconKey) return null;
    
    switch (iconKey.toLowerCase()) {
      case 'fire': return <FaFire />;
      case 'bolt': return <FaBolt />;
      case 'shield': return <FaShieldAlt />;
      case 'star': return <FaStar />;
      case 'crown': return <FaCrown />;
      case 'ghost': return <FaGhost />;
      case 'dragon': return <FaDragon />;
      // Si el texto no coincide con ninguno de arriba, mostramos una estrella por defecto
      default: return <FaUsers />; 
    }
  }

  return (
    <div 
      className={`rounded-xl p-4 flex gap-4 items-center shadow-sm transition-all
        ${(!isTeam && !isGlobal) ? 'bg-slate-800 border-slate-700' : 'border'}`}
      style={customStyles}
    >
      
      {/* Icono del Producto usando tu componente personalizado */}
      <ProductArtifact iconName={product.image_icon} className="w-16 h-16 shrink-0" />
      
      {/* Detalles del Producto */}
      <div className="flex-1 min-w-0">
        
        {/* FILA SUPERIOR: Título, Icono de Equipo y Etiqueta de Precio */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-bold text-sm sm:text-base leading-tight pr-2 flex items-center gap-2">
            
            {/* AQUI ESTÁ LA MAGIA: Pintamos el icono renderizado con el color del equipo */}
            {isTeam && teamIcon && (
              <span className="text-lg drop-shadow-md" style={{ color: teamColor || 'white' }}>
                {renderTeamIcon(teamIcon)}
              </span>
            )}
            
            {isGlobal && <FaGlobe className="text-blue-400" size={14} />}
            {product.name}
          </h3>
          
          {/* ETIQUETA DE PRECIO */}
          <div className={`flex items-center justify-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono font-bold border whitespace-nowrap shrink-0
            ${notEnoughMoney 
              ? 'bg-red-950/40 border-red-500/30 text-red-400 shadow-inner shadow-red-900/20' 
              : 'bg-slate-950/50 border-slate-700 text-yellow-500 shadow-inner shadow-black/20'}`}
          >
            <FaBolt size={10} className={notEnoughMoney ? 'text-red-400' : 'text-yellow-400'} /> 
            {product.price}
          </div>
        </div>

        {/* Descripción */}
        <p className="text-slate-400 text-xs line-clamp-2 mt-1">{product.description}</p>
        
        {/* Límite (si lo hay) */}
        {product.max_per_user && (
          <div className="mt-1.5 text-[11px] font-mono text-slate-500">
            Límite: <span className={isMaxReached ? 'text-amber-500 font-bold' : ''}>{ownedAmount}/{product.max_per_user}</span>
          </div>
        )}

        {/* ZONA DE BOTONES */}
        <div className="mt-3">
          {isIndividual && (
            <button
              onClick={() => onBuy(product)}
              disabled={notEnoughMoney || isMaxReached || isBuying}
              className={`w-full py-2 rounded-lg font-bold text-xs border transition-all flex justify-center items-center gap-2
                ${isMaxReached 
                  ? 'bg-slate-800/50 text-slate-500 border-slate-700/50 cursor-not-allowed bg-[image:repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.2)_5px,rgba(0,0,0,0.2)_10px)]' 
                  : notEnoughMoney
                    ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-900/20'}`}
            >
              {isMaxReached ? (
                <><FaBan size={11} /> Límite Alcanzado</>
              ) : (
                <><FaBolt size={10} className={notEnoughMoney ? 'text-slate-500' : 'text-yellow-400'} /> Comprar</>
              )}
            </button>
          )}

          {!isIndividual && (
            <>
              {!activeCampaign ? (
                <button 
                  onClick={() => onStartCampaign(product.id)}
                  disabled={isBuying || isMaxReached}
                  className={`w-full py-2 rounded-lg font-bold text-xs border transition-colors flex justify-center items-center gap-2
                    ${isMaxReached 
                      ? 'bg-slate-800/50 text-slate-500 border-slate-700/50 cursor-not-allowed bg-[image:repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.2)_5px,rgba(0,0,0,0.2)_10px)]' 
                      : 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600/40'}`}
                >
                  {isMaxReached ? <><FaBan size={11} /> Límite Alcanzado</> : <><FaUsers size={12} /> Iniciar Colecta</>}
                </button>
              ) : !activeCampaign.is_completed ? (
                <div className="space-y-2">
                  <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-700 overflow-hidden relative shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((activeCampaign.current_amount / activeCampaign.target_amount) * 100, 100)}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-[8px] font-mono font-bold text-white drop-shadow-md">
                      {activeCampaign.current_amount} / {activeCampaign.target_amount}
                    </div>
                  </div>
                  <button 
                    onClick={() => onContribute(activeCampaign)}
                    disabled={myBalance <= 0 || isBuying || isMaxReached}
                    className={`w-full py-2 rounded-lg font-bold text-xs border flex justify-center items-center gap-2 transition-all
                      ${isMaxReached
                        ? 'bg-slate-800/50 text-slate-500 border-slate-700/50 cursor-not-allowed bg-[image:repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.2)_5px,rgba(0,0,0,0.2)_10px)]'
                        : 'bg-gradient-to-b from-amber-500 to-amber-700 border-t border-amber-400/60 text-white shadow-[0_4px_12px_rgba(245,158,11,0.3)] hover:from-amber-400 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed'}`}
                  >
                     {isMaxReached ? <><FaBan size={11} /> Límite Alcanzado</> : <><FaBolt size={10} className="text-amber-100" /> Aportar Electrones</>}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => !hasClaimed && onClaim(activeCampaign.id)}
                  disabled={hasClaimed || isBuying || isMaxReached}
                  className={`w-full py-2 rounded-lg font-bold text-xs border transition-all flex justify-center items-center gap-2
                    ${hasClaimed || isMaxReached
                      ? 'bg-slate-800/50 text-slate-400 border-slate-700/50 cursor-not-allowed bg-[image:repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.2)_5px,rgba(0,0,0,0.2)_10px)]' 
                      : 'bg-gradient-to-b from-purple-500 to-purple-700 border-t border-purple-400/60 text-white shadow-[0_4px_12px_rgba(168,85,247,0.4)] hover:shadow-[0_6px_16px_rgba(168,85,247,0.6)] animate-pulse hover:animate-none'}`}
                >
                  {hasClaimed ? (
                    <><FaCheckCircle size={12} className="text-emerald-500"/> ¡Objeto en tu Mochila!</>
                  ) : isMaxReached ? (
                    <><FaBan size={11} className="text-slate-500"/> Límite Alcanzado</>
                  ) : (
                    <><FaBoxOpen size={12} /> ¡Reclamar Premio!</>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}