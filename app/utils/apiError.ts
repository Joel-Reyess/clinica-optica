// Convierte cualquier error de $fetch en algo que el formulario pueda mostrar.
// El servidor responde 422 con { errors: { campo: ['texto'] } }. Según cómo llegue
// la respuesta, esa lista viene en data.errors o en data.data.errors; se aceptan ambas.

type ErroresPorCampo = Record<string, string[] | string>

interface FetchLikeError {
  statusCode?: number
  status?: number
  data?: {
    errors?: ErroresPorCampo
    data?: { errors?: ErroresPorCampo }
  }
}

export interface ApiErrorInfo {
  message: string
  // errores por campo, con los nombres del formulario (si se pasó fieldMap)
  fields: Record<string, string>
}

export function parseApiError(
  error: unknown,
  fieldMap: Record<string, string> = {}
): ApiErrorInfo {
  const e = (error ?? {}) as FetchLikeError
  const status = e.statusCode ?? e.status

  // Sin respuesta del servidor: sin internet o servidor caído
  if (!status) {
    return {
      message: 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo; tus datos se conservaron.',
      fields: {}
    }
  }

  if (status === 422) {
    const errores = e.data?.errors ?? e.data?.data?.errors ?? {}
    const fields: Record<string, string> = {}
    for (const [campo, mensajes] of Object.entries(errores)) {
      const texto = Array.isArray(mensajes) ? mensajes[0] : mensajes
      if (texto) fields[fieldMap[campo] ?? campo] = texto
    }
    return { message: 'Revisa los datos marcados e inténtalo de nuevo.', fields }
  }

  if (status === 429) {
    return {
      message: 'Hiciste demasiados intentos. Espera un momento e inténtalo de nuevo.',
      fields: {}
    }
  }

  return {
    message: 'Algo salió mal de nuestro lado. Puedes reintentar o escribirnos por WhatsApp.',
    fields: {}
  }
}
