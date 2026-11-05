// GET /api/admin/productos — todos, incluso los ocultos
export default defineEventHandler(() => listarProductos(false))
