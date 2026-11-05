// Si la base no tiene usuarios, crea el primero con las variables de entorno.
// Así la clave nunca vive en el código ni en el repositorio.
export default defineNitroPlugin(async () => {
  const { adminUser, adminPassword } = useRuntimeConfig()
  const db = useDb()
  const { n } = db.prepare('SELECT COUNT(*) AS n FROM usuarios').get() as { n: number }
  if (n > 0) return

  if (!adminUser || !adminPassword) {
    console.warn('[auth] No hay usuarios. Define NUXT_ADMIN_USER y NUXT_ADMIN_PASSWORD para crear el primero.')
    return
  }
  if (adminPassword.length < 12) {
    console.error('[auth] NUXT_ADMIN_PASSWORD debe tener al menos 12 caracteres. No se creó el usuario.')
    return
  }

  db.prepare(`INSERT INTO usuarios (usuario, clave_hash, nombre, rol) VALUES (?, ?, ?, 'admin')`)
    .run(adminUser.trim().toLowerCase(), await hashClave(adminPassword), 'Administrador')
  console.info(`[auth] Usuario inicial "${adminUser}" creado.`)
})
