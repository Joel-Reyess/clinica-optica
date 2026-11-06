import { createReadStream, existsSync } from 'node:fs'
import { join } from 'node:path'

// GET /api/admin/solicitudes/:ref/receta
// La receta solo sale por aquí, y /api/admin/** exige sesión del personal.
export default defineEventHandler((event) => {
  const ref = String(getRouterParam(event, 'ref') ?? '')
  const a = useDb()
    .prepare('SELECT a.nombre_guardado, a.tipo_mime FROM archivos a JOIN solicitudes s ON s.id = a.solicitud_id WHERE s.ref = ?')
    .get(ref) as { nombre_guardado: string, tipo_mime: string } | undefined

  const ruta = a ? join(carpetaPrivada('recetas'), a.nombre_guardado) : ''
  if (!a || !existsSync(ruta)) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Esta solicitud no tiene receta.' })
  }

  setResponseHeaders(event, {
    'Content-Type': a.tipo_mime,
    'Content-Disposition': 'inline',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'private, no-store',
    'Content-Security-Policy': 'default-src \'none\'; style-src \'unsafe-inline\'; sandbox',
    'X-Robots-Tag': 'noindex'
  })
  return sendStream(event, createReadStream(ruta))
})
