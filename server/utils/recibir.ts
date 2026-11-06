import type { H3Event } from 'h3'
import type { ZodType } from 'zod'
import { randomBytes } from 'node:crypto'

// Todo lo que comparten los endpoints públicos de solicitudes:
// límite por IP, tamaño máximo, trampa para bots, validación, guardado y aviso.
interface Opciones<T> {
  tipo: TipoSolicitud
  esquema: ZodType<T>
  // Separa lo común (nombre, teléfono, correo) de lo específico de cada tipo.
  // Comprobaciones extra con la base (por ejemplo, que el horario siga libre). Síncrona a propósito:
  // así nadie se cuela entre la comprobación y el guardado.
  verificar?: (v: T) => void
  mapear: (v: T) => { nombre: string, telefono: string, correo?: string, datos: Record<string, unknown> }
}

const MAX_CUERPO = 32 * 1024 // 32 KB: un formulario de texto no necesita más

export async function recibirSolicitud<T>(event: H3Event, o: Opciones<T>) {
  limitar(event, 'solicitudes', 10, 10 * 60 * 1000)

  const largo = Number(getRequestHeader(event, 'content-length') ?? 0)
  if (largo > MAX_CUERPO) {
    throw createError({ statusCode: 413, statusMessage: 'Payload Too Large', message: 'El mensaje es demasiado grande.' })
  }

  const cuerpo = await readBody(event)

  // Trampa: si el campo oculto viene lleno, es un bot. Le respondemos "éxito"
  // para que no sepa que lo detectamos, pero no guardamos nada.
  if (cuerpo && typeof cuerpo === 'object' && (cuerpo as Record<string, unknown>).sitioWeb) {
    setResponseStatus(event, 201)
    return { ref: randomBytes(9).toString('base64url') }
  }

  const valido = validarCuerpo(cuerpo, o.esquema)
  o.verificar?.(valido)
  const { nombre, telefono, correo, datos } = o.mapear(valido)
  const ref = crearSolicitud({ tipo: o.tipo, nombre, telefono, correo, datos })
  avisarNuevaSolicitud({ ref, tipo: o.tipo, nombre, telefono, datos })

  setResponseStatus(event, 201)
  return { ref }
}
