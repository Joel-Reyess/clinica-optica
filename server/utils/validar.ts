import type { H3Event } from 'h3'
import type { ZodType } from 'zod'

// Lee el cuerpo de la petición y lo valida con un esquema de zod.
// Si falla, responde 422 con { errors: { campo: ['mensaje'] } }, que es el formato
// que ya entiende parseApiError en el frontend.
export async function leerValidado<T>(event: H3Event, esquema: ZodType<T>): Promise<T> {
  return validarCuerpo(await readBody(event), esquema)
}

export function validarCuerpo<T>(recibido: unknown, esquema: ZodType<T>): T {
  // Sin cuerpo (o con algo que no es un objeto) se trata como {}: así el error
  // sale campo por campo, en español, en lugar de un mensaje técnico en inglés.
  const cuerpo = recibido && typeof recibido === 'object' ? recibido : {}
  const resultado = esquema.safeParse(cuerpo)
  if (resultado.success) return resultado.data

  const errors: Record<string, string[]> = {}
  for (const problema of resultado.error.issues) {
    const campo = String(problema.path[0] ?? '_')
    ;(errors[campo] ??= []).push(problema.message)
  }

  throw createError({
    statusCode: 422,
    statusMessage: 'Unprocessable Entity',
    message: 'Datos no válidos',
    data: { errors }
  })
}
