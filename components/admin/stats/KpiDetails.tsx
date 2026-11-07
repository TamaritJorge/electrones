"use client"
// Ruta: components/admin/stats/KpiDetails.tsx
// Contenido de los paneles de detalle de las tarjetas KPI del panel de estadísticas

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { fetchAllRows } from '@/utils/supabase/fetchAllRows'
import AchievementArtifact from '@/components/AchievementArtifact'
import { FaChevronDown, FaSearch, FaStar, FaKey, FaExclamationTriangle } from 'react-icons/fa'

// --- Utilidades comunes ---

type Person = { name: string, nickname?: string | null, detail?: string, date?: string | null }

function personFromProfile(p: any, extra: Partial<Person> = {}): Person {
  const name = p?.full_name || p?.nickname || 'Sin nombre'
  const nickname = p?.nickname && p.nickname.trim().toLowerCase() !== name.trim().toLowerCase() ? p.nickname : null
  return { name, nickname, ...extra }
}

function formatDate(d?: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

function sortByName(list: Person[]) {
  return [...list].sort((a, b) => a.name.localeCompare(b.name, 'es'))
}

function Loading() {
  return <div className="py-10 text-center text-slate-500 text-sm animate-pulse">Cargando datos…</div>
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="py-6 text-center text-slate-500 text-sm italic">{children}</div>
}

function SearchBox({ value, onChange, placeholder }: { value: string, onChange: (v: string) => void, placeholder: string }) {
  return (
    <div className="relative mb-3">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-200 outline-none focus:border-slate-500"
      />
    </div>
  )
}

function SummaryTile({ value, label, color = 'text-white' }: { value: number | string, label: string, color?: string }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
      <div className={`text-xl font-bold leading-none ${color}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-1">{label}</div>
    </div>
  )
}

function PeopleList({ people }: { people: Person[] }) {
  if (!people.length) return <Empty>Nadie todavía.</Empty>
  return (
    <ul className="divide-y divide-slate-800/70">
      {people.map((p, i) => (
        <li key={i} className="flex items-center justify-between gap-3 py-1.5 text-sm">
          <span className="min-w-0">
            <span className="text-slate-200">{p.name}</span>
            {p.nickname && <span className="text-slate-500 text-xs"> · «{p.nickname}»</span>}
            {p.detail && <span className="block text-xs text-slate-400">{p.detail}</span>}
          </span>
          {p.date && <span className="text-xs text-slate-500 shrink-0">{formatDate(p.date)}</span>}
        </li>
      ))}
    </ul>
  )
}

// Fila con un contador clicable que despliega la lista de alumnos
function ExpandableRow({ icon, title, subtitle, count, people, countLabel }: {
  icon?: React.ReactNode, title: string, subtitle?: string, count: number, people: Person[], countLabel?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl">
      <div className="flex items-center gap-3 p-3">
        {icon && <div className="shrink-0">{icon}</div>}
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-slate-100 text-sm">{title}</div>
          {subtitle && <div className="text-xs text-slate-500 line-clamp-2">{subtitle}</div>}
        </div>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          disabled={count === 0}
          className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
            count === 0 ? 'text-slate-600 cursor-default' : 'bg-slate-800 text-white hover:bg-slate-700'
          }`}
          title={count ? 'Ver alumnos' : undefined}
        >
          {count}{countLabel && <span className="text-xs font-normal text-slate-400">{countLabel}</span>}
          {count > 0 && <FaChevronDown className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-800 px-3 pb-2 max-h-72 overflow-y-auto">
          <PeopleList people={people} />
        </div>
      )}
    </div>
  )
}

