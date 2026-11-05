// DELETE /api/admin/imagenes/:id
export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  const db = useDb()
  const img = db.prepare('SELECT nombre_guardado FROM producto_imagenes WHERE id = ?').get(id) as { nombre_guardado: string } | undefined
  if (!img) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Imagen no encontrada.' })
  db.prepare('DELETE FROM producto_imagenes WHERE id = ?').run(id)
  borrarImagenCatalogo(img.nombre_guardado)
  return { ok: true }
})
