import { randomBytes } from 'node:crypto'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

// POST /api/solicitudes/:ref/receta  (multipart, campo "receta")
// Solo se acepta para una cotización recién creada (30 min) que aún no tenga receta.
export default defineEventHandler(async (event) => {
  limitar(event, 'recetas', 6, 10 * 60 * 1000)

  const largo = Number(getRequestHeader(event, 'content-length') ?? 0)
  if (largo > MAX_RECETA + 64 * 1024) {
    throw createError({ statusCode: 413, statusMessage: 'Payload Too Large', message: 'El archivo no debe superar los 10 MB.' })
  }

  const ref = getRouterParam(event, 'ref') ?? ''
  const db = useDb()
  const sol = db.prepare(`
    SELECT id, tipo,
      (julianday('now') - julianday(creada_en)) * 1440 AS minutos,
      (SELECT COUNT(*) FROM archivos WHERE solicitud_id = solicitudes.id) AS tiene
    FROM solicitudes WHERE ref = ?
  `).get(ref) as { id: number, tipo: string, minutos: number, tiene: number } | undefined

  // Mismo mensaje para "no existe" y "no permitido": no revelamos qué referencias existen.
  if (!sol || sol.tipo !== 'cotizacion' || sol.minutos > 30 || sol.tiene > 0) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'No se pudo adjuntar la receta.' })
  }

  const partes = await readMultipartFormData(event)
  const parte = partes?.find(p => p.name === 'receta' && p.filename)
  if (!parte) {
    throw createError({ statusCode: 422, statusMessage: 'Unprocessable Entity', message: 'Datos no válidos', data: { errors: { receta: ['Elige un archivo'] } } })
  }
  if (parte.data.length > MAX_RECETA) {
    throw createError({ statusCode: 422, statusMessage: 'Unprocessable Entity', message: 'Datos no válidos', data: { errors: { receta: ['El archivo no debe superar los 10 MB.'] } } })
  }

  const tipo = detectarTipo(parte.data)
  if (!tipo) {
    throw createError({ statusCode: 422, statusMessage: 'Unprocessable Entity', message: 'Datos no válidos', data: { errors: { receta: ['Elige una foto JPG, PNG, WEBP o un archivo PDF.'] } } })
  }

  // Nombre aleatorio: el nombre que puso la persona nunca se usa como ruta.
  const guardado = `${randomBytes(16).toString('hex')}.${tipo.ext}`
  writeFileSync(join(carpetaPrivada('recetas'), guardado), parte.data, { mode: 0o600 })

  db.prepare(`
    INSERT INTO archivos (solicitud_id, nombre_original, nombre_guardado, tipo_mime, bytes)
    VALUES (?, ?, ?, ?, ?)
  `).run(sol.id, (parte.filename ?? 'receta').slice(0, 120), guardado, tipo.mime, parte.data.length)

  setResponseStatus(event, 201)
  return { ok: true }
})
