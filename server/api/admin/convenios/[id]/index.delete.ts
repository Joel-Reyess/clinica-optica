// DELETE /api/admin/convenios/:id
export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  const db = useDb()
  const fila = db.prepare('SELECT logo FROM convenios WHERE id = ?').get(id) as { logo: string | null } | undefined
  if (!fila) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Convenio no encontrado.' })
  db.prepare('DELETE FROM convenios WHERE id = ?').run(id)
  if (fila.logo) borrarImagenCatalogo(fila.logo, 'convenios')
  return { ok: true }
})
