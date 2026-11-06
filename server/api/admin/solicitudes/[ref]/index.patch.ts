import { z } from 'zod'
import { lineaOpcional, textoOpcional } from '#shared/schemas/comun'

const esquema = z.object({
  estado: z.enum(['nueva', 'contactada', 'en_seguimiento', 'cerrada']).optional(),
  resultado: lineaOpcional(300),
  responsable: lineaOpcional(120),
  notas: textoOpcional(2000)
})

// PATCH /api/admin/solicitudes/:ref — estado, resultado, responsable y notas
export default defineEventHandler(async (event) => {
  const ref = String(getRouterParam(event, 'ref') ?? '')
  const cambios = await leerValidado(event, esquema)

  const campos = Object.keys(cambios) as Array<keyof typeof cambios>
  if (!campos.length) return { ok: true }

  // Los nombres de columna salen de la lista cerrada del esquema, no del usuario.
  const set = campos.map(c => `${c} = @${c}`).join(', ')
  const res = useDb()
    .prepare(`UPDATE solicitudes SET ${set}, actualizada_en = datetime('now') WHERE ref = @ref`)
    .run({ ...cambios, ref })

  if (!res.changes) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Solicitud no encontrada.' })
  return { ok: true }
})
