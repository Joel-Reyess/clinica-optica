import { productoSchema } from '#shared/schemas/producto'

// POST /api/admin/productos
export default defineEventHandler(async (event) => {
  const p = await leerValidado(event, productoSchema)
  const res = useDb().prepare(`
    INSERT INTO productos (categoria, marca, nombre, codigo, descripcion, colores, precio_desde, promocion, visible, orden)
    VALUES (@categoria, @marca, @nombre, @codigo, @descripcion, @colores, @precio, @promocion, @visible, @orden)
  `).run({
    categoria: p.categoria,
    marca: resolverMarca(p.marca),
    nombre: p.nombre,
    codigo: p.codigo || null,
    descripcion: p.descripcion || null,
    colores: JSON.stringify(p.colores ?? []),
    precio: p.precioDesde || null,
    promocion: p.promocion || null,
    visible: p.visible === false ? 0 : 1,
    orden: p.orden ?? 0
  })
  setResponseStatus(event, 201)
  return { id: Number(res.lastInsertRowid) }
})
