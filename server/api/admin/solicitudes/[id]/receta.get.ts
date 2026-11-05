import { createReadStream, existsSync } from 'node:fs'
import { join } from 'node:path'

// GET /api/admin/solicitudes/:id/receta
// La receta solo sale por aquí, y /api/admin/** exige sesión del personal.
export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  const a = useDb()
    .prepare('SELECT nombre_guardado, tipo_mime FROM archivos WHERE solicitud_id = ?')
    .get(id) as { nombre_guardado: string, tipo_mime: string } | undefined

  const ruta = a ? join(carpetaPrivada('recetas'), a.nombre_guardado) : ''
  if (!a || !existsSync(ruta)) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Esta solicitud no tiene receta.' })
  }

  setResponseHeaders(event, {
    'Content-Type': a.tipo_mime,
    'Content-Disposition': 'inline',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'private, no-store'
  })
  return sendStream(event, createReadStream(ruta))
})
