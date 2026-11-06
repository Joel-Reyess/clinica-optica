// Cabeceras de seguridad para todas las respuestas.
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

  // Política de contenido: el navegador solo ejecuta scripts de este mismo sitio y
  // no deja que otro sitio meta esta página en un marco. (Solo en producción: en
  // desarrollo Nuxt necesita cosas extra para el recargado en vivo.)
  if (!import.meta.dev && !event.path.startsWith('/api/')) {
    setResponseHeader(event, 'Content-Security-Policy', [
      'default-src \'self\'',
      'script-src \'self\' \'unsafe-inline\'', // Nuxt inserta datos de la página en un <script>
      'style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com',
      'font-src \'self\' data: https://fonts.gstatic.com',
      'img-src \'self\' data: blob:',
      'connect-src \'self\'',
      'object-src \'none\'',
      'base-uri \'self\'',
      'form-action \'self\'',
      'frame-ancestors \'self\''
    ].join('; '))
  }

  // Lo que viene de /api nunca se guarda en caché (puede tener datos personales)
  if (event.path.startsWith('/api/')) {
    setResponseHeader(event, 'Cache-Control', 'no-store')
  }
})