// =====================================================================
// LOGROS: cuántos alumnos tienen cada logro y quiénes son
// =====================================================================
export function AchievementsDetail() {
  const [loading, setLoading] = useState(true)
  const [achievements, setAchievements] = useState<any[]>([])
  const [unlocks, setUnlocks] = useState<any[]>([])

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from('achievements').select('id, name, description, icon_name, category'),
      fetchAllRows((from, to) => supabase
        .from('user_achievements')
        .select('achievement_id, unlocked_at, profiles!inner(full_name, nickname, role)')
        .eq('profiles.role', 'student')
        .order('unlocked_at', { ascending: true })
        .range(from, to)),
    ]).then(([{ data: achv }, rows]) => {
      setAchievements(achv || [])
      setUnlocks(rows)
      setLoading(false)
    })
  }, [])

  const byAchievement = useMemo(() => {
    const map: Record<string, Person[]> = {}
    unlocks.forEach(u => {
      (map[u.achievement_id] ||= []).push(personFromProfile(u.profiles, { date: u.unlocked_at }))
    })
    return map
  }, [unlocks])

  if (loading) return <Loading />

  const sorted = [...achievements].sort((a, b) =>
    (byAchievement[b.id]?.length || 0) - (byAchievement[a.id]?.length || 0) || a.name.localeCompare(b.name, 'es'))

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-slate-500 mb-1">Pulsa el número de un logro para ver qué alumnos lo tienen.</p>
      {sorted.map(a => (
        <ExpandableRow
          key={a.id}
          icon={<AchievementArtifact iconName={a.icon_name} className="w-10 h-10" />}
          title={a.name}
          subtitle={a.description}
          count={byAchievement[a.id]?.length || 0}
          countLabel="alumnos"
          people={sortByName(byAchievement[a.id] || [])}
        />
      ))}
    </div>
  )
}

