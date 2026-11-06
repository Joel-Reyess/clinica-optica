// GET /api/admin/agenda — horario semanal, ajustes y días cerrados
export default defineEventHandler(() => ({
  semana: leerSemana(),
  ...leerAjustes(),
  cerrados: useDb().prepare('SELECT fecha, motivo FROM dias_cerrados WHERE fecha >= date(\'now\', \'-1 day\') ORDER BY fecha').all()
}))
