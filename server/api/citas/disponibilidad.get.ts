// GET /api/citas/disponibilidad — días y horas libres para pedir cita (público)
export default defineEventHandler((event) => {
  limitar(event, 'disponibilidad', 60, 60 * 1000)
  return disponibilidad()
})