// =====================================================================
// COMPRAS: resumen por producto y listado de compras
// =====================================================================
export function PurchasesDetail() {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<any[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const supabase = createClient()
    fetchAllRows((from, to) => supabase
      .from('transactions')
      .select('id, amount, concept, created_at, profiles!inner(full_name, nickname, role)')
      .ilike('concept', 'Compra:%')
      .eq('profiles.role', 'student')
      .order('created_at', { ascending: false })
      .range(from, to))
      .then(data => { setRows(data); setLoading(false) })
  }, [])

  const purchases = useMemo(() => rows.map(r => ({
    product: r.concept.replace(/^Compra:\s*/i, ''),
    price: Math.abs(r.amount),
    person: personFromProfile(r.profiles, { date: r.created_at }),
  })), [rows])

  if (loading) return <Loading />
  if (!purchases.length) return <Empty>No hay compras registradas.</Empty>

  // Resumen por producto: nº de compras y alumnos (con cuántas unidades compró cada uno)
  const byProduct: Record<string, { count: number, spent: number, buyers: Record<string, Person & { units: number }> }> = {}
  purchases.forEach(p => {
    const entry = (byProduct[p.product] ||= { count: 0, spent: 0, buyers: {} })
    entry.count++
    entry.spent += p.price
    const key = p.person.name
    if (!entry.buyers[key]) entry.buyers[key] = { ...p.person, units: 0 }
    entry.buyers[key].units++
    // Guardamos la última fecha de compra (la lista viene de más reciente a más antigua)
    if (!entry.buyers[key].date) entry.buyers[key].date = p.person.date
  })

  const totalSpent = purchases.reduce((s, p) => s + p.price, 0)
  const buyersCount = new Set(purchases.map(p => p.person.name)).size

  const q = search.trim().toLowerCase()
  const filtered = q
    ? purchases.filter(p => p.person.name.toLowerCase().includes(q) || p.person.nickname?.toLowerCase().includes(q) || p.product.toLowerCase().includes(q))
    : purchases

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-2">
        <SummaryTile value={purchases.length} label="Compras" />
        <SummaryTile value={buyersCount} label="Alumnos" />
        <SummaryTile value={totalSpent.toLocaleString('es-ES')} label="Electrones gastados" color="text-yellow-400" />
      </div>

      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Por producto</h3>
        <div className="flex flex-col gap-2">
          {Object.entries(byProduct).sort((a, b) => b[1].count - a[1].count).map(([product, e]) => (
            <ExpandableRow
              key={product}
              title={product}
              subtitle={`${e.count} compras · ${e.spent.toLocaleString('es-ES')} electrones`}
              count={Object.keys(e.buyers).length}
              countLabel="alumnos"
              people={sortByName(Object.values(e.buyers).map(b => ({ ...b, detail: `${b.units} ${b.units === 1 ? 'unidad' : 'unidades'}` })))}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Todas las compras</h3>
        <SearchBox value={search} onChange={setSearch} placeholder="Buscar alumno o producto…" />
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-3">
          <PeopleList people={filtered.map(p => ({ ...p.person, detail: `${p.product} · ${p.price} electrones` }))} />
        </div>
      </section>
    </div>
  )
}

// =====================================================================
// CAJAS: cajas abiertas, ejercicios y soluciones desbloqueados,
// convocatorias completas
// =====================================================================

const TYPE_LABEL: Record<string, string> = { C: 'Cuestión', P: 'Problema' }

function convocatoriaLabel(year: string, session: string) {
  const y = /^\d{4}$/.test(year) ? `${year.slice(0, 2)}/${year.slice(2)}` : year
  return `Curso ${y} · ${session} convocatoria`
}

export function LootboxDetail() {
  const [loading, setLoading] = useState(true)
  const [opened, setOpened] = useState<any[]>([])
  const [unlocks, setUnlocks] = useState<any[]>([])
  const [library, setLibrary] = useState<any[]>([])
  const [unlocksError, setUnlocksError] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      fetchAllRows((from, to) => supabase
        .from('user_inventory')
        .select('consumed_at, shop_products!inner(category), profiles!inner(id, full_name, nickname, role)')
        .eq('is_consumed', true)
        .eq('shop_products.category', 'lootbox')
        .eq('profiles.role', 'student')
        .range(from, to)),
      fetchAllRows((from, to) => supabase
        .from('user_unlocks')
        .select('user_id, exercise_id, has_solution, unlocked_at, profiles!inner(full_name, nickname, role)')
        .eq('profiles.role', 'student')
        .range(from, to)),
      supabase.from('exercise_library').select('id, academic_year, session, type, number'),
    ]).then(([boxes, unl, { data: lib }]) => {
      setOpened(boxes)
      setUnlocks(unl)
      setLibrary(lib || [])
      // Si se han abierto cajas pero no vemos ningún desbloqueo, falta el permiso de lectura para admin
      setUnlocksError(boxes.length > 0 && unl.length === 0)
      setLoading(false)
    })
  }, [])

  const data = useMemo(() => {
    const exById: Record<string, any> = {}
    library.forEach(e => { exById[e.id] = e })

    // Por ejercicio
    const perExercise: Record<string, { ex: any, statement: Person[], solution: Person[] }> = {}
    library.forEach(e => { perExercise[e.id] = { ex: e, statement: [], solution: [] } })
    // Por alumno y convocatoria (para detectar convocatorias completas)
    const perUserConv: Record<string, { person: Person, count: number, lastDate: string | null }> = {}
    const convSize: Record<string, number> = {}
    library.forEach(e => {
      const k = `${e.academic_year}|${e.session}`
      convSize[k] = (convSize[k] || 0) + 1
    })

    const solutions: Person[] = []
    unlocks.forEach(u => {
      const ex = exById[u.exercise_id]
      if (!ex) return
      const person = personFromProfile(u.profiles, { date: u.unlocked_at })
      const entry = perExercise[u.exercise_id]
      if (u.has_solution) {
        entry.solution.push(person)
        solutions.push({ ...person, detail: `${TYPE_LABEL[ex.type] || ex.type} ${ex.number} · ${convocatoriaLabel(ex.academic_year, ex.session)}` })
      } else {
        entry.statement.push(person)
      }
      const k = `${u.user_id}|${ex.academic_year}|${ex.session}`
      const conv = (perUserConv[k] ||= { person, count: 0, lastDate: null })
      conv.count++
      if (!conv.lastDate || (u.unlocked_at && u.unlocked_at > conv.lastDate)) conv.lastDate = u.unlocked_at
    })

    const fullConvocatorias: Person[] = Object.entries(perUserConv)
      .filter(([k, v]) => {
        const [, year, session] = k.split('|')
        return v.count >= convSize[`${year}|${session}`]
      })
      .map(([k, v]) => {
        const [, year, session] = k.split('|')
        return { ...v.person, date: v.lastDate, detail: convocatoriaLabel(year, session) }
      })

    // Cajas abiertas por alumno
    const boxesByUser: Record<string, Person & { units: number }> = {}
    opened.forEach(b => {
      const id = b.profiles?.id
      if (!boxesByUser[id]) boxesByUser[id] = { ...personFromProfile(b.profiles), units: 0, date: null }
      boxesByUser[id].units++
      if (!boxesByUser[id].date || (b.consumed_at && b.consumed_at > boxesByUser[id].date!)) boxesByUser[id].date = b.consumed_at
    })

    const exercises = Object.values(perExercise).sort((a, b) =>
      a.ex.academic_year.localeCompare(b.ex.academic_year) ||
      a.ex.session.localeCompare(b.ex.session) ||
      a.ex.type.localeCompare(b.ex.type) ||
      a.ex.number - b.ex.number)

    return {
      exercises,
      solutions: solutions.sort((a, b) => (b.date || '').localeCompare(a.date || '')),
      fullConvocatorias: sortByName(fullConvocatorias),
      boxesByUser: Object.values(boxesByUser).sort((a, b) => b.units - a.units),
      statementCount: unlocks.filter(u => !u.has_solution).length,
      studentsWithUnlocks: new Set(unlocks.map(u => u.user_id)).size,
    }
  }, [opened, unlocks, library])

  if (loading) return <Loading />

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <SummaryTile value={opened.length} label="Cajas abiertas" color="text-orange-400" />
        <SummaryTile value={data.statementCount} label="Solo enunciado" />
        <SummaryTile value={data.solutions.length} label="Con solución" color="text-emerald-400" />
        <SummaryTile value={data.fullConvocatorias.length} label="Convocatorias completas" color="text-yellow-400" />
      </div>

      {unlocksError && (
        <div className="flex gap-2 items-start text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
          <FaExclamationTriangle className="shrink-0 mt-0.5" />
          <span>
            No se pueden leer los desbloqueos de los alumnos: falta el permiso de lectura para administradores en la tabla
            <code className="mx-1">user_unlocks</code>. Solo se muestran las cajas abiertas.
          </span>
        </div>
      )}

      {!unlocksError && (
        <>
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Premios especiales</h3>
            <div className="flex flex-col gap-2">
              <ExpandableRow
                icon={<FaStar className="text-yellow-400 text-xl" />}
                title="Convocatoria completa"
                subtitle="Alumnos que tienen desbloqueados todos los ejercicios de un examen"
                count={data.fullConvocatorias.length}
                people={data.fullConvocatorias}
              />
              <ExpandableRow
                icon={<FaKey className="text-emerald-400 text-xl" />}
                title="Ejercicios con solución"
                subtitle="Cuestiones y problemas desbloqueados con su solución"
                count={data.solutions.length}
                people={data.solutions}
              />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Por ejercicio <span className="normal-case font-normal text-slate-500">· {data.studentsWithUnlocks} alumnos con algún desbloqueo</span>
            </h3>
            <div className="flex flex-col gap-2">
              {data.exercises.map(({ ex, statement, solution }) => (
                <ExerciseRow key={ex.id} ex={ex} statement={statement} solution={solution} />
              ))}
            </div>
          </section>
        </>
      )}

      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cajas abiertas por alumno</h3>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-3 max-h-80 overflow-y-auto">
          <PeopleList people={data.boxesByUser.map(b => ({ ...b, detail: `${b.units} ${b.units === 1 ? 'caja' : 'cajas'}` }))} />
        </div>
      </section>
    </div>
  )
}

