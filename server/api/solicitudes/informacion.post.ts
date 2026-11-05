import { informacionSchema } from '#shared/schemas/informacion'

// POST /api/solicitudes/informacion
export default defineEventHandler(event => recibirSolicitud(event, {
  tipo: 'informacion',
  esquema: informacionSchema,
  mapear: v => ({
    nombre: v.nombre,
    telefono: v.telefono,
    correo: v.correo,
    datos: { tema: v.tema, pregunta: v.pregunta }
  })
}))
