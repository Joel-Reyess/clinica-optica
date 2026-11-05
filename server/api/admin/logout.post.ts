// POST /api/admin/logout
export default defineEventHandler((event) => {
  cerrarSesion(event)
  return { ok: true }
})
