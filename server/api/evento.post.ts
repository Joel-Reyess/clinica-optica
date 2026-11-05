import { z } from 'zod'
import { EVENTOS } from '#shared/eventos'

const esquema = z.object({
  evento: z.enum(EVENTOS),
  ruta: z.string().max(200).startsWith('/')
})

// POST /api/evento — cuenta un clic. No guarda IP, ni cookies, ni datos de la persona.
export default defineEventHandler(async (event) => {
  limitar(event, 'eventos', 60, 60 * 1000)
  const resultado = esquema.safeParse(await readBody(event))
  if (resultado.success) {
    useDb().prepare('INSERT INTO eventos (evento, ruta) VALUES (?, ?)').run(resultado.data.evento, resultado.data.ruta)
  }
  setResponseStatus(event, 204) // siempre 204: no le decimos a nadie qué se acepta
  return null
})
