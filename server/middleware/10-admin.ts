// Protege TODO lo que cuelga de /api/admin. Es la puerta única: ningún endpoint
// del panel depende de que se acuerde revisar la sesión por su cuenta.
export default defineEventHandler((event) => {
  const ruta = event.path.split('?')[0]!
  if (!ruta.startsWith('/api/admin')) return
  if (ruta === '/api/admin/login' || ruta === '/api/admin/me') return // login y "¿quién soy?" lo resuelven ellos

  exigirSesion(event)

  // Defensa extra contra peticiones desde otros sitios: si el navegador manda
  // Origin en una escritura, debe ser este mismo sitio.
  if (!['GET', 'HEAD', 'OPTIONS'].includes(event.method)) {
    const origen = getRequestHeader(event, 'origin')
    if (origen && new URL(origen).host !== getRequestHost(event, { xForwardedHost: true })) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden', message: 'Origen no permitido.' })
    }
  }
})
