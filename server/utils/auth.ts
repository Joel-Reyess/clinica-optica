import type { H3Event } from 'h3'
import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCb) as (p: string, s: Buffer, n: number) => Promise<Buffer>

const COOKIE = 'co_sesion'
const HORAS_SESION = 8

export interface UsuarioSesion {
  id: number
  usuario: string
  nombre: string
  rol: 'admin' | 'personal'
}

// ---- contraseñas: scrypt con sal aleatoria; nunca se guarda la clave en claro
export async function hashClave(clave: string) {
  const sal = randomBytes(16)
  const hash = await scrypt(clave, sal, 64)
  return `scrypt$${sal.toString('hex')}$${hash.toString('hex')}`
}

export async function verificarClave(clave: string, guardado: string) {
  const [alg, salHex, hashHex] = guardado.split('$')
  if (alg !== 'scrypt' || !salHex || !hashHex) return false
  const esperado = Buffer.from(hashHex, 'hex')
  const real = await scrypt(clave, Buffer.from(salHex, 'hex'), esperado.length)
  return timingSafeEqual(real, esperado)
}

// ---- sesiones: el navegador guarda un token aleatorio; en la base solo su hash
const hashToken = (t: string) => createHash('sha256').update(t).digest('hex')

function cookieSegura(event: H3Event) {
  return getRequestProtocol(event, { xForwardedProto: true }) === 'https'
}

export function crearSesion(event: H3Event, usuarioId: number) {
  const token = randomBytes(32).toString('base64url')
  const db = useDb()
  db.prepare(`DELETE FROM sesiones WHERE expira_en < datetime('now')`).run()
  db.prepare(`INSERT INTO sesiones (token_hash, usuario_id, expira_en) VALUES (?, ?, datetime('now', ?))`)
    .run(hashToken(token), usuarioId, `+${HORAS_SESION} hours`)

  setCookie(event, COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: cookieSegura(event),
    path: '/',
    maxAge: HORAS_SESION * 3600
  })
}

export function cerrarSesion(event: H3Event) {
  const token = getCookie(event, COOKIE)
  if (token) useDb().prepare('DELETE FROM sesiones WHERE token_hash = ?').run(hashToken(token))
  deleteCookie(event, COOKIE, { path: '/' })
}

export function usuarioActual(event: H3Event): UsuarioSesion | null {
  const token = getCookie(event, COOKIE)
  if (!token) return null
  const fila = useDb().prepare(`
    SELECT u.id, u.usuario, u.nombre, u.rol
    FROM sesiones s JOIN usuarios u ON u.id = s.usuario_id
    WHERE s.token_hash = ? AND s.expira_en > datetime('now') AND u.activo = 1
  `).get(hashToken(token)) as UsuarioSesion | undefined
  return fila ?? null
}

export function exigirSesion(event: H3Event): UsuarioSesion {
  const u = usuarioActual(event)
  if (!u) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized', message: 'Inicia sesión para continuar.' })
  }
  return u
}

export function exigirAdmin(event: H3Event): UsuarioSesion {
  const u = exigirSesion(event)
  if (u.rol !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden', message: 'No tienes permiso para esto.' })
  }
  return u
}
