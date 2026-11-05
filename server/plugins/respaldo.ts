import { mkdirSync, readdirSync, rmSync, unlinkSync } from 'node:fs'
import { join, resolve } from 'node:path'

// Copia de seguridad diaria de la base de datos, usando VACUUM INTO de SQLite
// (segura aunque la base esté en uso). Se guardan las últimas 14 copias.
// IMPORTANTE: esta copia vive en el mismo volumen; para estar a salvo de un fallo del
// servidor hay que sacar la carpeta data/respaldos a otro lugar (ver README).
const CADA_MS = 24 * 60 * 60 * 1000
const CONSERVAR = 14

async function respaldar() {
  const { dbPath } = useRuntimeConfig()
  const carpeta = resolve(dbPath, '..', 'respaldos')
  mkdirSync(carpeta, { recursive: true })

  const sello = new Date().toISOString().slice(0, 10)
  try {
    const destino = join(carpeta, `clinica-${sello}.db`)
    rmSync(destino, { force: true }) // VACUUM INTO exige que no exista
    // VACUUM INTO hace una copia consistente aunque la base esté en uso
    useDb().prepare('VACUUM INTO ?').run(destino)
    const viejos = readdirSync(carpeta).filter(f => /^clinica-.*\.db$/.test(f)).sort().slice(0, -CONSERVAR)
    viejos.forEach(f => unlinkSync(join(carpeta, f)))
    console.info(`[respaldo] listo: clinica-${sello}.db`)
  } catch (e) {
    console.error('[respaldo] falló:', e instanceof Error ? e.message : e)
  }
}

export default defineNitroPlugin(() => {
  setTimeout(respaldar, 30_000) // poco después de arrancar
  setInterval(respaldar, CADA_MS).unref()
})
