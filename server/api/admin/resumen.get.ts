// GET /api/admin/resumen — conteos para el inicio del panel
export default defineEventHandler(() => {
  const db = useDb()
  return {
    porEstado: db.prepare('SELECT estado, COUNT(*) AS n FROM solicitudes GROUP BY estado').all(),
    nuevasPorTipo: db.prepare('SELECT tipo, COUNT(*) AS n FROM solicitudes WHERE estado = \'nueva\' GROUP BY tipo').all(),
    porTipo: db.prepare('SELECT tipo, COUNT(*) AS n FROM solicitudes GROUP BY tipo').all()
  }
})
