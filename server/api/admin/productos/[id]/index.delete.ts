// DELETE /api/admin/productos/:id — borra el producto y sus imágenes
export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  const db = useDb()
  const imagenes = db.prepare('SELECT nombre_guardado FROM producto_imagenes WHERE producto_id = ?').all(id) as Array<{ nombre_guardado: string }>
  const res = db.prepare('DELETE FROM productos WHERE id = ?').run(id) // las imágenes caen en cascada
  if (!res.changes) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Producto no encontrado.' })
  imagenes.forEach(i => borrarImagenCatalogo(i.nombre_guardado))
  return { ok: true }
})
