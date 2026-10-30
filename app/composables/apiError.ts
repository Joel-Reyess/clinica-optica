interface FetchLikeError {
  statusCode?: number
  status?: number
  data?: {
    message?: string
    errors?: Record<string, string[] | string>
  }
}

export interface ApiErrorInfo {
  message: string
  fields: Record<string, string>
}

export function parseApiError(
  error: unknown,
  fieldMap: Record<string, string> = {}
): ApiErrorInfo {
  const e = (error ?? {}) as FetchLikeError
  const status = e.statusCode ?? e.status

  if (!status) {
    return {
      message: 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo; tus datos se conservaron.',
      fields: {}
    }
  }

  if (status === 422) {
    const fields: Record<string, string> = {}
    for (const [campo, mensajes] of Object.entries(e.data?.errors ?? {})) {
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
