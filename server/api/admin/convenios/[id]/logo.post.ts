// POST /api/admin/convenios/:id/logo  (multipart: "logo") — reemplaza el logo anterior
export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const largo = Number(getRequestHeader(event, 'content-length') ?? 0)
  if (largo > MAX_IMAGEN + 64 * 1024) {
    throw createError({ statusCode: 413, statusMessage: 'Payload Too Large', message: 'El logo no debe superar los 5 MB.' })
  }
  const db = useDb()
  const fila = db.prepare('SELECT logo FROM convenios WHERE id = ?').get(id) as { logo: string | null } | undefined
  if (!fila) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Convenio no encontrado.' })

  const partes = await readMultipartFormData(event)
  const archivo = partes?.find(p => p.name === 'logo' && p.filename)
  if (!archivo) throw createError({ statusCode: 422, statusMessage: 'Unprocessable Entity', message: 'Elige una imagen.' })

  const nombre = guardarImagenCatalogo(archivo.data, 'convenios')
  db.prepare('UPDATE convenios SET logo = ? WHERE id = ?').run(nombre, id)
  if (fila.logo) borrarImagenCatalogo(fila.logo, 'convenios')
  return { ok: true }
})
