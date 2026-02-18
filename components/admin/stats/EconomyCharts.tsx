"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, 
  LineChart, Line, ScatterChart, Scatter, ZAxis
} from 'recharts'
import { FaCalendarAlt, FaCoins, FaTrophy, FaUsers,FaChartLine } from 'react-icons/fa'

type TimeRange = 'week' | 'month' | 'year'

// Tooltip Personalizado para la gráfica de Correlación
// Tooltip Personalizado para la gráfica de Correlación
const ScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
        <p className="font-bold text-white mb-1 border-b border-slate-700 pb-1">{data.name}</p>
        <p className="text-slate-300 text-xs mb-2 italic">{data.student_group}</p>
        <p className="text-eab308 text-sm font-semibold text-yellow-400">
          Electrones: {data.current_balance}
        </p>
        <p className="text-blue-400 text-sm font-semibold">
          Asistencias: {data.attendance_count}
        </p>
      </div>
    );
  }
  return null;
};

export default function GamificationCharts() {
  const [timeRange, setTimeRange] = useState<TimeRange>('month')
  const [isMounted, setIsMounted] = useState(false)
  
  // Estados de datos
  const [topRichData, setTopRichData] = useState<any[]>([])
  const [economyChartData, setEconomyChartData] = useState<any[]>([])
  const [correlationData, setCorrelationData] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      
      const now = new Date()
      const startDate = new Date()
      
      if (timeRange === 'week') startDate.setDate(now.getDate() - 7)
      if (timeRange === 'month') startDate.setDate(now.getDate() - 30)
      if (timeRange === 'year') startDate.setFullYear(now.getFullYear() - 1)

      // 1. PROFILES: Top 5 Ricos + Correlación Asistencia/Economía
      const { data: profiles } = await supabase
        .from('profiles')
        .select('nickname, full_name, current_balance, attendance_count, student_group')
        .neq('role', 'admin') 

      if (profiles) {
        const formattedProfiles = profiles.map(p => {
          // Limpiamos el nombre del grado
          let degree = p.student_group || 'Desconocido'
          // Quita "Grado en ingeniería " ignorando mayúsculas/minúsculas
          degree = degree.replace(/Grado en [Ii]ngenier[íi]a\s*/g, '').trim()
          
          return {
            name: p.nickname || p.full_name?.split(' ')[0] || 'Anónimo',
            current_balance: p.current_balance || 0,
            attendance_count: p.attendance_count || 0,
            student_group: degree.charAt(0).toUpperCase() + degree.slice(1) // Capitaliza la primera letra
          }
        })

        // Ordenamos y sacamos los 5 más ricos
        const sortedRich = [...formattedProfiles].sort((a, b) => b.current_balance - a.current_balance).slice(0, 5)
        setTopRichData(sortedRich)

        // Usamos los mismos datos formateados para la gráfica de correlación
        setCorrelationData(formattedProfiles)
      }

      // 2. ECONOMÍA: Historial completo para calcular circulación real
      const { data: allTx } = await supabase
        .from('transactions')
        .select('amount, created_at, profiles!inner(role)')
        .neq('profiles.role', 'admin')
        .order('created_at', { ascending: true }) // Necesitamos orden cronológico estricto

      if (allTx) {
        const dailyGroups: Record<string, any> = {}
        
        // Agrupamos por día y sumamos
        allTx.forEach(t => {
          const dateKey = t.created_at.split('T')[0]

          if (!dailyGroups[dateKey]) {
            dailyGroups[dateKey] = { rawDate: dateKey, adquiridos: 0, gastados: 0, net: 0 }
          }

          if (t.amount > 0) dailyGroups[dateKey].adquiridos += t.amount
          else dailyGroups[dateKey].gastados += Math.abs(t.amount)
          
          dailyGroups[dateKey].net += t.amount
        })

        // Ordenamos días y calculamos la circulación acumulada
        const sortedDays = Object.values(dailyGroups).sort((a, b) => a.rawDate.localeCompare(b.rawDate))
        let runningCirculation = 0
        sortedDays.forEach(day => {
          runningCirculation += day.net
          day.circulacion = runningCirculation
        })

        // Ahora sí, filtramos por la fecha seleccionada en los botones
        const filteredDays = sortedDays.filter(d => new Date(d.rawDate) >= startDate)
        let finalEcoData = []

        if (timeRange === 'year') {
          const monthlyGroups: Record<string, any> = {}
          filteredDays.forEach(day => {
            const monthKey = day.rawDate.substring(0, 7) // YYYY-MM
            if (!monthlyGroups[monthKey]) {
              monthlyGroups[monthKey] = { rawDate: monthKey, adquiridos: 0, gastados: 0, circulacion: day.circulacion }
            } else {
              monthlyGroups[monthKey].adquiridos += day.adquiridos
              monthlyGroups[monthKey].gastados += day.gastados
              monthlyGroups[monthKey].circulacion = day.circulacion // Se queda con la circulación del último día del mes
            }
          })
          finalEcoData = Object.values(monthlyGroups)
        } else {
          finalEcoData = filteredDays
        }

        const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        finalEcoData = finalEcoData.map(item => {
          const d = new Date(item.rawDate + (item.rawDate.length === 7 ? '-01' : 'T00:00:00'))
          const displayDate = item.rawDate.length === 7
            ? monthNames[d.getMonth()]
            : `${d.getDate()} ${monthNames[d.getMonth()]}`
          return { ...item, displayDate }
        })
          
        setEconomyChartData(finalEcoData)
      }

      setIsMounted(true)
    }

    fetchData()
  }, [timeRange])

  if (!isMounted) {
    return (
      <div className="mb-8 flex flex-col gap-6 animate-pulse">
        <div className="h-12 bg-slate-800/50 rounded-xl w-full"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[300px] bg-slate-800/50 rounded-xl"></div>
          <div className="h-[300px] bg-slate-800/50 rounded-xl"></div>
          <div className="h-[350px] bg-slate-800/50 rounded-xl lg:col-span-2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8 flex flex-col gap-6">
      
      {/* Controles de Tiempo */}
      <div className="flex items-center justify-between bg-slate-900/50 p-2 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 px-3 text-yellow-400">
          <FaTrophy />
          <span className="text-sm font-semibold uppercase tracking-wider">Economía y Gamificación</span>
        </div>
        <div className="flex gap-1">
          <TimeButton active={timeRange === 'week'} onClick={() => setTimeRange('week')}>Última Semana</TimeButton>
          <TimeButton active={timeRange === 'month'} onClick={() => setTimeRange('month')}>Último Mes</TimeButton>
          <TimeButton active={timeRange === 'year'} onClick={() => setTimeRange('year')}>Último Año</TimeButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* GRÁFICA 1: TOP 5 MÁS RICOS (Barras Horizontales) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 block">
          <div className="flex items-center gap-2 mb-6">
            <FaCoins className="text-yellow-400" />
            <h3 className="font-bold text-white">Top 5: Mayores Fortunas</h3>
          </div>
          <div className="w-full">
            {topRichData.length > 0 ? (
              <div className="w-full h-[250px] relative">
                <ResponsiveContainer width="100%" height={250} minWidth={0}>
                  <BarChart layout="vertical" data={topRichData} margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                    <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem' }} cursor={{fill: '#1e293b'}} />
                    <Bar dataKey="current_balance" name="Electrones" fill="#eab308" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="w-full h-[250px] flex items-center justify-center text-slate-500 text-sm italic">Sin datos de riqueza.</div>
            )}
          </div>
        </div>

        {/* GRÁFICA 2: CORRELACIÓN ASISTENCIA VS ECONOMÍA (ScatterChart) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 block">
          <div className="flex items-center gap-2 mb-6">
            <FaUsers className="text-blue-400" />
            <h3 className="font-bold text-white">Correlación: Asistencia vs Electrones</h3>
          </div>
          <div className="w-full">
            {correlationData.length > 0 ? (
              <div className="w-full h-[250px] relative">
                <ResponsiveContainer width="100%" height={250} minWidth={0}>
                  {/* Aumentamos el margen 'bottom' a 40 para hacer hueco */}
                  <ScatterChart margin={{ top: 10, right: 20, bottom: 40, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis 
                      type="number" 
                      dataKey="attendance_count" 
                      name="Asistencias" 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickLine={false}
                      label={{ value: 'Nº de Asistencias', position: 'bottom', offset: 0, fill: '#94a3b8', fontSize: 12 }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="current_balance" 
                      name="Electrones" 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickLine={false}
                      label={{ value: 'Electrones', angle: -90, position: 'insideLeft', offset: 0, fill: '#94a3b8', fontSize: 12 }}
                    />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ScatterTooltip />} />
                    
                    {/* Configuramos la leyenda para que se vaya abajo, le damos un poco de margen extra y forzamos el color claro del texto */}
                    <Legend 
                      verticalAlign="bottom"
                      wrapperStyle={{ paddingTop: '20px' }} 
                      formatter={(value) => <span className="text-slate-300 text-xs font-medium">{value}</span>}
                    />
                    
                    {Array.from(new Set(correlationData.map(d => d.student_group))).map((group, index) => {
                      const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#a855f7', '#ec4899', '#ef4444', '#06b6d4'];
                      return (
                        <Scatter 
                          key={group} 
                          name={group} 
                          data={correlationData.filter(d => d.student_group === group)} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      )
                    })}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="w-full h-[250px] flex items-center justify-center text-slate-500 text-sm italic">Sin datos de estudiantes.</div>
            )}
          </div>
        </div>

        {/* GRÁFICA 3: FLUJO ECONÓMICO Y CIRCULACIÓN (Ocupa las 2 columnas) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 lg:col-span-2 block">
          <div className="flex items-center gap-2 mb-6">
            <FaChartLine className="text-emerald-400" />
            <h3 className="font-bold text-white">Flujo Económico: Generados, Gastados y Circulación</h3>
          </div>
          <div className="w-full">
            {economyChartData.length > 0 ? (
              <div className="w-full h-[320px] relative">
                <ResponsiveContainer width="100%" height={320} minWidth={0}>
                  <LineChart data={economyChartData} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="displayDate" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem' }} 
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '15px' }} />
                    
                    {/* Líneas según tus colores y grosor */}
                    <Line type="monotone" dataKey="adquiridos" name="Electrones Adquiridos" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#0f172a' }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="gastados" name="Electrones Gastados" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: '#0f172a' }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="circulacion" name="En Circulación" stroke="#eab308" strokeWidth={4} dot={false} activeDot={{ r: 6, fill: '#eab308', stroke: '#fff' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="w-full h-[320px] flex items-center justify-center text-slate-500 text-sm italic">No hay transacciones recientes.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

function TimeButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
        active 
          ? 'bg-slate-700 text-yellow-400 shadow-md' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
      }`}
    >
      {children}
    </button>
  )
}