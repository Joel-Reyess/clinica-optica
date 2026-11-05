import { convenioSchema } from '#shared/schemas/convenio'

// POST /api/admin/convenios
export default defineEventHandler(async (event) => {
  const c = await leerValidado(event, convenioSchema)
  const res = useDb().prepare('INSERT INTO convenios (nombre, vigente, orden) VALUES (?, ?, ?)')
    .run(c.nombre, c.vigente === false ? 0 : 1, c.orden ?? 0)
  setResponseStatus(event, 201)
  return { id: Number(res.lastInsertRowid) }
})
