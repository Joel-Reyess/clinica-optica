import { z } from 'zod'

const esquema = z.object({
  usuario: z.string('Escribe tu usuario').trim().min(1, 'Escribe tu usuario').max(60),
  clave: z.string('Escribe tu contraseña').min(1, 'Escribe tu contraseña').max(200)
})

const MAX_FALLOS = 5
const VENTANA_MIN = 15

// POST /api/admin/login
export default defineEventHandler(async (event) => {
  limitar(event, 'login', 30, 15 * 60 * 1000) // freno general por IP

  const { usuario, clave } = await leerValidado(event, esquema)
  const nombre = usuario.toLowerCase()
  const ip = ipDe(event)
  const db = useDb()

  // Bloqueo por usuario Y por IP tras varios fallos recientes
  const { n } = db.prepare(`
    SELECT COUNT(*) AS n FROM login_intentos
    WHERE exitoso = 0 AND creado_en > datetime('now', ?) AND (usuario = ? OR ip = ?)
  `).get(`-${VENTANA_MIN} minutes`, nombre, ip) as { n: number }
  if (n >= MAX_FALLOS) {
    throw createError({ statusCode: 429, statusMessage: 'Too Many Requests', message: 'Demasiados intentos fallidos. Espera unos minutos.' })
  }

  const fila = db.prepare('SELECT id, clave_hash, nombre, rol, activo FROM usuarios WHERE usuario = ?')
    .get(nombre) as { id: number, clave_hash: string, nombre: string, rol: string, activo: number } | undefined

  // Si el usuario no existe igual gastamos tiempo de cálculo, para no delatar cuáles existen.
  const ok = fila
    ? await verificarClave(clave, fila.clave_hash)
    : (await verificarClave(clave, 'scrypt$00$00').catch(() => false), false)

  db.prepare('INSERT INTO login_intentos (usuario, ip, exitoso) VALUES (?, ?, ?)').run(nombre, ip, ok && fila?.activo ? 1 : 0)

  if (!ok || !fila || !fila.activo) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized', message: 'Usuario o contraseña incorrectos.' })
  }

  crearSesion(event, fila.id)
  return { usuario: nombre, nombre: fila.nombre, rol: fila.rol }
})
