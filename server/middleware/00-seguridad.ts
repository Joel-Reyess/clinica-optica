// Cabeceras de seguridad para todas las respuestas.
// No se incluye Content-Security-Policy estricta porque Nuxt inserta scripts en línea;
// se puede endurecer más adelante con el módulo nuxt-security si se desea.
export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Cross-Origin-Opener-Policy': 'same-origin'
  })

  if (getRequestProtocol(event, { xForwardedProto: true }) === 'https') {
    setResponseHeader(event, 'Strict-Transport-Security', 'max-age=31536000')
  }

  // Lo que viene de /api nunca se guarda en caché (puede tener datos personales)
  if (event.path.startsWith('/api/')) {
    setResponseHeader(event, 'Cache-Control', 'no-store')
  }
})
