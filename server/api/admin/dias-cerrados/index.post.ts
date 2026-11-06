import { diaCerradoSchema } from '#shared/schemas/agenda'

// POST /api/admin/dias-cerrados — marca un día sin citas (vacaciones, día festivo…)
export default defineEventHandler(async (event) => {
  const { fecha, motivo } = await leerValidado(event, diaCerradoSchema)
  useDb().prepare('INSERT INTO dias_cerrados (fecha, motivo) VALUES (?, ?) ON CONFLICT(fecha) DO UPDATE SET motivo = excluded.motivo')
    .run(fecha, motivo || null)
  setResponseStatus(event, 201)
  return { ok: true }
})
