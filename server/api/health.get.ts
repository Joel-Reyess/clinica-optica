// GET /api/health — para que Dokploy/Docker sepan si la app y la base están vivas
export default defineEventHandler(() => {
  useDb().prepare('SELECT 1').get()
  return { ok: true }
})
