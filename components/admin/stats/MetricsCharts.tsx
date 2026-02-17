"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area 
} from 'recharts'
import { FaCalendarAlt, FaChartLine, FaEye, FaUsers } from 'react-icons/fa'

type TimeRange = 'week' | 'month' | 'year'

// Colores predefinidos para las líneas de los grupos
const GROUP_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#0ea5e9', '#f43f5e']

// Función para limpiar "Grado en Ingeniería "
function formatGroupName(grade: string) {
  if (!grade) return 'Sin Grupo'
  let cleaned = grade.replace(/grado en ingenier[ií]a/i, '').trim()
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
  }
  return cleaned || grade 
}

export default function MetricsCharts() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week')
  const [isMounted, setIsMounted] = useState(false)
  
  // Estados para datos
  const [rawMetricsData, setRawMetricsData] = useState<any[]>([])
  const [usageChartData, setUsageChartData] = useState<any[]>([])
  const [rawAttendanceData, setRawAttendanceData] = useState<any[]>([])
  const [attendanceChartData, setAttendanceChartData] = useState<any[]>([])
  const [availableGroups, setAvailableGroups] = useState<string[]>([])
  
  const [sessionFilter, setSessionFilter] = useState<string>('teoria')

  // 1. Fetch Inicial
  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
      const dateString = oneYearAgo.toISOString().split('T')[0]

      const { data: metricsData } = await supabase
        .from('site_metrics')
        .select('visit_date, page_path, visit_count')
        .gte('visit_date', dateString)

      if (metricsData) setRawMetricsData(metricsData)

      const { data: attendanceData, error } = await supabase
        .from('class_sessions')
        .select(`
          id,
          group_name,
          session_type,
          created_at,
          attendance ( 
            user_id,
            profiles ( role )
          )
        `)
        .gte('created_at', dateString)

      if (error) console.error("Error cargando sesiones:", error)
      if (attendanceData) {
        setRawAttendanceData(attendanceData)
        const groups = new Set(attendanceData.map(s => formatGroupName(s.group_name)))
        setAvailableGroups(Array.from(groups))
      }

      setIsMounted(true)
    }

    fetchData()
  }, [])

  // 2. Procesar Uso
  useEffect(() => {
    if (!rawMetricsData.length) return

    const now = new Date()
    const startDate = new Date()
    
    if (timeRange === 'week') startDate.setDate(now.getDate() - 7)
    if (timeRange === 'month') startDate.setDate(now.getDate() - 30)
    if (timeRange === 'year') startDate.setFullYear(now.getFullYear() - 1)

    const filteredData = rawMetricsData.filter(d => new Date(d.visit_date) >= startDate)
    const groupedData: Record<string, any> = {}

    filteredData.forEach(row => {
      const d = new Date(row.visit_date)
      let dateKey = timeRange === 'year' 
        ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        : row.visit_date 

      if (!groupedData[dateKey]) {
        groupedData[dateKey] = { rawDate: dateKey, total: 0, home: 0, tienda: 0, ranking: 0, mochila: 0, logros: 0 }
      }

      const count = row.visit_count || 0
      groupedData[dateKey].total += count

      switch (row.page_path) {
        case '/': groupedData[dateKey].home += count; break;
        case '/shop': groupedData[dateKey].tienda += count; break;
        case '/leaderboard': groupedData[dateKey].ranking += count; break;
        case '/inventory': groupedData[dateKey].mochila += count; break;
        case '/achievements': groupedData[dateKey].logros += count; break;
      }
    })

    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    const finalData = Object.values(groupedData)
      .sort((a, b) => a.rawDate.localeCompare(b.rawDate))
      .map(item => {
        const d = new Date(item.rawDate)
        let displayDate = timeRange === 'year'
          ? monthNames[parseInt(item.rawDate.split('-')[1]) - 1]
          : `${d.getDate()} ${monthNames[d.getMonth()]}`
        return { ...item, displayDate }
      })

    setUsageChartData(finalData)
  }, [rawMetricsData, timeRange])

  // 3. Procesar Asistencia
  useEffect(() => {
    if (!rawAttendanceData.length) return

    const now = new Date()
    const startDate = new Date()
    
    if (timeRange === 'week') startDate.setDate(now.getDate() - 7)
    if (timeRange === 'month') startDate.setDate(now.getDate() - 30)
    if (timeRange === 'year') startDate.setFullYear(now.getFullYear() - 1)

    const filteredData = rawAttendanceData.filter(session => {
      const isAfterDate = new Date(session.created_at) >= startDate
      const matchesType = session.session_type?.toLowerCase() === sessionFilter
      
      const validAttendees = session.attendance?.filter(
        (a: any) => a.profiles?.role !== 'admin'
      ) || []
      
      return isAfterDate && matchesType && validAttendees.length > 0
    })

    const groupedData: Record<string, any> = {}

    filteredData.forEach(session => {
      const d = new Date(session.created_at)
      let dateKey = timeRange === 'year' 
        ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        : session.created_at.split('T')[0] 

      if (!groupedData[dateKey]) {
        groupedData[dateKey] = { rawDate: dateKey }
      }

      const groupShortName = formatGroupName(session.group_name)
      const validAttendees = session.attendance?.filter((a: any) => a.profiles?.role !== 'admin') || []

      groupedData[dateKey][groupShortName] = (groupedData[dateKey][groupShortName] || 0) + validAttendees.length
    })

    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    const finalData = Object.values(groupedData)
      .sort((a, b) => a.rawDate.localeCompare(b.rawDate))
      .map(item => {
        const d = new Date(item.rawDate)
        let displayDate = timeRange === 'year'
          ? monthNames[parseInt(item.rawDate.split('-')[1]) - 1]
          : `${d.getDate()} ${monthNames[d.getMonth()]}`
        return { ...item, displayDate }
      })

    setAttendanceChartData(finalData)
  }, [rawAttendanceData, timeRange, sessionFilter])

  // --- RENDERIZADO ---
  if (!isMounted) {
    return (
      <div className="mb-8 flex flex-col gap-6 animate-pulse">
        <div className="h-12 bg-slate-800/50 rounded-xl w-full"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[320px] bg-slate-800/50 rounded-xl"></div>
          <div className="h-[320px] bg-slate-800/50 rounded-xl"></div>
          <div className="h-[380px] bg-slate-800/50 rounded-xl lg:col-span-2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8 flex flex-col gap-6">
      
      <div className="flex items-center justify-between bg-slate-900/50 p-2 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 px-3 text-slate-400">
          <FaCalendarAlt />
          <span className="text-sm font-semibold uppercase tracking-wider">Periodo</span>
        </div>
        <div className="flex gap-1">
          <TimeButton active={timeRange === 'week'} onClick={() => setTimeRange('week')}>Última Semana</TimeButton>
          <TimeButton active={timeRange === 'month'} onClick={() => setTimeRange('month')}>Último Mes</TimeButton>
          <TimeButton active={timeRange === 'year'} onClick={() => setTimeRange('year')}>Último Año</TimeButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* GRÁFICA 1 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 block">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FaUsers className="text-blue-400" />
              <h3 className="font-bold text-white">Asistencia a Clase</h3>
            </div>
            <select 
              value={sessionFilter} 
              onChange={e => setSessionFilter(e.target.value)}
              className="bg-slate-950 text-xs font-semibold text-slate-300 rounded-lg px-2 py-1.5 border border-slate-700 outline-none focus:border-slate-500 cursor-pointer"
            >
              <option value="teoria">Teoría</option>
              <option value="problemas">Problemas</option>
              <option value="laboratorio">Laboratorio</option>
            </select>
          </div>
          <div className="w-full">
            {attendanceChartData.length > 0 ? (
              <div className="w-full h-[250px] relative">
                {/* Altura en px absolutos y minWidth estricto en 0 */}
                <ResponsiveContainer width="100%" height={250} minWidth={0}>
                  <LineChart data={attendanceChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="displayDate" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem' }} itemStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    {availableGroups.map((group, index) => (
                      <Line key={group} type="monotone" dataKey={group} name={group} stroke={GROUP_COLORS[index % GROUP_COLORS.length]} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#0f172a' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="w-full h-[250px] flex items-center justify-center text-slate-500 text-sm italic">
                No hay datos de asistencia de estudiantes.
              </div>
            )}
          </div>
        </div>

        {/* GRÁFICA 2 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 block">
          <div className="flex items-center gap-2 mb-6">
            <FaChartLine className="text-emerald-400" />
            <h3 className="font-bold text-white">Tráfico Total (Páginas Visitadas)</h3>
          </div>
          <div className="w-full">
            {usageChartData.length > 0 ? (
              <div className="w-full h-[250px] relative">
                <ResponsiveContainer width="100%" height={250} minWidth={0}>
                  <AreaChart data={usageChartData}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="displayDate" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem' }} />
                    <Area type="monotone" dataKey="total" name="Páginas totales" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="w-full h-[250px] flex items-center justify-center text-slate-500 text-sm italic">
                No hay datos de uso registrados.
              </div>
            )}
          </div>
        </div>

        {/* GRÁFICA 3 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 lg:col-span-2 block">
          <div className="flex items-center gap-2 mb-6">
            <FaEye className="text-purple-400" />
            <h3 className="font-bold text-white">Visitas por Sección</h3>
          </div>
          <div className="w-full">
            {usageChartData.length > 0 ? (
              <div className="w-full h-[300px] relative">
                <ResponsiveContainer width="100%" height={300} minWidth={0}>
                  <LineChart data={usageChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="displayDate" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem' }} />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="home" name="Dashboard" stroke="#cbd5e1" strokeWidth={2} dot={{ r: 3, fill: '#0f172a' }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="tienda" name="Tienda" stroke="#ec4899" strokeWidth={2} dot={{ r: 3, fill: '#0f172a' }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="ranking" name="Ranking" stroke="#eab308" strokeWidth={2} dot={{ r: 3, fill: '#0f172a' }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="mochila" name="Mochila" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3, fill: '#0f172a' }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="logros" name="Logros" stroke="#f97316" strokeWidth={2} dot={{ r: 3, fill: '#0f172a' }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="w-full h-[300px] flex items-center justify-center text-slate-500 text-sm italic">
                No hay datos desglosados disponibles.
              </div>
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
          ? 'bg-slate-700 text-white shadow-md' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
      }`}
    >
      {children}
    </button>
  )
}