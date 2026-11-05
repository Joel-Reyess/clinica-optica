import { informacionSchema } from '#shared/schemas/informacion'

// POST /api/solicitudes/informacion
export default defineEventHandler(async (event) => {
  const { nombre, telefono, correo, tema, pregunta } = await leerValidado(event, informacionSchema)

  const ref = crearSolicitud({
    tipo: 'informacion',
    nombre,
    telefono,
    correo,
    datos: { tema, pregunta }
  })

  setResponseStatus(event, 201)
  return { ref }
})
