"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, 
  LineChart, Line, ScatterChart, Scatter, AreaChart, Area 
} from 'recharts'
import { FaCalendarAlt, FaCoins, FaTrophy, FaUsers, FaChartLine, FaBoxOpen } from 'react-icons/fa'

type TimeRange = 'week' | 'month' | 'year'

// Tooltip Personalizado para la gráfica de Correlación
const ScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
        <p className="font-bold text-white mb-1 border-b border-slate-700 pb-1">{data.name}</p>
        <p className="text-slate-300 text-xs mb-2 italic">{data.student_group}</p>
        <p className="text-yellow-400 text-sm font-semibold">
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
  const [lootboxData, setLootboxData] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      
      const now = new Date()
      const startDate = new Date()
      
      if (timeRange === 'week') startDate.setDate(now.getDate() - 7)
      if (timeRange === 'month') startDate.setDate(now.getDate() - 30)
      if (timeRange === 'year') startDate.setFullYear(now.getFullYear() - 1)

      // 1. PROFILES: Top 5 Ricos + Correlación
      const { data: profiles } = await supabase
        .from('profiles')
        .select('nickname, full_name, current_balance, attendance_count, student_group')
        .neq('role', 'admin') 

      if (profiles) {
        const formattedProfiles = profiles.map(p => {
          let degree = p.student_group || 'Desconocido'
          degree = degree.replace(/Grado en [Ii]ngenier[íi]a\s*/g, '').trim()
          
          return {
            name: p.nickname || p.full_name?.split(' ')[0] || 'Anónimo',
            current_balance: p.current_balance || 0,
            attendance_count: p.attendance_count || 0,
            student_group: degree.charAt(0).toUpperCase() + degree.slice(1)
          }
        })

        const sortedRich = [...formattedProfiles].sort((a, b) => b.current_balance - a.current_balance).slice(0, 5)
        setTopRichData(sortedRich)
        setCorrelationData(formattedProfiles)
      }

      // 2. ECONOMÍA: Historial de transacciones
      const { data: allTx } = await supabase
        .from('transactions')
        .select('amount, created_at, profiles!inner(role)')
        .neq('profiles.role', 'admin')
        .order('created_at', { ascending: true })

      if (allTx) {
        const dailyGroups: Record<string, any> = {}
        allTx.forEach(t => {
          const dateKey = t.created_at.split('T')[0]
          if (!dailyGroups[dateKey]) {
            dailyGroups[dateKey] = { rawDate: dateKey, adquiridos: 0, gastados: 0, net: 0 }
          }
          if (t.amount > 0) dailyGroups[dateKey].adquiridos += t.amount
          else dailyGroups[dateKey].gastados += Math.abs(t.amount)
          dailyGroups[dateKey].net += t.amount
        })

        const sortedDays = Object.values(dailyGroups).sort((a: any, b: any) => a.rawDate.localeCompare(b.rawDate))
        let runningCirculation = 0
        sortedDays.forEach((day: any) => {
          runningCirculation += day.net
          day.circulacion = runningCirculation
        })

        const filteredDays = sortedDays.filter((d: any) => new Date(d.rawDate) >= startDate)
        processTemporalData(filteredDays, setEconomyChartData)
      }

      // 3. LOOTBOXES: Filtro por categoría lootbox y fecha de consumo
      const { data: lootboxes } = await supabase
        .from('user_inventory')
        .select(`
          consumed_at,
          shop_products!inner(name, category)
        `)
        .eq('shop_products.category', 'lootbox')
        .not('consumed_at', 'is', null)
        .gte('consumed_at', startDate.toISOString())

      if (lootboxes) {
        const lootGroups: Record<string, any> = {}
        lootboxes.forEach(lb => {
          const dateKey = lb.consumed_at.split('T')[0]
          if (!lootGroups[dateKey]) {
            lootGroups[dateKey] = { rawDate: dateKey, total: 0 }
          }
          lootGroups[dateKey].total += 1
        })

        const sortedLoot = Object.values(lootGroups).sort((a: any, b: any) => a.rawDate.localeCompare(b.rawDate))
        processTemporalData(sortedLoot, setLootboxData)
      }

      setIsMounted(true)
    }

    // Función auxiliar para procesar fechas según el rango (Mes/Año)
    function processTemporalData(data: any[], setter: (d: any[]) => void) {
      let result = []
      if (timeRange === 'year') {
        const monthly: Record<string, any> = {}
        data.forEach(item => {
          const monthKey = item.rawDate.substring(0, 7)
          if (!monthly[monthKey]) {
            monthly[monthKey] = { ...item, rawDate: monthKey }
          } else {
            if (item.adquiridos !== undefined) {
              monthly[monthKey].adquiridos += item.adquiridos
              monthly[monthKey].gastados += item.gastados
              monthly[monthKey].circulacion = item.circulacion
            }
            if (item.total !== undefined) {
              monthly[monthKey].total += item.total
            }
          }
        })
        result = Object.values(monthly)
      } else {
        result = data
      }

      const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
      setter(result.map(item => {
        const d = new Date(item.rawDate + (item.rawDate.length === 7 ? '-01' : 'T00:00:00'))
        const displayDate = item.rawDate.length === 7
          ? monthNames[d.getMonth()]
          : `${d.getDate()} ${monthNames[d.getMonth()]}`
        return { ...item, displayDate }
      }))
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
          <span className="text-sm font-semibold uppercase tracking-wider">Estadísticas de Economía</span>
        </div>
        <div className="flex gap-1">
          <TimeButton active={timeRange === 'week'} onClick={() => setTimeRange('week')}>Semana</TimeButton>
          <TimeButton active={timeRange === 'month'} onClick={() => setTimeRange('month')}>Mes</TimeButton>
          <TimeButton active={timeRange === 'year'} onClick={() => setTimeRange('year')}>Año</TimeButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* GRÁFICA 1: RIQUEZA */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 block">
          <div className="flex items-center gap-2 mb-6">
            <FaCoins className="text-yellow-400" />
            <h3 className="font-bold text-white">Top 5: Mayores Fortunas</h3>
          </div>
          <div className="w-full h-[250px]">
            {topRichData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={topRichData} margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem' }} cursor={{fill: '#1e293b'}} />
                  <Bar dataKey="current_balance" name="Electrones" fill="#eab308" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            ) : <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">Sin datos.</div>}
          </div>
        </div>

        {/* GRÁFICA 2: CORRELACIÓN */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 block">
          <div className="flex items-center gap-2 mb-6">
            <FaUsers className="text-blue-400" />
            <h3 className="font-bold text-white">Asistencia vs Electrones</h3>
          </div>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 40, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" dataKey="attendance_count" name="Asistencias" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Asistencias', position: 'bottom', offset: 0, fill: '#94a3b8', fontSize: 10 }} />
                <YAxis type="number" dataKey="current_balance" name="Electrones" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ScatterTooltip />} />
                <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px' }} formatter={(v) => <span className="text-slate-300 text-[10px]">{v}</span>} />
                {Array.from(new Set(correlationData.map(d => d.student_group))).map((group, i) => (
                  <Scatter key={group} name={group} data={correlationData.filter(d => d.student_group === group)} fill={['#3b82f6', '#10b981', '#f59e0b', '#a855f7', '#ec4899'][i % 5]} />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICA 3: FLUJO ECONÓMICO */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 lg:col-span-2 block">
          <div className="flex items-center gap-2 mb-6">
            <FaChartLine className="text-emerald-400" />
            <h3 className="font-bold text-white">Flujo de Electrones y Circulación</h3>
          </div>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={economyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="displayDate" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="adquiridos" name="Generados" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="gastados" name="Gastados" stroke="#ef4444" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="circulacion" name="En Circulación" stroke="#eab308" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICA 4: LOOTBOXES (NUEVA) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 lg:col-span-2 block">
          <div className="flex items-center gap-2 mb-6">
            <FaBoxOpen className="text-purple-400" />
            <h3 className="font-bold text-white">Histórico de Apertura de Lootboxes</h3>
          </div>
          <div className="w-full h-[300px]">
            {lootboxData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lootboxData}>
                  <defs>
                    <linearGradient id="colorLoot" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="displayDate" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem' }} />
                  <Area type="monotone" dataKey="total" name="Lootboxes Abiertas" stroke="#a855f7" fillOpacity={1} fill="url(#colorLoot)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            ) : <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">No hay aperturas registradas.</div>}
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
        active ? 'bg-slate-700 text-yellow-400 shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
      }`}
    >
      {children}
    </button>
  )
}