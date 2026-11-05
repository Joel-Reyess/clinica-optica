import { convenioSchema } from '#shared/schemas/convenio'

// PATCH /api/admin/convenios/:id
export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const c = await leerValidado(event, convenioSchema)
  const res = useDb().prepare('UPDATE convenios SET nombre = ?, vigente = ?, orden = ? WHERE id = ?')
    .run(c.nombre, c.vigente === false ? 0 : 1, c.orden ?? 0, id)
  if (!res.changes) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Convenio no encontrado.' })
  return { ok: true }
})
