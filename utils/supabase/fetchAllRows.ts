// Supabase limita cada respuesta a 1000 filas: paginamos para no perder los datos más recientes
export async function fetchAllRows(buildQuery: (from: number, to: number) => any) {
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
