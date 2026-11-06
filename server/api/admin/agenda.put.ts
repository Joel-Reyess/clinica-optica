import { agendaSchema } from '#shared/schemas/agenda'

// PUT /api/admin/agenda — guarda horario semanal y ajustes
export default defineEventHandler(async (event) => {
  const a = await leerValidado(event, agendaSchema)
  const db = useDb()
  db.exec('BEGIN')
  try {
    const dia = db.prepare('UPDATE horario_semanal SET activo = ?, apertura = ?, cierre = ?, pausa_inicio = ?, pausa_fin = ? WHERE dia = ?')
    for (const d of a.semana) {
      dia.run(d.activo ? 1 : 0, d.apertura, d.cierre, d.pausaInicio || null, d.pausaFin || null, d.dia)
    }
    const ajuste = db.prepare('INSERT INTO ajustes (clave, valor) VALUES (?, ?) ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor')
    ajuste.run('duracion_min', String(a.duracionMin))
    ajuste.run('cupo', String(a.cupo))
    ajuste.run('anticipacion_horas', String(a.anticipacionHoras))
    ajuste.run('dias_adelante', String(a.diasAdelante))
    db.exec('COMMIT')
  } catch (e) {
    db.exec('ROLLBACK')
    throw e
  }
  return { ok: true }
})
