// GET /api/catalogo?categoria=  — lo que ve el público (solo productos visibles)
export default defineEventHandler((event) => {
  const { categoria } = getQuery(event)
  return listarProductos(true, typeof categoria === 'string' ? categoria : undefined)
})
