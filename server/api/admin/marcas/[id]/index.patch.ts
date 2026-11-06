import { z } from 'zod'
import { linea } from '#shared/schemas/comun'

const esquema = z.object({ nombre: linea('Escribe el nombre de la marca', 2, 60) })

// PATCH /api/admin/marcas/:id — renombra y actualiza los productos que la usan
export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const { nombre } = await leerValidado(event, esquema)
  const db = useDb()
  const actual = db.prepare('SELECT nombre FROM marcas WHERE id = ?').get(id) as { nombre: string } | undefined
  if (!actual) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Marca no encontrada.' })

  const clave = validarMarcaNueva(nombre, id)
  db.exec('BEGIN')
  try {
    db.prepare('UPDATE marcas SET nombre = ?, clave = ? WHERE id = ?').run(nombre, clave, id)
    db.prepare('UPDATE productos SET marca = ? WHERE marca = ?').run(nombre, actual.nombre)
    db.exec('COMMIT')
  } catch (e) {
    db.exec('ROLLBACK')
    throw e
  }
  return { ok: true }
})
