import { createReadStream, existsSync } from 'node:fs'
import { join } from 'node:path'

// GET /api/catalogo/imagen/:nombre — imágenes del catálogo (públicas)
export default defineEventHandler((event) => {
  const nombre = getRouterParam(event, 'nombre') ?? ''
  // Lista cerrada de formatos de nombre: no se puede salir de la carpeta con "../"
  if (!NOMBRE_IMAGEN.test(nombre)) throw createError({ statusCode: 404, statusMessage: 'Not Found' })

  const ruta = join(carpetaPrivada('catalogo'), nombre)
  if (!existsSync(ruta)) throw createError({ statusCode: 404, statusMessage: 'Not Found' })

  const mime = nombre.endsWith('.png') ? 'image/png' : nombre.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
  setResponseHeaders(event, {
    'Content-Type': mime,
    'Cache-Control': 'public, max-age=604800, immutable', // el nombre cambia si cambia la imagen
    'X-Content-Type-Options': 'nosniff'
  })
  return sendStream(event, createReadStream(ruta))
})
