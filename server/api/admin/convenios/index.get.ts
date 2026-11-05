// GET /api/admin/convenios — todos, incluso los no vigentes
export default defineEventHandler(() => {
  const filas = useDb().prepare('SELECT id, nombre, logo, vigente, orden FROM convenios ORDER BY orden, nombre COLLATE NOCASE').all() as unknown as Array<{ id: number, nombre: string, logo: string | null, vigente: number, orden: number }>
  return filas.map(f => ({ id: f.id, nombre: f.nombre, orden: f.orden, vigente: Boolean(f.vigente), logo: f.logo ? `/api/convenios/logo/${f.logo}` : null }))
})
