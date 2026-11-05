import { z } from 'zod'

const esquema = z.object({
  estado: z.enum(['nueva', 'contactada', 'en_seguimiento', 'cerrada']).optional(),
  resultado: z.string().trim().max(300).optional(),
  responsable: z.string().trim().max(120).optional(),
  notas: z.string().trim().max(2000).optional()
})

// PATCH /api/admin/solicitudes/:id — estado, resultado, responsable y notas
export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const cambios = await leerValidado(event, esquema)

  const campos = Object.keys(cambios) as Array<keyof typeof cambios>
  if (!campos.length) return { ok: true }

  // Los nombres de columna salen de la lista cerrada del esquema, no del usuario.
  const set = campos.map(c => `${c} = @${c}`).join(', ')
  const res = useDb()
    .prepare(`UPDATE solicitudes SET ${set}, actualizada_en = datetime('now') WHERE id = @id`)
    .run({ ...cambios, id })

  if (!res.changes) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Solicitud no encontrada.' })
  return { ok: true }
})
