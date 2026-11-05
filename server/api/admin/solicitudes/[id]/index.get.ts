// GET /api/admin/solicitudes/:id
export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  const fila = useDb().prepare(`
    SELECT s.*, a.nombre_original AS receta_nombre, a.tipo_mime AS receta_tipo, a.bytes AS receta_bytes
    FROM solicitudes s LEFT JOIN archivos a ON a.solicitud_id = s.id
    WHERE s.id = ?
  `).get(id) as Record<string, unknown> | undefined

  if (!fila) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Solicitud no encontrada.' })
  return { ...fila, datos: JSON.parse(String(fila.datos)) }
})
