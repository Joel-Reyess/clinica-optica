// GET /api/convenios — empresas con convenio vigente (solo nombre y logo)
export default defineEventHandler(() => {
  const filas = useDb().prepare('SELECT id, nombre, logo FROM convenios WHERE vigente = 1 ORDER BY orden, nombre COLLATE NOCASE').all() as unknown as Array<{ id: number, nombre: string, logo: string | null }>
  return filas.map(f => ({ id: f.id, nombre: f.nombre, logo: f.logo ? `/api/convenios/logo/${f.logo}` : null }))
})
