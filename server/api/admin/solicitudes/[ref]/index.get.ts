// GET /api/admin/solicitudes/:ref  (ref = identificador aleatorio, no el número interno)
export default defineEventHandler((event) => {
  const ref = String(getRouterParam(event, 'ref') ?? '')
  const fila = useDb().prepare(`
    SELECT s.*, a.nombre_original AS receta_nombre, a.tipo_mime AS receta_tipo, a.bytes AS receta_bytes
    FROM solicitudes s LEFT JOIN archivos a ON a.solicitud_id = s.id
    WHERE s.ref = ?
  `).get(ref) as Record<string, unknown> | undefined

  if (!fila) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Solicitud no encontrada.' })
  const { id: _interno, ...publico } = fila
  return { ...publico, datos: JSON.parse(String(fila.datos)) }
})
