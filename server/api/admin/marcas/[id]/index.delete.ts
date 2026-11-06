// DELETE /api/admin/marcas/:id — solo si ningún producto la usa
export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  const db = useDb()
  const m = db.prepare('SELECT nombre FROM marcas WHERE id = ?').get(id) as { nombre: string } | undefined
  if (!m) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Marca no encontrada.' })

  const { n } = db.prepare('SELECT COUNT(*) AS n FROM productos WHERE marca = ?').get(m.nombre) as { n: number }
  if (n > 0) {
    throw createError({ statusCode: 409, statusMessage: 'Conflict', message: `No se puede quitar: ${n} producto(s) usan esta marca. Cámbiales la marca primero.` })
  }
  db.prepare('DELETE FROM marcas WHERE id = ?').run(id)
  return { ok: true }
})
