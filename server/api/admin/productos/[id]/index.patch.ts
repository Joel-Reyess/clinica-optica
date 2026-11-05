import { productoSchema } from '#shared/schemas/producto'

// PATCH /api/admin/productos/:id — se manda el producto completo
export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const p = await leerValidado(event, productoSchema)
  const res = useDb().prepare(`
    UPDATE productos SET categoria = @categoria, nombre = @nombre, codigo = @codigo,
      descripcion = @descripcion, colores = @colores, precio_desde = @precio,
      promocion = @promocion, visible = @visible, orden = @orden,
      actualizado_en = datetime('now')
    WHERE id = @id
  `).run({
    id,
    categoria: p.categoria,
    nombre: p.nombre,
    codigo: p.codigo || null,
    descripcion: p.descripcion || null,
    colores: JSON.stringify(p.colores ?? []),
    precio: p.precioDesde || null,
    promocion: p.promocion || null,
    visible: p.visible === false ? 0 : 1,
    orden: p.orden ?? 0
  })
  if (!res.changes) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Producto no encontrado.' })
  return { ok: true }
})
