// GET /api/admin/marcas — con cuántos productos usa cada una
export default defineEventHandler(() => useDb().prepare(`
  SELECT m.id, m.nombre, (SELECT COUNT(*) FROM productos p WHERE p.marca = m.nombre) AS productos
  FROM marcas m ORDER BY m.nombre COLLATE NOCASE
`).all())
