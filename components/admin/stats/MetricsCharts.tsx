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

const MONTH_NAMES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

// Clave YYYY-MM-DD en hora local (evita desfases por UTC al comparar fechas)
function toDayKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Inicio del periodo como ventana móvil: 7 días, 30 días o 1 año hacia atrás desde hoy
function getStartKey(range: TimeRange) {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  if (range === 'week') d.setDate(d.getDate() - 7)
  if (range === 'month') d.setDate(d.getDate() - 30)
  if (range === 'year') d.setFullYear(d.getFullYear() - 1)
  return toDayKey(d)
}

function formatDayKey(key: string) {
  const [, m, day] = key.split('-')
  return `${parseInt(day)} ${MONTH_NAMES[parseInt(m) - 1]}`
}

// Supabase limita cada respuesta a 1000 filas: paginamos para no perder los datos más recientes
async function fetchAllRows(buildQuery: (from: number, to: number) => any) {
  const PAGE = 1000
  const rows: any[] = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await buildQuery(from, from + PAGE - 1)
    if (error) { console.error(error); break }
    if (!data?.length) break
    rows.push(...data)
    if (data.length < PAGE) break
  }
  return rows
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
      
      // Margen de un día extra para cubrir diferencias de zona horaria
      const since = new Date()
      since.setFullYear(since.getFullYear() - 1)
      since.setDate(since.getDate() - 1)
      const dateString = toDayKey(since)

      const metricsData = await fetchAllRows((from, to) => supabase
        .from('site_metrics')
        .select('visit_date, page_path, visit_count')
        .gte('visit_date', dateString)
        .order('visit_date', { ascending: true })
        .range(from, to))

      setRawMetricsData(metricsData)

      const attendanceData = await fetchAllRows((from, to) => supabase
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
        .order('created_at', { ascending: true })
        .range(from, to))

      if (attendanceData.length) {
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
    const startKey = getStartKey(timeRange)

    // visit_date ya es YYYY-MM-DD: comparamos como texto. Siempre por día, también en la vista anual.
    const filteredData = rawMetricsData.filter(d => d.visit_date >= startKey)
    const groupedData: Record<string, any> = {}

    filteredData.forEach(row => {
      const dateKey = row.visit_date

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

    const finalData = Object.values(groupedData)
      .sort((a, b) => a.rawDate.localeCompare(b.rawDate))
      .map(item => ({ ...item, displayDate: formatDayKey(item.rawDate) }))

    setUsageChartData(finalData)
  }, [rawMetricsData, timeRange])

  // 3. Procesar Asistencia
  useEffect(() => {
    const startKey = getStartKey(timeRange)

    const filteredData = rawAttendanceData.filter(session => {
      const isAfterDate = toDayKey(new Date(session.created_at)) >= startKey
      const matchesType = session.session_type?.toLowerCase() === sessionFilter
      
      const validAttendees = session.attendance?.filter(
        (a: any) => a.profiles?.role !== 'admin'
      ) || []
      
      return isAfterDate && matchesType && validAttendees.length > 0
    })

    // Un mismo día puede tener varias sesiones (p.ej. se proyecta el QR dos veces en la misma clase).
    // Deduplicamos por user_id dentro de cada día real para no contar dos veces al mismo alumno.
    const dailyAttendees: Record<string, Record<string, Set<string>>> = {}

    filteredData.forEach(session => {
      const dayKey = toDayKey(new Date(session.created_at))
      const groupShortName = formatGroupName(session.group_name)
      const validAttendees = session.attendance?.filter((a: any) => a.profiles?.role !== 'admin') || []

      if (!dailyAttendees[dayKey]) dailyAttendees[dayKey] = {}
      if (!dailyAttendees[dayKey][groupShortName]) dailyAttendees[dayKey][groupShortName] = new Set()

      validAttendees.forEach((a: any) => dailyAttendees[dayKey][groupShortName].add(a.user_id))
    })

    // Un punto por día de sesión (sin agrupar por mes en la vista anual)
    const finalData = Object.entries(dailyAttendees)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([dayKey, groups]) => {
        const item: Record<string, any> = { rawDate: dayKey, displayDate: formatDayKey(dayKey) }
        Object.entries(groups).forEach(([groupShortName, userSet]) => {
          item[groupShortName] = userSet.size
        })
        return item
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
                    <XAxis dataKey="displayDate" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} minTickGap={20} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem' }} itemStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    {availableGroups.map((group, index) => (
                      <Line key={group} type="monotone" connectNulls dataKey={group} name={group} stroke={GROUP_COLORS[index % GROUP_COLORS.length]} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#0f172a' }} activeDot={{ r: 6, strokeWidth: 0 }} />
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
                    <XAxis dataKey="displayDate" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} minTickGap={20} />
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
                    <XAxis dataKey="displayDate" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} minTickGap={20} />
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