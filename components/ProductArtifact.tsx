// Ruta: components/ProductArtifact.tsx
import { 
  FaBolt, 
  FaBoxOpen, 
  FaShieldAlt, 
  FaNetworkWired, 
  FaKey, 
  FaTag 
} from 'react-icons/fa'

interface ProductArtifactProps {
  iconName: string
  className?: string // Permite cambiar tamaño (ej: "w-12 h-12") desde fuera
}

export default function ProductArtifact({ iconName, className = "w-16 h-16" }: ProductArtifactProps) {
  
  // 1. LOOTBOX (Versión Definitiva: Rayo interior y brillos sutiles - Sin el glitch blanco)
  if (iconName === 'FaBoxOpen') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 group ${className}`}>
        {/* FONDO: Aura suave */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 via-fuchsia-500/30 to-yellow-400/20 rounded-2xl blur-lg animate-pulse"></div>
        
        {/* CONTENEDOR PRINCIPAL */}
        <div className="relative bg-slate-900 border border-violet-500/40 w-full h-full rounded-xl flex items-center justify-center overflow-hidden shadow-[inset_0_0_15px_rgba(76,29,149,0.3)] z-10">
           
           {/* NÚCLEO DE LUZ */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-violet-500/30 blur-md rounded-full"></div>

           {/* ICONO CAJA */}
           <FaBoxOpen className="text-violet-200 relative z-10 translate-y-3 drop-shadow-sm w-1/2 h-1/2" />
           
           {/* ICONO RAYO */}
           <FaBolt className="absolute top-2 left-1/2 -translate-x-1/2 text-yellow-300 z-0 drop-shadow-[0_0_8px_rgba(253,224,71,0.5)] scale-100 -rotate-6 animate-pulse w-1/3 h-1/3" />

           {/* CHISPAS */}
           <div className="absolute bottom-2 left-4 w-0.5 h-0.5 bg-yellow-100 rounded-full animate-rise-fade opacity-60"></div>
        </div>
      </div>
    )
  }

 // 2. FUSIBLE (Diseño: Célula de Plasma / Tubo de vacío)
  if (iconName === 'FaShieldAlt') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        
        {/* RESPLANDOR AMBIENTAL: Naranja intenso (alerta/calor) */}
        <div className="absolute inset-0 bg-orange-600/20 blur-xl rounded-full animate-pulse"></div>

        {/* CUERPO DEL FUSIBLE (Estructura Vertical) */}
        <div className="relative w-7 h-14 flex flex-col items-center shadow-2xl drop-shadow-lg">

            {/* 1. CASQUILLO SUPERIOR (Metal) */}
            <div className="w-full h-3 rounded-t-sm bg-gradient-to-b from-slate-300 via-slate-400 to-slate-700 shadow-sm z-20 border-b border-slate-800/50">
              {/* Brillo metálico */}
              <div className="absolute top-1 left-1 w-full h-[1px] bg-white/40"></div>
            </div>

            {/* 2. TUBO DE CRISTAL (Cuerpo transparente) */}
            <div className="relative w-[85%] flex-1 bg-gradient-to-r from-slate-800/30 via-white/5 to-slate-800/30 border-x border-white/10 backdrop-blur-[1px] overflow-hidden flex items-center justify-center z-10">
                
                {/* Reflejos en el cristal (Glass effect) */}
                <div className="absolute top-2 left-0.5 w-[2px] h-3/4 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-2 right-0.5 w-[1px] h-1/2 bg-white/10 rounded-full"></div>

                {/* EL FILAMENTO (El alma del fusible) */}
                {/* Es una línea zigzagueante o recta que brilla al máximo */}
                <div className="relative w-[2px] h-full bg-orange-500/40 flex flex-col items-center justify-center">
                    {/* Núcleo caliente */}
                    <div className="absolute inset-y-1 w-full bg-orange-200 shadow-[0_0_10px_#f97316] animate-pulse"></div>
                    
                    {/* ICONO ESCUDO (Pequeño, grabado en el cristal o flotando dentro) */}
                    {/* Lo mantenemos sutilmente como holograma de seguridad */}
                    <FaShieldAlt className="relative z-30 text-orange-100/40 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)] animate-pulse" size={14} />
                    
                    {/* Partículas de sobrecarga subiendo */}
                    <div className="absolute bottom-0 w-4 h-4 bg-orange-500/20 blur-md animate-rise-fade"></div>
                </div>
            </div>

            {/* 3. CASQUILLO INFERIOR (Metal) */}
            <div className="w-full h-3 rounded-b-sm bg-gradient-to-b from-slate-300 via-slate-400 to-slate-700 shadow-sm z-20 border-t border-slate-800/50">
               {/* Sombra de apoyo */}
               <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-black/50 blur-[1px]"></div>
            </div>
        </div>
      </div>
    )
  }

// 3. FIBRA ÓPTICA (Velocidad - Hyper Beam)
  if (iconName === 'FaNetworkWired') {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-slate-950 border border-cyan-400/30 shrink-0 ${className}`}>
        
        {/* 1. FONDO: Resplandor central profundo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#155e75_0%,_transparent_70%)] opacity-40"></div>
        
        {/* 2. CABLE DE ENERGÍA (Horizontal) */}
        {/* Halo exterior (El brillo grande que respira) */}
        <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-cyan-500 blur-md animate-pulse"></div>
        
        {/* Núcleo de energía (Línea fina y nítida blanca/cian) */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 bg-white shadow-[0_0_10px_#22d3ee] opacity-90"></div>

        {/* 3. LÍNEAS TECH (Arriba y abajo para dar contexto) */}
        <div className="absolute top-3 left-2 right-2 h-[1px] bg-cyan-800/40"></div>
        <div className="absolute bottom-3 left-2 right-2 h-[1px] bg-cyan-800/40"></div>

        {/* 4. ICONO: Grande y Brillante */}
        {/* Usamos w-[55%] para que ocupe más de la mitad de la caja, viéndose grande pero con margen */}
        <FaNetworkWired 
          className="relative z-10 text-cyan-100 drop-shadow-[0_0_8px_rgba(34,211,238,1)]" 
          style={{ width: '55%', height: '55%' }} 
        />
        
        {/* Brillo extra justo detrás del icono para separarlo del fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-400/20 blur-xl rounded-full"></div>
      </div>
    )
  }

// 4. KIT DE PUESTA A TIERRA (Diseño: Clean Tech)
  if (iconName === 'FaKey') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 overflow-hidden rounded-xl bg-slate-950 border border-slate-700 shadow-lg ${className}`}>
        
        {/* FONDO: Limpio con degradado suave hacia abajo (Tierra) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-green-900/20"></div>

        {/* HALO CENTRAL: Un resplandor difuso detrás del símbolo para darle volumen */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-green-500/10 blur-xl rounded-full"></div>

        {/* EL SÍMBOLO DE TIERRA (Geometría pura) */}
        <div className="relative flex flex-col items-center justify-center translate-y-1 gap-[3px]">
            
            {/* 1. La línea vertical (El conductor) */}
            {/* Color amarillo estándar de tierra, parpadea suavemente indicando conexión activa */}
            <div className="relative w-[3px] h-7 bg-yellow-400/90 shadow-[0_0_8px_rgba(250,204,21,0.5)] rounded-t-sm">
                {/* Pequeño brillo blanco en la parte superior del cable */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-white to-transparent opacity-60"></div>
            </div>

            {/* 2. Las 3 placas horizontales (La descarga) */}
            {/* Verde seguridad, con una sombra suave de neón */}
            <div className="w-8 h-[3px] bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <div className="w-5 h-[3px] bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <div className="w-2 h-[3px] bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
        </div>

        {/* DETALLE INFERIOR: Línea fina de "suelo" en la base del contenedor */}
        <div className="absolute bottom-0 w-full h-[1px] bg-green-500/30"></div>
      </div>
    )
  }
  
// 5. PLACA DE CARACTERÍSTICAS (Asset Tag Industrial)
  if (iconName === 'FaTag') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        
        {/* SOMBRA DE CAÍDA: Proyectada en el suelo/fondo para dar profundidad real */}
        <div className="absolute top-4 left-2 w-10 h-10 bg-black/60 blur-sm transform -rotate-6 rounded-md"></div>

        {/* CABLE DE SUJECIÓN: El "precinto" que la sostiene desde arriba */}
        <div className="absolute -top-1 left-1/2 w-[1px] h-6 bg-slate-400/50 -translate-x-3 -rotate-12 z-0"></div>

        {/* LA PLACA (Rotada) */}
        <div className="relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 border-t border-l border-slate-500/50 border-b border-r border-slate-950 w-[75%] h-[90%] rounded-md flex flex-col items-center justify-start transform -rotate-6 shadow-xl z-10 overflow-hidden">
           
           {/* BRILLO METÁLICO SUPERIOR: Reflejo en el borde */}
           <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20"></div>

           {/* AGUJERO CON REMACHE (Grommet) */}
           <div className="mt-2 w-3 h-3 rounded-full bg-slate-900 border-2 border-slate-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"></div>
           
           {/* ICONO GRABADO: Parece hundido en el metal */}
           <div className="mt-1 flex-1 flex items-center justify-center">
             <FaTag className="text-slate-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" size={18} />
           </div>

           {/* ZONA DE DATOS: Líneas que simulan texto o código de barras al pie */}
           <div className="mb-2 w-full px-2 flex flex-col gap-[2px] opacity-40">
              <div className="w-full h-[1px] bg-slate-400"></div>
              <div className="w-2/3 h-[1px] bg-slate-400"></div>
              <div className="w-full h-[2px] bg-slate-900 mt-0.5"></div> {/* Banda negra inferior */}
           </div>
        </div>
      </div>
    )
  }

  // DEFAULT
  return (
    <div className={`bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shrink-0 ${className}`}>
      <FaBolt className="text-slate-500 w-1/2 h-1/2" />
    </div>
  )
}