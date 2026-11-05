// GET /api/admin/metricas — clics de los últimos 30 días, por evento
export default defineEventHandler(() => useDb().prepare(`
  SELECT evento, COUNT(*) AS n FROM eventos
  WHERE creado_en > datetime('now', '-30 days')
  GROUP BY evento ORDER BY n DESC
`).all())
