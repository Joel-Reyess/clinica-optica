// GET /api/admin/textos
export default defineEventHandler(() => {
  const valores = leerTextos()
  return Object.entries(TEXTOS_BASE).map(([clave, b]) => ({ clave, titulo: b.titulo, valor: valores[clave] ?? '' }))
})
