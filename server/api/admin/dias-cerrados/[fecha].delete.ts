// DELETE /api/admin/dias-cerrados/:fecha
export default defineEventHandler((event) => {
  const fecha = getRouterParam(event, 'fecha') ?? ''
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  useDb().prepare('DELETE FROM dias_cerrados WHERE fecha = ?').run(fecha)
  return { ok: true }
})
