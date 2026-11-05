import { createReadStream, existsSync } from 'node:fs'
import { join } from 'node:path'

// GET /api/convenios/logo/:nombre — logos de las empresas (públicos)
export default defineEventHandler((event) => {
  const nombre = getRouterParam(event, 'nombre') ?? ''
  if (!NOMBRE_IMAGEN.test(nombre)) throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  const ruta = join(carpetaPrivada('convenios'), nombre)
  if (!existsSync(ruta)) throw createError({ statusCode: 404, statusMessage: 'Not Found' })

  const mime = nombre.endsWith('.png') ? 'image/png' : nombre.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
  setResponseHeaders(event, {
    'Content-Type': mime,
    'Cache-Control': 'public, max-age=604800, immutable',
    'X-Content-Type-Options': 'nosniff'
  })
  return sendStream(event, createReadStream(ruta))
})