function ExerciseRow({ ex, statement, solution }: { ex: any, statement: Person[], solution: Person[] }) {
  const [open, setOpen] = useState<'statement' | 'solution' | null>(null)
  const toggle = (k: 'statement' | 'solution') => setOpen(o => (o === k ? null : k))

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl">
      <div className="flex items-center gap-2 p-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-slate-100 text-sm">{TYPE_LABEL[ex.type] || ex.type} {ex.number}</div>
          <div className="text-xs text-slate-500">{convocatoriaLabel(ex.academic_year, ex.session)}</div>
        </div>
        <CountButton active={open === 'statement'} count={statement.length} label="solo enunciado" onClick={() => toggle('statement')} />
        <CountButton active={open === 'solution'} count={solution.length} label="con solución" onClick={() => toggle('solution')} accent />
      </div>
      {open && (
        <div className="border-t border-slate-800 px-3 pb-2 max-h-72 overflow-y-auto">
          <PeopleList people={sortByName(open === 'statement' ? statement : solution)} />
        </div>
      )}
    </div>
  )
}

function CountButton({ count, label, onClick, active, accent }: { count: number, label: string, onClick: () => void, active: boolean, accent?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={count === 0}
      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
        count === 0 ? 'text-slate-600 cursor-default'
          : active ? 'bg-slate-600 text-white'
          : `bg-slate-800 hover:bg-slate-700 ${accent ? 'text-emerald-300' : 'text-white'}`
      }`}
    >
      {count} <span className="font-normal text-slate-400">{label}</span>
    </button>
  )
}
