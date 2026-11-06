import { z } from 'zod'
import { linea } from '#shared/schemas/comun'

const esquema = z.object({ nombre: linea('Escribe el nombre de la marca', 2, 60) })

// POST /api/admin/marcas
export default defineEventHandler(async (event) => {
  const { nombre } = await leerValidado(event, esquema)
  const clave = validarMarcaNueva(nombre)
  const res = useDb().prepare('INSERT INTO marcas (nombre, clave) VALUES (?, ?)').run(nombre, clave)
  setResponseStatus(event, 201)
  return { id: Number(res.lastInsertRowid) }
})
