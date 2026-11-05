// POST /api/admin/productos/:id/imagenes  (multipart: "imagen" y opcional "alt")
export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const largo = Number(getRequestHeader(event, 'content-length') ?? 0)
  if (largo > MAX_IMAGEN + 64 * 1024) {
    throw createError({ statusCode: 413, statusMessage: 'Payload Too Large', message: 'La imagen no debe superar los 5 MB.' })
  }

  const db = useDb()
  if (!db.prepare('SELECT 1 FROM productos WHERE id = ?').get(id)) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Producto no encontrado.' })
  }

  const partes = await readMultipartFormData(event)
  const archivo = partes?.find(p => p.name === 'imagen' && p.filename)
  if (!archivo) throw createError({ statusCode: 422, statusMessage: 'Unprocessable Entity', message: 'Elige una imagen.' })
  const alt = partes?.find(p => p.name === 'alt')?.data.toString('utf8').trim().slice(0, 160) || null

  const nombre = guardarImagenCatalogo(archivo.data)
  const { n } = db.prepare('SELECT COUNT(*) AS n FROM producto_imagenes WHERE producto_id = ?').get(id) as { n: number }
  db.prepare('INSERT INTO producto_imagenes (producto_id, nombre_guardado, texto_alternativo, orden) VALUES (?, ?, ?, ?)')
    .run(id, nombre, alt, n)

  setResponseStatus(event, 201)
  return { ok: true }
})
