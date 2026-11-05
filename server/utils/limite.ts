import type { H3Event } from 'h3'

// Límite de peticiones por IP, en memoria. Suficiente para un solo servidor
// (un contenedor). Si algún día hay varios, habría que moverlo a la base de datos.
const registros = new Map<string, number[]>()

export function ipDe(event: H3Event) {
  // Detrás de Traefik/Dokploy la IP real viene en X-Forwarded-For.
  return getRequestIP(event, { xForwardedFor: true }) ?? 'desconocida'
}

export function limitar(event: H3Event, grupo: string, max: number, ventanaMs: number) {
  const ahora = Date.now()
  const clave = `${grupo}:${ipDe(event)}`
  const recientes = (registros.get(clave) ?? []).filter(t => ahora - t < ventanaMs)

  if (recientes.length >= max) {
    registros.set(clave, recientes)
    const espera = Math.ceil((ventanaMs - (ahora - recientes[0]!)) / 1000)
    setResponseHeader(event, 'Retry-After', espera)
    throw createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests',
      message: 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.'
    })
  }

  recientes.push(ahora)
  registros.set(clave, recientes)

  // Limpieza ocasional para que el mapa no crezca sin fin.
  if (registros.size > 5000) {
    for (const [k, v] of registros) {
      if (!v.some(t => ahora - t < ventanaMs)) registros.delete(k)
    }
  }
}
